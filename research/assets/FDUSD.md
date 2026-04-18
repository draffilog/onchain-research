---
symbol: FDUSD
name: First Digital USD
category: stable-fiat
contract: 0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409
decimals: 18
underlying: USD
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 2772002
    supply_apy: 5.6622
    borrow_apy: 8.1247
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 6679b470-7a53-4b96-88c8-262ea927b4b5
aggregate:
  total_tvl_v1_usd: 2772002
  venue_count: 1
---

# FDUSD — First Digital USD

## Identity

- **Symbol:** `FDUSD`
- **Contract (BSC):** `0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409`
- **Category:** stable-fiat
- **Underlying:** USD
- **Yield type:** non-yield

First Digital-issued stablecoin. Notable for elevated borrow demand on Venus (8.12% borrow APY).

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $2,772,002 | 5.66% | 8.12% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $2,772,002

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
