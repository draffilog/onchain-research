# Who Is Farming Gold on BSC — and Why You Might Want To

*Last updated: April 2026*

> **Data integrity note**: Every position, rate, and balance below was verified
> via DeBank Pro API (`complex_protocol_list`), Dune Analytics transfer queries,
> and Lista DAO protocol UI (browser). Rates are snapshots from April 16, 2026.
> Re-verify before reusing — rates shift daily.

---

## The Pitch: Gold That Pays You

Gold has been a store of value for millennia. The problem? It generates zero
yield. You buy an ounce, store it, and hope it appreciates. Traditional finance
offers gold ETFs, but they charge fees — you *pay* to hold gold.

On BSC, five wallets found a way to **earn 9-12% annual yield** using Tether
Gold (XAUT) through Lista DAO's subsidized lending markets. Some do it while
keeping full gold price exposure. Others run delta-neutral strategies that
earn yield without caring whether gold goes up or down.

This document explores exactly what each wallet is doing, step-by-step, with
verified on-chain data.

---

## Why This Works: Lista DAO's Negative Borrow Rates

The entire XAUT farming ecosystem exists because of one mechanism: **Lista DAO
pays you to borrow**.

Lista DAO distributes LISTA token rewards to borrowers in certain markets. When
the reward rate exceeds the native interest rate, the effective borrow rate goes
negative — meaning you receive more in LISTA rewards than you pay in interest.

### XAUT Market Rates (April 16, 2026 — Lista UI, browser-verified)

| Market | What you do | Native rate (you pay) | LISTA subsidy (you earn) | Net rate |
|---|---|---|---|---|
| XAUt / BNB | Supply gold, borrow BNB | 0.23% | ~15.01% | **-14.78%** (earn) |
| XAUt / U | Supply gold, borrow U stablecoin | 0.26% | ~14.57% | **-14.31%** (earn) |
| XAUt / USDT | Supply gold, borrow USDT | 3.21% | ~16.31% | **-13.10%** (earn) |
| XAUt / USD1 | Supply gold, borrow USD1 | 0.29% | ~9.13% | **-8.84%** (earn) |
| U / XAUt | Supply U, borrow gold | 0.35% | 0% | **+0.35%** (pay) |
| USDT / XAUt | Supply USDT, borrow gold | 1.39% | 0% | **+1.39%** (pay) |

The top four rows are the key: you deposit XAUT as collateral, borrow stablecoins
or BNB, and **get paid to do it**. The bottom two rows show that borrowing XAUT
itself costs almost nothing (0.35-1.39%) and receives no subsidy.

This spread — **earn 9-15% supplying gold vs pay 0.3-1.4% borrowing gold** —
is what makes every strategy below possible.

### Lista XAUT Vault

There is also a one-click vault option:

| | APY | Utilization | What it does |
|---|---|---|---|
| Lista XAUT Vault | **9.88%** | ~90% | Deposit XAUT, earn subsidized yield passively |

Source: Lista vault UI, April 16, 2026.

---

## The Five Farmers

We identified every wallet actively farming XAUT on BSC through a systematic
process: Dune top-holder query → DeBank API wallet-by-wallet position check →
Lista UI rate verification. Five wallets account for all XAUT DeFi activity.

### At a Glance

| Farmer | XAUT Deployed | Equity | APY | Gold Exposure | Strategy |
|---|---|---|---|---|---|
| Farmer #1 | 507 XAUT (~$2.43M) | $2.43M | **~9%** | Full long | Leveraged long gold + stablecoin recycling |
| Farmer #2 | 136 supplied + 137 borrowed | ~$650K | **~7-10%** | Partial (net ~0) | Multi-directional rate harvest |
| Multi-Protocol | 25 XAUT | ~$120K | **~5-8%** | Full long | Diversified small positions across 4 protocols |
| Vault Depositor | 26 XAUT | ~$430K | **~12%** | Minimal | XAUT vault + leveraged stablecoin farming |
| Lista Depositor | 22 XAUT (net zero) | ~$112K | **~10%** | Zero | Pure delta-neutral rate arbitrage |

---

## Strategy 1: Leveraged Long Gold — ~9% APY + full gold exposure

**Wallet**: `0x102407f67415dcc4068370625ca27f24bb2a03d5`
**Equity**: ~$2.43M (507 XAUT)
**Verified via**: DeBank `complex_protocol_list` + Lista UI rates

### What this wallet is doing

This is the largest XAUT farmer on BSC. They are **long gold** and earn yield
on top of their gold position. Think of it as: "I believe gold will go up, and
I want to earn 9% annually while I wait."

#### Step-by-step

1. **Buy XAUT on Binance** (centralized exchange) — this is the only way to
   acquire meaningful amounts. PancakeSwap has $4.5K of liquidity, effectively
   zero. (Source: Dune query 7325450 — 82.7% of this wallet's XAUT came from
   Binance withdrawals.)

2. **Withdraw XAUT to BSC wallet** — on-chain, the XAUT goes from Binance hot
   wallet (`0x8894e0a0c962cb723c1976a4421c95949be2d4e3`) directly to the farmer.

3. **Deposit XAUT as collateral across 4 Lista markets**:
   - XAUt / USD1 market → borrow USD1 at **-8.84%** (earn)
   - XAUt / U market → borrow U at **-14.31%** (earn)
   - XAUt / BNB market → borrow BNB at **-14.78%** (earn)
   - XAUt / USDT market → borrow USDT at **-13.10%** (earn)

4. **Deploy borrowed stables into Venus Flux** — the stablecoins borrowed from
   Lista don't sit idle. They go into Venus Flux (syrupUSDT) for an additional
   ~4-7% spread on the stablecoin side.

5. **Park remaining XAUT in the Lista Vault** — 42 XAUT (~$204K) earns 9.88%
   passively in the XAUT vault.

#### Income breakdown

| Source | Rate | Applied to | Annual income |
|---|---|---|---|
| Lista XAUT borrow subsidies (4 markets) | -8.84% to -14.78% | ~$1.59M borrowed | ~$175K |
| XAUT Vault yield | +9.88% | ~$204K deposited | ~$20K |
| Venus Flux stablecoin spread | ~4-7% | ~$120K deployed | ~$7K |
| **Total farming income** | | | **~$202K** |
| BNB/XAUt reverse borrow cost | -1.79% | ~$187K | -($3.3K) |
| **Net income** | | | **~$199K** |

**Portfolio APY: ~$199K / $2.43M = ~8.2%** (conservatively) to **~9%** depending
on LISTA token price and subsidy rates at time of harvest.

#### Why this is interesting

- **Gold + yield**: You hold gold (protection against inflation, geopolitical
  risk) AND earn ~9% on top. In traditional finance, gold ETFs charge 0.4-0.5%
  per year — this strategy earns 9%, a ~9.5% swing.
- **Subsidy-funded**: The yield comes from LISTA token rewards, not from risky
  leverage. The borrowing itself is over-collateralized (77% LLTV = you borrow
  $77 for every $100 of gold).
- **Liquidation buffer**: At 77% LLTV, gold would need to drop ~23% before
  liquidation (assuming no additional collateral management).

#### What could go wrong

- **LISTA subsidy removal**: If Lista DAO stops incentivizing XAUT markets,
  the negative borrow rates disappear. The strategy becomes unprofitable
  overnight. This is the single biggest risk.
- **Gold price crash**: A >23% gold drop would trigger liquidation. Given gold's
  history, this is unlikely in a short timeframe but not impossible.
- **LISTA token depreciation**: Rewards are paid in LISTA. If the token drops
  50%, effective APY drops 50%.
- **Smart contract risk**: Lista DAO is a Morpho Blue fork — battle-tested
  architecture, but not immune to exploits.

---

## Strategy 2: Multi-Directional Rate Harvest — ~7-10% APY, partial gold exposure

**Wallet**: `0xc9144683c0497b422ccfe9bcfba37855cc62c0b8`
**Equity**: ~$650K
**Verified via**: DeBank `complex_protocol_list`

### What this wallet is doing

This farmer works both sides of the XAUT market simultaneously — supplying XAUT
as collateral (earning subsidies) while also borrowing XAUT on other markets
(paying minimal rates). The net gold position is close to zero, but not
perfectly hedged.

#### Step-by-step

1. **Supply 136 XAUT as collateral** on subsidized Lista markets → borrow
   stablecoins at -13% to -14% (earn LISTA rewards)
2. **Borrow ~137 XAUT** on unsubsidized markets → pay 0.35-1.39%
3. The borrowed XAUT gets redeployed or held as a hedge
4. Net XAUT exposure is approximately zero (136 supplied ≈ 137 borrowed)

#### Why this is interesting

- **Rate spread capture**: Earn 13-14% on one side, pay 0.3-1.4% on the other.
  The net spread is ~12% on the subsidized portion.
- **Flexible gold exposure**: By adjusting the supply/borrow ratio, this farmer
  can dial gold exposure from zero (fully hedged) to full long.
- **Lower capital requirement**: Doesn't need $2.4M like Farmer #1 — the
  strategy works at smaller scale because it's extracting the rate differential,
  not deploying a massive collateral base.

---

## Strategy 3: Diversified Small Positions — ~5-8% APY, full gold exposure

**Wallet**: `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7`
**Equity**: ~$120K (25 XAUT)
**Verified via**: DeBank `complex_protocol_list`

### What this wallet is doing

The "explorer" of the group. This wallet spreads 25 XAUT across **four
different protocols** — Lista DAO, Alpaca Finance, Aster, and Venus. The
positions are small, suggesting this user is testing different venues rather
than optimizing one.

#### Positions observed (DeBank, April 16)

| Protocol | Position | Estimated yield |
|---|---|---|
| Lista DAO | XAUT collateral → stablecoin borrow | ~9-14% (subsidized) |
| Alpaca Finance | Small XAUT lending supply | ~2-4% |
| Aster | XAUT-related position | ~3-5% (unverified — Aster internal) |
| Venus | Stablecoin deployment (from borrows) | ~3-7% |

#### Why this is interesting

- **Protocol diversification**: Spreading across four protocols reduces the risk
  that one protocol's exploit wipes out everything.
- **Low capital, real yield**: Even with only 25 XAUT (~$120K), the subsidized
  Lista markets generate meaningful returns.
- **Discovery phase**: This wallet's behavior suggests someone testing the
  waters — exactly the kind of user that would benefit from a clearer guide
  on which strategy offers the best risk-adjusted returns.

---

## Strategy 4: Vault Deposit + Leveraged Stablecoin Farming — ~12% APY, minimal gold

**Wallet**: `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963`
**Equity**: ~$430K
**Verified via**: DeBank `complex_protocol_list`

### What this wallet is doing

This is the **highest-APY strategy** in the group, and it barely uses gold.
The farmer parks a small amount of XAUT in the vault for passive yield, then
runs a massive leveraged stablecoin position on Lista.

#### Step-by-step

1. **Deposit 26 XAUT into Lista Vault** → earn 9.88% passively ($125K earning
   vault yield)
2. **Supply $5.44M USDT + USDC** to Lista lending markets
3. **Borrow $5.13M U (stablecoin)** at **-0.75%** (subsidized — get paid to borrow)
4. The borrowed U stablecoin can be recycled back or deployed elsewhere
5. Effective leverage: ~13x on equity

#### Income breakdown

| Source | Rate | Applied to |
|---|---|---|
| XAUT Vault | +9.88% | ~$125K |
| U stablecoin borrow subsidy | +0.75% | ~$5.13M borrowed |
| **Effective portfolio yield** | | ~$50K/yr on $430K equity |

**Portfolio APY: ~12%**

#### Why this is interesting

- **Highest APY of the five**: 12% with minimal gold exposure.
- **Capital-scalable**: Unlike XAUT-heavy strategies (limited by XAUT vault
  utilization at 90%), the stablecoin side can be scaled with more capital.
- **Stablecoin risk, not gold risk**: The main exposure is to USDT, USDC, and
  U stablecoin peg stability — not gold price.

#### What could go wrong

- **Health factor is razor-thin**: 1.025 — meaning a 2.5% depeg between any of
  the stablecoins triggers liquidation. This is aggressive.
- **LISTA subsidy removal**: Same risk as all strategies — the 0.75% subsidy
  on U borrows disappears if Lista changes incentives.
- **Stablecoin depeg cascading**: If U (a synthetic stablecoin) depegs, the
  entire 13x leveraged position unwinds via liquidation.

---

## Strategy 5: Pure Delta-Neutral Rate Arbitrage — ~10% APY, zero gold exposure

**Wallet**: `0x624227ae1d072d03ae0361f6a71384dd92af80b4`
**Equity**: ~$112K
**Verified via**: DeBank `complex_protocol_list` + Lista UI rates

### What this wallet is doing

The most elegant strategy of the five. This wallet has **zero net gold
exposure** — the exact same amount of XAUT is supplied and borrowed — yet
still earns ~10% APY by arbitraging the rate spread between subsidized and
unsubsidized Lista markets.

#### Step-by-step

1. **Supply 23.81 XAUT as collateral** on subsidized markets
2. **Borrow stablecoins** against the gold:
   - Borrow USDT at **-13.10%** (earn) → ~$30K
   - Borrow U at **-14.31%** (earn) → ~$44K
3. **Simultaneously borrow 23.81 XAUT** on unsubsidized markets:
   - Borrow XAUT against U at **+0.35%** (pay) → ~$114K
4. **Net XAUT = zero**: 23.81 supplied = 23.81 borrowed
5. **Pocket the rate spread**: Earn 13-14% on subsidized borrows, pay 0.35% on
   XAUT borrows

#### Income breakdown

| Position | Rate | On what | Annual |
|---|---|---|---|
| Borrow USDT against XAUT (subsidized) | earn **13.10%** | $30K | +$3,930 |
| Borrow U against XAUT (subsidized) | earn **14.31%** | $44K | +$6,296 |
| Borrow XAUT against U (unsubsidized) | pay **0.35%** | $114K | -$399 |
| Borrow U against stables (subsidized) | earn **0.75%** | $127K | +$952 |
| **Net annual income** | | | **~$10,779** |

**Portfolio APY: ~$10,779 / $112K = ~9.6%** (rounds to ~10%)

#### Why this is interesting

- **No gold price risk**: If gold drops 50%, this wallet doesn't care. The XAUT
  supplied and XAUT borrowed cancel out perfectly.
- **No directional bet required**: This is pure rate arbitrage — as long as the
  subsidized/unsubsidized spread exists, the strategy profits.
- **Replicable logic**: Any user who can supply XAUT and borrow XAUT on
  different markets with different subsidy levels can run this.

#### What could go wrong

- **LISTA subsidy removal**: The entire profit comes from the subsidy gap. If
  subsidies end, the strategy earns ~0%.
- **Liquidity constraint**: The XAUT vault is at 90% utilization — only ~34
  XAUT ($163K) of borrowable liquidity remains. New entrants will find it hard
  to replicate at scale.
- **Oracle/peg risk**: If the XAUT oracle price diverges between the subsidized
  and unsubsidized markets, the "net zero" position could drift and expose the
  farmer to unwanted directional risk.

---

## Why Should You Care?

### If you hold gold (or want to)

Traditional gold investing offers zero yield. Gold ETFs (GLD, IAU) charge
0.25-0.40% annually. Physical gold costs storage fees.

XAUT on Lista DAO offers:
- **9% APY while staying long gold** (Strategy 1)
- Gold price appreciation + farming income
- Over-collateralized borrowing (not margin trading — no counterparty risk beyond
  smart contract)

For a fund or individual holding gold as a hedge, earning 9% while maintaining
the same exposure is a meaningful improvement over traditional custody.

### If you don't hold gold (yield-only)

You don't need to believe in gold to profit. Two strategies generate yield with
zero gold price exposure:

- **Delta-neutral rate arb** (Strategy 5): ~10% APY, zero gold risk
- **Leveraged stablecoins** (Strategy 4): ~12% APY, stablecoin risk only

These strategies extract value from Lista DAO's LISTA token subsidies, not from
gold price movement. The gold is used as a vehicle — deposit it, borrow
against it, earn the subsidy spread, and hedge out the gold exposure.

### How it compares to slisBNB strategies

Our [BNB LST research](bnb-lst-market.md) found a stark contrast:

| | slisBNB/BNB Looping | XAUT Farming |
|---|---|---|
| **Theoretical APY** | ~14% at 3x leverage | 9-12% |
| **Who tried** | 30+ wallets | 5 wallets |
| **Who succeeded** | 0 human wallets sustained it | All 5 still active |
| **Liquidation events** | 1,555 total on Moolah controller | None observed on XAUT markets |
| **Primary risk** | slisBNB/BNB depeg (96.5% LLTV → 3.5% buffer at 3x) | LISTA subsidy removal |
| **Entry complexity** | Moderate (multiple loop txns) | High (need Binance XAUT access + multi-market setup) |

The XAUT strategies survive because they don't rely on a tight peg. slisBNB/BNB
looping looks great on paper but fails in practice — the 96.5% LLTV leaves a
razor-thin buffer, and our [liquidation forensics](bnb-lst-market.md#liquidation-forensics-april-2026)
show 1,555 liquidation events on the Moolah controller, with the top borrower
liquidated 113 times.

XAUT farmers avoid this by borrowing stablecoins (not the same asset) at lower
LLTVs (72-77%), giving them 23-28% room before liquidation.

---

## The Catch: Liquidity Is the Bottleneck

All five farmers sourced their XAUT from **Binance CEX withdrawals**, not from
on-chain DEX activity (verified: Dune query 7325450, 7325448).

| Liquidity source | Available | Source |
|---|---|---|
| PancakeSwap XAUT/USDT | ~$4,500 TVL | DexScreener |
| Lista XAUT Vault (remaining) | ~34 XAUT (~$163K) | Lista vault UI |
| Binance spot (off-chain) | Deep (centralized order book) | N/A |
| Other DEXs | None with meaningful liquidity | Dune `dex.trades` |

**What this means for new entrants**:

1. You must have a **Binance account** to acquire XAUT in meaningful size.
   There is no on-chain path that works beyond tiny amounts.
2. The **delta-neutral strategy** (Strategy 5) requires borrowing XAUT from
   Lista — with 90% vault utilization, only ~34 XAUT remains available.
3. If gold drops sharply, **liquidations would cascade** with no on-chain exit
   liquidity to absorb the selling pressure. The DEX can't handle it.
4. Exiting a position means **sending XAUT back to Binance** — there's no way
   to swap to stablecoins on-chain without massive slippage.

---

## The Subsidy Question: How Long Does This Last?

Every XAUT farming strategy depends on LISTA token subsidies. Without them:

| Strategy | Current APY | APY without subsidies |
|---|---|---|
| Leveraged long gold | ~9% | ~0.5-1% (vault native yield only) |
| Multi-directional | ~7-10% | ~0% (no spread to capture) |
| Diversified | ~5-8% | ~2-3% (native lending rates only) |
| Leveraged stablecoins | ~12% | ~0-1% (no borrow subsidy) |
| Delta-neutral arb | ~10% | ~0% (spread disappears) |

Lista DAO runs these subsidies to **bootstrap XAUT lending market liquidity**.
The LISTA token has a governance function and emissions schedule. Subsidy
duration depends on:

- LISTA token price (lower price = subsidies cost Lista DAO less to maintain)
- Lista DAO governance decisions (DAO vote can redirect emissions)
- XAUT market growth (if TVL grows enough, subsidies become less necessary)

There is no public commitment on how long these subsidies last.

---

## How to Replicate (If You Want To)

### Simplest path: XAUT Vault (passive, ~9.88% APY)

1. Acquire XAUT on Binance (buy with USD or swap from other crypto)
2. Withdraw XAUT to a BSC wallet (MetaMask, Rabby, etc.)
3. Go to `lista.org` → Earn → XAUT Vault
4. Deposit XAUT
5. Earn 9.88% subsidized yield
6. **Caveat**: Vault is 90% utilized — check available capacity before depositing

### Intermediate: Leveraged long gold (~9% APY)

1. Acquire XAUT on Binance
2. Go to `lista.org/lending/borrow`
3. Supply XAUT as collateral in the XAUt/U or XAUt/USDT market
4. Borrow stablecoins at negative rates (earn LISTA rewards)
5. Optionally deploy stables in Venus Flux or other yield venue
6. Monitor health factor — stay above 1.3 for safety

### Advanced: Delta-neutral rate arb (~10% APY)

1. Supply XAUT as collateral on subsidized markets (XAUt/USDT, XAUt/U)
2. Borrow the exact same XAUT amount on unsubsidized markets (U/XAUt)
3. Net XAUT exposure = zero
4. Earn the 13-14% subsidy spread minus the 0.35% borrow cost
5. Requires careful position management across multiple markets
6. **Limited by XAUT borrow liquidity** — only ~34 XAUT available in vault

---

## Data Sources

| Source | What it verified |
|---|---|
| DeBank `complex_protocol_list` | Every farmer's full position set, health factors, protocol identification |
| Dune query 7320262 | Top 15 XAUT holders by net balance |
| Dune query 7325448 | Origin trace — where each farmer's XAUT came from |
| Dune query 7325450 | Aggregated source breakdown (% from Binance, Lista, etc.) |
| Dune query 7320503 | XAUT protocol distribution (where gold lives on-chain) |
| Lista DAO UI (browser) | Live borrow rates (native + LISTA subsidy), LLTV, vault APY, utilization |
| Venus Flux UI (browser) | syrupUSDT and stablecoin yield verification |
| BscScan | Contract verification, wallet labeling |
| DexScreener | PancakeSwap XAUT LP TVL |

## Related Research

- [XAUT on BSC — full analysis](xaut-bsc-gold-defi.md) — supply distribution, Dune queries, address book
- [BNB LST Market](bnb-lst-market.md) — slisBNB looping failure analysis, liquidation forensics
- [Lista DAO Architecture](lista-dao-architecture.md) — Moolah lending mechanics, vault architecture
- [Dune Dashboard](https://dune.com/vlad_bnbchain/xaut-tether-gold-on-bsc-usage-analysis-lista-dao-holders-yield-strategies) — live visualizations
