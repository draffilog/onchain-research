---
title: BSC DeFi Protocol Catalog (DeBank-indexed)
topic: BSC DeFi
chain: BSC
verified: 2026-04-17
tags: [bsc, catalog, debank, protocols]
---

# BSC DeFi Protocol Catalog (DeBank-indexed)

**Purpose:** DeBank maintains a canonical list of every DeFi protocol on BSC, each tagged with a category (Lending, Yields, Staking, Derivatives, DEX, CDP, Bridge, etc.) and a live TVL. This file is the **authoritative protocol surface** the weekly agent uses to:

1. Answer "are we missing any venue?" — by diffing DeBank's protocol list against our V1 venue coverage.
2. Enrich asset cards — for each asset, list every DeBank-tracked protocol that currently holds it (not just the 4 venues in V1).
3. Standardize protocol naming across research files.

**Source:** DeBank Pro API endpoints
- `GET /v1/protocol/list?chain_id=bsc` — full BSC catalog
- `GET /v1/protocol?id=<id>` — per-protocol detail including token TVL breakdown

**Helper scripts:** [`code/debank-queries.sh`](../code/debank-queries.sh) functions:
- `debank_protocol_list bsc`
- `debank_protocol_list_summary bsc`
- `debank_protocol <id>`
- `debank_protocol_tokens <id>`
- `debank_token_protocol_presence <addr> bsc`

---

## V1 venue ↔ DeBank protocol-id mapping

| V1 Venue | DeBank `id` (canonical) | Category tags | Venue file |
|---|---|---|---|
| Lista DAO | `lista` | Staking, Lending, CDP | [`venues/lista-dao.md`](venues/lista-dao.md) |
| Venus | `venus` | Lending | [`venues/venus.md`](venues/venus.md) |
| Aave V3 (BNB Chain) | `bsc_aavev3` | Lending | [`venues/aave-bsc.md`](venues/aave-bsc.md) |
| Pendle | `pendle2` | Yields | [`venues/pendle-bsc.md`](venues/pendle-bsc.md) |

**Confirm these IDs on first run** — DeBank occasionally changes slugs after rebrands. Use `debank_protocol_list_summary bsc | grep -i lista` etc. to verify.

---

## Full BSC catalog (auto-populated weekly)

The weekly agent should write the current catalog into the table below by running:

```bash
source code/debank-queries.sh
debank_protocol_list_summary bsc > /tmp/catalog-bsc.tsv
```

Then render as a markdown table, filtered to protocols with **TVL ≥ $1M** (adjust threshold as needed), sorted by TVL descending.

### Template

| DeBank ID | Name | Category | TVL USD | Site | Covered in V1? | Notes |
|---|---|---|---|---|---|---|
| lista | Lista DAO | Staking, Lending, CDP | _tbd_ | https://lista.org | yes | LST + Moolah + CDP |
| venus | Venus | Lending | _tbd_ | https://venus.io | yes | Core Pool only in V1 |
| bsc_aavev3 | Aave V3 | Lending | _tbd_ | https://aave.com | yes | — |
| pendle2 | Pendle | Yields | _tbd_ | https://pendle.finance | yes | active markets only |
| ... | ... | ... | ... | ... | no | candidate for V2 expansion |

Fields:
- **Covered in V1?** — `yes` if a file exists in `venues/`, `no` otherwise.
- **Notes** — one-line rationale for inclusion/exclusion (e.g., "DEX, out of V1 lending/yield scope", "under $500K TVL filter", "candidate for V2").

---

## Coverage gap analysis (what V1 intentionally misses)

The V1 asset benchmark is scoped to **lending + yield + CDP + Pendle-style yield-separation** venues with pools ≥ $500K TVL. By design it excludes:

| Category | Examples on BSC (DeBank-tracked) | Why excluded |
|---|---|---|
| AMM DEX | PancakeSwap V2/V3, Thena, Uniswap V3, Biswap | Separate asset model — LP tokens, not lending pools |
| Perp DEX | Aster, Level Finance, BounceBit Premium, ApolloX | Different risk model (oracle, funding rates) |
| Yield aggregators | Beefy, Alpaca Finance, Pancakeswap Syrup Pools | These stack on top of venues we already track |
| Bridges | Stargate, Celer, Multichain (paused) | Not yield venues |
| Options | Thetanuts | Small TVL on BSC |
| LSD/LRT issuers (non-BSC source) | Kernel DAO, BounceBit, etc. | Their receipt tokens already appear in our assets if they hit ≥ $500K on Lista/Venus/Aave/Pendle |

**Agent rule:** if DeBank's weekly diff shows a **new protocol** in `Lending`, `Yields`, `CDP`, or `Staking` category with TVL ≥ $10M that is NOT already covered, flag it in the weekly snapshot under "Open Questions for Next Week" for V2 scope review.

---

## Per-asset DeBank enrichment (what to populate weekly)

For each asset in [`assets/_index.md`](assets/_index.md), the weekly agent may add a frontmatter field listing every DeBank-tracked protocol (any category) that currently holds a meaningful position in the asset. This captures usage beyond V1 venues.

```yaml
# inside research/assets/<SYMBOL>.md frontmatter
debank_tracked_protocols:
  # populated from: debank_token_protocol_presence <contract> bsc
  - id: pancakeswap
    name: PancakeSwap V3
    category: DEX
    holding_usd: 12500000
  - id: thena
    name: Thena
    category: DEX
    holding_usd: 840000
  - id: kernel
    name: Kernel DAO
    category: Staking
    holding_usd: 560000
```

**Budget:** 1 call per protocol × ~30 protocols per asset = ~30 calls/asset. With 37 assets, naive enumeration costs ~1,100 calls/week. Instead, run a **single batch per snapshot**:

1. Call `debank_protocol_list bsc` once → get full catalog (1 call).
2. Call `debank_protocol <id>` for each protocol with `tvl ≥ $10M` (~30-50 calls) → get `token_list` per protocol.
3. In memory, invert to build `asset → [protocols]` map.
4. Write to each asset card's frontmatter.

Total cost: ~50 calls/week (vs ~1,100 naive). Acceptable per the [methodology rule](../.cursor/rules/lst-research-methodology.mdc) ("budget ~30-50 calls per research topic").

---

## Known DeBank quirks (to remember)

- **Protocol IDs change after rebrands.** Lista DAO was previously "Helio Protocol" on DeBank (id: `helio`). Always re-verify IDs before a weekly run.
- **DeBank's `tvl` for a protocol can differ from our Dune-derived TVL.** DeBank aggregates all deposits including un-tracked sub-contracts; Dune typically underestimates if we don't enumerate every sub-contract. When numbers disagree, trust DeBank for **presence** and Dune for **precision**.
- **DeBank does not index every token.** Long-tail meme tokens and newly-launched LSTs may not appear until after DeBank's listing team adds them. If an asset card references a DeBank field that's missing, treat as "not yet indexed" rather than "not in use".
- **DeBank aggregates per-chain.** Multi-chain protocols (e.g., Morpho, Aave) appear as chain-specific entries (`morpho` on Ethereum, `bsc_morpho` or similar on BSC). Always filter by `chain=bsc` or the chain-scoped id.
- **Rate limits.** Pro API has generous per-second quotas but daily caps. For this benchmark's ~50 calls/week, rate limits are never the bottleneck; cost is.

---

## Cross-references

- [`research/AGENTS.md`](AGENTS.md) — the weekly procedure that includes the catalog refresh step.
- [`code/debank-queries.sh`](../code/debank-queries.sh) — helper functions used by this catalog.
- Pre-existing deep-dive research that used DeBank per-wallet analysis: [`research/bnb-lst-market.md`](bnb-lst-market.md), [`research/bsc-midsize-defi-users.md`](bsc-midsize-defi-users.md), [`research/pendle-bsc-markets.md`](pendle-bsc-markets.md), [`research/lista-dao-yield-strategies.md`](lista-dao-yield-strategies.md), [`research/xaut-farming-wallets.md`](xaut-farming-wallets.md).

---

## Status

**Current state (2026-04-18 baseline):** Template only; catalog table is empty pending first run with a valid `DEBANK_API_KEY`. The weekly agent should populate this on the next run and diff on subsequent runs.

When populated, the diff between two successive versions of this file (captured in git history) is what surfaces "new protocols on BSC" in the weekly snapshot.
