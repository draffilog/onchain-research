---
symbol: ETH
name: Binance-Pegged ETH
category: eth
contract: 0x2170Ed0880ac9A755fd29B2688956BD959F933F8
decimals: 18
underlying: ETH
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x2170Ed0880ac9A755fd29B2688956BD959F933F8
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 17397067
    supply_apy: 0.9747
    borrow_apy: 1.9228
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: de8928ad-d03a-423d-92d7-3c4648e3ffd2
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 9390503
    supply_apy: 0.759
    borrow_apy: 1.6705
    pool_id_defillama: 91eed93a-e7e0-49fa-92c1-40f2b2768fd9
aggregate:
  total_tvl_v1_usd: 26787570
  venue_count: 2
---

# ETH — Binance-Pegged ETH

## Identity

- **Symbol:** `ETH`
- **Contract (BSC):** `0x2170Ed0880ac9A755fd29B2688956BD959F933F8`
- **Category:** eth
- **Underlying:** ETH
- **Yield type:** non-yield

Bridged ETH on BSC. Backed 1:1 by Binance custody.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $17,397,067 | 0.97% | 1.92% | [`venues/venus.md`](../venues/venus.md) |
| Aave V3 | supply+borrow | $9,390,503 | 0.76% | 1.67% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |

**Total V1 TVL across all pools:** $26,787,570

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
