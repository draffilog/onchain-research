---
symbol: AAVE
name: Aave
category: governance-defi
contract: 0xfb6115445Bff7b52FeB98650C87f44907E58f802
decimals: 18
underlying: —
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xfb6115445Bff7b52FeB98650C87f44907E58f802
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 674594
    supply_apy: 0.0416
    borrow_apy: 1.0575
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 2e3895f1-c990-4eb9-82ac-f5b16c236279
aggregate:
  total_tvl_v1_usd: 674594
  venue_count: 1
---

# AAVE — Aave

## Identity

- **Symbol:** `AAVE`
- **Contract (BSC):** `0xfb6115445Bff7b52FeB98650C87f44907E58f802`
- **Category:** governance-defi
- **Underlying:** —
- **Yield type:** non-yield

Bridged Aave governance token. Listed on Venus (deposit-only).

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $674,594 | 0.04% | 1.06% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $674,594

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
