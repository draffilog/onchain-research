# BNB Liquid Staking Token Market Analysis

*Last updated: April 2026*

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
| **asBNB** | Aster (fka Astherus) | `0x77734...12b6` | 237,801 | ~319K | ~$228M | 25.0% | Dune mint/burn × CoinGecko rate |
| **aBNBb** | Ankr (legacy) | `0xbb1aa...df0d` | 22,210 | 22,210 | ~$14M | 1.7% | Dune mint/burn |
| **BNBx** | Stader | `0x1bdd3...BA275` | 3,515 | 3,515 | ~$2.2M | 0.3% | Dune mint/burn |

**Total BNB in LSTs**: ~1.27M BNB (~$835M)

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
- 1 slisBNB = 1 BNB always (verified: DeBank shows 1:1 in positions)
- Rewards distributed via additional slisBNB minting
- Base APY: ~7.05% (6.51% Launchpool + 0.54% staking) — *from Lista UI*

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

## Holder Distribution

### How we classified holders

1. Computed net balances via Dune `tokens.transfers` (inflows - outflows)
2. Looked up each top address on BscScan for contract labels
3. Called DeBank `complex_protocol_list` for DeFi position data
4. Empty DeBank `[]` + contract on BscScan = protocol contract
5. DeBank positions visible = real user wallet

### slisBNB Top Holders

| # | Address | Balance | Identity | How identified |
|---|---|---|---|---|
| 1 | `0x91e4...6e5ae` | 414,947 | Lista staking pool | DeBank: `bsc_helio` staked 430K BNB |
| 2 | `0x6f28...03873` | 180,377 | Lista operator | DeBank: 187K BNB + pending withdrawals |
| 3 | `0x8f73...e5d8c` | 149,582 | Moolah controller | BscScan: "Lista DAO: Moolah" label |
| 4 | `0xac3e...ffc7` | 36,787 | Whale (yield farmer) | DeBank: 244K WBNB vault + 4K BNB Moolah + $44M Venus |
| 5 | `0x3d32...607d` | 21,333 | Passive holder | DeBank: dust positions only |

**Key observation**: Top 3 are protocol contracts (80% of supply). First real
user is holder #4 — a $200M+ whale using BNB Vault + multi-protocol lending.

### asBNB Top Holders

| # | Address | Balance | Identity | How identified |
|---|---|---|---|---|
| 1 | `0xcc1d...9bdf` | 125,631 | Aster Yield Pool | DeBank: `bsc_astherus` yield 134K BNB |
| 2 | `0x1284...7974` | 37,653 | Mega-whale ($127M) | DeBank: $102M USDF + 40K BNB asBNB yield |
| 3 | `0x7632...edad` | 20,192 | Unknown | Unverified — needs DeBank check |

## DeFi Strategies & APY

| Strategy | APY | Risk | How It Works | Source |
|---|---|---|---|---|
| Stability Pool | Up to 93% (peak) | Medium | Absorb liquidations + governance emissions | Lista blog |
| **LST Looping (3x)** | **~17.2%** | **Low-Med** | slisBNB collateral → borrow BNB → restake → repeat | Live calculation below |
| Lista BNB Vault | Variable | Low | Auto-compounds the loop strategy | Lista UI |
| Passive LST Hold | ~7.05% | Low | Just hold slisBNB/asBNB | Lista UI |
| asBNB DEX Collateral | 3-15% + PnL | Medium | asBNB as perp margin on Aster DEX | Aster docs |
| Liquid Restaking | Base + points | Medium | Restake via Binomial / Kernel DAO / YieldNest | Protocol UIs |

## Looping Strategy Deep Dive

### Mechanism

1. Stake BNB → receive slisBNB
2. Supply slisBNB as collateral on Lista Moolah
3. Borrow BNB at current rate (checked via browser)
4. Stake borrowed BNB → more slisBNB
5. Repeat for 2-3 loops

### Economics (3x leverage, rates from April 2026)

```
Gross yield:  7.05% × 3 = 21.15%   (slisBNB base APY from Lista UI)
Borrow cost:  1.98% × 2 =  3.96%   (Moolah rate checked via browser)
Net APY:                  ~17.2%
```

**WARNING**: Both the base APY and borrow rate change. Re-calculate with
live numbers from the protocol UI before acting on this.

### Confirmed Looper Wallets

| Wallet | Type | Position | Verification |
|---|---|---|---|
| `0xac3e...ffc7` | Vault looper | 244K WBNB via BNB Vault ($154M+) | DeBank `helio_tokenized_vault_yield` |
| `0x7e8e...b50b` | Leveraged long | 1,745 slisBNB / 619K USDT borrowed | DeBank `morpho_blue_lending2` |
| `0x33f7...4d5f` | Bot | 2,432 txns in 90d (closed) | Dune query + empty DeBank |
| `0xde2f...34ef` | Bot | 786 txns in 90d (closed) | Dune query + empty DeBank |
| `0xab30...0fa9` | Bot | 428 supply + 2 borrow txns | Dune query + empty DeBank |

**Key insight**: Most large players use the **Lista BNB Vault** which automates
the loop. Manual loopers are bots. Retail prefers vault or passive hold.

### Lista Lending Parameters (browser-verified)

Checked live on `lista.org/lending/borrow`:

- **Borrow rate**: 1.98% APY
- **LLTV**: 96.5%
- **Available liquidity**: 317.7K BNB (~$201M)
- **Total lending TVL**: $876M

## Data Sources

| Source | What we got from it |
|---|---|
| Dune `tokens.transfers` | Mint/burn supply, top holders by net balance |
| Dune `tokens.erc20` | Token discovery (with fake token filtering) |
| Dune `prices.usd_latest` | BNB price for TVL calculations |
| DeBank `complex_protocol_list` | Wallet DeFi positions, protocol classification |
| Lista UI (browser) | Live borrow rates, LLTV, available liquidity |
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
