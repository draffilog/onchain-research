---
symbol: USDC
name: USD Coin
category: stable-fiat
contract: 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
decimals: 18
underlying: USD
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 30192754
    supply_apy: 2.2435
    borrow_apy: 4.0936
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 89eba1e5-1b1b-47b6-958b-38138a04c244
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 11122486
    supply_apy: 1.1951
    borrow_apy: 2.4294
    pool_id_defillama: 15cf7c05-b5f0-4bde-8745-a791528c4381
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 1543885
    supply_apy: 3.2543
    reward_token: 0xFceB31A79F71AC9CBDCF853519c1b12D379EdC46
    pool_id_defillama: 2e2b6277-9fc6-4466-8580-0dfb9416aad7
aggregate:
  total_tvl_v1_usd: 42859125
  venue_count: 3
---

# USDC — USD Coin

## Identity

- **Symbol:** `USDC`
- **Contract (BSC):** `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`
- **Category:** stable-fiat
- **Underlying:** USD
- **Yield type:** non-yield

Circle-issued USD stable. Smaller share than USDT on BSC.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $30,192,754 | 2.24% | 4.09% | [`venues/venus.md`](../venues/venus.md) |
| Aave V3 | supply+borrow | $11,122,486 | 1.20% | 2.43% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |
| Lista Moolah | supply | $1,543,885 | 3.25% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |

**Total V1 TVL across all pools:** $42,859,125

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
