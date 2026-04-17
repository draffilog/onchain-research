# LST Research

On-chain research into Liquid Staking Tokens — starting with BNB Chain.

## What's Here

| File | Description |
|---|---|
| `research/bnb-lst-market.md` | Full BNB LST market analysis (slisBNB, asBNB, BNBx, aBNBb) |
| `research/lista-dao-architecture.md` | Lista DAO protocol deep dive — Moolah lending, BNB Vault, looping |
| `.cursor/rules/` | Cursor AI rules for consistent research methodology |

## Methodology

All research uses on-chain data from **Dune Analytics** and **DeBank Pro API**:

1. **Supply analysis** — `tokens.transfers` mint/burn from zero address
2. **Holder distribution** — net balance computation + DeBank wallet classification
3. **Strategy mapping** — lending rates, looping APY, vault mechanics
4. **Looper detection** — on-chain transfers to lending controllers + DeBank position verification

## Key Findings (April 2026)

- **slisBNB** (Lista DAO) dominates BNB liquid staking with 930K BNB ($591M, 73% share)
- **asBNB** (Aster) is #2 with 319K BNB equivalent ($228M, 25% share)
- Best risk-adjusted strategy: **slisBNB looping via Lista Lending** at ~17% APY
- Most large players use Lista's **BNB Vault** which automates the loop
- Manual loopers are primarily bots/contracts; retail prefers vault or passive hold

## Tools Used

- [Dune Analytics](https://dune.com) — SQL queries on BSC `tokens.transfers`, `tokens.erc20`, `prices.usd_latest`
- [DeBank Pro API](https://pro-openapi.debank.com) — wallet DeFi positions via `complex_protocol_list`
- [Lista DAO](https://lista.org) — protocol UI for live market rates
- [BscScan](https://bscscan.com) — contract verification
