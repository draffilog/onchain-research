# XAUT (Tether Gold) on BSC — DeFi Usage & Yield Strategies

*Last updated: April 2026*

> **Data integrity note**: All data below was verified via Dune Analytics
> queries (query IDs provided), DeBank Pro API wallet lookups, Lista DAO
> protocol UI (browser), and BscScan. Rates are point-in-time snapshots
> from April 16, 2026. Re-verify before reusing.

## Overview

XAUT (Tether Gold) is a gold-backed ERC-20 token issued by Tether. Each
token represents 1 troy ounce of gold (~$4,790 at time of research). On BSC,
XAUT has a small but active DeFi ecosystem driven entirely by Lista DAO's
subsidized lending markets.

**Key finding**: All DeFi activity is concentrated in one protocol (Lista DAO),
driven by 5 farmer wallets, sourced entirely from Binance CEX withdrawals —
not from on-chain DEX liquidity.

## Verified Addresses

| What | Address | How verified |
|---|---|---|
| XAUT token | `0x21caef8a43163eea865baee23b9c2e327696a3bf` | BscScan verified, CoinGecko confirmed |
| Lista DAO Collateral (Moolah) | `0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c` | BscScan "Lista DAO: Moolah" label |
| Lista XAUT Vault | `0x4109415de2271097fb5fa16af8a753aab8c46d6f` | DeBank `bsc_helio` adapter, Lista UI |
| Binance Hot Wallet | `0x8894e0a0c962cb723c1976a4421c95949be2d4e3` | DeBank empty `[]` + known Binance address |
| PancakeSwap XAUT LP | `0xc655e1a100a084d9ac91c269b0a7cb0e62263fcf` | DexScreener + PancakeSwap UI |
| Tether Mint Intermediary | `0x5754284f345afc66a98fbb0a0afe71e0f007b949` | Dune: receives from 0x0 mint address |
| Mint Distribution | `0xf2eb2aa3727187edd69285ce7e7fdfe2e494abce` | Dune: forwards minted XAUT to Binance |

## Supply & Distribution

| Where | XAUT | % | Source |
|---|---|---|---|
| Binance Hot Wallet (idle on exchange) | ~1,289 | ~43% | Dune query 7320262 |
| Lista DAO (deposited by farmers) | ~1,131 | ~37% | Dune query 7320503 |
| Mint pipeline & intermediaries | ~580 | ~19% | Dune query 7320262 (residual) |
| PancakeSwap DEX liquidity | ~0.93 | ~0.03% | DexScreener |
| **Total on BSC** | **~3,000** | **100%** | Dune query 7320689 (mint tracking) |

**Critical observation**: The "Lista DAO" and "farmer" numbers are the same
gold. Farmers buy XAUT on Binance spot, withdraw on-chain, and deposit into
Lista. The 1,131 XAUT in Lista was put there by 5 farmer wallets. There is no
organic DEX-based entry point — PancakeSwap has $4.5K TVL, effectively zero.

Source: Dune query 7325450 (farmer origin trace) confirmed 82.7% of Farmer #1's
XAUT came directly from Binance withdrawals.

## Mint-to-DeFi Pipeline

Verified via Dune query 7320493 (flow analysis between labeled addresses):

```
Tether Mints (0x0) → Intermediary (0x5754...) → Distribution (0xf2eb...)
  → Binance Hot Wallet (0x8894...) → Farmer wallets → Lista DAO contracts
```

There is no alternative entry path. All XAUT enters BSC through Tether's mint
pipeline, lands on Binance, and the portion that enters DeFi goes directly
from Binance withdrawals into Lista DAO.

## Lista DAO XAUT Markets — Live Rates

Checked via browser (`lista.org/lending/market/bsc/<hash>?tab=market`) on April 16, 2026.

### XAUT-as-collateral (supply gold, borrow stables) — SUBSIDIZED

| Market | Net Borrow Rate | Native Rate | LISTA Subsidy | LLTV |
|---|---|---|---|---|
| XAUt / BNB | **-14.78%** | 0.23% | ~15.01% | 72% |
| XAUt / U | **-14.31%** | 0.26% | ~14.57% | 77% |
| XAUt / USDT | **-13.10%** | 3.21% | ~16.31% | 77% |
| XAUt / USD1 | **-8.84%** | 0.29% | ~9.13% | 77% |

Negative rate = borrower gets paid in LISTA token rewards. This is the core
incentive driving all XAUT farming on BSC.

### XAUT-as-loan (supply other assets, borrow gold) — NOT SUBSIDIZED

| Market | Borrow Rate | LLTV |
|---|---|---|
| U / XAUt | **0.35%** | 80% |
| USDT / XAUt | **1.39%** | 80% |
| BTCB / XAUt | **1.68%** | 75% |
| BNB / XAUt | **1.79%** | 72% |

### XAUT Vault

| | APY | Utilization | Source |
|---|---|---|---|
| Lista XAUT Vault | **9.88%** (subsidized) | ~90% | Lista vault UI |

### Key Rate Insight

The spread between subsidized XAUT-collateral markets (-8.8% to -14.8%) and
unsubsidized XAUT-loan markets (0.35% to 1.79%) is **9-16%**. This spread
enables delta-neutral rate arbitrage strategies.

## Identified Farmer Wallets

Classification methodology: Dune top holders query (7320262) → DeBank
`complex_protocol_list` for each address → Lista UI for rate verification.

| Label | Address | How identified |
|---|---|---|
| Farmer #1 (5 Loops) | `0x102407f67415dcc4068370625ca27f24bb2a03d5` | DeBank: 5 Lista XAUT positions + Venus Flux |
| Farmer #2 (Multi-dir) | `0xc9144683c0497b422ccfe9bcfba37855cc62c0b8` | DeBank: supplies AND borrows XAUT simultaneously |
| Multi-Protocol Farmer | `0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7` | DeBank: Lista + Alpaca + Aster + Venus positions |
| Vault Depositor + Stables | `0x04ab66f4511cf5dab9b68e06d53bfd0268d76963` | DeBank: 26 XAUT vault + $5.4M stablecoin farming |
| Lista Depositor (4 pos) | `0x624227ae1d072d03ae0361f6a71384dd92af80b4` | DeBank: 4 XAUT positions, net XAUT = 0 |

## Yield Strategies & APY

### Strategy 1: Leveraged Long Gold — ~9% APY + gold exposure

**Who**: Farmer #1 (`0x1024...`)
**Equity**: ~$2.43M (507 XAUT from Binance)

Steps:
1. Buy XAUT on Binance spot → withdraw to BSC wallet
2. Deposit as collateral across 4 Lista markets (XAUt/USD1, XAUt/U, XAUt/BNB, XAUt/USDT)
3. Borrow stables at **-8.8% to -14.8%** (get paid to borrow)
4. Deploy borrowed stables into Venus Flux (syrupUSDT loop ~4-7% spread)
5. Optionally: deposit into XAUT Vault for 9.88% passive yield

| Income source | Rate | Applied to |
|---|---|---|
| Lista borrow rewards (4 markets) | -8.84% to -14.78% | $1.59M borrowed |
| XAUT Vault | +9.88% | $204K deposited |
| Venus Flux stablecoin spread | ~4-7% | $120K net equity |
| BNB/XAUt reverse borrow cost | -1.79% | $187K (cost) |

**Portfolio APY: ~9%** on top of full gold price exposure.
Source: DeBank positions verified April 16 + Lista UI rates.

### Strategy 2: Delta-Neutral Rate Arbitrage — ~10% APY, zero gold exposure

**Who**: Lista Depositor (`0x6242...`)
**Equity**: ~$112K

Steps:
1. Supply XAUT as collateral in subsidized markets → borrow stables at **-13.1%** and **-14.3%**
2. Simultaneously borrow the exact same amount of XAUT in unsubsidized markets → pay only **0.35%**
3. Net XAUT position = zero (23.81 supplied = 23.81 borrowed)
4. Pocket the 13-14% spread between subsidized and unsubsidized rates

| Position | Rate | On what |
|---|---|---|
| Borrow USDT against XAUT | **earn 13.10%** | $30K |
| Borrow U against XAUT | **earn 14.31%** | $44K |
| Borrow XAUT against U | **pay 0.35%** | $114K |
| Borrow U against stables | **earn 0.75%** | $127K |

**Portfolio APY: ~10%** with zero gold price risk.
Source: DeBank positions + Lista UI rates, verified April 16.

### Strategy 3: Leveraged Stablecoin Farming — ~12% APY, minimal gold

**Who**: Vault Depositor (`0x04ab...`)
**Equity**: ~$430K (leveraged ~13x)

Steps:
1. Park 26 XAUT in vault → earn 9.88%
2. Supply $5.44M USDT+USDC → borrow $5.13M U at **-0.75%**
3. The 0.75% subsidy × 13x leverage = ~12% APY on equity

**Portfolio APY: ~12%** — but health factor of 1.025 (liquidation at 2.5% depeg).
Source: DeBank positions April 16.

### Strategy Summary

| Strategy | APY | Gold Exposure | Risk | Replicable? |
|---|---|---|---|---|
| Leveraged long gold | **~9%** | Full long | Liquidation if gold -15% | Limited by Binance XAUT supply |
| Delta-neutral rate arb | **~10%** | Zero | LISTA subsidy removal | Limited by vault 90% utilization |
| Leveraged stablecoin | **~12%** | Minimal | Stablecoin depeg (1.025 health) | Capital-scalable on stable side |

All strategies depend on LISTA token subsidies. Without subsidies, the
negative borrow rates disappear and delta-neutral APY drops to near zero.

## Liquidity Constraints

| Constraint | Value | Source |
|---|---|---|
| PancakeSwap XAUT/USDT TVL | ~$4,500 | DexScreener |
| Lista XAUT Vault utilization | 90% | Lista vault UI |
| XAUT Vault available liquidity | ~34 XAUT ($163K) | Lista vault UI |
| Number of active farmers | 5 wallets | Dune query 7320262 + DeBank |

**Implication**: New farmers cannot replicate delta-neutral strategies at scale.
The vault is nearly fully lent out. DEX liquidity is effectively zero. All
entry/exit happens through Binance CEX.

## Dune Dashboard & Queries

**Live dashboard**: [XAUT on BSC — Usage Analysis](https://dune.com/vlad_bnbchain/xaut-tether-gold-on-bsc-usage-analysis-lista-dao-holders-yield-strategies) (dashboard ID: 209744)

| Query ID | Name | What it measures |
|---|---|---|
| 7319536 | XAUT BSC Trading Volume | Daily DEX volume and trade count |
| 7320262 | XAUT Top 15 Holders | Net balance per wallet, labeled |
| 7320265 | XAUT Large Transfers | Transfers >1 XAUT with labels |
| 7320266 | XAUT Destinations | Where XAUT flows to, by destination |
| 7320493 | XAUT Flows Between Key Addresses | Labeled flow matrix |
| 7320495 | XAUT Daily Flows to Lista DAO | TVL inflow tracking |
| 7320503 | XAUT Protocol Distribution | Where XAUT is used (by category) |
| 7320688 | XAUT Daily Active Wallets | Unique wallets per day |
| 7320689 | XAUT Cumulative Supply | Mint/burn tracking |
| 7320690 | XAUT in Lista DAO Over Time | Protocol TVL history |
| 7321563 | XAUT Address Book | All 12 labeled wallets with DeBank/BscScan links |
| 7325448 | XAUT Origin Trace | Where each farmer received their XAUT from |
| 7325450 | XAUT Farmer Sources Summary | Aggregated: what % came from Binance vs Lista recycling |

## Key SQL Patterns

### Top holders by net balance

```sql
WITH inflows AS (
  SELECT "to" as wallet, SUM(amount) as total_in
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x21caef8a43163eea865baee23b9c2e327696a3bf
  GROUP BY 1
),
outflows AS (
  SELECT "from" as wallet, SUM(amount) as total_out
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x21caef8a43163eea865baee23b9c2e327696a3bf
  GROUP BY 1
)
SELECT
  COALESCE(i.wallet, o.wallet) as wallet,
  COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) as balance
FROM inflows i
FULL OUTER JOIN outflows o ON i.wallet = o.wallet
WHERE COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) > 0
ORDER BY balance DESC
LIMIT 15
```

### Address labeling CTE (reuse across all queries)

```sql
WITH known_labels AS (
  SELECT address, label FROM (VALUES
    (0x8894e0a0c962cb723c1976a4421c95949be2d4e3, 'Binance Hot Wallet'),
    (0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c, 'Lista DAO Collateral'),
    (0x4109415de2271097fb5fa16af8a753aab8c46d6f, 'Lista XAUT Vault'),
    (0x102407f67415dcc4068370625ca27f24bb2a03d5, 'Farmer #1 (5 Loops)'),
    (0xc9144683c0497b422ccfe9bcfba37855cc62c0b8, 'Farmer #2 (Multi-dir)'),
    (0xc6dd9976066f3364b4d6a72cd4f1fa0468327aa7, 'Multi-Protocol Farmer'),
    (0x04ab66f4511cf5dab9b68e06d53bfd0268d76963, 'Vault Depositor + Stables'),
    (0x624227ae1d072d03ae0361f6a71384dd92af80b4, 'Lista Depositor (4 pos)'),
    (0xc655e1a100a084d9ac91c269b0a7cb0e62263fcf, 'PancakeSwap XAUT LP'),
    (0x5754284f345afc66a98fbb0a0afe71e0f007b949, 'Tether Mint Intermediary'),
    (0xf2eb2aa3727187edd69285ce7e7fdfe2e494abce, 'Mint Distribution'),
    (0x0000000000000000000000000000000000000000, 'Mint / Burn (0x0)')
  ) AS t(address, label)
)
```

## Data Sources

| Source | What we got from it |
|---|---|
| Dune `tokens.transfers` | Supply tracking, holder balances, transfer flows, protocol TVL |
| Dune `dex.trades` | DEX trading volume and liquidity |
| DeBank `complex_protocol_list` | Wallet DeFi positions, strategy identification, health rates |
| Lista DAO UI (browser) | Live borrow rates (native + subsidized), LLTV, vault APY, utilization |
| Venus Flux UI (browser) | syrupUSDT yield, BTCB/U leverage rates |
| BscScan | Contract verification, address labeling |
| DexScreener | PancakeSwap XAUT LP TVL |

## Mistakes & Lessons Learned

1. **Assumed Venus had an XAUT market** — checked Venus API and browser
   extensively, found no XAUT market exists. Venus is used indirectly by
   farmers (deploy borrowed stables into Venus Flux). Always verify protocol
   support before assuming.

2. **Double-counted supply** — initial dashboard showed "Lista DAO" and
   "Active farmers" as separate categories, but they're the same gold.
   Farmers deposit into Lista, so the XAUT in Lista IS the farmer's XAUT.
   Always trace the causal chain, not just the address balances.

3. **Presented dollar earnings instead of APY** — hedge funds don't care that
   "Farmer #1 earns $225K." They care that the strategy yields 9% APY. Always
   compute percentage returns on equity, not absolute dollar amounts.

4. **updateDashboard is all-or-nothing** — the Dune MCP `updateDashboard`
   tool replaces ALL widgets. Omitting any widget deletes it. Must fetch
   full state with `getDashboard` first, then send everything back.

5. **Dune MCP parameter naming inconsistency** — `executeQueryById` uses
   `query_id` (snake_case) but `getExecutionResults` uses `executionId`
   (camelCase). Cost debugging time.

6. **"Morpho" vs "Lista DAO"** — Lista DAO is a Morpho Blue fork, but calling
   it "Morpho" on the dashboard confused users. Use the protocol's own name,
   not the underlying codebase.

7. **Rates change fast** — borrow rates shifted from -14.57% to -8.84% on the
   XAUt/USD1 market within 3 days. Always re-check rates from the protocol UI
   before presenting them as current.
