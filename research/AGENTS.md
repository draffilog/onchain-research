---
title: Recurring Agent Runbook — BSC DeFi Weekly Snapshot
topic: Runbook
chain: BSC
verified: 2026-04-17
tags: [runbook, agent, weekly, snapshot]
---

# Recurring Agent Runbook — BSC DeFi Weekly Snapshot

**Audience:** autonomous agents (Hermes / Agent Zero / OpenClaw / Cursor) running a recurring task on this repo.
**Cadence:** weekly (default Friday 12:00 UTC).
**Inputs:** the previous week's `venues/*.md` (in git history) + live data sources.
**Outputs:** updated `venues/*.md`, updated `assets/*.md` frontmatter, a new file `snapshots/YYYY-MM-DD.md`, one git commit.

---

## What this benchmark is

This repo is a structured benchmark of every BSC asset usable in pools ≥ $500K TVL across **Lista DAO, Venus, Aave V3, and Pendle**. It is organized as:

```
research/
  README.md          — top-level index
  AGENTS.md          — this file
  assets/            — one card per asset (37 assets in V1)
    _index.md        — canonical asset list
    <SYMBOL>.md      — YAML frontmatter (machine-readable) + analysis body
  venues/            — one inventory per protocol
    lista-dao.md, venus.md, aave-bsc.md, pendle-bsc.md
  snapshots/
    YYYY-MM-DD.md    — weekly diff vs previous week
  <topic>.md         — pre-existing deep-dive research (kept; cross-linked)
```

The agent's job is to **keep this in sync with reality** and produce a weekly diff that highlights:

1. New assets adopted (TVL crossed $500K in any tracked venue)
2. Assets dropped (TVL fell below $500K)
3. Notable APY changes (≥ 50 bps move on supply or borrow side)
4. New incentives (reward token added or APR meaningfully changed)
5. New big farmers (>$100K position appeared in a tracked pool)
6. **New DeFi protocols on BSC** (via DeBank catalog diff; any protocol with TVL ≥ $10M in category Lending / Yields / CDP / Staking that we don't yet cover)
7. **Cross-protocol asset usage shifts** (via per-asset DeBank enrichment; asset now sitting in a protocol it wasn't last week)

---

## Weekly procedure (do these in order)

### Step 1 — Refresh raw pool data

```bash
mkdir -p /tmp/lst-research
curl -s --max-time 30 "https://yields.llama.fi/pools" -o /tmp/lst-research/all-pools.json
curl -s --max-time 30 "https://yields.llama.fi/lendBorrow" -o /tmp/lst-research/lendborrow.json
```

Filter to BSC + projects of interest + TVL ≥ $500K:
- `lista-lending`, `lista-cdp`, `lista-liquid-staking`
- `venus-core-pool` (and `venus-isolated-pools` if any qualify)
- `aave-v3`
- `pendle`

Cross-check Pendle markets with the live API: `https://api-v2.pendle.finance/core/v2/markets/all?chainId=56` (DeFiLlama may lag by hours on new Pendle market launches).

### Step 2 — Update each `venues/*.md`

Replace the inventory table in place with the fresh data. **Do not delete the file** — the previous week's content lives in git history, which is what the diff step will use.

Required columns per row: pool / asset / TVL USD / supply APY / borrow APY / reward / asset card link.

### Step 3 — Update `assets/<SYMBOL>.md` frontmatter

For each asset:
- Refresh `last_verified: YYYY-MM-DD`
- Refresh the `venues:` list with current `tvl_usd`, `supply_apy`, `borrow_apy`, `reward_token`
- Refresh `aggregate.total_tvl_v1_usd` and `aggregate.venue_count`
- Append a row to the **Verification History** table at the bottom of the body (date + source + 1-line note about what changed).

If a brand-new asset crossed $500K and isn't in `assets/`:
1. Run the discovery scripts in [`code/dune-queries.sql`](../code/dune-queries.sql) to verify it's not a fake token (see [Lessons Learned in top-level `README.md`](../README.md)).
2. Confirm contract on CoinGecko + BscScan.
3. Create `assets/<SYMBOL>.md` using the same template as existing cards.
4. Add it to `assets/_index.md`.

### Step 4 — Refresh the DeBank protocol catalog

Requires `DEBANK_API_KEY` in the environment. See [`research/bsc-defi-catalog.md`](bsc-defi-catalog.md) for the full spec.

```bash
source code/debank-queries.sh
# Full BSC protocol catalog (list of {id, name, tvl, site_url, chain})
debank_protocol_list bsc > /tmp/catalog-bsc.json
# Sorted summary (id | name | TVL | site_url)
debank_protocol_list_summary bsc > /tmp/catalog-bsc.tsv
```

Open `research/bsc-defi-catalog.md` and **replace the "Full BSC catalog" table** with the fresh data, filtered to TVL ≥ $1M and sorted by TVL descending. Mark each row with `Covered in V1?` = `yes` if the protocol id matches a tracked V1 venue (see the venue↔DeBank mapping table at the top of the catalog file), else `no`.

**Alert rule:** if a new row appears this week in category `Lending / Yields / CDP / Staking` with TVL ≥ $10M and is not already marked `yes`, it is a **V2 expansion candidate** — record it under "Open Questions for Next Week" in the snapshot.

### Step 5 — Enrich asset cards with DeBank cross-protocol usage

For each asset in [`assets/_index.md`](assets/_index.md), populate the `debank_tracked_protocols:` frontmatter field (add it if absent):

```bash
# In-memory batch: for each protocol with tvl >= $10M in the catalog,
# fetch its token_list and invert to asset -> [protocols]
source code/debank-queries.sh
python3 - <<'PY'
import os, json, urllib.request
KEY = os.environ['DEBANK_API_KEY']
def call(path):
    req = urllib.request.Request(f"https://pro-openapi.debank.com/v1/{path}",
                                 headers={'AccessKey': KEY})
    return json.load(urllib.request.urlopen(req, timeout=15))
catalog = call("protocol/list?chain_id=bsc")
big = [p for p in catalog if (p.get('tvl') or 0) >= 10_000_000]
asset_to_protos = {}
for p in big:
    pd = call(f"protocol?id={p['id']}")
    for t in pd.get('token_list', []) or []:
        addr = (t.get('id') or '').lower()
        if not addr: continue
        usd = (t.get('amount', 0) or 0) * (t.get('price', 0) or 0)
        if usd < 100_000: continue
        asset_to_protos.setdefault(addr, []).append({
            'id': p['id'], 'name': p['name'],
            'category': ','.join(p.get('tag_ids', []) or p.get('tag_names', []) or []),
            'holding_usd': int(usd),
        })
with open('/tmp/asset_to_protos.json', 'w') as f:
    json.dump(asset_to_protos, f, indent=2)
PY
```

Then, for each asset card, merge `asset_to_protos[<contract-lowercase>]` into the frontmatter under `debank_tracked_protocols:`. Sort by `holding_usd` descending.

**Budget:** ~50 DeBank Pro API calls per week for this step (1 catalog + ~30-50 protocol details, depending on how many protocols clear the $10M threshold). Document the call count in the weekly snapshot.

**What this unlocks:** the snapshot can now say "slisBNB is now held by Kernel DAO ($2.3M) — new this week" even though Kernel DAO is not a V1 venue. This is how we catch cross-protocol adoption without expanding the V1 venue list.

### Step 6 — Compute the diff

The simplest source of truth for the diff is git itself:

```bash
cd /Users/user/lst-research
git diff HEAD -- research/venues/ research/assets/ research/bsc-defi-catalog.md
```

Categorize the changes into the snapshot template (see Step 8).

For **new big farmers**, do not rely on git diff. Instead:
- Identify pools where TVL changed by > 10% week-over-week.
- For each such pool, pull top depositors via Dune (see [`code/dune-queries.sql`](../code/dune-queries.sql)) — filter to wallets with `block_date >= CURRENT_DATE - INTERVAL '7' DAY`.
- For any new wallet with > $100K position, classify via DeBank (`wallet_positions <addr> bsc`).
- List entrants in the snapshot's "New Big Farmers" section.

### Step 7 — Write the snapshot

Create `research/snapshots/YYYY-MM-DD.md` from the template at the end of this document.

### Step 8 — Commit

Per the repo rules in [`.cursor/rules/onchain-research-hub.mdc`](../.cursor/rules/onchain-research-hub.mdc):

```bash
cd /Users/user/lst-research
git diff      # ALWAYS review before committing
git add research/venues/ research/assets/ research/snapshots/
git commit -m "weekly snapshot YYYY-MM-DD"
git push
```

---

## Sources of truth

| Question | Primary source | Fallback |
|---|---|---|
| Pool TVL on Lista / Venus / Aave / Pendle | `https://yields.llama.fi/pools` | Protocol UI in browser |
| Pool borrow APY / utilization | `https://yields.llama.fi/lendBorrow` | Protocol UI |
| Pendle market list | `https://api-v2.pendle.finance/core/v2/markets/all?chainId=56` | DeFiLlama |
| Token contract address | CoinGecko + BscScan | Protocol docs |
| Live wallet positions | DeBank Pro `complex_protocol_list` | — |
| Full BSC protocol catalog + categorization | DeBank Pro `protocol/list?chain_id=bsc` | DeFiLlama `/protocols` (less standardized) |
| Which protocols hold a given token | DeBank Pro `protocol?id=<id>` → `token_list` | Dune transfer analysis per address (much more expensive) |
| On-chain holder data | Dune Analytics ([`code/dune-queries.sql`](../code/dune-queries.sql)) | — |
| Token supply (mint/burn) | Dune `tokens.transfers` from zero address | — |

**Hard rules** (from [`.cursor/rules/lst-research-methodology.mdc`](../.cursor/rules/lst-research-methodology.mdc)):
- Never state a fact you cannot trace to a live on-chain or browser-verified source.
- Never trust LLM training data for crypto facts.
- Always show full wallet/contract addresses (no truncation, per [`.cursor/rules/full-wallet-addresses.mdc`](../.cursor/rules/full-wallet-addresses.mdc)).

---

## Snapshot template

Copy this into `snapshots/YYYY-MM-DD.md` and fill it in. Empty sections should say `_None this week_` rather than be omitted.

```markdown
# Weekly BSC DeFi Snapshot — YYYY-MM-DD

**Compared to:** YYYY-MM-DD (previous snapshot)
**Sources:** DeFiLlama yields API, Pendle V2 API, Dune, DeBank Pro API
**Filter:** pools ≥ $500K TVL across Lista DAO, Venus, Aave V3, Pendle on BSC
**DeBank API calls this run:** N (catalog 1 + details ~30-50)

## TL;DR
[3–5 bullet points covering the most important changes this week]

## New Assets Adopted (crossed ≥ $500K in V1 venues)
| Asset | Venue | TVL USD | First-seen Date | Notes |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## Assets Dropped (fell below $500K)
| Asset | Venue | Last TVL USD | Notes |
|---|---|---|---|

## Notable APY Changes (≥ 50 bps move)
| Pool | Side | Before | After | Δ | Reason (if known) |
|---|---|---|---|---|---|

## New / Changed Incentives
| Venue | Pool | Reward Token | Δ APR | Notes |
|---|---|---|---|---|

## New Big Farmers (≥ $100K position appeared)
| Wallet | Position | Venue | Detected via |
|---|---|---|---|

## Cross-Protocol Asset Usage (from DeBank)
New protocol holdings of tracked assets that weren't present last week.
| Asset | Protocol (DeBank id) | Category | Holding USD | Notes |
|---|---|---|---|---|

## New DeFi Protocols on BSC (from DeBank catalog diff)
Protocols that appeared this week in DeBank's BSC catalog with TVL ≥ $10M.
| DeBank id | Name | Category | TVL USD | V1 expansion candidate? |
|---|---|---|---|---|

## Aggregate Stats
| Metric | This Week | Last Week | Δ |
|---|---|---|---|
| Tracked assets | ... | ... | ... |
| Total V1 TVL | ... | ... | ... |
| Lista TVL | ... | ... | ... |
| Venus TVL | ... | ... | ... |
| Aave TVL | ... | ... | ... |
| Pendle TVL | ... | ... | ... |
| DeBank BSC protocols ≥ $1M | ... | ... | ... |

## Open Questions for Next Week
- ...
```

---

## Asset card frontmatter schema

Every `research/assets/<SYMBOL>.md` starts with a YAML block the agent parses and updates. Canonical fields:

```yaml
symbol: slisBNB                     # required; matches filename
name: Staked Lista BNB              # required; human-readable
category: bnb-lst                   # required; one of the categories in _index.md
contract: 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B   # required; full address
decimals: 18                        # required
underlying: BNB                     # what it redeems to / represents
yield_type: reward-bearing (exchange-rate)
last_verified: 2026-04-18           # REQUIRED; update every weekly run
sources:
  bscscan: https://bscscan.com/token/0x...
  defillama_yields_api: https://yields.llama.fi/pools
venues:                             # V1 venues only (Lista/Venus/Aave/Pendle)
  - protocol: Lista LST
    role: liquid-staking-receipt
    tvl_usd: 620163010
    supply_apy: 4.658
    pool_id_defillama: 50bb5f69-85ea-4f70-81da-3661a1633fc4
  # ...
debank_tracked_protocols:           # optional; added by Step 5 each week
  # Any BSC protocol (any category) with ≥ $100K holding
  - id: kernel
    name: Kernel DAO
    category: Staking
    holding_usd: 2300000
  # ...
aggregate:
  total_tvl_v1_usd: 896994763       # sum of venues[].tvl_usd
  venue_count: 3
```

**Rules:**
- `last_verified` is REQUIRED and must be updated every weekly run, even if no other fields changed.
- `venues` is the V1 filtered set — only Lista DAO / Venus / Aave V3 / Pendle pools with TVL ≥ $500K.
- `debank_tracked_protocols` is the broader cross-protocol view — any DeBank-tracked BSC protocol with ≥ $100K holding. This is how we catch usage outside V1 venues without expanding the venue list itself.
- `aggregate` is derived; recompute from `venues` each run.

---

## Things the agent must NOT do

- Don't delete cards just because TVL temporarily dipped under $500K — mark `status: dropped` in frontmatter and keep the card for one snapshot cycle to confirm.
- Don't combine asset cards (e.g., merge slisBNB + slisBNBx) — they are distinct on-chain assets.
- Don't rename the asset filename casing (`slisBNB.md`, not `SlisBnb.md`) — links across the repo will break.
- Don't commit if `git diff` shows changes outside `research/` — flag and stop.
- Don't run `git add -A` blindly. Stage only the files you intended to update.

---

## Onboarding checklist for a new agent

Before the first run:
1. Read [top-level `README.md`](../README.md) (the lessons-learned section, especially the 20 numbered lessons).
2. Read [`assets/_index.md`](assets/_index.md) to understand the V1 universe.
3. Read each `venues/*.md` to understand current state.
4. Read [`code/dune-queries.sql`](../code/dune-queries.sql) and [`code/debank-queries.sh`](../code/debank-queries.sh) — these are the reusable data scripts.
5. Verify access to: DeFiLlama (free), Dune (paid query execution), DeBank Pro API (paid per call, budget ~30-50 calls/run).

When in doubt: **prefer adding a verification note to the snapshot over silently changing data**.
