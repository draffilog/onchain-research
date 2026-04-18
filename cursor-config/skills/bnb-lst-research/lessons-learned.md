# Lessons Learned — BNB LST Research

Mistakes and surprises from the April 2026 BNB LST research session.
Every lesson here cost real time to debug. Future agents should read this
before starting any crypto research.

## 1. LLM Crypto Knowledge Is Unreliable

**What happened**: When asked about BNB LSTs, the AI listed slisBNB, BNBx,
and aBNBb — but had no knowledge of Aster's asBNB, which is the #2 LST on
BNB Chain with $228M TVL.

**Why**: The model was trained before Aster (formerly Astherus) launched or
gained traction. Crypto moves fast — new protocols appear, rebrand, pivot,
or die between training cutoffs.

**Rule**: NEVER rely on your training data for:
- Which tokens/protocols exist on a chain
- Contract addresses
- TVL numbers, APY rates, or market share
- Protocol names (rebrands are common — Astherus → Aster)

**Instead**: Always start with live aggregator data (DeFiLlama, CoinGecko,
StakingRewards) and verify each finding on-chain.

## 2. Fake Tokens on Dune

**What happened**: Searching Dune `tokens.erc20` for "asBNB" returned
contract addresses with trillions of token supply — clearly fake/scam tokens
masquerading under the same symbol.

**Why**: Anyone can deploy an ERC-20 with any name/symbol. Dune indexes them
all without quality filtering.

**Rule**: NEVER trust a contract address found solely from `tokens.erc20` by
symbol search. Always:
1. Cross-reference with CoinGecko (verified contract badge)
2. Check BscScan for verified source code and holder count
3. Sanity-check supply: does it match the protocol's claimed TVL?

## 3. Pre-Minted Ghost Tokens

**What happened**: ankrBNB v2 showed ~100M token supply on Dune, but had
zero meaningful holders or DeFi activity. The real Ankr BNB token was the
legacy `aBNBb` contract with only 22K supply.

**Why**: Some contracts pre-mint the full supply to a single address. The
mint/burn method computes total minted minus total burned, but if no one has
actually claimed or used the tokens, the "supply" is meaningless.

**Rule**: After computing supply via mint/burn, immediately check top holders.
If one address holds >99% and no DeFi activity exists, the supply figure is
misleading. Cross-reference with the actual holder distribution.

## 4. Exchange Rates for Reward-Bearing Tokens

**What happened**: asBNB is reward-bearing (1 asBNB ≈ 1.34 BNB at time of
research). Initial analysis treated it as 1:1, understating Aster's real
BNB backing by ~34%.

**Why**: Unlike rebasing tokens (slisBNB) where 1 token = 1 underlying,
reward-bearing tokens appreciate in value. The raw token supply does not
equal the BNB backing.

**Rule**: For any reward-bearing LST, find the exchange rate:
1. Check the protocol UI (usually displayed on the staking page)
2. CoinGecko price ratio (LST price / underlying price)
3. Call `exchangeRate()` or equivalent on the smart contract

Multiply supply by exchange rate to get true backing.

## 5. Dune Query Performance

**What happened**: A broad query scanning all slisBNB transfers to the
Moolah controller (no date filter) ran for 10+ minutes and timed out.

**Why**: `tokens.transfers` is partitioned by `block_date`. Without a date
filter, Dune scans the entire table history — extremely expensive.

**Rule**: Always include `block_date >= CURRENT_DATE - INTERVAL '90' DAY`
(or appropriate window) in Dune queries. Exceptions only for total supply
calculations where you need the full history (mint/burn from genesis).

## 6. Lending Controller ≠ Direct Borrows

**What happened**: Querying WBNB transfers from the Moolah controller
(`0x8f73...`) to detect borrows missed many real borrowers. The controller
doesn't always emit simple transfers for borrows.

**Why**: Morpho-style lending (like Lista Moolah) uses internal accounting.
Borrows may not show up as `tokens.transfers` from the controller address.

**Rule**: Don't rely solely on Dune transfer data for borrow detection.
Cross-reference with:
1. DeBank `complex_protocol_list` — shows actual borrow positions
2. Protocol UI — shows real-time borrow/supply per market
3. Contract-specific events — if available in Dune decoded tables

## 7. Bots vs Real Users

**What happened**: On-chain, the wallets with the most supply transactions
to Moolah were all bots/contracts — 400-2,400 transactions in 90 days. Their
DeBank profiles were empty (no DeFi positions shown for contracts).

**Why**: High-frequency loopers are automated. Real users use the BNB Vault
(single transaction) or do occasional manual loops.

**Rule**: When analyzing on-chain activity:
- High tx count (100+) = likely bot or contract
- Empty DeBank profile = definitely contract (not an EOA)
- Look for the VAULT address — that's where retail volume lives
- Real whale wallets have diverse DeBank positions (multiple protocols)

## 8. Protocol UI Navigation

**What happened**: Clicking on table rows in the Lista lending UI didn't
navigate to market detail pages as expected. Browser automation required
direct URL construction with position hashes.

**Rule**: When using browser to check protocol UIs:
1. Try direct URLs first: `protocol.org/lending/market/<chain>/<market_id>`
2. Get the market ID from DeBank `position_index` field
3. Don't rely on UI table clicks — many DeFi UIs use client-side routing
   that doesn't work well with automation
