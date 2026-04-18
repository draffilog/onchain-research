# Venus Protocol — BSC Pool Inventory

**Last verified:** 2026-04-18
**Filter:** Core Pool markets with TVL ≥ $500K (isolated pools tracked separately when relevant)
**Sources:** DeFiLlama yields API (`yields.llama.fi/pools` + `/lendBorrow`), Venus dApp (`app.venus.io`)

Venus is the largest lending market on BSC by deposits. The Core Pool is a single shared-collateral money market (Compound v2 fork). Isolated Pools host long-tail assets in segregated risk silos.

---

## Core Pool Markets (≥ $500K TVL, sorted by supply TVL)

| Asset | Supply TVL USD | Borrow USD | Supply APY | Borrow APY | LTV (CF) | Reward Token | Asset Card |
|---|---|---|---|---|---|---|---|
| BTCB | 471,737,353 | 119,950,021 | 0.21% | 1.19% | 80% | XVS | [BTCB](../assets/BTCB.md) |
| WBNB | 375,788,744 | 120,025,436 | 0.22% | 1.00% | 80% | XVS | [BNB](../assets/BNB.md) |
| USDT | 212,618,579 | 126,217,329 | 2.09% | 3.95% | 80% | XVS | [USDT](../assets/USDT.md) |
| SolvBTC | 183,687,250 | 1,515,275 | 0.00% | 0.07% | 75% | XVS | [SolvBTC](../assets/SolvBTC.md) |
| asBNB | 85,947,446 | 0 | 0.00% | 0.00% | 72% | XVS | [asBNB](../assets/asBNB.md) |
| USDC | 78,312,576 | 48,119,822 | 2.24% | 4.09% | 82.5% | XVS | [USDC](../assets/USDC.md) |
| xSolvBTC | 63,562,108 | 0 | 0.00% | 0.00% | 72% | XVS | [xSolvBTC](../assets/xSolvBTC.md) |
| WBNB (alt) | 62,617,469 | 10,610,551 | 0.15% | 1.06% | 80% | XVS | [BNB](../assets/BNB.md) |
| ETH | 47,874,585 | 30,477,518 | 0.97% | 1.92% | 80% | XVS | [ETH](../assets/ETH.md) |
| U | 26,636,312 | 9,315,786 | 0.69% | 2.20% | 75% | XVS | [U](../assets/U.md) |
| WBETH | 24,434,366 | 312,664 | 0.00% | 0.13% | 80% | XVS | [wBETH](../assets/wBETH.md) |
| CAKE | 14,810,750 | 105,510 | 0.01% | 2.16% | 55% | XVS | [CAKE](../assets/CAKE.md) |
| FDUSD | 12,796,859 | 10,024,856 | **5.66%** | **8.12%** | 75% | XVS | [FDUSD](../assets/FDUSD.md) |
| XRP | 10,901,225 | 1,996,722 | 0.62% | 4.28% | 65% | XVS | [XRP](../assets/XRP.md) |
| DOGE | 7,533,040 | 93,393 | 0.00% | — | 0% | XVS | [DOGE](../assets/DOGE.md) |
| UNI | 7,055,026 | 77,421 | 0.00% | 0.22% | 0% | XVS | [UNI](../assets/UNI.md) |
| ADA | 3,101,798 | 136,099 | 0.09% | 2.69% | 0% | XVS | [ADA](../assets/ADA.md) |
| LTC | 2,650,929 | 104,798 | 0.08% | 2.50% | 0% | XVS | [LTC](../assets/LTC.md) |
| SOL | 2,039,841 | 256,641 | 0.45% | 4.61% | 72% | XVS | [SOL](../assets/SOL.md) |
| DAI | 1,963,496 | 952,798 | 2.14% | 4.96% | 75% | XVS | [DAI](../assets/DAI.md) |
| LINK | 1,618,164 | 44,926 | 0.05% | 2.35% | 0% | XVS | [LINK](../assets/LINK.md) |
| XVS | 1,582,713 | 4 | 0.00% (1.52% reward) | 0.00% | 60% | XVS | [XVS](../assets/XVS.md) |
| USD1 | 1,342,296 | 664,846 | 1.85% | 5.06% | 50% | XVS | [USD1](../assets/USD1.md) |
| FIL | 1,189,082 | 67,688 | 0.14% | 3.18% | 0% | XVS | [FIL](../assets/FIL.md) |
| lisUSD | 1,018,351 | 318,306 | 0.88% | 3.17% | 0% | XVS | [lisUSD](../assets/lisUSD.md) |
| TRX | 955,611 | 171,166 | 0.00% | — | 0% | XVS | [TRX](../assets/TRX.md) |
| XAUM | 960,950 | 0 | 0.00% | 0.00% | 65% | XVS | [XAUM](../assets/XAUM.md) |
| BCH | 890,751 | 180,713 | 0.82% | 5.16% | 0% | XVS | [BCH](../assets/BCH.md) |
| BUSD | 883,502 | 150 | 0.00% | 0.00% | 0% | XVS | [BUSD](../assets/BUSD.md) |
| TWT | 865,511 | 12,825 | 0.03% | 2.32% | 0% | XVS | [TWT](../assets/TWT.md) |
| DOT | 826,292 | 206,322 | 1.15% | 5.90% | 0% | XVS | [DOT](../assets/DOT.md) |
| slisBNB | 717,218 | 0 | 0.00% | 0.00% | 80% | XVS | [slisBNB](../assets/slisBNB.md) |
| AAVE | 712,155 | 37,561 | 0.04% | 1.06% | 0% | XVS | [AAVE](../assets/AAVE.md) |

**Notes:**
- LTV column is the Venus collateral factor (CF) — the fraction of supplied value borrowable against the position.
- "WBNB" appears twice because DeFiLlama tracks two market addresses; both are the same underlying asset on-chain. Treat aggregated WBNB supply as **$438M** for asset-card purposes.
- 0% LTV markets are deposit-only (cannot be used as collateral). Common pattern for long-tail wrapped assets.
- All markets emit XVS as a liquidity mining reward; per-market emission tracked in `apyReward` from DeFiLlama (most are 0% currently except XVS itself).

---

## Key Contracts

| Contract | Address | Notes |
|---|---|---|
| XVS Token | 0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63 | Reward + governance |
| Comptroller (Core) | 0xfD36E2c2a6789Db23113685031d7F16329158384 | Risk parameter manager |
| VAI Stablecoin | 0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7 | Venus-native borrowable stablecoin (sub-$500K, excluded from inventory) |

vToken addresses are dynamic — query the Comptroller `getAllMarkets()` to enumerate.

---

## Notable Patterns

- **BTCB and BNB are the dominant collateral.** Combined $848M deposited; combined $240M borrowed (28% utilization).
- **USDT is the largest borrowed asset.** $126M borrowed → 59% utilization → 3.95% borrow APY. Highest borrow demand on BSC outside of FDUSD.
- **FDUSD is uniquely high-yield.** 5.66% supply / 8.12% borrow at $13M TVL. Reflects historical FDUSD depeg risk premium.
- **asBNB and SolvBTC are 0% LTV variants here.** Both are large deposits ($86M and $184M respectively) where users are NOT borrowing against them — these are pure yield-deposit positions.
- **Venus is an active counterparty for the wallets profiled in [`bsc-midsize-defi-users.md`](../bsc-midsize-defi-users.md) and [`bnb-lst-market.md`](../bnb-lst-market.md).** Most BSC mid/large DeFi users hold both Lista and Venus positions.

---

## Aggregate Stats (≥ $500K pools only)

| Metric | Value |
|---|---|
| Markets | 33 |
| Total Supply USD | $1.71B |
| Total Borrow USD | $471M |
| Aggregate Utilization | 27.5% |

---

## Cross-References

- Wallet profiling that includes Venus exposure: [`bsc-midsize-defi-users.md`](../bsc-midsize-defi-users.md), [`bnb-lst-market.md`](../bnb-lst-market.md)
- Live UI: https://app.venus.io/

---

## Open Items for Future Verification

- Enumerate Venus Isolated Pools on BSC (`venus-isolated-pools` in DeFiLlama returned no ≥ $500K hits this run, but isolated pools change frequently).
- Confirm the two WBNB market entries — likely Core Pool main + a second deployment (e.g., LiquidStakedBNB pool).
- Track XVS supply-side reward distribution explicitly — current data shows nearly all markets at 0 reward APY, which suggests emissions are paused or concentrated on borrow side.
