# BNB LST Research — Verified Findings (April 2026)

All data below was verified via on-chain queries (Dune), DeBank API,
BscScan, CoinGecko, and protocol UIs (browser). Each row includes the
verification source.

## Verified Contract Addresses

| Token | Address | Verified via | Notes |
|---|---|---|---|
| slisBNB | `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B` | BscScan label "Lista DAO: slisBNB" | Rebasing (1:1) |
| asBNB | `0x77734e70b6E88b4d82fE632a168EDf6e700912b6` | CoinGecko verified + BscScan | Reward-bearing (~1.34:1 at time of research) |
| aBNBb | `0xbb1aa6e59e5163d8722a122cd66eba614b59df0d` | BscScan label "Ankr: aBNBb" | Legacy, declining supply |
| BNBx | `0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275` | BscScan + CoinGecko | Nearly dead (3.5K supply) |
| WBNB | `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c` | BscScan canonical | Wrapped BNB |
| Lista Moolah | `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | BscScan "Lista DAO: Moolah" | Morpho-style lending controller |
| Lista BNB Vault | `0x57134a64b7cd9f9eb72f8255a671f5bf2fe3e2d0` | DeBank adapter ID match | Tokenized vault (auto-loops) |

## Market Snapshot

| Token | Supply (Dune) | BNB Backing | TVL (USD) | Share | Source |
|---|---|---|---|---|---|
| slisBNB | 930,400 | 930,400 | ~$591M | 72.9% | Dune mint/burn |
| asBNB | 237,801 | ~319K | ~$228M | 25.0% | Dune mint/burn × CoinGecko rate |
| aBNBb | 22,210 | 22,210 | ~$14M | 1.7% | Dune mint/burn |
| BNBx | 3,515 | 3,515 | ~$2.2M | 0.3% | Dune mint/burn |

## Top Holders (Dune + DeBank verified)

### slisBNB

| Address | Balance | Identity | How identified |
|---|---|---|---|
| 0x91e4...6e5ae | 414,947 | Lista staking pool | DeBank: `bsc_helio` staked 430K BNB |
| 0x6f28...03873 | 180,377 | Lista operator | DeBank: 187K BNB + pending withdrawals |
| 0x8f73...e5d8c | 149,582 | Moolah controller | BscScan label "Lista DAO: Moolah" |
| 0xac3e...ffc7 | 36,787 | Whale yield farmer | DeBank: BNB Vault + Moolah + Venus positions |
| 0x3d32...607d | 21,333 | Passive holder | DeBank: dust positions only |

### asBNB

| Address | Balance | Identity | How identified |
|---|---|---|---|
| 0xcc1d...9bdf | 125,631 | Aster Yield Pool | DeBank: `bsc_astherus` yield 134K BNB |
| 0x1284...7974 | 37,653 | Mega-whale | DeBank: $102M USDF + 40K BNB asBNB |
| 0x7632...edad | 20,192 | Unknown | Unverified — needs DeBank check |

## Confirmed Looper Wallets

| Wallet | Type | Position | Verification |
|---|---|---|---|
| 0xac3e...ffc7 | Vault looper | 244K WBNB via BNB Vault ($154M+) | DeBank `helio_tokenized_vault_yield` |
| 0x7e8e...b50b | Leveraged long | 1,745 slisBNB / 619K USDT borrowed | DeBank `morpho_blue_lending2` |
| 0x33f7...4d5f | Bot | 2,432 supply txns in 90d | Dune query + empty DeBank (contract) |
| 0xde2f...34ef | Bot | 786 supply txns in 90d | Dune query + empty DeBank (contract) |
| 0xab30...0fa9 | Bot | 428 supply + 2 borrow txns | Dune query + empty DeBank (contract) |

## Lista Lending Parameters (from browser — lista.org)

Checked live via browser on the Lista lending UI:

- **slisBNB/BNB market borrow rate**: 1.98% APY
- **LLTV**: 96.5%
- **Available liquidity**: 317.7K BNB (~$201M)
- **Lending TVL**: $876M
- **Total deposits**: $572M
- **Total borrowed**: $212M

**WARNING**: These rates change constantly. Re-check via browser before using.
