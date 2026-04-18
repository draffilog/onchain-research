---
title: BSC Mid-Size DeFi Users — Active Strategy Analysis ($100K–$500K)
topic: BSC users
chain: BSC
verified: 2026-04-18
tags: [bsc, wallets, strategies, moolah, debank]
---

# BSC Mid-Size DeFi Users — Active Strategy Analysis ($100K–$500K)

**Research Date:** April 17–18, 2026
**Data Sources:** Dune Analytics (custom queries), DeBank Pro API (wallet profiling), lista-dao.org (browser-verified)
**Methodology:** Dune query for active Moolah borrowers using 2+ tokens → DeBank total balance filter ($100K–$500K) → deep DeFi position profiling
**Focus:** What are real mid-size DeFi users doing on BSC, what opportunities they exploit, what risks they take

---

## Why Mid-Size Users ($100K–$500K)?

Our previous research profiled whales ($2M–$1.5B). They mostly just park capital in lending vaults at 0.24% APY. That tells us nothing about DeFi opportunities.

Mid-size users ($100K–$500K) are the **real DeFi strategists**:
- Large enough to justify gas costs and complexity
- Small enough to care about yield optimization
- Actively manage positions, not just park and forget
- Use multiple protocols and collateral types
- Take calculated risks (tight health factors, leverage loops)

---

## Wallet Profiles

### 1. `0x0d050167639ec5cdccc4368448d4d609fe632d22` — The Full-Stack Yield Farmer

**Portfolio:** $215,322 (99.8% on BSC)

| Protocol | Position | Size | APY / Notes |
|----------|----------|------|-------------|
| Lista DAO | Staked BNB → slisBNB | 194.6 BNB ($125,401) | ~4.5–7% staking APY |
| Lista DAO | slisBNB collateral → borrow U | Supply $166,713 / Borrow $81,867 | Health: ~2.14 |
| Lista DAO | LISTA governance lock | 20,547 LISTA ($1,944) | Voting power + rewards |
| PancakeSwap | XNY/BNB LP | $1,994 | LP fees + farming |

**Strategy:** Yield stacking across 4 layers:
1. Earn slisBNB staking APR (4.5–7%) on $125K
2. Leverage slisBNB as collateral to borrow U (0.35% cost) and deploy borrowed stablecoins
3. Participate in LISTA governance for long-term protocol alignment
4. Small PancakeSwap LP position for additional income

**Estimated yield:** ~$7K–$10K/yr from staking + net lending spread + LP fees
**Risk level:** Medium (conservative health factor of ~2.14)
**Key insight:** This is what a disciplined mid-size DeFi farmer looks like — stacking yield layers while keeping leverage conservative.

---

### 2. `0x3ebf2da441af6219c709bb195d5a3527051f94a2` — The Multi-Collateral Borrower

**Portfolio:** $252,104 (100% BSC)

| Protocol | Position | Size | Health Factor |
|----------|----------|------|---------------|
| Lista DAO | slisBNB → borrow U | Supply $176,997 / Borrow $70,979 | 2.14 |
| Lista DAO | BTCB → borrow U | Supply $77,141 / Borrow $39,988 | 1.66 |

**Strategy:** Two-asset lending with diversified collateral:
- Uses both slisBNB and BTCB as separate collateral positions
- Borrows U stablecoin against both (~$111K total borrowed)
- Keeps slisBNB position conservative (2.14 health), BTCB slightly tighter (1.66)
- Total leverage ratio: ~44% LTV ($111K borrowed against $254K supplied)

**Estimated yield:** slisBNB appreciation (4.5–7%) on $177K + what they do with $111K borrowed U
**Risk level:** Medium (well-managed health factors, diversified collateral)
**Key insight:** Diversifying collateral types reduces correlated liquidation risk — if BNB drops, BTCB position may still be safe, and vice versa.

---

### 3. `0x2113cf56f29ad869cf445efb604d49b615e7ce10` — The Triple-Collateral Power User

**Portfolio:** $96,325 (99.97% BSC)

| Protocol | Position | Collateral → Borrow | Health Factor |
|----------|----------|---------------------|---------------|
| Lista DAO | slisBNB leverage loop | $59,893 slisBNB → $56,155 WBNB | **1.03** |
| Lista DAO | Gold lending | $158,835 XAUt → $92,973 U | 1.32 |
| Lista DAO | BTC lending | $56,842 BTCB → $32,814 U | 1.49 |
| Lista DAO | BNB staked | $2,669 | — |

**Strategy:** Aggressive triple-collateral leverage:
1. **slisBNB loop at 1.03 health** — maximum leverage on the slisBNB/WBNB spread. Borrows 94% of collateral value. One bad move = liquidation. This is pure yield amplification: ~4.5% base × 17x effective leverage.
2. **Gold (XAUt) as yield source** — deposits $159K of tokenized gold, borrows $93K U at 0.35% to deploy elsewhere. XAUt is uncorrelated to crypto.
3. **BTCB lending** — deposits $57K BTCB, borrows $33K U at conservative 1.49 health.

**Estimated yield:** Amplified slisBNB staking (~40-80% on the loop layer) + gold-backed borrowing spread
**Risk level:** **Very High** (1.03 health = ~3% from liquidation on slisBNB position)
**Key insight:** This user treats different assets differently — maximum aggression on the slisBNB loop (same-asset pair, low depeg risk), conservative on BTCB. The XAUt position is fascinating: using real-world gold to borrow cheap stablecoins on-chain.

---

### 4. `0xefa911756a790e0f9e806189dfa97e3fc96fb096` — The Stablecoin Arbitrageur

**Portfolio:** $463,248 (75% BSC, 25% ETH)

| Protocol | Position | Size | Health Factor |
|----------|----------|------|---------------|
| Lista DAO | USDT+USDC → borrow USD1 | Supply $668,139 / Borrow $631,938 | **1.02** |
| Lista DAO | sUSDe → borrow USD1 | Supply $70,650 / Borrow $63,368 | **1.02** |
| Venus | USDT → borrow BNB | Supply $25,012 / Borrow $16,108 | 1.24 |
| Venus Flux | USDT yield | $296,373 | Passive |

**Strategy:** Massive stablecoin rate arbitrage:
- Supplies $668K in USDT+USDC to Moolah, borrows $632K USD1 — capturing the spread between USDT/USDC supply rate and USD1 borrow cost.
- Both positions at **1.02 health** — razor-thin margin. Works because stablecoins rarely deviate significantly from each other.
- Parks $296K in Venus Flux for safe yield on the side.
- Also runs sUSDe (Ethena's yield-bearing stablecoin) → borrow USD1 at 1.02 health — double-dipping on sUSDe's built-in yield.

**Estimated yield:** Stablecoin spread (~0.5–1%) on $700K + Venus yield on $296K + sUSDe base yield (~5-10%)
**Risk level:** High on paper (1.02 health), but **low in practice** for stablecoin-vs-stablecoin positions. The real risk is a stablecoin depeg event.
**Key insight:** This is the professional stablecoin farmer playbook — maximize capital efficiency by borrowing at 98% LTV when both sides are stablecoins. The sUSDe play is clever: Ethena's stablecoin earns its own yield, which is *additional* to the borrowing spread.

---

### 5. `0x0821b576a2ee921d3c4b97a0f1158c2e8b633bd0` — The Protocol Explorer

**Portfolio:** $60,576 (100% BSC)

| Protocol | Position | Size | Health Factor |
|----------|----------|------|---------------|
| Lista DAO | slisBNB → borrow U | $21,469 / $12,996 | 1.42 |
| Lista DAO | slisBNB → borrow USDT | $50,272 / $35,013 | 1.23 |
| Lista DAO | XAUt → borrow USDT | $31,229 / $20,010 | 1.20 |
| Lista DAO | BTCB → borrow U | $23,095 / $14,996 | 1.32 |
| Lista DAO | USDT+USDC → borrow U | $10,830 / $9,969 | **1.05** |
| Bitway Earn | U staked | $12,581 | Fixed yield |
| Sign Protocol | SIGN locked | $2,821 | Vesting |

**Strategy:** Maximum diversification across 5 Moolah markets + 2 other protocols:
- Runs 5 separate lending positions on Lista with 4 different collateral types
- Different leverage levels per collateral: aggressive on stablecoin-to-stablecoin (1.05), moderate on slisBNB (1.23–1.42), moderate on XAUt/BTCB (1.20–1.32)
- Deploys borrowed U to Bitway Earn for additional yield
- Locks SIGN tokens (airdrop farming?)

**Estimated yield:** Blended staking + borrowing spread + Bitway Earn + SIGN rewards
**Risk level:** Medium-High (multiple positions mean more monitoring, but diversified)
**Key insight:** This user actively explores new BSC protocols (Bitway, Sign) while maintaining a core Lista lending portfolio. They treat each collateral type independently with appropriate risk levels.

---

### 6. `0x8464750e0f199f4ffeeb7d46cc3a016bf7340626` — The Cross-Chain Strategist

**Portfolio:** $90,158 (53% ETH, 35% BSC, 10% Arbitrum)

| Protocol | Position | Size | Health Factor |
|----------|----------|------|---------------|
| Lista DAO | XAUt → borrow U | $4,811 / $3,099 | 1.20 |
| Lista DAO | USDT+USDC → borrow U | $9,942 / $9,198 | **1.05** |
| Lista DAO | BTCB → borrow USDT | $20,803 / $11,004 | 1.63 |
| Euler | USD1 yield | $2,351 | Passive |
| Venus Flux | USDT yield | $17,248 | Passive |

**Strategy:** Multi-chain + multi-protocol with selective aggression:
- BSC is one leg of a broader multi-chain portfolio (also active on ETH and Arbitrum)
- Uses 3 different collateral types on Lista with varying health factors
- Stablecoin-to-stablecoin position at tight 1.05 health
- Distributes yield across Lista, Euler, and Venus — protocol diversification
- Only 35% of portfolio on BSC — rest presumably running similar strategies on ETH/Arb

**Key insight:** Sophisticated user who doesn't put all eggs in one chain or protocol. Uses BSC for its cheaper gas and specific Moolah markets (XAUt, BTCB) while maintaining diversified exposure.

---

### 7. `0x88a0641c1fbff74b99d460c440369f44dd432af9` — The Multi-Chain slisBNB Leverager

**Portfolio:** $1,155,757 total (40% ETH, 40% Arb, 19% BSC)
**BSC portion:** $219,085

| Protocol | Position | Size | Health Factor |
|----------|----------|------|---------------|
| Lista DAO | slisBNB → borrow USDT | $336,550 / $120,043 | 2.41 |

**Strategy:** Conservative slisBNB leverage on BSC, aggressive DeFi elsewhere:
- BSC allocation: single large slisBNB position with comfortable 2.41 health
- Borrows $120K USDT against $337K slisBNB — classic leverage play
- Most of their capital is on ETH and Arbitrum (presumably running similar strategies there)

**Key insight:** Large multi-chain DeFi user who uses Lista as one leg. The conservative health factor (2.41) suggests they've been through liquidation events before and now favor safety.

---

### 8. `0x3b4d81d3e654760d9ba541bc686e73c0678d62e6` — The Gold Arbitrageur

**Portfolio:** $18,688 (51% BSC, 49% ETH) — *below target range but unique strategy*

| Protocol | Position | Direction | Health Factor |
|----------|----------|-----------|---------------|
| Lista DAO | BTCB → borrow XAUt | $14,598 / $9,868 | 1.11 |
| Lista DAO | XAUt → borrow USDT | $12,753 / $9,006 | 1.09 |
| Lista DAO | USDT+USDC → borrow XAUt | $3,925 / $2,888 | 1.09 |

**Strategy:** Unique gold (XAUt) circular arbitrage:
- Borrows XAUt against BTCB (betting BTC rises faster than gold)
- Simultaneously supplies XAUt to borrow USDT (recycling gold exposure)
- Also borrows XAUt against stablecoins (betting gold falls or capturing rate differential)
- All three positions involve XAUt on different sides — this is active gold/crypto relative value trading

**Key insight:** Only wallet we found actively trading the XAUt markets on both sides. The XAUT Vault has 90.9% utilization and 7.69% APY precisely because of this kind of active borrowing demand. This is an opportunity most BSC users don't even know exists.

---

## Strategies & Opportunities Map

### Strategy 1: slisBNB Leverage Loop
**Who does it:** 0x2113, 0x88a0, 0x0d05, 0x3ebf
**How:** Supply slisBNB → borrow WBNB/USDT → buy more slisBNB → repeat
**APY:** 4.5% base × leverage multiplier. At 1.03 health (~17x effective): **40-80% theoretical APY**
**Risk:** Liquidation on slisBNB/BNB depeg. Health 1.03 = 3% from liquidation
**Opportunity:** BNB vault has only 17.8% utilization → borrow cost is very low (~2% variable). The spread between slisBNB yield (4.5-7%) and BNB borrow cost (~2%) is the profit engine.

### Strategy 2: Multi-Collateral Diversified Lending
**Who does it:** 0x0821, 0x2113, 0x3ebf, 0x8464
**How:** Separate positions with slisBNB + BTCB + XAUt as collateral, borrow stablecoins
**APY:** Varies per collateral — slisBNB yield + borrowing spread on all positions
**Risk:** Diversified — no single collateral crash kills all positions
**Opportunity:** Each collateral has different liquidation correlation. XAUt (gold) is uncorrelated with crypto — powerful hedging tool. Few users even know XAUt is available on Moolah.

### Strategy 3: Stablecoin Rate Arbitrage
**Who does it:** 0xefa9, 0x0821, 0x8464, 0x315c
**How:** Supply USDT/USDC → borrow USD1 or U at lower rates. Deploy at 98% LTV (health 1.02)
**APY:** 0.5-1.5% spread on massive size. 0xefa9 runs $700K through this
**Risk:** Stablecoin depeg (rare but catastrophic at 1.02 health). Smart contract risk.
**Opportunity:** Moolah's USDT vault (0.94%) + USD1/U borrow rates create an exploitable spread. Works best at scale where even 0.5% = meaningful dollar return.

### Strategy 4: Gold (XAUt) Market Plays
**Who does it:** 0x3b4d, 0x2113, 0x0821
**How:** Supply XAUt as collateral → borrow stablecoins, or borrow XAUt against BTC
**APY:** XAUT Vault pays **7.69% APY** to suppliers (90.9% utilization). Borrowers pay ~10-12%.
**Risk:** Gold price volatility (moderate), smart contract risk
**Opportunity:** **This is the hidden gem.** The XAUT vault is tiny ($1.48M) with massive utilization. XAUt is Tether Gold — backed by physical gold. Using it as DeFi collateral is an under-explored strategy. The 7.69% supply APY is the highest among Classic Zone vaults.

### Strategy 5: Yield Layer Stacking
**Who does it:** 0x0d05
**How:** BNB staking + slisBNB lending + LP farming + governance participation
**APY:** Stacked: ~4.5-7% (staking) + lending spread + LP fees + LISTA rewards
**Risk:** Low-Medium (conservative health factors, diversified yield sources)
**Opportunity:** Most mid-size users only do 1-2 layers. Adding governance participation (LISTA locking) captures protocol incentives that most users ignore.

### Strategy 6: Cross-Protocol Yield Distribution
**Who does it:** 0x8464, 0x0821
**How:** Split between Lista, Venus, Euler, Bitway Earn for protocol diversification
**APY:** Blended across protocols
**Risk:** Lower (protocol diversification reduces smart contract risk)
**Opportunity:** Different protocols offer different rates at different times. Active users rotate capital to wherever rates are highest. Bitway Earn and Euler are newer BSC protocols that sometimes offer promotional rates.

---

## Key Findings

1. **Mid-size users are far more sophisticated than whales.** Whales park $156M at 0.24% APY. A $96K user runs triple-collateral leverage with gold, BTC, and slisBNB simultaneously.

2. **The slisBNB loop is the signature BSC DeFi trade.** Multiple wallets independently discovered this: supply slisBNB, borrow BNB at low rates (17.8% utilization = cheap borrowing), restake. It's the BSC equivalent of stETH/ETH looping on Ethereum.

3. **XAUt (Tether Gold) is an under-discovered opportunity.** Only a handful of users exploit it, but the numbers are compelling: 7.69% supply APY, 90.9% utilization. Gold as DeFi collateral is uncorrelated with crypto — a powerful diversification tool that most BSC users haven't found yet.

4. **Stablecoin arbitrage is the whale-lite strategy.** Users with $300K-$500K run USDT/USDC→USD1 arbitrage at 98% LTV. The spread is thin (0.5-1%) but safe for stablecoin pairs and scales well.

5. **Health factors reveal risk appetite.** Conservative users: 2.0+ health. Moderate: 1.2-1.5. Aggressive: 1.02-1.05. The most profitable strategies run at 1.02-1.05 on stablecoin pairs and 1.03-1.23 on volatile collateral.

6. **Cross-protocol diversification is the mature play.** The most sophisticated users split between Lista, Venus, Euler, and Bitway Earn. Single-protocol exposure is for beginners; real DeFi users never trust one smart contract with everything.

7. **sUSDe (Ethena) → Lista borrow is the newest play.** Wallet 0xefa9 deposits sUSDe (which already earns 5-10% from Ethena's funding rate strategy) and borrows USD1 against it. Double-dipping on yield — using a yield-bearing asset as collateral.

---

## Dune Query IDs

| ID | Name | Purpose |
|----|------|---------|
| 7335478 | Active mid-size DeFi wallets | Find wallets interacting with 2+ Lista contracts in 90 days |
| 7335482 | Mid-size wallets by slisBNB + lisUSD balance | Balance-range filter for $100K-$500K Lista users |
| 7335493 | Active Moolah borrowers (multi-token) | Find wallets using 2+ tokens on Moolah core contract |

---

## Wallet Address Summary

| Wallet | Portfolio | Strategy | Protocols Used |
|--------|-----------|----------|---------------|
| `0x0d050167639ec5cdccc4368448d4d609fe632d22` | $215K | Yield stacking (stake+lend+LP+govern) | Lista, PancakeSwap |
| `0x3ebf2da441af6219c709bb195d5a3527051f94a2` | $252K | Multi-collateral leverage (slisBNB+BTCB) | Lista |
| `0x2113cf56f29ad869cf445efb604d49b615e7ce10` | $96K | Triple-collateral power user (slisBNB+XAUt+BTCB) | Lista |
| `0xefa911756a790e0f9e806189dfa97e3fc96fb096` | $463K | Stablecoin rate arbitrage (USDT/USDC→USD1) | Lista, Venus |
| `0x0821b576a2ee921d3c4b97a0f1158c2e8b633bd0` | $61K | Protocol explorer (5 Lista positions+Bitway+Sign) | Lista, Bitway, Sign |
| `0x8464750e0f199f4ffeeb7d46cc3a016bf7340626` | $90K | Cross-chain strategist (BSC+ETH+Arb) | Lista, Venus, Euler |
| `0x88a0641c1fbff74b99d460c440369f44dd432af9` | $219K BSC | Multi-chain slisBNB leverager | Lista |
| `0x3b4d81d3e654760d9ba541bc686e73c0678d62e6` | $19K | Gold (XAUt) circular arbitrageur | Lista |
