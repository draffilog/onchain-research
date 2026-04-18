---
symbol: CAKE
name: PancakeSwap
category: governance-defi
contract: 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82
decimals: 18
underlying: —
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 14705239
    supply_apy: 0.0114
    borrow_apy: 2.1595
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 88472ba3-f1e9-4da6-89da-eb12cf07e151
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 628191
    supply_apy: 0.0155
    borrow_apy: 0.5481
    pool_id_defillama: 80380208-63a5-46f7-9bb9-caa60fc73a8f
aggregate:
  total_tvl_v1_usd: 15333430
  venue_count: 2
---

# CAKE — PancakeSwap

## Identity

- **Symbol:** `CAKE`
- **Contract (BSC):** `0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82`
- **Category:** governance-defi
- **Underlying:** —
- **Yield type:** non-yield

PancakeSwap governance token. Accepted on Venus and Aave V3 (deposit-only on Aave).

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $14,705,239 | 0.01% | 2.16% | [`venues/venus.md`](../venues/venus.md) |
| Aave V3 | supply+borrow | $628,191 | 0.02% | 0.55% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |

**Total V1 TVL across all pools:** $15,333,430

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
