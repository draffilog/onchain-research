# LST Research

On-chain research into Liquid Staking Tokens — starting with BNB Chain.

## Philosophy: Zero Assumptions

**LLM crypto knowledge is outdated and unreliable.** During this research, the
AI had no knowledge of Aster's asBNB — a $228M LST that is the #2 token on
BNB Chain. Protocols launch, rebrand, migrate contracts, and change economics
between model training cutoffs.

Every piece of data in this repository was verified from a live source:
on-chain query, block explorer, protocol UI, or API response. If a fact
cannot be traced to its source, it doesn't belong here.

## What's Here

| File | Description |
|---|---|
| `research/bnb-lst-market.md` | Full BNB LST market analysis with verification sources |
| `research/lista-dao-architecture.md` | Lista DAO protocol deep dive — contracts, Moolah, BNB Vault |
| `.cursor/rules/` | Cursor AI rules for zero-assumption research methodology |

## Methodology

All research follows a strict verification chain:

```
Discovery (aggregators) → Address verification (BscScan/CoinGecko)
→ On-chain analysis (Dune) → Wallet classification (DeBank)
→ Live rate check (browser) → Cross-reference everything
```

### Tools Used

| Tool | What for |
|---|---|
| [DeFiLlama](https://defillama.com/lsd) | Discover which LSTs exist |
| [Dune Analytics](https://dune.com) | On-chain supply, holders, transfer patterns |
| [DeBank Pro API](https://pro-openapi.debank.com) | Wallet DeFi positions and classification |
| [BscScan](https://bscscan.com) | Contract verification and address labeling |
| [CoinGecko](https://coingecko.com) | Verified contract addresses and exchange rates |
| Protocol UIs (browser) | Live borrow rates, liquidity, market parameters |

### Why This Approach

1. **Aggregators first** — you don't know what tokens exist. Start with DeFiLlama/StakingRewards.
2. **Verify every address** — anyone can deploy an ERC-20 with any symbol. Dune returned scam "asBNB" tokens with trillions of supply.
3. **On-chain proof** — supply numbers from mint/burn queries, not from protocol marketing.
4. **DeBank for identity** — classify wallets as protocol contracts, bots, or real users.
5. **Browser for live data** — rates change daily. Never state a rate from model memory.

## Key Findings (April 2026)

- **slisBNB** (Lista DAO) dominates BNB liquid staking: 930K BNB, ~$591M, 73% share
- **asBNB** (Aster) is #2: ~319K BNB equivalent, ~$228M, 25% share
- Best risk-adjusted strategy: **slisBNB looping via Lista Lending** at ~17% APY
- Most large players use Lista's **BNB Vault** (automates the loop)
- Manual loopers are bots/contracts; retail prefers vault or passive hold

## Lessons Learned

Key mistakes from this research (full details in each research file):

1. AI didn't know asBNB existed — always use aggregators, never model memory
2. Fake tokens on Dune — cross-reference every address with CoinGecko/BscScan
3. Ghost supply (ankrBNB) — 100M minted means nothing if 1 address holds it all
4. Borrow rates assumed wrong — only the protocol UI has the live number
5. Dune queries timeout without date partition filters

## Contributing

When adding research for a new chain or token:
1. Follow the same verification workflow
2. Include "How verified" column in every data table
3. Note what the AI got wrong vs what was discovered from live sources
4. Add lessons learned to help future research sessions
