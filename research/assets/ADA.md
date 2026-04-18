---
symbol: ADA
name: Cardano (BEP-20)
category: wrapped-major
contract: 0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47
decimals: 18
underlying: ADA
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 2965699
    supply_apy: 0.0931
    borrow_apy: 2.6862
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 3cbdf078-5b0a-4483-8308-46e2f5f60c83
aggregate:
  total_tvl_v1_usd: 2965699
  venue_count: 1
---

# ADA — Cardano (BEP-20)

## Identity

- **Symbol:** `ADA`
- **Contract (BSC):** `0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47`
- **Category:** wrapped-major
- **Underlying:** ADA
- **Yield type:** non-yield

Wrapped ADA, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $2,965,699 | 0.09% | 2.69% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $2,965,699

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
