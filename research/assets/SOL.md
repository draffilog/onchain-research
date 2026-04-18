---
symbol: SOL
name: Solana (BEP-20)
category: wrapped-major
contract: 0x570A5D26f7765Ecb712C0924E4De545B89fD43dF
decimals: 18
underlying: SOL
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x570A5D26f7765Ecb712C0924E4De545B89fD43dF
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 1783200
    supply_apy: 0.4543
    borrow_apy: 4.6066
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 13168bce-80ed-4c20-bb4b-550218dd067b
aggregate:
  total_tvl_v1_usd: 1783200
  venue_count: 1
---

# SOL — Solana (BEP-20)

## Identity

- **Symbol:** `SOL`
- **Contract (BSC):** `0x570A5D26f7765Ecb712C0924E4De545B89fD43dF`
- **Category:** wrapped-major
- **Underlying:** SOL
- **Yield type:** non-yield

Wrapped SOL, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $1,783,200 | 0.45% | 4.61% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $1,783,200

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
