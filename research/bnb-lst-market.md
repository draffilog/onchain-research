# BNB Liquid Staking Token Market Analysis

*Last updated: April 2026*

## Overview

BNB Chain has four notable liquid staking tokens. The market is heavily concentrated — two tokens (slisBNB + asBNB) hold 98% of all staked BNB.

## Market Data

| Token | Protocol | Contract | Supply | BNB Backing | TVL (USD) | Share |
|---|---|---|---|---|---|---|
| **slisBNB** | Lista DAO | `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B` | 930,400 | 930,400 | $591M | 72.9% |
| **asBNB** | Aster (fka Astherus) | `0x77734e70b6E88b4d82fE632a168EDf6e700912b6` | 237,801 | ~319K | $228M | 25.0% |
| **aBNBb** | Ankr (legacy) | `0xbb1aa6e59e5163d8722a122cd66eba614b59df0d` | 22,210 | 22,210 | $14M | 1.7% |
| **BNBx** | Stader | `0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275` | 3,515 | 3,515 | $2.2M | 0.3% |

**Total BNB in LSTs**: ~1.27M BNB (~$835M)

## Reward Models

### slisBNB (Rebasing)
- 1 slisBNB = 1 BNB always
- Rewards distributed via additional slisBNB minting
- Base APY: ~7.05% (6.51% Launchpool + 0.54% staking)

### asBNB (Reward-bearing)
- 1 asBNB > 1 BNB (currently ~1.34 BNB per asBNB)
- Exchange rate appreciates as staking rewards accrue
- Yield from: BNB staking + Binance Launchpool + HODLer airdrops + Megadrops

### aBNBb (Ankr Legacy)
- Old Ankr bond token, declining supply (410K minted, 410K burned, 22K remaining)
- Ankr migrated to a different model; BSC presence has shrunk

### BNBx (Reward-bearing)
- Stader's BNB LST; significant redemptions (225K of 229K minted burned)
- Marginal market presence

## Holder Distribution

### slisBNB Top Holders

| # | Address | Balance | Identity | Source |
|---|---|---|---|---|
| 1 | `0x91e4...6e5ae` | 414,947 | Lista DAO Staking Pool | DeBank: `bsc_helio` staked 430K BNB |
| 2 | `0x6f28...03873` | 180,377 | Lista DAO Operator | DeBank: 187K BNB + pending withdrawals |
| 3 | `0x8f73...e5d8c` | 149,582 | Lista Moolah Controller | BscScan: "Lista DAO: Moolah" contract |
| 4 | `0xac3e...ffc7` | 36,787 | Whale (yield farmer) | DeBank: 244K WBNB vault + 4K BNB lending + $44M Venus |
| 5 | `0x3d32...607d` | 21,333 | Passive holder | DeBank: dust positions only |

**Key observation**: Top 3 are protocol contracts (80% of supply). The first real user is holder #4, a $200M+ whale running vault + multi-protocol lending.

### asBNB Top Holders

| # | Address | Balance | Identity | Source |
|---|---|---|---|---|
| 1 | `0xcc1d...9bdf` | 125,631 | Aster Yield Pool | DeBank: `bsc_astherus` yield 134K BNB |
| 2 | `0x1284...7974` | 37,653 | Mega-whale ($127M) | DeBank: $102M USDF + 40K BNB asBNB yield |
| 3 | `0x7632...edad` | 20,192 | Large holder | TBD |

## DeFi Strategies & APY

| Strategy | Estimated APY | Risk | How It Works | Protocols |
|---|---|---|---|---|
| Stability Pool | Up to 93% (peak) | Medium | Absorb liquidations, earn discounted collateral + governance emissions | Lista DAO, Aster |
| **LST Looping (3x)** | **~17.2%** | **Low-Med** | Supply slisBNB → borrow BNB at 1.98% → restake → repeat | **Lista Lending (Moolah)** |
| Lista BNB Vault | Variable | Low | Auto-compounds the loop strategy | Lista DAO |
| Passive LST Hold | ~7.05% | Low | Just hold slisBNB/asBNB | Lista DAO, Aster |
| asBNB DEX Collateral | 3-15% + PnL | Medium | Use asBNB as perp margin on Aster DEX | Aster DEX |
| Liquid Restaking | Base + points | Medium | Restake via Binomial / Kernel DAO / YieldNest | Various |

## Looping Strategy Deep Dive

### Mechanism

1. Stake BNB → receive slisBNB
2. Supply slisBNB as collateral on Lista Moolah (`0x8f73...e5d8c`)
3. Borrow BNB at ~1.98% APY (slisBNB/BNB market, 96.5% LLTV)
4. Stake borrowed BNB → more slisBNB
5. Repeat for 2-3 loops

### Economics (3x leverage)

```
Gross yield:  7.05% × 3 = 21.15%
Borrow cost:  1.98% × 2 =  3.96%
Net APY:                  ~17.2%
```

### Who's doing it?

| Wallet | Type | Position | Verified |
|---|---|---|---|
| `0xac3e...ffc7` | Vault looper | 244K WBNB via BNB Vault ($154M+) | DeBank ✓ |
| `0x7e8e...b50b` | Leveraged long | 1,745 slisBNB / 619K USDT borrowed | DeBank ✓ |
| `0x33f7...4d5f` | Bot | 2,432 txns in 90d (closed) | Contract |
| `0xde2f...34ef` | Bot | 786 txns in 90d (closed) | Contract |
| `0xab30...0fa9` | Bot | 428 supply + 2 borrow txns | Contract |

**Key insight**: Most large players use the **Lista BNB Vault** which automates the loop. Manual loopers are bots. Retail prefers the vault or passive hold.

### Live Market Parameters (Lista Lending)

- **Borrow rate**: 1.98% APY (trending down from ~3.2%)
- **LLTV**: 96.5%
- **Available liquidity**: 317.7K BNB (~$201M)
- **Total lending TVL**: $876M
- **Total deposits**: $572M
- **Total borrowed**: $212M

## Data Sources

- **Dune Analytics**: `tokens.transfers` (mint/burn supply), `tokens.erc20` (token discovery), `prices.usd_latest` (BNB price)
- **DeBank Pro API**: `complex_protocol_list` (wallet DeFi positions)
- **Lista DAO UI**: Live borrow rates and market parameters
- **BscScan**: Contract verification and labeling
- **CoinGecko / Web Search**: asBNB exchange rate and market cap
