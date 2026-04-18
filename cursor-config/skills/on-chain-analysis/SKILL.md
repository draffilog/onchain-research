---
name: on-chain-analysis
description: >-
  Analyze on-chain token usage, holder behavior, DeFi positions, and yield
  strategies using Dune Analytics MCP, DeBank API, and protocol browser UIs.
  Use when the user asks about on-chain data, blockchain analysis, token holders,
  wallet activity, DeFi strategies, TVL, transfer flows, lending markets,
  yield farming, or building Dune dashboards.
---

# On-Chain Token Analysis

Toolkit for investigating any EVM token: who holds it, where it's used,
how it flows, and what strategies exist around it.

## Research Repository

**Before starting any research**, check the knowledge hub at `/Users/user/lst-research/`:

1. `research/INDEX.md` — auto-generated index of every research file with topic, chain, verification date, tags, and age. Start here.
2. `CORRECTIONS.md` — append-only log of corrections. Newer entries supersede older research. Scan for your topic before trusting any finding.
3. `research/sessions/` — per-session logs capturing process, mistakes, and corrections.
4. `research/AGENTS.md` — canonical runbook for the structured weekly DeFi benchmark (assets/venues/snapshots). Follow this if the user asks for a recurring snapshot, a new chain extension, or anything that updates the benchmark. The methodology lives in the `defi-benchmark` skill.

**When you produce new findings**:
- Add YAML frontmatter (`title`, `topic`, `chain`, `verified: YYYY-MM-DD`, `tags`) to any new research file
- If you corrected existing data, append to `CORRECTIONS.md`
- Run `./scripts/build-index.sh` to regenerate `INDEX.md`
- **Review `git diff` before every commit** — a `beforeShellExecution` hook runs `scripts/check-regressions.sh` and blocks commits with truncated addresses or drastic file shrinkage. It's a safety net, not a replacement for reviewing your changes.
- Don't save speculative or unverified claims.

A `stop` hook also reminds about uncommitted changes at session end.

**Your crypto training data is unreliable.** Protocols launch, rebrand, and
migrate contracts between your training cutoff and today. Never state a fact
you cannot verify from a live source (Dune, DeBank, block explorer, protocol
UI). If the user mentions a token or protocol you don't know, search for it
on DeFiLlama/CoinGecko — don't say it doesn't exist.

## Tools

### 1. Dune Analytics MCP

Query on-chain data (transfers, balances, DEX trades) with DuneSQL.
Manage dashboards and visualizations programmatically.

**MCP server:** `project-0-xaut-dune-dune`

**Core tools:**

| Tool | Use for |
|---|---|
| `createDuneQuery` | New SQL query |
| `updateDuneQuery` | Edit SQL, name, or tags |
| `getDuneQuery` | Read current SQL |
| `executeQueryById` | Run query (returns execution ID) |
| `getExecutionResults` | Poll for results |
| `generateVisualization` | Create chart/table from query |
| `getDashboard` | Fetch full dashboard state |
| `updateDashboard` | Replace dashboard widgets |

**Always read tool schemas before calling.** Schemas live at:
`/Users/user/.cursor/projects/Users-user-xaut-dune/mcps/project-0-xaut-dune-dune/tools/<toolName>.json`

### 2. DeBank API (Pro)

Wallet-level DeFi position data: supplied/borrowed assets, health rates,
protocol breakdown. Returns structured JSON.

**Base URL:** `https://pro-openapi.debank.com/v1`
**Auth header:** `AccessKey: <key from .env DEBANK_API_KEY>`

**Key endpoint — wallet DeFi positions:**

```bash
curl -s "https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=<address>&chain_id=<chain>" \
  -H "AccessKey: $DEBANK_API_KEY"
```

- Empty response `[]` = no DeFi positions (exchange wallet, idle, or contract)
- Each item has `supply_token_list`, `borrow_token_list`, `health_rate`
- `position_index` maps to the lending market ID on the protocol

**Other useful endpoints:**

| Endpoint | Use for |
|---|---|
| `/v1/user/token_list?id=<addr>&chain_id=<chain>` | Token balances |
| `/v1/user/total_balance?id=<addr>` | Portfolio value |

### 3. Protocol UIs (Browser)

For live rates that aren't available via API — subsidized borrow rates,
available liquidity, market parameters.

Navigate to protocol market pages using `position_index` from DeBank:

```
https://lista.org/lending/market/bsc/<position_index>?tab=market
https://app.venus.io/market/<token>
```

---

## Workflow

### Phase 1: Discover — Token Landscape (Dune)

Understand supply, holder distribution, and usage.

**Cumulative supply** — track mints/burns from zero address:

```sql
SELECT block_date as day,
  SUM(CASE WHEN "from" = 0x0000000000000000000000000000000000000000 THEN amount ELSE 0 END) as minted,
  SUM(CASE WHEN "to" = 0x0000000000000000000000000000000000000000 THEN amount ELSE 0 END) as burned
FROM tokens.transfers
WHERE blockchain = '<chain>'
  AND contract_address = <token_address>
GROUP BY 1
```

**Top holders** — net balance from inflows minus outflows:

```sql
WITH inflows AS (
  SELECT "to" as wallet, SUM(amount) as total_in
  FROM tokens.transfers
  WHERE blockchain = '<chain>' AND contract_address = <token_address>
  GROUP BY 1
),
outflows AS (
  SELECT "from" as wallet, SUM(amount) as total_out
  FROM tokens.transfers
  WHERE blockchain = '<chain>' AND contract_address = <token_address>
  GROUP BY 1
)
SELECT COALESCE(i.wallet, o.wallet) as wallet,
  COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) as balance
FROM inflows i
FULL OUTER JOIN outflows o ON i.wallet = o.wallet
WHERE COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) > 0
ORDER BY balance DESC
LIMIT 20
```

### Phase 2: Identify — Label Addresses (DeBank)

For each top holder from Phase 1, call DeBank `complex_protocol_list`.

**Classification logic:**

| DeBank response | Likely identity |
|---|---|
| Empty `[]` + known exchange | Exchange hot/cold wallet |
| Empty `[]` + unknown | Idle holder or intermediary |
| Protocol positions with supply + borrow | Yield farmer |
| Single supply position | Passive depositor |
| Contract address in protocol | Protocol contract (vault, controller) |

Build a label map as you go. Check transfer patterns in Dune to identify
mint intermediaries and distribution wallets.

### Phase 3: Label — Inject into Queries (Dune)

Use a CTE with VALUES to label addresses in every query:

```sql
WITH known_labels AS (
  SELECT address, label FROM (VALUES
    (<addr1>, 'Label 1'),
    (<addr2>, 'Label 2'),
    (<addr3>, 'Label 3')
  ) AS t(address, label)
)
SELECT
  COALESCE(kl.label, CONCAT(SUBSTR(CAST(wallet AS VARCHAR), 1, 8), '...')) as wallet_label,
  balance
FROM holders h
LEFT JOIN known_labels kl ON h.wallet = kl.address
```

Reuse this CTE across all queries. When labels change, update the VALUES
block in every query that uses it.

### Phase 4: Map Flows (Dune)

Track how tokens move between labeled entities:

```sql
SELECT
  COALESCE(kl_from.label, SUBSTR(CAST(t."from" AS VARCHAR), 1, 8)) as source,
  COALESCE(kl_to.label, SUBSTR(CAST(t."to" AS VARCHAR), 1, 8)) as destination,
  COUNT(*) as transfers,
  SUM(amount) as total_amount
FROM tokens.transfers t
LEFT JOIN known_labels kl_from ON t."from" = kl_from.address
LEFT JOIN known_labels kl_to ON t."to" = kl_to.address
WHERE t.blockchain = '<chain>'
  AND t.contract_address = <token_address>
  AND (kl_from.address IS NOT NULL OR kl_to.address IS NOT NULL)
GROUP BY 1, 2
ORDER BY total_amount DESC
```

### Phase 5: Deep Dive — Strategies (DeBank + Browser)

For each farmer wallet, use DeBank to get exact positions, then cross-reference
with protocol UI for live rates.

**Calculate P&L per position:**
- Supply value x supply APY = supply income
- Borrow value x net borrow rate (native - rewards) = borrow cost
- Sum across all positions = total estimated annual P&L

**Identify strategy type:**
- Supply token A, borrow stablecoins → **Leveraged long** (bullish on A)
- Supply AND borrow same token → **Delta-neutral rate arbitrage**
- Supply into vault only → **Passive yield**

### Phase 6: Dashboard (Dune MCP)

Assemble queries into a public dashboard.

**Critical rule: `updateDashboard` replaces ALL widgets.**

Always follow this sequence:
1. `getDashboard` — fetch current state
2. Modify the widget arrays (add, edit, remove)
3. `updateDashboard` — send back the COMPLETE widget arrays

Omitting any widget from the arrays deletes it.

**After updating query SQL, re-execute:**

```
executeQueryById → getExecutionResults (poll until complete)
```

Dune caches results — stale queries won't update on the dashboard until re-executed.

---

## Address Book Pattern

Create a standalone reference table with clickable verification links:

```sql
SELECT
  label as name,
  role as description,
  CONCAT('[DeBank](https://debank.com/profile/', address, ')') as debank,
  CONCAT('[BscScan](https://bscscan.com/address/', address, ')') as bscscan,
  address
FROM (VALUES
  ('Label 1', 'Description of what this address does', '0x...'),
  ('Label 2', 'Description', '0x...')
) AS t(label, role, address)
```

Dune renders markdown links in table cells, making them clickable for verification.

---

## Pitfalls

### Dune MCP
- `updateDashboard` is all-or-nothing — always fetch state first
- `executeQueryById` uses `query_id` (snake_case); `getExecutionResults` uses `executionId` (camelCase)
- Renaming a dashboard changes its URL slug unless you set `slug` explicitly
- Always read tool JSON schemas before calling — parameter names can be surprising

### DeBank API
- `complex_protocol_list` returns DeFi positions only, not token balances
- Empty `[]` doesn't mean empty wallet — just no DeFi activity
- `position_index` is the market ID on the lending protocol
- Respect rate limits when checking many addresses

### General
- `tokens.transfers` is the foundation table for almost all EVM token analysis
- Labels are point-in-time — wallet behavior changes; add timestamps if needed
- Subsidized rates (token rewards) are temporary and can change without notice
- For a complete walkthrough with XAUT/BSC examples, see [workflow-guide.md](reference.md)

---

## Quick Reference: Common Queries

**Daily active wallets:**

```sql
SELECT block_date as day, COUNT(DISTINCT wallet) as active
FROM (
  SELECT block_date, "from" as wallet FROM tokens.transfers
  WHERE blockchain = '<chain>' AND contract_address = <token>
  UNION ALL
  SELECT block_date, "to" as wallet FROM tokens.transfers
  WHERE blockchain = '<chain>' AND contract_address = <token>
) t
WHERE wallet != 0x0000000000000000000000000000000000000000
GROUP BY 1
```

**DEX trading volume:**

```sql
SELECT block_date as day,
  SUM(amount_usd) as volume_usd,
  COUNT(*) as trades
FROM dex.trades
WHERE blockchain = '<chain>'
  AND (token_bought_address = <token> OR token_sold_address = <token>)
GROUP BY 1
ORDER BY 1
```

**Protocol TVL over time** (token flowing into a known contract):

```sql
SELECT block_date as day,
  SUM(CASE WHEN "to" = <protocol_contract> THEN amount
           WHEN "from" = <protocol_contract> THEN -amount END) as daily_net,
  SUM(SUM(CASE WHEN "to" = <protocol_contract> THEN amount
               WHEN "from" = <protocol_contract> THEN -amount END))
    OVER (ORDER BY block_date) as cumulative_tvl
FROM tokens.transfers
WHERE blockchain = '<chain>'
  AND contract_address = <token>
  AND (<protocol_contract> IN ("from", "to"))
GROUP BY 1
```
