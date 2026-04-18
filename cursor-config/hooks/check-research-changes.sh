#!/bin/bash
REPO="/Users/user/lst-research"

if [ ! -d "$REPO/.git" ]; then
  exit 0
fi

cd "$REPO"
changes=$(git status --porcelain 2>/dev/null)

if [ -z "$changes" ]; then
  exit 0
fi

diff_summary=$(git diff --stat 2>/dev/null)
untracked=$(git ls-files --others --exclude-standard 2>/dev/null)

msg="There are uncommitted changes in the onchain-research repo ($REPO)."
msg="$msg\n\nChanged files:\n$changes"

if [ -n "$diff_summary" ]; then
  msg="$msg\n\nDiff summary:\n$diff_summary"
fi

if [ -n "$untracked" ]; then
  msg="$msg\n\nNew untracked files:\n$untracked"
fi

msg="$msg\n\nBEFORE committing, you MUST: 1) Run 'git diff' in $REPO and READ the actual changes. 2) Verify the changes are correct new research findings, not stale data or regressions. 3) Only then git add, commit with a descriptive message, and push. If the changes look wrong or stale, run 'git checkout -- .' to discard them instead."

echo "{\"followup_message\": \"$msg\"}"
