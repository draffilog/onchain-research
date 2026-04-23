---
title: Saturn (USDat / sUSDat) on BSC — Deployment Strategy Ideation
topic: Stablecoin Cross-Chain Strategy
chain: BSC
verified: 2026-04-24
audience: BNB Chain Foundation (Vlad), Saturn Labs (Kevin/Sebastian), curator outreach
sources:
  - Saturn docs (saturncredit.gitbook.io, saturn.credit)
  - Aave ARFC — USDai/sUSDai Arbitrum onboarding (Chaos Labs review, Apr 2026)
  - LayerZero Stablecoin OFT v2 docs
  - Pendle cross-chain PT bridge docs
  - Lista Lending UI (lista.org/lending), live 2026-04-18
  - usd.ai/docs (contract addresses, Apr 2026)
  - Dune queries 7364432 (sUSDat ETH supply), 7364433 (USDai ARB supply), 7364499 (USDai cross-chain), 7364500 (sUSDai cross-chain), 7364502 (DEX volume), 7364512/7364513 (top holders Plasma/Base), 7364514 (first-mints), 7364519 (Plasma+Base full daily), 7364521 (Aerodrome Base pools)
  - Cross-references: lista-ethena-selflending-bsc.md, bsc-yield-opportunities-2026-04-20.md
tags: [saturn, susdat, usdat, bsc, oft, layerzero, pendle-cross-chain, lista-dao, gauntlet, curator-strategy, bridged-stable]
---

# Saturn on BSC — Strategy Brief

> **Context.** Saturn Labs (Kevin Li, Sebastian) is choosing between three deployment paths to bring `USDat` (T-bill-backed stable, no yield) and `sUSDat` (staked, ~11% APY from STRC) to BSC. Vlad (BNB Chain Foundation) wants strategies that will actually drive utilization — i.e. that a real BSC curator (Lista, Gauntlet) will list. This brief frames the three options, scores them, and proposes a concrete sequence.

---

## TL;DR — Recommended Path

1. **Phase 1 (now → ~$50M TVL on BSC).** Bridge sUSDat as a **LayerZero Stablecoin-OFT** to BSC (Kevin's "Option 2" / Athena setup). USDat optional but lower priority — it is non-yielding so curators don't care. Target: get sUSDat onto Lista Lending as collateral against USDT / USD1 / U with Lista DAO itself as initial seed-curator (same playbook Lista used to bootstrap the sUSDe/USDT market via its own treasury Safe).
2. **Phase 2 (~$50M → ~$150M).** Offer Gauntlet a curated sUSDat vault — they're the only third-party curator on Lista with the size + risk muscle to scale beyond Lista DAO's own balance sheet. Pitch is the same arithmetic that worked for sUSDe (~6–8% net at HR=1.02 on a 2% borrow rate).
3. **Phase 3 (~$150M+).** Add **Pendle Cross-Chain PT-sUSDat** (the same native bridge mechanism Lista used for PT-sUSDe through April 9, 2026). This unlocks fixed-rate looping at ~13–14% pre-leverage, which historically scaled an asset to ~$500M on BSC for Ethena.
4. **Skip Option 3 entirely** ("just deploy a vault") — Saturn explicitly doesn't want it, and it's strictly worse than Option 2.

The OFT path is **not** a downgrade vs native deployment. The USDai precedent (next section) shows OFT can carry $90M+ of bridged supply onto a new chain at launch, and Plasma's launch with OFT-bridged USDe / weETH / USDT0 hit $8B in three weeks. The blocker is never the bridge — it's whether **a curator is willing to list it and whether borrow demand exists at the offered yield**. Both are solvable on BSC if the spread vs Lista borrow rates (~2% on the Ethena side today) clears 5%+.

---

## 1. Saturn protocol facts (verified)

| Asset | Contract (Ethereum) | Mechanic | TVL (2026-04-23) |
|---|---|---:|---:|
| `USDat` | (mint via Saturn app, M0-backed) | 1:1 USDC mint/redeem; backed by M0's tokenized T-bills; **no yield** | n/a (used as deposit currency) |
| `sUSDat` | `0xD166337499E176bbC38a1FBd113Ab144e5bd2Df7` | Stake `USDat` 1:1 → exchange-rate-accruing share token; backing reallocated to **STRC** (Strategy/MicroStrategy preferred equity); target **11%+ APY** | **$46.07M** |
| `PT-sUSDat-27AUG2026` (Pendle) | (Pendle Saturn market on Ethereum) | Fixed yield to maturity, currently quoting **~13–14% APY** | $10M+ seeded by Flowdesk + Galaxy |

**Growth trajectory (Dune query 7364432, sUSDat cumulative supply on Ethereum):**

| Date | sUSDat supply |
|---|---:|
| 2026-03-30 | 0.75M |
| 2026-04-08 | 7.74M |
| 2026-04-15 | 25.12M |
| 2026-04-23 | **46.07M** |

**~60× in 24 days.** This is the exact growth-curve regime where a clean cross-chain extension can compound — but it's still ~10× too small for a Pendle Cross-Chain PT to be Lista-curator-ready (Vlad's stated threshold: "$500M+").

**Critical mechanic for bridging: `sUSDat` is exchange-rate accrual, not rebasing.** Yield shows up as the `sUSDat → USDat` rate ticking up over time. **This means the bridged version DOES accrue yield correctly**, the same way wstETH and sUSDe do. The "yield not accruing on bridged sUSDe" issue Vlad remembers from August 2025 was a Layer 0 / oracle staleness issue that has since been resolved — sUSDe on BSC today accrues correctly (verified on Lista Lending, where it's ~$33M at ~$1.20/share). This is **not a structural blocker** for an OFT'd sUSDat.

---

## 2. The USDai precedent (the directly comparable OFT case study)

USDai is the closest existing analog to what Saturn would be building — same two-token model (USDai = T-bill-backed unstaked, sUSDai = yield-bearing staked), same LayerZero OFT bridging, similar size / age / launch pattern. Reviewing what worked and what didn't:

### Architecture (verified from `docs.usd.ai`)

| Component | Address (same on every chain) |
|---|---|
| `USDai` | `0x0A1a1A107E45b7Ced86833863f482BC5f4ed82EF` |
| `sUSDai` | `0x0B2b2B2076d95dda7817e785989fE353fe955ef9` |
| USDai OAdapter (lock/unlock on hub, mint/burn on remotes) | `0xffA10065Ce1d1C42FABc46e06B84Ed8FfEb4baE5` |
| sUSDai OAdapter | `0xffB20098FD7B8E84762eea4609F299D101427f24` |

**Hub:** Arbitrum (mint/redeem only). **Remotes:** Plasma (live), Base (contracts deployed but not yet meaningfully used). **Bridge:** LayerZero Omnichain Adapter — burn/mint on remotes, lock on hub.

### Supply distribution

| Chain | USDai supply | sUSDai supply | Notes |
|---|---:|---:|---|
| Arbitrum (hub) | ~$275M (Dune 7364433, 2026-04-23) — was $410M peak in Aave proposal | ~$135M (85% of total) | All minting & redemption happens here. ~55% of USDai locked in Pendle PTs, ~40% staked into sUSDai contract |
| Plasma | ~$90M | ~$25M (15%) | Bridged at launch via OFT; $182M in Balancer USDai/USDT0 pool but **97% USDT0 / 3% USDai** — i.e. the pool is mostly USDT0 and almost nobody owns USDai natively on Plasma |
| Base | trace | trace | OFT contracts exist but no real liquidity yet |

### Lessons from USDai → critical for Saturn

1. **The bridged version hit ~25–35% of total supply within weeks.** That validates Kevin's Option 2 — OFT bridging can carry meaningful TVL onto a destination chain quickly without building a native instance.
2. **Liquidity pools on the destination chain end up massively imbalanced** (USDai/USDT0 was 3/97 on Plasma). This happens because **demand for the asset on the new chain is gated by minting cap on the hub**, not by bridge capacity. **For Saturn this means**: the binding constraint on BSC TVL will be Saturn's mint cap on Ethereum, not anything BSC-side. Plan for that — get mint cap raised or pre-supply a bootstrap allocation before the BSC listing.
3. **Aave's risk team (Chaos Labs) recommended NOT to list USDai/sUSDai on Arbitrum or Plasma** despite ~$500M total supply. Their reasoning: "peg volatility, redemption liquidity, cross-jurisdictional collateral enforcement, uncertainty surrounding secondary market demand and pricing resilience of GPUs." For Saturn this is a useful warning: **a curator's go/no-go is dominated by collateral risk, not by the bridge architecture**. STRC (Bitcoin-correlated digital credit) is in the same risk category as GPU loans — non-standard collateral that conservative risk teams will haircut hard or refuse.
4. **Pendle is where USDai's volume actually lives** (~55% of Arbitrum USDai is in PT-sUSDai-19FEB2026). This is consistent with the Saturn launch pattern — Pendle is Saturn's main venue too. **Implication**: when you bring sUSDat to BSC, your single biggest user-facing yield product will likely be a **Pendle Cross-Chain PT-sUSDat market**, not a Lista Lending market. The Lista market exists to **enable looping the PT**, not to be the demand center itself.

### What Plasma did right that Saturn-on-BSC should copy

> Source: LayerZero Plasma case study, 2026.

Plasma launched with **$8B in three weeks** because:
- Stargate served as the official bridge from launch day
- Aave was deployed on Plasma with **$10M USDT in pre-committed XPL incentives**
- Major OFT issuers (USDT0, USDe, USDai, weETH, XAUt0, ENA, PENDLE) were ready as day-1 assets
- Native UX: Aave's Plasma frontend + Plasma's frontend both linked directly to Stargate

Translation for Saturn on BSC:
- The OFT bridge alone is necessary but not sufficient.
- You need (a) a **curator-curated lending vault** on day 1 (Lista or Gauntlet), (b) **bootstrap supply on the borrow side** (the Lista treasury Safe + Flowdesk / Galaxy already-existing Saturn relationship), and (c) **launch incentives** — either LISTA tokens, BNB Chain ecosystem grant, or Saturn's Gravity Points routed to BSC users.

---

## 3. The three deployment options — scored

| Dimension | **Option 1: Native instance on BSC** | **Option 2: OFT + oVault (Athena style)** | **Option 3: Pendle Cross-Chain PT** |
|---|---|---|---|
| Saturn ops cost | High (separate stack, separate reserves, separate redemption) | Low (single mint engine on ETH) | Lowest (Pendle handles bridging) |
| User UX | Best (truly native mint/redeem) | Near-native (oVault hides bridging) | Worst (PT-only, must use Pendle UI; looping requires bridging back) |
| Yield divergence | **YES** — sUSDat-BSC and sUSDat-ETH will have different exchange rates (Kevin's stated concern) | None — same underlying token, just bridged | None — PT is fixed-rate so divergence is by design |
| TVL ceiling on BSC | Unlimited (native mint) | Limited by Saturn's mint cap and bridge throughput | Limited by Pendle market depth |
| Curator viability | Highest (Lista will treat it as native) | Medium-high (Lista has accepted bridged sUSDe at scale) | Medium (worked for $500M Ethena PT, **needs ≥$500M parent TVL**) |
| Composability | Highest (native ERC-20 on BSC) | High (still ERC-20, just bridged) | Lowest (PT only, expires Aug 27, 2026) |
| Liquidation venue depth | Builds independently | Limited to PancakeSwap + bridge-back | Limited to PT secondary on Pendle |
| Time to launch | 2–4 months (audits, ops) | 2–4 weeks (LayerZero V2 OFT is templatized) | 1 week (Pendle integration, after sUSDat reaches critical size) |
| Today's fit for Saturn ($46M sUSDat) | Premature — over-builds for the size | **Best fit** | Too early — sub-scale |

**Recommendation: Option 2 now, Option 3 in 2-3 months when sUSDat clears $150M.** Option 1 stays on the table as a future migration path if BSC TVL exceeds, say, 30% of total supply for >3 months.

---

## 4. Detailed strategies — by asset

### 4a. `USDat` on BSC (the unstaked stable)

Honest answer: **USDat alone is uninteresting on BSC.** It's a non-yielding T-bill stable competing against:
- `USD1` (WLFI, deeper liquidity, $138M Lista vault)
- `U` (Universal stable, $69M Lista vault)
- `USDT` (deepest)
- `lisUSD` (Lista's native, paying 1.55%)

USDat has **no native yield and no Binance/WLFI distribution muscle** to displace these.

**Best use case for USDat on BSC:** as the **paired borrow asset** in `sUSDat / USDat` markets. This is Lista's standard structure (`sUSDe / USD1`, `sUSDe / U`) and it lets sUSDat loopers borrow at zero principal-divergence risk. Concretely:

- Curate a `Lista USDat Vault` (Lista DAO seed, ~$5–10M from Saturn / Galaxy / Flowdesk treasury)
- This vault funds a `sUSDat / USDat` lending market with a 91.5% LLTV equivalent
- Borrow rate target: **2.0% fixed**, mirroring the `sUSDe / USD1` and `sUSDe / U` pricing that Lista uses today

Without this market existing, USDat-on-BSC is purely a UX placeholder for users who want to redeem sUSDat back through Saturn's mint engine. Fine for parity, but won't drive utilization on its own.

### 4b. `sUSDat` on BSC (the yield-bearing version) — primary value driver

This is where the actual TVL comes from. Three concrete strategies, each requiring a different curator partner:

#### Strategy 1: Lista DAO seed vault (Phase 1, $0–50M)

**Mirrors what Lista DAO did to bootstrap sUSDe on BSC: their own treasury Safe (`0x1d60bbbef79fb9540d271dbb01925380323a8f66`) supplies 93% of the USDT vault that funds the sUSDe loop.** Same playbook here:

- Lista DAO seeds a `Lista sUSDat Vault` with `USDat` and `USDT` — say $5M each
- Lend out into 2 markets:
  - `sUSDat / USDat` Fixed @ 2.00% borrow APY
  - `sUSDat / USDT` Flexible @ ~2.5% borrow APY
- Loopers get: 11% gross sUSDat yield − 2% borrow = 9% spread × ~10x leverage at HR=1.02 → **~30% leveraged net APY**
- Cap: $10–50M depending on how much Lista is willing to allocate

**Why Lista will say yes:** STRC is structurally similar to MicroStrategy's BTC carry — the Lista treasury already has BTC-aligned exposure via slisBNB and the BNB Chain Foundation relationship. STRC is a more concentrated bet on the same thesis (Bitcoin-backed credit). It's also fee revenue for Lista with controllable risk.

**Risk for Lista:** STRC is more correlated to BTC price than sUSDe is to anything (sUSDe is delta-neutral; STRC is preferred equity on a BTC-treasury company). A BTC drawdown can stress STRC dividend coverage → sUSDat yield drops or NAV writedown → liquidation cascade. **Mitigation**: lower LLTV (start at 80%, not 91.5%), and conservative position cap ($25M per market).

#### Strategy 2: Gauntlet curated vault (Phase 2, $50M–150M)

Once Lista DAO's seed market hits ~$30M, Gauntlet becomes the natural Phase 2 curator. They already curate Lista markets, and they have the institutional credibility to take outside LP capital (Binance Treasury, HTX, the slisBNB-whale-equivalent Safes).

**Pitch to Gauntlet:**
- Vault size target: $50M
- Allocate ~60% to `sUSDat / USDT` and `sUSDat / USD1` markets (subsidized borrow, mirrors USD1 vault structure)
- Conservative LLTV (Gauntlet won't take over 85% on a non-stable yield asset)
- Real reason this works: the **STRC / Bitcoin underlying is differentiated from Ethena's funding-rate dependency** — Ethena USDe-on-BSC is squeeze-prone (ref `lista-ethena-selflending-bsc.md`), so a sUSDat market gives Gauntlet a way to diversify their BSC stable curation away from the Ethena / sUSDe concentration risk.

**What Gauntlet actually needs to say yes** (based on their pattern with USDai/Aave, where they were 50-50):
1. Saturn-side mint cap on Ethereum lifted to ≥$500M (currently $500M — verify)
2. Independent risk report on STRC dividend sustainability under BTC drawdown scenarios
3. A reliable price oracle for sUSDat → USDat exchange rate on BSC (Chainlink CCIP, Pyth, or a verified LayerZero message)
4. ≥$10M sUSDat secondary depth on PancakeSwap or a new Curve-on-BNB pool, so Gauntlet can model liquidations

#### Strategy 3: Pendle Cross-Chain PT-sUSDat (Phase 3, $150M+)

This is the Vlad recommendation. Pendle's native cross-chain PT bridge moves PT tokens 1:1 from Ethereum to BSC without going through OFT or Layer Zero — Pendle handles it on-chain via their own messaging layer. Lista bridged PT-sUSDe through this exact mechanism for the market that scaled to ~$500M peak before maturing April 9, 2026.

**Mechanic:**
- Saturn doesn't deploy anything new. Pendle creates a `PT-sUSDat-27AUG2026` market on BSC mirroring the Ethereum one.
- Users bridge PT-sUSDat from ETH → BSC at 1:1 via Pendle's UI (`app.pendle.finance/trade/crosschain-pt`).
- Lista lists PT-sUSDat as collateral against USDT / USD1 (matches how PT-sUSDe was listed).
- Looping math: 13–14% fixed PT yield − 2% borrow = 11–12% spread × ~10x leverage → **35%+ leveraged net** (which is exactly what Vlad cited from his August 2025 PT-sUSDe loop).

**Why Vlad says it needs $500M parent TVL:** the Pendle Cross-Chain PT market needs enough native-chain TVL to absorb the bridged PT supply without breaking the AMM. PT-sUSDat on Ethereum today is ~$10M — bridge $5M of that to BSC and you've moved 50% of the parent market. At $500M parent, you can support a $50–100M BSC market without dislocation.

**Decision rule:** when Saturn's total sUSDat hits $500M (current run-rate suggests ~Q4 2026 if growth holds), open the Pendle Cross-Chain PT market on BSC. Until then, stick with Strategies 1+2.

---

## 5. Curator-by-curator outreach plan

| Curator | Status (per Vlad) | What unlocks them |
|---|---|---|
| **Lista DAO** itself | Default seed curator. Already runs the equivalent vault for sUSDe via own Safe. | Saturn provides $5–10M co-bootstrap allocation (Galaxy / Flowdesk). Need Lisa's go-ahead in the Saturn-Lista group chat. |
| **Gauntlet** | "50-50, slow right now after all the things." Already a Lista curator. | Independent STRC risk report + sUSDat oracle + ≥$10M secondary depth. Realistic timing: 8–12 weeks after Phase 1 launch and market data accumulates. |
| **Rockaway** | Declined ("currently not interested in taking this asset into curation"). | Likely permanent no for v1. Re-pitch in 6 months if Saturn proves out unique selling proposition. |
| **HyperRhythm, MEV Capital, Pangolin, Saterra, Florenza** | "Don't have liquidity, no point" (Vlad). | Skip. |
| **Flowdesk** (already supplies Saturn liquidity on Pendle Ethereum + USDsat depositor) | Ready (existing relationship) | Ask them to mirror their Ethereum LP role on BSC PancakeSwap (sUSDat / USDT pool, ~$5M depth). Same role as Athena's market-maker setup. |
| **Galaxy** | Co-deposited $10M into Saturn launch | Same as Flowdesk — ask for BSC mirror role. |

---

## 6. The actual pitch slide for Lista

> _For Vlad to send into the Lista group chat after Kevin/Lisa loop in_

**Subject:** sUSDat-on-BSC — Phase 1 vault proposal

**Ask:** Lista DAO curates a $20M `sUSDat` collateral vault on Moolah, funded with $5M USDT + $5M USDat seed from Lista treasury and matching $5M+ from Saturn / Galaxy / Flowdesk co-deposit.

**Markets:**
- `sUSDat / USDT` Flexible @ ~2.5% borrow, 80% LLTV, $5M cap
- `sUSDat / USDat` Fixed @ 2.0% borrow, 85% LLTV, $5M cap
- `sUSDat / USD1` Fixed @ 2.0% borrow, 80% LLTV, $5M cap

**Bridge:** LayerZero Stablecoin OFT, hub on Ethereum, OAdapter on BSC. Same security stack as Ethena's USDe / sUSDe deployment on BSC (which Lista already accepts at $34M scale).

**Yield arithmetic for borrowers:**
- Native sUSDat APY: ~11% (STRC dividends)
- Borrow rate on Lista: 2.0–2.5%
- HR=1.05 leveraged net: ~25–30% APY
- Mirrors the sUSDe-on-Lista loop (~6–8% net at HR=1.02 today, but with Saturn's higher gross yield the leveraged net is materially better)

**Risk vs sUSDe:**
- Same structure (yield asset → borrow stable → loop)
- Different underlying: STRC (Bitcoin-credit preferred equity) vs sUSDe (BTC/ETH funding-rate basis trade)
- STRC adds BTC-direction sensitivity; sUSDe is delta-neutral but funding-rate sensitive
- The two are **diversifying** — Lista reduces concentration risk by adding a non-Ethena yield-stable market

**Why Lista should be the curator and not punt to Gauntlet first:**
- Lista did exactly this for sUSDe / USDT (own treasury Safe = 93% of USDT vault) — proven playbook
- Saturn is too small ($46M) to interest Gauntlet today
- Lista getting in early earns curator fees + LISTA token narrative + BSC ecosystem credit for first non-Ethena alt-stable

**Asks of Saturn (Kevin):**
1. Confirm Saturn mint cap allows BSC bootstrap allocation (need ~$10M reserved)
2. Provide LayerZero OFT deployment timeline (target: 4 weeks)
3. Provide sUSDat exchange-rate oracle path on BSC (Chainlink CCIP preferred, LayerZero `messageReceived` fallback)
4. Galaxy + Flowdesk commit to BSC LP roles for sUSDat / USDT PancakeSwap pool

---

## 7. Open questions / things Vlad should verify before the Friday call

1. **STRC underlying volatility.** Pull MSTR / STRC price history. If STRC moves >15% in a month, sUSDat NAV is at risk and Lista will ask for a much lower LLTV.
2. **Saturn's Ethereum mint cap.** Aave proposal cited USDai's 500M cap as a binding constraint. Confirm Saturn's current cap and whether it scales with deposits.
3. **Pendle cross-chain PT readiness.** Confirm with Pendle team: does PT-sUSDat-27AUG2026 already have the cross-chain bridge wired? If yes, Phase 3 timeline shortens.
4. **Saturn's BSC Pendle plans.** If Pendle is launching `PT-sUSDat` natively on BSC (not via cross-chain bridge), that bypasses the OFT path entirely — different tradeoffs. Worth asking Pendle directly.
5. **Athena ↔ Saturn yield curve interaction.** Does sUSDat compete with sUSDe for the same looper wallets, or is the customer base different (BTC-bull vs delta-neutral)? If they overlap, the same $33M of sUSDe-collateral wallets on Lista can rotate to sUSDat — that's the realistic Phase 1 demand pool, not new capital.
6. **Lista's own balance sheet appetite.** USDT vault is only $7M — does Lista treasury have $5M unallocated to seed a new sUSDat market, or does the BNB Chain Foundation need to underwrite the seed?
7. **The bridged-sUSDe yield-not-accruing issue from Aug 2025** — confirm what was fixed. Was it a Layer 0 oracle update or a Chainlink CCIP integration? Whichever is the resolution, Saturn must adopt the same pattern on day 1.

---

## 8. What this means for the Friday call (your prep)

1. **Lead with Strategy 1.** It's the smallest ask, the fastest to ship, and uses Lista's proven pattern.
2. **Commit to Strategy 2 as the next milestone.** Tells Saturn there's a credible scaling path beyond Lista DAO's own balance sheet.
3. **Position Strategy 3 (Pendle Cross-Chain PT) as a Q3/Q4 2026 milestone.** Don't oversell — Saturn isn't $500M yet.
4. **Push back on Option 1 (native deployment).** Operationally too heavy for Saturn's stage, and the yield-divergence concern Kevin raised is real.
5. **Use USDai as the case study.** It's the closest existing pattern, it's been reviewed by Aave's risk team (you can cite the Chaos Labs report directly), and Saturn's structure is structurally similar.
6. **Ask Kevin for the Aug 2025 Athena / sUSDe lessons writeup.** He owes you that based on the call. Use it to validate or correct point #7 above.

---

## 9. USDai cross-chain expansion deep-dive (Arbitrum → Plasma → Base)

> Verified 2026-04-24 via Dune queries 7364499 (USDai cross-chain supply), 7364500 (sUSDai cross-chain supply), 7364502 (DEX volume by chain/project), 7364512/7364513 (top holders Plasma/Base), 7364514 (first-mint dates), 7364519 (Plasma+Base full daily), 7364521 (Aerodrome pool list). Supersedes the directional figures in Section 2.

### 9a. Verified launch timeline (from on-chain first-mint events)

| Chain | USDai first mint | sUSDai first mint | Trigger / context |
|---|---|---|---|
| **Arbitrum** (hub) | 2025-05-14 | 2025-05-14 | Saturn's home chain; mint engine, M0 collateral, sUSDai staking contract all live here |
| **Ethereum** | 2025-06-06 | 2025-06-06 | Pendle markets + institutional access. 22 days after Arbitrum |
| **Plasma** | **2025-09-19** | 2025-09-22 | USDai contracts deployed **6 days before** Plasma's official mainnet beta (2025-09-25). USDai was a **day-1 Curve launch pool** (USD₮0/USDai, one of 5 stable pools at launch) |
| **Base** | **2025-11-19** | 2025-11-19 | Quiet contract deployment; bootstrapped via OFT with a single-day $69M mint on 2025-11-21 |

Aerodrome integration on Base was announced 2026-01-28 ("New Home Base of USDai migrated to Aerodrome") but actual pool deployment didn't happen until **2026-02-22** — i.e. ~3 weeks of marketing lag before liquidity was actually live.

### 9b. Day-by-day supply trajectory — the punchline

**Plasma USDai (cumulative on-chain supply):**

| Date | USDai | sUSDai |
|---|---:|---:|
| 2025-09-19 (launch) | seed only | — |
| 2025-09-22 | seed | first mint |
| 2026-03-21 | **$22.6M** (peak) | $69.7M |
| 2026-03-31 | $9.3M | $80.0M |
| 2026-04-10 | $6.9M | $79.0M |
| 2026-04-23 | **$5.9M** | **$77.3M** |

USDai on Plasma went from $22.6M peak to $5.9M today — **a 74% drawdown in 33 days.** sUSDai stayed roughly flat (~$80M throughout). Translation: **the unstaked stable bled out, the yield-bearing version stuck.** Users who held bridged USDai had no on-chain reason to keep it (the yield is back on Arbitrum in the staking contract); users who held sUSDai held the yield natively.

**Base USDai (cumulative on-chain supply):**

| Date | USDai | sUSDai |
|---|---:|---:|
| 2025-11-19 (deployment) | $12 | — |
| 2025-11-20 | $174K | — |
| 2025-11-21 | **$69.0M** (single-day bootstrap mint) | — |
| 2025-11-30 | $31.9M | — |
| 2025-12-15 | $27.7M | — |
| 2026-01-15 | $17.0M | — |
| 2026-02-15 | $8.1M | — |
| 2026-03-21 | $3.5M | $5.6M |
| 2026-04-23 | **$0.85M** | **$4.5M** |

Base is even more stark: from a $69M Day-3 bootstrap (almost certainly a Concrete/team-controlled pre-mint to seed pools) to **$0.85M in 5 months** — a **99% drawdown.** sUSDai on Base hovers around $4.5M today, also ~20% off its peak. The Aerodrome migration in late January moved the needle for ~3 weeks (volume picked up Feb 22 onwards) but didn't reverse the supply decline.

**Conclusion:** USDai-the-stable does not survive on a remote chain without a yield reason to hold it. sUSDai-the-yield-asset has 10–90× more sticking power. **For Saturn, this means USDat-on-BSC is genuinely uninteresting standalone — sUSDat is the only asset worth bridging at scale.** This validates Section 4a above with hard data.

### 9c. DEX strategy per chain — what was actually deployed

Weekly volume by chain × DEX (last 12 weeks, rolled up):

| Chain | DEX | Trailing 12-week median weekly $ vol | Role |
|---|---|---:|---|
| Arbitrum | **Fluid** | $20–35M | Workhorse — DEX-as-Lend, deepest sUSDai/USDC pool on the network |
| Arbitrum | **Maverick** | $5–10M | Concentrated-liquidity USDai/USDC (premium-aware) |
| Arbitrum | Uniswap | $0.1–6M | Mostly aggregator routing, almost no native LPs |
| Arbitrum | PancakeSwap | $0.05–0.1M | Trace |
| Plasma | **Fluid** | $1–11M | Same workhorse pattern as Arbitrum |
| Plasma | Uniswap | $0–60K | Trace |
| Plasma | (Curve USD₮0/USDai) | not in dex.trades sample but mentioned in Curve launch announcement | Day-1 launch pool, ~$182M nominal but **97% USDT0 / 3% USDai** per Aave/Chaos Labs report |
| Base | **Fluid** | $0.2–4M | Yet again the workhorse. sUSDai/USDC and USDai/USDC pools |
| Base | **Aerodrome** | $0.05–0.5M | Marketing-led launch; meaningfully smaller than Fluid |
| Base | OpenOcean | $0.02M | Aggregator routing |
| Base | Uniswap | <$1 | Effectively dead |

Specific Base pools (verified contract addresses, last 60 days):

| DEX | Pool | Pair | 30-day volume |
|---|---|---|---:|
| Fluid | `0xf063bd202e45d6b2843102cb4ece339026645d4a` | sUSDai / USDC | **$5.40M** |
| Aerodrome | `0xed7b8e8d89bb5061e5b8ec1fc8e31cdb36b7cafe` | sUSDai / USDC | $0.98M |
| Aerodrome | `0x2595b1bd2944d213360e73c928c5d1636ccc2d99` | USDai / USDC | $0.29M |
| Fluid | `0xc8f989e9b7ece1b4d092ae4db7faf1294146bda4` | USDai / USDC | $0.20M |

**Fluid out-volumes Aerodrome on Base by ~5×, despite Aerodrome being USDai's marquee marketing partner.** This is a critical observation: the actual liquidity engine across all three USDai chains is **Fluid (DEX + Lend)**, not the chain-native incumbent (Curve on Plasma, Aerodrome on Base). Fluid's combined DEX+Lend model means LPs earn DEX fees AND borrow yield on the idle leg of the LP — economically dominant for stable-stable pairs.

**For Saturn-on-BSC**, this means the analogous play is **Fluid-style integrated DEX+Lend on Lista** (Lista already does both in the same Moolah/Lending stack), not standalone PancakeSwap. PancakeSwap stable pools historically die — see how lisUSD/USDT or sUSDe/USDT volume there has trended versus Lista Lending TVL.

### 9d. Lending markets per chain — and curator behavior

| Chain | Lending venue | USDai/sUSDai status | Curator |
|---|---|---|---|
| Arbitrum | **Aave V3** | **Rejected** by Chaos Labs + LlamaRisk (Apr 2026 ARFC). Cited GPU collateral liquidity, 7-day sUSDai liquidation window, peg instability from capped supply, AAcA legal classification | n/a — no listing |
| Arbitrum | **Pendle** | Live since Feb 19, 2026; PT-USDai 25× points multiplier, PT-sUSDai 12× | Pendle (no third-party curator) |
| Arbitrum | **Euler** | Had a Frontier USDai vault → required **$100M cap raise on 2025-10-08** to unwind orderly. K3 Capital took over USDT0 vault risk after the unwind | K3 Capital (post-unwind) |
| Arbitrum | **Fluid** | sUSDai/USDC vault since 2025-07-18; trading at ~$1.07–1.08 (premium) | Fluid native (no external curator) |
| Arbitrum | **Silo** | sUSDai/USDC market live but small. Same chain saw a major Silo blow-up (sUSDX/USDC market 127, Nov 2025) — Lazy Summer DAO offboarded entire Silo from their strategy set | Block Analitica (for Lazy Summer); Silo's own internal config |
| Arbitrum | **Morpho** | USDC Yield (Arb) Morpho vault adds/removes Pendle PT markets monthly; touched USDai indirectly | **kpk** (formerly karpatkey) |
| Arbitrum | **autoUSDai / autosUSDai** | Concrete-managed vault, $85.6M USDai + $8M sUSDai. Routes across Uniswap, Balancer, Euler, Fluid, Curve | **Concrete** (USDai's own vault manager) |
| Plasma | **Aave V3** | **Rejected** (same Chaos Labs report). Aave Plasma launched with Maple syrupUSDT, sUSDe, wstETH, wrsETH, GHO, XPL — **but not USDai** | n/a |
| Plasma | **Euler** | autoUSDai routes ~$68M (the **bulk** of total autoUSDai TVL) here | Concrete |
| Plasma | **Fluid** | Active sUSDai/USDC pool, ~$1–11M weekly volume | Fluid native |
| Plasma | Pendle | sUSDe + USDe PT-listed on Aave Plasma; not seen USDai PT specifically yet | — |
| Base | **Aave** | Not listed | n/a |
| Base | **Fluid** | sUSDai/USDC pool ($5.4M 30d vol), USDai/USDC pool ($0.2M) | Fluid native |
| Base | **Aerodrome** | sUSDai/USDC and USDai/USDC pools, both small | Aerodrome native (incentivized via AERO emissions) |
| Base | **Morpho** | Not visible in kpk change-log on Base side | — |

**Key takeaway: Aave is the Tier-1 venue everywhere, and Aave has now rejected USDai twice (Arbitrum + Plasma).** Concrete's autoUSDai vault is the de-facto curator — but it's Concrete, USDai's own affiliated vault manager, not a true third-party curator. The closest thing to an independent curator that touches USDai/sUSDai is **kpk on Morpho** (occasional Pendle PT exposure) and **Block Analitica** (via Lazy Summer's broader USDC vault — but they got burned by sUSDX on Silo and have been more conservative since).

### 9e. Who is actually creating supply on these chains?

Top holders on **Plasma** (excluding the OAdapter contract):
- Largest aggregator wallets are pool contracts (Curve, Fluid pools) plus a small number of large Concrete/autoUSDai positions
- The bulk of the $5.9M USDai supply is sitting in (a) the Curve USDT0/USDai pool, (b) Fluid sUSDai/USDC pool, (c) Concrete autoUSDai vault routing through Euler

Top holders on **Base** (verified, raw addresses):

| Token | Address | Balance | Likely identity |
|---|---|---:|---|
| sUSDai | `0x52aa899454998be5b000ad077a46bbe360f4e497` | **$3.58M** | Largest single sUSDai holder on Base — almost certainly Fluid lending vault collateral or Concrete-managed vault |
| sUSDai | `0x7c363e4650ca88e4676f1ce2ac6f2dd50c102198` | $0.51M | Likely autosUSDai vault on Base |
| USDai | `0x75d415edcb3c3782e5952470821e983f9053a209` | $0.60M | Largest single USDai holder; probably aggregator contract |
| USDai | `0x4bb21783233043f382776208d37eccb1355ceebb` | $0.03M | Tail user |
| sUSDai | `0xed7b8e8d89bb5061e5b8ec1fc8e31cdb36b7cafe` | (this address IS the Aerodrome sUSDai/USDC pool from query 7364521) | Aerodrome pool |
| USDai | `0x2595b1bd2944d213360e73c928c5d1636ccc2d99` | (Aerodrome USDai/USDC pool) | Aerodrome pool |

The structural picture: **on every remote chain, the supply is held in pool contracts and Concrete vaults, not in real user wallets.** This is the same pattern as bridged sUSDe on BSC — a small number of LP/curator addresses concentrating the bridged supply, with very thin retail tail. **Bridged stable supply is a B2B-curator product, not a retail product.**

### 9f. Lessons that materially update the Saturn brief

1. **Aerodrome is overrated on Base for a stable-stable use case.** Saturn should NOT pay an Aerodrome bribe-emission program to launch on Base; the actual workhorse there is Fluid. Equivalent on BSC: the workhorse will be **Lista Lending + Moolah**, not PancakeSwap.
2. **Don't waste team bandwidth on a separate Plasma-style chain expansion.** USDai paid the operational + bootstrap-mint cost to launch on Plasma 6 days before mainnet beta with day-1 Curve pool, and 7 months later has $5.9M to show for it. **The same bootstrap on BSC has a better demand profile** (Lista + 2-token loopers) but the lesson is to not over-extend to thinly populated chains where the only TVL is wash-trade pool seeding.
3. **The Day-3 $69M Base bootstrap mint is what NOT to do.** USDai pre-minted ~$69M to themselves on Base on Nov 21, 2025, then bled it back over 5 months. Saturn should plan a real demand-curve-led bootstrap (~$5–10M co-deposit with Lista treasury and Galaxy/Flowdesk), NOT a vanity TVL pre-mint.
4. **Aave rejection is the binding constraint on remote-chain TVL.** USDai was rejected twice. Saturn should expect the same on BSC and not bet the launch on Lista's Aave-equivalent — Lista Lending is its own venue and has a different (lower) bar than Aave does. Plan accordingly.
5. **Your real curator counterpart in this market is Concrete-equivalent**, not Aave/Gauntlet. Concrete is USDai's affiliated vault manager and routes 70%+ of bridged supply. The Saturn-on-BSC analog would be **Lista DAO itself running the equivalent treasury Safe** (the playbook from the sUSDe deployment), not waiting for a third-party curator to volunteer.
6. **Pendle on Arbitrum (Feb 19, 2026) is where USDai's actual product-market fit shows up** — 25× points on PT-USDai, 12× on PT-sUSDai. Saturn already has Pendle PTs on Ethereum (PT-sUSDat-27AUG2026). The cross-chain PT bridge to BSC is the most leveraged play in the whole brief.
7. **Per-chain take rate for the unstaked token is low — the staked token is what matters.** USDai on Plasma has hovered $5–22M while sUSDai stayed at $77–85M. Saturn should plan for a similar 10–15× sUSDat-to-USDat ratio on BSC and weight all bootstrap energy toward the yield-bearing token.

### 9g. Summary table — USDai's actual cross-chain ROI by chain

| Chain | Days since launch | Peak USDai supply | Today USDai | Peak sUSDai | Today sUSDai | Verdict |
|---|---:|---:|---:|---:|---:|---|
| Arbitrum (hub) | 345 | ~$410M | ~$275M | ~$160M | ~$135M | **Strong fit** — actual demand center via Pendle + Concrete |
| Plasma | 217 | $22.6M | $5.9M | $85.3M | $77.3M | **Mixed** — sUSDai sticky via Concrete/Euler routing, USDai bled out |
| Base | 156 | $69.0M (Day-3 pre-mint) | $0.85M | $5.6M | $4.5M | **Weak fit** — bootstrap mint evaporated; Aerodrome marketing didn't compensate |
| Ethereum | 322 | not analyzed | not analyzed | not analyzed | not analyzed | (separate analysis needed) |

**Final calibration for the Friday call:** if Saturn-on-BSC matches USDai-on-Plasma's sUSDai trajectory, that's $50–80M of bridged sUSDat in 4–6 months, sticky. That's real, attractive, achievable. Don't let Vlad over-promise BSC TVL above Plasma's sUSDai number unless Lista's curator commitment + Galaxy/Flowdesk LP commitment is locked in writing first.

---

## 10. Bridge mechanism + Pendle + DEX pools — verified per chain

> Verified 2026-04-24 via additional Dune queries 7364566 (Plasma USDai daily Feb–Apr), 7364567 (Plasma USDai top holders), 7364568 (Plasma sUSDai top holders); Pendle official announcement (Feb 26, 2026 Medium post + March 19, 2026 launch); LayerZero docs.

### 10a. Was USDai's expansion uniquely OFT? — **Yes, confirmed.**

USDai uses **LayerZero V2 Stablecoin OFT** as the only cross-chain mechanism. Every chain (Arbitrum hub, Ethereum, Plasma, Base) holds the same `USDai` and `sUSDai` ERC-20 contracts at the **same address on every chain**:

| Component | Address (canonical, every chain) |
|---|---|
| `USDai` token | `0x0A1a1A107E45b7Ced86833863f482BC5f4ed82EF` |
| `sUSDai` token | `0x0B2b2B2076d95dda7817e785989fE353fe955ef9` |
| `USDai` OAdapter | `0xffA10065Ce1d1C42FABc46e06B84Ed8FfEb4baE5` |
| `sUSDai` OAdapter | `0xffB20098FD7B8E84762eea4609F299D101427f24` |

Bridging mechanics (per LayerZero V2 Stablecoin OFT spec):
- **Arbitrum (hub):** mint via Saturn's mint engine (M0 / USDC). Bridging out → tokens locked in OAdapter (`Lock/Unlock` model).
- **Plasma / Base / Ethereum (remotes):** Bridging in → OAdapter mints to user via `MINTER_ROLE`. Bridging out → user approves OAdapter, which burns via `BURNER_ROLE` (`Burn/Mint` model).

**Important sanity-check on my earlier supply numbers:** my Section 9 cumulative-supply numbers used a `mint-from-0x0 minus burn-to-0x0` formula which does not capture the initial pre-deploy mint USDai did to the Concrete vault on each chain. The correct way to read **actual circulating** supply is the top-holders table below. The directional story (USDai-the-stable bled out, sUSDai-the-yield-asset stuck) is unchanged, but the absolute numbers below override Section 9b.

**No other bridge mechanism is in use.** USDai does NOT use:
- Stargate (uses LayerZero but a different liquidity-pool primitive)
- Pendle Cross-Chain PT bridge (the mechanism Lista used for PT-sUSDe)
- Native multi-instance deployment (no separate mint engines on Plasma or Base)
- CCIP / Wormhole / Axelar / any other messaging layer

This is a clean validation that Kevin's "Option 2: LayerZero OFT" path for Saturn on BSC is exactly the same architecture USDai adopted, with no exotic bits.

### 10b. Did USDai have a Pendle market on Plasma? — **Yes, but not via "Cross-Chain PT" — it's a native Pendle deployment on Plasma.**

This is a critical architectural distinction Vlad should understand.

**What launched on Plasma (Pendle official announcement, Feb 26, 2026 Medium post + March 19, 2026 launch):**

| Pool | Launch date | Quoted APY | Quoted liquidity at launch |
|---|---|---:|---:|
| sUSDe (Pendle Plasma) | 2026-01-15 | 25.9% | $8.74M |
| USDe (Pendle Plasma) | 2026-01-15 | 12.67% | $14.34M |
| syrupUSDT (Pendle Plasma) | 2026-01-29 | 190% | $163K |
| **USDai (Pendle Plasma)** | **2026-03-19** | **36.72%** | **$6.47M** |
| **sUSDai (Pendle Plasma)** | **2026-03-19** | **649%** (points-driven) | **$64.8K** |

Plus $900K/week of XPL incentives from the Plasma Foundation across all five markets.

**Mechanic: this is NOT Pendle Cross-Chain PT.** It's a **standalone Pendle deployment on Plasma** that wraps OFT-bridged `USDai` as a fresh SY token, then issues new PT-USDai-Plasma and YT-USDai-Plasma. The bridged USDai arrives via the LayerZero OAdapter (Section 10a), then gets deposited into the Plasma-side SY contract.

This is meaningfully different from what Lista did for sUSDe. Lista used **Pendle's Cross-Chain PT bridge**, which moves PT tokens 1:1 from Ethereum's PT-sUSDe market to BSC's market without spawning a new SY/PT/YT lifecycle on BSC. The two Pendle paths:

| Path | Mechanism | Underlying | Used by |
|---|---|---|---|
| **Native Pendle deployment per chain** | Pendle launches a fresh SY/PT/YT triple on the new chain, wrapping a bridged OFT or native asset | Bridged OFT (e.g. USDai-on-Plasma) or native asset | USDai on Plasma (Mar 19); USDe/sUSDe on Plasma (Jan 15); syrupUSDT on Plasma (Jan 29) |
| **Pendle Cross-Chain PT bridge** | Pendle moves an EXISTING PT token 1:1 from chain A to chain B; no new SY/PT/YT spawned | The PT token itself, mirrored | Lista's PT-sUSDe-on-BSC (~$500M peak, matured Apr 9, 2026) |

**Implication for Saturn:** there are TWO Pendle options for BSC, not one:
1. **OFT sUSDat to BSC, then ask Pendle to deploy a native Pendle market on BSC.** Lower coordination cost; new SY/PT/YT triple. This is what USDai did on Plasma.
2. **Pendle Cross-Chain PT-sUSDat from Ethereum to BSC.** Higher leverage on existing PT-sUSDat-27AUG2026 liquidity; no new market lifecycle. This is what Lista wants for sUSDe-style scaling.

For Saturn at $46M, **path 1 is more realistic short-term** (lower threshold for Pendle to deploy, and matches the USDai-on-Plasma precedent). Path 2 unlocks at scale (~$150M+ parent TVL).

### 10c. Pendle launch impact on Plasma USDai supply — visible in the data

The **Pendle USDai-on-Plasma launch on March 19, 2026** lines up precisely with a step-change in USDai bridging activity. Looking at the daily on-chain net mint/burn flow on Plasma (not absolute supply, which is offset-shifted by an initial pre-deploy mint to Concrete; this is the *daily change*):

| Day | Daily net change in USDai burned-to-zero on Plasma |
|---|---:|
| 2026-03-15 to 2026-03-18 | small daily moves (~$200K/day) |
| **2026-03-19** (Pendle launch) | **−$17.1M** (i.e. $17.1M of USDai bridged OFF Plasma OR pre-mint reshuffled) |
| 2026-03-20 | −$11.3M |
| 2026-03-21 | −$1.0M |
| 2026-03-22 | −$2.2M |
| 2026-03-23 | **−$6.8M** |

The negative deltas indicate large USDai movements through the OAdapter (burn-on-bridge-out OR Concrete vault rebalancing into Pendle SY). Either way, **Pendle's launch coincided with the largest single-week USDai flow on Plasma** in the data window. The $6.47M Pendle pool quoted at launch is plausibly sourced from this reshuffling.

### 10d. Where Plasma USDai actually sits today (verified holder concentration)

Top 4 holders of `USDai` on Plasma (Dune query 7364567, 2026-04-23):

| Rank | Address | Balance | Likely identity |
|---|---|---:|---|
| 1 | `0xe090d9d417e54116c50e5d5dde1509af91102ec3` | **$4.36M** | Almost certainly the Pendle USDai-Plasma SY contract (matches the $6.47M Pendle launch liquidity, decayed) |
| 2 | `0xba1333333333a1ba1108e8412f11850a5c319ba9` | $0.36M | Balancer V3 vault (recognizable `ba13...3ba9` Balancer pattern) |
| 3 | `0x520f10b91da09fcc76049783ae2325535aed1c22` | $0.26M | Likely Curve USDT0/USDai pool LP |
| 4 | `0x52aa899454998be5b000ad077a46bbe360f4e497` | $0.17M | Concrete autoUSDai vault (same address holds $71.8M sUSDai on Plasma — see below) |
| 5–20 | various | <$110K each | Tail users + pool contracts |

**~76% of Plasma USDai sits in the Pendle SY contract.** Without Pendle, Plasma's USDai supply would essentially evaporate.

### 10e. Where Plasma sUSDai actually sits today

Top holders of `sUSDai` on Plasma (Dune query 7364568, 2026-04-23):

| Rank | Address | Balance | Identity |
|---|---|---:|---|
| 1 | `0x52aa899454998be5b000ad077a46bbe360f4e497` | **$71.77M** | **Concrete autosUSDai vault** (same address holds $3.58M sUSDai on Base — confirms Concrete deployed at the same nominal address on both chains) |
| 2 | `0x767d33217e7d2670695ffe2a104548b780f4f5d8` | $1.76M | Likely Euler vault (Concrete routes ~$68M autoUSDai through Euler-Plasma per the Aave proposal) |
| 3 | `0x601afacd8fbdbf44e71201b13d449441621332b9` | $1.59M | Likely a second Euler vault / Fluid pool |
| 4–16 | various | <$535K each | Tail of Concrete-managed positions |

**~93% of all bridged sUSDai on Plasma sits in a single Concrete vault contract (`0x52aa899454998be5b000ad077a46bbe360f4e497`).** This is the entire engine of USDai's Plasma TVL.

That single address is THE most important wallet to copy-paste for the Saturn strategy. Concrete = the curator. The "$77M sUSDai on Plasma" headline number is, in practice, "$72M of one Concrete vault routing through Euler."

### 10f. DEX pool inventory per chain — what was actually deployed and when

#### Plasma (chain launched 2025-09-25; USDai contracts deployed 2025-09-19)

| DEX | Pool | Pair | Status today | Launch context |
|---|---|---|---|---|
| **Curve** | USD₮0 / USDai | stable-swap | Live since Plasma day-1 | Curve listed USDai as 1 of 5 launch pools alongside USD₮0/sUSDe, USD₮0/USDe, USD₮0/syrupUSDT, USD₮0/USDO. ~$182M nominal but heavily skewed (97% USDT0 / 3% USDai per the Chaos Labs Aave report) |
| **Fluid** | sUSDai / USDC | DEX-as-Lend | Live, $1–11M weekly volume | Workhorse pool. Same Fluid integrated DEX+Lend pattern as on Arbitrum |
| **Uniswap** | USDai / WETH (and others) | concentrated | Trace volume (<$60K weekly) | Aggregator routing only |
| **Pendle** (deployed 2026-03-19) | PT-USDai / SY-USDai (USDai pool) | Pendle AMM | Launch liquidity $6.47M @ 36.72% APY | Native Plasma Pendle deployment, NOT cross-chain PT |
| **Pendle** (deployed 2026-03-19) | PT-sUSDai / SY-sUSDai | Pendle AMM | Launch liquidity $64.8K @ 649% APY (points-driven) | Tiny — sUSDai liquidity stays in Concrete vault, doesn't flow to Pendle |
| **Euler** | USDai / sUSDai lending markets | lending | Live; Concrete autoUSDai routes ~$68M here per Aave proposal | The actual demand center for Concrete-managed bridged supply |

#### Base (chain launched 2023; USDai contracts deployed 2025-11-19)

| DEX | Pool | Pair | Status today | Launch context |
|---|---|---|---|---|
| **Fluid** | sUSDai / USDC (`0xf063bd202e45d6b2843102cb4ece339026645d4a`) | DEX-as-Lend | Live since 2026-02-22; $5.4M 30d volume | Workhorse pool — same as on Arbitrum and Plasma |
| **Fluid** | USDai / USDC (`0xc8f989e9b7ece1b4d092ae4db7faf1294146bda4`) | DEX-as-Lend | Live since 2026-02-22; $0.20M 30d volume | Smaller stable-stable pool |
| **Aerodrome** | sUSDai / USDC (`0xed7b8e8d89bb5061e5b8ec1fc8e31cdb36b7cafe`) | concentrated stable | Live since 2026-02-22; $0.98M 30d volume | Marketing-led ("New Home Base of USDai") but smaller than Fluid |
| **Aerodrome** | USDai / USDC (`0x2595b1bd2944d213360e73c928c5d1636ccc2d99`) | concentrated stable | Live since 2026-02-22; $0.29M 30d volume | Smaller still |
| **OpenOcean** | aggregator routing | meta | $0.02M 30d volume | Aggregator only |
| **Uniswap V4** | USDai / USDC, USDai / ETH | concentrated | <$1 30d volume | Effectively dead |
| **Pendle** | — | — | **Not deployed for USDai on Base** | Pendle's Base presence is thin in general; no USDai/sUSDai market exists |
| **Aave / Morpho** | — | — | **Not listed** | Same Chaos Labs / kpk caution as on Arbitrum and Plasma |

**The key delta vs Plasma**: Base has **no Pendle market and no top-tier lending market** for USDai/sUSDai. Without those, the only sticky use case is Fluid LP fees + Aerodrome AERO emissions — both small. That fully explains why Base USDai TVL collapsed: there's no terminal demand product on Base.

### 10g. What this means for Saturn-on-BSC — three updated tactical asks

1. **Pendle on BSC for sUSDat is the highest-leverage single move.** USDai's Plasma supply is held up (~76%) by a single Pendle pool that launched 6 months after the chain. **Saturn should put Pendle market deployment on BSC at the top of the post-OFT roadmap**, not as Phase 3. This is doable as a "Pendle native deployment wrapping bridged sUSDat" (path 1 in §10b), which has a much lower size threshold than the cross-chain PT path Vlad has been thinking about.
2. **The "curator" you're really pitching is the Concrete equivalent on BSC.** Concrete (USDai's vault manager) routes ~$72M into a single sUSDai-on-Plasma position. The BSC analog is **Lista DAO running its own treasury Safe** (`0x1d60bbbef79fb9540d271dbb01925380323a8f66`) as the Concrete-equivalent — which Lista already does for sUSDe ($33M). This is more efficient than waiting for an independent third-party curator.
3. **Don't waste budget on a PancakeSwap-style marquee DEX integration.** USDai paid the marketing cost for Aerodrome and got 5× less volume than passive Fluid. The BSC analog: don't pay PancakeSwap for a stable-stable pool launch — just integrate with **Lista Lending + Moolah** (the BSC integrated DEX+Lend stack) and let it absorb the bridged sUSDat naturally.
