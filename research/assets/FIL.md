---
symbol: FIL
name: Filecoin (BEP-20)
category: wrapped-major
contract: 0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153
decimals: 18
underlying: FIL
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 1121394
    supply_apy: 0.1426
    borrow_apy: 3.1793
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: b7a4bff7-812d-408e-bac1-3a20e6bc503f
aggregate:
  total_tvl_v1_usd: 1121394
  venue_count: 1
---

# FIL — Filecoin (BEP-20)

## Identity

- **Symbol:** `FIL`
- **Contract (BSC):** `0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153`
- **Category:** wrapped-major
- **Underlying:** FIL
- **Yield type:** non-yield

Wrapped FIL, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $1,121,394 | 0.14% | 3.18% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $1,121,394

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
