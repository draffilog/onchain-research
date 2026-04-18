#!/bin/bash
# Pre-commit safety check — scans staged diff for regression patterns.
# Exits non-zero if dangerous patterns found.
# Usage: ./scripts/check-regressions.sh  (from repo root, with changes staged)

set -u

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

FAIL=0
WARN=0
messages=()

add_error() { FAIL=1; messages+=("ERROR: $1"); }
add_warn() { WARN=1; messages+=("WARN: $1"); }

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Not a git repo, skipping regression check"
  exit 0
fi

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR 2>/dev/null || true)
if [[ -z "$STAGED_FILES" ]]; then
  echo "No staged changes, nothing to check"
  exit 0
fi

# Check 1: Truncated wallet addresses being ADDED
# Pattern: 0x followed by 4-8 hex, then "...", then 4-8 hex (truncated form)
# Only flag if added (lines starting with "+" in diff)
TRUNCATED=$(git diff --cached -U0 -- 'research/**/*.md' '*.md' 2>/dev/null | \
  grep -E '^\+[^+]' | \
  grep -oE '0x[0-9a-fA-F]{3,8}\.\.\.[0-9a-fA-F]{3,8}' | \
  sort -u || true)

if [[ -n "$TRUNCATED" ]]; then
  count=$(echo "$TRUNCATED" | wc -l | tr -d ' ')
  add_error "Found $count truncated wallet address(es) in staged diff. Full 42-char addresses are required."
  messages+=("  Examples: $(echo "$TRUNCATED" | head -3 | tr '\n' ' ')")
  messages+=("  Fix: expand each to the full 0x... address (42 chars). Check BscScan if you lost the full form.")
fi

# Check 2: Files shrinking dramatically (>40% smaller)
for file in $STAGED_FILES; do
  if [[ ! -f "$file" ]]; then continue; fi
  if [[ "$file" != *.md ]]; then continue; fi

  new_size=$(wc -c < "$file" 2>/dev/null || echo 0)
  old_size=$(git show "HEAD:$file" 2>/dev/null | wc -c | tr -d ' ' || echo 0)

  if [[ "$old_size" -gt 1000 ]] && [[ "$new_size" -lt "$((old_size * 60 / 100))" ]]; then
    shrink_pct=$(( (old_size - new_size) * 100 / old_size ))
    add_warn "$file shrank by ${shrink_pct}% (${old_size} → ${new_size} bytes). Confirm this is intentional."
  fi
done

# Check 3: Top-level section deletions in research/ files (removed `## ` lines)
# Only warn if there are MORE deleted sections than added
for file in $STAGED_FILES; do
  if [[ ! -f "$file" ]]; then continue; fi
  if [[ "$file" != research/*.md ]]; then continue; fi

  added_sections=$(git diff --cached -- "$file" 2>/dev/null | grep -cE '^\+## ' || echo 0)
  removed_sections=$(git diff --cached -- "$file" 2>/dev/null | grep -cE '^\-## ' || echo 0)
  added_sections=${added_sections//[[:space:]]/}
  removed_sections=${removed_sections//[[:space:]]/}

  if [[ "$removed_sections" -gt "$added_sections" ]] && [[ "$removed_sections" -gt 1 ]]; then
    add_warn "$file: removed $removed_sections section(s), added $added_sections. Confirm intent."
  fi
done

# Check 4: Forbid adding unverified-looking claims without source column
# Heuristic: added TVL/$USD amounts without nearby "verified" or "source"
# (skipped — too noisy. Relies on rule-based reminders instead.)

if [[ $FAIL -eq 1 ]] || [[ $WARN -eq 1 ]]; then
  echo "========================================"
  echo "Regression check findings:"
  echo "========================================"
  for m in "${messages[@]}"; do
    echo "  $m"
  done
  echo "========================================"
fi

if [[ $FAIL -eq 1 ]]; then
  echo ""
  echo "COMMIT BLOCKED. Fix the errors above, re-stage, and try again."
  echo "To bypass (dangerous): git commit --no-verify"
  exit 1
fi

if [[ $WARN -eq 1 ]]; then
  echo ""
  echo "Warnings only. Commit will proceed — but confirm the warnings are expected."
  exit 0
fi

echo "Regression check passed."
exit 0
