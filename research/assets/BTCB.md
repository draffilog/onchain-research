---
symbol: BTCB
name: Binance-Pegged BTC
category: btc
contract: 0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c
decimals: 18
underlying: BTC
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 351787331
    supply_apy: 0.2102
    borrow_apy: 1.1869
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 87c8ee0d-b812-47c1-803f-f91a3907079e
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 74547199
    supply_apy: 0.0665
    borrow_apy: 1.4146
    pool_id_defillama: 45bfb85f-deb5-4990-b9c4-cfb99629e6e8
  - protocol: Lista CDP
    role: collateral (mints lisUSD)
    tvl_usd: 1891884
    supply_apy: 0
    borrow_apy: 4.3518
    pool_id_defillama: 88ea7814-63d8-4fc8-8f0b-d17fb693324b
aggregate:
  total_tvl_v1_usd: 428226414
  venue_count: 3
---

# BTCB — Binance-Pegged BTC

## Identity

- **Symbol:** `BTCB`
- **Contract (BSC):** `0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c`
- **Category:** btc
- **Underlying:** BTC
- **Yield type:** non-yield

1:1 BTC peg backed by Binance custody. Largest BTC representation on BSC.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $351,787,331 | 0.21% | 1.19% | [`venues/venus.md`](../venues/venus.md) |
| Aave V3 | supply+borrow | $74,547,199 | 0.07% | 1.41% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |
| Lista CDP | collateral (mints lisUSD) | $1,891,884 | 0.00% | 4.35% | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $428,226,414

## Deep-dive references

- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)
- [`research/bsc-midsize-defi-users.md`](../bsc-midsize-defi-users.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
