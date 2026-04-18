---
symbol: sUSDX
name: Staked USDX (Stables Labs)
category: stable-yield
contract: 0x7788a3538c5fc7f9c7c8a74eac4c898fc8d87d92
decimals: 18
underlying: USDX
yield_type: reward-bearing
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x7788a3538c5fc7f9c7c8a74eac4c898fc8d87d92
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista CDP
    role: collateral (mints lisUSD)
    tvl_usd: 4957504
    supply_apy: 0
    borrow_apy: 7
    pool_id_defillama: d91334a4-9544-4196-9383-4f6e4aa1efd7
aggregate:
  total_tvl_v1_usd: 4957504
  venue_count: 1
---

# sUSDX — Staked USDX (Stables Labs)

## Identity

- **Symbol:** `sUSDX`
- **Contract (BSC):** `0x7788a3538c5fc7f9c7c8a74eac4c898fc8d87d92`
- **Category:** stable-yield
- **Underlying:** USDX
- **Yield type:** reward-bearing

Yield-bearing stablecoin from Stables Labs. Accepted as Lista CDP collateral ($4.95M).

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista CDP | collateral (mints lisUSD) | $4,957,504 | 0.00% | 7.00% | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $4,957,504

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
