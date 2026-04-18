---
symbol: XRP
name: XRP (BEP-20)
category: wrapped-major
contract: 0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE
decimals: 18
underlying: XRP
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 8904504
    supply_apy: 0.6153
    borrow_apy: 4.2751
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 0204c8ff-0805-4515-a27e-742d23a15719
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 527856
    supply_apy: 1.0702
    pool_id_defillama: cc9caff6-1088-4cdf-8dd7-61de61719ff3
aggregate:
  total_tvl_v1_usd: 9432360
  venue_count: 2
---

# XRP — XRP (BEP-20)

## Identity

- **Symbol:** `XRP`
- **Contract (BSC):** `0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE`
- **Category:** wrapped-major
- **Underlying:** XRP
- **Yield type:** non-yield

Wrapped XRP on BSC. Active on Venus + a small Lista Moolah vault (Hyperithm Lista X, $528K).

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $8,904,504 | 0.62% | 4.28% | [`venues/venus.md`](../venues/venus.md) |
| Lista Moolah | supply | $527,856 | 1.07% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $9,432,360

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
