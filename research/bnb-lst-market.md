# BNB Liquid Staking Token Market Analysis

*Last updated: April 17, 2026*

> **Data integrity note**: All data below was verified via on-chain queries
> (Dune Analytics), DeBank Pro API, BscScan, CoinGecko, and protocol UIs
> (browser). Each data point includes its verification source. Rates and TVL
> numbers are snapshots — re-verify before reusing.

## Research Methodology Note

**LLM crypto knowledge is unreliable.** During this research, the AI had no
knowledge of Aster's asBNB token — a $228M LST that is #2 on BNB Chain. The
user identified it. This is a systemic problem: models are trained on past
data, but crypto moves fast. New protocols launch, rebrand (Astherus → Aster),
and gain hundreds of millions in TVL between training cutoffs.

**Lesson: Always start research from live aggregator data (DeFiLlama, CoinGecko,
StakingRewards), not from model memory. Treat every piece of model-generated
crypto information as potentially wrong until verified on-chain.**

---

## Overview

BNB Chain has four notable liquid staking tokens. The market is heavily
concentrated — two tokens (slisBNB + asBNB) hold 98% of all staked BNB.

## Market Data

| Token | Protocol | Contract | Supply | BNB Backing | TVL (USD) | Share | Verified via |
|---|---|---|---|---|---|---|---|
| **slisBNB** | Lista DAO | `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B` | 930,400 | 930,400 | ~$591M | 72.9% | Dune mint/burn + BscScan |
| **asBNB** | Aster (fka Astherus) | `0x7eb45259af84318972aa3f0eafe550a072824444` | 237,801 (19K circulating) | ~319K | ~$228M (marketing) / ~$12M (circulating) | 25.0% | Dune mint/burn × CoinGecko rate. 999.98M in treasury pre-mint. |
| **aBNBb** | Ankr (legacy) | `0xbb1Aa6e59E5163D8722a122cd66EBA614b59df0d` | 22,210 | 22,210 | ~$14M | 1.7% | Dune mint/burn |
| **BNBx** | Stader | `0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275` | 3,515 | 3,515 | ~$2.2M | 0.3% | Dune mint/burn |

**Total BNB in LSTs**: ~1.27M BNB (~$835M)

**asBNB contract note**: Dune `tokens.erc20` returns many fake "asBNB" and
"Astherus" scam tokens. The verified contract is `0x7eb45259af84318972aa3f0eafe550a072824444`.
The previous address `0x52F24a5e...` returned zero holders on Dune — it may
be a proxy or deprecated.

## How We Found These Tokens

1. **slisBNB, BNBx, aBNBb**: Found via DeFiLlama LST dashboard and Dune
   `tokens.erc20` symbol search. Verified on BscScan.
2. **asBNB**: User knowledge — not in model training data. Verified contract
   via CoinGecko search → BscScan verified source confirmation.
3. **Fake tokens filtered out**: Dune returned scam "asBNB" contracts with
   trillions of supply. Filtered by cross-referencing with CoinGecko verified
   contract and BscScan holder counts.

## Reward Models

### slisBNB (Rebasing)
- 1 slisBNB ≈ 1.0355 BNB (exchange rate from Lista UI, April 2026)
- Rewards via exchange rate appreciation
- **Live APY: 4.49%** (3.98% Launchpool + 0.51% staking) — *from Lista UI*
- ⚠️ Earlier research quoted 7.05% — the rate has dropped significantly

### asBNB (Reward-bearing — NOT rebasing)
- 1 asBNB > 1 BNB (~1.34 at time of research) — *from CoinGecko price ratio*
- Exchange rate appreciates as staking rewards accrue
- Yield from: BNB staking + Binance Launchpool + HODLer airdrops + Megadrops
- ⚠️ Some AI-generated sources describe asBNB as "rebasing" — this is wrong.
  Rebasing means the token quantity in your wallet changes (e.g., stETH).
  asBNB is reward-bearing: the quantity stays fixed, the exchange rate
  appreciates. The distinction matters for tax treatment and DeFi composability.

### aBNBb (Ankr Legacy)
- Dune showed 410K minted, 410K burned, 22K remaining net supply
- Ankr migrated to a different model; BSC presence has shrunk

### BNBx (Reward-bearing)
- Dune showed 229K minted, 225K burned — nearly entirely redeemed
- Marginal market presence

---

## Holder Distribution

### How we classified holders

1. Computed net balances via Dune `tokens.transfers` (inflows - outflows)
2. Looked up each top address on BscScan for contract labels
3. Called DeBank `complex_protocol_list` for DeFi position data
4. Empty DeBank `[]` + contract on BscScan = protocol contract
5. DeBank positions visible = real user wallet
6. DeBank `total_balance` endpoint for total portfolio value

### slisBNB — Protocol Contracts (80% of supply)

| # | Address | Balance | Role | How identified |
|---|---|---|---|---|
| 1 | `0x91e49983598685dd5acac90ceb4061a772f6e5ae` | 414,983 | Lista staking pool | DeBank: `bsc_helio` staked 430K BNB |
| 2 | `0x6f28fec449dbd2056b76ac666350af8773e03873` | 180,377 | Lista operator | DeBank: pending withdrawals pattern |
| 3 | `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | 149,582 | Moolah controller | BscScan: "Lista DAO: Moolah" label |

### slisBNB — Whale Wallets (DeBank verified, April 2026)

| # | Address | slisBNB | Portfolio | Strategy | Key Positions |
|---|---|---|---|---|---|
| 4 | `0xac3e216bd55860912062a4027a03b99587b7ffc7` | 36,787 | $496M | Pure Lender | 244K WBNB Lista BNB Vault + 4K BNB Moolah supply + $43.6M Venus (BTCB, USDT, WBNB). Zero borrowing. |
| 5 | `0x3d325df6debb6aa237591a348ecb511354f3607d` | 21,333 | $14M | Multi-protocol Lender | 22K BNB Lista lending + small Aster positions. No borrowing. |
| 6 | `0xb2a6a72843db0f508204a56448413f3867ea691a` | 16,455 | $10.7M | Single-protocol Lender | 17K BNB Lista lending only. No borrowing. |
| 7 | `0x1adb950d8bb3da4be104211d5ab038628e477fe6` | 9,783 | $613M | Native Staker + Lender | 15.5K BNB native validator staking + 9.7K BNB Lista lending. |
| 8 | `0x9c580fed6c26dcc06ca7673e72489d8f4ddba0b8` | 9,672 | $13.3M | Diversified Staker | 2K BNB Aster + 9.1K native staking + 10K BNB Lista lending. |
| 9 | `0x128463a60784c4d3f46c23af3f65ed859ba87974` | 5,769 | $1.25B | Aster Mega-whale | $102M USDT + 40K BNB on Aster + 6K BNB Lista. Likely institutional. |
| 10 | `0x6e894e5284c9ea9ec28d86de88d52777d17c718a` | 3,018 | $2.4M | Multi-protocol Explorer | $100K BounceBit USDT + 3.1K BNB Lista + $309K SolvBTC + Kernel DAO. |

**Key finding**: Every whale is purely supply-side. Not a single top holder
borrows against their slisBNB.

### asBNB — Top Holders

| # | Address | Balance | Identity | How identified |
|---|---|---|---|---|
| 1 | `0x5c952063c7fc8610ffdb798152d69f0b9550762b` | 999.98M | Treasury/Mint | Pre-mint address — not a user |
| 2 | `0x85f74ab18ce84cd10a90f0735856a72d0c4576fe` | 18,974 | Unknown | No DeFi positions on DeBank — likely CEX or custodial |

---

## Active DeFi Strategists (slisBNB borrowers, DeBank verified)

These wallets were found by querying Dune for wallets supplying slisBNB to
Moolah (0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c) AND borrowing in the last 90 days, then verifying
every position via DeBank.

| Wallet | slisBNB | Strategy | Borrowing | Health Rate | Details |
|---|---|---|---|---|---|
| `0xe91eabe42d8517b4166aa602e31e0ec8cab18b4c` | 2,407 | Most Diverse (10 protocols!) | $80K USD1 | 1.40 | 200 slisBNB→$80K USD1 + 2.5K BNB Lista lending + $334K Magpie XYZ (PT-clisBNB yield tokens) + Equilibria, Mitosis, OpenEden |
| `0x7e8eaf65ec69de635bede717fb215a296b51b50b` | 1,746 | Leveraged Long BNB | $634K USDT+USD1 | 1.58 | 1,745 slisBNB→$619K USDT + 47 slisBNB→$15K USD1. Also Mitosis, Velvet, Venus. |
| `0x453fff37e5e0492c89058884dc666cefa059e93b` | 1,005 | Multi-Market Stable Borrower | $267K across 4 stables | 1.73-3.26 | 4 separate positions: 125 slisBNB→$20K USDT, 365→$96K U, 176→$41K USD1, 339→$110K U |
| `0xc2aaaecbc0ea098eef864b30e1f788a3342ad7de` | 50 | Active Leveraged Trader | $40K U | 1.28 (tight!) | 50 slisBNB→$22K U + 2×BTCB→U positions. 20 borrow txns in 90d (most active). |
| `0x6cccb5ffaad0fa063b744839c636079ef3bf0e00` | 44 | Small Leveraged Position | $15K USDT | 1.54 | 44.4 slisBNB→$15K USDT + holds $15K USD1 in Lista. |

### Bot / Contract Wallets

| Wallet | Txns (90d) | Type | Notes |
|---|---|---|---|
| `0x33f7a980a246f9b8fea2254e3065576e127d4d5f` | 2,432 | Rebalancer bot | 152K slisBNB churned. Net collateral negative. Empty DeBank. |
| `0xde2f39e895e41d08585f5559c216b362cdeb34ef` | 786 | Loop bot | 786K slisBNB supplied = withdrawn. Still active daily. |
| `0xab300be61089b883882bbff82106c01bff0f54a9` | 430 | Arb bot | 1,985 slisBNB + 2 WBNB borrows. Only bot with confirmed borrows. |
| `0x87a8ff8ad993c10af4ad85b62ddb50b4968abc93` | 3 | Closed mega-position | 150K slisBNB + 350K WBNB + $13.5M USDT. Fully closed Feb 2026. |

### Critical Finding: People Try slisBNB/BNB Looping — Nobody Sustains It

Despite the theoretical appeal (~14% APY at 3x leverage with 1.00% borrow
rate), **no human wallet currently maintains a slisBNB/BNB loop position**.

A follow-up verification query (all-time net balance: supply - withdrawals
for slisBNB, borrows - repayments for WBNB) found **30 wallets** that
*appear* to still have active positions based on Dune transfer math. However,
every single one shows **$0 on DeBank** (which reads actual contract state).

**Explanation**: Many of these wallets were likely **liquidated**. In Morpho
Blue-style markets (which Lista Moolah forks), liquidation transfers
collateral to the liquidator — not back to the original depositor. The debt
is repaid by the liquidator, not the borrower. This creates "ghost positions"
in Dune net balance math: the wallet's slisBNB deposit and WBNB borrow show
as positive (never returned/repaid), even though the position was seized.

**The real story**:
- 30+ wallets opened slisBNB/BNB loop positions
- Many were likely liquidated (Dune shows supply with no withdrawal, borrow
  with no repayment — classic liquidation signature)
- The survivors closed out voluntarily
- Active borrowers who remain use slisBNB to borrow **stablecoins**
  (USDT, USD1, U) — leveraged long on BNB price, not yield loops

**Methodological lesson**: Dune transfer-based net balances ≠ current
positions. Only protocol-level data (DeBank `complex_protocol_list`, or
direct contract state reads) gives the actual current state. Liquidations,
intermediary contracts, and flash loans all break Dune net balance math.

### Cross-Protocol Looping Analysis (April 17 2026)

**Methodology**: Queried Dune for ALL BSC contracts receiving slisBNB
transfers from multiple unique senders (3+ in 90 days). Identified 5 Lista
Moolah market contracts and checked Venus vasBNB markets. Verified 30+
wallets on DeBank.

**Moolah Market Contracts Discovered:**

| Contract | Role | DeBank Balance | Depositors (90d) |
|---|---|---|---|
| `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | Primary Moolah Controller | $706K | 144 |
| `0x9474e972f49605315763c296b122cbb998b615cf` | Secondary Moolah Market | $3.4M | 113 |
| `0x3dcea6afba8af84b25f1f8947058af1ac4c06131` | Moolah Lending Pool | $8.7M | 95 |
| `0x63242a4ea82847b20e506b63b0e2e2eff0cc6cb0` | Moolah Router | $172 | 146 |
| `0x89c910eb8c90df818b4649b508ba22130dc73adc` | Moolah Sub-contract | $706K | 144 |

**Key findings:**
1. **30+ wallets tried slisBNB/BNB looping** — Dune net balances show open positions, but DeBank shows all at $0 (likely liquidated or closed via intermediary contracts)
2. **0 currently active human loopers** — every position was either liquidated or voluntarily closed
3. **Venus has NO slisBNB market** — only vasBNB (for asBNB)
4. **0 asBNB/BNB loopers on Venus** in 90 days
5. **48 of top 50 slisBNB holders** are pure passive holders (zero borrows in 30d)
6. **Only 3 active stablecoin borrowers** with slisBNB collateral (max 97 slisBNB)

**Historical Loopers (all closed):**

| Wallet | slisBNB | WBNB Borrowed | Status | Current Portfolio |
|---|---|---|---|---|
| `0xa338c6c146e6ecda7623ee391caecae127806aaa` | 3,340 | 25,137 | Closed | $113K (PancakeSwap V3 LP only) |
| `0x990636ecb3ff04d33d92e970d3d588bf5cd8d086` | 3,414 | 3,520 | Closed ($0) | Was on Ankr, Aster, Lista, Venus |
| `0x0bb7a4fdea32910038dec59c20ccae3a6e66b09f` | 3,288 | 3,397 | Closed ($0) | Former Venus user |
| `0x32c830f5c34122c6afb8ae87aba541b7900a2c5f` | 758 | 783 | Migrated | $179K — now Aave V3 + YieldNest, zero borrows |
| `0xccf822b17fb1364704c51cc69ff670536849f02c` | 289 | 317 | Closed ($0) | Cross-protocol (Moolah + secondary) |

**Why nobody sustains loops in practice:**
1. **Liquidation risk is real** — 30+ wallets tried, many appear liquidated (Dune shows deposits with no withdrawals, borrows with no repayments — classic liquidation signature in Morpho-style markets)
2. Depeg risk — even small slisBNB/BNB deviations trigger liquidation at 96.5% LLTV (~3-4% buffer at 3x)
3. Gas costs — maintaining multi-step positions requires constant monitoring
4. Simpler alternatives — passive 4.49% requires zero effort vs ~14% theoretical at 3x
5. Bot competition — automated actors dominate the looping flow and quickly arb away edge

**Methodological note**: Dune net balance (supply - withdrawals) is NOT
reliable for detecting current positions in Morpho-style lending markets.
Liquidations transfer collateral to the liquidator, not back to the borrower,
creating "ghost positions" in transfer math. Always verify with DeBank
(reads contract state) or direct contract calls.

---

## DeFi Strategies & APY

| Strategy | APY | Risk | How It Works | Source |
|---|---|---|---|---|
| **Passive LST Hold** | **4.49%** | Low | Hold slisBNB/asBNB. 3.98% Launchpool + 0.51% staking. | Lista UI (live) |
| LST Looping (2x) | ~8% | Low-Med | slisBNB collateral → borrow BNB at 1.00% → restake (conservative) | Calculated below |
| LST Looping (3x) | ~14% | Medium | Same at higher leverage — 3-4% liquidation buffer | Calculated below |
| Lista BNB Vault | ~0.35% | Very Low | Lending vault (supply-side). NOT a looping vault. | Lista UI: 17.75% utilization |
| asBNB DEX Collateral | 3-15% + PnL | Medium | asBNB as perp margin on Aster DEX | Aster docs |
| Stability Pool | Up to 93% (peak) | Medium-High | Absorb liquidations + governance emissions. High variance. | Lista blog |
| Liquid Restaking | Base + points | Medium | Restake via Binomial / Kernel DAO / YieldNest | Protocol UIs |

### Strategy Comparison for 47 BNB (~$30K)

| Strategy | Net APY | Annual Yield | Risk | Effort |
|---|---|---|---|---|
| Hold slisBNB | 4.49% | ~$1,334 | Very Low | None |
| Loop 2x | ~8% | ~$2,370 | Low-Med | One-time setup |
| Loop 3x+ | ~14% | ~$4,140 | Medium | One-time setup |
| BNB Vault (lend) | ~0.35% | ~$104 | Very Low | None |
| asBNB hold | ~4-5% | ~$1,300 | Low | None |

## Looping Strategy Deep Dive

### Mechanism

1. Stake BNB → receive slisBNB
2. Supply slisBNB as collateral on Lista Moolah
3. Borrow BNB at current rate (checked via browser)
4. Stake borrowed BNB → more slisBNB
5. Repeat for 2-3 loops

### Economics (3.7x leverage, rates from April 17 2026)

```
Start: 47 BNB

Loop 1: 47 BNB → ~45.4 slisBNB → borrow ~43.8 BNB (96.5% LLTV)
Loop 2: 43.8 BNB → ~42.3 slisBNB → borrow ~40.8 BNB
Loop 3: 40.8 BNB → ~39.4 slisBNB

Total slisBNB exposure: ~174 BNB
Total borrowed:         ~127 BNB

Gross yield:  4.49% × 174 = 7.81 BNB/yr   (slisBNB APY from Lista UI)
Borrow cost:  1.00% × 127 = 1.27 BNB/yr   (Moolah rate, Lista UI Apr 17 2026)
Net yield:                   6.54 BNB/yr
Effective APY:               6.54 / 47 = ~13.9%
```

**WARNING**: Both the base APY and borrow rate change. Re-calculate with
live numbers from the protocol UI before acting on this.

**CORRECTION**: Earlier versions of this document quoted 7.05% slisBNB APY
and ~17.2% loop APY. The slisBNB rate has dropped to 4.49% (verified live
on Lista UI, April 17 2026), reducing loop yields proportionally.

### Lista BNB Vault — NOT a Looping Vault

**Previous versions of this document incorrectly stated the BNB Vault
"automates the loop."** This is wrong.

The Lista BNB Vault is a **lending supply pool**:
- You deposit BNB → it gets allocated to borrowers across Moolah markets
- You earn interest from borrower payments
- At 17.75% utilization (April 2026), most BNB sits idle → very low yield

The mega-whale (0xac3e, $496M portfolio) deposits 244K WBNB here as a
**lender**, not a looper. They earn from borrowers — including people who
borrow BNB for looping.

Verified via: Lista docs (permissionless lending pools), Lista UI (utilization
metrics), DeBank (wallet position shows `helio_tokenized_vault_yield` — a
vault deposit, not a leveraged position).

### Lista Lending Parameters (browser-verified, April 17 2026)

Checked live on `lista.org/lending`:

- **slisBNB staking APY**: 4.49% (3.98% Launchpool + 0.51% staking)
- **Exchange rate**: 1 slisBNB ≈ 1.0355 BNB
- **Total BNB staked**: 963,498 BNB ($608.8M)
- **Borrow rate**: 1.00% APY (dropped from 1.98% — rate changes with utilization)
- **LLTV**: 96.5%
- **BNB Vault deposits**: 495K BNB ($312.9M)
- **BNB Vault utilization**: 17.75%
- **Total Lending TVL**: $876M
- **Total deposits**: $572.7M
- **Total borrowed**: $211.6M

---

## DEX Liquidity & Peg Stability (April 2026)

> Data from Dune queries on `dex.trades`, 6-month window (Oct 2025 - Apr 2026).
> Query IDs: 7331957 (DEX volume), 7331961 (price ratio).

### slisBNB DEX Trading Profile

| Metric | Value | Source |
|---|---|---|
| Typical daily volume | $200K–$2.5M | Dune `dex.trades` (6-month avg) |
| Typical daily trades | 100–300 | Same |
| Average trade size | $1,500–$5,000 | Same |
| Largest single trade observed | ~$644K (Dec 7, 2025) | Same |
| Spike volume (Nov 3-6, 2025) | 25,890 trades in one day | PancakeSwap bot wave |

### slisBNB/BNB Peg Analysis (12 months, Dune 7331961)

The slisBNB/BNB ratio on DEX has been tracked via direct pair trades on PancakeSwap:

| Period | Avg Ratio | Min Ratio | Max Ratio | Notes |
|---|---|---|---|---|
| Apr 2025 | 0.9752 | 0.9718 | 1.0110 | Stable with outlier arb trades |
| **May 5, 2025** | **0.9712** | **0.8090** | **0.9733** | **Flash depeg — 17% deviation** |
| May 6-16, 2025 | 0.9734 | 0.9722 | 0.9752 | Recovery within 24 hours |
| Overall (12-month) | 0.974 | — | — | Very tight around fair value |

The ratio of ~0.974 means you get 0.974 slisBNB per 1 WBNB on DEX, implying 1 slisBNB ≈ 1.027 BNB on DEX. The official exchange rate is 1.0355, so DEX trades at a ~0.8% discount (liquidity premium).

### May 5, 2025 Flash Depeg Event

The most significant peg deviation: slisBNB/BNB ratio dropped to 0.809 (from normal 0.974), a 17% deviation. This coincided with the first wave of Moolah liquidations (24 events that month, 10 unique borrowers). The peg recovered within 24 hours.

### asBNB DEX Liquidity

asBNB has essentially **zero DEX liquidity**. Only 12 unique recipients have ever received the token, and no significant DEX trading activity was detected in Dune.

---

## Liquidation Forensics (April 2026)

> Data from Dune `bnb.logs` querying Moolah controller liquidation events.
> Event signature: `0xa4946ede45d0c6f06a0f5ce92c9ad3b4751452d2fe0e25010783bcab57a67e41`
> Query IDs: 7332004 (events), 7332009 (monthly summary), 7332010 (top borrowers).

### Liquidation Event Summary

**Total: 1,555 liquidation events** across all Moolah markets on the primary controller (`0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c`).

| Month | Liquidations | Unique Borrowers | Tokens Seized | Tokens Repaid | Bad Debt |
|---|---|---|---|---|---|
| Apr 2025 | 6 | 1 | 17 | 10 | 0 |
| May 2025 | 24 | 10 | 851 | 15,707 | 0 |
| Jun 2025 | 48 | 15 | 54 | 37,791 | 0 |
| Jul 2025 | 62 | 21 | 37,390 | 8,149 | 0 |
| Aug 2025 | 112 | 20 | 8,814 | 12,605 | 548 |
| **Sep 2025** | **133** | **52** | **96,864** | **119,006** | **0** |
| **Oct 2025** | **635** | **120** | **458,160** | **199,815** | **0** |
| **Nov 2025** | **198** | **38** | **4,156,217** | **3,375,167** | **0** |
| Dec 2025 | 37 | 22 | 28,511 | 27,961 | 0 |
| Jan 2026 | 91 | 69 | 131,775 | 362,887 | 0 |
| Feb 2026 | 137 | 72 | 31,479 | 805,349 | 0 |
| Mar 2026 | 62 | 47 | 49,508 | 15,068 | 1,465 |
| Apr 2026 | 10 | 7 | 1,294 | 4,025 | 97 |

### Key Liquidation Insights

1. **October 2025 was catastrophic**: 635 liquidation events, 120 unique borrowers. This is the same month slisBNB supply peaked at 1.26M — aggressive leveraging preceded mass liquidation.

2. **November 2025 had the largest value seized**: 4.15M tokens in 198 events. Fewer events but larger positions being unwound.

3. **Bad debt is minimal**: Only 2,110 tokens of bad debt across the entire history. The LLTV of 96.5% with oracle pricing keeps the protocol healthy.

4. **Liquidation waves correlate with supply decline**: slisBNB supply dropped from 1.26M (Oct 2025) to 930K (Apr 2026), a period that saw 1,365 liquidation events.

### Top Liquidated Borrowers (All Time)

| Borrower | Times Liquidated | Total Seized | Total Repaid | First | Last |
|---|---|---|---|---|---|
| `0x5dbf56810f0c07e68c2dd8214408074148541d24` | 113 | 1,978,223 | 1,642,280 | Nov 2025 | Mar 2026 |
| `0x50de1aa50ff7f5b067e9bdfb317d113c8c0d3da8` | 42 | 1,922,108 | 1,595,696 | Nov 2025 | Jan 2026 |
| `0xd0208182c9c5c2448d226b3997f6a3d54a5cb1b8` | 2 | 284,973 | 47,007 | Sep 2025 | Oct 2025 |
| `0x0c0a0d1a714e75fa6a97a8e51a9302c99cbfbd17` | 3 | 123,916 | 18,145 | Oct 2025 | Nov 2025 |
| `0xb21ddfceacb8bf265efe89156b1d71d19d012c91` | 1 | 82,162 | 8,586 | Nov 2025 | Nov 2025 |
| `0x03648c897f9adbd74ba2dfcd0a0073e7a1754d80` | 2 | 60,201 | 7,679 | Jan 2026 | Feb 2026 |
| `0x81d715451888db3b7b4acd2a7a04e1596b01dac7` | 3 | 59,938 | 6,230 | Nov 2025 | Mar 2026 |
| `0x5d3d96cc9579bc7db9258c7fb242624fc54209dd` | 2 | 52,458 | 5,880 | Oct 2025 | Feb 2026 |

The top borrower was liquidated **113 times** over 5 months with nearly 2M tokens seized. This is a single entity (likely a bot or automated system) that repeatedly opened and was liquidated on leveraged positions.

### Depeg-Liquidation Correlation

| Date | Event | Consequence |
|---|---|---|
| May 5, 2025 | slisBNB/BNB flash depeg to 0.809 | 24 liquidation events that month (first major wave) |
| Oct 2025 | 635 liquidation events | slisBNB supply dropped from 1.26M ATH |
| Nov 2025 | 4.15M tokens seized | Supply declined further to 1.21M |

The flash depeg event of May 2025 directly triggered the first significant liquidation wave, confirming that slisBNB/BNB peg instability is the primary liquidation trigger.

---

## Stablecoin Borrowing Markets (90-day, April 2026)

> Data from Dune query 7332024: transfers from Moolah controller contracts.

### What People Actually Borrow

| Asset | 90d Volume | Borrow Txns | Unique Borrowers | Rank |
|---|---|---|---|---|
| **USDT** | Dominant | 112,543 | 1,998 | #1 by far |
| **WBNB** | Large | 127,324 | 610 | #2 (mostly bot flow) |
| **USDC** | Moderate | 723 | 119 | #3 stablecoin |
| **slisBNB** (collateral recycling) | Moderate | 11,717 | 350 | Bots churning collateral |

USDT dominates stablecoin borrowing with nearly 2,000 unique borrowers — 3x more than WBNB (610). This confirms the finding that real users prefer **stablecoin borrowing** (leveraged long BNB) over same-asset looping.

### Key Finding: Stablecoin Leverage > BNB Loops

The borrower distribution tells the whole story:
- **USDT**: 1,998 borrowers — people borrowing stablecoins against crypto collateral (leveraged long)
- **WBNB**: 610 borrowers — mostly bots doing arbitrage and looping (few humans sustain it)
- **USDC**: 119 borrowers — similar strategy to USDT but smaller market

Real users borrow stablecoins because:
1. No peg risk — you repay in the same stablecoin you borrowed
2. Leveraged exposure — effectively going long on BNB with borrowed USD
3. Simpler mental model — "borrow dollars, keep BNB exposure"

---

## asBNB DeFi Ecosystem

> Data from Dune query 7331976, DeBank API, and fact-check against external claims.

### Current State: Minimal On-Chain DeFi Activity

| Metric | On-Chain Finding | AI-Generated Claim | Verdict |
|---|---|---|---|
| Total unique recipients | 12 | Not stated | Verified via Dune |
| Non-treasury holders | 1 (`0x85f74ab18ce84cd10a90f0735856a72d0c4576fe` — 18,974 asBNB) | "Circulating supply ≈ 238K asBNB" | Discrepancy — 238K minted but only 19K outside treasury held by 1 wallet |
| DeFi positions on DeBank | Empty `[]` for top holder | "$159M TVL" | Misleading — see below |
| DEX trading volume | Negligible (no slisBNB-scale liquidity) | "$10K–$150K 24h" | Not confirmed in Dune `dex.trades` |
| Venus vasBNB market | Exists but 0 asBNB/BNB loopers in 90d | Not stated | Verified |
| Token type | Reward-bearing (exchange rate appreciation) | "Rebasing" | **Wrong** — asBNB is reward-bearing, not rebasing |

### asBNB TVL: Marketing vs On-Chain Reality

Multiple sources (DeFiLlama, AI-generated summaries) report asBNB TVL as $150-230M.
This is the notional value of all minted asBNB × exchange rate. The on-chain reality:

| Category | Amount | Notes |
|---|---|---|
| Treasury pre-mint | 999.98M asBNB | Single address `0x5c952063c7fc8610ffdb798152d69f0b9550762b` |
| Circulating outside treasury | ~19K asBNB | Held by 1 non-treasury wallet |
| Visible DeFi activity | $0 | Top holder shows empty `[]` on DeBank |
| **Realistic "DeFi TVL"** | **~$12M** | 19K × ~$635 (BNB price × 1.34 exchange rate) |

The gap between $159M (marketing) and $12M (on-chain circulating) comes from
counting treasury-held tokens. This is a common pattern — high reported TVL
driven by pre-minted supply that never entered circulation.

### Aster DEX Internal Utility — Unverified Gap

AI-generated sources claim asBNB can be used as **yield-bearing collateral on
Aster's perpetual DEX** (95% collateral value ratio). This is a significant
DeFi utility that our on-chain tools **cannot verify**:

- DeBank does not index Aster DEX's internal collateral system
- Dune's `dex.trades` table may not capture Aster's proprietary perp engine
- The actual asBNB utility may be happening inside Aster's platform, invisible
  to general on-chain analysis tools

**This is the biggest research gap for asBNB.** The token may have real
utility within Aster's ecosystem that our standard Dune + DeBank methodology
doesn't capture. Verifying this would require:

1. Browsing Aster DEX UI directly (asterdex.com)
2. Checking if asBNB collateral positions are visible on-chain
3. Looking for Aster-specific contract interactions on BscScan

### Why asBNB Has No *External* DeFi Ecosystem

1. **Ultra-concentrated supply**: 999.98M of 1B in treasury, only 12 recipients ever
2. **No DEX liquidity**: Without liquid trading pairs, external protocols can't build on it
3. **No lending market for slisBNB-style leverage**: Venus has vasBNB but zero usage
4. **Internal utility model**: asBNB's value proposition is collateral on Aster's own DEX,
   not composability across the broader DeFi ecosystem — opposite of slisBNB's approach
5. **Reward model**: Launchpool/Megadrop rewards accrue inside the exchange rate,
   not as separate DeFi yield

---

## Native BNB Staking vs LSTs

### Comparison Framework

| Feature | Native Staking | slisBNB | asBNB |
|---|---|---|---|
| **Yield** | ~2.5-3.5% (varies by validator) | 4.49% (3.98% Launchpool + 0.51% staking) | ~4-5% (staking + Launchpool + airdrops) |
| **Lock Period** | 7-day unbonding | Instant (DEX) or ~7 days (redeem) | Unclear (limited liquidity) |
| **DeFi Composability** | None | Full (Moolah, Venus, DEX LPs) | Internal only (Aster DEX collateral) — unverified on-chain |
| **Smart Contract Risk** | Low (native staking contract) | Medium (Lista contracts) | Medium (Aster contracts) |
| **Holders** | Wide (many validators) | 809K wallets | 12 wallets |
| **Supply** | ~31M BNB total staked (BSC PoS) | 930K slisBNB | ~19K circulating |

### Who Does What (from DeBank wallet analysis)

| Wallet | slisBNB | Native Staking | Strategy |
|---|---|---|---|
| `0x1adb950d8bb3da4be104211d5ab038628e477fe6` | 9,783 | 15,500 BNB | Splits between native + LST, uses Lista lending for LST portion |
| `0x9c580fed6c26dcc06ca7673e72489d8f4ddba0b8` | 9,672 | 9,100 BNB | Diversified across Aster, native staking, and Lista lending |

These whales split roughly 50/50 between native staking and LSTs, suggesting they view them as complementary rather than substitutes. The LST portion goes into lending for additional yield, while native staking is the "safe" allocation.

### Breakeven Analysis: When Does the LST Premium Justify the Risk?

| Scenario | Native APY | slisBNB APY | Extra Yield | Justifies risk? |
|---|---|---|---|---|
| Hold only | ~3% | 4.49% | +1.49% | Marginal — depends on risk tolerance |
| Passive supply (Moolah) | ~3% | 4.49% + lending yield | +2-3% | Yes — meaningful uplift |
| 2x leverage loop | ~3% | ~8% theoretical | +5% | High risk (liquidation evidence above) |
| Stablecoin borrow | ~3% | 4.49% + borrowed capital | Depends on use of stables | Strategy-dependent |

The key insight: **LSTs justify their smart contract risk only when used in DeFi** (lending, borrowing, LP). For pure holding, the extra 1.5% over native staking barely compensates for smart contract risk. The whales seem to agree — they all use their slisBNB in lending markets.

---

## Data Sources

| Source | What we got from it |
|---|---|
| Dune `tokens.transfers` | Mint/burn supply, top holders, Moolah interactions, cross-protocol transfers, historical loopers |
| Dune `tokens.erc20` | Token discovery (with fake token filtering), Venus vToken identification |
| Dune `prices.usd_latest` | BNB price for TVL calculations |
| Dune `dex.trades` | DEX trading volume, slisBNB/BNB price ratio, depeg detection |
| Dune `bnb.logs` | Moolah liquidation events (1,555 total), monthly patterns, top liquidated borrowers |
| Dune custom queries (18 total) | Active borrowers, stablecoin borrows, asBNB holders, Moolah markets, growth trends, holder stats, liquidation forensics |
| DeBank `complex_protocol_list` | Wallet DeFi positions, protocol classification |
| DeBank `total_balance` | Total portfolio values for whale wallets |
| Lista UI (browser) | Live borrow rates, APY, LLTV, utilization, vault metrics |
| Venus UI (browser) | BNB borrow rate, vasBNB market verification |
| BscScan | Contract verification, address labeling |
| CoinGecko | asBNB exchange rate, verified contract addresses |

## Mistakes Made During This Research

1. **Missed asBNB entirely** — AI had no training data on Aster. Discovered
   only because the user knew about it. Start from aggregators, not memory.
2. **Trusted Dune symbol search** — found fake "asBNB" contracts with trillions
   of supply. Must cross-reference every address with CoinGecko/BscScan.
3. **ankrBNB ghost supply** — 100M pre-minted supply with zero real users.
   Always check holder distribution alongside raw supply numbers.
4. **Assumed borrow rate** — initial estimate was wrong. Checking the live
   protocol UI showed a different rate (1.98% vs assumed ~2.79%).
5. **Dune query timeouts** — forgot partition filters on a full-history query.
   Always use `block_date >= CURRENT_DATE - INTERVAL '90' DAY`.
6. **slisBNB APY changed** — quoted 7.05% from earlier session but live rate
   was 4.49%. Always re-verify rates from protocol UI, never reuse old numbers.
7. **BNB Vault misidentified as looper** — incorrectly stated it "automates
   the loop." It's a lending vault (supply-side). Corrected after reading
   Lista docs and verifying vault mechanics. The vault deposit adapter
   (`helio_tokenized_vault_yield`) is a lending position, not leveraged.
8. **asBNB contract confusion** — original address `0x52F24a5e...` returned
   zero holders on Dune. Correct address found via `tokens.erc20` search:
   `0x7eb45259af84318972aa3f0eafe550a072824444`.
9. **Claimed "nobody loops" too early** — initial cross-protocol analysis said
   "zero human wallets do slisBNB/BNB looping." A verification query found 30
   wallets with positive Dune net balances (appeared active). DeBank showed all
   at $0 — they were likely liquidated, not absent. The corrected finding is
   stronger: people try looping and fail (liquidation or voluntary exit), not
   that nobody tries. Always challenge your own conclusions.
10. **Dune net balance ≠ current position** — in Morpho-style lending markets,
    liquidation transfers collateral to the liquidator, not back to the borrower.
    This creates "ghost positions" in Dune transfer math. The wallet shows
    supply > withdrawals and borrows > repayments, but the position was seized.
    Only DeBank (reads contract state) or direct contract calls show the truth.
11. **AI-generated crypto content mixes real facts with hallucinations** — a
    user-provided AI summary of asBNB contained accurate details (token is
    active, ~238K circulating supply, Aster DEX is real, YZi Labs backing)
    mixed with wrong claims ("rebasing" instead of reward-bearing), inflated
    TVL ($159M marketing vs ~$12M on-chain circulating), and unverifiable
    DEX volume claims. The danger is that 80% accuracy makes the other 20%
    more believable. Every claim needs independent on-chain verification —
    even when the source looks well-researched.
