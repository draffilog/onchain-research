---
symbol: DOGE
name: Dogecoin (BEP-20)
category: wrapped-major
contract: 0xbA2aE424d960c26247Dd6c32edC70B295c744C43
decimals: 8
underlying: DOGE
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xbA2aE424d960c26247Dd6c32edC70B295c744C43
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 7439647
    supply_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 866ae932-54a6-4cf2-af45-2e70a94f2d09
aggregate:
  total_tvl_v1_usd: 7439647
  venue_count: 1
---

# DOGE — Dogecoin (BEP-20)

## Identity

- **Symbol:** `DOGE`
- **Contract (BSC):** `0xbA2aE424d960c26247Dd6c32edC70B295c744C43`
- **Category:** wrapped-major
- **Underlying:** DOGE
- **Yield type:** non-yield

Wrapped DOGE, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $7,439,647 | 0.00% | — | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $7,439,647

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
