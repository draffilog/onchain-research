---
symbol: XAUM
name: Matrixport Gold
category: commodity-gold
contract: 0x23AE4fd8E7844cdBc97775496eBd0E8248656028
decimals: 18
underlying: gold
yield_type: non-yield (commodity)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x23AE4fd8E7844cdBc97775496eBd0E8248656028
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply
    tvl_usd: 960950
    supply_apy: 0
    borrow_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 7ca7d4ef-0752-4a76-b742-f66ea0df7f12
aggregate:
  total_tvl_v1_usd: 960950
  venue_count: 1
---

# XAUM — Matrixport Gold

## Identity

- **Symbol:** `XAUM`
- **Contract (BSC):** `0x23AE4fd8E7844cdBc97775496eBd0E8248656028`
- **Category:** commodity-gold
- **Underlying:** gold
- **Yield type:** non-yield (commodity)

Matrixdock-issued gold token. Smaller and less liquid than XAUT on BSC.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply | $960,950 | 0.00% | 0.00% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $960,950

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
