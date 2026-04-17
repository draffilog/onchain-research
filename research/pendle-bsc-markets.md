# Pendle Finance on BSC — Market & User Analysis

**Research Date:** April 17-18, 2026
**Data Sources:** Pendle V2 API, Dune Analytics, DeBank Pro API
**Methodology:** Pendle API → market discovery → Dune for holder analysis → DeBank for wallet profiling

---

## Market Overview

Pendle Finance on BSC has **35 total markets** but only **4 are still active** (not expired). Total TVL across all markets: **$205.8M**, but the majority sits in expired markets where users haven't redeemed.

### Top 10 Markets by TVL

| # | Market | TVL | Status | Expiry | Implied APY | Underlying APY | Category |
|---|--------|-----|--------|--------|-------------|----------------|----------|
| 1 | SolvBTC.BNB | $72,749,017 | EXPIRED | 2025-12-18 | 0.00% | 4.08% | BTC, Points |
| 2 | USDe | $60,087,198 | EXPIRED | 2025-10-30 | 0.00% | 0.00% | Ethena, Stables |
| 3 | satUSD+ | $30,207,560 | EXPIRED | 2025-12-18 | 0.00% | 0.00% | Stables, Points |
| 4 | slisBNBx (Oct25) | $20,315,540 | EXPIRED | 2025-10-30 | 0.00% | 11.49% | BNB LST |
| 5 | **slisBNBx (Jun26)** | **$8,324,549** | **ACTIVE** | 2026-06-25 | **3.06%** | **4.63%** | BNB LST |
| 6 | sigmaSP | $4,101,394 | EXPIRED | 2025-09-25 | 0.00% | 0.00% | Stables, Points |
| 7 | **uniBTC (Jun26)** | **$1,799,395** | **ACTIVE** | 2026-06-25 | **0.97%** | 0.00% | BTC, Points |
| 8 | satUSD+ (Mar26) | $1,635,526 | EXPIRED | 2026-03-26 | 0.00% | 0.00% | Stables, Points |
| 9 | uniBTC (Dec25) | $1,342,436 | EXPIRED | 2025-12-18 | 0.00% | 0.00% | BTC, Points |
| 10 | ynBNBx | $989,126 | EXPIRED | 2025-10-16 | 0.00% | 27.64% | BNB LST |

**Source:** Pendle V2 API (`/v2/markets/all?chainId=56`), April 18 2026

### Active Markets Only

Only 4 markets are currently tradeable:

| Market | TVL | Implied APY | Underlying APY | Expiry |
|--------|-----|-------------|----------------|--------|
| slisBNBx (Jun26) | $8,324,549 | 3.06% | 4.63% | 2026-06-25 |
| uniBTC (Jun26) | $1,799,395 | 0.97% | 0.00% | 2026-06-25 |
| sUSDu | $442,355 | 14.00% | 10.27% | 2026-04-23 |
| cUSDO | $63,191 | 3.11% | 3.30% | 2026-10-29 |

---

## Contract Addresses (Top 10 Markets)

### 1. SolvBTC.BNB (Dec 2025) — $72.7M TVL
- Market: 0x527be6fa23ff71e3faf5c2c1511b0531b67a701d
- PT: 0xee61a49a180cd23c3e629c5a70c1ee6539c004bd
- YT: 0xa23e43ff30b6bb9972a6c6617a9aebad34adca3f
- SY: 0x58b4441b97c577b66e46aa155e04dc4652fd0d34
- Underlying: 0x6c948a4c31d013515d871930fe3807276102f25d

### 2. USDe (Oct 2025) — $60.1M TVL
- Market: 0xb5b56637810e4d090894785993f4cdd6875d927e
- PT: 0x607c834cfb7fcbbb341cbe23f77a6e83bcf3f55c
- YT: 0x35c4668db919ded034f047526765544a92a4da09
- SY: 0x5719acdb9abbbc6ba414c9dbff5b2967342f465d
- Underlying: 0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34

### 3. satUSD+ (Dec 2025) — $30.2M TVL
- Market: 0xdb69ed950cbe21baaec158506c090f6d945a163a
- PT: 0x31e88bf4ac49eef6711756d141f1a63e78f9f665
- YT: 0x8023e1196e8988a9eb9b0f45cd4fce40307b41c8
- SY: 0x193b2f36957f7e9e498758bbf182273bc145bb92
- Underlying: 0x03d9c4e4bc5d3678a9076cac50db0251d8676872

### 4. slisBNBx (Oct 2025) — $20.3M TVL
- Market: 0xbd577ddabb5a1672d3c786726b87a175de652b96
- PT: 0xb84cec1ab2af11b530ae0d8594b1493556be49cd
- YT: 0xbe436f6ed7ff7f747aae1912f88c59549df82158
- SY: 0x27faf900007b4cba7803000251ec96bc69ff1bea
- Underlying: 0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b (slisBNB)

### 5. slisBNBx (Jun 2026) — $8.3M TVL (ACTIVE)
- Market: 0x3c1a3d6b69a866444fe506f7d38a00a1c2d859c5
- PT: 0xe052823b4aefc6e230faf46231a57d0905e30ae0
- YT: 0xc08e81a01cfdcf0e68ebc0441c9bb8cce36aa25c
- SY: 0x27faf900007b4cba7803000251ec96bc69ff1bea
- Underlying: 0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b (slisBNB)

### 6. sigmaSP (Sep 2025) — $4.1M TVL
- Market: 0x9edac81bac78a2c06b59514d6eb62dd7a57adf21
- PT: 0xd76ec0a96eaffe1cca33313352deda1cd3cfa7ee
- YT: 0x365e24398c0c0f03ab1c5423d3e665ede408198d
- SY: 0x30ccf4bbee313fcd19f3e295b3ba2920a24e2f62
- Underlying: 0x2b9c1f280fcc1c5dc28f4e1fa11f1c36c0e7f4aa

### 7. uniBTC (Jun 2026) — $1.8M TVL (ACTIVE)
- Market: 0x21558067e3ed5d3cdbe2dd3662bd9035a8e3315a
- PT: 0x0af2b242a526447fefd6e29cd531ecb89616afd2
- YT: 0xb36863b33d021fbbc88e81bd9d372e4ebbb38d2a
- SY: 0xe10b8c2b029c3369f7a910710ed4fa2b25059674
- Underlying: 0x53176cadd446700fa6b89f840357ac586d7e33db

### 8. satUSD+ (Mar 2026) — $1.6M TVL
- Market: 0xbad43138c9bf4f546c1d326f30963084a1e40c2e
- PT: 0x6e3e626f8741cd0e48ba1367b35be5622b426ea0
- YT: 0xe38e5316d350c3f149b9b8738bad0cb7ecacd341
- SY: 0x193b2f36957f7e9e498758bbf182273bc145bb92
- Underlying: 0x03d9c4e4bc5d3678a9076cac50db0251d8676872

### 9. uniBTC (Dec 2025) — $1.3M TVL
- Market: 0xe4bb20d7fc50b5633896f5ea9a17758e8bc82eaf
- PT: 0xd5cee155593f7a5da4db3181e8af6a37e73f6c8f
- YT: 0x435cf5ca8394e553e56d5bb334a5cd14243b6dcc
- SY: 0x09f317b127bcc9d16f5dd17cadbeda9d034c0f8c
- Underlying: 0x6b2a01a5f79deb4c2f3c0eda7b01df456fbd726a

### 10. ynBNBx (Oct 2025) — $989K TVL
- Market: 0x7608eb2fc533343556e443511a2747f605e49c9b
- PT: 0x50956c8e46a4f7dfc7475e3957c162d29b39f75f
- YT: 0x6a665855c2b98c8ab71a58e4b97cd3653ee591db
- SY: 0xfec0d38a9c16d4e1280d984f2b5d674670159bf4
- Underlying: 0x32c830f5c34122c6afb8ae87aba541b7900a2c5f

---

## Cross-Market Wallet Activity (Dune, 180 days)

50 wallets found active in 2+ Pendle BSC markets. Key findings:

### Most Active Wallets (by market count)

| Wallet | Markets | Token Types | Classification |
|--------|---------|-------------|----------------|
| 0x888888888889758f76e7103c6cbf23abbf58f946 | 8 | PT, YT | **Pendle Router** (protocol contract, $67 portfolio) |
| 0x28e2ea090877bf75740558f6bfb36a5ffee9e9df | 7 | LP, PT | **BSC DeFi Mega-whale** ($18.4M, 50+ protocols) |
| 0x8ccca92b80aecf9e330f9ab883a14bccd216c1a7 | 6 | LP, PT, YT | Bot/empty wallet ($9.5) |
| 0x22fc5a29bd3d6cce19a06f844019fd506fce4455 | 6 | LP, YT | Small DeFi user ($177) |
| 0x622bd232481e51d4cfab990a911d43b3ef709cc2 | 5 | LP, YT | Small DeFi user ($215) |
| 0x869191325254a82fbc858ab3cad9bf91703da353 | 5 | LP | LP Provider, multi-protocol ($16K+) |
| 0xc34ae1a39662415a4720d4a3e7c2be0e202568c2 | 5 | YT | **YT Speculator** (multiple large YT positions) |
| 0x72437d6dbe18574526fb7d7853a1adbbaa81ccc3 | 4 | LP, PT, YT | Solv BTC holder ($2.9K) |
| 0xc44481bbe32ed16832a47127cf2009f121d229b2 | 4 | LP, PT, YT | All 3 token types across 4 markets |
| 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c | 4 | PT | **Lista Moolah Controller** (accepts PTs as collateral) |

**Source:** Dune query 7334294 + DeBank Pro API

### Key Observation: Lista Moolah accepts Pendle PTs as collateral
The Lista Moolah Controller (`0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c`) holds PT positions in 4 markets (USDe-Oct25, satUSD+-Dec25, slisBNBx-Jun26, slisBNBx-Oct25). This means **Pendle PTs can be used as collateral on Lista Moolah** — an important DeFi composability finding.

---

## Top PT Holders (Fixed Yield Seekers)

Top holders of Principal Tokens across all 10 markets. PT holders lock in a fixed yield until expiry.

### slisBNBx-Jun26 (Active, $8.3M TVL) — Most Distributed
| Rank | Wallet | Balance (BNB eq.) |
|------|--------|------------------|
| 1 | 0x3c1a3d6b69a866444fe506f7d38a00a1c2d859c5 (Market LP pool) | 1,179 |
| 2 | 0x6d3bd68e90b42615cb5abf4b8de92b154adc435e | 666 |
| 3 | 0x3b7e10ffe65c5a59475055d489f71699f7dabff4 | 516 |
| 4 | 0x813a3005b071791b98292c74cc0700239c52db25 | 437 |
| 5 | 0xa4479e6367b3d582bf08bd06de87cf40c5a33b45 | 225 |

### USDe-Oct25 (Expired, $60M TVL) — Heavily Concentrated
| Rank | Wallet | Balance (USD eq.) |
|------|--------|------------------|
| 1 | 0xb5b56637810e4d090894785993f4cdd6875d927e (Market LP pool) | $93,639 |
| 2 | 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c (Moolah Controller) | $339 |

---

## Top YT Holders (Yield Speculators)

YT holders are speculating on future yield — they profit if actual yield exceeds implied yield.

### Biggest YT Positions (by token count)

| Market | Top Holder | YT Balance | Portfolio |
|--------|-----------|------------|-----------|
| YT-USDe-Oct25 | 0xcd812016b15e1937e281b7b7b1f1654e54cc0818 | 15,634,101 | TBD |
| YT-satUSD+-Dec25 | 0xb71f5229ce8366b72d988447fb491e87ec712ca1 | 7,692,738 | TBD |
| YT-slisBNBx-Oct25 | 0xc34ae1a39662415a4720d4a3e7c2be0e202568c2 | 6,163 BNB eq. | TBD |
| YT-sigmaSP-Sep25 | 0x4b480afbd32a5af07aaeebffc4a133075921cc73 | 1,200,531 | TBD |
| YT-slisBNBx-Jun26 | 0x04cf1309ed163ceaf8ceded40b5f8429748a1882 | 884 BNB eq. | TBD |

---

## Top LP Providers

LP providers earn swap fees + underlying yield from Pendle markets.

### slisBNBx-Jun26 (Active Market) — Top LPs
| Rank | Wallet | LP Balance |
|------|--------|-----------|
| 1 | 0x782d9d67feaa4d1cdf8222d9053c8cba1c3b7982 | 1,387 |
| 2 | 0x64627901dadb46ed7f275fd4fc87d086cff1e6e3 | 625 |
| 3 | 0x43ea46f06e272c4e64dc153f41f8cb53e795b670 | 589 |
| 4 | 0x38e481367e0c50f4166ad2a1c9fde0e3c662cfba | 332 |

---

## Wallet Deep Dives (DeBank Verified)

### 0x28e2ea090877bf75740558f6bfb36a5ffee9e9df — BSC DeFi Mega-whale
- **Portfolio:** $18.4M (almost entirely on BSC)
- **Pendle BSC:** Active in 7/10 top markets (LP + PT across slisBNBx, satUSD+, SolvBTC, uniBTC)
- **Other protocols:** 50+ including Lista DAO ($3.5K), Venus ($6.2K), Beefy ($2.6K), PancakeSwap ($4.3K), Solv ($1.6K), Aster ($1.8K), BounceBit, Stargate, Alpaca, Kinza, etc.
- **Strategy:** Extreme diversification across every major BSC protocol. Uses Pendle for LP positions (earning swap fees on multiple markets) and PT (fixed yield on satUSD+, slisBNBx). Also has 123 PancakeSwap positions and 62 Beefy vaults. This is a "farm everything" approach.
- **Risk:** Very Low (no borrowing detected, pure supply/LP across dozens of protocols)

### 0x869191325254a82fbc858ab3cad9bf91703da353 — Multi-protocol LP Provider
- **Portfolio:** $16K+ on BSC
- **Pendle BSC:** LP-only across 5 markets (SolvBTC, USDe, slisBNBx Jun26+Oct25, uniBTC)
- **Other protocols:** Lista DAO ($1.3K, slisBNB stake), Solv ($1.8K, SolvBTC), Magpie XYZ ($608), TRANCHESS V2 ($1.3K), SquadSwap ($11.7K)
- **Strategy:** Focused LP provider using Pendle + TRANCHESS for BNB staking yield. Uses Solv for BTC exposure. Also active in SquadSwap DEX farming.

### 0xc34ae1a39662415a4720d4a3e7c2be0e202568c2 — YT Speculator
- **Pendle activity:** YT-only across 5 markets (SolvBTC, USDe, satUSD+-Dec25, satUSD+-Mar26, slisBNBx-Oct25)
- **Largest position:** 6,163 YT-slisBNBx-Oct25 (speculating BNB staking yield exceeds 11.49%)
- **Strategy:** Pure yield speculation — buys YT tokens to bet on actual yield exceeding implied APY

---

## Dune Query IDs

| ID | Name | Purpose |
|----|------|---------|
| 7334275 | Top PT holders across top 10 markets | PT holder analysis |
| 7334281 | Top YT holders across top 10 markets | YT speculator identification |
| 7334287 | Top LP holders across top 10 markets | LP provider analysis |
| 7334294 | Cross-market wallet activity summary | Multi-market user identification |

---

## Key Insights

1. **Pendle BSC is dominated by expired markets.** $163M of $205M TVL (79%) sits in expired markets. Users either forgot to redeem or are waiting for specific conditions.

2. **slisBNBx is the flagship active market.** The slisBNBx-Jun26 market ($8.3M) is the largest active market by far, confirming slisBNB's dominance in BNB LST DeFi.

3. **Lista Moolah accepts Pendle PTs as collateral.** This creates a powerful DeFi composability loop: stake BNB → get slisBNB → buy PT-slisBNBx on Pendle (fixed yield) → deposit PT as collateral on Moolah → borrow against it.

4. **YT speculation is massive in stablecoin markets.** The USDe and satUSD+ markets have tens of millions of YT tokens held by speculators betting on yield.

5. **Cross-market activity is concentrated.** Only 50 wallets are active in 2+ markets, suggesting Pendle BSC has a small but sophisticated user base.

6. **The biggest Pendle BSC user is a $18.4M whale** (0x28e2ea090877bf75740558f6bfb36a5ffee9e9df) who diversifies across 50+ protocols — Pendle is just one piece of a massive BSC DeFi portfolio.
