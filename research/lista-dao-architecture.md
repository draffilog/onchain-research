# Lista DAO Protocol Architecture

*Last updated: April 2026*

## Overview

Lista DAO is the dominant BNB liquid staking protocol on BSC with ~$1B TVL. It operates three core products:

1. **slisBNB** — liquid staking token (rebasing, 1:1 with BNB)
2. **Lista Lending (Moolah)** — Morpho Blue-style isolated lending markets
3. **lisUSD** — CDP stablecoin (collateralized debt position)

## slisBNB

**Contract**: `0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B`

- Rebasing model: 1 slisBNB always = 1 BNB
- Rewards distributed via additional slisBNB minting
- ~930K BNB staked (~$591M)
- APY: ~7.05% (6.51% Binance Launchpool + 0.54% native staking)

### Key protocol addresses

| Address | Role |
|---|---|
| `0x91e4...6e5ae` | Staking pool (holds 415K slisBNB) |
| `0x6f28...03873` | Operator (holds 180K slisBNB) |
| `0x1adb...77fe6` | SynClub deposit controller |

## Lista Lending (Moolah)

**Controller**: `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c`
**BscScan label**: "Lista DAO: Moolah"
**Architecture**: Morpho Blue-style (isolated markets, identified by position hashes)

### How Moolah works

Unlike traditional lending pools (Aave, Venus) where all assets share a pool, Moolah uses **isolated markets**:

- Each market is a pair: collateral token / loan token
- Markets have individual LLTV, oracle, and interest rate model
- Identified by a position hash (e.g., `0x9ae45397...`)
- Users supply collateral and borrow from the same market

### Key markets

| Collateral | Loan | LLTV | Type | Liquidity |
|---|---|---|---|---|
| **slisBNB** | **BNB** | 96.5% | Fixed | 317.7K BNB ($201M) |
| slisBNB + BNB-SmartLP | USD1 | 75% | — | 172K USD1 |
| USD1 | BNB | 80% | Flexible | 79.8K BNB |
| Various BTC | BTCB | Various | Various | Various |

### The slisBNB/BNB market

This is the core market for LST looping:

- **96.5% LLTV** — extremely high, meaning you can borrow 96.5% of collateral value
- **Fixed rate type** — predictable borrow costs
- **Current borrow rate**: ~1.98% APY (down from ~3.2% a month ago)
- **Position hash**: used by DeBank as `position_index` in responses

The high LLTV is safe because slisBNB/BNB maintain near-1:1 peg — the only risk is a slisBNB depeg event.

### Interest rate model

Lista Lending's rate model is designed to undercut Venus:
- At 90% utilization: Lista charges ~2.79% vs Venus's ~160%
- This low rate is what makes LST looping economically viable on BSC

## BNB Vault

**Controller**: `0x57134a64b7cd9f9eb72f8255a671f5bf2fe3e2d0`
**DeBank adapter**: `helio_tokenized_vault_yield`

The BNB Vault automates the looping strategy:

1. User deposits BNB (or WBNB)
2. Vault stakes BNB → receives slisBNB
3. Vault supplies slisBNB as collateral on Moolah
4. Vault borrows BNB from Moolah
5. Vault restakes borrowed BNB → more slisBNB
6. Repeat until target leverage reached

### Why use the vault instead of manual looping?

- **Gas efficiency**: One transaction vs multiple deposit/borrow/stake cycles
- **Auto-rebalancing**: Vault manages position health
- **No monitoring**: No need to watch liquidation risk
- **Same economics**: Vault achieves the same effective APY as manual looping

### Evidence

The largest slisBNB whale (`0xac3e...ffc7`) holds 244K WBNB ($154M) in the BNB Vault rather than doing manual loops. This wallet also supplies 4K BNB directly to Moolah lending and has $44M on Venus — a sophisticated multi-protocol operator.

## lisUSD (CDP)

Less relevant to LST research, but worth noting:
- CDP stablecoin where users lock collateral to mint lisUSD
- slisBNB can be used as collateral
- CDP Zone on Lista Lending UI

## Querying Lista DAO on-chain

### Via Dune (supply/holders)

```sql
-- slisBNB holders
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

### Via DeBank (DeFi positions)

```bash
curl -s "https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=<wallet>&chain_id=bsc" \
  -H "AccessKey: $DEBANK_API_KEY"
```

Look for:
- `project_id: "bsc_helio"` → Lista DAO positions
- `adapter_id: "morpho_blue_lending2"` → Moolah lending positions
- `adapter_id: "helio_tokenized_vault_yield"` → BNB Vault positions
- `description: "slisBNB"` → slisBNB staking
- `description: "Lista DAO BNB Vault"` → vault position

### Via Lista UI

- Lending: `https://lista.org/lending/borrow`
- Market details: `https://lista.org/lending/market/bsc/<position_hash>?tab=market`
