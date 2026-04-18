# Onchain Research

An information hub for AI agents doing crypto research on BSC. Verified
on-chain findings, reusable methodology, lessons learned, plus a
**structured asset benchmark** that an autonomous agent can refresh on
a recurring schedule — so the next research session doesn't start from
zero.

## Philosophy: Zero Assumptions

**LLM crypto knowledge is outdated and unreliable.** During our first research
session, the AI had no knowledge of Aster's asBNB — a $228M LST that is the
#2 token on BNB Chain. Protocols launch, rebrand, migrate contracts, and
change economics between model training cutoffs.

Every piece of data in this repository was verified from a live source:
on-chain query, block explorer, protocol UI, or API response. If a fact
cannot be traced to its source, it doesn't belong here.

---

## For AI Agents: start here

| What | Where | Purpose |
|---|---|---|
| Research index | [`research/INDEX.md`](research/INDEX.md) | Auto-generated table of every research file (topic, chain, verified date, tags, age). Regenerate via `./scripts/build-index.sh` |
| Corrections log | [`CORRECTIONS.md`](CORRECTIONS.md) | Append-only log of every correction. Check here before trusting any file — newer corrections supersede. |
| Session logs | [`research/sessions/`](research/sessions/) | Per-session notebooks: what was researched, what the AI got wrong, what the user corrected. |
| Scripts | [`scripts/`](scripts/) | `build-index.sh` regenerates the index. `check-regressions.sh` runs as a pre-commit safety check. |

A Cursor `beforeShellExecution` hook blocks `git commit` in this repo if the staged diff contains regression patterns (truncated addresses, files shrinking >40%, unexplained section removals). Review every `git diff` manually before committing — the hook is a safety net, not a substitute for judgment.

---

## V1 Asset Benchmark (start here)

The repo is organized around **assets**, not protocols. For any research
task on BSC DeFi, start with the asset card and follow the venue links.

| Layer | Path | What it is |
|---|---|---|
| Asset index | [`research/assets/_index.md`](research/assets/_index.md) | Canonical list of 37 assets that appear in any pool ≥ $500K TVL on Lista, Venus, Aave V3, or Pendle |
| Asset card | [`research/assets/<SYMBOL>.md`](research/assets/) | YAML frontmatter (machine-readable: contract, venues, APYs, TVL, DeBank cross-protocol map) + analysis body |
| Venue inventory | [`research/venues/<protocol>.md`](research/venues/) | Flat table of all pools ≥ $500K TVL per venue, refreshed weekly |
| Protocol catalog | [`research/bsc-defi-catalog.md`](research/bsc-defi-catalog.md) | Every BSC DeFi protocol DeBank tracks, with category + TVL + V1 coverage status — the safety net that catches new venues we don't yet cover |
| Weekly snapshot | [`research/snapshots/YYYY-MM-DD.md`](research/snapshots/) | Diff vs previous week: new assets, new farmers, new incentives, new protocols, cross-protocol asset moves |
| Agent runbook | [`research/AGENTS.md`](research/AGENTS.md) | Exact procedure for the recurring weekly job (DeFiLlama + Pendle API + DeBank Pro API + Dune) |

**Filter rule:** an asset enters V1 if it appears in at least one Lista DAO / Venus / Aave V3 / Pendle pool with TVL ≥ $500K. Currently 37 assets across 59 pools, ~$2.91B aggregate TVL. See [baseline snapshot](research/snapshots/2026-04-18.md).

### How an AI agent uses this

```
1. Question arrives ("what's the best place to borrow USDT on BSC?")
2. Open assets/USDT.md → frontmatter shows every venue + current rates
3. The debank_tracked_protocols field shows usage beyond V1 venues
4. Open the venue file (e.g. venues/aave-bsc.md) for full pool context
5. Optional: open the linked deep-dive (e.g. bsc-midsize-defi-users.md)
   for who's actually using it
```

Every weekly run by the recurring agent (Hermes / Agent Zero / OpenClaw)
keeps this current and writes a new `snapshots/<date>.md` with what
changed. The two sources of change are:

- **DeFiLlama yields API** — for V1 venue pool TVL / APY / incentive data
- **DeBank Pro API** — for the full BSC protocol catalog and per-asset
  cross-protocol presence. This catches new venues and usage shifts that
  the V1 filter would otherwise miss. See
  [`research/bsc-defi-catalog.md`](research/bsc-defi-catalog.md) for
  the DeBank integration spec.

---

## Deep-Dive Research (kept for context)

The asset cards above link to these for "who is doing what" detail.

| Topic | Files |
|---|---|
| **BNB Liquid Staking** | [`research/bnb-lst-market.md`](research/bnb-lst-market.md) — full market analysis: holders, strategies, liquidations, DEX liquidity, stablecoin borrowing |
| **BNB LST Growth Trends** | [`research/bnb-lst-growth.md`](research/bnb-lst-growth.md) — supply timeline, holder adoption, market share dynamics |
| **Lista DAO** | [`research/lista-dao-architecture.md`](research/lista-dao-architecture.md) — Moolah lending, BNB Vault, contract addresses |
| **XAUT (Tether Gold) on BSC** | [`research/xaut-bsc-gold-defi.md`](research/xaut-bsc-gold-defi.md) — gold DeFi usage, yield strategies with APYs, liquidity analysis, [Dune dashboard](https://dune.com/vlad_bnbchain/xaut-tether-gold-on-bsc-usage-analysis-lista-dao-holders-yield-strategies) |
| **XAUT Farming Wallets** | [`research/xaut-farming-wallets.md`](research/xaut-farming-wallets.md) — 5 wallets farming gold for 9-12% APY |
| **Pendle BSC Markets** | [`research/pendle-bsc-markets.md`](research/pendle-bsc-markets.md) — all 35 markets mapped, top 10 by TVL, PT/YT/LP holder analysis |
| **Lista DAO Yield Strategies** | [`research/lista-dao-yield-strategies.md`](research/lista-dao-yield-strategies.md) — top 5 markets by TVL, 9 wallet deep dives, 8 yield strategies (4.5–15% APY) |
| **BSC Mid-Size DeFi Users** | [`research/bsc-midsize-defi-users.md`](research/bsc-midsize-defi-users.md) — 8 active wallets ($60K–$463K) profiled via DeBank, 6 strategies mapped |
| **Benchmark Farmers** | [`research/benchmark-farmers.md`](research/benchmark-farmers.md) — roster of multi-strategy BSC operators that keep reappearing across LST / XAUT / RWA research, with the 7-trait archetype and the DeBank discovery method |
| **Sentora PYUSD ↔ syrupUSDC (Ethereum)** | [`research/sentora-pyusd-syrupusdc-selflending.md`](research/sentora-pyusd-syrupusdc-selflending.md) — cross-chain reference: Morpho / Sentora $423M PYUSD vault routing into a syrupUSDC self-lending loop. Structural template for "the Ethena method" on other stables |
| **Lista ↔ Ethena self-lending (BSC)** | [`research/lista-ethena-selflending-bsc.md`](research/lista-ethena-selflending-bsc.md) — BSC analog of Sentora/syrupUSDC: a $498M whale + HTX exchange + Lista treasury Safe supply ~97% of $215M Lista USD1/U/USDT vaults that fund sUSDe loopers at 96–100% utilization |
| **AI Agent Best Practices (meta)** | [`research/ai-agent-best-practices.md`](research/ai-agent-best-practices.md) — Hermes Agent, OpenClaw, Agent Zero, Herd, DeerFlow, Morpho Agents, agentskills.io. What's transferable to this repo's setup |

> Tip: `research/INDEX.md` is auto-generated by `./scripts/build-index.sh` and lists every research file with topic / chain / verified date / tags / age. Use it as the machine-readable index; use the table above as the curated entry point.

---

## Code & Scripts

Reusable query scripts and visualization code from the research process.

| File | What it does |
|---|---|
| [`code/dune-queries.sql`](code/dune-queries.sql) | All 18+ Dune SQL queries organized by topic: supply tracking, holder analysis, looping detection, liquidation forensics, DEX price ratios, stablecoin borrowing. Includes contract address reference. |
| [`code/debank-queries.sh`](code/debank-queries.sh) | Bash functions for DeBank Pro API: wallet positions, batch profiling, lending extraction, wallet classification, **BSC protocol catalog** (`debank_protocol_list_summary bsc`), per-protocol token breakdowns, and token-to-protocol reverse lookup. Source it and call `wallet_positions <addr> bsc` or `debank_protocol_list_summary bsc`. |
| [`code/bnb-lst-comparison.canvas.tsx`](code/bnb-lst-comparison.canvas.tsx) | Cursor Canvas visualization: interactive dashboard with charts, tables, wallet deep-dives, and strategy breakdowns. Uses `cursor/canvas` SDK. |
| [`code/lista-dao-bsc.canvas.tsx`](code/lista-dao-bsc.canvas.tsx) | Cursor Canvas: Lista DAO market explorer. |
| [`code/pendle-bsc-research.canvas.tsx`](code/pendle-bsc-research.canvas.tsx) | Cursor Canvas: Pendle BSC explorer. |

---

## Methodology

All research follows a strict verification chain:

```
Discovery (aggregators) → Address verification (explorer/CoinGecko)
→ On-chain analysis (Dune) → Wallet classification (DeBank)
→ Live rate check (browser) → Cross-reference everything
```

### Tools

| Tool | What for |
|---|---|
| [DeFiLlama](https://defillama.com) | Discover protocols, TVL, yield. The yields API (`yields.llama.fi/pools` + `/lendBorrow`) is the canonical pool-data source for the V1 benchmark. |
| [Dune Analytics](https://dune.com) | On-chain supply, holders, transfer patterns |
| [DeBank Pro API](https://pro-openapi.debank.com) | Wallet DeFi positions and classification |
| Block explorers (BscScan, Etherscan, etc.) | Contract verification and address labeling |
| [CoinGecko](https://coingecko.com) | Verified contract addresses and market data |
| Protocol UIs (browser) | Live rates, liquidity, market parameters |

### Core Principles

1. **Aggregators first** — you don't know what tokens/protocols exist. Start with DeFiLlama, StakingRewards, CoinGecko.
2. **Verify every address** — anyone can deploy a token with any symbol. Scam tokens are everywhere.
3. **On-chain proof** — supply numbers from mint/burn queries, not from protocol marketing.
4. **DeBank for classification** — classify wallets as protocol contracts, bots, or real users.
5. **Browser for live data** — rates change daily. Never state a rate from model memory.
6. **Ask the user** — they often know about tokens and protocols the AI doesn't.

### Key Technique: DeBank-First Cross-Protocol Analysis

> **Trying to find every lending contract address on-chain is nearly
> impossible.** Protocols deploy multiple sub-contracts (Lista Moolah alone
> has 5+ market instances), use proxy patterns, and don't consistently label
> their addresses. Querying Dune for each one is a whack-a-mole game.

**The insight**: DeBank already indexes every DeFi protocol on every chain.
One API call to `complex_protocol_list` for a single wallet returns its
complete position map — every supply, every borrow, every LP, across every
protocol — with health rates, token amounts, and protocol names.

**The workflow that works**:

```
1. Dune: find candidate wallets (top holders, active interactors)
2. DeBank: one call per wallet → full cross-protocol position map
3. Pattern match: who supplies X and borrows Y? On which protocols?
4. Repeat for 20-30 wallets → comprehensive market behavior picture
```

**Why this beats the alternative**: In BNB LST research, we tried the
"find every contract" approach first — querying Dune for token transfers to
known lending addresses. This found 5 Moolah sub-contracts but missed the
bigger picture. Switching to DeBank-first, we profiled 30+ wallets in
minutes and conclusively proved that zero human wallets were doing
slisBNB/BNB looping — a finding that would have taken dozens of Dune
queries to reach otherwise.

**Cost**: DeBank Pro API charges per call. Budget ~30-50 calls per research
topic (10 for protocol contracts, 20-40 for candidate wallets). Each call
returns complete data — no pagination needed for positions.

**Endpoints used**:
| Endpoint | Returns | Use for |
|---|---|---|
| `user/complex_protocol_list?id=ADDR&chain_id=CHAIN` | Full DeFi positions per protocol | Supply/borrow classification, health rates, strategy detection |
| `user/total_balance?id=ADDR` | Total portfolio USD value | Whale identification, quick triage |

---

## Lessons Learned

Mistakes that cost real debugging time (full details in each research file):

1. AI didn't know asBNB existed — always use aggregators, never model memory
2. Fake tokens on Dune — cross-reference every address with CoinGecko/explorer
3. Ghost supply (ankrBNB) — 100M minted means nothing if 1 address holds it all
4. Borrow rates assumed wrong — only the protocol UI has the live number
5. Dune queries timeout without date partition filters
6. Double-counting supply categories — XAUT in Lista DAO IS the farmers' XAUT, not a separate bucket (from XAUT research)
7. Present APY percentages, not dollar earnings — hedge funds care about "9% APY", not "$225K/year" (from XAUT research)
8. Dune MCP `updateDashboard` replaces ALL widgets — omit one and it's deleted. Always fetch full state first (from XAUT research)
9. Don't name forks by their upstream — "Lista DAO", not "Morpho", even though Lista is a Morpho Blue fork (from XAUT research)
10. APY rates change — quoted 7.05% slisBNB APY, but live rate was 4.49%. Never reuse stale rates. (from BNB LST wallet research)
11. BNB Vault misidentified as looper — it's a lending vault (supply-side), not an automated loop. Read the docs. (from BNB LST wallet research)
12. Theory ≠ practice — slisBNB/BNB looping looks great on paper (~14% APY) but zero human wallets actually do it. Everyone borrows stablecoins instead. (from BNB LST wallet research)
13. DeBank beats Dune for cross-protocol analysis — one `complex_protocol_list` call per wallet reveals every position across every protocol. Don't try to enumerate contract addresses on Dune; let DeBank's index do the work. (from BNB LST cross-protocol research)
14. Protocols deploy many sub-contracts — Lista Moolah has 5+ market instances, not just the one labeled on BscScan. Dune transfer analysis found contracts that BscScan doesn't label. (from BNB LST cross-protocol research)
15. Historical activity ≠ current positions — Dune found 35 wallets that looped slisBNB/BNB in 90 days, but DeBank showed every single one had closed out ($0 portfolios). Always verify current state, not just historical transfers. (from BNB LST cross-protocol research)
16. Dune net balances don't account for liquidations — in Morpho-style markets, liquidation transfers collateral to the liquidator (not back to the borrower) and debt is repaid by the liquidator. This makes liquidated positions look "active" in Dune transfer math while DeBank (which reads contract state) correctly shows $0. Never trust Dune net balance alone for current position detection. (from BNB LST verification research)
17. AI-generated crypto content is 80% right, 20% dangerous — a user-provided AI summary of asBNB mixed accurate facts (token is active, ~238K minted supply, Aster DEX exists, YZi Labs backing) with wrong claims ("rebasing" instead of reward-bearing), inflated TVL ($159M marketing vs ~$12M on-chain circulating), and unverifiable DEX volume. The partial accuracy makes hallucinations harder to spot. Every claim needs independent on-chain verification. (from asBNB fact-check)
18. Marketing TVL ≠ circulating TVL — asBNB reports $150-230M TVL via DeFiLlama, but 999.98M of 1B tokens sit in a treasury pre-mint. Only ~19K tokens are held by 1 non-treasury wallet (~$12M). Always check holder distribution alongside headline TVL numbers. (from asBNB fact-check)
19. Internal platform utility is a blind spot — asBNB's primary use case (collateral on Aster's perp DEX) may not be visible via Dune or DeBank. Tokens with value propositions inside proprietary platforms require direct UI inspection or platform-specific contract analysis. Don't conclude "no DeFi usage" without checking the protocol's own interface. (from asBNB research gap)
20. Theoretical APY ≠ achievable APY — slisBNB/BNB looping shows ~14% on paper, but 30+ wallets tried and 0 humans sustained it. Compare with XAUT farmers who earn 9-12% and all 5 are still active. Survival rate matters more than peak yield (from XAUT farming analysis)
21. Naming labels lie — past research labeled the $138M Lista vault as "USDT", but on-chain inspection (MoolahVault contract `0xfa27f172e0b6ebcEF9c51ABf817E2cb142FbE627`) and DeFiLlama agree the underlying is **USD1**. Trust the contract over a markdown table. (from V1 asset benchmark build)

---

## Adding New Research

When researching a new chain, protocol, or token:

1. If a new asset crosses the $500K TVL filter on Lista / Venus / Aave / Pendle, follow the procedure in [`research/AGENTS.md`](research/AGENTS.md) — add an asset card and update the relevant venue file.
2. For deeper one-off topics (e.g., a new wallet study, a protocol architecture deep-dive), create a new file under `research/` (e.g., `research/eth-lrt-market.md`) and link it from the relevant asset card(s).
3. Follow the verification workflow — every data table needs a "Source" column.
4. Note what the AI got wrong vs what was discovered from live sources.
5. Add lessons learned to the section above.
6. Update this README if a new top-level topic was added.
