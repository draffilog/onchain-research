# Session: 2026-04-18 — AI Agent Best Practices for DeFi Research

**Agent:** Cursor agent (Opus-class)
**User:** repo owner
**Duration:** ~30 minutes of web research + writeup
**Related files:** `research/ai-agent-best-practices.md` (created this session)

## What was researched

User asked: "Browse the web and find what people are sharing publicly about how they operate crypto/DeFi research agents. Specifically check Hermes (crypto agent) and Agent Zero (research/auto-tracking)."

Goal: identify best practices the leading agent ecosystems are using, so we can compare to and improve our own setup.

## What the AI got wrong initially

- Treated "Hermes" and "AgentZero" as if they referred to specific known crypto research tools. They turned out to be much broader:
  - **Hermes Agent** is Nous Research's general-purpose autonomous agent (not crypto-specific), though heavily used in crypto contexts
  - **Agent Zero** is `agent0ai/agent-zero` — a self-evolving Docker-isolated framework, also general-purpose, with no specific crypto focus per official docs
- Initially planned to use the browser MCP to scrape live X/Twitter — but search snippets returned higher-signal data than the dynamic pages would have. Adapted approach: WebSearch + WebFetch on substantive blog/Substack posts instead.
- Did NOT initially recognize that the `agentskills.io` open standard is the same SKILL.md format we already use — only realized the portability implication after reading the standards page.

## What the user contributed

User specifically named **Hermes** and **AgentZero** (note user's spelling) as targets — without those leads, the research would have been much less focused. The user's instinct that "people share their setups openly" was correct: Mteam's blog and Hermes Atlas reports were the highest-leverage sources.

## Key insights discovered

1. **Our setup matches industry-leading patterns** — bounded knowledge file (INDEX.md ↔ Hermes' MEMORY.md), skills folder (compatible with agentskills.io spec), session logs (Hermes-style learning loop), pre-commit safety hooks (novel — most don't have this).
2. **The agentskills.io standard is universal** — Cursor, Claude Code, Codex, Gemini CLI, OpenCode, Goose, OpenHands, Letta, GitHub Copilot all support the same SKILL.md format. Our skills are portable across all of them.
3. **Crypto-specific gotcha: training cutoffs are mid-2025** — coding agents hallucinate Foundry/Alloy/chain-specific behavior. Forced web search is mandatory.
4. **Supply chain attacks on skills are real** — Snyk reported "ToxicSkills" malware in ClawHub marketplace. Never blindly install skills from marketplaces.
5. **AgentFi (protocol-side agents) is now mainstream** — 68% of new DeFi protocols launch with built-in AI agents in Q1 2026. We should add an "AgentFi profile" column to venue cards.
6. **Multi-agent verification gives ~42% accuracy gain** on complex financial forecasting (per ByteDance DeerFlow data). Worth implementing for high-stakes findings.

## Verification sources used

- [Hermes Atlas State Report](https://hermesatlas.com/reports/state-of-hermes-april-2026) — primary source for Hermes architecture
- [agentskills.io](https://agentskills.io/) — open standard documentation
- [Mteam's agentic crypto workflow](https://mteam.space/posts/my-workflow-for-agentic-engineering-in-crypto) — practitioner-shared workflow
- [Alea Research on Herd](https://alearesearch.substack.com/p/herd-ai-agent-terminal-for-onchain) — competitor research terminal
- [BlockEden on AgentFi](https://blockeden.xyz/blog/2026/03/28/agentfi-table-stakes-ai-agent-defi-protocols-autonomous-finance-mainstream/) — protocol-side agent stats
- [Crypto Briefing on Morpho Agents](https://cryptobriefing.com/morpho-agents-ai-integration-launch/)
- [VoltAgent/awesome-agent-skills GitHub](https://github.com/VoltAgent/awesome-agent-skills)
- [Microck crypto-research skill](https://github.com/Microck/ordinary-claude-skills)
- WebSearch for "AGENTS.md" / "skills folder" / Twitter agent setups (snippets only)

## Open questions / follow-ups

- **Auto-skill-generation hook** — design and prototype a hook that synthesizes a SKILL.md from a completed research session. Open question: how does the agent know what's "transferable" vs "one-off"?
- **Try installing one community skill** to test the agentskills.io interop claim (carefully — read source first per security guidance)
- **Try Herd / Sage Agent** when accessible — could replace some Dune query writing
- **AGENTS.md at repo root** — write a concise version following [agentsmd.net](https://agentsmd.net/) format
- **External memory provider trial** — Mem0 or Supermemory for cross-session semantic recall

## Footnotes for future agents

The most surprising finding: **we accidentally built a working approximation of Hermes Agent's architecture** without knowing it existed. The convergence (bounded memory file, skills folder, persistent rules, session logs) suggests these are not arbitrary design choices but genuine patterns. Future agents iterating on this setup should treat the convergence as evidence the architecture is on the right track.
