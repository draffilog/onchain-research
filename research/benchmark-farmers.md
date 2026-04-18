---
title: Benchmark DeFi Farmers — multi-strategy operators worth tracking
topic: Farmer archetypes
chain: BSC
verified: 2026-04-18
tags: [farmers, benchmarks, lista-dao, delta-neutral, multi-strategy, xaut, defi-archetypes]
---

# Benchmark DeFi Farmers on BSC

> **Why this file exists**: When researching any new BSC DeFi vertical (LST looping, gold farming, RWA strategies, stable arb), the same handful of wallets keep showing up across multiple uncorrelated markets. They are professional multi-strategy operators, and tracking what they do is the highest-signal way to discover new yield strategies before they're documented anywhere.
>
> Use this file as a benchmark roster. When a new farmer appears in our XAUT / slisBNB / sUSDe / etc. research, compare their playbook against these archetypes — and add them here if they fit.

## Archetype: The Multi-Strategy Operator

Defining traits (all must be true):

1. **Multiple simultaneous positions in the same protocol** (3+ open lending markets)
2. **Tight health rates** (1.02–1.05 on stablecoin-backed positions, 1.20–1.40 on volatile collateral)
3. **3–5x leverage** across the whole DeFi book
4. **Asset diversification across categories**: stables (sUSDe / USDT / USDC / USD1 / U / USDF), gold (XAUt), BNB-class (WBNB / slisBNB), BTC (BTCB), ETH
5. **Cross-protocol orchestration** (Lista + Venus + Venus Flux + Euler + Pendle + Thena, etc.)
6. **Both directions of an asset** (e.g., supplies XAUt in one market AND borrows XAUt in another → "delta-neutral rate arb")
7. **Wallet age + tx count** suggest experienced operator, not retail one-off (sub-criterion: hold LISTA / VENUS reward tokens earned from farming)

If a wallet hits 5+ of these traits and runs ≥ $100K total notional, add it here.

## Discovery method (how we found these)

Standard pattern that works for BSC:

1. Pick a niche asset (XAUt, asBNB, sUSDe, etc.)
2. Dune-query every wallet that ever transferred that asset to/from the relevant protocol contracts (`tokens.transfers` joined to a contract list)
3. Compute net deposit per wallet
4. **Critical**: don't stop at "net positive". For singleton lending (Morpho / Moolah / Euler), delta-neutral farmers will appear net-zero on chain. Cross-check the "closed out" set with DeBank `complex_protocol_list` filtered to the protocol-id (e.g., `bsc_helio` for Lista DAO) to recover them.
5. For each surviving wallet, pull DeBank `complex_protocol_list` across BSC, classify strategy, score on the 7 criteria above

This discovery method is what surfaced the wallets below. Dune queries: see `xaut-bsc-gold-defi.md` (queries 7335606 / 7335607 / 7335611 / 7335654).

---

## #1 — `0x2604839110e921916c157b37d8e6790565db6d38` (★ flagship benchmark)

**Verified**: 2026-04-18 | **Total wallet value**: $5.63M | **Discovered via**: XAUT BSC delta-neutral audit

**Why this is the flagship**: They run a perfect XAUt-vs-XAUt rate-arb loop on top of a leveraged sUSDe/U position on top of a stable rotation, plus untouched ETH on Venus for backup yield. This is the most strategically dense Lista wallet we've found — the entire archetype distilled into one wallet.

### Lista DAO (`bsc_helio`) — 4 simultaneous positions

| # | Strategy | Supply | Borrow | HR | What it captures |
|---|---|---|---|---:|---|
| 1 | Leveraged sUSDe carry | 1,230,396 sUSDe ($1.51M) | 1,354,407 U ($1.35M) | **1.02** | sUSDe yield ~12-15% minus U borrow rate; running at max leverage |
| 2 | Stable rotation | 44,442 USDT + 163,697 USDC ($208K) | 180,001 U ($180K) | 1.12 | USDT/USDC → U cycling for capital efficiency |
| 3 | Borrow XAUt against U | 2,591,377 U ($2.59M) | 314.06 XAUt ($1.51M) | 1.37 | Use stables to borrow gold from vault |
| 4 | Re-supply that XAUt for incentives | 314.05 XAUt ($1.51M) | 1,056,982 U ($1.06M) | 1.10 | Earn XAUt-collateral LISTA incentives, recycle U back to position 1 |

**The XAUt-vs-XAUt loop (positions 3 + 4)** is the signature move. They borrow 314 XAUt from the U/XAUt vault market (paying ~5% APR) and immediately re-deposit it as collateral in the XAUt/U market (earning incentivized supply APY + LISTA token rewards). Net: they hold $0 net XAUt exposure (delta-neutral on gold price) but capture the rate spread + LISTA token emissions. Both legs touch the same Moolah singleton, so the on-chain net is **exactly zero** — this is why they were initially missed.

### Venus (`bsc_venus`) — backup yield

| Supply | Borrow |
|---|---|
| 646.71 ETH ($1.55M) + 347,839 DOGE ($34K) | nothing |

Pure deposit, no borrow. ~$1.55M ETH parked at Venus supply rate as low-risk yield base.

### Liquid holdings

| Token | Amount | $ |
|---|---:|---:|
| BTCB | 30.32 | $2.33M |
| vETH | 30,828 (the Venus receipt above) | already counted |
| LISTA | 1,548 | $144 (farming rewards earned) |

### Totals & metrics

| Metric | Value |
|---|---:|
| Total wallet | $5.63M |
| Lista DAO assets | ~$5.85M (sup) / ~$3.95M (debt) → ~$1.9M net |
| Lista leverage | ~3.0x |
| Venus passive | $1.59M |
| Liquid BTCB | $2.33M |
| **# of simultaneous Lista positions** | **4** |
| **# of protocols used** | **2 (Lista + Venus)** |
| Health rate range | 1.02 – 1.37 |
| Holds reward token? | LISTA ✓ |
| Score | **7/7** |

---

## #2 — `0x4099766c5976b80f757673eb2d83332e15e3a01a`

**Verified**: 2026-04-18 | **Total wallet value**: $2.33M | **Discovered via**: XAUT BSC re-verification (Apr 18)

The most operationally complex single-protocol farmer on Lista. **11 simultaneous Lista positions**.

### Lista DAO — 11 positions

| Strategy | Supply | Borrow | HR |
|---|---|---|---:|
| XAUt vault deposit | 40.2 XAUt ($193K) | — | yield only |
| Stable carry vs U | 148K USDT + 546K USDC ($694K) | 656K USD1 ($656K) | **1.02** |
| slisBNB-collateralized USD1 borrow | 437.2 slisBNB ($290K) | 184K USD1 ($184K) | 1.35 |
| slisBNB → XAUt borrow | 69.5 slisBNB ($46K) | 5.1 XAUt ($25K) | 1.35 |
| U → XAUt borrow | 367K U ($367K) | 45.7 XAUt ($220K) | 1.34 |
| XAUt → USD1 borrow | 22.9 XAUt ($110K) | 64K USD1 ($64K) | 1.31 |
| XAUt → USDT borrow | 43.9 XAUt ($211K) | 122K USDT ($122K) | 1.33 |
| WBNB → XAUt borrow | 140 WBNB ($89K) | 9.9 XAUt ($48K) | 1.35 |
| Stable carry vs U (#2) | 83K USDT + 306K USDC ($389K) | 367K U ($367K) | 1.02 |
| asUSDF carry | 121K asUSDF ($129K) | 115K USD1 ($115K) | 1.02 |
| USDF carry | 53K USDF ($53K) | 47K USD1 ($47K) | 1.02 |
| USDT yield | 25K USDT ($25K) | — | yield only |

### Totals

| Metric | Value |
|---|---:|
| Total wallet | $2.33M |
| Lista assets | $2.60M / debt $1.85M → net $0.75M |
| Lista leverage | **3.47x** |
| # simultaneous positions | **11** |
| Health rate range | 1.02 – 1.35 |
| Score | **6/7** (single protocol — but exceptionally diversified within it) |

**Key insight**: They run 4 XAUt-related positions simultaneously (1 vault deposit, 3 supplying XAUt as collateral against various stables, 3 borrowing XAUt against various collateral). Net XAUt exposure: ~+150 XAUt long while capturing borrow incentives on the borrowed legs. Clear specialist on rotating stables-XAUt-stables.

---

## #3 — `0x102407f67415dcc4068370625ca27f24bb2a03d5` (a.k.a. Farmer #1 in xaut-farming-wallets.md)

**Verified**: 2026-04-18 | **Total wallet value**: $852K | **First identified**: April 16, 2026

The cleanest XAUt-leveraged-long + stable-loop combo.

### Strategy

| Position | Supply | Borrow | HR | Net effect |
|---|---|---|---:|---|
| XAUt → BNB borrow | 103.5 XAUt ($497K) | 459 WBNB ($293K) | 1.22 | Long XAUt, short BNB |
| XAUt → USDT borrow | 105 XAUt ($505K) | 335K USDT ($335K) | 1.16 | Long XAUt, hold cash |
| WBNB → XAUt borrow | 490 WBNB ($313K) | 39 XAUt ($187K) | 1.20 | Short XAUt, long BNB |
| Venus Flux syrupUSDT carry | 1.03M syrupUSDT ($1.16M) | 1.04M USDT ($1.04M) | **1.02** | Maple syrup yield - USDT borrow rate |

### Totals

| Metric | Value |
|---|---:|
| Total wallet | $852K |
| Total assets | $2.47M / debt $1.86M → net $615K |
| **Leverage** | **4.02x** |
| Net XAUt exposure | +169 XAUt (~$813K), partially hedged via WBNB short |
| # protocols | 2 (Lista + Venus Flux) |
| Score | **6/7** |

---

## #4 — `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` (a.k.a. Multi-Protocol Farmer)

**Verified**: 2026-04-18 | **Total wallet value**: $7.80M

The biggest-balance farmer on the list, but mostly stable-focused. XAUt is now a small side-leg (it grew 65× on sUSDe loops since April 16).

### Lista DAO — 6 positions

| Strategy | Supply | Borrow | HR |
|---|---|---|---:|
| XAUt vault deposit | 24.8 XAUt ($119K) | — | yield only |
| sUSDe → USD1 (max-lev #1) | 585K sUSDe ($718K) | 644K USD1 ($644K) | **1.02** |
| sUSDe → USDT (max-lev #2) | 501K sUSDe ($615K) | 551K USDT ($551K) | **1.02** |
| WBNB → XAUt borrow | 200 WBNB ($128K) | 14.9 XAUt ($72K) | 1.28 |
| sUSDe → U (max-lev #3) | 388K sUSDe ($476K) | 427K U ($426K) | **1.02** |
| slisBNB → U borrow | 342.3 slisBNB ($227K) | 137K U ($136K) | 1.43 |

### Totals

| Metric | Value |
|---|---:|
| Total wallet | $7.80M |
| Lista assets | $2.28M / debt $1.83M → net $453K |
| **Leverage** | **5.04x** |
| Specialty | sUSDe carry (3x parallel max-lev positions) |
| Score | **6/7** |

**Key insight**: They run **three identical sUSDe → stablecoin loops in parallel**, each at HR=1.02. This is sophisticated risk management — by splitting one large position into three across different borrow tokens (USD1, USDT, U), they avoid concentrating in a single market's liquidation cascade.

---

## #5 — `0x624227ae1d072d03ae0361f6a71384dd92af80b4`

**Verified**: 2026-04-18 | **Total wallet value**: $129K | **Discovered via**: hidden delta-neutral audit

A small-balance but **technically perfect** delta-neutral operator. Worth tracking because the playbook is replicable at $100K scale.

### Lista DAO — 5 positions

| Strategy | Supply | Borrow | HR |
|---|---|---|---:|
| Stable carry | 30K USDT + 109K USDC ($139K) | 127K U ($127K) | 1.05 |
| U → XAUt borrow | 131K U ($131K) | 18.1 XAUt ($87K) | 1.20 |
| BTCB → XAUt borrow | 0.2 BTCB ($16K) | 1.9 XAUt ($9K) | 1.29 |
| XAUt → USDT borrow | 9.9 XAUt ($48K) | 30K USDT ($30K) | 1.22 |
| XAUt → WBNB borrow | 10.1 XAUt ($49K) | 45 WBNB ($29K) | 1.22 |

### Totals

| Metric | Value |
|---|---:|
| Total wallet | $129K |
| Lista assets | $381K / debt $282K → net $99K |
| Leverage | **3.83x** |
| Net XAUt exposure | ~0 (perfect delta-neutral) |
| Net BTCB exposure | small short via #3 |
| Net WBNB exposure | small short via #5 |
| Score | **6/7** |

This is the cleanest "small whale" template — a $129K wallet running $381K of collateral with bidirectional XAUt + BTCB exposure. Great pattern to look for at the $50K–$500K wallet tier.

---

## #6 — `0x024b944911e2d3664c8b3b5d2a038fef8f4ee010`

**Verified**: 2026-04-18 | **Total wallet value**: $472K | **Discovered via**: hidden delta-neutral audit

The most cross-protocol of the small wallets — uses **5 different protocols** simultaneously.

### Positions across protocols

| Protocol | Position | Net |
|---|---|---:|
| Euler | 27K USDT supply | $27K |
| Lista DAO (Yield) | 27 XAUt vault | $130K |
| Lista DAO | 399 WBNB supply, 28 XAUt borrow | -$5K |
| Lista DAO | 1.4 ETH → 1,119 USD1 borrow | $2K |
| Lista DAO | 3 XAUt → 9K USDT borrow | $5K |
| Lista DAO | 21 BNB → 6,389 USD1 borrow | $7K |
| Lista DAO | 30.7 slisBNB → 2 XAUt borrow | $11K |
| Thena | 5,276 THE locked | $615 |
| Venus | 212 FDUSD supply | $212 |
| Venus Flux | 7,622 U + 9,007 USDT yield | $17K |

### Totals

| Metric | Value |
|---|---:|
| Total wallet | $472K |
| Total assets | $481K / debt $161K → net $320K |
| Leverage | 1.50x |
| **# protocols used** | **5 (Lista + Euler + Thena + Venus + Venus Flux)** |
| Net XAUt | small (delta-neutral on 30/30 leg) |
| Score | **6/7** |

Worth tracking because they're **the smallest wallet showing whale-tier protocol diversification**. If they're profitable at $472K, the playbook scales down to retail.

---

## Common patterns to scan for in future research

When pulling DeBank `complex_protocol_list` for any wallet, flag if you see:

- [ ] sUSDe supplied with HR ≤ 1.05 (max-leverage Ethena carry — currently the most lucrative stable strategy on Lista)
- [ ] Same asset on both sides (XAUt sup + XAUt brw, slisBNB sup + slisBNB brw, etc.) — delta-neutral rate arb with token incentives
- [ ] 3+ identical-template positions in the same protocol — risk-spreading across borrow tokens
- [ ] WBNB ↔ slisBNB swap loops via Lista — captures slisBNB staking yield as carry
- [ ] Both Lista (Helio) AND Venus Flux active — sign of operator chasing the highest stable rate across protocols
- [ ] Pendle PT positions on BSC — fixed-rate hedging by sophisticated operator (rare on BSC, mostly on Ethereum)

If a wallet hits 3+ of these, profile it and consider adding to this file.

## Anti-patterns (NOT benchmark-worthy)

- Single-position max-leverage retail looper (e.g., one slisBNB→BNB loop, nothing else)
- Auto-vault depositors (clrETH, kelp gain auto-strategies — operator doesn't actually pick the strategy)
- High tx count but always identical action — it's a bot, not an operator

---

## Tracking discipline

When a session of research touches any of the wallets in this file:

1. Re-pull DeBank for those wallets
2. Note any **new positions** they've opened in the last week (signal: "professionals are entering this trade")
3. Note any **closed positions** (signal: "something changed in incentives, opportunity may be ending")
4. Update the relevant wallet's section here with date-stamped change

The point of this file is not historical record-keeping — it's an early-warning system for what's about to be the next interesting strategy on BSC.

## See also

- `xaut-bsc-gold-defi.md` — full XAUT farmer census (105 wallets), where most of these were discovered
- `xaut-farming-wallets.md` — earlier XAUt-only farmer profiles (April 16 baseline)
- `lista-dao-yield-strategies.md` — strategy catalog these farmers are running
- `bsc-midsize-defi-users.md` — sub-$1M wallet patterns
