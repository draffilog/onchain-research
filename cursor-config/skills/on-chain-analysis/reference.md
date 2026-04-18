# On-Chain Analysis — Reference

Extended examples and patterns for the on-chain analysis skill.
For a complete end-to-end walkthrough using XAUT on BSC, see:
`/Users/user/xaut-dune/workflow-guide.md`

---

## DeBank API Response Structure

### complex_protocol_list — Lending Position

```json
[
  {
    "id": "bsc_lista_lending",
    "name": "Lista DAO",
    "portfolio_item_list": [
      {
        "detail": {
          "supply_token_list": [
            { "symbol": "XAUt", "amount": 474.5, "price": 4780 }
          ],
          "borrow_token_list": [
            { "symbol": "USDT", "amount": 1670000, "price": 1.0 }
          ],
          "health_rate": 1.18
        },
        "position_index": "0xa3b6...market_id"
      }
    ]
  }
]
```

**Key fields:**
- `portfolio_item_list[].detail.supply_token_list` — what the wallet supplied
- `portfolio_item_list[].detail.borrow_token_list` — what the wallet borrowed
- `portfolio_item_list[].detail.health_rate` — liquidation health (>1 = safe)
- `portfolio_item_list[].position_index` — use to navigate to the protocol market page

### complex_protocol_list — DEX LP Position

```json
{
  "detail": {
    "supply_token_list": [
      { "symbol": "XAUt", "amount": 0.47 },
      { "symbol": "USDT", "amount": 2250 }
    ]
  },
  "name": "Liquidity Pool"
}
```

### complex_protocol_list — Vault Position

```json
{
  "detail": {
    "supply_token_list": [
      { "symbol": "XAUt", "amount": 26.5 }
    ]
  },
  "name": "Lista XAUT Vault"
}
```

---

## Dune MCP Tool Schemas — Key Parameters

### createDuneQuery
```
{ name: string, description?: string, query_sql: string, is_private?: boolean }
```

### updateDuneQuery
```
{ queryId: number, name?: string, query_sql?: string, tags?: string[] }
```

### executeQueryById
```
{ query_id: number, performance?: "medium"|"large" }
```

### getExecutionResults
```
{ executionId: string, limit?: number, offset?: number }
```

### getDashboard
```
{ ownerHandle: string, slug: string }
```

### updateDashboard
```
{
  dashboardId: number,
  name?: string,
  slug?: string,
  tags?: string[],
  visualizationWidgets?: [...],
  textWidgets?: [...],
  paramWidgets?: [...]
}
```

### generateVisualization
```
{ queryId: number, visualization_type: string, name: string, options: object }
```

---

## Yield Strategy Classification

| Pattern | Strategy | Exposure | Risk |
|---|---|---|---|
| Supply A, borrow stables | Leveraged long A | Long A | Liquidation if A drops |
| Supply A, borrow A | Delta-neutral rate arb | None | Rate changes, low liq |
| Supply A, borrow stables → re-supply stables | Leverage loop | Amplified long A | Multi-layer liquidation |
| Deposit into vault | Passive yield | Long A | Smart contract risk |
| Supply A in protocol 1, supply stables in protocol 2 | Multi-protocol diversification | Mixed | Protocol risk |

**To calculate net earnings:**
```
Annual P&L = Σ (supply_value × supply_apy) - Σ (borrow_value × net_borrow_rate)
```

Where `net_borrow_rate = native_rate - reward_subsidy_rate` (can be negative if rewards exceed interest).

---

## Chain IDs for DeBank

| Chain | DeBank `chain_id` | Dune `blockchain` |
|---|---|---|
| BNB Chain | `bsc` | `bnb` |
| Ethereum | `eth` | `ethereum` |
| Arbitrum | `arb` | `arbitrum` |
| Polygon | `matic` | `polygon` |
| Optimism | `op` | `optimism` |
| Base | `base` | `base` |
| Avalanche | `avax` | `avalanche_c` |

---

## Dune Table Quick Reference

| Table | Contains | Common filters |
|---|---|---|
| `tokens.transfers` | All ERC-20 transfers | `blockchain`, `contract_address`, `block_date` |
| `dex.trades` | DEX swap events | `blockchain`, `token_bought_address`, `token_sold_address` |
| `tokens.balances` | Snapshot balances (less reliable for historical) | `blockchain`, `token_address` |
| `erc20_<chain>.evt_Transfer` | Raw Transfer events | `contract_address`, `evt_block_time` |
