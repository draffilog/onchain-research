# Next Steps — Roadmap for Improving On-Chain Research with AI

> Living document. Captures the prioritized direction for this repo as of
> 2026-04-18. Re-read at the start of each session, update when a step is
> done or superseded. Companion to [`CORRECTIONS.md`](CORRECTIONS.md): one
> looks backward (what we got wrong), this one looks forward (what to build
> next).

## Current state (2026-04-18)

What's already shipped (see [`research/INDEX.md`](research/INDEX.md) for the
full file list):

- **V1 asset benchmark** — 37 assets across Lista DAO / Venus / Aave V3 /
  Pendle (≥ $500K TVL filter), with YAML frontmatter for diffing. See
  [`research/assets/_index.md`](research/assets/_index.md).
- **Venue inventories** — flat tables of pools per venue. See
  [`research/venues/`](research/venues/).
- **Baseline snapshot** — [`research/snapshots/2026-04-18.md`](research/snapshots/2026-04-18.md).
- **Agent runbook** — [`research/AGENTS.md`](research/AGENTS.md), the exact
  procedure for the recurring weekly job. **Currently a document, not a
  cron.** See step 1 below.
- **DeBank protocol catalog scaffold** — [`research/bsc-defi-catalog.md`](research/bsc-defi-catalog.md).
- **Benchmark farmers roster** — [`research/benchmark-farmers.md`](research/benchmark-farmers.md).
  6 BSC operators worth tracking. **Static list, not a watcher.** See step 3.
- **Cross-chain reference patterns** —
  [Sentora PYUSD/syrupUSDC on Ethereum](research/sentora-pyusd-syrupusdc-selflending.md)
  and its
  [BSC analog on Lista/Ethena](research/lista-ethena-selflending-bsc.md).
- **Methodology infrastructure** — `INDEX.md`, `CORRECTIONS.md`, session
  logs, regression-check pre-commit hook, asset-card schema baked into
  rules.

## Prioritized next steps

Ranked by leverage. Each step is sized for a single focused work session.

### 1. Automate the weekly runbook (HIGH — 2-3 hours)

[`research/AGENTS.md`](research/AGENTS.md) is a beautifully written runbook
that nobody is running. Until it's wired to a cron / GitHub Action, the
"recurring task" concept is theater and the V1 benchmark becomes a
2026-04-18 fossil within a month.

Minimum viable automation:

```
GitHub Action on a weekly cron →
  1. curl https://yields.llama.fi/pools  (filter: chain=BSC, project∈{lista,venus,aave-v3,pendle})
  2. curl DeBank protocol/list?chain_id=bsc           (needs DEBANK_API_KEY secret)
  3. python diff_snapshots.py last_week.json this_week.json
  4. write research/snapshots/YYYY-MM-DD.md
  5. open PR for human review
```

The PR-for-review pattern matters: it preserves the "verify before commit"
discipline. Don't auto-merge.

**Definition of done:** a PR opens automatically every Monday with the
week's diff, and a human reviews + merges it.

### 2. Add a "red-team" pass to the rules (HIGH — 30 minutes)

Before any research file gets committed, the agent writes a `## Red Team`
section answering: *"give me three specific reasons these numbers could be
wrong."*

Track record argues for this:

- asBNB rebasing claim — caught post-commit in `b81db80`
- XAUT 5-farmer undercount — caught post-commit, corrected three times
  (`cd9f629`, `35522be`, `e883520`)
- USD1 vault mislabeled as USDT — caught during V1 build
- ankrBNB ghost supply — caught post-commit

Every one of these would have been caught pre-commit by a structured
red-team pass. It is the cheapest, highest-ROI methodology change available.

Implementation: add a section to
[`.cursor/rules/onchain-research-hub.mdc`](.cursor/rules/onchain-research-hub.mdc)
requiring a `## Red Team` section in every new research file with at least
three falsifiability checks.

### 3. Turn benchmark farmers into a watcher (MEDIUM — 1 hour)

[`research/benchmark-farmers.md`](research/benchmark-farmers.md) lists 6
multi-strategy operators. The value-add is *diffing their positions over
time*, not the static roster.

A 30-line shell script using
[`code/debank-queries.sh`](code/debank-queries.sh):

```bash
for wallet in $(yq '.wallets[].address' research/benchmark-farmers.md); do
  debank_complex_protocol_list "$wallet" bsc > snapshots/farmers/${wallet}.${DATE}.json
done
diff_against_last_week → research/snapshots/farmers-${DATE}.md
```

Output: a weekly "what did the smart money do this week?" report. This is
plausibly the highest-signal weekly intelligence in the entire setup.

**Definition of done:** weekly cron emits a `farmers-<date>.md` showing
position changes per benchmark wallet.

### 4. Ship a BSC LST completeness pass (MEDIUM — 1 hour)

Finish what you started. Asset cards exist for ETH, asBNB, wBETH, wstETH,
slisBNB, slisBNBx, but the cross-protocol loops aren't fully closed for
each:

- Which is used as collateral where?
- Who is currently looping it (DeBank wallet sweep)?
- What's the live looping APY vs. the theoretical APY?
- What killed past loopers (link to liquidation forensics in
  [`research/bnb-lst-market.md`](research/bnb-lst-market.md))?

Treat one asset category end-to-end as the **showcase of "what deep
looks like."** Then replicate the depth pattern for BTC wrappers, fiat
stables, etc.

### 5. Formalize the trust hierarchy in the rules (LOW — 20 minutes)

We've learned the same lesson three times empirically. Codify it once:

| Question | Source of truth | Fallback | Why |
|---|---|---|---|
| Current wallet position (supply, borrow, health) | DeBank `complex_protocol_list` | Protocol UI | DeBank reads contract state directly |
| Historical activity (transfers, mints, looping attempts) | Dune | BscScan transfer logs | Indexed history, parametrizable queries |
| Current TVL / APY of a pool | Protocol UI (live) | DeFiLlama yields API | Protocol UI is freshest; DeFiLlama has 1-12h lag |
| Pool catalog across chains | DeFiLlama | DeBank `protocol/list` | Aggregator-grade coverage |
| Contract address of a token | CoinGecko + BscScan agree | Protocol docs | Defends against scam tokens |
| Token holder distribution | Dune | DeBank | Exact, reproducible |
| Cross-protocol presence of a token | DeBank `token` endpoint | — | Only DeBank has it |

Add to
[`.cursor/rules/onchain-research-hub.mdc`](.cursor/rules/onchain-research-hub.mdc).

## Defer (don't do yet)

These are tempting but premature. Revisit after step 1 is shipped.

- **More cross-chain pattern hunts** (Euler, Gearbox, Morpho on Base/Arb).
  The Sentora→Lista/Ethena transfer worked. Don't burn the pattern manually
  — let the automated weekly job surface candidates first.
- **More canvases.** Three already exist. Resist a fourth until you know
  which of the existing three actually gets opened.
- **Expanding the asset filter below $500K TVL.** It's the right filter.
  Stick to it.
- **Eval harness** (10 questions with known answers, measured weekly). Do
  this eventually, but only after step 1 is running — there's nothing to
  measure if the pipeline isn't producing output yet.
- **Skill / hook adoption from agentskills.io.** Worth surveying further
  (see [`research/ai-agent-best-practices.md`](research/ai-agent-best-practices.md))
  but lower leverage than steps 1-3 right now.

## Single-line summary

> **Automate AGENTS.md, add a red-team rule, build the benchmark-farmers
> watcher. Everything else is fine but secondary.**

Those three moves convert what's already built from a very good snapshot of
April 18 into a system that improves itself every week. Research quality is
already high — the bottleneck is now leverage, not insight.
