---
symbol: wBETH
name: Wrapped Binance Beacon ETH
category: eth-lst
contract: 0xa2E3356610840701BDf5611a53974510Ae27E2e1
decimals: 18
underlying: ETH
yield_type: reward-bearing (exchange-rate)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xa2E3356610840701BDf5611a53974510Ae27E2e1
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 24121702
    supply_apy: 0.0013
    borrow_apy: 0.1277
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: b8872d86-c39e-423c-83dd-8b32f7eea91d
  - protocol: Lista CDP
    role: collateral (mints lisUSD)
    tvl_usd: 758186
    supply_apy: 0
    borrow_apy: 4.8518
    pool_id_defillama: 76f8c0c2-7a52-4419-aa0a-f884ab33ca70
aggregate:
  total_tvl_v1_usd: 24879888
  venue_count: 2
---

# wBETH — Wrapped Binance Beacon ETH

## Identity

- **Symbol:** `wBETH`
- **Contract (BSC):** `0xa2E3356610840701BDf5611a53974510Ae27E2e1`
- **Category:** eth-lst
- **Underlying:** ETH
- **Yield type:** reward-bearing (exchange-rate)

Binance's ETH liquid staking receipt. Available cross-chain; on BSC accepted on Venus and as Lista CDP collateral.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $24,121,702 | 0.00% | 0.13% | [`venues/venus.md`](../venues/venus.md) |
| Lista CDP | collateral (mints lisUSD) | $758,186 | 0.00% | 4.85% | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $24,879,888

## Deep-dive references

- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
