---
symbol: DOT
name: Polkadot (BEP-20)
category: wrapped-major
contract: 0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402
decimals: 18
underlying: DOT
yield_type: non-yield
last_verified: 2026-04-18
sources:
  bscscan: https://bscscan.com/token/0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402
  defillama_yields_api: https://yields.llama.fi/pools
venues:
  - protocol: Venus Core
    role: supply+borrow
    tvl_usd: 619969
    supply_apy: 1.1511
    borrow_apy: 5.8966
    reward_token: 0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63
    pool_id_defillama: 422f1356-9e9c-471a-9641-135742da9891
aggregate:
  total_tvl_v1_usd: 619969
  venue_count: 1
---

# DOT — Polkadot (BEP-20)

## Identity

- **Symbol:** `DOT`
- **Contract (BSC):** `0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402`
- **Category:** wrapped-major
- **Underlying:** DOT
- **Yield type:** non-yield

Wrapped DOT, Venus-only.

## Where it's used (≥ $500K TVL pools)

| Protocol | Role | TVL USD | Supply APY | Borrow APY | Pool File |
|---|---|---|---|---|---|
| Venus Core | supply+borrow | $619,969 | 1.15% | 5.90% | [`venues/venus.md`](../venues/venus.md) |

**Total V1 TVL across all pools:** $619,969

## Verification History

| Date | Source | Notes |
|---|---|---|
| 2026-04-18 | DeFiLlama yields API + venue files | Initial baseline |
