#!/usr/bin/env bash
# DeBank Pro API query scripts for on-chain wallet analysis
# Used in BNB LST research (April 2026)
#
# Prerequisites:
#   export DEBANK_API_KEY="your-key-here"
#
# Cost: DeBank Pro API charges per call. Budget ~30-50 calls per research topic.
# Docs: https://docs.open.debank.com/en/reference/api-pro-reference

set -euo pipefail

API_BASE="https://pro-openapi.debank.com/v1"

# ─── Core Functions ──────────────────────────────────────────────────────

debank_get() {
  local endpoint="$1"
  curl -s "${API_BASE}/${endpoint}" -H "AccessKey: ${DEBANK_API_KEY}"
}

# ─── 1. Full DeFi Position Map (most important call) ────────────────────
# Returns every supply, borrow, LP, staking position across every protocol
# on a given chain. One call = complete picture.

wallet_positions() {
  local wallet="$1"
  local chain="${2:-bsc}"
  debank_get "user/complex_protocol_list?id=${wallet}&chain_id=${chain}" | python3 -m json.tool
}

# ─── 2. Total Portfolio Value ────────────────────────────────────────────
# Quick triage: is this a whale ($10M+), mid-size ($100K-$10M), or small?

wallet_balance() {
  local wallet="$1"
  debank_get "user/total_balance?id=${wallet}" | python3 -m json.tool
}

# ─── 3. Batch whale profiling ───────────────────────────────────────────
# Feed a list of addresses (one per line) from Dune output.
# Outputs: address | total_usd_value

batch_balances() {
  local file="$1"
  while IFS= read -r addr; do
    [[ -z "$addr" || "$addr" == \#* ]] && continue
    local balance
    balance=$(debank_get "user/total_balance?id=${addr}" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(f\"{d.get('total_usd_value', 0):.0f}\")
" 2>/dev/null || echo "ERROR")
    echo "${addr} | \$${balance}"
    sleep 0.5
  done < "$file"
}

# ─── 4. Extract lending positions from a wallet ────────────────────────
# Filters complex_protocol_list for lending positions (supply + borrow)

wallet_lending() {
  local wallet="$1"
  local chain="${2:-bsc}"
  debank_get "user/complex_protocol_list?id=${wallet}&chain_id=${chain}" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for protocol in data:
    for item in protocol.get('portfolio_item_list', []):
        detail = item.get('detail', {})
        supply = detail.get('supply_token_list', [])
        borrow = detail.get('borrow_token_list', [])
        if supply or borrow:
            health = detail.get('health_rate', 'N/A')
            net = item['stats']['net_usd_value']
            supply_str = ', '.join(f\"{t['amount']:.2f} {t['symbol']}\" for t in supply)
            borrow_str = ', '.join(f\"{t['amount']:.2f} {t['symbol']}\" for t in borrow) or 'None'
            print(f\"Protocol: {protocol['name']}\")
            print(f\"  Supply:  {supply_str}\")
            print(f\"  Borrow:  {borrow_str}\")
            print(f\"  Health:  {health}\")
            print(f\"  Net USD: \${net:,.0f}\")
            print()
"
}

# ─── 5. Classify wallet type ───────────────────────────────────────────
# Protocol contract = empty [] from complex_protocol_list + is contract on explorer
# Bot = high txn count + zero or dust portfolio
# Real user = has DeFi positions

wallet_classify() {
  local wallet="$1"
  local chain="${2:-bsc}"
  local positions
  positions=$(debank_get "user/complex_protocol_list?id=${wallet}&chain_id=${chain}")
  local balance
  balance=$(debank_get "user/total_balance?id=${wallet}")

  python3 -c "
import json
positions = json.loads('$(echo "$positions" | tr "'" "'")')
balance = json.loads('$(echo "$balance" | tr "'" "'")')
total = balance.get('total_usd_value', 0)
protocol_count = len(positions)
position_count = sum(len(p.get('portfolio_item_list', [])) for p in positions)

if position_count == 0 and total < 100:
    classification = 'Protocol Contract or Empty'
elif position_count == 0 and total > 100:
    classification = 'Holder (no DeFi)'
elif protocol_count >= 5:
    classification = 'Active DeFi User (multi-protocol)'
elif protocol_count >= 2:
    classification = 'DeFi User'
else:
    classification = 'Single-protocol User'

print(f'Wallet:     {wallet[:42]}')
print(f'Portfolio:  \${total:,.0f}')
print(f'Protocols:  {protocol_count}')
print(f'Positions:  {position_count}')
print(f'Type:       {classification}')
" 2>/dev/null || echo "Error classifying ${wallet}"
}

# ─── Usage Examples ─────────────────────────────────────────────────────
#
# Full position map for a wallet:
#   wallet_positions 0xe91eabe42d8517b4166aa602e31e0ec8cab18b4c bsc
#
# Quick balance check:
#   wallet_balance 0xac3e216bd55860912062a4027a03b99587b7ffc7
#
# Batch profile top holders from Dune output:
#   batch_balances top_holders.txt
#
# Extract just lending positions:
#   wallet_lending 0xe91eabe42d8517b4166aa602e31e0ec8cab18b4c bsc
#
# Classify a wallet:
#   wallet_classify 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c bsc
