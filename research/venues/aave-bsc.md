# Aave V3 — BSC Pool Inventory

**Last verified:** 2026-04-18
**Filter:** Aave V3 BSC markets with TVL ≥ $500K
**Sources:** DeFiLlama yields API (`yields.llama.fi/pools` + `/lendBorrow`), Aave dApp (`app.aave.com/markets/?marketName=proto_bnb_v3`)

Aave V3 launched on BSC much later than Venus and remains smaller in TVL. Only 7 markets currently pass the $500K filter.

---

## Markets (≥ $500K TVL)

| Asset | Supply TVL USD | Borrow USD | Supply APY | Borrow APY | LTV | Asset Card |
|---|---|---|---|---|---|---|
| BTCB | 79,203,917 | 4,656,718 | 0.07% | 1.41% | 70% | [BTCB](../assets/BTCB.md) |
| WBNB | 75,911,311 | 3,306,250 | 0.02% | 0.68% | 70% | [BNB](../assets/BNB.md) |
| USDT | 69,518,151 | 48,303,809 | 1.93% | 3.09% | 75% | [USDT](../assets/USDT.md) |
| USDC | 24,528,985 | 13,406,499 | 1.20% | 2.43% | 75% | [USDC](../assets/USDC.md) |
| ETH | 20,175,020 | 10,784,517 | 0.76% | 1.67% | 80% | [ETH](../assets/ETH.md) |
| wstETH | 4,140,457 | 2,971 | 0.00% | 0.01% | 72% | [wstETH](../assets/wstETH.md) |
| CAKE | 651,132 | 22,941 | 0.02% | 0.55% | 0% | [CAKE](../assets/CAKE.md) |

**Notes:**
- LTV column is the Aave loan-to-value parameter.
- CAKE has 0% LTV (deposit-only — cannot be used as collateral).
- No supply-side or borrow-side rewards currently active on the Aave BSC market (`apyReward = null` across all assets).

---

## Aggregate Stats

| Metric | Value |
|---|---|
| Markets | 7 |
| Total Supply USD | $274M |
| Total Borrow USD | $80.5M |
| Aggregate Utilization | 29.4% |

---

## Notable Patterns

- **Stable utilization is the highest.** USDT at 70% utilization (3.09% borrow rate) is the busiest market.
- **BTCB and WBNB are the largest deposits** but with very low utilization (~6% and 4% respectively), pushing supply APYs near zero.
- **wstETH is the only LST present.** $4.1M deposited, almost zero borrowing — pure yield-bearing collateral.
- **No emissions currently.** Unlike Venus (XVS), Lista (LISTA), or Pendle (PENDLE), Aave V3 BSC is currently running with zero liquidity-mining rewards.

---

## Composability Notes

- The wallet `0xac3e216bd55860912062a4027a03b99587b7ffc7` (the $500M institutional whale profiled in [`lista-dao-yield-strategies.md`](../lista-dao-yield-strategies.md)) holds positions on both Venus and Lista — Aave BSC has not yet attracted comparable mega-whale concentration (verify in next snapshot).
- Aave V3 BSC supports **eMode** for correlated pairs; current eMode categories on BSC are limited (verify on dApp).

---

## Key Contract Addresses

| Contract | Address (BSC) | Notes |
|---|---|---|
| PoolAddressesProvider (BNB market) | 0xff75B6da14FfbbfD355Daf7a2731456b3562Ba6D | Aave V3 BSC entry point |
| Pool | (resolve via PoolAddressesProvider.getPool()) | Main lending pool |

aToken / debtToken addresses per asset can be queried via `Pool.getReserveData(asset)`.

---

## Cross-References

- Live UI: https://app.aave.com/markets/?marketName=proto_bnb_v3
- DeFiLlama project page: https://defillama.com/protocol/aave-v3

---

## Open Items for Future Verification

- Pull current eMode categories on BSC and which assets qualify.
- Identify which BSC wallets actually use Aave (vs Venus/Lista) — there is currently no dedicated wallet research for Aave BSC users in this repo. Candidate weekly task for the recurring agent.
