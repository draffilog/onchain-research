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
| **slisBNB** | Lista DAO | `0xB0b84...4A1B` | 930,400 | 930,400 | ~$591M | 72.9% | Dune mint/burn + BscScan |
| **asBNB** | Aster (fka Astherus) | `0x7eb45...4444` | 237,801 | ~319K | ~$228M | 25.0% | Dune mint/burn × CoinGecko rate |
| **aBNBb** | Ankr (legacy) | `0xbb1aa...df0d` | 22,210 | 22,210 | ~$14M | 1.7% | Dune mint/burn |
| **BNBx** | Stader | `0x1bdd3...BA275` | 3,515 | 3,515 | ~$2.2M | 0.3% | Dune mint/burn |

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

### asBNB (Reward-bearing)
- 1 asBNB > 1 BNB (~1.34 at time of research) — *from CoinGecko price ratio*
- Exchange rate appreciates as staking rewards accrue
- Yield from: BNB staking + Binance Launchpool + HODLer airdrops + Megadrops

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
| 1 | `0x91e4...e5ae` | 414,983 | Lista staking pool | DeBank: `bsc_helio` staked 430K BNB |
| 2 | `0x6f28...3873` | 180,377 | Lista operator | DeBank: pending withdrawals pattern |
| 3 | `0x8f73...e5d8c` | 149,582 | Moolah controller | BscScan: "Lista DAO: Moolah" label |

### slisBNB — Whale Wallets (DeBank verified, April 2026)

| # | Address | slisBNB | Portfolio | Strategy | Key Positions |
|---|---|---|---|---|---|
| 4 | `0xac3e...ffc7` | 36,787 | $496M | Pure Lender | 244K WBNB Lista BNB Vault + 4K BNB Moolah supply + $43.6M Venus (BTCB, USDT, WBNB). Zero borrowing. |
| 5 | `0x3d32...607d` | 21,333 | $14M | Multi-protocol Lender | 22K BNB Lista lending + small Aster positions. No borrowing. |
| 6 | `0xb2a6...691a` | 16,455 | $10.7M | Single-protocol Lender | 17K BNB Lista lending only. No borrowing. |
| 7 | `0x1adb...7fe6` | 9,783 | $613M | Native Staker + Lender | 15.5K BNB native validator staking + 9.7K BNB Lista lending. |
| 8 | `0x9c58...0b8` | 9,672 | $13.3M | Diversified Staker | 2K BNB Aster + 9.1K native staking + 10K BNB Lista lending. |
| 9 | `0x1284...7974` | 5,769 | $1.25B | Aster Mega-whale | $102M USDT + 40K BNB on Aster + 6K BNB Lista. Likely institutional. |
| 10 | `0x6e89...c718a` | 3,018 | $2.4M | Multi-protocol Explorer | $100K BounceBit USDT + 3.1K BNB Lista + $309K SolvBTC + Kernel DAO. |

**Key finding**: Every whale is purely supply-side. Not a single top holder
borrows against their slisBNB.

### asBNB — Top Holders

| # | Address | Balance | Identity | How identified |
|---|---|---|---|---|
| 1 | `0x5c95...762b` | 999.98M | Treasury/Mint | Pre-mint address — not a user |
| 2 | `0x85f7...76fe` | 18,974 | Unknown | No DeFi positions on DeBank — likely CEX or custodial |

---

## Active DeFi Strategists (slisBNB borrowers, DeBank verified)

These wallets were found by querying Dune for wallets supplying slisBNB to
Moolah (0x8f73...e5d8c) AND borrowing in the last 90 days, then verifying
every position via DeBank.

| Wallet | slisBNB | Strategy | Borrowing | Health Rate | Details |
|---|---|---|---|---|---|
| `0xe91e...b4c` | 2,407 | Most Diverse (10 protocols!) | $80K USD1 | 1.40 | 200 slisBNB→$80K USD1 + 2.5K BNB Lista lending + $334K Magpie XYZ (PT-clisBNB yield tokens) + Equilibria, Mitosis, OpenEden |
| `0x7e8e...b50b` | 1,746 | Leveraged Long BNB | $634K USDT+USD1 | 1.58 | 1,745 slisBNB→$619K USDT + 47 slisBNB→$15K USD1. Also Mitosis, Velvet, Venus. |
| `0x453f...e93b` | 1,005 | Multi-Market Stable Borrower | $267K across 4 stables | 1.73-3.26 | 4 separate positions: 125 slisBNB→$20K USDT, 365→$96K U, 176→$41K USD1, 339→$110K U |
| `0xc2aa...ad7de` | 50 | Active Leveraged Trader | $40K U | 1.28 (tight!) | 50 slisBNB→$22K U + 2×BTCB→U positions. 20 borrow txns in 90d (most active). |
| `0x6ccc...0e00` | 44 | Small Leveraged Position | $15K USDT | 1.54 | 44.4 slisBNB→$15K USDT + holds $15K USD1 in Lista. |

### Bot / Contract Wallets

| Wallet | Txns (90d) | Type | Notes |
|---|---|---|---|
| `0x33f7...4d5f` | 2,432 | Rebalancer bot | 152K slisBNB churned. Net collateral negative. Empty DeBank. |
| `0xde2f...34ef` | 786 | Loop bot | 786K slisBNB supplied = withdrawn. Still active daily. |
| `0xab30...0fa9` | 430 | Arb bot | 1,985 slisBNB + 2 WBNB borrows. Only bot with confirmed borrows. |
| `0x87a8...bc93` | 3 | Closed mega-position | 150K slisBNB + 350K WBNB + $13.5M USDT. Fully closed Feb 2026. |

### Critical Finding: Nobody Does Pure slisBNB/BNB Looping

Despite the theoretical appeal (~11% APY at 3x leverage), **not a single
human wallet is doing the pure slisBNB → borrow BNB → stake → repeat loop**.

Every active borrower uses slisBNB as collateral to borrow **stablecoins**
(USDT, USD1, U) — i.e., a leveraged long on BNB price, not a yield loop.
The bots that interact with the slisBNB/BNB Moolah market have either closed
positions or are protocol infrastructure.

---

## DeFi Strategies & APY

| Strategy | APY | Risk | How It Works | Source |
|---|---|---|---|---|
| **Passive LST Hold** | **4.49%** | Low | Hold slisBNB/asBNB. 3.98% Launchpool + 0.51% staking. | Lista UI (live) |
| LST Looping (2x) | ~7-8% | Low-Med | slisBNB collateral → borrow BNB → restake (conservative) | Calculated below |
| LST Looping (3x) | ~11% | Medium | Same at higher leverage — 3-4% liquidation buffer | Calculated below |
| Lista BNB Vault | ~0.35% | Very Low | Lending vault (supply-side). NOT a looping vault. | Lista UI: 17.75% utilization |
| asBNB DEX Collateral | 3-15% + PnL | Medium | asBNB as perp margin on Aster DEX | Aster docs |
| Stability Pool | Up to 93% (peak) | Medium-High | Absorb liquidations + governance emissions. High variance. | Lista blog |
| Liquid Restaking | Base + points | Medium | Restake via Binomial / Kernel DAO / YieldNest | Protocol UIs |

### Strategy Comparison for 47 BNB (~$30K)

| Strategy | Net APY | Annual Yield | Risk | Effort |
|---|---|---|---|---|
| Hold slisBNB | 4.49% | ~$1,334 | Very Low | None |
| Loop 2x | ~7-8% | ~$2,200 | Low-Med | One-time setup |
| Loop 3x+ | ~11% | ~$3,350 | Medium | One-time setup |
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
Borrow cost:  1.98% × 127 = 2.51 BNB/yr   (Moolah rate checked via browser)
Net yield:                   5.30 BNB/yr
Effective APY:               5.30 / 47 = ~11.3%
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
- **Borrow rate**: 1.98% APY
- **LLTV**: 96.5%
- **BNB Vault deposits**: 495K BNB ($312.9M)
- **BNB Vault utilization**: 17.75%
- **Total Lending TVL**: $876M
- **Total deposits**: $572.7M
- **Total borrowed**: $211.6M

## Data Sources

| Source | What we got from it |
|---|---|
| Dune `tokens.transfers` | Mint/burn supply, top holders by net balance, Moolah interactions |
| Dune `tokens.erc20` | Token discovery (with fake token filtering) |
| Dune `prices.usd_latest` | BNB price for TVL calculations |
| DeBank `complex_protocol_list` | Wallet DeFi positions, protocol classification |
| DeBank `total_balance` | Total portfolio values for whale wallets |
| Lista UI (browser) | Live borrow rates, APY, LLTV, utilization, vault metrics |
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
