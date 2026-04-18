---
symbol: TWT
name: Trust Wallet Token
category: utility
contract: 0x4B0F1812e5Df2A09796481Ff14017e6005508003
decimals: 18
underlying: —
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x4B0F1812e5Df2A09796481Ff14017e6005508003
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 852687
    supply_apy: 0.0255
    borrow_apy: 2.3164
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: c3c5deca-1cfe-42c8-aed4-8c8dd618e98e
aggregate:
  total_tvl_v1_usd: 852687
  venue_count: 1
---

# TWT — Trust Wallet Token

## Identity

- **Symbol:** `TWT`
- **Contract (BSC):** `0x4B0F1812e5Df2A09796481Ff14017e6005508003`
- **Category:** utility
- **Underlying:** —
- **Yield type:** non-yield

Trust Wallet utility token.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $852,687 | 0.03% | 2.32% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $852,687

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
