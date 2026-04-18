---
symbol: TRX
name: TRON (BEP-20)
category: wrapped-major
contract: 0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3
decimals: 18
underlying: TRX
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 784445
    supply_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: e4730d20-a5d5-4959-84ac-42fd32027294
aggregate:
  total_tvl_v1_usd: 784445
  venue_count: 1
---

# TRX — TRON (BEP-20)

## Identity

- **Symbol:** `TRX`
- **Contract (BSC):** `0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3`
- **Category:** wrapped-major
- **Underlying:** TRX
- **Yield type:** non-yield

Wrapped TRX, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $784,445 | 0.00% | — | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $784,445

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
