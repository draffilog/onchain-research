# Lista DAO Protocol Architecture

*Last updated: April 17, 2026*

> **Verification note**: Contract addresses were confirmed via BscScan labels
> and DeBank adapter IDs. Architecture details from protocol UI (browser) and
> BscScan verified source code. Rates are point-in-time snapshots.

## Overview

Lista DAO operates three core products on BSC:

1. **slisBNB** — liquid staking token (exchange rate appreciates vs BNB)
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
| Staking pool | `0x91e4...e5ae` | DeBank: `bsc_helio` with 430K BNB staked |
| Operator | `0x6f28...3873` | DeBank: pending withdrawals pattern |

**These may change.** Protocols can deploy new versions. Always re-verify
on BscScan before using in new research.

## slisBNB

- Exchange rate: 1 slisBNB ≈ 1.0355 BNB (April 2026)
- Rewards via exchange rate appreciation (not additional token minting)
- Supply at time of research: ~963K BNB staked ($608.8M)
- **Live APY: 4.49%** (3.98% Launchpool + 0.51% staking) — *from Lista UI*
- ⚠️ Earlier research quoted 7.05% — the rate has dropped. Always re-verify.

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

Parameters checked via browser (`lista.org/lending`), April 17 2026:

- **LLTV**: 96.5% — high because slisBNB/BNB maintain near-1:1 peg
- **Borrow rate**: 1.98% APY (this changes — re-verify)
- **Available liquidity**: 317.7K BNB (~$201M)
- **Rate type**: Fixed

The high LLTV makes looping theoretically viable — you can borrow 96.5% of
collateral value. However, nobody on-chain is actually doing the pure
slisBNB/BNB loop (see bnb-lst-market.md for evidence).

### What Borrowers Actually Do

From our Dune + DeBank analysis (April 2026), wallets borrowing against
slisBNB collateral on Moolah are borrowing **stablecoins** (USDT, USD1, U),
not BNB. They are making leveraged long bets on BNB price, not yield loops.

### Interest Rate Model

Key finding (from comparing Lista UI vs Venus):
- At high utilization (~90%), Lista charges ~2-3% vs Venus's ~160%
- This massive spread is what makes LST strategies on Lista viable

**How to verify**: Open both `lista.org/lending/borrow` and `app.venus.io`
in the browser. Compare BNB borrow rates directly.

## BNB Vault

### ⚠️ CORRECTION: The BNB Vault is NOT a Looping Vault

**Previous versions of this document incorrectly described the vault as
automating the slisBNB/BNB loop.** This was wrong.

### What it actually does

The BNB Vault is a **permissionless lending pool** (supply side):

1. User deposits BNB/WBNB into the vault
2. Vault allocates deposits across Lista Lending markets
3. Borrowers pay interest on their loans
4. Depositors earn a share of that interest

The vault does NOT stake BNB → slisBNB → loop. It is the opposite side of
the trade: it provides liquidity for borrowers.

### Current Stats (April 17 2026, from Lista UI)

- **Deposits**: 495K BNB ($312.9M)
- **Utilization**: 17.75%
- **Estimated yield**: ~0.35% APY (low because utilization is low)

### Vault Architecture (from Lista docs)

- Permissionless lending pools accepting a single loan asset
- Multiple configurable roles: Owner, Curator, Guardian, Allocator
- Protocol fee: 0-25% of borrow interest
- Vault fee: up to 50% of vault profits
- Depositors can withdraw anytime (if utilization < 99.99%)

### How to identify vault users on-chain

Via DeBank: look for `adapter_id: "helio_tokenized_vault_yield"` in the
`complex_protocol_list` response.

Via Dune: query transfers to the vault contract address.

### Evidence: the whale is a lender, not a looper

The largest slisBNB whale (`0xac3e...ffc7`, $496M portfolio) deposits
244K WBNB into the vault. DeBank shows this as a
`helio_tokenized_vault_yield` position — a lending deposit. This wallet has
zero borrowing across all protocols. They earn from other people's borrows.

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

### Dune: detect active Moolah borrowers (last 90 days)

```sql
WITH slisBNB_supplied AS (
  SELECT "from" as wallet, SUM(amount) as total_supplied,
    COUNT(*) as supply_count, MAX(block_date) as last_supply
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    AND "to" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
    AND "from" != 0x0000000000000000000000000000000000000000
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
),
bnb_borrowed AS (
  SELECT "to" as wallet, SUM(amount) as total_borrowed,
    COUNT(*) as borrow_count
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    AND "from" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
    AND "to" != 0x0000000000000000000000000000000000000000
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
),
usdt_borrowed AS (
  SELECT "to" as wallet, SUM(amount) as total_borrowed,
    COUNT(*) as borrow_count
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x55d398326f99059fF775485246999027B3197955
    AND "from" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
)
SELECT
  CAST(cs.wallet AS VARCHAR) as wallet,
  ROUND(cs.total_supplied, 2) as slisBNB_supplied,
  ROUND(COALESCE(bb.total_borrowed, 0), 2) as wbnb_borrowed,
  ROUND(COALESCE(ub.total_borrowed, 0), 2) as usdt_borrowed,
  cs.supply_count,
  COALESCE(bb.borrow_count, 0) + COALESCE(ub.borrow_count, 0) as borrow_count,
  CASE
    WHEN COALESCE(bb.total_borrowed, 0) > 0 AND cs.supply_count >= 3 THEN 'BNB Looper'
    WHEN COALESCE(ub.total_borrowed, 0) > 0 THEN 'USDT Borrower'
    WHEN COALESCE(bb.total_borrowed, 0) > 0 THEN 'BNB Borrower'
    ELSE 'Supply Only'
  END as strategy_type
FROM slisBNB_supplied cs
LEFT JOIN bnb_borrowed bb ON cs.wallet = bb.wallet
LEFT JOIN usdt_borrowed ub ON cs.wallet = ub.wallet
WHERE cs.total_supplied > 5
ORDER BY cs.total_supplied DESC
LIMIT 50
```

### DeBank: classify a wallet

```bash
curl -s "https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=<wallet>&chain_id=bsc" \
  -H "AccessKey: $DEBANK_API_KEY"
```

Key response fields:
- `project_id: "bsc_helio"` → Lista DAO position
- `adapter_id: "morpho_blue_lending2"` → Moolah lending
- `adapter_id: "helio_tokenized_vault_yield"` → BNB Vault (lending deposit)
- `position_index` → market position hash (use for URL construction)
- `health_rate` → liquidation proximity (1.0 = liquidation threshold)

### Browser: live market rates

Visit `lista.org/lending` and check current rates. The numbers shown
in the protocol UI are the source of truth — not cached data, not Dune, not
model memory.

### Earn page vaults (April 17 2026)

| Vault | Deposits | Utilization |
|---|---|---|
| Lista BNB Vault | 495K BNB ($312.9M) | 17.75% |
| Lista USD1 Vault | 138.5M USD1 | 65.15% |
| Lista U Vault | 69.3M U | 46.09% |
| Lista lisUSD Vault | 27.4M lisUSD | 56.98% |
| Lista USDT Vault | 6.9M USDT | 66.11% |
