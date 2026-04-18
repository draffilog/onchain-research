---
symbol: BNB
name: BNB (Wrapped BNB on contracts)
category: bnb-native
contract: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
decimals: 18
underlying: —
yield_type: native
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 318985459
    supply_apy: 0.2456
    pool_id_defillama: e15db93c-9c49-490c-896d-24092b4d7471
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 255763308
    supply_apy: 0.2228
    borrow_apy: 1.0003
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 747b58ab-aefd-42e1-a312-01ad5a0ab7f5
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 72605061
    supply_apy: 0.0236
    borrow_apy: 0.6775
    pool_id_defillama: 9380e5ac-3b75-468c-951c-c24ff6497e80
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 52006918
    supply_apy: 0.1522
    borrow_apy: 1.0617
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 25e50b68-1e0c-47c6-9088-44749ce971b2
aggregate:
  total_tvl_v1_usd: 699360746
  venue_count: 3
---

# BNB — BNB (Wrapped BNB on contracts)

## Identity

- **Symbol:** `BNB`
- **Contract (BSC):** `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
- **Category:** bnb-native
- **Underlying:** —
- **Yield type:** native

WBNB is the canonical ERC-20 wrapping of native BNB used by all DeFi protocols on BSC.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista Moolah | supply | $318,985,459 | 0.25% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Venus Core | supply+borrow | $255,763,308 | 0.22% | 1.00% | [`venues/venus.md`](../venues/venus.md) |
| Aave V3 | supply+borrow | $72,605,061 | 0.02% | 0.68% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |
| Venus Core | supply+borrow | $52,006,918 | 0.15% | 1.06% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $699,360,746

## Deep-dive references

- [`research/bnb-lst-market.md`](../bnb-lst-market.md)
- [`research/bnb-lst-growth.md`](../bnb-lst-growth.md)
- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
