import {
  BarChart,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  PieChart,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type Market = {
  name: string;
  tvl: number;
  apy: string;
  product: string;
  description: string;
  contract: string;
  token: string;
};

const TOP_MARKETS: Market[] = [
  {
    name: "slisBNB Liquid Staking",
    tvl: 660_000_000,
    apy: "4.5–7.0%",
    product: "Liquid Staking",
    description: "Stake BNB → receive slisBNB token that accrues staking rewards. Use slisBNB across DeFi while earning passive yield.",
    contract: "0x1adB950d8bB3dA4bE104211D5AB038628e477fE6",
    token: "0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B",
  },
  {
    name: "Moolah BNB Vault",
    tvl: 424_000_000,
    apy: "2.11%",
    product: "Lending (Supply)",
    description: "Supply BNB to earn interest from borrowers. Powered by Morpho Blue. Borrowers collateralize slisBNB/BTCB to borrow BNB.",
    contract: "0x57134a64B7cD9F9eb72F8255A671F5Bf2fe3E2d0",
    token: "WBNB",
  },
  {
    name: "Moolah USD1 Vault",
    tvl: 162_000_000,
    apy: "2.11%",
    product: "Lending (Supply)",
    description: "Supply USD1 stablecoin to earn interest. Low-risk stablecoin yield from institutional borrowing demand.",
    contract: "0xfa27f172e0b6ebcEF9c51ABf817E2cb142FbE627",
    token: "USD1",
  },
  {
    name: "lisUSD CDP System",
    tvl: 76_000_000,
    apy: "1.16% (stake) + farming",
    product: "CDP / Stablecoin",
    description: "Collateralize BNB/slisBNB/wBETH → mint lisUSD stablecoin. Use lisUSD in LP farming or staking for additional yield.",
    contract: "0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5",
    token: "lisUSD",
  },
  {
    name: "Moolah USDT Vault",
    tvl: 24_000_000,
    apy: "3.66%",
    product: "Lending (Supply)",
    description: "Supply USDT to earn higher interest than USD1 vault. Higher APY reflects stronger borrowing demand for USDT.",
    contract: "Moolah USDT Market",
    token: "USDT",
  },
];

type WalletProfile = {
  address: string;
  totalUsd: number;
  tag: string;
  strategy: string;
  listaPositions: string;
  otherProtocols: string;
  yieldEstimate: string;
};

const WALLETS: WalletProfile[] = [
  {
    address: "0xac3e216bd55860912062a4027a03b99587b7ffc7",
    totalUsd: 500_447_191,
    tag: "Mega-whale / Institutional",
    strategy: "BNB Lending + USD1 Supply + Venus Diversification",
    listaPositions: "243K BNB in Moolah Vault ($156M), 38K BNB staked ($24M), 119M USD1 supplied ($119M), SolvBTC+BTCB ($775K)",
    otherProtocols: "Venus: 20K BNB + 30M USDT + 10 BTCB ($44M)",
    yieldEstimate: "~2.1% on $156M BNB lending + ~2.1% on $119M USD1 = ~$5.8M/yr",
  },
  {
    address: "0x18709e89bd403f470088abdacebe86cc60dda12e",
    totalUsd: 1_582_496_050,
    tag: "Exchange / Institutional Treasury",
    strategy: "Multi-vault Stablecoin + BNB Supply",
    listaPositions: "43.7M U supplied ($43.7M), 1.08M USD1 ($1.08M), 7K BNB ($4.5M)",
    otherProtocols: "Likely exchange wallet deploying idle reserves to Lista for yield",
    yieldEstimate: "~2.1% on $49M = ~$1M/yr (conservative deployment of treasury)",
  },
  {
    address: "0x3d325df6debb6aa237591a348ecb511354f3607d",
    totalUsd: 14_169_230,
    tag: "Pure BNB Staker",
    strategy: "All-in Lista BNB Staking",
    listaPositions: "22,091 BNB staked via slisBNB ($14.2M). Single protocol, single asset.",
    otherProtocols: "None — 100% Lista DAO",
    yieldEstimate: "~4.5-7% on $14.2M = $640K–$990K/yr",
  },
  {
    address: "0x9c580fed6c26dcc06ca7673e72489d8f4ddba0b8",
    totalUsd: 13_547_779,
    tag: "Multi-staking Diversifier",
    strategy: "BNB Staking across Lista + Native + Aster",
    listaPositions: "10,016 BNB in Lista ($6.4M slisBNB staking)",
    otherProtocols: "BNB Chain native staking: 9,101 BNB ($5.8M), Aster: 2,004 BNB ($1.3M)",
    yieldEstimate: "~4.5% Lista + ~2.5% native + ~5% Aster = blended ~3.8% on $13.5M = ~$515K/yr",
  },
  {
    address: "0xb2a6a72843db0f508204a56448413f3867ea691a",
    totalUsd: 10_929_341,
    tag: "Pure Lista BNB Staker",
    strategy: "Single Protocol, Single Asset",
    listaPositions: "17,040 BNB staked ($10.9M). Zero diversification.",
    otherProtocols: "None — 100% Lista DAO",
    yieldEstimate: "~4.5-7% on $10.9M = $490K–$765K/yr",
  },
  {
    address: "0x128463a60784c4d3f46c23af3f65ed859ba87974",
    totalUsd: 1_266_243_119,
    tag: "Exchange / Custodian",
    strategy: "Aster Dominant + Lista BNB Staking",
    listaPositions: "5,976 BNB staked ($3.8M)",
    otherProtocols: "Aster: 101.5M USDT ($101.6M) + 40K BNB ($25.9M). Likely exchange deploying reserves.",
    yieldEstimate: "~4.5% on $3.8M Lista = ~$171K/yr (small allocation of massive portfolio)",
  },
  {
    address: "0x1d60bbbef79fb9540d271dbb01925380323a8f66",
    totalUsd: 14_721_298,
    tag: "Stablecoin Farmer",
    strategy: "lisUSD LP + USDT Supply",
    listaPositions: "6.65M USDT in Lista vault ($6.65M), 508K lisUSD + 220K USDT in LP ($728K), 20K U ($20K)",
    otherProtocols: "PancakeSwap (tiny meme positions)",
    yieldEstimate: "~3.66% on USDT ($243K) + LP fees on $728K ≈ ~$280K/yr",
  },
  {
    address: "0xbe8d5933a138f3aae2f60c4c43de3368defae206",
    totalUsd: 2_557_999,
    tag: "Mid-size BNB Staker",
    strategy: "Lista BNB Staking + Exploration",
    listaPositions: "3,391 BNB staked ($2.17M)",
    otherProtocols: "Aster ($645), BounceBit ($8), Kernel DAO ($7) — exploring other protocols",
    yieldEstimate: "~4.5-7% on $2.17M = ~$98K–$152K/yr",
  },
  {
    address: "0xaa57f36dd5ef2ac471863ec46277f976f272ec0c",
    totalUsd: 12_349_977,
    tag: "lisUSD Whale",
    strategy: "Pure lisUSD Holder",
    listaPositions: "12.35M lisUSD held directly (no protocol deployment)",
    otherProtocols: "None — pure token holder, likely contract or market maker",
    yieldEstimate: "0% (not staked/deployed — just holding lisUSD)",
  },
];

type YieldStrategy = {
  name: string;
  apy: string;
  risk: string;
  description: string;
  steps: string;
  exampleWallet: string;
  exampleSize: string;
};

const STRATEGIES: YieldStrategy[] = [
  {
    name: "Simple BNB Staking (slisBNB)",
    apy: "4.5–7.0%",
    risk: "Low",
    description: "Stake BNB into slisBNB and hold. Earn passive staking rewards as slisBNB appreciates vs BNB. Includes Binance Launchpool yield.",
    steps: "1. Stake BNB → slisBNB  2. Hold slisBNB  3. Unstake when needed",
    exampleWallet: "0x3d32...3607d ($14.2M)",
    exampleSize: "$14.2M",
  },
  {
    name: "BNB Lending Supply",
    apy: "2.11%",
    risk: "Low",
    description: "Supply BNB to Moolah BNB Vault. Earn interest from borrowers. Capital preserved, instant withdrawal unless fully utilized.",
    steps: "1. Supply BNB to Moolah BNB Vault  2. Earn 2.11% APY  3. Withdraw anytime",
    exampleWallet: "0xac3e...ffc7 ($156M in vault)",
    exampleSize: "$156M",
  },
  {
    name: "Stablecoin Lending (USD1/USDT)",
    apy: "2.11–3.66%",
    risk: "Very Low",
    description: "Supply stablecoins to Moolah vaults. USDT vault offers higher APY (3.66%) due to stronger borrowing demand. USD1 at 2.11%.",
    steps: "1. Supply USD1 or USDT to vault  2. Earn interest  3. Withdraw anytime",
    exampleWallet: "0x1d60...a8f66 ($6.65M USDT)",
    exampleSize: "$6.65M",
  },
  {
    name: "CDP + lisUSD Farming",
    apy: "Variable (5–15%+ with farming)",
    risk: "Medium",
    description: "Collateralize BNB/slisBNB to borrow lisUSD, then deploy lisUSD into LP pools or staking for additional yield. Risk of liquidation if collateral drops.",
    steps: "1. Deposit BNB/slisBNB as collateral  2. Borrow lisUSD  3. Farm lisUSD in LP pools  4. Earn LP fees + LISTA rewards",
    exampleWallet: "0x1d60...a8f66 ($728K lisUSD/USDT LP)",
    exampleSize: "$728K",
  },
  {
    name: "Leveraged slisBNB Loop",
    apy: "8–15%+ (leveraged)",
    risk: "High",
    description: "Stake BNB → slisBNB → collateralize on Moolah → borrow BNB → restake → repeat. Amplifies the 4.5% base staking yield through leverage.",
    steps: "1. Stake BNB → slisBNB  2. Deposit slisBNB as collateral  3. Borrow BNB  4. Restake BNB → more slisBNB  5. Repeat",
    exampleWallet: "Evidence: Moolah holds 149K slisBNB as collateral",
    exampleSize: "~$96M in slisBNB collateral",
  },
  {
    name: "Multi-protocol BNB Diversification",
    apy: "3–5% blended",
    risk: "Low-Medium",
    description: "Spread BNB across Lista slisBNB + native BNB staking + Aster for diversified yield. Reduces single-protocol risk.",
    steps: "1. Split BNB across protocols  2. Lista slisBNB (4.5%)  3. Native staking (2.5%)  4. Aster (5%)",
    exampleWallet: "0x9c58...0b8 ($13.5M across 3 protocols)",
    exampleSize: "$13.5M",
  },
  {
    name: "slisBNB → Pendle Fixed Yield",
    apy: "3.06% fixed (PT-slisBNBx-Jun26)",
    risk: "Low",
    description: "Stake BNB → slisBNB → buy PT-slisBNBx on Pendle for guaranteed fixed yield until maturity. No variable rate risk.",
    steps: "1. Stake BNB → slisBNB  2. Buy PT-slisBNBx on Pendle  3. Hold to maturity for fixed 3.06%",
    exampleWallet: "0x6d3b...435e ($424K PT position)",
    exampleSize: "$424K",
  },
  {
    name: "Venus + Lista Dual Supply",
    apy: "2–3% combined",
    risk: "Low",
    description: "Supply BNB to both Venus and Lista for protocol-diversified lending yield. Reduces smart contract risk through diversification.",
    steps: "1. Supply BNB to Lista Moolah (2.11%)  2. Supply BNB to Venus  3. Split stablecoins similarly",
    exampleWallet: "0xac3e...ffc7 ($156M Lista + $44M Venus)",
    exampleSize: "$200M+",
  },
];

type ViewTab = "overview" | "wallets" | "strategies" | "yields";

function fmt(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function ListaDaoBsc() {
  const { tokens: t } = useHostTheme();
  const [tab, setTab] = useCanvasState<ViewTab>("tab", "overview");

  const totalTvl = TOP_MARKETS.reduce((s, m) => s + m.tvl, 0);

  return (
    <Stack gap={20}>
      <H1>Lista DAO on BSC — DeFi Yield Analysis</H1>
      <Text tone="secondary">
        Comprehensive analysis of Lista DAO's top 5 markets on BNB Chain: who uses them, what yield strategies they pursue, and why.
        Data from Pendle API, Dune Analytics, DeBank Pro API. April 2026.
      </Text>

      <Row gap={8} wrap>
        {(["overview", "wallets", "strategies", "yields"] as ViewTab[]).map((v) => (
          <Pill key={v} active={tab === v} onClick={() => setTab(v)}>
            {v === "overview" ? "Markets & TVL" : v === "wallets" ? "Who's Using Them" : v === "strategies" ? "Yield Strategies" : "APY Comparison"}
          </Pill>
        ))}
      </Row>

      <Divider />

      {tab === "overview" && <OverviewTab totalTvl={totalTvl} />}
      {tab === "wallets" && <WalletsTab />}
      {tab === "strategies" && <StrategiesTab />}
      {tab === "yields" && <YieldsTab />}

      <Divider />
      <Text tone="tertiary" size="small">
        Data sources: Dune Analytics (queries 7334391–7334395), DeBank Pro API, Pendle V2 API, DefiLlama, Lista DAO docs. April 2026.
      </Text>
    </Stack>
  );
}

function OverviewTab({ totalTvl }: { totalTvl: number }) {
  return (
    <Stack gap={20}>
      <Grid columns={4} gap={16}>
        <Stat value={fmt(totalTvl)} label="Top 5 Markets TVL" />
        <Stat value="$1.5B+" label="Total Protocol TVL" />
        <Stat value="28" label="Active Vaults" />
        <Stat value="152" label="Live Markets" />
      </Grid>

      <Grid columns={2} gap={20}>
        <Stack gap={12}>
          <H2>TVL by Market</H2>
          <BarChart
            categories={TOP_MARKETS.map((m) => m.name.replace("Moolah ", ""))}
            series={[{ name: "TVL ($M)", data: TOP_MARKETS.map((m) => m.tvl / 1_000_000) }]}
            horizontal
            height={250}
            valueSuffix="M"
          />
        </Stack>
        <Stack gap={12}>
          <H2>Product Breakdown</H2>
          <PieChart
            data={[
              { label: "Liquid Staking (slisBNB)", value: 660 },
              { label: "BNB Lending", value: 424 },
              { label: "Stablecoin Lending", value: 186 },
              { label: "CDP (lisUSD)", value: 76 },
            ]}
            donut
            size={200}
          />
        </Stack>
      </Grid>

      <H2>Top 5 Markets</H2>
      <Table
        headers={["Market", "TVL", "APY", "Product Type", "What It Does"]}
        rows={TOP_MARKETS.map((m) => [
          m.name,
          fmt(m.tvl),
          m.apy,
          m.product,
          m.description,
        ])}
        columnAlign={["left", "right", "center", "center", "left"]}
        striped
      />

      <H2>Protocol Architecture</H2>
      <Text>Lista DAO is a three-pillar DeFi protocol on BNB Chain:</Text>
      <Grid columns={3} gap={16}>
        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="success">$660M TVL</Pill>}>
            Liquid Staking (slisBNB)
          </CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">Stake BNB, receive yield-bearing slisBNB. Value appreciates with BNB staking APR (~4.5–7%). Use slisBNB across DeFi as collateral or in LP pools.</Text>
              <Text size="small" tone="secondary">Token: 0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="info">$610M+ TVL</Pill>}>
            Moolah Lending (Morpho Blue)
          </CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">Supply BNB/stablecoins to earn interest. Borrowers collateralize slisBNB, BTCB, or stablecoins. 28 vaults, 152 markets. Powered by Morpho Blue.</Text>
              <Text size="small" tone="secondary">Moolah: 0x8F73b65B4caAf64FBA2aF91cC5D4a2A1318E5D8C</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="warning">$76M Supply</Pill>}>
            CDP System (lisUSD)
          </CardHeader>
          <CardBody>
            <Stack gap={4}>
              <Text size="small">Collateralize BNB/slisBNB/wBETH to mint lisUSD stablecoin. Use lisUSD in farming, LP pools, or hold for 1.16% staking APR. Risk of liquidation.</Text>
              <Text size="small" tone="secondary">lisUSD: 0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card collapsible defaultOpen={false}>
        <CardHeader trailing={<Pill size="sm" tone="info" active>4 queries</Pill>}>
          Dune Query Results: Top Holders
        </CardHeader>
        <CardBody>
          <Stack gap={12}>
            <H3>Top slisBNB Holders (by transfer balance)</H3>
            <Table
              headers={["Rank", "Wallet", "slisBNB Balance", "Identity"]}
              rows={[
                ["1", "0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c", "149,581", "Moolah Contract (collateral)"],
                ["2", "0x91e49983598685dd5acac90ceb4061a772f6e5ae", "59,900", "slisBNB Token Contract"],
                ["3", "0xac3e216bd55860912062a4027a03b99587b7ffc7", "36,787", "$500M Institutional Whale"],
                ["4", "0x3d325df6debb6aa237591a348ecb511354f3607d", "21,333", "Pure BNB Staker ($14.2M)"],
                ["5", "0xb2a6a72843db0f508204a56448413f3867ea691a", "16,455", "Pure BNB Staker ($10.9M)"],
              ]}
              columnAlign={["center", "left", "right", "left"]}
              striped
            />
            <H3>Top lisUSD Holders</H3>
            <Table
              headers={["Rank", "Wallet", "lisUSD Balance", "Identity"]}
              rows={[
                ["1", "0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c", "$11.78M", "Moolah Contract"],
                ["2", "0xaa57f36dd5ef2ac471863ec46277f976f272ec0c", "$7.10M", "lisUSD Whale (pure holder)"],
                ["3", "0x1d60bbbef79fb9540d271dbb01925380323a8f66", "$2.02M", "Stablecoin Farmer"],
              ]}
              columnAlign={["center", "left", "right", "left"]}
              striped
            />
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

function WalletsTab() {
  const sorted = [...WALLETS].sort((a, b) => b.totalUsd - a.totalUsd);

  return (
    <Stack gap={16}>
      <H2>Who's Using Lista DAO?</H2>
      <Text tone="secondary">
        9 key wallets profiled via DeBank Pro API, ranging from $2.5M to $1.58B. These represent the real users of Lista DAO and their actual strategies.
      </Text>

      <Grid columns={3} gap={16}>
        <Stat value="9" label="Wallets Profiled" />
        <Stat value="$1.58B" label="Largest Portfolio" />
        <Stat value="$500M" label="Largest Lista Position" />
      </Grid>

      {sorted.map((w) => (
        <Card key={w.address}>
          <CardHeader trailing={
            <Pill size="sm" active tone={
              w.strategy.includes("Staking") || w.strategy.includes("BNB") ? "success" :
              w.strategy.includes("Stable") || w.strategy.includes("lisUSD") ? "info" :
              "neutral"
            }>
              {w.yieldEstimate.split("=")[0]?.trim() || w.apy}
            </Pill>
          }>
            {w.tag} — {fmt(w.totalUsd)}
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small" style={{ fontFamily: "monospace" }}>{w.address}</Text>
              <Text weight="semibold" size="small">{w.strategy}</Text>
              <Grid columns={2} gap={12}>
                <Stack gap={2}>
                  <Text tone="secondary" size="small" weight="semibold">Lista Positions</Text>
                  <Text size="small">{w.listaPositions}</Text>
                </Stack>
                <Stack gap={2}>
                  <Text tone="secondary" size="small" weight="semibold">Other Protocols</Text>
                  <Text size="small">{w.otherProtocols}</Text>
                </Stack>
              </Grid>
              <Text size="small" tone="secondary" italic>{w.yieldEstimate}</Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
}

function StrategiesTab() {
  return (
    <Stack gap={20}>
      <H2>What Are People Doing? — 8 Yield Strategies</H2>
      <Text tone="secondary">
        From conservative BNB staking to leveraged slisBNB loops, here are the distinct yield strategies observed on Lista DAO BSC.
      </Text>

      <Grid columns={2} gap={16}>
        {STRATEGIES.map((s) => (
          <Card key={s.name}>
            <CardHeader trailing={
              <Row gap={6}>
                <Pill size="sm" active tone={s.risk === "Low" || s.risk === "Very Low" ? "success" : s.risk === "Medium" ? "info" : "warning"}>
                  {s.risk} Risk
                </Pill>
                <Pill size="sm" active>{s.apy}</Pill>
              </Row>
            }>
              {s.name}
            </CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">{s.description}</Text>
                <Text size="small" weight="semibold" tone="secondary">Steps:</Text>
                <Text size="small" tone="secondary">{s.steps}</Text>
                <Text size="small" italic>Example: {s.exampleWallet} ({s.exampleSize})</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Divider />

      <H2>Why Are They Doing It?</H2>
      <Stack gap={8}>
        <Row gap={8} align="start">
          <Pill size="sm" tone="success" active>1</Pill>
          <Text>BNB holders want yield without selling. slisBNB (4.5–7% APY) lets them earn staking rewards while keeping BNB exposure and DeFi liquidity.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="info" active>2</Pill>
          <Text>Stablecoin holders seek safe yield. Moolah vaults (2.11–3.66% APY) offer Morpho Blue-secured lending returns with instant withdrawals.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="warning" active>3</Pill>
          <Text>DeFi power users leverage their BNB. The slisBNB loop (stake → collateralize → borrow → restake) amplifies yield from 4.5% to 8–15%+.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" active>4</Pill>
          <Text>Institutions and exchanges deploy idle reserves. The $500M whale earns ~$5.8M/yr from BNB lending + USD1 supply. The $1.58B wallet deploys $49M to Lista vaults.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="renamed" active>5</Pill>
          <Text>CDP users access dollar liquidity without selling BNB. Borrow lisUSD against slisBNB, farm the lisUSD in LP pools, and earn multiple yield layers.</Text>
        </Row>
      </Stack>
    </Stack>
  );
}

function YieldsTab() {
  return (
    <Stack gap={20}>
      <H2>APY Comparison Across Yield Strategies</H2>

      <BarChart
        categories={[
          "slisBNB Staking",
          "Moolah USDT",
          "Pendle PT-slisBNBx",
          "Moolah BNB/USD1",
          "lisUSD Stake",
          "CDP + LP Farm",
          "slisBNB Loop",
        ]}
        series={[
          { name: "Min APY %", data: [4.5, 3.66, 3.06, 2.11, 1.16, 5, 8] },
          { name: "Max APY %", data: [7.0, 3.66, 3.06, 2.11, 1.16, 15, 15] },
        ]}
        height={300}
        valueSuffix="%"
      />

      <H2>Risk vs Return Matrix</H2>
      <Table
        headers={["Strategy", "APY Range", "Risk Level", "Capital Required", "Complexity", "Liquidation Risk"]}
        rows={[
          ["slisBNB Staking", "4.5–7.0%", "Low", "Any", "Simple", "None"],
          ["Moolah BNB Supply", "2.11%", "Low", "Any", "Simple", "None"],
          ["Moolah USD1 Supply", "2.11%", "Very Low", "Any", "Simple", "None"],
          ["Moolah USDT Supply", "3.66%", "Very Low", "Any", "Simple", "None"],
          ["Pendle PT Fixed Yield", "3.06%", "Low", "$1K+", "Medium", "None"],
          ["lisUSD Staking", "1.16%", "Low", "lisUSD", "Simple", "None"],
          ["CDP + lisUSD Farming", "5–15%+", "Medium", "$5K+", "Complex", "Yes"],
          ["slisBNB Leverage Loop", "8–15%+", "High", "$10K+", "Advanced", "Yes"],
          ["Multi-protocol Diversification", "3–5%", "Low-Med", "$50K+", "Medium", "None"],
        ]}
        columnAlign={["left", "center", "center", "center", "center", "center"]}
        rowTone={[
          "success", "success", "success", "success", "success", "success", "warning", "danger", "info",
        ]}
        striped
      />

      <Divider />

      <H2>Key Findings</H2>
      <Stack gap={8}>
        <Row gap={8} align="start">
          <Pill size="sm" tone="success" active>1</Pill>
          <Text>The dominant strategy is simple BNB staking via slisBNB. The two largest non-institutional wallets ($14.2M and $10.9M) do nothing else — just stake and hold.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="info" active>2</Pill>
          <Text>Institutional money gravitates to BNB lending (2.11%). A $500M wallet has $156M in the BNB vault + $119M in USD1. Safe, predictable, large-capacity.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="warning" active>3</Pill>
          <Text>The slisBNB leverage loop is real: Moolah holds 149,581 slisBNB ($96M) as collateral. Users borrow BNB against slisBNB to amplify staking yield from 4.5% to 8–15%.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" active>4</Pill>
          <Text>lisUSD is under-utilized as a yield tool. Most lisUSD sits idle ($12.3M held without deployment). The smart play is CDP → lisUSD → LP farming, but few do it.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="renamed" active>5</Pill>
          <Text>Pendle extends Lista's reach. slisBNBx-Jun26 is Pendle BSC's flagship market ($8.3M TVL), where users lock in fixed 3.06% yield on slisBNB — capital-certain returns.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" active>6</Pill>
          <Text>Exchange/custodian wallets ($1.58B, $1.27B) deploy a tiny fraction to Lista vaults for Treasury yield — a signal that Lista's lending infrastructure is trusted by large players.</Text>
        </Row>
      </Stack>

      <Divider />
      <H3>Dune Queries</H3>
      <Table
        headers={["Query ID", "Purpose"]}
        rows={[
          ["7334391", "Top 25 slisBNB holders by transfer balance"],
          ["7334392", "Top 25 lisUSD holders by transfer balance"],
          ["7334394", "Top 25 Moolah BNB Vault depositors"],
          ["7334395", "Top 25 LISTA token holders"],
        ]}
        striped
      />
    </Stack>
  );
}
