---
symbol: XAUT
name: Tether Gold
category: commodity-gold
contract: 0x21caef8a43163eea865baee23b9c2e327696a3bf
decimals: 6
underlying: 1 fine troy ounce of physical gold
yield_type: non-yield (commodity)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x21caef8a43163eea865baee23b9c2e327696a3bf
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 2602802
    supply_apy: 10.4502
    reward_token: 0xFceB31A79F71AC9CBDCF853519c1b12D379EdC46
    pool_id_defillama: b89d44a1-052a-4ec8-8dba-7802340fee27
aggregate:
  total_tvl_v1_usd: 2602802
  venue_count: 1
---

# XAUT — Tether Gold

## Identity

- **Symbol:** `XAUT`
- **Contract (BSC):** `0x21caef8a43163eea865baee23b9c2e327696a3bf`
- **Category:** commodity-gold
- **Underlying:** 1 fine troy ounce of physical gold
- **Yield type:** non-yield (commodity)

Tether-issued gold token. Lista XAUT vault pays the highest blended APY in the V1 universe (10.45%) due to LISTA emissions on a small ($2.6M) vault.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista Moolah | supply | $2,602,802 | 10.45% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $2,602,802

## Deep-dive references

- [`research/xaut-bsc-gold-defi.md`](../xaut-bsc-gold-defi.md)
- [`research/xaut-farming-wallets.md`](../xaut-farming-wallets.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
