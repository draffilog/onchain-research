# Cursor Configuration Snapshot

**What this is**: a snapshot of the Cursor-level skills, hooks, and config that power this repo's agent workflow. These files normally live in `~/.cursor/` (not in any repo), which means they would be lost if a machine is rebuilt. This directory is a version-controlled backup and a reference for another contributor setting up the same environment.

**This is a snapshot, not a live install.** Editing files here does NOT change Cursor's behavior — the live files are at `~/.cursor/`. To propagate changes, copy in either direction (see "Syncing" below).

## Inventory

| File | Live location | Purpose |
|---|---|---|
| `hooks.json` | `~/.cursor/hooks.json` | Declares which hooks run on which events (`stop` + `beforeShellExecution`) |
| `hooks/check-research-changes.sh` | `~/.cursor/hooks/check-research-changes.sh` | `stop` hook — warns at end of session if this repo has uncommitted changes, with `git diff --stat` summary |
| `hooks/guard-onchain-commit.sh` | `~/.cursor/hooks/guard-onchain-commit.sh` | `beforeShellExecution` hook — intercepts `git commit` in this repo and runs `scripts/check-regressions.sh`; blocks the commit if regressions are found |
| `skills/on-chain-analysis/` | `~/.cursor/skills/on-chain-analysis/` | Global skill — Dune MCP + DeBank API + browser workflows for any EVM token |
| `skills/defi-benchmark/` | `~/.cursor/skills/defi-benchmark/` | Chain-agnostic methodology skill for the structured assets/venues/snapshots benchmark pattern documented in `research/AGENTS.md` |
| `skills/bnb-lst-research/` | `~/.cursor/skills/bnb-lst-research/` | BNB-specific skill: methodology + verified contract addresses + lessons learned from the asBNB discovery session |

## Installing on a new machine

```bash
# From the repo root:
mkdir -p ~/.cursor/hooks ~/.cursor/skills
cp cursor-config/hooks.json ~/.cursor/hooks.json
cp cursor-config/hooks/*.sh ~/.cursor/hooks/
chmod +x ~/.cursor/hooks/*.sh
cp -R cursor-config/skills/* ~/.cursor/skills/
```

Then verify:

```bash
ls -la ~/.cursor/hooks/      # expect check-research-changes.sh + guard-onchain-commit.sh, both executable
ls ~/.cursor/skills/          # expect bnb-lst-research, defi-benchmark, on-chain-analysis
cat ~/.cursor/hooks.json      # expect both hooks declared
```

Restart Cursor so the new hooks register.

## Machine-specific paths to adjust

Several files hardcode `/Users/user/lst-research` as the repo location and `/Users/user/.cursor/projects/...` for MCP tool schema paths. If this clone lives elsewhere, grep for these and adjust:

```bash
grep -r "/Users/user" cursor-config/
```

Key files that need path edits:
- `hooks/check-research-changes.sh` — `REPO=` variable
- `hooks/guard-onchain-commit.sh` — `REPO=` variable
- `skills/on-chain-analysis/SKILL.md` — MCP schema paths (`project-0-xaut-dune-dune/tools/...`)

## Syncing with live `~/.cursor/`

**Repo → live** (e.g., after pulling updates someone else pushed):

```bash
cp cursor-config/hooks.json ~/.cursor/hooks.json
cp cursor-config/hooks/*.sh ~/.cursor/hooks/
cp -R cursor-config/skills/* ~/.cursor/skills/
```

**Live → repo** (e.g., after you edited a skill in place and want to commit):

```bash
cp ~/.cursor/hooks.json cursor-config/hooks.json
cp ~/.cursor/hooks/*.sh cursor-config/hooks/
cp -R ~/.cursor/skills/bnb-lst-research cursor-config/skills/
cp -R ~/.cursor/skills/defi-benchmark cursor-config/skills/
cp -R ~/.cursor/skills/on-chain-analysis cursor-config/skills/
```

Consider a simple `scripts/sync-cursor-config.sh` wrapper if this becomes frequent.

## Related files inside the repo

- `.cursor/rules/onchain-research-hub.mdc` — project rule (always applied); this file is ALREADY version-controlled as part of the repo, unlike the above
- `.cursor/rules/lst-research-methodology.mdc` — per-file rule for LST research methodology
- `.cursor/rules/full-wallet-addresses.mdc` — rule forbidding truncated addresses
- `scripts/check-regressions.sh` — the pre-commit check invoked by `guard-onchain-commit.sh`
- `scripts/build-index.sh` — regenerates `research/INDEX.md` from frontmatter

These live in the repo because they're project-specific. The `cursor-config/` snapshot is for the global, user-level config that sits outside any project.

## Why we snapshot instead of symlinking

A symlink from `~/.cursor/skills/defi-benchmark` → `cursor-config/skills/defi-benchmark` would avoid the sync problem, but:

- Symlinks don't work across machines (the target path differs)
- Cursor sometimes behaves unpredictably with symlinked skill folders
- Snapshot + sync is explicit — you can see exactly what changed between versions via git diff

If the sync becomes painful, revisit.
