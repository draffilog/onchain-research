---
symbol: slisBNBx
name: Lista slisBNBx (Pendle SY wrapper)
category: bnb-lst-derivative
contract: 0x27faf900007b4cba7803000251ec96bc69ff1bea
decimals: 18
underlying: slisBNB
yield_type: reward-bearing
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x27faf900007b4cba7803000251ec96bc69ff1bea
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Pendle
    role: pendle-underlying / SY
    tvl_usd: 5915549
    supply_apy: 3.037
    pool_id_defillama: 55dfd750-dfb6-429b-8ff8-9d4c3192b6b4
  - protocol: Pendle
    role: pendle-underlying / SY
    tvl_usd: 5915549
    supply_apy: 4.7245
    reward_token: 0xb3ed0a426155b79b898849803e3b36552f7ed507
    pool_id_defillama: 60ed9a21-22ba-4f79-82ee-d677d9cf016e
aggregate:
  total_tvl_v1_usd: 11831098
  venue_count: 1
---

# slisBNBx — Lista slisBNBx (Pendle SY wrapper)

## Identity

- **Symbol:** `slisBNBx`
- **Contract (BSC):** `0x27faf900007b4cba7803000251ec96bc69ff1bea`
- **Category:** bnb-lst-derivative
- **Underlying:** slisBNB
- **Yield type:** reward-bearing

SY (Standardized Yield) wrapper of slisBNB used by Pendle markets. PT/YT/LP positions are derived from this.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Pendle | pendle-underlying / SY | $5,915,549 | 3.04% | — | [`venues/pendle-bsc.md`](../venues/pendle-bsc.md) |
| Pendle | pendle-underlying / SY | $5,915,549 | 4.72% | — | [`venues/pendle-bsc.md`](../venues/pendle-bsc.md) |

**Total V1 TVL across all pools:** $11,831,098

## Deep-dive references

- [`research/pendle-bsc-markets.md`](../pendle-bsc-markets.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
