---
symbol: XVS
name: Venus
category: governance-defi
contract: 0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63
decimals: 18
underlying: —
yield_type: emission-reward
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 1582709
    supply_apy: 1.5213
    borrow_apy: 0.0006
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: bd3e33f0-fa0f-4c4c-97d7-90f267808355
aggregate:
  total_tvl_v1_usd: 1582709
  venue_count: 1
---

# XVS — Venus

## Identity

- **Symbol:** `XVS`
- **Contract (BSC):** `0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63`
- **Category:** governance-defi
- **Underlying:** —
- **Yield type:** emission-reward

Venus governance + reward emission token.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $1,582,709 | 1.52% | 0.00% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $1,582,709

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
