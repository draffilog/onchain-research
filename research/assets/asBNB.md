---
symbol: asBNB
name: Aster Staked BNB
category: bnb-lst
contract: 0x77734e70b6E88b4d82fE632a168EDf6e700912b6
decimals: 18
underlying: BNB
yield_type: reward-bearing
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x77734e70b6E88b4d82fE632a168EDf6e700912b6
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply
    tvl_usd: 85947446
    supply_apy: 0
    borrow_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 03d9cbdf-e0a8-478f-a1b6-7fa5b2abf033
aggregate:
  total_tvl_v1_usd: 85947446
  venue_count: 1
---

# asBNB — Aster Staked BNB

## Identity

- **Symbol:** `asBNB`
- **Contract (BSC):** `0x77734e70b6E88b4d82fE632a168EDf6e700912b6`
- **Category:** bnb-lst
- **Underlying:** BNB
- **Yield type:** reward-bearing

Aster's BNB liquid staking token. Heavy primary use case is collateral on Aster perp DEX (visible only via Aster UI, not Dune/DeBank).

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply | $85,947,446 | 0.00% | 0.00% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $85,947,446

## Deep-dive references

- [`research/bnb-lst-market.md`](../bnb-lst-market.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
