---
symbol: LINK
name: Chainlink (BEP-20)
category: wrapped-major
contract: 0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD
decimals: 18
underlying: LINK
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 1573238
    supply_apy: 0.0517
    borrow_apy: 2.354
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 6ef41a41-9394-4782-bf53-7648f50a4a93
aggregate:
  total_tvl_v1_usd: 1573238
  venue_count: 1
---

# LINK — Chainlink (BEP-20)

## Identity

- **Symbol:** `LINK`
- **Contract (BSC):** `0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD`
- **Category:** wrapped-major
- **Underlying:** LINK
- **Yield type:** non-yield

Wrapped LINK, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $1,573,238 | 0.05% | 2.35% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $1,573,238

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
