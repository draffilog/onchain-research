---
topic: Sentora PYUSD ↔ syrupUSDC self-lending loop (Morpho, Ethereum Mainnet)
chain: Ethereum
verified: 2026-04-18
tags: [morpho, sentora, pyusd, syrupusdc, maple, ethena, self-lending, lending, vault]
---

# Sentora PYUSD → syrupUSDC self-lending loop

## TL;DR

The Sentora-curated PYUSD MetaMorpho vault on Ethereum Mainnet holds
**$423.56M PYUSD** and allocates **$100.06M (23.6%) to a single market where
syrupUSDC is collateral and PYUSD is the loan asset** (LLTV 91.5%). That
market runs at ~91% utilization, meaning ~$91M of PYUSD is currently being
borrowed by wallets that post syrupUSDC as collateral.

This is the structural equivalent of "the Ethena method" on Aave:
- Ethena supplies ~sUSDe-equivalent USDT to each chain's Aave, so sUSDe
  loopers can borrow stablecoins against sUSDe collateral.
- Here, a single $605M whale address (plus a few smaller depositors)
  supplies PYUSD to Sentora, which is then lent back to syrupUSDC loopers.

Saul's thesis is: **syrupUSDC (Maple) is running the same loop via Morpho**
— a large LP supplies PYUSD into Sentora, Sentora routes it to the
syrupUSDC/PYUSD market, and Maple loopers borrow that PYUSD against their
syrupUSDC. "Self-lending" — the supplier and the underlying yield asset are
the same economic party.

## Saul's exact message (Discord)

> SyrupUSDC has $100M in the Sentora PYUSD vault, and that vault is lending
> — surprise! — $100M to SyrupUSDC

Follow-ups in the thread:
- n.d.: "the ethena method... doesnt ethena supply approximately the susde
  amount of usdt to each chains aave"
- Saul: "pretty much yes, everybody's doing it, no one cares"
- gryndamere: "until 👀"
- n.d.: "well its a mega arb tbh — senior tranche exposure while you pay out
  lower rates to junior tranchers"
- n: "the real risk to self lending is that when / if large redemptions it
  can exacerbate a squeeze on your own users"

## On-chain verification

### Protocol stack

| Role | Address | Notes |
|---|---|---|
| Morpho Blue singleton | `0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb` | Holds all market collateral/loan assets on Ethereum |
| Sentora PYUSD V1 (MetaMorpho) | `0x19b3cD7032B8C062E8d44EaCad661a0970DD8c55` | ERC-4626 vault, curator Sentora, symbol `senPYUSD`. $423.56M TVL |
| Sentora PYUSD Main V2 (Vault V2) | `0x13DE0cEE0B83562CBfD46682e10FfA4E3c5090e1` | Factory/meta contract for the V2 vault |
| Sentora PYUSDV2 share token | `0xb576765fB15505433af24fEe2c0325895C559FB2` | ERC-20 `senPYUS` — the actual V2 deposit receipt. Etherscan label: "Sentora PYUSDV2" |
| V2→V1 adapter | `0x80126555b170957dfed67a3BFbB7893e20fE4fC0` | Holds 100% of V1 senPYUSD shares; routes V2 deposits into V1 |
| PYUSD token | `0x6c3ea9036406852006290770BEdFcAbA0e23A0e8` | Paxos-issued, 6 decimals |
| syrupUSDC token | `0x80ac24aA929eaF5013f6436cdA2a7ba190f5Cc0b` | Maple's ERC-4626 yield token, 6 decimals |
| syrupUSDC/PYUSD market | `0xc9629945524f3fde56c7e8854a6c3d48e76b9d97236abbe73c750fcc7aeb8501` | Morpho Blue market ID (uniqueKey), LLTV 91.5% |

Architecture: user deposits PYUSD → V2 vault share token `0xb576...9fb2`
(senPYUSDV2) → adapter `0x80126555…` → V1 vault `0x19b3cD70…` → Morpho
Blue singleton → 9 PYUSD loan markets (syrupUSDC, sUSDe, cbBTC, weETH, etc.)

### The full Sentora PYUSD V1 vault allocation table

Verified via Morpho GraphQL on 2026-04-18:

| Market | Collateral | LLTV | Supplied (USD) | Utilization | Borrow APY |
|---|---|---|---|---|---|
| cbBTC / PYUSD | cbBTC | 86% | $199.96M (47%) | 90.00% | 2.29% |
| sUSDe / PYUSD | sUSDe | 91.5% | $139.97M (33%) | 89.91% | 2.16% |
| **syrupUSDC / PYUSD** | **syrupUSDC** | **91.5%** | **$99.98M (24%)** | **90.96%** | **4.33%** |
| WBTC / PYUSD | WBTC | 86% | $49.99M | 40.02% | 0.58% |
| wstETH / PYUSD | wstETH | 86% | $49.99M | 90.00% | 2.24% |
| weETH / PYUSD | weETH | 86% | $49.99M | 90.00% | 2.24% |
| LBTC / PYUSD | LBTC | 86% | $49.99M | 90.00% | 2.18% |
| PT-sUSDE-7MAY2026 / PYUSD | PT-sUSDE | 91.5% | $19.99M | 87.40% | 2.00% |
| sUSDS / PYUSD | sUSDS | 94.5% | ~$0 | 90.51% | 3.47% |

**Total V1 TVL: $423.56M** — of which $100.06M (23.6%) sits in the
syrupUSDC/PYUSD market. Two markets (sUSDe and syrupUSDC) account for 57%
of the vault and are both highly-levered stablecoin-yield loops.

Sources:
- Allocation screen: [Morpho UI](https://app.morpho.org/ethereum/vault/0x19b3cD7032B8C062E8d44EaCad661a0970DD8c55/sentora-pyusd)
- API: Morpho GraphQL `vaultByAddress(address: 0x19b3cD70..., chainId: 1)`
- Market confirmation: Morpho GraphQL `marketByUniqueKey` — Sentora PYUSD
  V1 is the **sole supplying vault** to the syrupUSDC/PYUSD market.

### The syrupUSDC/PYUSD market

Market `0xc9629945524f3fde56c7e8854a6c3d48e76b9d97236abbe73c750fcc7aeb8501`:
- Supply: $100.06M PYUSD (100% from Sentora vault)
- Borrow: $91.02M PYUSD
- Collateral: ~100.1M syrupUSDC posted
- Utilization: 90.96%
- Borrow APY: 4.33% | Supply APY: 3.93%
- LLTV: 91.5% (aggressive, reserved for "stable-on-stable" yield tokens)

**Top borrowers** (Morpho GraphQL `marketPositions`):

| Rank | Address | Collateral (syrupUSDC) | Borrow (PYUSD) |
|---|---|---|---|
| 1 | `0x24385a793F725328d7f6224430E48B4236326717` | 55.99M | $52.90M |
| 2 | `0x7bee8D37FBA61a6251a08b957d502C56E2A50FAb` | 10.66M | $10.74M |
| 3 | `0xd7583E3CF08bbcaB66F1242195227bBf9F865Fda` | 8.99M | $9.33M |
| 4 | `0xe7Cd2Fa44CCe16e70867338f7b9fd60AD3b9D4b5` | 5.19M | $5.41M |
| 5 | `0xe6D0CA9844F4c079E6e732f396EF3b9F98a2DAc8` | 4.00M | $3.81M |
| 6 | `0x00c04AE980A41825FCb505797d394090295B5813` | 2.44M | $2.30M |
| 7 | `0x8fD2d835bc5705D2578E81A05F822B4B90c12ac7` | 1.93M | $2.04M |
| 8 | `0xB8B827eaFB19dF6737935b3B3f6BeF855d2F8E84` | 1.99M | $1.95M |

The #1 borrower `0x24385a79…` is a verified contract created ~42 days ago
with method names like `AssembleBack…`, `UpdateAsset…`, `Deposit` — a
dedicated looping/strategy contract, $17K ETH dust, all $52.9M is in
Morpho collateral. The borrower set is concentrated: top 8 wallets account
for ~87% of the market's $91M borrow.

### Who funds the PYUSD side?

V1 share-token (senPYUSD) holders: a single address holds ~100% of V1
shares — the V2→V1 adapter `0x80126555b170957dfed67a3BFbB7893e20fE4fC0`
with $423.55M. So the V1 vault is, effectively, an implementation detail
of the V2 vault.

The "real" depositors are holders of the **V2 share token
`0xb576765fB15505433af24fEe2c0325895C559FB2` (senPYUSDV2)**. Top holders
(Dune query 7335712 + Etherscan):

| Rank | Address | Shares | % | Notes |
|---|---|---|---|---|
| 1 | `0x1FcC47Ee0f19CA0f07F8b987F0aD32ac204C03a7` | 49,955,270 | 23.62% | $605M multichain whale; $100M here, $184M USDT0 on Aave V3 Mantle, $321M on Plasma. See below. |
| 2 | `0x289c204b35859bfb924b9c0759a4fe80f610671c` | 15,242,211 | 7.21% | — |
| 3 | `0xc5e0e2bd8b8663c621b5051d863d072295da9720` | 14,265,114 | 6.74% | — |
| 4 | `0xac8ce2b915881f45e83ef5f0f5283356857bccba` | 12,497,949 | 5.91% | — |
| 5 | `0xf1f36f90cb0f258ec090ffbcab33b5b6dfb04403` | 11,061,112 | 5.23% | — |
| 6 | `0x08c6f91e2b681faf5e17227f2a44c307b3c1364c` | 10,563,483 | 4.99% | **ether.fi: liquidUSD Token** |
| 7 | `0x84ff7ef9568807c93436f09e2e613de2af3fe4ee` | 10,097,006 | 4.77% | — |
| 8 | `0x3bd9248048df95db4fbd748c6cd99c1baa40bad0` | 9,985,517 | 4.72% | **Steakhouse High Yield Instant V2** (another Morpho vault) |
| 9 | `0xa122687285dc5012141055a801045f069112e7c6` | 6,602,099 | 3.12% | — |
| 10 | `0xa56da9bb528fedf8379b02e95fbbdad34d45846f` | 6,001,458 | 2.84% | — |
| 11 | `0x0000000f2eb9f69274678c76222b35eec7588a65` | 5,006,044 | 2.37% | **YO: yoUSD Token** |

Critical observations:
1. The vault is not a broad retail-deposit vault. Three of the top-11
   holders are themselves yield-routing vaults from ether.fi, Yo.xyz, and
   Steakhouse — they pass retail stablecoin deposits through to Sentora.
2. The #1 holder, `0x1FcC47Ee0f19CA0f07F8b987F0aD32ac204C03a7`, holds
   23.6% of the vault's shares (~$100M) — almost exactly the amount the
   vault allocates to the syrupUSDC market.

### The `0x1FcC47Ee0f19CA0f07F8b987F0aD32ac204C03a7` whale

Verified via DeBank portfolio (2026-04-18):

- **Total net worth: $605,882,046** across 11 chains
- **Plasma: $321.21M (53%)** — Aave V3 supply
- **Mantle: $184.45M (30%)** — Aave V3, supplied as **USDT0** (184,394,508 USDT0)
- **Ethereum: $100.22M (17%)** — $100.05M in **Sentora PYUSD Main** vault, plus $163K in Merkl rewards (PYUSD + MORPHO)
- Wallet dust: $97K WXPL, $7K USDT, $6K USDC
- Interacted with Maple (shown as "$9 Maple" — dust)
- Funded ~273 days ago by `0xb454482f3e40b0b68e9e7df2e55f4a68ecb1c2`
- 383 transactions total; recent pattern is many "Accept New Token" / "Transfer" operations — consistent with an operational/treasury wallet that's dust-spammed

This wallet's fingerprint — huge, concentrated stablecoin lending positions
across multiple chains with no borrow side — matches the profile of an
**institutional capital provider / reserve fund**, not a retail user. The
Plasma+Mantle+PYUSD combo plus Merkl reward claims is consistent with an
Ethena-reserve-fund-style pattern (Ethena has an
[approved governance proposal](https://gov.ethenafoundation.com/t/reserve-fund-application-by-maple-finance-and-syrup/98)
to allocate its Reserve Fund into syrupUSDC, and lending agreements
between Ethena and Maple Institutional are publicly documented).

I did **not** conclusively identify the wallet's operator — Etherscan
shows no name tag, and it does not transact with any known-labeled Maple
or Ethena contract from my samples. But whether it's Maple treasury,
Ethena reserves, or a sophisticated third-party market-maker, the
structural claim holds: a single concentrated LP provides the majority of
the PYUSD liquidity that is lent right back to syrupUSDC loopers.

## Interpretation of Saul's thesis

Saul's phrasing "SyrupUSDC has $100M in the Sentora PYUSD vault" is about
the **economic effect**, not necessarily the Maple team as the literal
depositor:

1. A concentrated group of LPs (including vaults routing other people's
   money — ether.fi liquidUSD, YO yoUSD, Steakhouse High Yield Instant
   — plus the one $100M whale) is providing PYUSD to the Sentora vault.
2. The vault is the sole supplier to the syrupUSDC/PYUSD market and
   passes $100M straight through at 91.5% LLTV.
3. Borrowers of that $100M are posting syrupUSDC as collateral and
   borrowing PYUSD — the classic **loop on Maple's own yield token**
   (earn Maple's ~15-18% on syrupUSDC, pay 4.33% PYUSD borrow, buy more
   syrupUSDC). With 91.5% LLTV the max leverage is ~11.8x.
4. In aggregate, the pattern is self-lending: users who want more Maple
   yield are being funded by a (single or small) pool of LPs, and those
   LPs are collecting a premium above the risk-free rate to sit in a
   market whose sole risk = syrupUSDC solvency.

### "The Ethena method" (n.d.)

Ethena does the analogous thing on Aave: they supply USDT on each chain
where sUSDe is deposited as collateral, so sUSDe loopers always have a
counterparty. Ethena takes a spread between its basis-trade yield on sUSDe
and the borrow rate it pays itself back (through internal routing).

### "Mega arb — senior tranche, pay junior tranche less" (n.d.)

If Maple/Ethena/a consortium is the senior tranche (PYUSD supplier via
Sentora), and retail loopers are the junior tranche (syrupUSDC
collateralizers), the senior LP captures:
- Supply APY (3.93% today) on their PYUSD — essentially the risk-free
  on-chain rate + spread paid by loopers.
- If they're also the operator of Maple itself, the originator fees on
  every loan syrupUSDC funds.
- Borrowers (junior tranche) take liquidation risk, rate risk, and
  duration risk — but only get syrupUSDC yield minus borrow cost.

The "arb" is that the senior position in a first-loss-waterfall structure
is being paid at an undercollateralized rate: 3.93% for something that
only takes losses if syrupUSDC itself impairs by more than 8.5% (the
91.5% LLTV → 8.5% liquidation buffer).

### "Redemption squeeze" (n)

The hidden fragility: ~91% utilization on a $100M market means only ~$9M
liquid. If syrupUSDC holders want to redeem from Maple in a stress event:
1. Maple needs to return USDC to syrupUSDC holders.
2. If the large LP (whoever operates `0x1FcC47Ee...` or the ether.fi /
   YO vaults) also wants to withdraw their PYUSD from Sentora, Sentora
   must reallocate out of the syrupUSDC market.
3. That forces loopers to deleverage. With LLTV 91.5% and utilization
   already 91%, even a modest withdrawal push the rate up sharply
   and/or leave withdrawals queued.
4. Borrow-rate blow-up + forced deleveraging of the loopers → syrupUSDC
   gets dumped on Balancer (syrupUSDC's only secondary-market venue per
   the Ethena gov proposal) → syrupUSDC de-pegs → the LLTV buffer
   evaporates → liquidations cascade.

In short, the same party that benefits from the senior-tranche yield is
also exposed via its sub-strategy (maple) to the junior-tranche
redemption wave. They are on both sides of the ledger, and those sides
only appear hedged in calm markets.

## Methodology & sources

- **Morpho GraphQL** (`https://blue-api.morpho.org/graphql`): vault allocations, market suppliers, top borrowers — all verified 2026-04-18.
- **Morpho UI**: allocation screen at [`app.morpho.org/ethereum/vault/0x19b3cD70...`](https://app.morpho.org/ethereum/vault/0x19b3cD7032B8C062E8d44EaCad661a0970DD8c55/sentora-pyusd).
- **Etherscan**: contract label of the V2 share token (`Sentora PYUSDV2`), contract creation / creator trees.
- **Dune query 7335697** (Sentora PYUSD V2 inflows/flows): confirmed single-adapter routing.
- **Dune query 7335712** (senPYUSDV2 top holders): depositor concentration.
- **DeBank portfolio** for the #1 depositor whale.
- **Ethena governance proposal 98**: Maple/Syrup request to allocate Ethena's Reserve Fund into syrupUSDC (confirms the institutional relationship between Ethena and Maple underlying the "self-lending" pattern).

## Open questions / follow-ups

1. Conclusive identification of `0x1FcC47Ee0f19CA0f07F8b987F0aD32ac204C03a7`
   — is it an Ethena Reserve Fund address, a Maple/Syrup treasury, or a
   third-party market-maker acting for one of them? Arkham would likely
   have a tag.
2. The first-seen transaction date of the V2 vault and this wallet's
   participation — did the whale join at launch (bootstrap capital) or
   after? Affects whether this is organic demand or seeded liquidity.
3. Historical utilization on the syrupUSDC/PYUSD market — if it has sat
   near 91% the whole time, the spread Saul hints at is consistent and
   mechanical.
4. Cross-chain version: does Sentora run the same vault on Base /
   Plasma / etc., and is the same whale supplying PYUSD there too?

## Lessons learned / gotchas

- **Morpho V2 architecture is non-obvious.** The "vault address" the UI
  shows (`0x13DE0cEE...`) is a factory/meta contract. The PYUSD reserves
  and ERC-20 share token actually live at `0xb576765f...` and route into
  a V1 MetaMorpho vault via a dedicated adapter. To find depositors, you
  must query the V2 share token's holders, not the V1 vault.
- **Dune `tokens.transfers.amount` IS raw uint256**, not decimal-adjusted
  (contrary to my first filtering attempt). Always divide by
  10^decimals. Got zero rows on first pass because I over-filtered.
- **Morpho GraphQL's `vaultPositions` table doesn't see V2 depositors
  directly** — it shows only V1 shareholders. Follow the share-token
  onwards. Corollary: "Sentora PYUSD has $423M TVL" is correct but
  "who deposited that $423M?" needs the V2 share token (senPYUSDV2).
- **Morpho's V2 vault UI URLs occasionally 404** when deep-linked — the
  vaults page redirects to `/vaults`. Work around with the API.
