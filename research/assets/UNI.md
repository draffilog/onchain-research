---
symbol: UNI
name: Uniswap (BEP-20)
category: wrapped-major
contract: 0xBf5140A22578168FD562DCcF235E5D43A02ce9B1
decimals: 18
underlying: UNI
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xBf5140A22578168FD562DCcF235E5D43A02ce9B1
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 6977605
    supply_apy: 0.0018
    borrow_apy: 0.2191
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 7d26311d-e763-43d5-be17-6fd0d8e85b2b
aggregate:
  total_tvl_v1_usd: 6977605
  venue_count: 1
---

# UNI — Uniswap (BEP-20)

## Identity

- **Symbol:** `UNI`
- **Contract (BSC):** `0xBf5140A22578168FD562DCcF235E5D43A02ce9B1`
- **Category:** wrapped-major
- **Underlying:** UNI
- **Yield type:** non-yield

Wrapped UNI, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $6,977,605 | 0.00% | 0.22% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $6,977,605

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
