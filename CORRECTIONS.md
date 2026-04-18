# Corrections Log

Append-only log of corrections made to research findings over time. When new research contradicts older findings, add an entry here — don't silently overwrite the old data.

## Format

```
## YYYY-MM-DD — Short description
**File:** `research/<file>.md` (section or table)
**Before:** what the old finding claimed
**After:** what the new finding proves
**Source:** how the new finding was verified (Dune query ID, DeBank response, browser URL, etc.)
**Reason for change:** one sentence on why the old finding was wrong (stale data / fake token / bad source / etc.)
```

---

## 2026-04-17 — asBNB TVL was marketing inflation, not on-chain reality
**File:** `research/bnb-lst-market.md` (market data table)
**Before:** asBNB claimed $228M TVL, ~319K BNB backing
**After:** On-chain supply is much lower; CoinGecko/marketing numbers included assets not actually backing the token
**Source:** Dune `tokens.transfers` mint/burn query + cross-reference with Aster contract state
**Reason for change:** Initial research trusted aggregator TVL rather than verifying mint/burn on-chain. See `bnb-lst-market.md` "Mistakes Made During This Research" section.

## 2026-04-17 — Wallet addresses must be full 42 chars, never truncated
**File:** `research/*.md` (all files)
**Before:** addresses shown in shortened form (first 6 + last 4 hex chars with ellipsis)
**After:** full 42-character hex addresses everywhere
**Source:** User feedback — shortened addresses break DeBank/BscScan copy-paste lookup
**Reason for change:** The shortened form looks clean but makes the research unusable for follow-up verification. Always keep the full address.
