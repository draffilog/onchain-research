---
symbol: BUSD
name: Binance USD (legacy)
category: stable-fiat-legacy
contract: 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
decimals: 18
underlying: USD
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 883352
    supply_apy: 0
    borrow_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 483533e6-3112-44a1-beae-7cae023065a6
aggregate:
  total_tvl_v1_usd: 883352
  venue_count: 1
---

# BUSD — Binance USD (legacy)

## Identity

- **Symbol:** `BUSD`
- **Contract (BSC):** `0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56`
- **Category:** stable-fiat-legacy
- **Underlying:** USD
- **Yield type:** non-yield

Paxos discontinued issuance in 2024; supply still circulating but no new mints. Tracked for completeness.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $883,352 | 0.00% | 0.00% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $883,352

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
