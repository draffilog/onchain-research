---
title: BSC Yield Opportunities — by Asset Class (Apr 20, 2026)
topic: yield-farming
chain: BSC
audience: yield desks, hedge funds, multi-strategy farmers
verified: 2026-04-20
sources:
  - Lista Moolah API (api.lista.org/api/moolah/...)
  - DeFiLlama yields API (yields.llama.fi/pools)
  - DeBank Pro API (complex_protocol_list + total_balance, 60+ wallets verified live today)
  - Dune queries: 7335789, 7335574, 7331504, 7331658, 7335781, 7335782, 7332010, 7335606
  - Token-holder discovery: DeBank token/top_holders for BTCB / SolvBTC / xSolvBTC (top 100 / 50 / 30)
tags: [bsc, lista, moolah, venus, ethena, susde, btcb, solvbtc, xaut, slisbnb, looping, delta-neutral]
---

# BSC Yield Opportunities — by Asset Class

**Verified live: April 20, 2026.** Every APY, borrow rate, and farmer wallet
in this document was re-verified today against the Lista Moolah API,
DeFiLlama yields API, DeBank `complex_protocol_list`, and the on-chain
research repo (`github.com/draffilog/onchain-research`).

> The two-day-old snapshot was already stale on the gold side — XAUT
> subsidies have compressed sharply (see Gold section).

## Top-line numbers

| Metric | Value |
|---|---|
| V1 BSC DeFi TVL tracked | **$2.91B** |
| Asset classes covered | Stables · BTC · Gold · LSTs |
| Top realistic delta-neutral net APY | **~6.5%** |
| Top leveraged carry APY (slisBNB 3x, theoretical) | **~14%** |
| Wallets DeBank-verified for this report | **60+** |
| Lifetime Moolah liquidations | **1,555** |

---

## 1. Stablecoins

> **Largest, deepest, most replicable.** Two distinct opportunities:
> (1) plain supply at Aave / Venus / Lista for **1.7%–5.3%** with capacity in
> the hundreds of millions; (2) leveraged sUSDe carry on Lista — the BSC
> analog of "the Ethena method" / Sentora PYUSD-syrupUSDC loop on Ethereum
> — running at **~6–7% net at HR=1.02**.

### Top supply rates today (no leverage, no incentives)

| Asset | Venue | Supply APY | TVL | Notes |
|---|---|---:|---:|---|
| FDUSD | Venus Core | **5.30%** | $3.2M | Highest unboosted stable yield on BSC; 78% util |
| USDT | Aave V3 | 2.43% | $13.4M | Cheapest USDT borrow side too (3.09%) — best 2-sided venue |
| USDC | Venus Core | 2.30% | $29.3M | Largest non-USDT stable pool |
| DAI | Venus Core | 2.16% | $1.0M | — |
| USDT | Venus Core | 1.90% | $98.2M | Deepest USD pool on BSC |
| USDC | Aave V3 | 1.72% | $6.3M | — |
| lisUSD | Lista Saving | 1.55% | $21.3M | CDP zone savings vault |
| USDT | Lista Stable Pool | **4.71%** | $11.1M | Lista CDP zone — curated, higher than main vault |

### Strategy A — Leveraged sUSDe carry on Lista (the "Ethena method")

**Net APY:** ~6–8% at HR=1.02 · **Cap on Lista today:** ~$33M sUSDe collateralized (~97% of all sUSDe on BSC)

1. Hold or acquire USDe on BSC (contract `0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2`). Stake to sUSDe at Ethena UI.
2. On Lista Moolah, deposit sUSDe into one of the three live markets:
   - sUSDe → **USD1**: 97% util · **2.00%** borrow · $573K liquidity
   - sUSDe → **U**: 88% util · **2.00%** borrow · $1.05M liquidity
   - sUSDe → **USDT**: 68% util · **6.53%** borrow · $9K liquidity
   Spread across markets to reduce single-market squeeze risk.
3. Borrow up to ~91.5% LLTV. At HR=1.02 you reach ~10x effective leverage on the sUSDe yield-vs-borrow spread.
4. Convert borrowed stables back to USDe → stake → re-deposit. 3 loops ≈ 3x sUSDe exposure, 4–5 loops ≈ 5–8x.
5. Rotate borrow leg across USD1/U/USDT to spread liquidation cascade risk (this is what wallet `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` does — three identical loops in parallel).

**Cap-stop:** Lista vaults are 97–100% utilized on the Ethena side. New entrants compete for marginal liquidity from a $498M whale (`0xac3e216bd55860912062a4027a03b99587b7ffc7`) and HTX exchange (`0x18709e89bd403f470088abdacebe86cc60dda12e`) who supply 84% / 63% of the USD1 / U vaults respectively.

### Strategy B — USDT/USDC → USD1 stable rotation (subsidized)

**Net rate:** −0.65% (you get paid to borrow) · **Cap:** $1M–$2.5M per market

Supply USDT/USDC paired collateral, borrow USD1 at:
- **+1.57% native − 0.99% LISTA emission = +0.58% effective** on USD1 leg
- **USDT & USDC → U at −0.65% net** (you get paid)
- **U & USDT → U at −0.47% net** (also paid)

At 96.5% LLTV you collect LISTA tokens for borrowing.

**Stack with Strategy A:** borrow USD1/U at slight subsidy → swap to USDe → stake → re-supply. This is exactly what farmer `0x2604839110e921916c157b37d8e6790565db6d38` does on his stable-rotation leg ($208K USDT+USDC supply / $180K U borrow at HR=1.12).

**Constraint:** liquidity is thin on the highest-subsidy markets. Scaling beyond $5M dilutes the LISTA emission rate quickly.

### Borrower side — sUSDe loopers (junior tranche, the yield seekers)

DeBank-verified live positions, Apr 20 2026. Total sUSDe collateralized on Lista by these wallets ≈ **$33M** (~97% of all sUSDe on BSC).

| Wallet | Total $ | Live positions (supply / borrow / HR) | Risk |
|---|---:|---|---|
| `0x7fa9ae25d2666f142d2e974a0ba537056be18e9a` | $3.0M | Lista: **11.47M sUSDe → 12.62M USD1** (HR 1.019) + **1.93M sUSDe → 2.13M U** (HR 1.020). **LARGEST sUSDe looper on BSC.** | Max |
| `0x0ad500d23a43ae9b26a570cfb02b68c48a866565` | $7.8M | Lista: 5.79M sUSDe → 6.26M USD1 (HR 1.036). Single-market, but most equity behind the position. | Max |
| `0x298e013544c56aa8cd0ca7770b8680fa3bbe0d64` | $368K | Lista: 2.50M sUSDe → 2.79M U (HR **1.001**!) + 715K sUSDe → 800K USDT (HR **1.001**!). Razor-thin HR. | Extreme |
| `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` (Multi-Protocol) | $6.9M | 3× parallel sUSDe loops on Lista: 585K → 644K USD1 (HR 1.018), 501K → 551K USDT (HR 1.019), 388K → 426K U (HR 1.019). Textbook 3-market diversification. | Max |
| `0x2604839110e921916c157b37d8e6790565db6d38` (flagship) | $5.5M | Lista: 1.23M sUSDe → 1.35M U (HR 1.019) + the XAUt arb (Gold section) + $1.5M ETH on Venus. | Max + delta-neutral |
| `0xb70e998999707d1208a90699b5ea8f792c00b6f6` | $73K | Lista: 273K sUSDe → 306K USDT (HR 1.001) + 413K sUSDe → 462K U (HR 1.001). Smallest equity, highest leverage. | Extreme |
| `0xd998d01d1e94ce97ed18af4438797ebee305acba` | $572K | 3 sUSDe loops on Lista (USDT, U, USD1) totaling $476K supply, all HR 1.018–1.022, plus a wstUSR loop on Venus Flux at HR 0.15 (already underwater). | Max + 1 underwater |
| `0xa5cf6c0c8cd176c54e42b0ddeb708d09c6860f67` | $241K | Single position: 386K sUSDe → 424K USD1 on Lista (HR 1.019). Pure conviction loop. | Max |
| `0x14baf1087283e8797471dd5ffe3466428cceed03` | $215K | 2 sUSDe loops on Lista: 157K → 172K U (HR 1.022) + 175K → 192K USDT (HR 1.021). Same-size positions = manual deployment. | Max |

### Subsidized stable rotation farmers (USDT/USDC → U/USD1)

| Wallet | Total $ | Live positions |
|---|---:|---|
| `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963` | $360K | Lista: $920K USDT + $3.25M USDC → **$3.92M U** (HR 1.027). Cleanest large-scale stable-stable carry on BSC. Plus 16 XAUt + 1.2 BTCB sides. |
| `0x4099766c5976b80f757673eb2d83332e15e3a01a` | $2.2M | 11 simultaneous Lista positions including: $86K USDT + $303K USDC → $367K U (HR 1.022), $121K asUSDF → $115K USD1 (HR 1.022), $52K USDF → $47K USD1, plus XAUT both sides + slisBNB. |
| `0x21993c4e2b836ba5e5c7f599f790969479615d51` | $205K | Mini version of `0x4099`: $91K USDT + $323K USDC → $383K USD1 (HR 1.043) + slisBNB→WBNB short + XAUt→WBNB short + small Venus USDe. |
| `0x2604839110e921916c157b37d8e6790565db6d38` | $5.5M | $45K USDT + $162K USDC → $180K U (HR 1.116) — the "cash management" leg of the flagship multi-strategy stack. |

### Supply side — the senior tranche (where the borrowed liquidity comes from)

These five wallets together supply **~97% of the borrowable stable liquidity** on Lista Moolah. If any of them rotate out, sUSDe loopers face forced deleveraging.

| Wallet | Total $ (live) | What they supply | What they are |
|---|---:|---|---|
| `0xac3e216bd55860912062a4027a03b99587b7ffc7` | $494M | $119M USD1 in Lista USD1 Vault (84% of vault) + $176M WBNB/BNB in Lista BNB Vault + $43M Venus (USDT+WBNB+BTCB) | Single-wallet whale, BNB-Chain-only, BNB-ecosystem aligned. Unknown human/desk. |
| `0x18709e89bd403f470088abdacebe86cc60dda12e` | $1.55B | $43.7M U in Lista U Vault (63% of vault) + $4.4M WBNB Lista + $1M USD1 | HTX exchange wallet. Re-uses retail-deposited stables as on-chain lending balance sheet. |
| `0xc1b6f1908748f45ef94711a49d3c82d9cb5b082a` | $141M | $15M U in Lista U Vault + $26M U on Venus + $11.6M U on PancakeSwap V3 LPs | OTC/MM Safe multisig deployed 117 days ago. Sister of `0x5ae55c61e952bdbb69a57938b1df14b89279ecca`. |
| `0x5ae55c61e952bdbb69a57938b1df14b89279ecca` | $80M | $10.7M U+USDT in Lista vaults + $20M+ USDT/U LPs on PCS V3 | OTC/MM Safe multisig, sister of `0xc1b6f1908748f45ef94711a49d3c82d9cb5b082a`. Almost certainly same desk. |
| `0x2ec2e52d6700933fb4b6fda6b7ca71347f94226f` | $20M | $18M USD1 supplied to Lista USD1 Vault (#2 supplier, 12.7% of vault) | Single-protocol whale, idle USD1 in wallet for the rest. Likely WLFI-aligned. |
| `0x1d60bbbef79fb9540d271dbb01925380323a8f66` | $14.6M | $6.65M USDT in Lista USDT Vault (93% of vault) + $727K lisUSD/USDT in lisUSD Vault | Lista DAO treasury Safe — protocol funding its own lending market. |

---

## 2. Bitcoin (BTCB / SolvBTC / xSolvBTC / uniBTC)

> **Lowest unboosted yields, but the cheapest leverage on BSC.**
> BTC supply yield on BSC is structurally low (0.01% on Aave V3 to 0.21% on
> Venus) because demand to borrow BTC is small. The opportunity isn't
> supplying BTC for yield — it's using BTC as collateral to borrow stables
> at the cheapest rates on BSC, then deploying those stables into
> Strategy A / B above.

### Live BTC supply & borrow rates

| Asset | Venue | Supply APY | Borrow APY | TVL / liq | Notes |
|---|---|---:|---:|---:|---|
| BTCB | Venus Core | 0.21% | 1.19% | $337M | Largest BTC pool on BSC |
| BTCB | Aave V3 | 0.01% | 1.41% | $71M | Cheapest borrow when Venus is full |
| BTCB → U | Lista Moolah | — | **1.00%** | $13.8M liq | **Cheapest BTC-collateralized stable loan on BSC.** 25.5% util. |
| BTCB → USDT | Lista Moolah | — | 4.20% | $4.1M liq | Higher rate, more capacity |
| BTCB → lisUSD | Lista CDP | — | 4.35% | $1.9M | CDP route — mints lisUSD against BTCB |
| SolvBTC | Venus Core | 0.00% | 0.07% | $182M | Deposit-only. Effectively idle BTC LST exposure. |
| xSolvBTC | Venus Core | 0.00% | — | $64M | Yield-bearing variant of SolvBTC. No supply rate (yield is in token). |
| uniBTC PT (Jun26) | Pendle | 0.97% | — | $1.8M | Bedrock-issued BTC LST + points farming |

### Strategy — Leveraged long BTC + stable carry

**Net APY:** ~3–5% on equity + full BTC upside · **Cap:** $13.8M (Lista BTCB→U), $337M (Venus)

1. Bridge BTC to BSC as BTCB. Hold full BTC price exposure.
2. Supply BTCB as collateral on the Lista Moolah BTCB → U market (LLTV 86%, current liquidity **$13.8M**).
3. Borrow U (Aster's synthetic dollar) at **1.00% APR** — currently the cheapest stablecoin borrow on BSC.
4. Deploy borrowed U into Strategy A (sUSDe carry) or Strategy B (subsidized USDT & USDC → U short side). The Lista U Vault at 0.44% supply is too low — better to redeploy.
5. **Math at 50% LTV:** BTC price × (1 + 0.50 × (sUSDe net carry rate − 1.00%)). With sUSDe carry at ~6% net, you add ~2.5% to your BTC P&L; with the subsidized USDT/USDC short, you can squeeze **3–5% above plain BTC**.

**Risk:** BTC drawdown of more than the LLTV gap (14% to liquidation at 86% LLTV) triggers cascading liquidations on Moolah. The Apr 18 snapshot recorded 1,555 historical Moolah liquidation events; Oct 2025 alone had 635.

### Wallets currently running BTC strategies (live DeBank, Apr 20 2026)

Discovery method: top 100 BTCB token holders + top 50 SolvBTC + top 30 xSolvBTC on DeBank, then filtered for active DeFi positions (excluded CEX hot wallets, treasury contracts, and pure passive holders). Sample yielded ~10 wallets actually using BTC as collateral or in a yield position.

#### Tier 1 — BTCB-collateral → stable borrow (the canonical strategy)

| Wallet | Total $ | BTC collateral | Borrow leg(s) | HR | Notes |
|---|---:|---|---|---:|---|
| `0x9f5948c84d2567bd5ff9127ac14898334e66d002` | $13.5M | 173 BTCB on Lista (BTCB→USD1 main) + 7 BTCB on Lista (side) + 100 BTCB on Venus Flux. **Total ≈ 280 BTCB ($21M).** | $8.2M USD1 (Lista) + $200K USD1 (Lista) + $4.5M U (Venus Flux). Plus side: $4.5M U dry supply on Venus Flux + 26 XAUt → $50K USD1. | 1.36 / 1.83 / 1.46 | **Largest BTC borrow desk on BSC.** Splits across 3 venues for rate arbitrage. Two-asset borrow (U + USD1) reduces single-stable-depeg risk. |
| `0xf127f1e31aef9f2bd25b10e09baa606e38de62c4` | $11.5M | 104.6 BTCB on Venus Core ($7.83M). | 1,523 BNB ($950K) borrowed against BTCB. Effectively short BNB / long BTC at 12% LTV. | 6.59 | Conservative directional desk: long BTC vs. short BNB at very loose HR. Bets on BTC outperforming BNB while collecting BTC supply yield. |
| `0xccecc8286c615c0bdb96cd8062f059b0c7920088` | $12.7M | 60 BTCB on Venus Core ($4.49M). | 789 BNB + 1,699 ETH borrowed against ($7.66M USDC + $685K USDT + 60 BTCB) supply. | 2.39 | Macro desk: long BTC + USDC + XAUT, short BNB + ETH. Same wallet runs the 270-XAUT Gold position below. |
| `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963` | $360K | 1.2 BTCB on Lista ($89.7K). | $57K USD1 borrowed. Tiny single BTC leg next to a $4.17M USDT/USDC → U stable carry. | 1.35 | Side bet: BTC exposure at modest leverage inside a multi-strategy stable rotation portfolio. |
| `0xc2aaaecbc0ea098eef864b30e1f788a3342ad7de` | $37K | 0.20 + 0.16 BTCB on Lista ($26.9K combined). | Two parallel small USD1 borrows. | 1.29 | Smallest viable BTCB → USD1 template on Lista — proof the strategy works at $30K equity. |

#### Tier 2 — SolvBTC-collateral → USDT borrow (BTC-LST loop on Venus)

| Wallet | Total $ | BTC collateral | Borrow leg | HR | Notes |
|---|---:|---|---|---:|---|
| `0xcad8375d6fdfbb558121efe0f0d7b48f4caaeca3` | $6.0M | 63.0 SolvBTC on Venus Core ($4.71M) + 28.98 SolvBTC on Solv yield ($2.17M). **Net BTC exposure ≈ 92 SolvBTC ($6.87M).** | $2.0M USDT borrowed on Venus against SolvBTC. | ≈2.4 | **Largest single SolvBTC-as-collateral position on BSC.** Also the only wallet farming both Solv yield AND using same token as Venus collateral simultaneously — captures Solv emissions twice. |
| `0x1b073a07756db58cc1b1207cd30906917bcbdafb` | $7.2M | 76.57 SolvBTC on Solv yield ($5.72M) + 0.29 SolvBTC dust on Venus. | $5,986 USDT (token-fee, effectively no borrow). | — | Pure passive SolvBTC yield holder ($5.7M). Currently the **#2 SolvBTC holder on BSC** after the 2,368 SolvBTC whale `0xf841cb62c19fcd4ff5cd0aab5939f3140baac3ea` (Solv treasury). |

#### Tier 3 — Pure passive BTC yield (no borrow)

| Wallet | Total $ | BTC position | Strategy |
|---|---:|---|---|
| `0xdbef4873b4ea1e78b170fe63c093095bd52fa253` | $27.6M | 100 SolvBTC on Solv ($7.47M) + 50.76 SolvBTC on Solv ($3.79M) + 50 BTCB on PumpBTC ($3.74M). **Total $15.0M BTC, no debt.** | Yield-stack across two BTC-LST protocols (Solv + PumpBTC). No leverage. **Largest pure-yield BTC desk on BSC.** |
| `0x5117957a3de0c3117fab8153ac651b6e84b17736` | $6.9M | 30.02 BTCB on Venus Core ($2.25M). | Pure deposit, no borrow. Earning Venus's 0.21% supply APY — collateral parked for future borrow capacity. |
| `0xac3e216bd55860912062a4027a03b99587b7ffc7` | $494M | Lista BNB Vault: 5.11 SolvBTC ($381K) + 4.89 BTCB ($365K) + 1 BTCB ($75K). Venus: 10 BTCB ($748K). | The $494M whale's BTC bucket is ~$1.6M — a tiny side allocation vs. its $176M WBNB / $119M USD1 main books. Treasury-reserve behavior. |
| `0xe91eabe42d8517b4166aa602e31e0ec8cab18b4c` | $2.07M | 1.62 SolvBTC ($121K) on Solv + 0.022 PT-SolvBTC.BNB-26MAR2026 ($1.6K) on Magpie. | Only benchmark farmer holding any BTC LST. Side leg in a 17-protocol diversified BSC stack. |

#### Tier 4 — BTCB liquidity provider on PancakeSwap V3

| Wallet | Total $ | BTC LP positions | Strategy |
|---|---:|---|---|
| `0xb4378d4e3528c12c83821b21c99b43336a543613` | $8.5M | 3 separate PCS V3 LPs: 26.76 SolvBTC + 23.87 BTCB ($3.79M); 9.25 SolvBTC + 8.25 BTCB ($1.31M); 1.90 SolvBTC + 1.69 BTCB ($269K). **Total ≈ 71 BTC ($5.36M).** | BTCB/SolvBTC LP — captures the depeg spread + PCS swap fees. **Only meaningful BTC LP desk on BSC.** Not a borrow-and-loop strategy; pays no borrow rate. |

> **Census stats:** 100 inspected BTCB top-holders + 50 SolvBTC + 30 xSolvBTC top-holders on DeBank. ~85% are CEX hot wallets, treasury Safes, protocol contracts (e.g. Lista Moolah `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` holds 442 BTCB), or passive-only holders. Only ~10 wallets run an active BTC DeFi strategy. SolvBTC + xSolvBTC together hold $246M on Venus at 0% APY — that supply is collateral parked for borrowing capacity, not yield-seeking.

---

## 3. Gold (XAUT)

> **Subsidies have compressed in 48h — different opportunity now.**
> XAUT is the only meaningful gold-DeFi venue on BSC, and 100% of it is on
> Lista Moolah. The on-chain landscape changed sharply between Apr 18
> (snapshot) and today (Apr 20): the LISTA emission rate dropped, the vault
> grew to $2.78M, and several formerly-negative borrow rates flipped
> positive. The delta-neutral arb that drove 80 farmer wallets on Apr 18 is
> now nearly closed.

### Live XAUT vault (Apr 20, 2026)

| Metric | Value |
|---|---:|
| Lista XAUT Vault APY | **4.79%** |
| Vault TVL | $2.78M |
| Vault utilization | 76% |
| XAUT spot (oracle) | $4,795 |

### XAUT-as-collateral markets (you supply gold, borrow stables)

| Market | Util | Native rate | LISTA emission | **Net effective** | LLTV | Liquidity |
|---|---:|---:|---:|---:|---:|---:|
| XAUt → BNB | 11.2% | +0.16% | 1.34% | **−1.18%** | 72% | $2,749,523 |
| XAUt → USD1 | 89.8% | +0.68% | 1.08% | **−0.40%** | 77% | $98,164 |
| XAUt → USDT | 65.8% | +1.60% | 0.90% | +0.70% | 77% | $267,162 |
| XAUt → U | 92.7% | +1.25% | 0.74% | +0.52% | 77% | $98,791 |

> Two days ago these rates were −12% to −15%. Today only XAUt→BNB and XAUt→USD1 still pay you to borrow, and the size is tight. **The XAUt→BNB market is the only one with $2.7M of headroom.**

### XAUT-as-loan markets (other collateral, borrow gold) — now have liquidity!

| Market | Util | Borrow APY | LLTV | Liquidity |
|---|---:|---:|---:|---:|
| USD1 → XAUt | 0% | 0.10% | 80% | $327,564 |
| U → XAUt | 86% | 0.70% | 80% | $288,784 |
| BNB → XAUt | 87% | 1.19% | 72% | $30,645 |
| BTCB → XAUt | 91% | 1.66% | 75% | $5,275 |
| slisBNB → XAUt | 91% | 1.59% | 72% | $3,368 |

> On Apr 18 every XAUt-as-loan market was 100% utilized with $0 free. Today USD1 → XAUt has $327K and U → XAUt has $289K — the delta-neutral arb is partially open again, but the spread between sides is much smaller than it was last week.

### Strategy — Leveraged long gold (still works)

**Net APY:** ~5–7% on equity + full gold beta · **Cap:** $2.75M (XAUt→BNB market)

1. Buy XAUT on Binance spot, withdraw to BSC (still the only entry — DEX liquidity is ~$4.5K).
2. Deposit XAUT as collateral in the **XAUt → BNB** market on Lista Moolah (LLTV 72%, $2.75M of room).
3. Borrow BNB at **−1.18% net** (LISTA emissions still subsidize this market — you get paid to borrow).
4. Optionally swap BNB → slisBNB and supply at **4.66%** (LST stack on top of subsidized borrow). Or deposit BNB into Lista BNB Vault for 0.24% supply yield.
5. **Total = full gold price exposure + 1.18% paid to you for borrowing + 4.66% on the redeposited slisBNB ≈ 5–6% on top of gold spot.**

**Caveat:** the −1.18% subsidy on XAUt→BNB has fallen from −15% in 5 days. LISTA emission cuts can take it positive at any time.

### XAUT supply-side leveraged-long farmers (DeBank-verified Apr 20)

| Wallet | Total $ | Net XAUT | Live Lista positions | HR |
|---|---:|---:|---|---:|
| `0xccecc8286c615c0bdb96cd8062f059b0c7920088` | $12.7M | **+400** | 270 XAUt sitting liquid in vault + 80 XAUt → $220K USDT + 50 XAUt → 210 WBNB. **NEW whale, multi-market entry.** | 1.34 / 1.31 |
| `0x9f5948c84d2567bd5ff9127ac14898334e66d002` | $13.5M | +26 | 26 XAUt → $50K USD1 — small XAUT leg on top of their $13M BTC+stable book. | 1.91 |
| `0x102407f67415dcc4068370625ca27f24bb2a03d5` | $471K | +170 | Farmer #1: 2.6 XAUt → $8.5K USDT + 30.9 WBNB → 2.3 XAUt borrow. Plus $1.16M syrupUSDT/USDT loop on Venus Flux (HR 1.022). | 1.14 / 1.26 |
| `0x0fcc36d467b7d855f87e9912ecc926aeb3743ecb` | $228K | +121 | 121 XAUt → $350K USD1. Single clean leveraged-long template. | 1.27 |
| `0x4099766c5976b80f757673eb2d83332e15e3a01a` | $2.2M | +46 | Most complex: holds 29 XAUt liquid + supplies 22.9 XAUt → $64K USD1 (HR 1.31) + 39.9 XAUt → $111K USDT (HR 1.33) + 442 slisBNB → $184K USD1 + USDT/USDC → USD1 → also borrows 45.7 XAUt against $367K U. | 1.02–1.33 |
| `0x21993c4e2b836ba5e5c7f599f790969479615d51` | $205K | +48 | 46 XAUt → 162 WBNB (long-XAUT short-BNB, HR 1.56) + 2.1 XAUt → $5K USD1 + slisBNB→WBNB short + USDT&USDC → USD1 stable carry + small Venus USDe. | 1.04–1.56 |
| `0x14e9730bc59545de24966f0c6a7ea8115c32808a` | $345K | +20.5 | 20.5 XAUt → $50K USD1. Conservative single position. **Clean copyable template at the $300K tier.** | 1.51 |

### The XAUT delta-neutral arbitrage book (rare — both sides on Lista Moolah)

| Wallet | Total $ | XAUt sup → loan | Reverse: XAUt borrow against | Status |
|---|---:|---|---|---|
| `0x2604839110e921916c157b37d8e6790565db6d38` | $5.5M | 314.05 XAUt → 1.06M U (HR 1.093) | 2.59M U → 314.07 XAUt (HR 1.382) | **PERFECT 1:1 delta-neutral, $1.5M each side. Still live, still profitable.** |
| `0x024b944911e2d3664c8b3b5d2a038fef8f4ee010` | $465K | 22.3 XAUt liquid + 3 XAUt → $9K USDT + 1.3 XAUt borrowed against 30.7 slisBNB (reverse leg) | 399 WBNB → 24.01 XAUt (HR 1.56) | Cross-protocol multi-leg: Lista + Euler + Venus Flux. Net 0 XAUT. |
| `0xc9144683c0497b422ccfe9bcfba37855cc62c0b8` | $36K | (no XAUt supply) | 120 WBNB → 8.4 XAUt (HR 1.35) + $2.3K USDT/$8.3K USDC → $9.8K U (HR 1.04) | Pure XAUt borrower (formerly held supply, exited). Down 94% from $650K. |
| `0x624227ae1d072d03ae0361f6a71384dd92af80b4` | $88K | (formerly 20 sup) | (formerly 20 brw) | Position closed since Apr 18 — wallet now nearly empty. **Cautionary: the smallest delta-neutral template didn't survive the subsidy compression.** |

> **Full census:** 80 active XAUT wallets, 16 hidden delta-neutral, 4 pure borrowers (`xaut-bsc-gold-defi.md`, Dune query 7335606). 100% of farmer XAUT was withdrawn from the Binance hot wallet `0x8894e0a0c962cb723c1976a4421c95949be2d4e3` — confirms institutional-only entry path.

---

## 4. BNB Liquid Staking Tokens (slisBNB / asBNB)

> **Highest theoretical APY on BSC, real liquidation history.**
> Two LSTs hold ~98% of all staked BNB:
> - **slisBNB** (Lista, $591M, fully composable)
> - **asBNB** (Aster, $228M notional / $12M circulating, internal-only utility on Aster perp DEX)
>
> Native BNB staking sits around 2.5–3.5%; slisBNB pays **4.66% blended** (BNB staking + Binance Launchpool).

### Top-line LST numbers

| Metric | Value |
|---|---:|
| slisBNB passive APY | **4.66%** |
| BNB borrow @ Lista (vs slisBNB) | **1.00%** |
| 3x leverage loop (theoretical) | ~14% |
| Lifetime Moolah liquidations | 1,555 |

### Live LST market parameters (Lista UI / API, Apr 20 2026)

| Asset / market | Rate / APY | TVL or liq | Util / params |
|---|---|---:|---|
| slisBNB native staking (hold) | **4.66%** (3.98% Launchpool + 0.51% staking) | $620M | 1 slisBNB ≈ 1.0355 BNB exchange rate |
| slisBNB → BNB borrow (Moolah) | **1.00%** borrow APY | $197M liquidity | 13.3% util · LLTV 96.5% · 3–4% buffer at 3x |
| slisBNB → lisUSD borrow (Moolah) | 2.36% borrow | $11.5M liquidity | 57.6% util · LLTV 85% · CDP-style |
| slisBNB → USD1 borrow (Moolah) | 2.00% borrow | $4.4M liquidity | 53.5% util · leveraged long BNB |
| slisBNBx PT (Pendle Jun26) | **4.73% fixed APY** | $5.6M TVL | Lock until Jun 26, 2026 |
| asBNB → BNB borrow (Moolah) | 2.47% borrow | $13.8K liquidity | 90% util — not scalable yet |
| asBNB Venus deposit | 0.00% APY | $83M TVL | Deposit-only collateral; primary utility is Aster perp DEX |
| aBNBb / BNBx | Marginal | $14M / $2M | Legacy LSTs, mostly redeemed |

### Strategy A — slisBNB looping (3x leverage)

**Net APY:** ~13.9% · **Risk:** medium-high · **Cap:** $197M (Lista BNB liquidity)

**Math (47 BNB starting capital):**
- Loop 1: 47 BNB → ~45.4 slisBNB → borrow ~43.8 BNB at 1.00% (96.5% LLTV)
- Loop 2: 43.8 BNB → ~42.3 slisBNB → borrow ~40.8 BNB
- Loop 3: 40.8 BNB → ~39.4 slisBNB. **Total slisBNB exposure: ~174 BNB; total borrowed: ~127 BNB.**
- Gross yield: 4.66% × 174 = 8.11 BNB/yr. Borrow cost: 1.00% × 127 = 1.27 BNB/yr. **Net: 6.84 BNB/yr on 47 BNB equity = ~14.5% effective APY.**

**Risk reality (verified):** 30+ wallets historically tried this. Oct 2025 had 635 liquidations on Moolah; Nov 2025 saw 4.15M slisBNB seized. May 2025 flash depeg dropped slisBNB/BNB to 0.809 in one day. Currently **zero human wallets** sustain a slisBNB/BNB loop on DeBank — only bots. The loop is theoretically lucrative and historically lethal.

### Strategy B — slisBNB-collateralized stable borrow (the safer trade)

**Net APY:** ~5–7% on equity + BNB price exposure · **Cap:** $11.5M (lisUSD), $4.4M (USD1)

1. Stake BNB → slisBNB (4.66% base yield).
2. Supply slisBNB on Lista Moolah, borrow stablecoins:
   - slisBNB → **lisUSD at 2.36%** (85% LLTV)
   - slisBNB → **USD1 at 2.00%** (86% LLTV)
   - slisBNB → **USDT at 2.90%** (80% LLTV)
3. Deploy borrowed stables into sUSDe carry (Strategy A in Stablecoins) or simply hold as cash equivalent.
4. **Net effect:** keep full BNB price exposure + 4.66% staking yield + the spread between slisBNB's 4.66% and the stablecoin borrow rate (~2%). At 50% LTV, you add roughly 1–2% to base BNB yield and gain stablecoin liquidity.

> This is what 1,998 unique USDT borrowers do on Moolah (vs only 610 WBNB borrowers — looping is dominated by bots; humans borrow stables).

### BNB suppliers — the senior tranche (where the BNB liquidity sits)

| Wallet | Total $ | BNB-side position | Strategy |
|---|---:|---|---|
| `0xac3e216bd55860912062a4027a03b99587b7ffc7` | $494M | 243,728 WBNB ($152M) in Lista BNB Vault + 38,095 BNB ($23.8M) staked + 3,971 BNB ($2.5M) liquid + 20,072 WBNB ($12.5M) on Venus | Pure passive BNB supply. The $498M whale earns ~0.24% APY on the Lista BNB Vault deposit. **Largest single BNB lender on BSC.** |
| `0x18709e89bd403f470088abdacebe86cc60dda12e` | $1.55B | 7,003 WBNB ($4.4M) in Lista BNB Vault | HTX exchange — BNB is a side-position vs. the dominant U vault deposit ($43.7M). |

### slisBNB-collateralized borrowers — junior tranche, conservative HR

Live DeBank, Apr 20 2026. These wallets all run the safer Strategy B (borrow stables against slisBNB) — not the lethal slisBNB→BNB loop. HRs sit at 1.4–5.5, much higher than the sUSDe loopers' 1.02.

| Wallet | Total $ | slisBNB sup | Borrow leg | HR |
|---|---:|---:|---|---:|
| `0x7e8eaf65ec69de635bede717fb215a296b51b50b` | $1.07M | 1,792 | $619K USDT + $15K USD1 (against 1,745 slisBNB main + 47 slisBNB side) | 1.57 / 1.70 |
| `0x453fff37e5e0492c89058884dc666cefa059e93b` | $464K | 904 | 4 separate positions: 24.5 slisBNB → 2.3K USDT (HR 5.5), 365 slisBNB → 96K U (HR 2.1), 176 slisBNB → 41K USD1 (HR 1.97), 339 slisBNB → 110K U (HR 1.71). Plus 104 BNB liquid. | 1.71–5.51 |
| `0x4099766c5976b80f757673eb2d83332e15e3a01a` | $2.2M | 442 | 442 slisBNB → $184K USD1 (HR 1.34) — one leg of an 11-position multi-strategy wallet. | 1.34 |
| `0xe91eabe42d8517b4166aa602e31e0ec8cab18b4c` | $2.07M | 200 | 200 slisBNB → $80K USD1 (HR 1.39). Plus 2,492 BNB liquid + Magpie 466 BNB + 62 PT-clisBNB-25JUN2026 + 1.62 SolvBTC. | 1.39 |
| `0x21993c4e2b836ba5e5c7f599f790969479615d51` | $205K | 160 | 160 slisBNB → 152 WBNB borrow (HR 1.05) — **one of the few wallets actually running the slisBNB→BNB loop.** Combined with XAUt and stable rotation. | 1.05 |
| `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` | $6.9M | 22 | 22 slisBNB → $7.3K U (HR 1.69) — small experimental leg next to their three sUSDe loops. | 1.69 |
| `0x6cccb5ffaad0fa063b744839c636079ef3bf0e00` | $29K | 44 | 44 slisBNB → $15K USDT (HR 1.53). **Smallest viable template — works at sub-$30K equity.** | 1.53 |

### The slisBNB loop graveyard — wallets that didn't survive

Cross-referencing Apr 17–18 Dune borrower lists with Apr 20 DeBank shows this pattern: **every wallet that ran a max-leverage slisBNB→BNB loop has been liquidated to $0.** Bots replaced humans on this strategy after the May 2025 / Oct 2025 / Nov 2025 cascades.

| Wallet | Apr 17 Dune snapshot | Apr 20 DeBank | Outcome |
|---|---|---|---|
| `0x87a8ff8ad993c10af4ad85b62ddb50b4968abc93` | 150,733 slisBNB sup → 350,277 WBNB borrowed + $13.4M USDT borrow | $0 total balance, 0 protocols | **Largest classified `BNB_BORROWER` — wiped out.** |
| `0xde2f39e895e41d08585f5559c216b362cdeb34ef` | 786,000 slisBNB sup (largest `Supply Only` on Dune) | $0 total balance, 0 protocols | Massive supply position vanished — likely liquidated cascade. |
| `0x33f7a980a246f9b8fea2254e3065576e127d4d5f` | 152,185 slisBNB sup | $0 total balance, 0 protocols | Same outcome — $0. |
| `0xab300be61089b883882bbff82106c01bff0f54a9` | 1,985 slisBNB sup → 2,042 WBNB borrowed (the only `BNB Looper` Dune classified) | $0 total balance, 0 protocols | **Picture-perfect 3x slisBNB loop, now liquidated.** |

> **Liquidation forensics** (Dune query 7332010): top 2 liquidated borrowers on Lista Moolah are bots `0x5dbf56810f0c07e68c2dd8214408074148541d24` (113 liquidations, 1.98M units seized) and `0x50de1aa50ff7f5b067e9bdfb317d113c8c0d3da8` (42 liquidations, 1.92M seized). The pattern is consistent: bots farm the liquidation bonus from human loopers who get squeezed when slisBNB depegs against BNB.

---

## 5. Cross-strategy operators — wallets to track across all 4 asset classes

When the same wallets keep appearing across uncorrelated markets, they're professional multi-strategy desks. Watching what they enter and exit is the highest-signal way to spot the next yield opportunity before it's documented anywhere. All numbers below are DeBank-verified Apr 20, 2026.

| Wallet | Total $ | BSC $ | Active strategies (asset classes touched) |
|---|---:|---:|---|
| `0x2604839110e921916c157b37d8e6790565db6d38` (flagship) | $5.49M | $5.49M | Stables (sUSDe→U $1.5M HR 1.02 + USDT/USDC→U $208K HR 1.12) · Gold (314 XAUt both-sides arb $1.5M each, HR 1.09 / 1.38) · BTC (idle reserve) · plus 647 ETH on Venus. **5 protocols, 4 asset classes.** |
| `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` (Multi-Protocol) | $6.87M | $240K | Stables (3× sUSDe loops $585K+501K+388K all HR 1.02) · LSTs (22 slisBNB→U) · Gold (9.92 XAUt liquid). Most leveraged sUSDe operator outside the top-3 by collateral. |
| `0x4099766c5976b80f757673eb2d83332e15e3a01a` (Lista 11-position) | $2.23M | $635K | Gold (3 XAUt supply markets + 1 reverse XAUt borrow against $367K U) · Stables (USDT&USDC→U + asUSDF→USD1 + USDF→USD1) · LSTs (442 slisBNB→USD1). Most operationally complex single-wallet on Lista. |
| `0x9f5948c84d2567bd5ff9127ac14898334e66d002` | $13.5M | $13.5M | BTC (3 BTCB loans across Lista + Venus Flux totaling 280 BTCB) · Stables (USDT+USDC supply $8M / $7.2M USD1 borrow + $4.5M U pure supply) · Gold (26 XAUt side bet). **Largest BTC borrow operator.** |
| `0xccecc8286c615c0bdb96cd8062f059b0c7920088` | $12.7M | $12.7M | BTC (60 BTCB long on Venus) · Gold (400 XAUt across 3 markets) · Stables ($7.7M USDC + $685K USDT + $600K USDC supply) · LSTs (short 789 BNB on Venus). 8 protocols. |
| `0x21993c4e2b836ba5e5c7f599f790969479615d51` | $205K | $205K | **Replicable mid-tier multi-strategy template:** Stables ($91K USDT+$323K USDC→USD1) · Gold (46 XAUt→WBNB short + 2.1 XAUt→USD1) · LSTs (160 slisBNB→WBNB short loop) · Venus USDe. 12 protocols at $205K. |
| `0x024b944911e2d3664c8b3b5d2a038fef8f4ee010` | $465K | $314K | Cross-protocol delta-neutral: Lista + Euler + Venus Flux. 5 separate XAUt legs (both sides). 24 protocols total — proves the diversified template scales to the small-whale tier. |

> **Live tracking:** `benchmark-farmers.yaml` + `scripts/watch-farmers.sh` in this repo dump weekly diffs of these wallets' positions. Also new since Apr 18: ~$1.7M of fresh ETH supply on Venus by the flagship `0x2604`, and `0x9f5948` rotating into Venus Flux for $4.5M of dry U supply.

---

## 6. Risks to flag to anyone considering these strategies

| Risk | What it means in numbers |
|---|---|
| **Subsidy decay** | Every negative-rate market in this report depends on LISTA token emissions. The XAUT example shows how fast this changes: rates compressed from −15% to near zero in 5 days. Treat every subsidized number as point-in-time. |
| **Concentration / squeeze** | Five wallets supply ~97% of stable lending liquidity on Lista ($210M of $215M). If `0xac3e216bd55860912062a4027a03b99587b7ffc7` ($498M whale) or HTX exit, borrow rates spike and sUSDe loopers face forced deleveraging. PancakeSwap depth on sUSDe is thin — depeg risk cascades fast. |
| **Health rate at 1.02** | Most flagship farmers run HR=1.02 on stable-stable carries — a 2% adverse move triggers liquidation. With Moolah's Morpho-Blue mechanics, liquidation transfers your collateral to the liquidator (not back to you). This is why DeBank shows $0 for many "active" Dune positions — they got seized. |
| **Market liquidity caps** | Largest single carry market with deep liquidity: **slisBNB → BNB at $197M**. After that, capacity drops fast: BTCB → U $13.8M, sUSDe → U $1M, XAUT-as-loan markets $5K–$330K. **Beyond ~$5M deployment you're moving the market against yourself.** |

---

## 7. Strategy summary card (TL;DR for presentation)

| Asset | Strategy | Net APY | Cap (size you can deploy) | Risk |
|---|---|---:|---:|---|
| Stables | Plain Venus FDUSD supply | **5.30%** | $3.2M | Low |
| Stables | Plain Lista USDT Stable Pool | **4.71%** | $11.1M | Low |
| Stables | Aave V3 USDT supply | 2.43% | $13.4M | Low |
| Stables | sUSDe → USD1 / U / USDT loop on Lista (Strategy A) | **6–8% net at HR=1.02** | ~$33M total cap (highly contested) | High — HR 1.02, contested liquidity |
| Stables | USDT/USDC → U/USD1 subsidized rotation (Strategy B) | **−0.65% effective borrow** (you get paid) | $1M–$2.5M per market | Med — subsidy decay |
| BTC | Venus BTCB pure supply | 0.21% | $337M | Very Low |
| BTC | BTCB → U on Lista (cheapest BTC-stable borrow on BSC) | **1.00% borrow** | $13.8M liq | Med — 86% LLTV |
| BTC | Leveraged long BTC + redeploy at sUSDe carry | **+3–5% above BTC spot** | $13.8M | Med-High |
| BTC | SolvBTC pure yield on Solv / PumpBTC | embedded LST yield | $246M Venus + Solv | Low — passive |
| Gold | XAUT vault supply (Lista) | **4.79%** | $2.78M | Low — single-protocol |
| Gold | XAUt → BNB at −1.18% net (subsidized leveraged long gold) | **5–6% above gold spot** | $2.75M | Med — subsidy decay |
| Gold | XAUT delta-neutral (both sides on Lista Moolah) | ~6.5% on equity (compressed) | < $1M total live | Med-High — closing window |
| LSTs | slisBNB native staking | **4.66%** | $620M | Very Low |
| LSTs | slisBNB → stable borrow (Strategy B) | **5–7% on equity + BNB beta** | $11.5M–$197M | Low-Med |
| LSTs | slisBNB → BNB 3x leverage loop (Strategy A) | **~14% theoretical** | $197M | **Lethal** — every human wallet liquidated; bots only |
| LSTs | slisBNBx PT on Pendle (Jun26) | **4.73% fixed** | $5.6M | Low — locked until Jun 26 |

---

## Sources & verification (today, Apr 20 2026)

- **Live wallet positions:** DeBank Pro `complex_protocol_list` & `total_balance` for **60+ wallets** (26 from sUSDe/XAUT/slisBNB Dune queries + 15 benchmark farmers + 31 BTCB/SolvBTC top-holders newly inspected today).
- **Live market rates:** Lista Moolah API (`api.lista.org/api/moolah/borrow/markets` + `vault/info?address=…`) + DeFiLlama yields API (`yields.llama.fi/pools`).
- **Wallet discovery (Dune, Apr 17–18 snapshots):**
  - Query `7335789` — top 30 sUSDe collateralizers
  - Query `7335574` — top 25 XAUT holders
  - Query `7331504` + `7331658` — slisBNB borrowers + cross-protocol loopers (19 + 50 rows)
  - Query `7335781` + `7335782` — Lista USD1/U/USDT vault depositors
  - Query `7332010` — top 30 liquidated borrowers
  - Query `7335606` — full XAUT census (105 wallets)
- **BTC discovery (DeBank token/top_holders, today):** top 100 BTCB + top 50 SolvBTC + top 30 xSolvBTC.
- **Research base in this repo:**
  - `snapshots/2026-04-18.md` — V1 BSC DeFi baseline
  - `xaut-bsc-gold-defi.md` — full 105-wallet XAUT census
  - `lista-ethena-selflending-bsc.md` — Ethena method on BSC, vault depositor identification
  - `bnb-lst-market.md` — slisBNB liquidation forensics
  - `benchmark-farmers.md` + `benchmark-farmers.yaml` — operator profiles
  - `sessions/debank-2026-04-20-batch{1,2}.json` + `sessions/debank-2026-04-20-btc-batch{1,2}.json` — raw DeBank dumps
  - `sessions/wallets-2026-04-20.txt` + `sessions/btc-wallets-batch{1,2}-2026-04-20.txt` — discovery lists

---

*Generated as a presentation deck for the BSC DeFi conference, Apr 20 2026. Numbers shift daily — re-run `scripts/watch-farmers.sh` and re-query the Lista API before deploying capital.*
