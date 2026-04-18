---
topic: Lista DAO ↔ Ethena (sUSDe) self-lending loop on BSC — the BSC analog of Sentora/syrupUSDC
chain: BSC
verified: 2026-04-18
tags: [lista-dao, moolah, ethena, sUSDe, USDe, self-lending, vault, bsc, htx, binance]
---

# Is the "Ethena method" running on BSC too? — Yes.

> Companion to [`sentora-pyusd-syrupusdc-selflending.md`](./sentora-pyusd-syrupusdc-selflending.md).
>
> User question: Saul described a self-lending loop on Ethereum (Sentora PYUSD vault → syrupUSDC market). n.d. called this "the Ethena method" — Ethena supplies USDT to each chain's Aave so sUSDe loopers can always borrow. Is the same pattern present on BSC?
>
> Answer: **Yes — and on BSC the structure is even more concentrated than on Ethereum.** A single $498M whale, the HTX exchange ($1.575B portfolio), and a Lista DAO treasury Safe between them supply ~95%+ of the stablecoin liquidity in three of Lista's four major lending vaults. Those vaults route ~$51M into sUSDe / USDe / PT-USDe markets — which is essentially **all the sUSDe that exists on BSC** (~$34M circulating, ~$33M sitting on Lista as collateral).

## TL;DR

| Pattern | Ethereum (Sentora PYUSD) | BSC (Lista DAO) |
|---|---|---|
| Curated stable vault | Sentora PYUSD V1 ($423.56M) | Lista USD1 Vault ($138.5M), Lista U Vault ($69.3M), Lista USDT Vault ($6.95M) |
| Curator | Sentora (3rd party, ITB rebrand) | **Lista DAO itself** (no separation) |
| Allocated to Ethena-side market | $139.97M sUSDe (33%) + $99.98M syrupUSDC (24%) | $20.9M sUSDe + $11.82M PT-USDe + $4M USDe (USD1 vault); $10M sUSDe + $2.7M USDe (U vault); $2.28M sUSDe (USDT vault) — ~$51M total |
| Supply concentration | $605M whale supplies 23.6%; 3 vault aggregators in top 11 | **One $498M whale supplies 84% of USD1 vault**; HTX exchange supplies 63% of U vault; Lista insider Safe supplies 93% of USDT vault |
| Borrower side | Loopers buying syrupUSDC, borrowing PYUSD, recycling | Loopers buying sUSDe / USDe / PT-USDe, borrowing USD1/U/USDT, recycling |
| Utilization | 91% on sUSDe market, 91% on syrupUSDC market | 96.79% on sUSDe/USD1, 100% on sUSDe/USDT, 80.48% on sUSDe/U, 95.80% on PT-USDe |
| LLTV | 91.5% | not yet captured for each market — to-do |

## On-chain verification

### 1. Lista Lending overall

Verified from `lista.org/lending/earn` (2026-04-18):

- **Lending TVL: $886,735,704**
- Total deposits: $579,952,797
- Lending collateral: $306,782,907
- Total borrowed: $213,607,529

The four Lista DAO-curated stable vaults (Classic Zone):

| Vault | Address | Deposits | Util | APY |
|---|---|---|---|---|
| Lista USD1 Vault | `0xfa27f172e0b6ebcef9c51abf817e2cb142fbe627` | 138.51M USD1 ($138.54M) | 63.90% | 1.05% |
| Lista U Vault | `0x9a17fd5cb8efc25d11567e713ae795a89775a759` | 69.32M U ($69.34M) | 49.00% | 0.44% |
| Lista lisUSD Vault | (not queried) | 27.39M lisUSD | 56.98% | 1.18% |
| Lista USDT Vault | `0x6d6783c146f2b0b2774c1725297f1845dc502525` | 6.95M USDT ($6.95M) | 67.21% | 1.78% |

For comparison, the BNB and other vaults exist too but are not the relevant venue for the Ethena loop:

| Vault | Deposits |
|---|---|
| Lista BNB Vault | 495.16K BNB ($318.62M) |
| Lista XAUT Vault | 536.07 XAUt ($2.59M) |
| Lista USDC Vault | 1.54M USDC |

Combined stable-vault TVL: ~$242M.

### 2. Ethena-side allocation per vault

#### Lista USD1 Vault ($138.5M total)

Allocation to markets where Ethena assets are collateral:

| Market | Allocation | % of vault | Util | Borrow APY |
|---|---|---|---|---|
| **sUSDe / USD1** (Fixed) | 20.9M USD1 | 15.08% | **96.79%** | 2.00% |
| **PT-USDe-7MAY2026 / USD1** | 11.82M | 8.53% | 95.80% | 2.29% |
| **USDe / USD1** (Fixed) | 2M | 1.44% | 0% | 2.00% |
| **USDe / USD1** (Flexible) | 1.99M | 1.43% | 97.04% | 2.49% |
| **Subtotal Ethena-related** | **~$36.7M** | **~26.5%** | | |

Other notable USD1 allocations (non-Ethena): cbBTC analog absent; instead BTCB ($10M + $1.99M), wstETH absent on BSC. The biggest non-Ethena leg is `USDF / USD1` ($36.32M, 0.16% util — basically idle) and `USDT & USDC / USD1` ($32.62M, 93% util).

#### Lista U Vault ($69.32M total)

| Market | Allocation | % | Util |
|---|---|---|---|
| **sUSDe / U** (Fixed) | 10M U | 14.42% | 80.48% |
| **USDe / U** (Fixed) | 2.7M U | 3.89% | 0% |
| **Subtotal Ethena-related** | **~$12.7M** | **~18.3%** | |

Top market is `BTCB / U` ($18.55M, 25.7%, 25.69% util) — leverage-long-BTC borrowers, not Ethena.

#### Lista USDT Vault ($6.95M total)

| Market | Allocation | % | Util |
|---|---|---|---|
| **sUSDe / USDT** (Fixed) | 2.18M USDT | 31.41% | **100.00%** |
| **sUSDe / USDT** (Flexible) | 95.79K | 1.37% | 16.31% |
| **Subtotal Ethena-related** | **~$2.28M** | **~32.8%** | |

#### Cross-vault Ethena footprint

**Total Ethena-side allocation across the three USD-quoted Lista vaults: ~$51.7M**, or about 24% of the $215M aggregate. For context: total sUSDe in circulation on BSC = **28,083,204 sUSDe** (~$34M at ~$1.20 unit price; verified from BscScan token page for `0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2`). Practically every sUSDe on BSC is being looped through Lista.

### 3. Who supplies the stablecoin (= the "Ethena role")?

Top depositors (share-token holders) of each Lista vault, queried via Dune (`tokens_bnb.transfers`):

#### Lista USD1 Vault — `0xfa27f172e0b6ebcef9c51abf817e2cb142fbe627`

| Rank | Address | USD1 shares | % of vault | DeBank profile |
|---|---|---|---|---|
| 1 | `0xac3e216bd55860912062a4027a03b99587b7ffc7` | 116,408,188 | **84.07%** | $498.57M wallet, BNB Chain only. $90M USD1 idle + $302M Lista DAO + $43.7M Venus. Already known as "the largest slisBNB whale, lender not looper" from existing `lista-dao-architecture.md`. |
| 2 | `0x2ec2e52d6700933fb4b6fda6b7ca71347f94226f` | 17,613,514 | 12.72% | (not yet profiled) |
| 3 | `0x18709e89bd403f470088abdacebe86cc60dda12e` | 1,050,132 | 0.76% | **HTX exchange** ($1.575B portfolio) |
| 4 | `0x084caf1bf60e49aec07ec4148a3f1f0f57fd11eb` | 986 | dust | — |

Top-3 = **97.5% of the vault**.

#### Lista U Vault — `0x9a17fd5cb8efc25d11567e713ae795a89775a759`

| Rank | Address | U shares | % of vault | DeBank profile |
|---|---|---|---|---|
| 1 | `0x18709e89bd403f470088abdacebe86cc60dda12e` | 43,545,136 | **62.83%** | **HTX exchange** — $1.575B total, 91% on Ethereum, $92M on BSC, $49M of which is in Lista DAO. 1285 days old. |
| 2 | `0xc1b6f1908748f45ef94711a49d3c82d9cb5b082a` | 14,969,438 | 21.59% | $141.35M Safe multisig, BSC only, **117 days old**. $82M U idle in wallet + $26M Venus + $15M Lista. |
| 3 | `0x5ae55c61e952bdbb69a57938b1df14b89279ecca` | 9,481,643 | 13.68% | $80.19M Safe multisig, BSC only, **117 days old (sister wallet of #2)**. $50M U idle + $19M PCS + $11M Lista. |
| 4 | `0x00eb0f1a5d32eb69df1d9d98862bf3058ca6a3ea` | 967,185 | 1.40% | (not yet profiled) |

Top-3 = **98.10% of the vault**. Wallets #2 and #3 were both deployed 117 days ago — almost certainly the same OTC desk / market-maker operating two Safes.

#### Lista USDT Vault — `0x6d6783c146f2b0b2774c1725297f1845dc502525`

| Rank | Address | USDT shares | % of vault | DeBank profile |
|---|---|---|---|---|
| 1 | `0x1d60bbbef79fb9540d271dbb01925380323a8f66` | 6,480,660 | **93.31%** | $14.67M Safe multisig, 484 days old. Holds **LISTA token + lisUSD + FDUSD + Cake** — fingerprint matches a **Lista DAO treasury / ops Safe**. |
| 2 | `0x064a739a88741c1e2962c7841a3882bdd497480c` | 140,015 | 2.02% | — |

Top-1 = **93% of the vault**.

#### Aggregation: who actually supplies the $215M of stable lending on Lista?

| Entity | USD1 | U | USDT | Total | % of $215M |
|---|---|---|---|---|---|
| `0xac3e216…ffc7` (slisBNB whale) | $116.4M | — | — | $116.4M | 54% |
| HTX exchange (`0x18709e89…12e`) | $1.05M | $43.5M | — | $44.6M | 21% |
| Sister Safes #2/#3 (`0xc1b6…082a` + `0x5ae55…ecca`) | — | $24.5M | — | $24.5M | 11% |
| Lista DAO Safe (`0x1d60bbbe…f66`) | — | — | $6.48M | $6.5M | 3% |
| `0x2ec2e52d…226f` (USD1 #2) | $17.6M | — | — | $17.6M | 8% |
| Everyone else | dust | dust | $0.47M | <$5M | <3% |
| **Sum (top 5)** | | | | **~$210M** | **~97%** |

**Five wallets supply ~97% of the borrowable stablecoin liquidity that funds Lista's sUSDe/USDe/PT-USDe loopers.** This is dramatically more concentrated than Ethereum's Sentora PYUSD vault (where the top depositor was 23.6% and the top 11 spanned multiple known protocols).

### 4. Who borrows the stablecoins (= the "syrupUSDC looper" role)?

Top wallets that posted sUSDe as collateral to the Moolah controller `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` (Dune query 7335789):

| Rank | Address | Net sUSDe collateral | Notes |
|---|---|---|---|
| 1 | `0x7fa9ae25d2666f142d2e974a0ba537056be18e9a` | 13.40M sUSDe (~$16M) | — |
| 2 | `0x0ad500d23a43ae9b26a570cfb02b68c48a866565` | 5.79M sUSDe (~$7M) | — |
| 3 | `0x298e013544c56aa8cd0ca7770b8680fa3bbe0d64` | 3.23M sUSDe (~$3.9M) | — |
| 4 | `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` | 1.47M sUSDe net | **Multi-Protocol Farmer** from `benchmark-farmers.md` — runs 3 parallel sUSDe → USD1/U/USDT loops at HR=1.02 |
| 5 | `0x2604839110e921916c157b37d8e6790565db6d38` | 1.23M sUSDe net | **Flagship benchmark farmer** from `benchmark-farmers.md` — leveraged sUSDe carry + XAUt arb + stable rotation, $5.6M total |
| 6 | `0xb70e998999707d1208a90699b5ea8f792c00b6f6` | 686K sUSDe | — |
| 7 | `0xd998d01d1e94ce97ed18af4438797ebee305acba` | 408K sUSDe | — |

Total in top 7 ≈ $33M, which essentially equals the entire sUSDe collateral footprint on BSC.

The borrower side is **real, demand-driven leveraged Ethena yield farming** — not a self-deposit pattern. The supply side is **passive whale liquidity**. The pattern is exactly Saul's thesis with a different choice of yield asset (sUSDe instead of syrupUSDC).

## Interpretation: how this maps to Saul's thesis

### "The Ethena method" — same form, different actors

| Question | Ethereum (Saul's example) | BSC |
|---|---|---|
| Who is the yield asset? | syrupUSDC (Maple) | sUSDe / USDe / PT-USDe (Ethena) |
| Who supplies the borrow stable? | Sentora-curated PYUSD vault, dominated by a $605M whale and 3 yield-routing vaults (ether.fi liquidUSD, YO yoUSD, Steakhouse) | Lista-curated USD1/U/USDT vaults, dominated by **one $498M whale, the HTX exchange, two Safe multisigs from a single OTC, and a Lista treasury Safe** |
| Is the curator independent? | Yes — Sentora (ITB) | **No — Lista DAO curates Lista's own vaults** |
| Where does the borrowed stable go? | syrupUSDC loopers (Maple users) | sUSDe / USDe / PT-USDe loopers (Ethena users on BSC) |
| Effective utilization at top market | 91% | **96.79% – 100%** |

The key BSC-specific characteristics:

1. **Almost no diffusion of risk on the supply side.** Five wallets cover ~97% of the stable lending. On Ethereum the top 11 senPYUSDV2 holders covered ~75%.
2. **The biggest supplier is BNB-ecosystem-aligned** rather than Ethena-aligned. The slisBNB whale (`0xac3e216…ffc7`) holds $90M USD1 idle plus $116M in Lista USD1 — this looks like a **Binance / WLFI-aligned reserve** parking USD1 for yield. USD1 is World Liberty Financial's stablecoin and has a deep Binance/CZ relationship.
3. **An exchange is a structural lender.** HTX runs the U vault. This is unusual — exchanges normally don't on-chain-lend at scale.
4. **Lista DAO is partially funding its own market.** The $6.5M Lista treasury Safe is the dominant USDT vault depositor, meaning Lista is using its own balance sheet to bootstrap the Ethena-on-BSC loop, just as Maple/Ethena have a publicly-documented institutional lending agreement on Ethereum.

### "Mega arb — senior tranche, junior tranche" (n.d.)

Same dynamic: borrowers (junior tranche) take liquidation, rate, and duration risk to earn the gross sUSDe yield (~12-15%) minus borrow cost (~2%); the supplier wallets (senior tranche) sit at first-loss-protected positions earning 1-2% on idle USD1/U/USDT — risk-free-rate plus a tiny premium, essentially renting balance sheet to leveraged farmers.

### "Redemption squeeze" (n)

The squeeze risk is **structurally worse on BSC** than on Ethereum:

- **Higher utilization** (96.79% vs 91% on the headline market).
- **More concentrated supplier base.** If the slisBNB whale withdraws their $116M from USD1 vault (or worse, all $302M from Lista DAO), there is *no one else of comparable size* to take the other side.
- **Single-venue secondary market.** sUSDe on BSC trades primarily on PancakeSwap and the Ethena BNB redemption rail. If the loop unwinds, sUSDe needs to be sold back into a much thinner pool than syrupUSDC's Balancer venue.
- **Curator alignment.** Because Lista DAO is both the curator and a substantial supplier, the protocol cannot act as a fully neutral risk manager — it has its own balance-sheet exposure to the same tail.

In a stress event (e.g. an Ethena de-pegging fear, or the whale rebalancing into another opportunity), the cascade looks like: whale withdrawal request → Lista must reallocate out of sUSDe market → loopers face spiking borrow APY → forced sell of sUSDe on PancakeSwap → sUSDe de-pegs → 91.5%-equivalent LLTV buffer evaporates → liquidations → a positive feedback loop into more whale withdrawal.

## Methodology & sources

- **Lista UI** (`lista.org/lending/earn`): vault list, per-vault allocation tables, utilization, APYs, total Lending TVL — captured 2026-04-18.
- **BscScan**: token contract verification for sUSDe (`0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2`), Lista vault contracts; identified circulating sUSDe on BSC.
- **Dune query 7335781** (Lista USD1 Vault top depositors).
- **Dune query 7335782** (Lista U + USDT Vault top depositors, combined).
- **Dune query 7335789** (top sUSDe collateralizers on Moolah controller).
- **DeBank**: portfolio profiling for `0xac3e216…ffc7`, `0x18709e89…12e` (HTX), `0xc1b6f190…082a`, `0x5ae55c61…ecca`, `0x1d60bbbe…f66`.
- **Existing repo cross-references**: `lista-dao-architecture.md` (Moolah controller, BNB vault context), `benchmark-farmers.md` (sUSDe loopers already profiled), `bsc-midsize-defi-users.md`.

## Open questions / follow-ups

1. **Identify `0x2ec2e52d6700933fb4b6fda6b7ca71347f94226f`** — the #2 USD1 vault depositor ($17.6M, 12.7%) is unprofiled. Likely another whale or another Lista-aligned wallet.
2. **Confirm `0xc1b6f190…082a` and `0x5ae55c61…ecca` are the same operator** by checking signer overlap on each Safe (BscScan multisig signer sets).
3. **Confirm `0x1d60bbbe…f66` is a Lista DAO Safe** by inspecting transfer history with known Lista treasury / multisig addresses.
4. **Was the slisBNB whale onboarded as a designated LP?** Check first interaction date with Lista — is this organic capital or was it seeded as bootstrap liquidity?
5. **Compare to Avalon / Kinza / Venus**: do other BSC lending venues also have sUSDe markets, and if so, who supplies the borrow side there? If Lista is the only meaningful venue, then the squeeze risk is worse than estimated above.
6. **PT-USDe-7MAY2026 / USD1 maturity risk.** PT tokens have a hard expiry; if the loop unwinds near maturity, the rate dynamics change. Worth a dedicated note.

## Lessons learned

- **Lista DAO is the BSC equivalent of Sentora + Maple combined into one entity.** It curates the vaults, hosts the lending markets, runs a treasury Safe that supplies into them, and owns the LSD asset (slisBNB) used as one of the major collaterals. Risk visibility on BSC is therefore harder — there's no third-party curator to publish independent risk reports the way Sentora does for PYUSD.
- **Almost all sUSDe on BSC is on Lista.** When 100% of a yield-asset's circulating supply is concentrated in one venue at >90% utilization, it is structurally a single point of failure. The sUSDe holdings on BSC (~$34M) are too small for the situation to be systemic for Ethena globally, but it's a meaningful chunk of the BSC stablecoin yield economy.
- **Concentration is sometimes hidden by vault aggregation.** Lista's UI shows clean numbers ("USD1 vault: $138.5M"), but on-chain queries show 84% of those shares are held by one wallet. Always pull share-token holders, never trust aggregate vault-level metrics for risk assessment.
- **Different chain, same playbook.** The Ethena-method / mega-arb / redemption-squeeze mechanics from Saul's Ethereum example apply 1:1 on BSC, with worse parameter values and worse supplier diffusion. n.d.'s "everybody's doing it, no one cares" is empirically true.
