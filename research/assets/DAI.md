---
symbol: DAI
name: Dai Stablecoin (BSC)
category: stable-fiat
contract: 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3
decimals: 18
underlying: USD (overcollateralized)
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 1010698
    supply_apy: 2.1359
    borrow_apy: 4.9579
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 7f81b151-a769-45d3-ae54-ef378633f035
aggregate:
  total_tvl_v1_usd: 1010698
  venue_count: 1
---

# DAI — Dai Stablecoin (BSC)

## Identity

- **Symbol:** `DAI`
- **Contract (BSC):** `0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3`
- **Category:** stable-fiat
- **Underlying:** USD (overcollateralized)
- **Yield type:** non-yield

Bridged DAI on BSC. Small market vs USDT/USDC.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $1,010,698 | 2.14% | 4.96% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $1,010,698

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
