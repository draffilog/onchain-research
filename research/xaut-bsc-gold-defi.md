# XAUT (Tether Gold) on BSC — DeFi Usage & Yield Strategies

*Last updated: April 18, 2026 (full re-verification)*

> **Data integrity note**: All data below was verified via Dune Analytics
> queries (query IDs provided), DeBank Pro API wallet lookups, Lista DAO
> protocol UI (browser), and BscScan. Rates are point-in-time snapshots.
> Re-verify before reusing.

## What Changed Since April 16, 2026 (verified Apr 18)

The XAUT market on BSC has **expanded dramatically** in the past 3-7 days. Re-verification revealed:

| Metric | April 16 | April 18 | Change |
|---|---|---|---|
| Total XAUT supply on BSC (Dune mint-burn) | ~3,000 (overstated) | **2,114.59** | corrected baseline |
| Lista DAO Collateral holdings | 1,131 XAUT | **1,101.22 XAUT** (~$5.29M) | -30 XAUT |
| Binance Hot Wallet | 1,289 XAUT | **987.64 XAUT** (~$4.74M) | -301 XAUT |
| Lista XAUT Vault — utilization | 90% | **99.99%** | fully utilized |
| Lista XAUT Vault — APY | 9.88% | **10.61%** | +0.73 pp |
| Lista XAUT Vault — total deposits | n/a tracked | **536.07 XAUt ($2.59M)** | new baseline |
| Active XAUT farmers identified | 5 | **57** (exact, Dune query 7335606) | +52 |
| XAUT-as-loan markets liquidity | ~$163K available | **$0** (all 100% utilized) | delta-neutral arb blocked |

**Headline finding**: ~301 XAUT (~$1.45M) left Binance for BSC wallets between Apr 13-18, mostly going into Lista DAO via 15+ new farmer wallets. The XAUT-as-loan markets are now fully utilized — Strategy 5 (delta-neutral rate arb) is no longer entry-replicable.

### Live XAUT-collateral borrow rates (browser-verified Apr 18, 2026)

| Market | Borrow Rate (Apr 16 → Apr 18) | LLTV | Liquidity (Apr 18) |
|---|---|---|---|
| XAUt / BNB | -14.78% → **-12.07%** | 72% | 4.34K BNB ($2.79M) |
| XAUt / U | -14.31% → **-6.41%** | 77% | 69.79K U ($69.8K) |
| XAUt / USD1 | -8.84% → **-9.99%** | 77% | 46.75K USD1 ($46.8K) |
| XAUt / USDT | -13.10% → **-9.06%** | 77% | 7.82K USDT ($7.8K) |

Subsidies have compressed across all markets (LISTA token price/emissions effect). Available borrow liquidity on the stablecoin side is now tight — XAUt/USDT effectively dry at $7.8K.

### XAUT-as-loan markets (browser-verified Apr 18) — ALL 100% utilized

| Collateral → XAUt loan | LLTV | Liquidity | Borrow Rate |
|---|---|---|---|
| U → XAUt | 80% | 0 ($0.24) | 2.92% |
| slisBNB & BNB → XAUt | 72% | 0 ($0.14) | 3.93% |
| ETH → XAUt | 70% | 0 ($0.13) | 0.14% |
| BNB → XAUt | 72% | 0 | 4.47% |
| slisBNB → XAUt | 72% | 0 | 4.73% |
| BTCB → XAUt | 75% | 0 | 4.66% |
| wBETH → XAUt | 70% | 0 | 3.29% |
| USDT → XAUt | 80% | 0 | 3.63% |
| USD1 → XAUt | 80% | 0 | 0.13% |
| USDT & USDC → XAUt | 80% | 0 | 4.01% |

**Implication**: New entrants cannot run the delta-neutral rate arbitrage strategy (Strategy 5) at any scale — there is no XAUt available to borrow on Lista. Only existing positions (e.g., wallet `0x624227ae1d072d03ae0361f6a71384dd92af80b4` which still holds 20 XAUt borrowed) can maintain it.

### Updated farmer roster (DeBank-verified Apr 18, 2026)

XAUT-deposit-bearing wallets, sorted by net XAUT in Lista:

| Wallet | XAUT supplied | XAUT borrowed | Net XAUT | Total $ | Strategy |
|---|---|---|---|---|---|
| `0xccecc8286c615c0bdb96cd8062f059b0c7920088` | 200.14 | 0 | **+200** | $11.95M | NEW: whale, just deposited XAUT collateral; runs major Venus position (60 BTCB, $7.26M USDC supply, 997 BNB + 1,699 ETH borrow). XAUT not yet borrowed against. |
| `0x102407f67415dcc4068370625ca27f24bb2a03d5` | 208.50 | 39.01 | +169.5 | $854K | Farmer #1 (existing) — leveraged long gold + Venus Flux syrupUSDT loop. Downsized from $2.43M but recently topped up 515 XAUT in past 5 days. |
| `0x0fcc36d467b7d855f87e9912ecc926aeb3743ecb` | 120.96 | 0 | +121 | $832K | NEW: classic leveraged long gold (XAUt/USD1 market, $350K USD1 borrow). |
| `0x4099766c5976b80f757673eb2d83332e15e3a01a` | 107.0 | 60.7 | +46.3 | $2.34M | NEW: most complex multi-market XAUT farmer — supplies 3 XAUT markets, borrows in 2 reverse markets, plus slisBNB looping, USDT/USDC/USD1 stablecoin loops, asUSDF/USDF positions. |
| `0x21993c4e2b836ba5e5c7f599f790969479615d51` | 48.09 | 0 | +48 | $308K | NEW: leveraged long XAUt + slisBNB/BNB looper + stablecoin loops. |
| `0x2113cf56f29ad869cf445efb604d49b615e7ce10` | 33.01 | 0 | +33 | $96K | NEW: leveraged long XAUt + Venus deployment. |
| `0xbd0edc18a1b2bbc7c77d6e627c6a64a8c804abad` | 28.0 | 0 | +28 | $535K | NEW: 28 XAUt parked (likely vault). |
| `0x9f5948c84d2567bd5ff9127ac14898334e66d002` | 26.01 | 0 | +26 | $14.6M | NEW: BTCB whale (173 BTCB / $8.2M USD1 borrow), 26 XAUT side-position. |
| `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963` | 25.99 | 0 | +26 | $432K | Vault Depositor (existing) — XAUT vault + leveraged stables ($5.44M USDT/USDC, $4.97M U borrow). Health 1.02. |
| `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` | 24.85 | 14.93 | +9.9 | **$7.82M** | Multi-Protocol Farmer (existing) — grew 65× from $120K. Now runs sUSDe loops (3 markets, $952K supply), slisBNB loop, plus the small XAUT position. |
| `0x9cd692f73ba15a4a9168481aa5241cb36f8dba04` | 23.50 | 0 | +23.5 | $44K | NEW: leveraged long XAUt/BNB. |
| `0x14e9730bc59545de24966f0c6a7ea8115c32808a` | 20.51 | 0 | +20.5 | $300K | NEW: leveraged long XAUt + Kernel DAO. |
| `0x624227ae1d072d03ae0361f6a71384dd92af80b4` | 20.00 | 20.00 | **0** | $129K | Lista Depositor (existing) — pure delta-neutral, still working but cannot scale. |
| `0x1542d8c1bba7a2052b13bbab1ac49c92475a2972` | 20.01 | 0 | +20 | $176K | NEW: leveraged long XAUt. |
| `0xf2a8286ea786684f123f1312e570c3c02d823760` | 17.31 | 0 | +17.3 | $413K | NEW: vault deposit. |
| `0x0b751a47da4144ea89f6492a3269ac8546faf18a` | 16.72 | 0 | +16.7 | $31K | NEW: leveraged long. |
| `0xd6d0a2f493ccb30756cef1e147aa863e919c1326` | 12.04 | 0 | +12 | $651K | NEW: Aster + Lista small position. |
| `0x0821b576a2ee921d3c4b97a0f1158c2e8b633bd0` | 6.49 | 0 | +6.5 | $61K | NEW: multi-protocol (Aster + Bitway + Lista). |
| `0xffb26bd72414baec53a7bb005d55d8436bef2b15` | 5.73 | 0 | +5.7 | $328K | NEW: parked. |
| `0xc9144683c0497b422ccfe9bcfba37855cc62c0b8` | 0 | 8.40 | -8.4 | $38K | Farmer #2 (existing) — exited XAUT supply, now only borrowing 8.4 XAUT. Down 94% from $650K. |

**Sum of net XAUT identified**: ~822 XAUT in 20 wallets (vs 1,101 XAUT held by Lista). The remaining ~280 XAUT is in smaller depositors I didn't enumerate (Dune query 7335574 has the full top-25 list).

### What this means

1. **Demand for XAUT-as-collateral exploded**. New deposits of ~821 XAUT into Lista represent ~$3.94M of fresh subsidized collateral in 5 days, supplied by ~15 new wallets.
2. **Subsidies are getting diluted.** Per-market borrow rates compressed from 8-14% range to 6-12% range as more borrowers compete for the same LISTA emissions.
3. **The vault is full.** 99.99% utilization means ~$0.27 of XAUt liquidity remains. New entrants who want to borrow XAUT (delta-neutral arb) are blocked.
4. **CEX-only entry path persists.** Every new farmer's XAUT came from the Binance hot wallet (`0x8894e0a0c962cb723c1976a4421c95949be2d4e3`). No DEX-sourced XAUT.

### Verification queries (Apr 18 re-run)

| Query ID | Purpose | Result |
|---|---|---|
| 7335575 | XAUT total supply (mint − burn) | 2,114.59 XAUt minted, 1.38 burned |
| 7335574 | Top 25 holders by net balance | Lista 1101 / Binance 988 / dust < 3 |
| 7335573 | Binance → BSC withdrawals (90d) | 6 days of detailed flows incl. all new wallets |
| 7320503 (re-run) | Protocol distribution | Lista 1101 ($5.29M) / Binance 988 ($4.74M) |
| 7335606 | **All Lista XAUT depositors** (deposit/withdraw history + net) | 105 unique wallets, full deposit/withdraw breakdown |
| 7335607 | Unique interactor counts | 105 Lista XAUT interactors / 788 ever-touched-XAUT |
| 7335611 | Bucketed count by XAUT position size | 3 whales / 1 / 19 / 18 / 16 / 43 closed / 5 borrowers |

## Exact Farmer Census (Dune-verified Apr 18, 2026)

**Scope**: every wallet that has ever deposited or received XAUT from Lista DAO's two XAUT contracts (Collateral `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` and XAUT Vault `0x4109415de2271097fb5fa16af8a753aab8c46d6f`).

### Headline counts

| Category | Wallet count |
|---|---|
| **Ever interacted with Lista XAUT (deposit or borrow)** | **105** |
| &nbsp;&nbsp;↳ Currently holding net XAUT > 0.01 (active farmer) | **57** |
| &nbsp;&nbsp;&nbsp;&nbsp;↳ Meaningful position (≥ 1 XAUT, ≥ ~$4.8K) | **41** |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Serious farmer (≥ 10 XAUT, ≥ ~$48K) | **23** |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Large position (≥ 50 XAUT, ≥ ~$240K) | **4** |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Whale (≥ 100 XAUT, ≥ ~$480K) | **3** |
| &nbsp;&nbsp;↳ Closed out (deposited and fully withdrew) | **43** |
| &nbsp;&nbsp;↳ Pure XAUT borrowers (never deposited, received XAUT as loan) | **5** |
| Broader universe: unique addresses that ever touched XAUT on BSC (any transfer, includes CEX/intermediaries/bots) | **788** |

Source: Dune queries 7335606 (positions) + 7335607 (counts) + 7335611 (buckets).

### Full ranked farmer list — net positive XAUT in Lista

Sorted by net XAUT held in Lista. Strategy classification via DeBank `complex_protocol_list` where position was directly verified; entries without a direct DeBank confirmation say "supply only (Dune)". USD values at ~$4,800/XAUt.

| # | Wallet | Net XAUt | ≈ USD | Deposits / Withdrawals | Wallet $ total | Strategy |
|---|---|---:|---:|---|---:|---|
| 1 | `0xccecc8286c615c0bdb96cd8062f059b0c7920088` | 200.13 | $961K | 4 / 0 | $11.95M | **NEW whale** — just deposited, no borrow yet; runs large Venus BTCB/USDC position separately |
| 2 | `0x102407f67415dcc4068370625ca27f24bb2a03d5` | 169.49 | $814K | 24 / 15 | $854K | Farmer #1 (existing) — leveraged long + Venus Flux syrupUSDT loop |
| 3 | `0x0fcc36d467b7d855f87e9912ecc926aeb3743ecb` | 120.96 | $581K | 1 / 0 | $832K | NEW — classic leveraged long (XAUt/USD1, $350K USD1 borrow) |
| 4 | `0x367e6a73a56b338f0e79c061407458f40f79264e` | 85.25 | $409K | 1 / 0 | $182K | NEW — leveraged long (borrows USD1) |
| 5 | `0x21993c4e2b836ba5e5c7f599f790969479615d51` | 48.09 | $231K | 3 / 0 | $308K | NEW — leveraged long + slisBNB/BNB looper + stablecoin loops |
| 6 | `0x4099766c5976b80f757673eb2d83332e15e3a01a` | 46.28 | $222K | 17 / 14 | $2.34M | NEW — most complex farmer; 107 XAUT supplied across 3 markets, 60.7 borrowed in 2 reverse markets, multiple sUSDe/USDF/USD1/stablecoin loops |
| 7 | `0x7c906dd9fbf91116c859c363c64a85547fd6865f` | 45.28 | $217K | 3 / 4 | $893K | NEW — XAUT Vault only, parked (no borrow) |
| 8 | `0xf4766c366f15ab0f338ecc9bef49bbaac13649a6` | 27.66 | $133K | 11 / 9 | $945K | NEW — multi-directional (36.5 XAUt supply / 8.8 borrow) |
| 9 | `0x2113cf56f29ad869cf445efb604d49b615e7ce10` | 33.01 | $158K | 5 / 0 | $96K | NEW — leveraged long + Venus |
| 10 | `0xbd0edc18a1b2bbc7c77d6e627c6a64a8c804abad` | 28.00 | $134K | 1 / 0 | $535K | NEW — Vault only, parked |
| 11 | `0x9f5948c84d2567bd5ff9127ac14898334e66d002` | 26.01 | $125K | 1 / 0 | $14.6M | NEW — BTCB whale with 26 XAUT side-position |
| 12 | `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963` | 25.99 | $125K | 9 / 3 | $432K | Vault Depositor (existing) — XAUT vault + $5.44M leveraged stables |
| 13 | `0x9cd692f73ba15a4a9168481aa5241cb36f8dba04` | 23.50 | $113K | 1 / 0 | $44K | NEW — leveraged long XAUt/BNB |
| 14 | `0x06916da297274196db4d0f4b4eb11d73ec3d9e7e` | 23.44 | $113K | 4 / 3 | $261K | NEW — multi-directional (26.4 supply / 3 borrow) |
| 15 | `0x14e9730bc59545de24966f0c6a7ea8115c32808a` | 20.51 | $98K | 1 / 0 | $300K | NEW — leveraged long + Kernel DAO |
| 16 | `0x1542d8c1bba7a2052b13bbab1ac49c92475a2972` | 20.01 | $96K | 1 / 0 | $176K | NEW — leveraged long |
| 17 | `0xf2a8286ea786684f123f1312e570c3c02d823760` | 17.30 | $83K | 2 / 0 | $413K | NEW — vault deposit |
| 18 | `0x0b751a47da4144ea89f6492a3269ac8546faf18a` | 16.72 | $80K | 1 / 0 | $31K | NEW — leveraged long |
| 19 | `0x1b648ade1ef219c87987cd60eba069a7faf1621f` | 15.27 | $73K | 1 / 0 | **$9.08M** | NEW **whale** — side-position, borrows USD1 |
| 20 | `0xd98a1b4082052b57e5688a69d07263c4b7963c5d` | 14.50 | $70K | 7 / 1 | $366K | NEW — leveraged long (borrows USDT, WBNB, U) |
| 21 | `0xd6d0a2f493ccb30756cef1e147aa863e919c1326` | 12.04 | $58K | 3 / 0 | $651K | NEW — Aster + Lista small position |
| 22 | `0x8ccaf951c46899aa11e96435261c271c3e5ba963` | 10.79 | $52K | 2 / 0 | $1.26M | NEW — Vault only, parked |
| 23 | `0x609af723d7460d5f37bf2c1f8f975ddf1804dd92` | 10.24 | $49K | 2 / 1 | $22K | NEW — leveraged long (borrows U, USD1) |
| 24 | `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` | 9.92 | $48K | 18 / 15 | $7.82M | Multi-Protocol Farmer (existing) — XAUT is now a tiny side-leg; grew 65× on sUSDe/slisBNB loops |
| 25 | `0x1a0b5f2eade71626d051c29ef425d9c49dc87aea` | 8.00 | $38K | 1 / 0 | (not checked) | Vault depositor |
| 26 | `0x0821b576a2ee921d3c4b97a0f1158c2e8b633bd0` | 6.49 | $31K | 1 / 0 | $61K | NEW — multi-protocol (Aster + Bitway) |
| 27 | `0xc25249331d6d8152524152b09654bc383c677e58` | 6.31 | $30K | 2 / 1 | $42K | NEW — leveraged long (borrows U) |
| 28 | `0xb93c056b8d1008282b8c3ed936d41ec8670cab5c` | 6.00 | $29K | 2 / 0 | $54K | NEW — leveraged long (borrows USDT) |
| 29 | `0x339c4f24d84361dbb8d6ee0100937c756782f5b5` | 5.79 | $28K | 1 / 3 | $106K | NEW — Vault only |
| 30 | `0xffb26bd72414baec53a7bb005d55d8436bef2b15` | 5.73 | $28K | 1 / 0 | $328K | NEW — parked |
| 31 | `0x3468caa78f67575bf7a2b3d556d60255d206e572` | 4.31 | $21K | 1 / 0 | (not checked) | Vault |
| 32 | `0x7b438f6810deacf5e519617d65915e1ae9dd8357` | 3.88 | $19K | 1 / 0 | (not checked) | Vault |
| 33 | `0x68e2048a65eecb5b584ae3e43f4a5c8bc67406fc` | 3.23 | $15K | 1 / 0 | (not checked) | Collateral |
| 34 | `0xbab0d5aba5475e4926398918ee3ee6899a4406ac` | 3.01 | $14K | 1 / 0 | (not checked) | Vault |
| 35 | `0x927d81b91c41d1961e3a7d24847b95484e60c626` | 2.91 | $14K | 1 / 0 | (not checked) | Vault |
| 36 | `0x03c3f7c5f78ae78bf8a26509cfbcb644b0ccb7ed` | 2.32 | $11K | 1 / 0 | (not checked) | Vault |
| 37 | `0x3d8b240012e52a45d3f79e288b5d94ab0e7551a3` | 2.00 | $10K | 1 / 0 | (not checked) | Collateral |
| 38 | `0xc09f787586dcf4c383895f7761d92b77675ee5c4` | 2.00 | $10K | 3 / 1 | (not checked) | Vault |
| 39 | `0x6c2f645048327019b23141829668ef95cfc9ccb3` | 1.84 | $9K | 1 / 0 | (not checked) | Vault |
| 40 | `0x1186b7266488e6b4991139d8b5b8dea7a60257da` | 1.42 | $7K | 1 / 0 | (not checked) | Vault |
| 41 | `0x5dc3da49d1e76a7275f63f91221f2b2c19dc2824` | 1.18 | $6K | 4 / 1 | (not checked) | Collateral |

**Sub-1-XAUT tail** (16 additional wallets, 0.01–0.99 XAUT, totaling 6.49 XAUT / ~$31K combined) omitted for brevity — see Dune query 7335606 for the full list.

### Pure borrowers (net negative — owe XAUT back to Lista)

| Wallet | XAUt borrowed | Notes |
|---|---:|---|
| `0xc9144683c0497b422ccfe9bcfba37855cc62c0b8` | 8.40 | Farmer #2 (existing) — exited supply, now only borrows |
| `0x99237907b5ebf2efc30ad6312b7e39b1d6e9b9d5` | 6.23 | Pure XAUT borrower |
| `0x65855d7547b25d19e86f4394101139b507a1dbd8` | 6.00 | Pure XAUT borrower |
| `0xb1ded9332aebb903f39098f9897caf50f525f2f1` | 0.77 | Pure XAUT borrower |
| `0x2e32a8e31d41c75af5a3a715e5ea7b7453c354e9` | 0.70 | Pure XAUT borrower |

These 5 wallets received XAUT as a loan against other collateral (e.g., U, USDT, BTCB). Their XAUT positions sum to -22.10 XAUT — essentially capped by the vault's outstanding debt.

### Closed-out wallets (43 total)

43 wallets that once deposited into Lista but fully withdrew (net XAUT ≈ 0). Notable by historical deposit volume:

| Wallet | Lifetime deposited | Notes |
|---|---:|---|
| `0x0629ea1ec2944d39f3123ddc4699ffb3b75faf99` | 475.56 XAUt | Biggest round-trip — deposited & fully withdrew |
| `0x2604839110e921916c157b37d8e6790565db6d38` | 314.05 XAUt | Large round-trip |
| `0x0813f733e0fd133a82360c35f2f9417e376e27f7` | 90.00 XAUt | Exited |
| `0x0aefc8d0632a2bcb494ff44c4a229b3a6fa2c581` | 80.00 XAUt | Exited |
| `0x024b944911e2d3664c8b3b5d2a038fef8f4ee010` | 32.00 XAUt | Exited |
| `0xf37b052dc7a1d4cdcf811d17c12c37c1f0a61e66` | 36.00 XAUt | Round-trip |
| `0x624227ae1d072d03ae0361f6a71384dd92af80b4` | 220.88 XAUt in / 220.88 XAUt out | Lista Depositor (existing) — net ZERO, but still **active delta-neutral** — 20 XAUt currently supplied + 20 XAUt currently borrowed elsewhere. Counted as "net zero" by Dune but strategy is live. |

Source: Dune 7335606, full list available there.

---

## Overview

XAUT (Tether Gold) is a gold-backed ERC-20 token issued by Tether. Each
token represents 1 troy ounce of gold (~$4,790 at time of research). On BSC,
XAUT has a small but active DeFi ecosystem driven entirely by Lista DAO's
subsidized lending markets.

**Key finding**: All DeFi activity is concentrated in one protocol (Lista DAO),
driven by 5 farmer wallets, sourced entirely from Binance CEX withdrawals —
not from on-chain DEX liquidity.

## Verified Addresses

| What | Address | How verified |
|---|---|---|
| XAUT token | `0x21caef8a43163eea865baee23b9c2e327696a3bf` | BscScan verified, CoinGecko confirmed |
| Lista DAO Collateral (Moolah) | `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | BscScan "Lista DAO: Moolah" label |
| Lista XAUT Vault | `0x4109415de2271097fb5fa16af8a753aab8c46d6f` | DeBank `bsc_helio` adapter, Lista UI |
| Binance Hot Wallet | `0x8894e0a0c962cb723c1976a4421c95949be2d4e3` | DeBank empty `[]` + known Binance address |
| PancakeSwap XAUT LP | `0xc655e1a100a084d9ac91c269b0a7cb0e62263fcf` | DexScreener + PancakeSwap UI |
| Tether Mint Intermediary | `0x5754284f345afc66a98fbb0a0afe71e0f007b949` | Dune: receives from 0x0 mint address |
| Mint Distribution | `0xf2eb2aa3727187edd69285ce7e7fdfe2e494abce` | Dune: forwards minted XAUT to Binance |

## Supply & Distribution

| Where | XAUT | % | Source |
|---|---|---|---|
| Binance Hot Wallet (idle on exchange) | ~1,289 | ~43% | Dune query 7320262 |
| Lista DAO (deposited by farmers) | ~1,131 | ~37% | Dune query 7320503 |
| Mint pipeline & intermediaries | ~580 | ~19% | Dune query 7320262 (residual) |
| PancakeSwap DEX liquidity | ~0.93 | ~0.03% | DexScreener |
| **Total on BSC** | **~3,000** | **100%** | Dune query 7320689 (mint tracking) |

**Critical observation**: The "Lista DAO" and "farmer" numbers are the same
gold. Farmers buy XAUT on Binance spot, withdraw on-chain, and deposit into
Lista. The 1,131 XAUT in Lista was put there by 5 farmer wallets. There is no
organic DEX-based entry point — PancakeSwap has $4.5K TVL, effectively zero.

Source: Dune query 7325450 (farmer origin trace) confirmed 82.7% of Farmer #1's
XAUT came directly from Binance withdrawals.

## Mint-to-DeFi Pipeline

Verified via Dune query 7320493 (flow analysis between labeled addresses):

```
Tether Mints (0x0) → Intermediary (0x5754284f345afc66a98fbb0a0afe71e0f007b949) → Distribution (0xf2eb2aa3727187edd69285ce7e7fdfe2e494abce)
  → Binance Hot Wallet (0x8894e0a0c962cb723c1976a4421c95949be2d4e3) → Farmer wallets → Lista DAO contracts
```

There is no alternative entry path. All XAUT enters BSC through Tether's mint
pipeline, lands on Binance, and the portion that enters DeFi goes directly
from Binance withdrawals into Lista DAO.

## Lista DAO XAUT Markets — Live Rates

Checked via browser (`lista.org/lending/market/bsc/<hash>?tab=market`) on April 16, 2026.

### XAUT-as-collateral (supply gold, borrow stables) — SUBSIDIZED

| Market | Net Borrow Rate | Native Rate | LISTA Subsidy | LLTV |
|---|---|---|---|---|
| XAUt / BNB | **-14.78%** | 0.23% | ~15.01% | 72% |
| XAUt / U | **-14.31%** | 0.26% | ~14.57% | 77% |
| XAUt / USDT | **-13.10%** | 3.21% | ~16.31% | 77% |
| XAUt / USD1 | **-8.84%** | 0.29% | ~9.13% | 77% |

Negative rate = borrower gets paid in LISTA token rewards. This is the core
incentive driving all XAUT farming on BSC.

### XAUT-as-loan (supply other assets, borrow gold) — NOT SUBSIDIZED

| Market | Borrow Rate | LLTV |
|---|---|---|
| U / XAUt | **0.35%** | 80% |
| USDT / XAUt | **1.39%** | 80% |
| BTCB / XAUt | **1.68%** | 75% |
| BNB / XAUt | **1.79%** | 72% |

### XAUT Vault

| | APY | Utilization | Source |
|---|---|---|---|
| Lista XAUT Vault | **9.88%** (subsidized) | ~90% | Lista vault UI |

### Key Rate Insight

The spread between subsidized XAUT-collateral markets (-8.8% to -14.8%) and
unsubsidized XAUT-loan markets (0.35% to 1.79%) is **9-16%**. This spread
enables delta-neutral rate arbitrage strategies.

## Identified Farmer Wallets

Classification methodology: Dune top holders query (7320262) → DeBank
`complex_protocol_list` for each address → Lista UI for rate verification.

| Label | Address | How identified |
|---|---|---|
| Farmer #1 (5 Loops) | `0x102407f67415dcc4068370625ca27f24bb2a03d5` | DeBank: 5 Lista XAUT positions + Venus Flux |
| Farmer #2 (Multi-dir) | `0xc9144683c0497b422ccfe9bcfba37855cc62c0b8` | DeBank: supplies AND borrows XAUT simultaneously |
| Multi-Protocol Farmer | `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` | DeBank: Lista + Alpaca + Aster + Venus positions |
| Vault Depositor + Stables | `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963` | DeBank: 26 XAUT vault + $5.4M stablecoin farming |
| Lista Depositor (4 pos) | `0x624227ae1d072d03ae0361f6a71384dd92af80b4` | DeBank: 4 XAUT positions, net XAUT = 0 |

## Yield Strategies & APY

### Strategy 1: Leveraged Long Gold — ~9% APY + gold exposure

**Who**: Farmer #1 (`0x102407f67415dcc4068370625ca27f24bb2a03d5`)
**Equity**: ~$2.43M (507 XAUT from Binance)

Steps:
1. Buy XAUT on Binance spot → withdraw to BSC wallet
2. Deposit as collateral across 4 Lista markets (XAUt/USD1, XAUt/U, XAUt/BNB, XAUt/USDT)
3. Borrow stables at **-8.8% to -14.8%** (get paid to borrow)
4. Deploy borrowed stables into Venus Flux (syrupUSDT loop ~4-7% spread)
5. Optionally: deposit into XAUT Vault for 9.88% passive yield

| Income source | Rate | Applied to |
|---|---|---|
| Lista borrow rewards (4 markets) | -8.84% to -14.78% | $1.59M borrowed |
| XAUT Vault | +9.88% | $204K deposited |
| Venus Flux stablecoin spread | ~4-7% | $120K net equity |
| BNB/XAUt reverse borrow cost | -1.79% | $187K (cost) |

**Portfolio APY: ~9%** on top of full gold price exposure.
Source: DeBank positions verified April 16 + Lista UI rates.

### Strategy 2: Delta-Neutral Rate Arbitrage — ~10% APY, zero gold exposure

**Who**: Lista Depositor (`0x624227ae1d072d03ae0361f6a71384dd92af80b4`)
**Equity**: ~$112K

Steps:
1. Supply XAUT as collateral in subsidized markets → borrow stables at **-13.1%** and **-14.3%**
2. Simultaneously borrow the exact same amount of XAUT in unsubsidized markets → pay only **0.35%**
3. Net XAUT position = zero (23.81 supplied = 23.81 borrowed)
4. Pocket the 13-14% spread between subsidized and unsubsidized rates

| Position | Rate | On what |
|---|---|---|
| Borrow USDT against XAUT | **earn 13.10%** | $30K |
| Borrow U against XAUT | **earn 14.31%** | $44K |
| Borrow XAUT against U | **pay 0.35%** | $114K |
| Borrow U against stables | **earn 0.75%** | $127K |

**Portfolio APY: ~10%** with zero gold price risk.
Source: DeBank positions + Lista UI rates, verified April 16.

### Strategy 3: Leveraged Stablecoin Farming — ~12% APY, minimal gold

**Who**: Vault Depositor (`0x04ab66f4511cf5dab9b68e06d53bfd0268d76963`)
**Equity**: ~$430K (leveraged ~13x)

Steps:
1. Park 26 XAUT in vault → earn 9.88%
2. Supply $5.44M USDT+USDC → borrow $5.13M U at **-0.75%**
3. The 0.75% subsidy × 13x leverage = ~12% APY on equity

**Portfolio APY: ~12%** — but health factor of 1.025 (liquidation at 2.5% depeg).
Source: DeBank positions April 16.

### Strategy Summary

| Strategy | APY | Gold Exposure | Risk | Replicable? |
|---|---|---|---|---|
| Leveraged long gold | **~9%** | Full long | Liquidation if gold -15% | Limited by Binance XAUT supply |
| Delta-neutral rate arb | **~10%** | Zero | LISTA subsidy removal | Limited by vault 90% utilization |
| Leveraged stablecoin | **~12%** | Minimal | Stablecoin depeg (1.025 health) | Capital-scalable on stable side |

All strategies depend on LISTA token subsidies. Without subsidies, the
negative borrow rates disappear and delta-neutral APY drops to near zero.

## Liquidity Constraints

| Constraint | Value | Source |
|---|---|---|
| PancakeSwap XAUT/USDT TVL | ~$4,500 | DexScreener |
| Lista XAUT Vault utilization | 90% | Lista vault UI |
| XAUT Vault available liquidity | ~34 XAUT ($163K) | Lista vault UI |
| Number of active farmers | 5 wallets | Dune query 7320262 + DeBank |

**Implication**: New farmers cannot replicate delta-neutral strategies at scale.
The vault is nearly fully lent out. DEX liquidity is effectively zero. All
entry/exit happens through Binance CEX.

## Dune Dashboard & Queries

**Live dashboard**: [XAUT on BSC — Usage Analysis](https://dune.com/vlad_bnbchain/xaut-tether-gold-on-bsc-usage-analysis-lista-dao-holders-yield-strategies) (dashboard ID: 209744)

| Query ID | Name | What it measures |
|---|---|---|
| 7319536 | XAUT BSC Trading Volume | Daily DEX volume and trade count |
| 7320262 | XAUT Top 15 Holders | Net balance per wallet, labeled |
| 7320265 | XAUT Large Transfers | Transfers >1 XAUT with labels |
| 7320266 | XAUT Destinations | Where XAUT flows to, by destination |
| 7320493 | XAUT Flows Between Key Addresses | Labeled flow matrix |
| 7320495 | XAUT Daily Flows to Lista DAO | TVL inflow tracking |
| 7320503 | XAUT Protocol Distribution | Where XAUT is used (by category) |
| 7320688 | XAUT Daily Active Wallets | Unique wallets per day |
| 7320689 | XAUT Cumulative Supply | Mint/burn tracking |
| 7320690 | XAUT in Lista DAO Over Time | Protocol TVL history |
| 7321563 | XAUT Address Book | All 12 labeled wallets with DeBank/BscScan links |
| 7325448 | XAUT Origin Trace | Where each farmer received their XAUT from |
| 7325450 | XAUT Farmer Sources Summary | Aggregated: what % came from Binance vs Lista recycling |

## Key SQL Patterns

### Top holders by net balance

```sql
WITH inflows AS (
  SELECT "to" as wallet, SUM(amount) as total_in
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x21caef8a43163eea865baee23b9c2e327696a3bf
  GROUP BY 1
),
outflows AS (
  SELECT "from" as wallet, SUM(amount) as total_out
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x21caef8a43163eea865baee23b9c2e327696a3bf
  GROUP BY 1
)
SELECT
  COALESCE(i.wallet, o.wallet) as wallet,
  COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) as balance
FROM inflows i
FULL OUTER JOIN outflows o ON i.wallet = o.wallet
WHERE COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) > 0
ORDER BY balance DESC
LIMIT 15
```

### Address labeling CTE (reuse across all queries)

```sql
WITH known_labels AS (
  SELECT address, label FROM (VALUES
    (0x8894e0a0c962cb723c1976a4421c95949be2d4e3, 'Binance Hot Wallet'),
    (0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c, 'Lista DAO Collateral'),
    (0x4109415de2271097fb5fa16af8a753aab8c46d6f, 'Lista XAUT Vault'),
    (0x102407f67415dcc4068370625ca27f24bb2a03d5, 'Farmer #1 (5 Loops)'),
    (0xc9144683c0497b422ccfe9bcfba37855cc62c0b8, 'Farmer #2 (Multi-dir)'),
    (0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7, 'Multi-Protocol Farmer'),
    (0x04ab66f4511cf5dab9b68e06d53bfd0268d76963, 'Vault Depositor + Stables'),
    (0x624227ae1d072d03ae0361f6a71384dd92af80b4, 'Lista Depositor (4 pos)'),
    (0xc655e1a100a084d9ac91c269b0a7cb0e62263fcf, 'PancakeSwap XAUT LP'),
    (0x5754284f345afc66a98fbb0a0afe71e0f007b949, 'Tether Mint Intermediary'),
    (0xf2eb2aa3727187edd69285ce7e7fdfe2e494abce, 'Mint Distribution'),
    (0x0000000000000000000000000000000000000000, 'Mint / Burn (0x0)')
  ) AS t(address, label)
)
```

## Data Sources

| Source | What we got from it |
|---|---|
| Dune `tokens.transfers` | Supply tracking, holder balances, transfer flows, protocol TVL |
| Dune `dex.trades` | DEX trading volume and liquidity |
| DeBank `complex_protocol_list` | Wallet DeFi positions, strategy identification, health rates |
| Lista DAO UI (browser) | Live borrow rates (native + subsidized), LLTV, vault APY, utilization |
| Venus Flux UI (browser) | syrupUSDT yield, BTCB/U leverage rates |
| BscScan | Contract verification, address labeling |
| DexScreener | PancakeSwap XAUT LP TVL |

## Mistakes & Lessons Learned

1. **Assumed Venus had an XAUT market** — checked Venus API and browser
   extensively, found no XAUT market exists. Venus is used indirectly by
   farmers (deploy borrowed stables into Venus Flux). Always verify protocol
   support before assuming.

2. **Double-counted supply** — initial dashboard showed "Lista DAO" and
   "Active farmers" as separate categories, but they're the same gold.
   Farmers deposit into Lista, so the XAUT in Lista IS the farmer's XAUT.
   Always trace the causal chain, not just the address balances.

3. **Presented dollar earnings instead of APY** — hedge funds don't care that
   "Farmer #1 earns $225K." They care that the strategy yields 9% APY. Always
   compute percentage returns on equity, not absolute dollar amounts.

4. **updateDashboard is all-or-nothing** — the Dune MCP `updateDashboard`
   tool replaces ALL widgets. Omitting any widget deletes it. Must fetch
   full state with `getDashboard` first, then send everything back.

5. **Dune MCP parameter naming inconsistency** — `executeQueryById` uses
   `query_id` (snake_case) but `getExecutionResults` uses `executionId`
   (camelCase). Cost debugging time.

6. **"Morpho" vs "Lista DAO"** — Lista DAO is a Morpho Blue fork, but calling
   it "Morpho" on the dashboard confused users. Use the protocol's own name,
   not the underlying codebase.

7. **Rates change fast** — borrow rates shifted from -14.57% to -8.84% on the
   XAUt/USD1 market within 3 days. Always re-check rates from the protocol UI
   before presenting them as current.
