---
name: bnb-lst-research
description: >-
  Research BNB liquid staking tokens on BSC with zero assumptions. Teaches how
  to discover LSTs, find smart contract addresses, verify protocol architecture,
  and identify DeFi strategies using on-chain data, browser verification, and
  protocol documentation. Use when the user asks about BNB LSTs, Lista DAO,
  slisBNB, asBNB, BNB staking, LST looping, or BNB Chain liquid staking.
---

# BNB LST Research

## Rule #1: Never Assume — Always Verify

**Your training data about crypto is outdated.** Protocols launch, rebrand,
change contracts, and die between your training cutoff and today. You MUST
verify every fact from a live source before stating it.

**Example from this research:** When asked about BNB LSTs, the AI had no
knowledge of Aster's asBNB token — a $228M LST that is #2 on BNB Chain.
The user knew it existed; the AI didn't. The contract address, exchange rate,
and even the protocol name (Aster, formerly Astherus) were all unknown to
the model. This is the norm, not the exception.

**Rule: If you cannot point to the on-chain source or live URL where you
verified a fact, do not state it.**

## How to Discover LSTs on Any Chain

You don't know what LSTs exist. Here's how to find them:

### Step 1: Search aggregator sites (browser)

Open these in the browser and look for the chain's LST page:
- `https://defillama.com/lsd` — LST dashboard by chain
- `https://www.stakingrewards.com/assets/?page=1&sort=staking_marketcap_desc` — sortable by staking market cap

These give you **names and approximate TVL**, but NOT contract addresses.

### Step 2: Find the real contract address

For EACH token found in Step 1, you need the verified contract address.
**Never guess a contract address. Never use one from memory.**

How to find it:
1. **Protocol docs** — visit the protocol's official site (e.g., `lista.org/docs`,
   `aster.finance/docs`). Look for "Contracts" or "Deployed Addresses" page.
2. **CoinGecko / CoinMarketCap** — search the token name, find the "Contract"
   field with the verified checkmark. Copy the address.
3. **BscScan token search** — go to `bscscan.com/tokens` and search by name.
   Look for the one with the most holders and transfers. Check if it has a
   verified contract label (e.g., "Lista DAO: slisBNB").
4. **Protocol UI** — open the protocol's staking page in the browser, connect
   to inspect the token contract from the UI element or page source.

**Verification**: Once you have an address, confirm it on BscScan:
- Does it have a verified source code?
- Does the contract name match the token?
- Does the holder count make sense for the claimed TVL?

### Step 3: Understand the reward model

This matters for supply calculations:
- **Rebasing** (e.g., slisBNB): 1 LST = 1 underlying always. Supply = TVL in native token.
- **Reward-bearing** (e.g., asBNB): 1 LST > 1 underlying. Must find the exchange rate
  to compute real TVL. Check the protocol UI or call `exchangeRate()` on the contract.

## How Smart Contract Addresses Work in DeFi Research

Understanding how addresses relate to each other is the core of on-chain research.

### Token contract vs Protocol contracts

- **Token contract**: The ERC-20 contract for the LST itself (e.g., slisBNB).
  This is what you query in `tokens.transfers`.
- **Protocol contracts**: Staking pools, lending controllers, vaults, routers.
  These HOLD the token and interact with it. When you see a large holder of
  an LST, it's usually one of these.

### How to identify what a contract does

1. **BscScan label** — go to `bscscan.com/address/<addr>`. If the contract
   is labeled (e.g., "Lista DAO: Moolah"), you know what it is.
2. **DeBank** — call `complex_protocol_list` for the address. If it returns
   positions, it's a smart contract wallet or EOA. If empty, it's likely a
   protocol contract (they don't have "DeFi positions" — they ARE the position).
3. **Contract source on BscScan** — read the verified source code. Look for
   `supply()`, `borrow()`, `deposit()`, `withdraw()` functions to understand
   its role.
4. **Protocol documentation** — check if the protocol lists this address in
   their docs or GitHub.

### How to find lending controller addresses

This is critical for finding who's borrowing/supplying on a lending protocol.

1. **Browser: visit the protocol's lending page** — e.g., `lista.org/lending/borrow`.
   Open a market, look at the URL (often contains a market ID or position hash).
2. **DeBank: check a known user** — if you find a wallet using the protocol
   via DeBank, the response includes contract addresses and `position_index`.
3. **Dune: follow the token** — query where the LST goes. Large inflows to a
   single address = likely the lending pool or controller:

```sql
SELECT "to" as destination, COUNT(*) as txns, SUM(amount) as total
FROM tokens.transfers
WHERE blockchain = 'bnb'
  AND contract_address = <LST_CONTRACT>
  AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
GROUP BY 1
ORDER BY total DESC
LIMIT 10
```

Then look up each destination on BscScan to identify it.

## Verification Workflow

For every piece of data, follow this chain:

```
Claim → Source → On-chain proof → Cross-reference
```

| What you need | Primary source | Cross-reference with |
|---|---|---|
| Token contract address | CoinGecko / protocol docs | BscScan (verified source) |
| Protocol TVL | DeFiLlama / protocol UI | Dune query (token supply in contract) |
| Borrow/supply rates | Protocol UI (browser) | DeBank positions of known users |
| Holder distribution | Dune `tokens.transfers` | DeBank `complex_protocol_list` |
| Wallet identity | BscScan label | DeBank portfolio + transfer patterns |
| Exchange rate (reward-bearing) | Protocol UI / contract call | CoinGecko market price ratio |

## BNB-Specific Findings (Verified April 2026)

The data below was verified via the workflow above. See [reference.md](reference.md)
for full details including holder tables and looper wallets.

**Verified contract addresses:**

| Token | Address | Verified via |
|---|---|---|
| slisBNB | `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B` | BscScan label + Dune supply matches DeFiLlama |
| asBNB | `0x77734e70b6E88b4d82fE632a168EDf6e700912b6` | CoinGecko + BscScan verified source |
| Lista Moolah | `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | BscScan "Lista DAO: Moolah" label |
| Lista BNB Vault | `0x57134a64b7cd9f9eb72f8255a671f5bf2fe3e2d0` | DeBank adapter `helio_tokenized_vault_yield` |

**IMPORTANT**: These addresses were verified in April 2026. Protocols can
migrate contracts. Always re-verify before using in new research.

## Lessons Learned

See [lessons-learned.md](lessons-learned.md) for the full list of mistakes
made during this research and how to avoid them.

Key ones:
1. **asBNB discovery gap** — AI had zero knowledge of this $228M token.
   Discovered only because the user mentioned it. Always search aggregators first.
2. **Fake token traps** — Dune `tokens.erc20` returned scam tokens with
   trillions of supply when searching "asBNB". Must verify via CoinGecko/BscScan.
3. **Pre-minted ghost tokens** — ankrBNB v2 had 100M supply on Dune but
   zero real holders. Cross-reference supply with holder count.
4. **Borrow rates change daily** — never state a rate without checking the
   protocol UI live. The rate we found (1.98%) was different from what the AI
   would have guessed.
