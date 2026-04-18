---
symbol: wstETH
name: Lido Wrapped Staked ETH
category: eth-lst
contract: 0x26c5e01524d2E6280A48F2c50fF6De7e52E9611C
decimals: 18
underlying: ETH
yield_type: reward-bearing (exchange-rate)
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x26c5e01524d2E6280A48F2c50fF6De7e52E9611C
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Aave V3
    role: supply+borrow
    tvl_usd: 4137486
    supply_apy: 0.0
    borrow_apy: 0.0112
    pool_id_defillama: 02a17921-209f-4516-a166-8bb33799def5
aggregate:
  total_tvl_v1_usd: 4137486
  venue_count: 1
---

# wstETH — Lido Wrapped Staked ETH

## Identity

- **Symbol:** `wstETH`
- **Contract (BSC):** `0x26c5e01524d2E6280A48F2c50fF6De7e52E9611C`
- **Category:** eth-lst
- **Underlying:** ETH
- **Yield type:** reward-bearing (exchange-rate)

Bridged Lido stETH wrapped variant. Currently only on Aave V3 BSC, $4.1M.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Aave V3 | supply+borrow | $4,137,486 | 0.00% | 0.01% | [`venues/aave-bsc.md`](../venues/aave-bsc.md) |

**Total V1 TVL across all pools:** $4,137,486

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
