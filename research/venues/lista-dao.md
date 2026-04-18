# Lista DAO — BSC Pool Inventory

**Last verified:** 2026-04-18
**Filter:** pools with TVL ≥ $500K
**Sources:** DeFiLlama yields API (`yields.llama.fi/pools` + `/lendBorrow`), cross-checked against [`research/lista-dao-architecture.md`](../lista-dao-architecture.md) and [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)

Lista DAO has three product lines on BSC, all included here:
- **Liquid Staking** — slisBNB (BNB → yield-bearing slisBNB)
- **CDP** — collateralize asset → mint lisUSD
- **Moolah Lending** — Morpho Blue fork; isolated supply/borrow vaults

---

## Liquid Staking

| Pool | Asset | TVL USD | Supply APY | Notes | Asset Card |
|---|---|---|---|---|---|
| slisBNB Staking | slisBNB | 620,163,010 | 4.66% | Stake BNB, receive slisBNB. Launchpool rewards require clisBNB staking on Binance Launchpool | [slisBNB](../assets/slisBNB.md) |

DeFiLlama pool id: `50bb5f69-85ea-4f70-81da-3661a1633fc4`

---

## CDP (Collateral → mint lisUSD)

| Collateral | TVL USD | Borrow APY (lisUSD) | LTV | Currently Borrowed (USD) | Asset Card |
|---|---|---|---|---|---|
| slisBNB | 276,114,535 | 4.35% | 80% | 2,024,047 | [slisBNB](../assets/slisBNB.md) |
| sUSDX | 4,957,504 | 7.00% | 83.3% | 654 | [sUSDX](../assets/sUSDX.md) |
| BTCB | 1,891,884 | 4.35% | 80% | 810,754 | [BTCB](../assets/BTCB.md) |
| wBETH | 758,186 | 4.85% | 80% | 2,288 | [wBETH](../assets/wBETH.md) |

The minted asset is **lisUSD** in every case. Borrow APY = the variable lisUSD borrow rate per collateral type.

---

## Moolah Lending Vaults (≥ $500K)

| Pool (Vault) | Underlying Asset | TVL USD | Supply APY | Base / Reward Split | Reward Token | Asset Card |
|---|---|---|---|---|---|---|
| Lista BNB Vault | BNB | 318,985,459 | 0.25% | 0.25 / 0.00 | — | [BNB](../assets/BNB.md) |
| Lista USD1 Vault | USD1 | 138,544,347 | 1.05% | 1.05 / 0.00 | — | [USD1](../assets/USD1.md) |
| Lista U Vault | U | 69,344,196 | 0.43% | 0.43 / 0.00 | — | [U](../assets/U.md) |
| Lista lisUSD Vault | lisUSD | 27,394,472 | 1.18% | 1.18 / 0.00 | — | [lisUSD](../assets/lisUSD.md) |
| Lista USDT Vault #2 | USDT | 6,947,183 | 1.78% | 1.78 / 0.00 | — | [USDT](../assets/USDT.md) |
| Lista USDT Vault (incentivized) | USDT | 2,896,533 | 2.05% | 0.36 / 1.70 | LISTA | [USDT](../assets/USDT.md) |
| Lista XAUT Vault | XAUT | 2,602,802 | **10.45%** | 2.60 / **7.85** | LISTA | [XAUT](../assets/XAUT.md) |
| Lista USDC Vault (incentivized) | USDC | 1,543,885 | 3.25% | 0.01 / 3.24 | LISTA | [USDC](../assets/USDC.md) |
| Lista USDT Vault (small) | USDT | 1,002,724 | 2.14% | 2.14 / 0.00 | — | [USDT](../assets/USDT.md) |
| Hyperithm Lista X Vault | XRP | 527,856 | 1.07% | 1.07 / 0.00 | — | [XRP](../assets/XRP.md) |

**Note:** USDT appears in three separate Moolah vaults (curators differ). The `lista-lending` project on DeFiLlama covers all Moolah-Vault instances; the on-chain MoolahVaultFactory (`0x2a0Cb6401FD3c6196750dc6b46702040761D9671`) deploys each vault.

---

## Key Contracts

| Contract | Address | Notes |
|---|---|---|
| slisBNB Token | 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B | Liquid staking receipt |
| StakeManager | 0x1adB950d8bB3dA4bE104211D5AB038628e477fE6 | BNB → slisBNB |
| lisUSD Token | 0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5 | CDP-minted stable, formerly HAY |
| LISTA Token | 0xFceB31A79F71AC9CBDCF853519c1b12D379EdC46 | Governance + reward emissions |
| Moolah Core | 0x8F73b65B4caAf64FBA2aF91cC5D4a2A1318E5D8C | Morpho Blue fork core (BEP-1155) |
| MoolahVault(WBNB) | 0x57134a64B7cD9F9eb72F8255A671F5Bf2fe3E2d0 | Largest vault by tx count |
| MoolahVault(USD1) | 0xfa27f172e0b6ebcEF9c51ABf817E2cb142FbE627 | $138M TVL vault |
| MoolahVaultFactory | 0x2a0Cb6401FD3c6196750dc6b46702040761D9671 | Vault deployer |

---

## Aggregate Stats (≥ $500K pools only)

| Metric | Value |
|---|---|
| Pools | 15 |
| Liquid Staking TVL | $620M |
| CDP collateral TVL | $284M |
| Moolah Lending TVL | $570M |
| **Total** | **$1.47B** |

---

## Cross-References

- Deep dive: [`bnb-lst-market.md`](../bnb-lst-market.md), [`lista-dao-architecture.md`](../lista-dao-architecture.md), [`lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md), [`xaut-bsc-gold-defi.md`](../xaut-bsc-gold-defi.md)
- All Moolah vault sub-$500K detail in [`lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md) (32-vault inventory)

---

## Discrepancy Notes (for the agent)

- Past research file `lista-dao-yield-strategies.md` labeled the $138M vault as "Lista USDT Vault". On-chain inspection (Moolah USD1 vault `0xfa27f172e0b6ebcEF9c51ABf817E2cb142FbE627`) and DeFiLlama agree the underlying is **USD1**, not USDT. This file is canonical.
