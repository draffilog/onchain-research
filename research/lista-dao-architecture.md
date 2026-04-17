# Lista DAO Protocol Architecture

*Last updated: April 2026*

> **Verification note**: Contract addresses were confirmed via BscScan labels
> and DeBank adapter IDs. Architecture details from protocol UI (browser) and
> BscScan verified source code. Rates are point-in-time snapshots.

## Overview

Lista DAO operates three core products on BSC:

1. **slisBNB** — liquid staking token (rebasing, 1:1 with BNB)
2. **Lista Lending (Moolah)** — Morpho Blue-style isolated lending markets
3. **lisUSD** — CDP stablecoin

## How to Find Lista DAO Contracts

Don't rely on addresses from memory. Here's how to find them fresh:

1. **Protocol docs**: `lista.org` → look for contracts/addresses page
2. **BscScan**: Search "Lista DAO" — labeled contracts appear with blue badge
3. **DeBank**: Check any known Lista user's positions — response includes
   contract addresses and `adapter_id` values
4. **Dune**: Follow slisBNB transfers — largest recipients are protocol contracts

## Verified Contracts

| Contract | Address | How verified |
|---|---|---|
| slisBNB token | `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B` | BscScan label |
| Moolah controller | `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | BscScan "Lista DAO: Moolah" |
| BNB Vault | `0x57134a64b7cd9f9eb72f8255a671f5bf2fe3e2d0` | DeBank adapter `helio_tokenized_vault_yield` |
| Staking pool | `0x91e4...6e5ae` | DeBank: `bsc_helio` with 430K BNB staked |
| Operator | `0x6f28...03873` | DeBank: pending withdrawals pattern |

**These may change.** Protocols can deploy new versions. Always re-verify
on BscScan before using in new research.

## slisBNB

- Rebasing model: 1 slisBNB = 1 BNB always
- Rewards via additional slisBNB minting
- Supply at time of research: ~930K (Dune mint/burn query)
- APY: ~7.05% (from Lista UI — 6.51% Launchpool + 0.54% staking)

## Lista Lending (Moolah)

### Architecture

Unlike Aave/Venus (shared pool), Moolah uses **Morpho Blue-style isolated markets**:

- Single controller contract handles all markets
- Each market = collateral token + loan token pair
- Markets identified by position hashes (not human-readable names)
- Each market has its own LLTV, oracle, and interest rate model

### How to find a specific market

1. **Browser**: Visit `lista.org/lending/borrow`, click a market row, note
   the URL — it contains the position hash
2. **DeBank**: Check a known user. The `position_index` field in the response
   is the market's position hash
3. **Direct URL**: `lista.org/lending/market/bsc/<position_hash>?tab=market`

### slisBNB/BNB Market (core looping market)

Parameters checked via browser (`lista.org/lending/borrow`):

- **LLTV**: 96.5% — high because slisBNB/BNB maintain near-1:1 peg
- **Borrow rate**: 1.98% APY (at time of research — this changes)
- **Available liquidity**: 317.7K BNB (~$201M)
- **Rate type**: Fixed

The high LLTV makes looping viable — you can borrow 96.5% of collateral value,
meaning a 3x loop only requires small top-ups at each iteration.

### Interest Rate Model

Key finding (from comparing Lista UI vs Venus):
- At high utilization (~90%), Lista charges ~2-3% vs Venus's ~160%
- This massive spread is what makes LST looping on Lista viable and not on Venus

**How to verify**: Open both `lista.org/lending/borrow` and `app.venus.io`
in the browser. Compare BNB borrow rates directly.

## BNB Vault

### What it does

Automates the looping strategy in a single transaction:

1. User deposits BNB/WBNB
2. Vault stakes → receives slisBNB
3. Vault supplies slisBNB as Moolah collateral
4. Vault borrows BNB from Moolah
5. Vault restakes borrowed BNB
6. Repeat until target leverage

### How to identify vault users on-chain

Via DeBank: look for `adapter_id: "helio_tokenized_vault_yield"` in the
`complex_protocol_list` response. The `description` field will say
"Lista DAO BNB Vault".

Via Dune: query transfers to the vault contract address.

### Evidence: vault vs manual looping

The largest slisBNB whale (`0xac3e...ffc7`) uses the vault (244K WBNB, $154M+)
rather than manual loops. Verified via DeBank — position shows under
`helio_tokenized_vault_yield` adapter.

On-chain, manual loopers are primarily bots/contracts (2,400+ txns in 90d).
Real users prefer the vault's simplicity.

## Querying Lista DAO On-Chain

### Dune: slisBNB supply and holders

```sql
WITH inflows AS (
  SELECT "to" as wallet, SUM(amount) as total_in
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  GROUP BY 1
),
outflows AS (
  SELECT "from" as wallet, SUM(amount) as total_out
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  GROUP BY 1
)
SELECT
  CAST(COALESCE(i.wallet, o.wallet) AS VARCHAR) as wallet,
  COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) as balance
FROM inflows i
FULL OUTER JOIN outflows o ON i.wallet = o.wallet
WHERE COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) > 1
  AND COALESCE(i.wallet, o.wallet) != 0x0000000000000000000000000000000000000000
ORDER BY balance DESC
LIMIT 20
```

### Dune: detect Moolah users (last 90 days)

```sql
SELECT "from" as wallet, COUNT(*) as supply_txns, SUM(amount) as total_supplied
FROM tokens.transfers
WHERE blockchain = 'bnb'
  AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  AND "to" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
  AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
GROUP BY 1
ORDER BY total_supplied DESC
LIMIT 20
```

### DeBank: classify a wallet

```bash
curl -s "https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=<wallet>&chain_id=bsc" \
  -H "AccessKey: $DEBANK_API_KEY"
```

Key response fields:
- `project_id: "bsc_helio"` → Lista DAO position
- `adapter_id: "morpho_blue_lending2"` → Moolah lending
- `adapter_id: "helio_tokenized_vault_yield"` → BNB Vault
- `position_index` → market position hash (use for URL construction)

### Browser: live market rates

Visit `lista.org/lending/borrow` and check current rates. The numbers shown
in the protocol UI are the source of truth — not cached data, not Dune, not
model memory.
