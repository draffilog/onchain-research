---
symbol: xSolvBTC
name: Staked SolvBTC (xSolvBTC)
category: btc-lst-staked
contract: 0x1346b618dC92810EC74163e4c27004c921D446a5
decimals: 18
underlying: SolvBTC
yield_type: reward-bearing
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x1346b618dC92810EC74163e4c27004c921D446a5
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply
    tvl_usd: 63562108
    supply_apy: 0
    borrow_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: c6f3f506-818f-4199-9a42-4d00e1875dc6
aggregate:
  total_tvl_v1_usd: 63562108
  venue_count: 1
---

# xSolvBTC — Staked SolvBTC (xSolvBTC)

## Identity

- **Symbol:** `xSolvBTC`
- **Contract (BSC):** `0x1346b618dC92810EC74163e4c27004c921D446a5`
- **Category:** btc-lst-staked
- **Underlying:** SolvBTC
- **Yield type:** reward-bearing

Yield-bearing variant of SolvBTC; yield comes from BTC-staking partner protocols.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply | $63,562,108 | 0.00% | 0.00% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $63,562,108

## Deep-dive references

- [`research/pendle-bsc-markets.md`](../pendle-bsc-markets.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
