# Lista DAO on BSC — DeFi Yield Strategy Analysis

**Research Date:** April 18, 2026
**Data Sources:** Dune Analytics, DeBank Pro API, DefiLlama, Lista DAO docs, Pendle V2 API
**Methodology:** Market discovery → Dune for holder analysis → DeBank for wallet profiling → strategy classification

---

## Protocol Overview

Lista DAO is a three-pillar DeFi protocol on BNB Chain:

1. **Liquid Staking (slisBNB)** — Stake BNB, receive yield-bearing slisBNB (~4.5–7% APY)
2. **Moolah Lending (Morpho Blue)** — Supply/borrow BNB, stablecoins, and other assets (28 vaults, 152 markets)
3. **CDP System (lisUSD)** — Collateralize BNB/slisBNB → mint lisUSD stablecoin

**Total Protocol TVL:** ~$1.5B across BNB Chain and Ethereum
**Key Metrics:** $9.2M annualized fees, $335M+ total borrowed, 1M+ users

---

## Top 5 Markets by TVL

| # | Market | TVL | APY | Product Type | Description |
|---|--------|-----|-----|-------------|-------------|
| 1 | slisBNB Liquid Staking | $660M | 4.5–7.0% | Liquid Staking | Stake BNB → slisBNB. Accrues staking rewards + Binance Launchpool yield |
| 2 | Moolah BNB Vault | $424M | 2.11% | Lending (Supply) | Supply BNB → earn interest from borrowers using slisBNB/BTCB collateral |
| 3 | Moolah USD1 Vault | $162M | 2.11% | Lending (Supply) | Supply USD1 stablecoin → earn interest |
| 4 | lisUSD CDP System | $76M | 1.16% + farming | CDP / Stablecoin | Collateralize BNB/slisBNB → mint lisUSD → farm/LP |
| 5 | Moolah USDT Vault | $24M | 3.66% | Lending (Supply) | Supply USDT → higher interest due to strong borrowing demand |

**Additional vaults of note:**
- Pangolins USDT Vault (pUSDT): $16.5M, 4.36% APY
- Solv-Exclusive BNB Vault: $12.2M, 3.69% APY
- Lista BTCB Vault: $93.6K, 1.73% APY

---

## Key Contract Addresses

| Contract | Address |
|----------|---------|
| slisBNB Token | 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B |
| StakeManager | 0x1adB950d8bB3dA4bE104211D5AB038628e477fE6 |
| lisUSD Token | 0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5 |
| LISTA Token | 0xFceB31A79F71AC9CBDCF853519c1b12D379EdC46 |
| veLISTA | 0xd0C380D31DB43CD291E2bbE2Da2fD6dc877b87b3 |
| Moolah (Core) | 0x8F73b65B4caAf64FBA2aF91cC5D4a2A1318E5D8C |
| MoolahVault(WBNB) | 0x57134a64B7cD9F9eb72F8255A671F5Bf2fe3E2d0 |
| MoolahVault(USD1) | 0xfa27f172e0b6ebcEF9c51ABf817E2cb142FbE627 |
| MoolahVaultFactory | 0x2a0Cb6401FD3c6196750dc6b46702040761D9671 |

---

## Top Holders (Dune Analytics)

### slisBNB Top Holders (Query 7334391)

| Rank | Wallet | slisBNB Balance | Identity |
|------|--------|----------------|----------|
| 1 | 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c | 149,581 | **Moolah Contract** (slisBNB used as collateral) |
| 2 | 0x91e49983598685dd5acac90ceb4061a772f6e5ae | 59,900 | slisBNB Token Contract |
| 3 | 0xac3e216bd55860912062a4027a03b99587b7ffc7 | 36,787 | $500M Institutional Whale |
| 4 | 0x3d325df6debb6aa237591a348ecb511354f3607d | 21,333 | Pure BNB Staker ($14.2M) |
| 5 | 0xb2a6a72843db0f508204a56448413f3867ea691a | 16,455 | Pure BNB Staker ($10.9M) |
| 6 | 0x9c580fed6c26dcc06ca7673e72489d8f4ddba0b8 | 9,672 | Multi-staking Diversifier ($13.5M) |
| 7 | 0x1adb950d8bb3da4be104211d5ab038628e477fe6 | 5,774 | StakeManager Contract |
| 8 | 0x128463a60784c4d3f46c23af3f65ed859ba87974 | 5,636 | Exchange/Custodian ($1.27B) |

**Key finding:** Moolah holds 149,581 slisBNB (~$96M) as collateral — this is the slisBNB leverage loop in action. Users deposit slisBNB → borrow BNB → restake.

### lisUSD Top Holders (Query 7334392)

| Rank | Wallet | lisUSD Balance | Identity |
|------|--------|---------------|----------|
| 1 | 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c | $11.78M | Moolah Contract |
| 2 | 0xaa57f36dd5ef2ac471863ec46277f976f272ec0c | $7.10M | lisUSD Whale (pure holder, no DeFi) |
| 3 | 0x1d60bbbef79fb9540d271dbb01925380323a8f66 | $2.02M | Stablecoin Farmer |

### Moolah BNB Vault Top Depositors (Query 7334394)

| Rank | Wallet | Vault Shares | Identity |
|------|--------|-------------|----------|
| 1 | 0xac3e216bd55860912062a4027a03b99587b7ffc7 | 189,864 | $500M Institutional Whale |
| 2 | 0x18709e89bd403f470088abdacebe86cc60dda12e | 6,892 | Exchange ($1.58B) |

---

## Wallet Deep Dives (DeBank Verified)

### 0xac3e216bd55860912062a4027a03b99587b7ffc7 — Mega-whale / Institutional ($500M)
- **Total Portfolio:** $500,447,191
- **Lista Positions:** 243K BNB in Moolah Vault ($156M supply), 38K BNB staked as slisBNB ($24M), 119M USD1 in vault ($119M), SolvBTC+BTCB ($775K)
- **Other Protocols:** Venus — 20K BNB + 30M USDT + 10 BTCB ($44M supply)
- **Strategy:** Massive BNB + stablecoin lending supply across Lista and Venus for diversified lending yield
- **Estimated Yield:** ~2.1% on $156M BNB + ~2.1% on $119M USD1 = ~$5.8M/yr

### 0x18709e89bd403f470088abdacebe86cc60dda12e — Exchange / Institutional ($1.58B)
- **Total Portfolio:** $1,582,496,050
- **Lista Positions:** 43.7M U supplied ($43.7M), 1.08M USD1 ($1.08M), 7K BNB ($4.5M)
- **Strategy:** Treasury deployment of idle reserves into Lista vaults for safe yield
- **Estimated Yield:** ~2.1% on $49M = ~$1M/yr

### 0x3d325df6debb6aa237591a348ecb511354f3607d — Pure BNB Staker ($14.2M)
- **Total Portfolio:** $14,169,230
- **Lista Positions:** 22,091 BNB staked via slisBNB ($14.2M). Single protocol, single asset.
- **Other Protocols:** None — 100% Lista DAO
- **Strategy:** All-in BNB staking for simplicity and maximum slisBNB yield
- **Estimated Yield:** ~4.5-7% on $14.2M = $640K–$990K/yr

### 0x9c580fed6c26dcc06ca7673e72489d8f4ddba0b8 — Multi-staking Diversifier ($13.5M)
- **Total Portfolio:** $13,547,779
- **Lista Positions:** 10,016 BNB in slisBNB ($6.4M)
- **Other Protocols:** BNB Chain native staking — 9,101 BNB ($5.8M), Aster — 2,004 BNB ($1.3M)
- **Strategy:** BNB staking diversified across 3 protocols (Lista + native + Aster) to reduce single-protocol risk
- **Estimated Yield:** Blended ~3.8% on $13.5M = ~$515K/yr

### 0xb2a6a72843db0f508204a56448413f3867ea691a — Pure BNB Staker ($10.9M)
- **Total Portfolio:** $10,929,341
- **Lista Positions:** 17,040 BNB staked as slisBNB ($10.9M). Zero diversification.
- **Other Protocols:** None — 100% Lista DAO
- **Strategy:** Single-asset, single-protocol conviction bet on BNB staking yield
- **Estimated Yield:** ~4.5-7% on $10.9M = $490K–$765K/yr

### 0x128463a60784c4d3f46c23af3f65ed859ba87974 — Exchange / Custodian ($1.27B)
- **Total Portfolio:** $1,266,243,119
- **Lista Positions:** 5,976 BNB staked ($3.8M)
- **Other Protocols:** Aster — 101.5M USDT ($101.6M) + 40K BNB ($25.9M)
- **Strategy:** Small Lista allocation from massive exchange treasury
- **Estimated Yield:** ~4.5% on $3.8M = ~$171K/yr

### 0x1d60bbbef79fb9540d271dbb01925380323a8f66 — Stablecoin Farmer ($14.7M)
- **Total Portfolio:** $14,721,298
- **Lista Positions:** 6.65M USDT in Lista vault ($6.65M), 508K lisUSD + 220K USDT in LP ($728K), 20K U ($20K)
- **Strategy:** Multi-layer stablecoin yield: USDT lending (3.66%) + lisUSD/USDT LP farming
- **Estimated Yield:** ~3.66% on USDT ($243K) + LP fees on $728K ≈ ~$280K/yr

### 0xbe8d5933a138f3aae2f60c4c43de3368defae206 — Mid-size BNB Staker ($2.56M)
- **Total Portfolio:** $2,557,999
- **Lista Positions:** 3,391 BNB staked ($2.17M)
- **Other Protocols:** Aster ($645), BounceBit ($8), Kernel DAO ($7)
- **Strategy:** Core BNB staking on Lista with tiny exploration of other protocols
- **Estimated Yield:** ~4.5-7% on $2.17M = ~$98K–$152K/yr

### 0xaa57f36dd5ef2ac471863ec46277f976f272ec0c — lisUSD Whale ($12.3M)
- **Total Portfolio:** $12,349,977
- **Lista Positions:** 12.35M lisUSD held directly (no protocol deployment)
- **Strategy:** Pure lisUSD holder, no farming or staking. Likely contract, market maker, or OTC desk.
- **Estimated Yield:** 0% (not deployed)

---

## 8 Yield Strategies Observed

### 1. Simple BNB Staking (slisBNB) — 4.5–7.0% APY, Low Risk
- **What:** Stake BNB → receive slisBNB → hold
- **Why:** Passive BNB staking yield without selling. Includes Binance Launchpool distributions.
- **Who:** 0x3d32 ($14.2M), 0xb2a6 ($10.9M) — 100% Lista, single asset
- **Capital needed:** Any amount

### 2. BNB Lending Supply — 2.11% APY, Low Risk
- **What:** Supply BNB to Moolah BNB Vault → earn interest from borrowers
- **Why:** Safe, predictable yield on idle BNB. Institutional grade.
- **Who:** 0xac3e ($156M in vault) — largest single depositor
- **Capital needed:** Any amount

### 3. Stablecoin Lending (USD1/USDT) — 2.11–3.66% APY, Very Low Risk
- **What:** Supply USD1 or USDT to Moolah vaults → earn interest
- **Why:** Low-risk dollar yield. USDT pays more (3.66%) due to higher borrow demand.
- **Who:** 0x18709e ($43.7M U vault), 0x1d60 ($6.65M USDT)
- **Capital needed:** Any amount

### 4. CDP + lisUSD Farming — 5–15%+ APY, Medium Risk
- **What:** Collateralize BNB/slisBNB → borrow lisUSD → deploy to LP pools → earn LP fees + LISTA rewards
- **Why:** Access dollar liquidity without selling BNB. Multiple yield layers.
- **Who:** 0x1d60 ($728K lisUSD/USDT LP)
- **Capital needed:** $5K+ recommended
- **Liquidation risk:** Yes, if collateral value drops

### 5. Leveraged slisBNB Loop — 8–15%+ APY, High Risk
- **What:** Stake BNB → slisBNB → deposit as collateral on Moolah → borrow BNB → restake → repeat
- **Why:** Amplifies the 4.5% base staking yield through leverage
- **Evidence:** Moolah holds 149,581 slisBNB (~$96M) as collateral from borrowers
- **Capital needed:** $10K+ recommended
- **Liquidation risk:** Yes, if slisBNB/BNB depeg

### 6. Multi-protocol BNB Diversification — 3–5% blended, Low-Medium Risk
- **What:** Split BNB across Lista slisBNB + native BNB staking + Aster
- **Why:** Reduce single-protocol smart contract risk while maintaining yield
- **Who:** 0x9c58 ($13.5M across 3 protocols)
- **Capital needed:** $50K+ for meaningful diversification

### 7. slisBNB → Pendle Fixed Yield — 3.06% fixed, Low Risk
- **What:** Stake BNB → slisBNB → buy PT-slisBNBx on Pendle → hold to maturity
- **Why:** Lock in guaranteed fixed yield with zero variable rate risk
- **Who:** 0x6d3b ($424K PT position from Pendle research)
- **Capital needed:** $1K+

### 8. Venus + Lista Dual Supply — 2–3% combined, Low Risk
- **What:** Supply BNB to both Venus and Lista for protocol-diversified lending yield
- **Why:** Smart contract diversification across two blue-chip BSC lending protocols
- **Who:** 0xac3e ($156M Lista + $44M Venus)
- **Capital needed:** $50K+ for meaningful split

---

## Why People Use Lista DAO on BSC

1. **BNB holders want yield without selling.** slisBNB is the dominant on-ramp — stake BNB, maintain exposure, earn 4.5–7% passively.

2. **Institutions need safe, large-capacity yield.** The Moolah BNB Vault ($424M) and USD1 Vault ($162M) accept hundreds of millions with predictable 2.11% returns.

3. **DeFi power users leverage their BNB.** The slisBNB loop (proven by $96M of slisBNB collateral in Moolah) amplifies yield from 4.5% to 8–15%+.

4. **Stablecoin farmers seek multi-layer yield.** CDP → lisUSD → LP farming creates 3 yield sources: staking, borrowing arbitrage, and LP fees.

5. **Risk-averse users diversify across protocols.** Multi-staking across Lista + native + Aster reduces single-protocol risk.

6. **Pendle integration enables fixed yields.** PT-slisBNBx on Pendle locks in 3.06% — no surprises, capital-certain returns.

---

## Dune Query IDs

| ID | Name | Purpose |
|----|------|---------|
| 7334391 | Top slisBNB holders | Identify largest slisBNB stakers |
| 7334392 | Top lisUSD holders | Identify largest lisUSD holders/farmers |
| 7334394 | Top Moolah BNB Vault depositors | Identify largest BNB lending suppliers |
| 7334395 | Top LISTA token holders | Identify governance participants |

---

## Key Insights

1. **Simple staking dominates.** The two largest non-institutional wallets ($14.2M and $10.9M) just stake BNB → slisBNB and hold. No leverage, no farming, no complexity.

2. **Institutional money prefers lending.** A $500M wallet has $156M in the BNB vault + $119M in USD1. Safe, predictable, large-capacity — earning ~$5.8M/yr.

3. **The slisBNB leverage loop is massive.** Moolah holds 149,581 slisBNB (~$96M) as collateral, proving systematic leveraged staking is a major use case.

4. **lisUSD is under-utilized.** The #2 holder has $12.3M in lisUSD sitting idle (no farming). The smart play is CDP → lisUSD → LP, but few do it.

5. **Exchange treasuries trust Lista.** Wallets with $1.58B and $1.27B deploy funds to Lista vaults — a validation of Moolah's security (Morpho Blue-based).

6. **Pendle extends Lista's reach.** PT-slisBNBx is Pendle BSC's flagship market ($8.3M TVL), connecting Lista's liquid staking to fixed-income DeFi.

7. **USDT pays more than USD1.** Moolah USDT Vault (3.66% APY) beats USD1 Vault (2.11%) due to stronger borrowing demand for USDT — a signal for stablecoin allocators.
