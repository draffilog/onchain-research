---
symbol: U
name: Aster U (USD)
category: stable-fiat
contract: 0xcE24439F2D9C6a2289F741120FE202248B666666
decimals: 18
underlying: USD
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xcE24439F2D9C6a2289F741120FE202248B666666
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 69344196
    supply_apy: 0.4285
    pool_id_defillama: 54d5ccee-2d2a-4e84-90f1-765c71d8a72d
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 17320526
    supply_apy: 0.6885
    borrow_apy: 2.2037
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: d8e9bb79-79d3-4897-8a4f-8d489040097d
aggregate:
  total_tvl_v1_usd: 86664722
  venue_count: 2
---

# U — Aster U (USD)

## Identity

- **Symbol:** `U`
- **Contract (BSC):** `0xcE24439F2D9C6a2289F741120FE202248B666666`
- **Category:** stable-fiat
- **Underlying:** USD
- **Yield type:** non-yield

Aster's USD-pegged stablecoin (USD with $200M+ Lista U vault TVL). Likely tied to Aster perp DEX collateral flows.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista Moolah | supply | $69,344,196 | 0.43% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Venus Core | supply+borrow | $17,320,526 | 0.69% | 2.20% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $86,664,722

## Deep-dive references

- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
