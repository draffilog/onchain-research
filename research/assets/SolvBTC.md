---
symbol: SolvBTC
name: Solv BTC
category: btc-lst
contract: 0x4aae823a6a0b376De6A78e74eCC5b079d38cBCf7
decimals: 18
underlying: BTC
yield_type: wrapped (xSolvBTC for yield)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x4aae823a6a0b376De6A78e74eCC5b079d38cBCf7
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 182171975
    supply_apy: 0.0005
    borrow_apy: 0.0741
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 870e5485-c1f2-4a14-b014-286d0a833bf6
aggregate:
  total_tvl_v1_usd: 182171975
  venue_count: 1
---

# SolvBTC — Solv BTC

## Identity

- **Symbol:** `SolvBTC`
- **Contract (BSC):** `0x4aae823a6a0b376De6A78e74eCC5b079d38cBCf7`
- **Category:** btc-lst
- **Underlying:** BTC
- **Yield type:** wrapped (xSolvBTC for yield)

Solv's BTC LST. The yield-bearing variant is xSolvBTC. Both are accepted on Venus as deposit-only collateral.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $182,171,975 | 0.00% | 0.07% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $182,171,975

## Deep-dive references

- [`research/pendle-bsc-markets.md`](../pendle-bsc-markets.md)
- [`research/bsc-midsize-defi-users.md`](../bsc-midsize-defi-users.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
