---
title: Lista DAO on BSC — DeFi Yield Strategy Analysis
topic: Lista DAO
chain: BSC
verified: 2026-04-17
tags: [lista-dao, yield, strategies, looping, apy]
---

# Lista DAO on BSC — DeFi Yield Strategy Analysis

**Research Date:** April 17–18, 2026
**Data Sources:** Dune Analytics, DeBank Pro API, lista-dao.org (browser-verified), BscScan (contract-verified), Pendle V2 API
**Methodology:** Market discovery → browser audit of all 32 vaults → Dune for holder analysis → DeBank for wallet profiling → strategy classification

---

## Protocol Overview

Lista DAO is a three-pillar DeFi protocol on BNB Chain:

1. **Liquid Staking (slisBNB)** — Stake BNB, receive yield-bearing slisBNB (~4.5–7% APY). 930K supply, 375K holders.
2. **Moolah Lending (Morpho Blue)** — Supply/borrow BNB, stablecoins, and other assets. 32 vaults across 4 zones (Classic, CDP, Alpha, Aster).
3. **CDP System (lisUSD)** — Collateralize BNB/slisBNB → mint lisUSD stablecoin. Rebranded from HAY.

**Total Protocol TVL:** $1.93B (browser-verified April 2026)
- Lending TVL: $885M
- Liquid Staking TVL: $617M
- CDP TVL: $402M
**Total Borrowed:** $237M

---

## Top 5 Markets by TVL

| # | Market | TVL | APY | Product Type | Description |
|---|--------|-----|-----|-------------|-------------|
| 1 | slisBNB Liquid Staking | $617M | 4.5–7.0% | Liquid Staking | Stake BNB → slisBNB (930K supply, 375K holders). Accrues staking rewards + Binance Launchpool yield |
| 2 | CDP System (total collateral) | $402M | 1.5% borrow rate | CDP / Stablecoin | $402M collateral locked. 76M lisUSD minted ($76M mcap, 28.8K holders). lisUSD Saving pays 1.55% |
| 3 | Lista BNB Vault | $318M | 0.24% | Lending (Supply) | 495K BNB deposited, 17.8% utilization. Low APY from low borrowing demand |
| 4 | Lista USDT Vault | $139M | 0.94% | Lending (Supply) | 138.6M USDT deposited, 63.5% utilization. Highest util among major vaults |
| 5 | Lista U Vault | $69M | 0.35% | Lending (Supply) | 69.2M U deposited, 49.3% utilization |

**Full Vault Inventory (32 vaults, browser-verified):**

Classic Zone (20 vaults):
| Vault | Deposited | Utilization | APY |
|-------|-----------|-------------|-----|
| Lista BNB Vault | 495K BNB ($318.4M) | 17.8% | 0.24% |
| Lista USDT Vault | 138.6M USDT | 63.5% | 0.94% |
| Lista U Vault | 69.2M U ($69.5M) | 49.3% | 0.35% |
| Lista lisUSD Vault | 27.8M lisUSD ($27.9M) | 57.0% | 1.18% |
| Lista USDT Vault #2 | 6.95M USDT | 66.3% | 1.60% |
| Lista XAUT Vault | 603 XAUT ($1.48M) | 90.9% | **7.69%** |
| Pangolins USDT Vault | 3.0M USDT | 0.0% | 1.98% |
| Native USDT Vault | 1.0M USDT | 90.5% | 2.12% |
| Lista USDC Vault | 568K USDC | 3.7% | 0.04% |
| Hyperithm Lista X Vault | 359K XRP ($336K) | 84.0% | 1.07% |
| Solv-Exclusive USDT Vault | 378K USDT | 43.9% | 2.52% |
| Lista BTCB Vault | 1.08 BTCB ($83K) | 0.3% | 0.00% |
| Solv-Exclusive BNB Vault | 87 BNB ($56K) | 0.0% | 0.00% |
| MEV BNB Vault | 62 BNB ($40K) | 45.5% | 0.89% |
| Steratera Vault USDT | 17K USDT | 0.0% | 3.21% |
| Pangolins BNB Vault | 7.3 BNB ($4.7K) | 0.0% | 2.08% |
| Loop BNB Vault | 4.6 BNB ($2.9K) | 0.0% | 2.08% |
| Aster Vault | 1.34K ASTER ($949) | 92.2% | 1.83% |
| Lista USD1 Vault | 306 USD1 ($306) | 27.9% | 3.42% |
| Lorenzo Exclusive Vault | 72 USD1 | 0.0% | 0.00% |

CDP Zone (2 vaults):
| Vault | Deposited | Curator | APY |
|-------|-----------|---------|-----|
| Stable Pool | 11.06M USDT ($11.1M) | Lista DAO | **4.71%** |
| lisUSD Saving | 21.27M lisUSD | Lista DAO | 1.55% |

Alpha Zone (8 vaults):
| Vault | Deposited | Utilization | APY |
|-------|-----------|-------------|-----|
| B2 Vault | 60K B2 | 0.0% | 0.00% |
| B Vault | 1.7K B ($755K) | 0.0% | 0.00% |
| Puffer Vault | 252K PUFFER ($613K) | 50.7% | 0.68% |
| AB Vault | 701M AB ($87K) | 0.0% | 0.00% |
| SPA Vault | 5M SPA ($16K) | 0.0% | 0.00% |
| Take Vault | 201K TAKE | 0.0% | 0.00% |
| OIK Vault | 1.29M OIK ($403) | 0.0% | 0.00% |
| EGL3 Vault | 270 EGL3 ($536) | 0.0% | 0.00% |

Aster Zone (2 vaults):
| Vault | Deposited | Utilization | APY |
|-------|-----------|-------------|-----|
| CDL Vault | 10.6M CDL | 1.5% | **9.29%** |
| APRO Vault | 6.26K AT ($1K) | 0.0% | 0.00% |

---

## Key Contract Addresses (BscScan-Verified)

| Contract | Address | BscScan Verified | Notes |
|----------|---------|------------------|-------|
| slisBNB Token | 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B | ✅ "Staked Lista BNB (slisBNB)" | 930K supply, 375K holders |
| StakeManager | 0x1adB950d8bB3dA4bE104211D5AB038628e477fE6 | ✅ | Lista DAO: Deployer |
| lisUSD Token | 0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5 | ✅ "Lista USD (lisUSD)" | 76.3M supply, 28.8K holders. Rebranded from HAY |
| LISTA Token | 0xFceB31A79F71AC9CBDCF853519c1b12D379EdC46 | ✅ "Lista DAO (LISTA)" | 1B max supply, 142K holders |
| veLISTA | 0xd0C380D31DB43CD291E2bbE2Da2fD6dc877b87b3 | — | Governance lock |
| Moolah (Core) | 0x8F73b65B4caAf64FBA2aF91cC5D4a2A1318E5D8C | ✅ "Lista DAO: Moolah" | BEP-1155 contract (Morpho Blue uses ERC-1155 for market positions) |
| MoolahVault(WBNB) | 0x57134a64B7cD9F9eb72F8255A671F5Bf2fe3E2d0 | ✅ "Lista DAO: Moolah Vault (WBNB)" | 15.8K+ transactions |
| MoolahVault(USD1) | 0xfa27f172e0b6ebcEF9c51ABf817E2cb142FbE627 | — | Nearly empty ($306 currently) |
| MoolahVaultFactory | 0x2a0Cb6401FD3c6196750dc6b46702040761D9671 | — | Factory contract |

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
- **Lista Positions:** 243K BNB in Lista BNB Vault ($156M supply, 0.24% APY), 38K BNB staked as slisBNB ($24M), 119M USD1 in vault ($119M), SolvBTC+BTCB ($775K)
- **Other Protocols:** Venus — 20K BNB + 30M USDT + 10 BTCB ($44M supply)
- **Strategy:** Massive BNB + stablecoin lending supply across Lista and Venus for diversified yield
- **Estimated Yield:** ~0.24% on $156M BNB lending = ~$374K + slisBNB staking + USD1 yields ≈ ~$1.4M/yr total (lending rates much lower than previously reported)

### 0x18709e89bd403f470088abdacebe86cc60dda12e — Exchange / Institutional ($1.58B)
- **Total Portfolio:** $1,582,496,050
- **Lista Positions:** 43.7M U supplied ($43.7M, 0.35% APY), 1.08M USD1 ($1.08M), 7K BNB ($4.5M, 0.24% APY)
- **Strategy:** Treasury deployment of idle reserves into Lista vaults — safety/liquidity focus, not yield maximization
- **Estimated Yield:** ~0.35% on $43.7M U + 0.24% on $4.5M BNB = ~$164K/yr (very low yield suggests capital parking for safety)

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
- **Lista Positions:** 6.65M USDT in Lista vault ($6.65M, 0.94% APY), 508K lisUSD + 220K USDT in LP ($728K), 20K U ($20K)
- **Strategy:** Multi-layer stablecoin yield: USDT lending (0.94%) + lisUSD/USDT LP farming
- **Estimated Yield:** ~0.94% on $6.65M USDT ($62.5K) + LP fees on $728K ≈ ~$100K/yr

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

### 2. BNB Lending Supply — 0.24% APY, Very Low Risk
- **What:** Supply BNB to Lista BNB Vault → earn interest from borrowers
- **Why:** Capital preservation in deep-liquidity vault. $318M deposited, only 17.8% utilization — very low APY.
- **Who:** 0xac3e ($156M in vault) — largest single depositor
- **Capital needed:** Any amount
- **Note:** Low APY suggests suppliers prioritize safety/liquidity over returns

### 3. Stablecoin Lending (USDT/U) — 0.35–0.94% APY, Very Low Risk
- **What:** Supply USDT or U to Lista vaults → earn interest
- **Why:** Low-risk dollar yield. USDT (0.94%, 63.5% util) > U (0.35%, 49.3% util). A 2nd USDT vault pays 1.60%.
- **Who:** 0x18709e ($43.7M U vault), 0x1d60 ($6.65M USDT)
- **Capital needed:** Any amount

### 3a. Stable Pool (USDT, CDP Zone) — 4.71% APY, Low Risk
- **What:** Deposit USDT into the Stable Pool in the CDP Zone
- **Why:** Significantly higher yield than main USDT vault. $11.1M deposited, curated by Lista DAO.
- **Capital needed:** Any amount

### 3b. lisUSD Saving — 1.55% APY, Low Risk
- **What:** Deposit lisUSD into the lisUSD Saving vault (CDP Zone)
- **Why:** Passive yield on lisUSD. $21.3M deposited.
- **Capital needed:** Any amount

### 4. CDP + lisUSD Farming — 5–15%+ APY, Medium Risk
- **What:** Collateralize BNB/slisBNB → borrow lisUSD → deploy to LP pools → earn LP fees + LISTA rewards
- **Why:** Access dollar liquidity without selling BNB. Multiple yield layers.
- **Who:** 0x1d60 ($728K lisUSD/USDT LP)
- **Capital needed:** $5K+ recommended
- **Liquidation risk:** Yes, if collateral value drops

### 5. Leveraged slisBNB Loop — 8–15%+ APY, High Risk
- **What:** Stake BNB → slisBNB → deposit as collateral on Moolah → borrow BNB → restake → repeat
- **Why:** Amplifies the 4.5% base staking yield through leverage. BNB vault has only 17.8% utilization, so borrow cost is low (~2% variable).
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

1. **BNB holders want yield without selling.** slisBNB is the dominant on-ramp — stake BNB, maintain exposure, earn 4.5–7% passively. $617M TVL, 375K holders.

2. **Institutions need safe, deep-liquidity capital parking.** The Lista BNB Vault ($318M) offers massive capacity at 0.24% APY. The low yield signals that institutional depositors prioritize capital preservation, not returns.

3. **DeFi power users leverage their BNB.** The slisBNB loop (proven by $96M of slisBNB collateral in Moolah) amplifies yield from 4.5% to 8–15%+. Low BNB borrow cost makes this profitable.

4. **Stablecoin farmers seek higher yield via CDP Zone.** The Stable Pool (4.71% on USDT) dramatically outperforms the main USDT vault (0.94%). lisUSD Saving pays 1.55%.

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

2. **Institutional money prioritizes safety, not yield.** A $500M whale has $156M in the BNB vault earning just 0.24% APY (~$374K/yr). A $1.58B exchange wallet earns 0.35% on $43.7M. These wallets are parking capital in deep-liquidity vaults, not maximizing returns.

3. **Lending vault APYs are very low.** BNB Vault: 0.24% (17.8% util), U Vault: 0.35% (49.3% util), USDT Vault: 0.94% (63.5% util). Low utilization = low APY. The real yield is in slisBNB staking (4.5-7%), CDP Zone products (4.71% Stable Pool), and leverage strategies.

4. **The slisBNB leverage loop is massive.** Moolah holds 149,581 slisBNB (~$96M) as collateral, proving systematic leveraged staking is a major use case. Low BNB borrow cost (17.8% utilization) makes this profitable.

5. **CDP Zone is the hidden yield gem.** The Stable Pool pays 4.71% on USDT (vs 0.94% in the main USDT vault) and lisUSD Saving pays 1.55%. These products are under-discovered relative to their yield.

6. **lisUSD is under-utilized.** The #2 holder has $12.3M in lisUSD sitting idle (no farming). Only $76M minted against $402M collateral — significant unused borrowing capacity.

7. **32 vaults across 4 zones, but TVL is heavily concentrated.** Top 3 vaults (BNB, USDT, U) hold 97% of lending TVL. Alpha Zone and Aster Zone vaults are largely empty.

8. **XAUT Vault is a yield outlier.** 7.69% APY with 90.9% utilization on just $1.48M — the highest-yielding Classic Zone vault. Small capacity limits its usefulness for large capital.

9. **Exchange treasuries trust Lista.** Wallets with $1.58B and $1.27B deploy funds to Lista vaults — a validation of Moolah's security (Morpho Blue-based).

10. **Pendle extends Lista's reach.** PT-slisBNBx is Pendle BSC's flagship market ($8.3M TVL), connecting Lista's liquid staking to fixed-income DeFi.
