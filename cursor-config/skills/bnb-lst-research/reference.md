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

## Top Holders & Looper Wallets

Holder data and confirmed looper wallets drift week-over-week, so they are
**not duplicated here**. The canonical tables with full 42-character
addresses live in the research repo:

- slisBNB / asBNB / aBNBb top holders → [`research/bnb-lst-market.md`](../../../research/bnb-lst-market.md)
- Confirmed looper wallets & strategies → [`research/bnb-lst-market.md`](../../../research/bnb-lst-market.md) ("Leveraged Looping Forensics") and [`research/benchmark-farmers.md`](../../../research/benchmark-farmers.md)
- XAUT farmers (gold DeFi cohort) → [`research/xaut-farming-wallets.md`](../../../research/xaut-farming-wallets.md) and [`research/xaut-bsc-gold-defi.md`](../../../research/xaut-bsc-gold-defi.md)
- Mid-sized cross-protocol operators → [`research/bsc-midsize-defi-users.md`](../../../research/bsc-midsize-defi-users.md)

**Repo rule** ([`.cursor/rules/full-wallet-addresses.mdc`](../../../.cursor/rules/full-wallet-addresses.mdc)):
wallet addresses are always stored in full 42-char form. If you need to
reference a holder, copy the address from the linked research file, do
**not** invent a truncated form.

## Lista Lending Parameters (from browser — lista.org)

Checked live via browser on the Lista lending UI:

- **slisBNB/BNB market borrow rate**: 1.98% APY
- **LLTV**: 96.5%
- **Available liquidity**: 317.7K BNB (~$201M)
- **Lending TVL**: $876M
- **Total deposits**: $572M
- **Total borrowed**: $212M

**WARNING**: These rates change constantly. Re-check via browser before using.
