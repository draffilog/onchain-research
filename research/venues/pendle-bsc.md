# Pendle Finance — BSC Pool Inventory

**Last verified:** 2026-04-18
**Filter:** active markets with TVL ≥ $500K
**Sources:** DeFiLlama yields API + Pendle V2 API (`api-v2.pendle.finance/core/v2/markets/all?chainId=56`), cross-checked against [`research/pendle-bsc-markets.md`](../pendle-bsc-markets.md)

Pendle splits any yield-bearing token into three parts:
- **PT (Principal Token)** — fixed yield, redeems 1:1 to underlying at maturity
- **YT (Yield Token)** — speculates on future yield
- **LP** — provides liquidity between PT and SY, earns swap fees + PENDLE rewards

---

## Active Markets (≥ $500K TVL)

| Market | Underlying Asset | TVL USD | Maturity | PT Implied APY | LP APY | LP Reward | Asset Card |
|---|---|---|---|---|---|---|---|
| slisBNBx (Jun26) | slisBNB | 5,915,549 | 2026-06-25 | 3.04% | 4.72% (4.48 base + 0.25 PENDLE) | PENDLE | [slisBNB](../assets/slisBNB.md) |
| uniBTC (Jun26) | uniBTC | 1,794,455 | 2026-06-25 | 0.97% | 0.18% (0.18 base + PENDLE) | PENDLE | [uniBTC](../assets/uniBTC.md) |

DeFiLlama pool ids:
- slisBNBx PT: `55dfd750-dfb6-429b-8ff8-9d4c3192b6b4` / LP: `60ed9a21-22ba-4f79-82ee-d677d9cf016e`
- uniBTC PT: `560f9a0a-0d6a-42b7-8ffc-f43e6d480581` / LP: `472a97d0-fcd9-4501-811c-eec5922b596c`

---

## Markets Below $500K (excluded from V1, tracked for promotion)

From [`pendle-bsc-markets.md`](../pendle-bsc-markets.md), still active but below the filter:

| Market | TVL USD | Implied APY | Maturity |
|---|---|---|---|
| sUSDu | 442,355 | 14.00% | 2026-04-23 |
| cUSDO | 63,191 | 3.11% | 2026-10-29 |

If TVL crosses $500K, the weekly snapshot must promote these to the active table above and create asset cards for `sUSDu` and `cUSDO`.

---

## Expired Markets with Significant Stuck TVL

These are not tradeable but carry user positions awaiting redemption. Tracked for context only.

| Market | TVL USD | Expired |
|---|---|---|
| SolvBTC.BNB | 72,749,017 | 2025-12-18 |
| USDe | 60,087,198 | 2025-10-30 |
| satUSD+ | 30,207,560 | 2025-12-18 |
| slisBNBx (Oct25) | 20,315,540 | 2025-10-30 |
| sigmaSP | 4,101,394 | 2025-09-25 |

Source: Pendle V2 API as of April 2026, see [`pendle-bsc-markets.md`](../pendle-bsc-markets.md) for full 35-market list.

---

## Key Contracts (Active Markets)

### slisBNBx-Jun26
- Market: `0x3c1a3d6b69a866444fe506f7d38a00a1c2d859c5`
- PT: `0xe052823b4aefc6e230faf46231a57d0905e30ae0`
- YT: `0xc08e81a01cfdcf0e68ebc0441c9bb8cce36aa25c`
- SY: `0x27faf900007b4cba7803000251ec96bc69ff1bea`
- Underlying (slisBNB): `0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b`

### uniBTC-Jun26
- Market: `0x21558067e3ed5d3cdbe2dd3662bd9035a8e3315a`
- PT: `0x0af2b242a526447fefd6e29cd531ecb89616afd2`
- YT: `0xb36863b33d021fbbc88e81bd9d372e4ebbb38d2a`
- SY: `0xe10b8c2b029c3369f7a910710ed4fa2b25059674`
- Underlying (uniBTC): `0x53176cadd446700fa6b89f840357ac586d7e33db`

---

## Composability Notes

- **Lista Moolah accepts Pendle PTs as collateral.** The Moolah Controller (`0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c`) holds PT positions across 4 markets including slisBNBx and satUSD+. Source: [`pendle-bsc-markets.md`](../pendle-bsc-markets.md) cross-market analysis.
- **PENDLE reward token:** `0xb3ed0a426155b79b898849803e3b36552f7ed507` (BSC).

---

## Aggregate Stats (≥ $500K active pools)

| Metric | Value |
|---|---|
| Active markets | 2 |
| Total active TVL | $7.71M |
| Total expired stuck TVL | $187M |

---

## Cross-References

- Deep dive: [`pendle-bsc-markets.md`](../pendle-bsc-markets.md) — full 35-market history, PT/YT/LP holders, wallet profiling
