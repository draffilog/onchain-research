---
symbol: USD1
name: USD1 (World Liberty Financial)
category: stable-fiat
contract: 0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d
decimals: 18
underlying: USD
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista Moolah
    role: supply
    tvl_usd: 138544347
    supply_apy: 1.0491
    pool_id_defillama: d6fec854-4258-495b-95df-e4066214f41d
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 677450
    supply_apy: 1.8518
    borrow_apy: 5.0632
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 406b11b4-c4f9-4253-bfd3-388c208a4ecd
aggregate:
  total_tvl_v1_usd: 139221797
  venue_count: 2
---

# USD1 — USD1 (World Liberty Financial)

## Identity

- **Symbol:** `USD1`
- **Contract (BSC):** `0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d`
- **Category:** stable-fiat
- **Underlying:** USD
- **Yield type:** non-yield

WLFi-issued USD stable. The $138M Lista Moolah USD1 vault (curator: Lista) is the dominant use site on BSC.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista Moolah | supply | $138,544,347 | 1.05% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Venus Core | supply+borrow | $677,450 | 1.85% | 5.06% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $139,221,797

## Deep-dive references

- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)
- [`research/bsc-midsize-defi-users.md`](../bsc-midsize-defi-users.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
