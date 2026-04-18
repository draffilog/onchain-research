---
name: defi-benchmark
description: >-
  Build and maintain a structured, machine-readable, time-series benchmark of a
  chain's DeFi landscape (assets, venues, weekly snapshots) that other agents
  can update on a recurring schedule. Use when the user wants a reproducible
  "state of DeFi on chain X" tracker, a weekly diff report, a scope-disciplined
  asset inventory, or to extend an existing benchmark to a new chain or venue.
  Reference implementation: /Users/user/lst-research/research/ for BSC.
---

# Structured DeFi Benchmark Pattern

Most "DeFi research" output is a one-shot snapshot — useful for a day, stale
in a week, impossible to diff. This skill teaches a different shape: a
**structured, machine-readable benchmark** that another agent can refresh
weekly, with the diff itself becoming the unit of insight.

The reference implementation is BSC at `/Users/user/lst-research/research/`.
It tracks 37 assets across 4 venues with a $500K TVL filter and a fully
specified runbook in `research/AGENTS.md`. Read that file before doing any
benchmark work — it is the canonical procedure. **Do not duplicate its
content into new files; reference it.**

## When to use this pattern

Use this when the user asks for:

- A reproducible inventory of yields/positions across a chain's lending,
  CDP, and yield-token venues
- Weekly, monthly, or recurring snapshots showing what changed
- A "state of DeFi on chain X" report that won't go stale
- Extending the existing BSC benchmark to a new chain (Ethereum, Solana,
  Arbitrum, Base, etc.) or a new venue category
- A delegated workflow another agent can pick up

Do **not** use this pattern for one-off questions ("what's the APY on Aave
USDT today?") or single-wallet investigations — those belong in
`research/sessions/` or a single `research/<topic>.md` file.

## The four-layer structure

Every benchmark following this pattern has the same four layers:

| Layer | Purpose | Example file |
|---|---|---|
| **Runbook** | Step-by-step procedure for the recurring agent. Sources of truth, schema, things-not-to-do, snapshot template. | `research/AGENTS.md` |
| **Asset cards** | One YAML+markdown file per tracked asset. Frontmatter is machine-readable; body is human context. | `research/assets/<SYMBOL>.md` |
| **Venue inventories** | One file per protocol with its current pool table. Git history of these files IS the diff source. | `research/venues/<protocol>.md` |
| **Snapshots** | One file per run. Diff of this week vs last week, plus aggregate stats. | `research/snapshots/YYYY-MM-DD.md` |

Plus a small **catalog file** (`research/<chain>-defi-catalog.md`) that maps
the chain's full protocol universe (via DeBank or DeFiLlama) and explicitly
documents what's *excluded* from the benchmark. This is scope discipline —
without it, the benchmark balloons forever.

## Why each layer is non-negotiable

1. **Runbook (`AGENTS.md`)** — the delegation contract. Without this, every
   agent that touches the benchmark reinvents the procedure. The runbook
   names every API endpoint, every filter threshold, every thing-NOT-to-do.
   Treat it as the spec.

2. **Machine-readable asset cards** — the schema is the database. YAML
   frontmatter (`contract`, `decimals`, `yield_type`, `venues[]`,
   `aggregate`) lets agents update fields programmatically without parsing
   prose. The body is for human context (deep-dive links, history,
   discrepancy notes).

3. **Venue files as the diff source** — instead of building a custom diff
   pipeline, let `git diff HEAD -- research/venues/` be the source of truth.
   When the agent edits in place, git history captures what changed. This
   is the single biggest simplification.

4. **Snapshots as time-series** — even if a single snapshot looks like a
   data dump, the *sequence* of snapshots is the product. Week 2 is when
   you can say "slisBNB TVL +$50M, asBNB now in Kernel DAO ($2.3M new)."

## Hard rules (lifted from the reference implementation)

- **Scope discipline**: every benchmark has an explicit TVL floor (BSC uses
  $500K) and an explicit venue list (BSC uses Lista DAO, Venus, Aave V3,
  Pendle). Without these, agents add everything and the benchmark dies.
- **Document what you exclude**: the catalog file lists every category the
  benchmark intentionally skips (e.g., AMM DEXs, perps, bridges) with a
  one-line rationale. Future agents need to know the line wasn't drawn
  arbitrarily.
- **Discrepancy notes**: when a venue file disagrees with an older
  deep-dive file, say so explicitly in a "Discrepancy Notes" section. The
  reference implementation uses this for the $138M USD1-vs-USDT vault
  ambiguity. Don't silently overwrite — paper-trail the correction.
- **Asset cards never get deleted**: if TVL temporarily dips below the
  filter, mark `status: dropped` in frontmatter and keep the card for one
  cycle to confirm. Deletion loses provenance.
- **Don't combine related assets** (slisBNB + slisBNBx + clisBNB are
  distinct on-chain assets — separate cards).
- **Update `last_verified:` every run**, even when no other field changed.
  This is what makes staleness detectable.

## Asset card frontmatter schema

The canonical schema is documented in `research/AGENTS.md` (search for
"Asset card frontmatter schema"). Required fields:

- `symbol`, `name`, `category`, `contract` (full address, no truncation),
  `decimals`, `underlying`, `yield_type`, `last_verified`, `sources`,
  `venues[]` (with `protocol`, `role`, `tvl_usd`, `supply_apy`,
  `borrow_apy`, `pool_id_defillama`), `aggregate`

Optional:

- `debank_tracked_protocols[]` — cross-protocol holdings beyond the V1
  venue list, populated from DeBank Pro `protocol/list` enrichment

If the schema needs to change (new chain, new venue type), update
`AGENTS.md` first, then migrate cards. Don't let cards drift from the
schema silently.

## Recurring run procedure

The full eight-step weekly procedure lives in `research/AGENTS.md`. Summary
of what each run produces:

1. Refresh raw pool data (DeFiLlama yields API + Pendle V2 API)
2. Update `venues/*.md` in place
3. Update `assets/*.md` frontmatter (especially `last_verified` and `venues`)
4. Refresh DeBank protocol catalog into `<chain>-defi-catalog.md`
5. Enrich asset cards with `debank_tracked_protocols` cross-protocol view
6. Compute the diff (`git diff HEAD -- research/venues/ research/assets/`)
7. Write a new `snapshots/YYYY-MM-DD.md`
8. Commit with `git diff` review (the repo's `beforeShellExecution` hook
   blocks bad commits)

Don't reimplement these steps when AGENTS.md already specifies them. If
you're refining the procedure, update AGENTS.md and reference the new
behavior from your output — single source of truth.

## Extending to a new chain

When the user wants to extend the benchmark to ETH / Solana / Arbitrum /
Base / etc., copy the BSC structure:

1. Create `research/assets-<chain>/`, `research/venues-<chain>/`,
   `research/snapshots-<chain>/` (or per-chain subfolders inside each)
2. Pick the venue list — typically the chain's top 4-6 lending/CDP/yield
   protocols by TVL with a chain-appropriate TVL floor
3. Write a chain-specific `AGENTS-<chain>.md` (or extend the existing one
   with a chain selector) that points at the chain's data sources
4. Bootstrap one asset card per major asset (use the BSC slisBNB card as
   the schema reference)
5. Run procedure once to produce a baseline snapshot
6. Add a row to the top-level `README.md` "For AI Agents" table

The pattern is chain-agnostic. Only the data sources, venue list, and TVL
floor need re-tuning.

## Bootstrapping checklist

When asked to start a new benchmark from scratch:

- [ ] Confirm scope with the user: which chain, which venue categories,
  which TVL floor
- [ ] Confirm data source access: DeFiLlama (free), DeBank Pro (paid;
  budget ~30-50 calls per weekly run), Dune (paid execution), chain-native
  RPC if needed
- [ ] Pick the V1 venue list (4-6 protocols max — keep it tight)
- [ ] Draft the AGENTS-style runbook BEFORE writing any asset cards. The
  runbook freezes the schema; cards must conform to it.
- [ ] Bootstrap the catalog file first (one DeBank API call, sorted by TVL,
  filtered to ≥ $1M). Without this, the cross-protocol enrichment loop
  can't start.
- [ ] Run one full procedure end-to-end to validate. Commit as the baseline
  snapshot.
- [ ] Schedule the recurring agent (Cursor `stop` hook reminder, Hermes
  cron, GitHub Actions, etc.).

## Things to avoid

- **Duplicating runbook content** into multiple files. AGENTS.md is the
  spec. Skill files reference it; they don't restate it.
- **Adding a venue** without first updating the V1 venue list in the
  runbook. Scope creep kills benchmarks.
- **Editing snapshots after the fact**. Snapshots are immutable. If the
  data was wrong, file a CORRECTIONS.md entry and write a corrected
  snapshot for the *next* run.
- **Writing prose where YAML belongs**. If a field is going to be queried
  by another agent (TVL, APY, contract address), it goes in frontmatter.
  Prose is for context the agent doesn't need to parse.
- **Skipping the catalog refresh**. The catalog is what catches *new*
  protocols entering the chain. Without it, the benchmark only tracks what
  was already known when it was set up.

## Reference implementation files

When in doubt, read these in this order:

1. `/Users/user/lst-research/research/AGENTS.md` — the runbook
2. `/Users/user/lst-research/research/snapshots/2026-04-18.md` — example
   baseline snapshot showing the output shape
3. `/Users/user/lst-research/research/assets/_index.md` — example asset
   index
4. `/Users/user/lst-research/research/assets/slisBNB.md` — example asset
   card with full frontmatter schema
5. `/Users/user/lst-research/research/venues/lista-dao.md` — example venue
   inventory with discrepancy notes
6. `/Users/user/lst-research/research/bsc-defi-catalog.md` — example
   coverage gap analysis

The reference implementation is incomplete in two ways (as of 2026-04-18):
the DeBank catalog table is not yet bootstrapped (still `_tbd_`), and the
snapshot is a baseline with no diff. Both gaps close on the next weekly run.
