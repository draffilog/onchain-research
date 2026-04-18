---
symbol: BCH
name: Bitcoin Cash (BEP-20)
category: wrapped-major
contract: 0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf
decimals: 18
underlying: BCH
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 710038
    supply_apy: 0.8196
    borrow_apy: 5.1576
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: c5e32cb4-6484-45de-9f46-88004793c352
aggregate:
  total_tvl_v1_usd: 710038
  venue_count: 1
---

# BCH — Bitcoin Cash (BEP-20)

## Identity

- **Symbol:** `BCH`
- **Contract (BSC):** `0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf`
- **Category:** wrapped-major
- **Underlying:** BCH
- **Yield type:** non-yield

Wrapped BCH, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $710,038 | 0.82% | 5.16% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $710,038

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
