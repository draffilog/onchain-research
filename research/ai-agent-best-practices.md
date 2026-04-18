---
title: AI Agent Best Practices for DeFi & On-Chain Research
topic: Meta / Agent Setup
chain: N/A
verified: 2026-04-18
tags: [agents, hermes, agent-zero, agentskills, defi, methodology]
---

# AI Agent Best Practices for DeFi & On-Chain Research

Survey of how the leading agent frameworks and practitioners are operating in 2026, and what's transferable to this repo's setup.

> **Source caveat**: All findings below are from public web sources (project docs, GitHub READMEs, blog posts, Substack) verified between 2026-04-17 and 2026-04-18. Twitter/X content was accessed via search snippets, not direct DOM scraping. Re-verify before relying on numbers — agent ecosystem stars and feature lists move weekly.

## 1. Leading agent frameworks for DeFi/research

| Framework | Built by | Stars (Apr 2026) | Differentiator | Our overlap |
|---|---|---|---|---|
| **Hermes Agent** | Nous Research | 57.2K (6 weeks) | Bounded memory + auto-generated skills + 14-platform gateway | Skills folder, persistent files |
| **OpenClaw** | Anthropic ecosystem | ~250K | 22 channel integrations + 5,700-skill marketplace | Skills format compatibility |
| **Agent Zero** | agent0ai | 17K+ | Self-evolving, runs in isolated Docker, builds its own tools | Self-bootstrapping ethos |
| **DeerFlow** | ByteDance | 59.7K | Parallel sub-agents — 42% better accuracy on financial forecasts | Could inspire multi-agent verification |
| **Herd** | ex-Dune team | (early) | Onchain research terminal w/ smart contract "flows" | Direct competitor in research UX |
| **Letta** | Letta AI | (active) | Stateful agents with advanced memory + self-improvement | INDEX.md + corrections log idea |
| **Morpho Agents** | Morpho Labs | (live) | Machine-readable interface for AI agents on Morpho lending | Same lending-protocol space we research |

**Sources**: [Hermes Atlas state report](https://hermesatlas.com/reports/state-of-hermes-april-2026), [agentskills.io](https://agentskills.io/), [Alea Research on Herd](https://alearesearch.substack.com/p/herd-ai-agent-terminal-for-onchain), [Crypto Briefing on Morpho Agents](https://cryptobriefing.com/morpho-agents-ai-integration-launch/), [BlockEden AgentFi](https://blockeden.xyz/blog/2026/03/28/agentfi-table-stakes-ai-agent-defi-protocols-autonomous-finance-mainstream/).

## 2. The agentskills.io standard

`SKILL.md` files in folders are now an **open standard** ([agentskills.io](https://agentskills.io/)) originally developed by Anthropic and adopted by 30+ agent products including Cursor, Claude Code, Codex, Gemini CLI, OpenCode, Goose, OpenHands, GitHub Copilot, VS Code, Letta, Roo Code, and others.

**Format** (matches what we already use):
- Folder per skill
- `SKILL.md` with YAML frontmatter (`name`, `description`)
- Body in markdown
- Optional supporting files (scripts, references, examples)

**Implication for us**: our `~/.cursor/skills/` setup is portable — the same `SKILL.md` files would work in Claude Code, Codex, Gemini CLI, etc. without modification.

**Marketplaces**:
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — 1000+ curated skills
- LobeHub Skills Marketplace — search/install via `npx @lobehub/market-cli`
- ClawHub — 5,700+ skills (be cautious; see security section)

## 3. Hermes Agent's three core architectural bets

These map directly to choices we should consider for our setup.

### Bet 1: Bounded memory forces consolidation
- `MEMORY.md`: 2,200 character hard cap
- `USER.md`: 1,375 character hard cap
- When you hit the limit, you can't add — you must **consolidate**
- Anchored on the same insight as LLM attention: you can't attend to everything, so you must learn what matters

**Our equivalent**: `INDEX.md` is bounded by being auto-generated (one row per file, no narrative). `CORRECTIONS.md` is append-only and could grow unbounded — we should consider a rotation policy.

### Bet 2: Auto-generated skills from completed tasks
Hermes synthesizes a permanent skill document after completing a complex task. Next time it sees a similar problem, it loads the skill instead of starting from zero.

**Our equivalent**: We hand-author skills (like `bnb-lst-research`). Could be automated — a hook that runs after a substantial research session and asks the agent: "did you learn a transferable workflow? Synthesize it as a skill in `~/.cursor/skills/`."

### Bet 3: Multi-level memory hierarchy
1. In-prompt: `MEMORY.md` + `USER.md` (always loaded)
2. Session: SQLite with FTS5 full-text search (recall-on-demand)
3. External: 8 pluggable providers (Honcho, Mem0, Supermemory, etc.) for graph/semantic memory

**Our equivalent**:
1. In-prompt: `.cursor/rules/onchain-research-hub.mdc` + `INDEX.md`
2. Session: research files in git history (recall via grep/read)
3. External: not currently used — could add Mem0 or similar for cross-session semantic search

## 4. Crypto-specific lessons (from a working practitioner)

From [Mteam's "My Workflow for Agentic Engineering in Crypto"](https://mteam.space/posts/my-workflow-for-agentic-engineering-in-crypto), Feb 2026.

### Mindset
- **Treat context as precious currency** — bloated MCPs and long threads cause "context rot" (measurable LLM degradation, [arxiv 2510.05381](https://arxiv.org/html/2510.05381v1))
- **Document intent in markdown** — code comments are dead, `AGENTS.md` / plans / READMEs work
- **Think before you prompt** — the goal is to enable the agent to run productively for as long as possible without your intervention

### Crypto-specific gotchas (most relevant to us)
1. **Training data cutoff is mid-2025** — for any crypto code/protocol, agents will hallucinate. **Always force web search before working.**
2. **Non-Ethereum chains are dangerous** — agents assume L2s have public mempools, etc. *Explicitly tell agents to verify chain assumptions* before writing any chain-specific code.
3. **Foundry/Alloy** — encourage agents to research the latest version, not their training-time version
4. **Use `5.2 Pro` / Codex for planning** — coding agents don't push back on bad ideas; planning models do
5. **Skills > slash commands** for repeated workflows
6. **Parallel agents in git worktrees** (e.g., [`sir`](https://github.com/mteam88/sir) tool) for non-blocking development

### Security — critical for crypto agents
- **Supply chain attacks on skills**: [Snyk reported "ToxicSkills" malicious agent skills on ClawHub](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/). Don't blindly install from marketplaces. **Read the SKILL.md source before installing.**
- **Malicious Cursor/VSCode extensions**: [example: Anivia OctoRat attack chain](https://hunt.io/blog/malicious-vscode-extension-anivia-octorat-attack-chain)
- **Never hardcode private keys in `.env`** — agents WILL accidentally read them and may leak. Use Alloy encrypted keystores or a hardware wallet
- **Isolation policy**: keep dev machine (with AI access) completely separate from any machine that touches mainnet funds
- **Don't rely on agents to read code for malware** — they can be trivially prompt-injected to conceal payloads
- **Always require human audits** for production smart contracts

## 5. AgentFi: the protocol-side trend

68% of new DeFi protocols launched in Q1 2026 ship with **built-in AI agents**. Users say "Maximize my yield across Aave, Compound, Kamino" in natural language; agents autonomously monitor rates, bridge funds, and rebalance — without per-tx approval.

| Platform / signal | What they do |
|---|---|
| Walbi (beta) | 1,000 users → 9,500 agents → 187,000 trades. Retail-facing autonomous strategies, no code |
| Morpho Agents | Machine-readable interface for AI agents to interact with Morpho lending directly |
| Zerion API | Used by [@HeyElsaAI](https://x.com/HeyElsaAI), [@pigeon_trade](https://x.com/pigeon_trade), [@askginadotai](https://x.com/askginadotai) for interpreted blockchain data (PnL, positions across 8K+ protocols) |
| ERC-8004 | On-chain identity NFTs for agents — 130K+ agents have on-chain identities since Jan 2026 |
| x402 protocol | Agent-to-agent micropayments on Solana — generated $31B volume in 2025 (per Hermes Atlas) |

**Implication for our research**: when we research a protocol, we should also document if it has an agent-facing API or an "AgentFi" mode. That's a new column in the venue cards.

## 6. Real-world DeFi research tooling people share

| Tool / approach | Source | Why it matters |
|---|---|---|
| DeerFlow multi-agent | ByteDance (59.7K stars) | Parallel sub-agents → 42% better accuracy on complex financial forecasting |
| Crypto Research skill | [microck/ordinary-claude-skills](https://github.com/Microck/ordinary-claude-skills) (124 stars) | 12 specialized agents (market, macro, news, technical, etc.) with timestamped output dirs |
| CoinMarketCap MCP | [pro.coinmarketcap.com/api/documentation/ai-agent-hub/cursor](https://pro.coinmarketcap.com/api/documentation/ai-agent-hub/cursor) | Cursor-native MCP for price data |
| Etherscan MCP | (used by Mteam workflow) | Direct contract/transaction access without scraping |
| context7 MCP | (used by Mteam workflow) | Up-to-date library docs to combat training-cutoff hallucinations |
| 5.2 Pro / Deep Research for planning | Mteam workflow | Generates a markdown plan, then handed to coding agent — adds the "push back on bad ideas" the coding agent can't do |
| Raycast Snippets vs slash commands | Mteam workflow | Keeps prompts ergonomic without bloating skills surface |

## 7. Concrete improvements we should consider for this repo

Ranked by leverage:

| # | Improvement | Why | Effort |
|---|---|---|---|
| 1 | **Add a top-level `AGENTS.md`** following the [agentsmd.net](https://agentsmd.net/) standard with concise dos/don'ts, plus crypto-specific warnings (training cutoff, chain assumption verification, no `.env` private keys) | Makes the repo readable by ANY skill-aware agent (Claude Code, Codex, Cursor, Gemini CLI), not just Cursor | Low |
| 2 | **Add context7 MCP** for up-to-date library docs | Combats training-cutoff hallucinations on libraries/APIs | Low |
| 3 | **Add Etherscan MCP / BscScan equivalent** | Direct contract data without scraping | Low-Med |
| 4 | **Auto-skill-generation hook** — at session end, if the agent learned a transferable workflow, prompt it to synthesize a `SKILL.md` in `~/.cursor/skills/` | Hermes-style learning loop | Medium |
| 5 | **Bounded `CORRECTIONS.md` with rotation** — when it exceeds N entries, archive older ones to `CORRECTIONS-archive-YYYY.md` | Prevents the "always-loaded" file from growing unbounded | Low |
| 6 | **Multi-agent verification for high-stakes findings** — after primary agent produces a finding, spawn a verifier subagent that re-runs the on-chain queries and reports any discrepancy | DeerFlow shows 42% accuracy gain | Medium |
| 7 | **External semantic memory** (Mem0 or similar) for cross-session topic recall | Lets agents find relevant prior research without grepping | Medium |
| 8 | **Per-protocol "AgentFi profile"** in venue/asset cards — does this protocol have agent APIs? Did it ship native agents? | Captures emerging protocol-level agent integration | Low |
| 9 | **A `security.md` with our crypto agent rules** — no hardcoded keys, isolation policy, supply chain warnings | Documented security posture | Low |
| 10 | **Try Herd terminal** when it goes live — could be a faster source than raw Dune for smart contract flow analysis | Reduces query-writing overhead | (Future) |

## 8. What we're already doing right

Cross-referenced against best practices:

| Best practice | Our implementation |
|---|---|
| Skills folder with YAML frontmatter | ✅ `~/.cursor/skills/` follows agentskills.io spec |
| Persistent rules in repo | ✅ `.cursor/rules/onchain-research-hub.mdc` |
| Bounded knowledge index | ✅ `research/INDEX.md` (auto-generated) |
| Source-tracked findings | ✅ "Verified via" / "Source" columns |
| Pre-commit safety checks | ✅ `scripts/check-regressions.sh` + `guard-onchain-commit.sh` hook |
| Session logs preserving reasoning | ✅ `research/sessions/` with template |
| Append-only correction log | ✅ `CORRECTIONS.md` |
| Document intent in markdown | ✅ `README.md`, `research/AGENTS.md`, rule files |
| Stop hook to remind about uncommitted findings | ✅ `~/.cursor/hooks/check-research-changes.sh` |
| Zero-assumption methodology | ✅ Rule explicitly disallows training-data-only claims |

## 9. Live monitoring sources (Twitter/X)

These accounts and outlets share workflows publicly — worth watching for new patterns:

- [@NousResearch](https://x.com/NousResearch) — Hermes Agent updates
- [@Teknium](https://x.com/Teknium) — Hermes co-founder, ships PRs publicly
- [@steipete](https://x.com/steipete) — agentic engineering practitioner, writes [oracle](https://github.com/steipete/oracle/) tooling
- [@AleaResearch](https://x.com/AleaResearch) — onchain research methodology
- [@andrewhong5297](https://x.com/andrewhong5297) — ex-Dune, builds Sage Agent / Herd
- [@HeyElsaAI](https://x.com/HeyElsaAI), [@pigeon_trade](https://x.com/pigeon_trade), [@askginadotai](https://x.com/askginadotai) — production crypto agents, share architecture
- Hermes Atlas blog ([hermesatlas.com](https://hermesatlas.com/)) — ecosystem map, weekly state-of reports
- Alea Research Substack — agent infrastructure deep dives

When new patterns emerge in this space, append findings here and update `CORRECTIONS.md` if any earlier claim above is invalidated.
