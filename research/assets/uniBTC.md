---
symbol: uniBTC
name: Universal BTC
category: btc-lst
contract: 0x53176cadd446700fa6b89f840357ac586d7e33db
decimals: 8
underlying: BTC
yield_type: points-bearing
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x53176cadd446700fa6b89f840357ac586d7e33db
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Pendle
    role: pendle-underlying / SY
    tvl_usd: 1794455
    supply_apy: 0.1769
    reward_token: 0xb3ed0a426155b79b898849803e3b36552f7ed507
    pool_id_defillama: 472a97d0-fcd9-4501-811c-eec5922b596c
  - protocol: Pendle
    role: pendle-underlying / SY
    tvl_usd: 1794455
    supply_apy: 0.9718
    pool_id_defillama: 560f9a0a-0d6a-42b7-8ffc-f43e6d480581
aggregate:
  total_tvl_v1_usd: 3588910
  venue_count: 1
---

# uniBTC — Universal BTC

## Identity

- **Symbol:** `uniBTC`
- **Contract (BSC):** `0x53176cadd446700fa6b89f840357ac586d7e33db`
- **Category:** btc-lst
- **Underlying:** BTC
- **Yield type:** points-bearing

Bedrock-issued BTC LST. Active Pendle market (Jun26 expiry) with $1.79M TVL.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Pendle | pendle-underlying / SY | $1,794,455 | 0.18% | — | [`venues/pendle-bsc.md`](../venues/pendle-bsc.md) |
| Pendle | pendle-underlying / SY | $1,794,455 | 0.97% | — | [`venues/pendle-bsc.md`](../venues/pendle-bsc.md) |

**Total V1 TVL across all pools:** $3,588,910

## Deep-dive references

- [`research/pendle-bsc-markets.md`](../pendle-bsc-markets.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
