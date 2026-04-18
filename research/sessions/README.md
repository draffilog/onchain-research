# Research Session Logs

Per-session meta-logs capturing the reasoning, mistakes, and corrections from each research session. Different from `research/*.md` (which holds final findings) — these preserve the *process* so future agents can learn from past errors.

## When to create one

Every research session that produces new findings or corrects old ones. Name the file `YYYY-MM-DD-short-topic.md`.

## Template

```markdown
# Session: YYYY-MM-DD — Topic

**Agent:** model name (if known)
**User:** who led the session
**Duration:** approximate
**Related files:** `research/xxx.md`, `research/yyy.md`

## What was researched

Short paragraph on the goal.

## What the AI got wrong initially

- Bullet list of initial mistakes or bad assumptions
- Example: "Didn't know asBNB existed" / "Trusted DeFiLlama TVL without verifying on-chain"

## What the user corrected

- Bullet list of user interventions and knowledge the AI didn't have
- Example: "User mentioned asBNB existed — AI had no training data for it"

## Key insights discovered

- Findings that made it into `research/*.md`
- Link to specific sections

## Verification sources used

- Dune queries (IDs if saved)
- DeBank API calls
- Browser URLs checked
- Block explorer lookups

## Follow-ups / open questions

- Things worth re-verifying later
- New research threads opened
```

## Why this exists

The `research/*.md` files are the "textbook" — clean final findings. The session logs are the "lab notebook" — messy reasoning, dead ends, corrections. When an agent 3 months from now finds a contradiction with old research, the session log tells them WHY the old finding was what it was, which helps decide if it was a mistake or a point-in-time truth that's since changed.
