---
symbol: lisUSD
name: Lista USD (CDP-backed)
category: stable-cdp
contract: 0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5
decimals: 18
underlying: multi-collateral CDP
yield_type: non-yield (Saving vault pays yield)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 27394472
    supply_apy: 1.1827
    pool_id_defillama: 9f1fc935-5bd3-4327-aefe-6f09045bf092
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 700044
    supply_apy: 0.8807
    borrow_apy: 3.1661
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 9f44dab4-eaba-4f79-b86d-648e010edf0c
aggregate:
  total_tvl_v1_usd: 28094516
  venue_count: 2
---

# lisUSD — Lista USD (CDP-backed)

## Identity

- **Symbol:** `lisUSD`
- **Contract (BSC):** `0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5`
- **Category:** stable-cdp
- **Underlying:** multi-collateral CDP
- **Yield type:** non-yield (Saving vault pays yield)

Minted by Lista CDP from slisBNB / BTCB / wBETH / sUSDX collateral. Rebranded from HAY.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista Moolah | supply | $27,394,472 | 1.18% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Venus Core | supply+borrow | $700,044 | 0.88% | 3.17% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $28,094,516

## Deep-dive references

- [`research/lista-dao-architecture.md`](../lista-dao-architecture.md)
- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
