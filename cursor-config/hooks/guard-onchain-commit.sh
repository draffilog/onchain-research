#!/bin/bash
# Cursor beforeShellExecution hook — gates git commit in the onchain-research repo.
# Runs the repo's own regression check script and blocks the commit if it fails.

REPO="/Users/user/lst-research"

input=$(cat)
command=$(echo "$input" | /usr/bin/python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("command",""))' 2>/dev/null)
cwd=$(echo "$input" | /usr/bin/python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("cwd",""))' 2>/dev/null)

# Only guard commits in the onchain-research repo
case "$cwd" in
  "$REPO"|"$REPO"/*) ;;
  *)
    echo '{"permission":"allow"}'
    exit 0
    ;;
esac

# Only care about `git commit` (not `git commit -h`, `git log --oneline`, etc.)
case "$command" in
  *"git commit"*) ;;
  *)
    echo '{"permission":"allow"}'
    exit 0
    ;;
esac

# Run the repo's regression check against the staged diff
if [ ! -x "$REPO/scripts/check-regressions.sh" ]; then
  echo '{"permission":"allow"}'
  exit 0
fi

check_output=$("$REPO/scripts/check-regressions.sh" 2>&1)
check_exit=$?

if [ $check_exit -ne 0 ]; then
  msg="Pre-commit regression check FAILED. The commit is being blocked to prevent pushing bad data. Fix the issues below, re-stage, and try again.\n\n$check_output"
  safe_msg=$(printf '%s' "$msg" | /usr/bin/python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')
  echo "{\"permission\":\"deny\",\"agent_message\":$safe_msg,\"user_message\":\"A regression check blocked this commit. See the agent message for details.\"}"
  exit 0
fi

echo '{"permission":"allow"}'
exit 0
