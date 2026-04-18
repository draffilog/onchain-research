---
symbol: slisBNB
name: Staked Lista BNB
category: bnb-lst
contract: 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
decimals: 18
underlying: BNB
yield_type: reward-bearing (exchange-rate)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Lista LST
    role: liquid-staking-receipt
    tvl_usd: 620163010
    supply_apy: 4.658
    pool_id_defillama: 50bb5f69-85ea-4f70-81da-3661a1633fc4
  - protocol: Lista CDP
    role: collateral (mints lisUSD)
    tvl_usd: 276114535
    supply_apy: 0
    borrow_apy: 4.3518
    pool_id_defillama: 3c46f16f-b35f-4d51-b130-c3e5817eca60
  - protocol: Venus Core
    role: supply
    tvl_usd: 717218
    supply_apy: 0
    borrow_apy: 0
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: f90b1b99-5a6b-4ede-945a-04c916ba0ac1
aggregate:
  total_tvl_v1_usd: 896994763
  venue_count: 3
---

# slisBNB — Staked Lista BNB

## Identity

- **Symbol:** `slisBNB`
- **Contract (BSC):** `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B`
- **Category:** bnb-lst
- **Underlying:** BNB
- **Yield type:** reward-bearing (exchange-rate)

Issued by Lista StakeManager (0x1adB950d8bB3dA4bE104211D5AB038628e477fE6). Accrues BNB staking rewards + Binance Launchpool yield via clisBNB.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Lista LST | liquid-staking-receipt | $620,163,010 | 4.66% | — | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Lista CDP | collateral (mints lisUSD) | $276,114,535 | 0.00% | 4.35% | [`venues/lista-dao.md`](../venues/lista-dao.md) |
| Venus Core | supply | $717,218 | 0.00% | 0.00% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $896,994,763

## Deep-dive references

- [`research/bnb-lst-market.md`](../bnb-lst-market.md)
- [`research/bnb-lst-growth.md`](../bnb-lst-growth.md)
- [`research/lista-dao-architecture.md`](../lista-dao-architecture.md)
- [`research/lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)
- [`research/pendle-bsc-markets.md`](../pendle-bsc-markets.md)

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
