# Onchain Research

An information hub for AI agents doing crypto research. Verified on-chain
findings, reusable methodology, and lessons learned — so the next research
session doesn't start from zero.

## Philosophy: Zero Assumptions

**LLM crypto knowledge is outdated and unreliable.** During our first research
session, the AI had no knowledge of Aster's asBNB — a $228M LST that is the
#2 token on BNB Chain. Protocols launch, rebrand, migrate contracts, and
change economics between model training cutoffs.

Every piece of data in this repository was verified from a live source:
on-chain query, block explorer, protocol UI, or API response. If a fact
cannot be traced to its source, it doesn't belong here.

## Research

| Topic | Files |
|---|---|
| **BNB Liquid Staking** | [`research/bnb-lst-market.md`](research/bnb-lst-market.md) — full market analysis: holders, strategies, liquidations, DEX liquidity, stablecoin borrowing |
| **BNB LST Growth Trends** | [`research/bnb-lst-growth.md`](research/bnb-lst-growth.md) — supply timeline, holder adoption, market share dynamics |
| **Lista DAO** | [`research/lista-dao-architecture.md`](research/lista-dao-architecture.md) — Moolah lending, BNB Vault, contract addresses |
| **XAUT (Tether Gold) on BSC** | [`research/xaut-bsc-gold-defi.md`](research/xaut-bsc-gold-defi.md) — gold DeFi usage, yield strategies with APYs, liquidity analysis, [Dune dashboard](https://dune.com/vlad_bnbchain/xaut-tether-gold-on-bsc-usage-analysis-lista-dao-holders-yield-strategies) |
| **XAUT Farming Wallets** | [`research/xaut-farming-wallets.md`](research/xaut-farming-wallets.md) — 5 wallets farming gold for 9-12% APY, step-by-step strategy breakdowns, why it works, what could go wrong |

## Code & Scripts

Reusable query scripts and visualization code from the research process.

| File | What it does |
|---|---|
| [`code/dune-queries.sql`](code/dune-queries.sql) | All 18+ Dune SQL queries organized by topic: supply tracking, holder analysis, looping detection, liquidation forensics, DEX price ratios, stablecoin borrowing. Includes contract address reference. |
| [`code/debank-queries.sh`](code/debank-queries.sh) | Bash functions for DeBank Pro API: wallet positions, batch profiling, lending extraction, wallet classification. Source it and call `wallet_positions <addr> bsc`. |
| [`code/bnb-lst-comparison.canvas.tsx`](code/bnb-lst-comparison.canvas.tsx) | Cursor Canvas visualization: interactive dashboard with charts, tables, wallet deep-dives, and strategy breakdowns. Uses `cursor/canvas` SDK. |

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
| [DeFiLlama](https://defillama.com) | Discover protocols, TVL, yield |
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

## Adding New Research

When researching a new chain, protocol, or token:

1. Create a new file under `research/` (e.g., `research/eth-lrt-market.md`)
2. Follow the verification workflow — every data table needs a "Source" column
3. Note what the AI got wrong vs what was discovered from live sources
4. Add lessons learned to help future sessions
5. Update this README with the new topic
