---
title: Stress-test of the "Babylon × Aave V4 → BSC" replication thesis
topic: BSC RWA Lending
chain: BSC
verified: 2026-04-23
tags: [bsc, rwa, buidl, benji, vbill, babylon, aave-v4, aave-horizon, lista-moolah, venus, thesis-review]
---

# Stress-test of the "Babylon × Aave V4 → BSC" replication thesis

A thesis circulated proposing that BSC should replicate the Babylon × Aave V4 model in two ways:

1. **Scheme A** — push Babylon to deploy its trustless Bitcoin Vault on BSC so native BTC can serve as collateral on Venus / Lista DAO.
2. **Scheme B** — build a Morpho-style isolated-market RWA lending hub on BSC using BlackRock BUIDL, Franklin Templeton BENJI, and VanEck VBILL as collateral, framed as the "BSC version of Aave Horizon."

Both schemes would draw on the existing ~$2B of "dormant RWAs" already issued on BSC.

This document stress-tests the thesis with on-chain evidence. The conclusion is that **the BSC-native RWA inventory is dormant by design, not by neglect**, and that the Aave Horizon experiment on Ethereum already proves the demand-side problem the thesis assumes can be solved.

## TL;DR

| Claim from the thesis | Reality (verified) |
|---|---|
| ~$500M BUIDL on BSC could be activated as DeFi collateral | ✅ $508M exists, **but 99.98% sits in a single custody EOA with one inbound transfer ever and zero DeFi activity on any chain** |
| ~$113M BENJI on BSC, idem | ✅ $113.7M exists, **99.99% in one EOA with $6.34 net worth across all other chains** |
| ~$21M VBILL on BSC, idem | ✅ $21.3M exists, **96.7% in a Gnosis Safe multisig with 4 ExecTransaction calls total** |
| Lista DAO needs to "upgrade architecture to Morpho/Euler style" | ❌ Lista Moolah is already a Morpho Blue fork supporting isolated markets and curators |
| Venus needs a curator mechanism | ⚠️ Venus has a working risk team + permissioned listing process; curators-as-a-product is not the bottleneck |
| BSC could be first-mover for RWA-collateral lending | ❌ Aave Horizon launched Aug 27 2025 on Ethereum and **after 8 months has $0 BUIDL collateral, $0 USYC collateral, $0 JTRSY collateral, $24 spent in incentives per $1 earned** |
| Push Babylon to deploy BTC Vault on BSC | ❌ No Babylon roadmap item for BSC; Aave V4's Bitcoin Spoke is targeted at Aave's mainnet hub |
| BTCB on BSC is "substantial" and would benefit | ✅ True ($428M across Venus / Aave V3 / Lista CDP), **but the existing BTCB market is ~94% idle** (6% utilization on Venus, 4% on Aave V3) — adding a new BTC representation does not solve a demand problem |

## 1. Who actually holds the BSC RWAs

Verified addresses (Securitize-deployed, cross-checked with RWA.xyz live data):

| Token | Contract on BSC | Total BSC supply | Top holder | % of supply | Holder type |
|---|---|---|---|---|---|
| BUIDL | `0x2d5bdc96d9c8aabbdb38c9a27398513e7e5ef84f` (6 dec) | $508,365,439 | `0x2004f7f7b600d962170d7f28114cc123c5e98451` | 99.98% | EOA, multichain net worth = $77 in tokens across all *other* chains, **zero DeFi positions on any chain** (DeBank `complex_protocol_list` returns `[]`); single inbound transfer 2025-11-18, zero outbound |
| iBENJI | `0x3d0a2A3a30a43a2C1C4b92033609245E819ae6a6` (18 dec) | $113,711,597 | `0xf466c570c19db7565daabeb802d6fd1df7766ac8` | 99.99% | EOA, multichain net worth = $6.34 (gas dust on ETH), no DeFi |
| VBILL | `0x14d72634328c4d03bba184a48081df65f1911279` (6 dec) | $21,262,257 | `0x9932282f443b69383e652c0e4ce3816af1ca3b4a` | 96.7% | **Gnosis Safe multisig** (Safe Proxy 1.4.1), only 4 ExecTransaction calls in history, no DeFi |

Combined, **>$642M of BSC RWAs sits in three institutional custody wallets that have never touched a DeFi protocol on any chain.** This is consistent with the Nov 14, 2025 BUIDL-on-BSC announcement, which framed the deployment as **off-exchange collateral on Binance via Ceffu's triparty banking agents** — i.e. a CeFi product, not a DeFi market.

Note: Securitize built the DeFi-wrapped variant `sBUIDL` (with sToken framework — KYC + transfer restrictions in the contract) explicitly for **Ethereum and Avalanche only**, in May 2025. They had every opportunity to extend it to BSC at the November 2025 launch and chose not to. The BSC share class is a deliberate CeFi-collateral instrument.

### Look-alike traps

A naive search for "BUIDL on BSC" returns `0xfa4c775800a63f16214ef4215cad5da983b7a314`, which has source code:

```solidity
contract BUIDL is ERC20, Ownable {
    constructor() ERC20("BUIDL", "BUIDL") Ownable(msg.sender) {
        _mint(_owner, 68_000_000 * 1e18);
    }
}
```

That is a basic OpenZeppelin ERC20 with hardcoded 68M mint and 18 decimals, deployed April 2026. Real Securitize BUIDL uses the `DSToken` proxy pattern with 6 decimals. Same trap exists for "Benji" at `0x15d29c42981e2319e01079c81b56603c5f334444` (1B supply, 83K transfers — clearly a meme/scam token, not Franklin Templeton's iBENJI).

## 2. The Aave Horizon experiment is the control group

Aave Horizon is exactly the product the thesis proposes to replicate. It launched **August 27, 2025** on Ethereum with:

- Permissioned RWA-collateral lending with shared stablecoin liquidity
- Native (non-wrapped) RWA tokens as collateral via issuer allowlists
- LlamaRisk as risk service provider, Chainlink for NAV oracles
- Direct partnerships with Circle, Franklin Templeton, VanEck, Superstate, Centrifuge

Eight months of operating data, from a recent Aave governance forum analysis ([thread #24159](https://governance.aave.com/t/aave-labs-86-million-23-of-the-token-supply-and-this-is-their-track-record/24159)):

| Metric | Value |
|---|---|
| Total deposits | $466M |
| Stablecoin deposits (idle / earning incentives) | $322M (69% — RLUSD $214M, GHO $80M, USDC $28M) |
| RWA collateral supplied | $144M (31%) |
| Of that, **Superstate USCC** (private credit, ~7-8% native yield) | **$135M (94% of all RWA collateral)** |
| VBILL supplied as collateral | $6.2M |
| JAAA supplied | $2.5M |
| USTB supplied | $0.4M |
| **BUIDL supplied as collateral** | **$0** |
| **USYC supplied as collateral** | **$0** |
| **JTRSY supplied as collateral** | **$0** |
| Total RWA borrower wallet count | 15 (94% of borrows against USCC) |
| Largest 3 positions = % of pool | 59% |
| Cumulative DAO revenue | ~$216K |
| Cumulative DAO incentives + GHO carry cost | ~$5.25M |
| Implied burn ratio | **$24 spent per $1 earned** |

The key takeaway: **the BUIDL/BENJI/USYC asset class — exactly the collateral set the BSC thesis depends on — has produced zero borrowing activity on Aave Horizon despite ideal conditions.** The only RWA category with real borrowing is private credit (USCC), where the ~7-8% native yield is high enough that levered looping makes sense. Treasury tokens at 4-5% net yield don't loop economically against any reasonable stablecoin borrow rate.

## 3. Why the demand problem is structural

| Mechanism | Why it kills demand |
|---|---|
| Yield arbitrage | BUIDL pays ~4.5% (Treasury yield). Borrowing USDT/USDC against it costs ~3% on Lista/Venus *only because of subsidies*. ~1.5% net spread before risk, gas, and liquidation buffers — institutions don't open KYC pipelines for this |
| Borrower base | Aave Horizon's RWA borrower count is **15 wallets globally**. Zero of those 15 are on BSC. The deck assumes a borrower pool that hasn't shown up to the existing Ethereum version |
| Issuer intent | Securitize built `sBUIDL` for DeFi on Ethereum/Avalanche, **not BSC**. BSC's BUIDL share class is purpose-built for Binance VIP off-exchange margin |
| Substitution | Institutions that want yield-bearing stable collateral against stablecoin borrows already use sBUIDL on Euler/Morpho or Aave Horizon on Ethereum. There is no unmet demand BSC can capture |
| KYC scope | Reg D 506(c), $5M minimum subscription for BUIDL. Realistic borrower set on BSC today: single-digit institutions |

## 4. Existing BSC architecture vs the deck's recommendations

| Deck recommendation | Reality |
|---|---|
| "Help Lista DAO upgrade to Morpho-style isolated markets" | **Already done.** Lista Moolah is a Morpho Blue fork. Isolated markets, curator slots, RWA-friendly market parameters all supported today. See `research/venues/lista-dao.md` |
| "Introduce curator mechanism on Venus (MEV Capital, RE7, etc.)" | Venus has a working risk team and a governance proposal listing process. Curators-as-a-product is not the bottleneck; the absence of fee-paying RWA TVL is |
| "Lista DAO Vault Interconnectivity (slisBNB → borrow from U Vault, SolvBTC → mint lisUSD)" | Already supported architecturally. slisBNB and SolvBTC are both already collateral types in Lista CDP / Moolah |
| "Drive integrations with Anchorage Digital, Taurus custodians" | Worth doing, but custody integration isn't the constraint. The custody wallets (above) already exist on-chain — they're choosing not to lend |
| "Reference Morpho's KYC-wrapped collateral token design" | Lista Moolah inherits Morpho Blue's permissionless market creation. KYC is enforced at the issuer (Securitize) layer via allowlist on the token itself, exactly like Aave Horizon. No additional infrastructure needed |

In short: Lista Moolah could list a BUIDL/BENJI/VBILL isolated market via one governance vote tomorrow. **Nobody has filed that proposal, because there are no committed borrowers.**

## 5. Where the deck's logic could still survive

There is one narrow angle that on-chain evidence does not refute:

**A CeFi ↔ DeFi bridge product on top of the existing Binance VIP / Ceffu BUIDL collateral position.** Specifically: let an institution that's already pledging BUIDL on BSC as Binance off-exchange margin *simultaneously* mirror that position into Lista Moolah to borrow lisUSD/USDT for delta-neutral basis trading or funding-rate harvesting. That uses BSC's actual structural advantage (Binance's institutional desk + Lista on the same chain) and produces a borrowing motive (basis ≠ Treasury yield).

This is a product partnership with Binance VIP / Ceffu, not a "build a generic RWA lending market" play. It does not require Babylon, does not require Aave V4, and does not require a Hub-and-Spoke model.

## 6. Scheme A specific notes (Babylon BTC Vault on BSC)

- **No public Babylon commitment to BSC.** The Babylon × Aave V4 Bitcoin Spoke is targeted at Aave's Ethereum hub, testing Q1 2026, launch April 2026 pending Aave governance.
- **Existing BTCB market on BSC is structurally underused, not under-supplied:**
  - Venus Core: $352M BTCB supply, **6% utilization**, 0.21% supply APY
  - Aave V3 BSC: $75M BTCB supply, **6% utilization**, 0.07% supply APY
  - Lista CDP: $2M BTCB collateral
- Adding a new "native BTC" representation does not solve "BTCB is sitting idle." The supply-side is fine; demand for BTCB-collateralized borrowing is what's missing.

## 7. Recommendation

**Do not pursue Direction Two as written.** The thesis assumes an architectural gap on BSC and an untapped institutional borrower base. Both assumptions fail under on-chain inspection. Aave's eight-month, $5.25M experiment with the same assets on a friendlier chain is the proof.

If a scaled-down version is pursued, anchor it on the only piece that has structural support:

> A bilateral product with Binance VIP / Ceffu that lets a holder of BUIDL-as-margin on Binance also collateralize the same position on Lista Moolah for stablecoin borrow against funding-rate basis trades, without re-onboarding KYC.

This is testable with a single pilot institution, does not require new chain-level infrastructure, and produces a borrowing reason (basis ≠ Treasury yield).

## Sources

- Dune queries
  - [7361903 — BSC RWA tokens supply verification](https://dune.com/queries/7361903)
  - [7361915 — Find Securitize DSToken contracts on BSC](https://dune.com/queries/7361915)
  - [7361918 — Real BUIDL on BSC supply verification](https://dune.com/queries/7361918)
  - [7362318 — BSC RWA holders identity check](https://dune.com/queries/7362318)
- DeBank API: `total_balance` and `complex_protocol_list` on the three top holders (`0x2004f7f7…`, `0xf466c570…`, `0x9932282f…`)
- BscScan address pages for the three top holders + the BUIDL `0x2d5bdc96…`, iBENJI `0x3d0a2A3a…`, VBILL `0x14d72634…` token contracts
- Franklin Templeton Benji DevHub (canonical iBENJI address)
- RWA.xyz live data for BUIDL ($508M on BSC, 4 holders) and VBILL ($21M on BSC, 3 holders)
- [Babylon Labs blog: Babylon × Aave V4 partnership](https://babylonlabs.io/blog/babylon-labs-and-aave-labs-partner-to-bring-native-bitcoin-backed-lending-to-aave-v4)
- [Aave Horizon: Built for institutions](https://aave.com/blog/horizon-built-for-institutions)
- [Aave governance forum thread #24159 — Horizon performance review](https://governance.aave.com/t/aave-labs-86-million-23-of-the-token-supply-and-this-is-their-track-record/24159)
- [Cointelegraph: sBUIDL explained (Ethereum + Avalanche only)](https://cointelegraph.com/explained/sbuidl-blackrocks-tokenized-treasury-fund-explained)
- Existing benchmark in `research/assets/BTCB.md`, `research/venues/lista-dao.md`, `research/venues/aave-bsc.md`, `research/venues/venus.md`
