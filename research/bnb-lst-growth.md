# BNB LST Growth Trends & Market Dynamics

*Last updated: April 17, 2026*

> All data from Dune Analytics queries on `tokens.transfers` (mint/burn events).
> Dune query IDs: 7331935 (cumulative supply), 7331934 (holders), 7331950 (monthly snapshots), 7331959 (holder stats).

## slisBNB Supply Timeline

| Month | Supply | Change | Notes |
|---|---|---|---|
| Jul 2023 | 132,713 | — | Launch. First big mint Jul 18 (128K in one day) |
| Aug 2023 | 134,699 | +1.5% | Holder explosion Aug 12: 23,613 new wallets in one day (likely airdrop/campaign) |
| Sep 2023 | 138,893 | +3.1% | Steady growth |
| Oct 2023 | 138,716 | -0.1% | First net decline — some early holders exiting |
| Nov 2023 | 138,251 | -0.3% | Slight decline continues |
| Dec 2023 | 137,994 | -0.2% | Flat |
| Jan 2024 | 139,342 | +1.0% | Recovery begins |
| **Feb 2024** | **289,475** | **+107.8%** | **Massive doubling — likely Launchpool/incentive program** |
| Mar 2024 | 316,625 | +9.4% | Continued momentum |
| Apr 2024 | 261,897 | -17.3% | Large redemption wave |
| May 2024 | 263,549 | +0.6% | Stabilized |
| Jun 2024 | 402,331 | +52.6% | Second growth wave |
| Jul 2024 | 314,011 | -21.9% | Major redemptions |
| Aug 2024 | 359,664 | +14.5% | Recovery |
| Sep 2024 | 397,665 | +10.6% | Growth |
| **Oct 2024** | **610,180** | **+53.4%** | **Third major growth wave** |
| Nov 2024 | 556,534 | -8.8% | Partial exit |
| Dec 2024 | 732,558 | +31.6% | Strong year-end growth |
| Jan 2025 | 572,562 | -21.8% | New year selloff |
| Feb 2025 | 665,030 | +16.1% | Recovery |
| Mar 2025 | 652,876 | -1.8% | Flat |
| Apr 2025 | 689,536 | +5.6% | Moolah lending launches (first liquidation events) |
| May 2025 | 776,307 | +12.6% | Flash depeg event May 5 (DEX ratio dropped to 0.809) |
| Jun 2025 | 883,905 | +13.9% | Strong growth |
| Jul 2025 | 955,859 | +8.1% | Approaching 1M |
| **Aug 2025** | **1,137,404** | **+19.0%** | **First time over 1M slisBNB** |
| Sep 2025 | 1,077,094 | -5.3% | asBNB launches (competition). 133 liquidation events. |
| **Oct 2025** | **1,263,269** | **+17.3%** | **All-time high. Also 635 liquidation events (biggest month).** |
| Nov 2025 | 1,206,732 | -4.5% | 4.15M tokens seized in liquidations |
| Dec 2025 | 1,131,950 | -6.2% | Declining |
| Jan 2026 | 1,081,634 | -4.4% | Declining |
| Feb 2026 | 952,413 | -11.9% | Sharp decline |
| Mar 2026 | 930,826 | -2.3% | Stabilizing |
| **Apr 2026** | **930,451** | **-0.04%** | **Current — essentially flat** |

### Key Observations

1. **Three major growth waves**: Feb 2024 (+108%), Oct 2024 (+53%), Aug-Oct 2025 (+19-17%)
2. **Volatile supply**: slisBNB supply regularly swings 10-20% month-over-month, unlike most LSTs
3. **Peak and decline**: ATH of 1.26M in Oct 2025, now 26% below peak at 930K
4. **Liquidation correlation**: The Oct 2025 ATH also saw the most liquidations (635 events), suggesting aggressive leveraging preceded the decline

## asBNB Supply

| Month | Supply | Notes |
|---|---|---|
| Sep 2025 | 1,000,000,000 | Single pre-mint to treasury `0x5c952063c7fc8610ffdb798152d69f0b9550762b` |
| Apr 2026 | 1,000,000,000 | No additional mints or burns detected |

asBNB uses a different model: 1B tokens were pre-minted, with only ~19K distributed to 12 unique recipients. The token is reward-bearing (1 asBNB > 1 BNB, currently ~1.34 ratio).

### asBNB: Marketing TVL vs On-Chain Reality

External sources (DeFiLlama, AI summaries) report asBNB TVL as $150-230M. This comes from total minted supply × exchange rate. The on-chain reality is far smaller:

| Metric | Marketing Figure | On-Chain Verified |
|---|---|---|
| TVL | ~$159M (DeFiLlama) | ~$12M (circulating outside treasury) |
| Circulating supply | 238K (implied from TVL / price) | 19K (1 non-treasury holder) |
| Holders | Not disclosed | 12 unique recipients ever, 0 new in 90 days |
| External DeFi usage | Not disclosed | $0 visible on DeBank |

The key differentiator is asBNB's utility within Aster's own perpetual DEX (yield-bearing collateral), which may not be captured by standard on-chain tools (Dune, DeBank). This internal utility model is the opposite of slisBNB's approach (broad external composability). See `bnb-lst-market.md` for the full fact-check.

## Holder Distribution

| Token | Total Unique Recipients | New in Last 30d | New in Last 90d |
|---|---|---|---|
| slisBNB | 809,393 | 12,179 | 21,922 |
| asBNB | 12 | 0 | 0 |

### slisBNB Holder Growth Milestones

| Date | Cumulative Holders | Event |
|---|---|---|
| Jul 6, 2023 | 18 | First real users |
| Jul 28, 2023 | 1,264 | Crossed 1K |
| Aug 12, 2023 | 27,761 | **23,613 new wallets in one day** — massive campaign/airdrop |
| Aug 31, 2023 | 30,010 | Crossed 30K |
| Apr 2026 | 809,393 | Current total |

## Market Share Dynamics

slisBNB dominates with 72.9% market share, but the trend has shifted:
- Jan 2024: slisBNB was the *only* meaningful BNB LST (~139K supply)
- Oct 2025: slisBNB peaked at 1.26M while asBNB launched
- Apr 2026: slisBNB at 930K, asBNB at ~19K circulating (still tiny by comparison)

The competition hasn't dented slisBNB — the decline from 1.26M to 930K is driven by the lending/liquidation cycle, not by migration to asBNB.

## Dune Queries Used

| Query ID | Name | What it measures |
|---|---|---|
| 7331935 | BNB LST Cumulative Supply Over Time | Daily mint/burn tracking for both tokens |
| 7331934 | BNB LST Daily Unique Holders | New wallet adoption rate |
| 7331950 | BNB LST Monthly Supply Snapshots | End-of-month supply for trend analysis |
| 7331959 | BNB LST Latest Holder Stats | Current holder counts and recent activity |
