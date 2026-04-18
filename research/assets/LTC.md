---
symbol: LTC
name: Litecoin (BEP-20)
category: wrapped-major
contract: 0x4338665CBB7B2485A8855A139b75D5e34AB0DB94
decimals: 18
underlying: LTC
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x4338665CBB7B2485A8855A139b75D5e34AB0DB94
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 2546130
    supply_apy: 0.0781
    borrow_apy: 2.4982
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 15cbd370-c6dd-4258-89a4-4623e17c2865
aggregate:
  total_tvl_v1_usd: 2546130
  venue_count: 1
---

# LTC — Litecoin (BEP-20)

## Identity

- **Symbol:** `LTC`
- **Contract (BSC):** `0x4338665CBB7B2485A8855A139b75D5e34AB0DB94`
- **Category:** wrapped-major
- **Underlying:** LTC
- **Yield type:** non-yield

Wrapped LTC, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $2,546,130 | 0.08% | 2.50% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $2,546,130

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
