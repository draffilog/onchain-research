# Onchain Research

An information hub for AI agents doing crypto research. Verified on-chain
findings, reusable methodology, and lessons learned — so the next research
session doesn't start from zero.

## Philosophy: Zero Assumptions

**LLM crypto knowledge is outdated and unreliable.** During our first research
session, the AI had no knowledge of Aster's asBNB — a $228M LST that is the
#2 token on BNB Chain. Protocols launch, rebrand, migrate contracts, and
change economics between model training cutoffs.

Every piece of data in this repository was verified from a live source:
on-chain query, block explorer, protocol UI, or API response. If a fact
cannot be traced to its source, it doesn't belong here.

## Research

| Topic | Files |
|---|---|
| **BNB Liquid Staking** | [`research/bnb-lst-market.md`](research/bnb-lst-market.md) — full market analysis with verification sources |
| **Lista DAO** | [`research/lista-dao-architecture.md`](research/lista-dao-architecture.md) — Moolah lending, BNB Vault, contract addresses |

## Methodology

All research follows a strict verification chain:

```
Discovery (aggregators) → Address verification (explorer/CoinGecko)
→ On-chain analysis (Dune) → Wallet classification (DeBank)
→ Live rate check (browser) → Cross-reference everything
```

### Tools

| Tool | What for |
|---|---|
| [DeFiLlama](https://defillama.com) | Discover protocols, TVL, yield |
| [Dune Analytics](https://dune.com) | On-chain supply, holders, transfer patterns |
| [DeBank Pro API](https://pro-openapi.debank.com) | Wallet DeFi positions and classification |
| Block explorers (BscScan, Etherscan, etc.) | Contract verification and address labeling |
| [CoinGecko](https://coingecko.com) | Verified contract addresses and market data |
| Protocol UIs (browser) | Live rates, liquidity, market parameters |

### Core Principles

1. **Aggregators first** — you don't know what tokens/protocols exist. Start with DeFiLlama, StakingRewards, CoinGecko.
2. **Verify every address** — anyone can deploy a token with any symbol. Scam tokens are everywhere.
3. **On-chain proof** — supply numbers from mint/burn queries, not from protocol marketing.
4. **DeBank for identity** — classify wallets as protocol contracts, bots, or real users.
5. **Browser for live data** — rates change daily. Never state a rate from model memory.
6. **Ask the user** — they often know about tokens and protocols the AI doesn't.

## Lessons Learned

Mistakes that cost real debugging time (full details in each research file):

1. AI didn't know asBNB existed — always use aggregators, never model memory
2. Fake tokens on Dune — cross-reference every address with CoinGecko/explorer
3. Ghost supply (ankrBNB) — 100M minted means nothing if 1 address holds it all
4. Borrow rates assumed wrong — only the protocol UI has the live number
5. Dune queries timeout without date partition filters

## Adding New Research

When researching a new chain, protocol, or token:

1. Create a new file under `research/` (e.g., `research/eth-lrt-market.md`)
2. Follow the verification workflow — every data table needs a "Source" column
3. Note what the AI got wrong vs what was discovered from live sources
4. Add lessons learned to help future sessions
5. Update this README with the new topic
