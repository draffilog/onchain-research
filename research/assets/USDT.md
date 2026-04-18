---
symbol: USDT
name: Tether USD
category: stable-fiat
contract: 0x55d398326f99059fF775485246999027B3197955
decimals: 18
underlying: USD
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x55d398326f99059fF775485246999027B3197955
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 86401250
    supply_apy: 2.0925
    borrow_apy: 3.9521
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 9f3a6015-5045-4471-ba65-ad3dc7c38269
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 21214342
    supply_apy: 1.9313
    borrow_apy: 3.0883
    pool_id_defillama: 29be6a85-414f-4a66-b075-98863278912a
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 6947183
    supply_apy: 1.7818
    pool_id_defillama: 8b4267ba-69b2-49c9-9a82-df98e24e1f0f
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 2896533
    supply_apy: 2.0547
    reward_token: 0xFceB31A79F71AC9CBDCF853519c1b12D379EdC46
    pool_id_defillama: 3b24b57f-0be8-4e4a-a6d6-a69d3cbd87fc
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 1002724
    supply_apy: 2.1397
    pool_id_defillama: 1449c7a7-a915-4a42-94f4-4c93c851f0aa
aggregate:
  total_tvl_v1_usd: 118462032
  venue_count: 3
---

# USDT — Tether USD

## Identity

- **Symbol:** `USDT`
- **Contract (BSC):** `0x55d398326f99059fF775485246999027B3197955`
- **Category:** stable-fiat
- **Underlying:** USD
- **Yield type:** non-yield

Largest stable on BSC. Most-borrowed asset on both Venus and Aave V3.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $86,401,250 | 2.09% | 3.95% | [`venues/venus.md`](../venues/venus.md) |
| Aave V3 | supply+borrow | $21,214,342 | 1.93% | 3.09% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |
| Lista Moolah | supply | $6,947,183 | 1.78% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Lista Moolah | supply | $2,896,533 | 2.05% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Lista Moolah | supply | $1,002,724 | 2.14% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $118,462,032

## Deep-dive references

- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)
- [`research/bsc-midsize-defi-users.md`](../bsc-midsize-defi-users.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
