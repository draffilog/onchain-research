-- ==========================================================================
-- BNB LST Research — All Dune SQL Queries
-- ==========================================================================
-- Created during BNB Liquid Staking research (April 2026)
-- All queries target BNB Chain (blockchain = 'bnb')
-- Dune query IDs included where available
--
-- Table of Contents:
--   1. Token Supply & Holders
--   2. Growth Trends & Time Series
--   3. Lending & Borrowing (Lista Moolah)
--   4. Cross-Protocol Looping Detection
--   5. Liquidation Forensics
--   6. DEX Liquidity & Price Ratios
--   7. Stablecoin Borrowing Markets
--   8. Native Staking Comparison


-- ==========================================================================
-- 1. TOKEN SUPPLY & HOLDERS
-- ==========================================================================

-- ── 1a. Top slisBNB holders (excluding protocol contracts) ──
-- Dune ID: 7331495
-- Net balance via mint/burn (inflows - outflows). Filter out zero address.

WITH inflows AS (
  SELECT "to" AS wallet, SUM(amount) AS total_in
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  GROUP BY 1
),
outflows AS (
  SELECT "from" AS wallet, SUM(amount) AS total_out
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  GROUP BY 1
)
SELECT
  CAST(COALESCE(i.wallet, o.wallet) AS VARCHAR) AS wallet,
  COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) AS balance
FROM inflows i
FULL OUTER JOIN outflows o ON i.wallet = o.wallet
WHERE COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) > 1
  AND COALESCE(i.wallet, o.wallet) != 0x0000000000000000000000000000000000000000
ORDER BY balance DESC
LIMIT 30;


-- ── 1b. Top asBNB holders (excluding treasury pre-mint) ──
-- Dune ID: 7331976
-- asBNB contract: 0x7eb45259af84318972aa3f0eafe550a072824444
-- Treasury pre-mint address: 0x5c952063c7fc8610ffdb798152d69f0b9550762b

WITH inflows AS (
  SELECT "to" AS wallet, SUM(amount) AS total_in
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x7eb45259af84318972aa3f0eafe550a072824444
  GROUP BY 1
),
outflows AS (
  SELECT "from" AS wallet, SUM(amount) AS total_out
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x7eb45259af84318972aa3f0eafe550a072824444
  GROUP BY 1
)
SELECT
  CAST(COALESCE(i.wallet, o.wallet) AS VARCHAR) AS wallet,
  COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) AS balance
FROM inflows i
FULL OUTER JOIN outflows o ON i.wallet = o.wallet
WHERE COALESCE(i.total_in, 0) - COALESCE(o.total_out, 0) > 1
  AND COALESCE(i.wallet, o.wallet) != 0x0000000000000000000000000000000000000000
  AND COALESCE(i.wallet, o.wallet) != 0x5c952063c7fc8610ffdb798152d69f0b9550762b
ORDER BY balance DESC
LIMIT 30;


-- ── 1c. BNB LST latest holder stats ──
-- Dune ID: 7331959
-- Current total and recent unique wallet recipients for both tokens

WITH transfers AS (
  SELECT
    contract_address,
    "to" AS wallet,
    MIN(block_date) AS first_received,
    MAX(block_date) AS last_received
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address IN (
      0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B,
      0x7eb45259af84318972aa3f0eafe550a072824444
    )
    AND "to" != 0x0000000000000000000000000000000000000000
  GROUP BY 1, 2
)
SELECT
  CASE contract_address
    WHEN 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B THEN 'slisBNB'
    WHEN 0x7eb45259af84318972aa3f0eafe550a072824444 THEN 'asBNB'
  END AS token,
  COUNT(DISTINCT wallet) AS total_unique_recipients,
  COUNT(DISTINCT CASE WHEN first_received >= CURRENT_DATE - INTERVAL '30' DAY THEN wallet END) AS new_last_30d,
  COUNT(DISTINCT CASE WHEN first_received >= CURRENT_DATE - INTERVAL '90' DAY THEN wallet END) AS new_last_90d
FROM transfers
GROUP BY contract_address;


-- ==========================================================================
-- 2. GROWTH TRENDS & TIME SERIES
-- ==========================================================================

-- ── 2a. Cumulative supply over time (mint/burn tracking) ──
-- Dune ID: 7331935

WITH daily_mints AS (
  SELECT
    block_date,
    contract_address,
    SUM(CASE
      WHEN "from" = 0x0000000000000000000000000000000000000000 THEN amount
      WHEN "to" = 0x0000000000000000000000000000000000000000 THEN -amount
      ELSE 0
    END) AS net_mint
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address IN (
      0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B,
      0x7eb45259af84318972aa3f0eafe550a072824444
    )
    AND ("from" = 0x0000000000000000000000000000000000000000
      OR "to" = 0x0000000000000000000000000000000000000000)
  GROUP BY 1, 2
)
SELECT
  block_date,
  CASE contract_address
    WHEN 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B THEN 'slisBNB'
    WHEN 0x7eb45259af84318972aa3f0eafe550a072824444 THEN 'asBNB'
  END AS token,
  SUM(net_mint) OVER (
    PARTITION BY contract_address ORDER BY block_date
  ) AS cumulative_supply
FROM daily_mints
ORDER BY block_date, token;


-- ── 2b. Monthly supply snapshots ──
-- Dune ID: 7331950

WITH daily_mints AS (
  SELECT
    block_date,
    contract_address,
    SUM(CASE
      WHEN "from" = 0x0000000000000000000000000000000000000000 THEN amount
      WHEN "to" = 0x0000000000000000000000000000000000000000 THEN -amount
      ELSE 0
    END) AS net_mint
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address IN (
      0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B,
      0x7eb45259af84318972aa3f0eafe550a072824444
    )
    AND ("from" = 0x0000000000000000000000000000000000000000
      OR "to" = 0x0000000000000000000000000000000000000000)
  GROUP BY 1, 2
),
cumulative AS (
  SELECT
    block_date,
    contract_address,
    SUM(net_mint) OVER (
      PARTITION BY contract_address ORDER BY block_date
    ) AS supply
  FROM daily_mints
),
ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY contract_address, DATE_TRUNC('month', block_date)
      ORDER BY block_date DESC
    ) AS rn
  FROM cumulative
)
SELECT
  DATE_TRUNC('month', block_date) AS month,
  CASE contract_address
    WHEN 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B THEN 'slisBNB'
    WHEN 0x7eb45259af84318972aa3f0eafe550a072824444 THEN 'asBNB'
  END AS token,
  ROUND(supply, 0) AS end_of_month_supply
FROM ranked
WHERE rn = 1
ORDER BY month, token;


-- ── 2c. Daily unique holders (new wallet adoption) ──
-- Dune ID: 7331934

WITH first_received AS (
  SELECT
    contract_address,
    "to" AS wallet,
    MIN(block_date) AS first_date
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address IN (
      0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B,
      0x7eb45259af84318972aa3f0eafe550a072824444
    )
    AND "to" != 0x0000000000000000000000000000000000000000
  GROUP BY 1, 2
),
daily_new AS (
  SELECT first_date, contract_address, COUNT(*) AS new_wallets
  FROM first_received
  GROUP BY 1, 2
)
SELECT
  first_date AS date,
  CASE contract_address
    WHEN 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B THEN 'slisBNB'
    WHEN 0x7eb45259af84318972aa3f0eafe550a072824444 THEN 'asBNB'
  END AS token,
  new_wallets,
  SUM(new_wallets) OVER (
    PARTITION BY contract_address ORDER BY first_date
  ) AS cumulative_holders
FROM daily_new
ORDER BY date, token;


-- ==========================================================================
-- 3. LENDING & BORROWING (LISTA MOOLAH)
-- ==========================================================================

-- ── 3a. Active slisBNB borrowers on Moolah (last 90 days) ──
-- Dune ID: 7331504
-- Moolah controller: 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c

WITH slisBNB_supplied AS (
  SELECT "from" AS wallet, SUM(amount) AS total_supplied,
    COUNT(*) AS supply_count, MAX(block_date) AS last_supply
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    AND "to" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
    AND "from" != 0x0000000000000000000000000000000000000000
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
),
bnb_borrowed AS (
  SELECT "to" AS wallet, SUM(amount) AS total_borrowed,
    COUNT(*) AS borrow_count
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c  -- WBNB
    AND "from" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
    AND "to" != 0x0000000000000000000000000000000000000000
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
),
usdt_borrowed AS (
  SELECT "to" AS wallet, SUM(amount) AS total_borrowed,
    COUNT(*) AS borrow_count
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x55d398326f99059fF775485246999027B3197955  -- USDT
    AND "from" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
)
SELECT
  CAST(cs.wallet AS VARCHAR) AS wallet,
  ROUND(cs.total_supplied, 2) AS slisBNB_supplied,
  ROUND(COALESCE(bb.total_borrowed, 0), 2) AS wbnb_borrowed,
  ROUND(COALESCE(ub.total_borrowed, 0), 2) AS usdt_borrowed,
  cs.supply_count,
  COALESCE(bb.borrow_count, 0) + COALESCE(ub.borrow_count, 0) AS borrow_count,
  CASE
    WHEN COALESCE(bb.total_borrowed, 0) > 0 AND cs.supply_count >= 3 THEN 'BNB Looper'
    WHEN COALESCE(ub.total_borrowed, 0) > 0 THEN 'USDT Borrower'
    WHEN COALESCE(bb.total_borrowed, 0) > 0 THEN 'BNB Borrower'
    ELSE 'Supply Only'
  END AS strategy_type
FROM slisBNB_supplied cs
LEFT JOIN bnb_borrowed bb ON cs.wallet = bb.wallet
LEFT JOIN usdt_borrowed ub ON cs.wallet = ub.wallet
WHERE cs.total_supplied > 5
ORDER BY cs.total_supplied DESC
LIMIT 50;


-- ==========================================================================
-- 4. CROSS-PROTOCOL LOOPING DETECTION
-- ==========================================================================

-- ── 4a. Find all contracts receiving slisBNB from multiple senders ──
-- Dune ID: 7331648
-- Used to discover Moolah sub-contracts and other lending markets

SELECT
  CAST("to" AS VARCHAR) AS receiving_contract,
  COUNT(DISTINCT "from") AS unique_senders,
  SUM(amount) AS total_received,
  COUNT(*) AS transfer_count
FROM tokens.transfers
WHERE blockchain = 'bnb'
  AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
  AND "to" != 0x0000000000000000000000000000000000000000
  AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
GROUP BY 1
HAVING COUNT(DISTINCT "from") >= 3
ORDER BY unique_senders DESC
LIMIT 30;


-- ── 4b. Cross-protocol slisBNB loopers (supply + borrow on any protocol) ──
-- Dune ID: 7331658
-- Checks multiple known Moolah market contracts

WITH moolah_contracts AS (
  SELECT address FROM (VALUES
    (0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c),
    (0x9474e972f49605315763c296b122cbb998b615cf),
    (0x3dcea6afba8af84b25f1f8947058af1ac4c06131),
    (0x63242a4ea82847b20e506b63b0e2e2eff0cc6cb0),
    (0x89c910eb8c90df818b4649b508ba22130dc73adc)
  ) AS t(address)
),
slisBNB_suppliers AS (
  SELECT "from" AS wallet, SUM(amount) AS supplied, COUNT(*) AS supply_txns
  FROM tokens.transfers t
  JOIN moolah_contracts mc ON t."to" = mc.address
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    AND "from" != 0x0000000000000000000000000000000000000000
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
),
wbnb_borrowers AS (
  SELECT "to" AS wallet, SUM(amount) AS borrowed, COUNT(*) AS borrow_txns
  FROM tokens.transfers t
  JOIN moolah_contracts mc ON t."from" = mc.address
  WHERE blockchain = 'bnb'
    AND contract_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    AND "to" != 0x0000000000000000000000000000000000000000
    AND block_date >= CURRENT_DATE - INTERVAL '90' DAY
  GROUP BY 1
)
SELECT
  CAST(s.wallet AS VARCHAR) AS wallet,
  ROUND(s.supplied, 2) AS slisBNB_supplied,
  ROUND(b.borrowed, 2) AS wbnb_borrowed,
  s.supply_txns,
  b.borrow_txns,
  s.supply_txns + b.borrow_txns AS total_txns
FROM slisBNB_suppliers s
JOIN wbnb_borrowers b ON s.wallet = b.wallet
WHERE s.supplied > 1
ORDER BY s.supplied DESC;


-- ── 4c. Verify active loopers via net balance (all-time) ──
-- Dune ID: 7331730
-- WARNING: Slow query — scans all history. Use with caution.
-- Ghost positions (liquidated wallets) will appear as "active" here.

WITH moolah_contracts AS (
  SELECT address FROM (VALUES
    (0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c),
    (0x9474e972f49605315763c296b122cbb998b615cf),
    (0x3dcea6afba8af84b25f1f8947058af1ac4c06131),
    (0x63242a4ea82847b20e506b63b0e2e2eff0cc6cb0),
    (0x89c910eb8c90df818b4649b508ba22130dc73adc)
  ) AS t(address)
),
deposits AS (
  SELECT "from" AS wallet, SUM(amount) AS total_deposited
  FROM tokens.transfers t
  JOIN moolah_contracts mc ON t."to" = mc.address
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    AND "from" != 0x0000000000000000000000000000000000000000
  GROUP BY 1
),
withdrawals AS (
  SELECT "to" AS wallet, SUM(amount) AS total_withdrawn
  FROM tokens.transfers t
  JOIN moolah_contracts mc ON t."from" = mc.address
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    AND "to" != 0x0000000000000000000000000000000000000000
  GROUP BY 1
),
borrows AS (
  SELECT "to" AS wallet, SUM(amount) AS total_borrowed
  FROM tokens.transfers t
  JOIN moolah_contracts mc ON t."from" = mc.address
  WHERE blockchain = 'bnb'
    AND contract_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    AND "to" != 0x0000000000000000000000000000000000000000
  GROUP BY 1
),
repayments AS (
  SELECT "from" AS wallet, SUM(amount) AS total_repaid
  FROM tokens.transfers t
  JOIN moolah_contracts mc ON t."to" = mc.address
  WHERE blockchain = 'bnb'
    AND contract_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    AND "from" != 0x0000000000000000000000000000000000000000
  GROUP BY 1
)
SELECT
  CAST(d.wallet AS VARCHAR) AS wallet,
  ROUND(d.total_deposited - COALESCE(w.total_withdrawn, 0), 2) AS net_slisBNB,
  ROUND(COALESCE(b.total_borrowed, 0) - COALESCE(r.total_repaid, 0), 2) AS net_wbnb_owed
FROM deposits d
LEFT JOIN withdrawals w ON d.wallet = w.wallet
LEFT JOIN borrows b ON d.wallet = b.wallet
LEFT JOIN repayments r ON d.wallet = r.wallet
WHERE d.total_deposited - COALESCE(w.total_withdrawn, 0) > 1
  AND COALESCE(b.total_borrowed, 0) - COALESCE(r.total_repaid, 0) > 1
ORDER BY net_slisBNB DESC
LIMIT 30;


-- ==========================================================================
-- 5. LIQUIDATION FORENSICS
-- ==========================================================================

-- ── 5a. Moolah liquidation events ──
-- Dune ID: 7332004
-- Event signature for Liquidate on Lista Moolah controller
-- 0xa4946ede45d0c6f06a0f5ce92c9ad3b4751452d2fe0e25010783bcab57a67e41

SELECT
  block_time,
  tx_hash,
  CAST(topic1 AS VARCHAR) AS market_id,
  CAST(topic2 AS VARCHAR) AS liquidator,
  CAST(topic3 AS VARCHAR) AS borrower,
  CAST(bytearray_to_uint256(bytearray_substring(data, 1, 32)) AS DECIMAL(38,0)) AS seized_assets,
  CAST(bytearray_to_uint256(bytearray_substring(data, 33, 32)) AS DECIMAL(38,0)) AS repaid_shares,
  CAST(bytearray_to_uint256(bytearray_substring(data, 65, 32)) AS DECIMAL(38,0)) AS repaid_assets,
  CAST(bytearray_to_uint256(bytearray_substring(data, 97, 32)) AS DECIMAL(38,0)) AS bad_debt_assets,
  CAST(bytearray_to_uint256(bytearray_substring(data, 129, 32)) AS DECIMAL(38,0)) AS bad_debt_shares
FROM bnb.logs
WHERE contract_address = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
  AND topic0 = 0xa4946ede45d0c6f06a0f5ce92c9ad3b4751452d2fe0e25010783bcab57a67e41
ORDER BY block_time DESC;


-- ── 5b. Monthly liquidation summary ──
-- Dune ID: 7332009

SELECT
  DATE_TRUNC('month', block_time) AS month,
  COUNT(*) AS liquidation_events,
  COUNT(DISTINCT topic3) AS unique_borrowers,
  SUM(CAST(bytearray_to_uint256(bytearray_substring(data, 1, 32)) AS DECIMAL(38,0))) AS total_seized,
  SUM(CAST(bytearray_to_uint256(bytearray_substring(data, 65, 32)) AS DECIMAL(38,0))) AS total_repaid,
  SUM(CAST(bytearray_to_uint256(bytearray_substring(data, 97, 32)) AS DECIMAL(38,0))) AS total_bad_debt
FROM bnb.logs
WHERE contract_address = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
  AND topic0 = 0xa4946ede45d0c6f06a0f5ce92c9ad3b4751452d2fe0e25010783bcab57a67e41
GROUP BY 1
ORDER BY 1;


-- ── 5c. Top liquidated borrowers (all time) ──
-- Dune ID: 7332010

SELECT
  CAST(topic3 AS VARCHAR) AS borrower,
  COUNT(*) AS times_liquidated,
  SUM(CAST(bytearray_to_uint256(bytearray_substring(data, 1, 32)) AS DECIMAL(38,0))) AS total_seized,
  SUM(CAST(bytearray_to_uint256(bytearray_substring(data, 65, 32)) AS DECIMAL(38,0))) AS total_repaid,
  MIN(block_time) AS first_liquidation,
  MAX(block_time) AS last_liquidation
FROM bnb.logs
WHERE contract_address = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
  AND topic0 = 0xa4946ede45d0c6f06a0f5ce92c9ad3b4751452d2fe0e25010783bcab57a67e41
GROUP BY topic3
ORDER BY total_seized DESC
LIMIT 30;


-- ==========================================================================
-- 6. DEX LIQUIDITY & PRICE RATIOS
-- ==========================================================================

-- ── 6a. DEX trading volume (slisBNB + asBNB, 6 months) ──
-- Dune ID: 7331957

SELECT
  block_date,
  CASE
    WHEN token_bought_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
      OR token_sold_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    THEN 'slisBNB'
    WHEN token_bought_address = 0x7eb45259af84318972aa3f0eafe550a072824444
      OR token_sold_address = 0x7eb45259af84318972aa3f0eafe550a072824444
    THEN 'asBNB'
  END AS token,
  COUNT(*) AS trade_count,
  SUM(amount_usd) AS volume_usd
FROM dex.trades
WHERE blockchain = 'bnb'
  AND block_date >= CURRENT_DATE - INTERVAL '180' DAY
  AND (
    token_bought_address IN (
      0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B,
      0x7eb45259af84318972aa3f0eafe550a072824444
    )
    OR token_sold_address IN (
      0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B,
      0x7eb45259af84318972aa3f0eafe550a072824444
    )
  )
GROUP BY 1, 2
ORDER BY 1, 2;


-- ── 6b. slisBNB/BNB price ratio (depeg detection) ──
-- Dune ID: 7331961
-- Direct pair trades: slisBNB bought with WBNB (or vice versa)

SELECT
  block_date,
  AVG(
    CASE
      WHEN token_bought_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
      THEN token_bought_amount / NULLIF(token_sold_amount, 0)
      ELSE token_sold_amount / NULLIF(token_bought_amount, 0)
    END
  ) AS avg_slisBNB_per_WBNB,
  MIN(
    CASE
      WHEN token_bought_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
      THEN token_bought_amount / NULLIF(token_sold_amount, 0)
      ELSE token_sold_amount / NULLIF(token_bought_amount, 0)
    END
  ) AS min_ratio,
  MAX(
    CASE
      WHEN token_bought_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
      THEN token_bought_amount / NULLIF(token_sold_amount, 0)
      ELSE token_sold_amount / NULLIF(token_bought_amount, 0)
    END
  ) AS max_ratio,
  COUNT(*) AS trade_count
FROM dex.trades
WHERE blockchain = 'bnb'
  AND block_date >= CURRENT_DATE - INTERVAL '365' DAY
  AND (
    (token_bought_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
     AND token_sold_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c)
    OR
    (token_sold_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
     AND token_bought_address = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c)
  )
GROUP BY 1
HAVING COUNT(*) >= 2
ORDER BY 1;


-- ==========================================================================
-- 7. STABLECOIN BORROWING MARKETS
-- ==========================================================================

-- ── 7a. What assets are borrowed from Moolah (90-day volumes) ──
-- Dune ID: 7332024

SELECT
  CAST(t.contract_address AS VARCHAR) AS token_address,
  COALESCE(e.symbol, 'Unknown') AS symbol,
  COUNT(*) AS borrow_txns,
  COUNT(DISTINCT "to") AS unique_borrowers,
  SUM(t.amount) AS total_volume
FROM tokens.transfers t
LEFT JOIN tokens.erc20 e
  ON t.contract_address = e.contract_address AND e.blockchain = 'bnb'
WHERE t.blockchain = 'bnb'
  AND t."from" = 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
  AND t."to" != 0x0000000000000000000000000000000000000000
  AND t.block_date >= CURRENT_DATE - INTERVAL '90' DAY
  AND t.amount > 0
GROUP BY 1, 2
ORDER BY borrow_txns DESC
LIMIT 20;


-- ==========================================================================
-- 8. NATIVE STAKING COMPARISON
-- ==========================================================================

-- ── 8a. BNB native staking pool size vs LST supply ──
-- Dune ID: 7332027

WITH slisBNB_supply AS (
  SELECT SUM(CASE
    WHEN "from" = 0x0000000000000000000000000000000000000000 THEN amount
    WHEN "to" = 0x0000000000000000000000000000000000000000 THEN -amount
  END) AS supply
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
    AND ("from" = 0x0000000000000000000000000000000000000000
      OR "to" = 0x0000000000000000000000000000000000000000)
),
asBNB_supply AS (
  SELECT SUM(CASE
    WHEN "from" = 0x0000000000000000000000000000000000000000 THEN amount
    WHEN "to" = 0x0000000000000000000000000000000000000000 THEN -amount
  END) AS supply
  FROM tokens.transfers
  WHERE blockchain = 'bnb'
    AND contract_address = 0x7eb45259af84318972aa3f0eafe550a072824444
    AND ("from" = 0x0000000000000000000000000000000000000000
      OR "to" = 0x0000000000000000000000000000000000000000)
)
SELECT
  'slisBNB' AS token, ROUND(supply, 0) AS supply FROM slisBNB_supply
UNION ALL
SELECT
  'asBNB' AS token, ROUND(supply, 0) AS supply FROM asBNB_supply;


-- ==========================================================================
-- REFERENCE: Contract Addresses (BNB Chain)
-- ==========================================================================
-- slisBNB:              0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B
-- asBNB:                0x7eb45259af84318972aa3f0eafe550a072824444
-- WBNB:                 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
-- USDT (BSC):           0x55d398326f99059fF775485246999027B3197955
-- USDC (BSC):           0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
-- Moolah Controller:    0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c
-- Moolah Market #2:     0x9474e972f49605315763c296b122cbb998b615cf
-- Moolah Pool:          0x3dcea6afba8af84b25f1f8947058af1ac4c06131
-- Moolah Router:        0x63242a4ea82847b20e506b63b0e2e2eff0cc6cb0
-- Moolah Sub-contract:  0x89c910eb8c90df818b4649b508ba22130dc73adc
-- asBNB Treasury:       0x5c952063c7fc8610ffdb798152d69f0b9550762b
-- Lista BNB Vault:      0x57134a64b7cd9f9eb72f8255a671f5bf2fe3e2d0
-- Lista Staking Pool:   0x91e49983598685dd5acac90ceb4061a772f6e5ae
-- Lista Operator:       0x6f28fec449dbd2056b76ac666350af8773e03873
-- Moolah Liquidation Event Signature:
--   0xa4946ede45d0c6f06a0f5ce92c9ad3b4751452d2fe0e25010783bcab57a67e41
