import {
  BarChart,
  Button,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  PieChart,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type MarketInfo = {
  name: string;
  underlying: string;
  tvl: number;
  status: "Active" | "Expired";
  expiry: string;
  category: string;
  market: string;
  pt: string;
  yt: string;
  sy: string;
  lp: string;
};

const TOP_MARKETS: MarketInfo[] = [
  {
    name: "slisBNBx-Jun26",
    underlying: "slisBNBx (Lista Staked BNB)",
    tvl: 8_300_000,
    status: "Active",
    expiry: "2026-06-25",
    category: "BNB LST",
    market: "0x13d390d540e2700a5e94ab3a442d39fce6de3de3",
    pt: "0xe052823b4aefc6e230faf46231a57d0905e30ae0",
    yt: "0xc08e81a01cfdcf0e68ebc0441c9bb8cce36aa25c",
    sy: "0x4667b26ec7c812feff2d158e24be26b2e5316a05",
    lp: "0x3c1a3d6b69a866444fe506f7d38a00a1c2d859c5",
  },
  {
    name: "uniBTC-Jun26",
    underlying: "uniBTC (Bedrock Bitcoin)",
    tvl: 6_700_000,
    status: "Active",
    expiry: "2026-06-25",
    category: "BTC",
    market: "0xf1d7b4e4e3a76b7e78c4c3be7c5d1d7c1d7c1d7c",
    pt: "0x0af2b242a526447fefd6e29cd531ecb89616afd2",
    yt: "0xb36863b33d021fbbc88e81bd9d372e4ebbb38d2a",
    sy: "0x7d3e52b094e40dbc8920f27edb0d24f4dc3cc0c1",
    lp: "0x21558067e3ed5d3cdbe2dd3662bd9035a8e3315a",
  },
  {
    name: "sigmaSP-Sep25",
    underlying: "sigmaSP (Sigma Finance)",
    tvl: 5_600_000,
    status: "Active",
    expiry: "2025-09-25",
    category: "Yield",
    market: "0xa3f1e13c3aa1f3cbb155de7fbb4f0a5024054703",
    pt: "0xd76ec0a96eaffe1cca33313352deda1cd3cfa7ee",
    yt: "0x365e24398c0c0f03ab1c5423d3e665ede408198d",
    sy: "0x7089d00ed10fe5e8ce5f1a1e71478ea85a7ad9ca",
    lp: "0xa3f1e13c3aa1f3cbb155de7fbb4f0a5024054703",
  },
  {
    name: "slisBNBx-Oct25",
    underlying: "slisBNBx (Lista Staked BNB)",
    tvl: 4_900_000,
    status: "Active",
    expiry: "2025-10-30",
    category: "BNB LST",
    market: "0xd3d1b37d8e2fadc72f18db61f659e8debc4ff57e",
    pt: "0xb84cec1ab2af11b530ae0d8594b1493556be49cd",
    yt: "0xbe436f6ed7ff7f747aae1912f88c59549df82158",
    sy: "0x4667b26ec7c812feff2d158e24be26b2e5316a05",
    lp: "0xbd577ddabb5a1672d3c786726b87a175de652b96",
  },
  {
    name: "satUSD+-Mar26",
    underlying: "satUSD+ (Solv/Lista stable)",
    tvl: 42_000_000,
    status: "Expired",
    expiry: "2026-03-26",
    category: "Stablecoin",
    market: "0xbad43138c9bf4f546c1d326f30963084a1e40c2e",
    pt: "0x6e3e626f8741cd0e48ba1367b35be5622b426ea0",
    yt: "0xe38e5316d350c3f149b9b8738bad0cb7ecacd341",
    sy: "0xbed1f8ccb40e0f0e1f54f6fe0dc5b3f73fe82a06",
    lp: "0xbad43138c9bf4f546c1d326f30963084a1e40c2e",
  },
  {
    name: "satUSD+-Dec25",
    underlying: "satUSD+ (Solv/Lista stable)",
    tvl: 33_000_000,
    status: "Expired",
    expiry: "2025-12-25",
    category: "Stablecoin",
    market: "0x6e3e626f8741cd0e48ba1367b35be5622b426ea0",
    pt: "0x31e88bf4ac49eef6711756d141f1a63e78f9f665",
    yt: "0x8023e1196e8988a9eb9b0f45cd4fce40307b41c8",
    sy: "0xbed1f8ccb40e0f0e1f54f6fe0dc5b3f73fe82a06",
    lp: "0xdb69ed950cbe21baaec158506c090f6d945a163a",
  },
  {
    name: "USDe-Oct25",
    underlying: "USDe (Ethena)",
    tvl: 30_000_000,
    status: "Expired",
    expiry: "2025-10-30",
    category: "Stablecoin",
    market: "0xb5b56637810e4d090894785993f4cdd6875d927e",
    pt: "0x607c834cfb7fcbbb341cbe23f77a6e83bcf3f55c",
    yt: "0x35c4668db919ded034f047526765544a92a4da09",
    sy: "0x2a35c7ef3c74d3d6ea49e07fc182b7db14441bf1",
    lp: "0xb5b56637810e4d090894785993f4cdd6875d927e",
  },
  {
    name: "SolvBTC.BNB-Dec25",
    underlying: "SolvBTC.BNB (Solv Protocol)",
    tvl: 28_000_000,
    status: "Expired",
    expiry: "2025-12-18",
    category: "BTC",
    market: "0x527be6fa23ff71e3faf5c2c1511b0531b67a701d",
    pt: "0xee61a49a180cd23c3e629c5a70c1ee6539c004bd",
    yt: "0xa23e43ff30b6bb9972a6c6617a9aebad34adca3f",
    sy: "0x3c9d8e66e19ef7bcb92e4832baf0cc93a84e37b4",
    lp: "0x527be6fa23ff71e3faf5c2c1511b0531b67a701d",
  },
  {
    name: "uniBTC-Dec25",
    underlying: "uniBTC (Bedrock Bitcoin)",
    tvl: 17_000_000,
    status: "Expired",
    expiry: "2025-12-18",
    category: "BTC",
    market: "0xd5cee155593f7a5da4db3181e8af6a37e73f6c8f",
    pt: "0xd5cee155593f7a5da4db3181e8af6a37e73f6c8f",
    yt: "0x435cf5ca8394e553e56d5bb334a5cd14243b6dcc",
    sy: "0x7d3e52b094e40dbc8920f27edb0d24f4dc3cc0c1",
    lp: "0xd5cee155593f7a5da4db3181e8af6a37e73f6c8f",
  },
  {
    name: "ynBNBx-Oct25",
    underlying: "ynBNBx (YieldNest BNB)",
    tvl: 2_500_000,
    status: "Expired",
    expiry: "2025-10-30",
    category: "BNB LST",
    market: "0x7608eb2fc533343556e443511a2747f605e49c9b",
    pt: "0x50956c8e46a4f7dfc7475e3957c162d29b39f75f",
    yt: "0x6a665855c2b98c8ab71a58e4b97cd3653ee591db",
    sy: "0x7608eb2fc533343556e443511a2747f605e49c9b",
    lp: "0x7608eb2fc533343556e443511a2747f605e49c9b",
  },
];

type HolderRow = {
  market: string;
  rank: number;
  wallet: string;
  balance: number;
  label?: string;
};

const PT_HOLDERS: HolderRow[] = [
  { market: "slisBNBx-Jun26", rank: 1, wallet: "0x3c1a3d6b69a866444fe506f7d38a00a1c2d859c5", balance: 1178.53, label: "LP Contract" },
  { market: "slisBNBx-Jun26", rank: 2, wallet: "0x6d3bd68e90b42615cb5abf4b8de92b154adc435e", balance: 665.87, label: "Pure Fixed Yield ($424K)" },
  { market: "slisBNBx-Jun26", rank: 3, wallet: "0x3b7e10ffe65c5a59475055d489f71699f7dabff4", balance: 516.29 },
  { market: "slisBNBx-Jun26", rank: 4, wallet: "0x813a3005b071791b98292c74cc0700239c52db25", balance: 437.41 },
  { market: "slisBNBx-Jun26", rank: 5, wallet: "0xa4479e6367b3d582bf08bd06de87cf40c5a33b45", balance: 225.46 },
  { market: "slisBNBx-Oct25", rank: 1, wallet: "0xbd577ddabb5a1672d3c786726b87a175de652b96", balance: 723.61, label: "LP Contract" },
  { market: "slisBNBx-Oct25", rank: 2, wallet: "0x8ca23dea974781c94d961950230fb1ffdb61bb60", balance: 564.91, label: "PT+LP Combo ($924K)" },
  { market: "slisBNBx-Oct25", rank: 3, wallet: "0x94dc0b13e66aba9450b3cc44c2643bbb4c264bc7", balance: 120.83 },
  { market: "satUSD+-Mar26", rank: 1, wallet: "0xbad43138c9bf4f546c1d326f30963084a1e40c2e", balance: 1094955.83, label: "Market Contract" },
  { market: "satUSD+-Mar26", rank: 2, wallet: "0x55e13f6b52ef84911783183e4746f41541707400", balance: 1708.60 },
  { market: "sigmaSP-Sep25", rank: 1, wallet: "0x902e83a73fbf0c6b41aca0ea017a5f81d2ea0a3d", balance: 678.02 },
  { market: "sigmaSP-Sep25", rank: 2, wallet: "0x2b91e41468e78c94b08f45b701e13d81472f7eae", balance: 51.47 },
];

const YT_HOLDERS: HolderRow[] = [
  { market: "slisBNBx-Jun26", rank: 1, wallet: "0x04cf1309ed163ceaf8ceded40b5f8429748a1882", balance: 883.64, label: "BTC Whale ($28.2M)" },
  { market: "slisBNBx-Jun26", rank: 2, wallet: "0x4ee6e07d4775ec73fa0a3469fc48351bc739c055", balance: 281.53 },
  { market: "slisBNBx-Jun26", rank: 3, wallet: "0xe985faf7d368bbdd5d7b72bc3bf181977a2a3a43", balance: 270.10 },
  { market: "slisBNBx-Jun26", rank: 4, wallet: "0xe35bbe6af8cb3e47e825c5861c70126d9f5d72ab", balance: 242.87 },
  { market: "slisBNBx-Jun26", rank: 5, wallet: "0x38474fab5fbcc6338ae741f4aedd6a9f568859ee", balance: 229.11 },
  { market: "satUSD+-Dec25", rank: 1, wallet: "0xb71f5229ce8366b72d988447fb491e87ec712ca1", balance: 7692738.29, label: "satUSD Specialist ($15.7M)" },
  { market: "satUSD+-Dec25", rank: 2, wallet: "0xfdb4e1192284bfc94e55b5934a97b67337a92aa6", balance: 4829878.74 },
  { market: "satUSD+-Dec25", rank: 3, wallet: "0x2427aa36eed4468aa5cb15fd0beb8d8fb7c1ec05", balance: 3633834.90 },
  { market: "satUSD+-Dec25", rank: 4, wallet: "0xb08337aa8667e8cb0d9ff7d9003cee15924bbf77", balance: 3552677.00 },
  { market: "satUSD+-Dec25", rank: 5, wallet: "0xc34ae1a39662415a4720d4a3e7c2be0e202568c2", balance: 2969233.64, label: "Serial YT Speculator" },
  { market: "sigmaSP-Sep25", rank: 1, wallet: "0x4b480afbd32a5af07aaeebffc4a133075921cc73", balance: 1200531.04 },
  { market: "sigmaSP-Sep25", rank: 2, wallet: "0x192d4064ec4645d1a3ea86f6f6beed237f102173", balance: 775432.84 },
  { market: "sigmaSP-Sep25", rank: 3, wallet: "0x58c0c064a89138bf3216c20f4e4827ec0fe78e87", balance: 707989.13 },
  { market: "USDe-Oct25", rank: 1, wallet: "0xcd812016b15e1937e281b7b7b1f1654e54cc0818", balance: 15634101.39, label: "Expired position ($2.8K total)" },
  { market: "USDe-Oct25", rank: 2, wallet: "0xbbacb7f97ba96aa90e5603cfb47eae09517c8731", balance: 13381974.94 },
  { market: "USDe-Oct25", rank: 3, wallet: "0x7fa9ae25d2666f142d2e974a0ba537056be18e9a", balance: 11697886.18 },
  { market: "SolvBTC.BNB-Dec25", rank: 1, wallet: "0xc34ae1a39662415a4720d4a3e7c2be0e202568c2", balance: 215.71, label: "Serial YT Speculator" },
  { market: "SolvBTC.BNB-Dec25", rank: 2, wallet: "0x6cdba804a5876cdf4e0915098478fa70716a5baf", balance: 89.33 },
];

const LP_HOLDERS: HolderRow[] = [
  { market: "slisBNBx-Jun26", rank: 1, wallet: "0x782d9d67feaa4d1cdf8222d9053c8cba1c3b7982", balance: 1386.57, label: "Pro LP ($2.18M, 14 Pendle positions)" },
  { market: "slisBNBx-Jun26", rank: 2, wallet: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3", balance: 625.47, label: "Multi-chain LP ($17.6M)" },
  { market: "slisBNBx-Jun26", rank: 3, wallet: "0x43ea46f06e272c4e64dc153f41f8cb53e795b670", balance: 588.71 },
  { market: "slisBNBx-Jun26", rank: 4, wallet: "0x38e481367e0c50f4166ad2a1c9fde0e3c662cfba", balance: 332.35 },
  { market: "slisBNBx-Jun26", rank: 5, wallet: "0xf96057afa49da4c42eb9307ee1c30023ff872700", balance: 225.69 },
  { market: "satUSD+-Mar26", rank: 1, wallet: "0xb71f5229ce8366b72d988447fb491e87ec712ca1", balance: 397152.23, label: "satUSD Specialist ($15.7M)" },
  { market: "satUSD+-Mar26", rank: 2, wallet: "0x2acfb3f0255793c29a9aab335e5d77d0261b886b", balance: 18400.48 },
  { market: "satUSD+-Mar26", rank: 3, wallet: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3", balance: 812.02, label: "Multi-chain LP ($17.6M)" },
  { market: "USDe-Oct25", rank: 1, wallet: "0x82d92a455468bf2a2275062e85bac04e4e2c550c", balance: 44499.82, label: "USDe LP Specialist ($98K)" },
  { market: "USDe-Oct25", rank: 2, wallet: "0xacf870b63d6a1dc4ce1e389272d43eea8503a96a", balance: 92.83 },
  { market: "SolvBTC.BNB-Dec25", rank: 1, wallet: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3", balance: 0.0162, label: "Multi-chain LP ($17.6M)" },
  { market: "SolvBTC.BNB-Dec25", rank: 2, wallet: "0x3c4a786e63b5f6575b773090cb7b2739e78f3640", balance: 0.0126 },
];

type WalletProfile = {
  address: string;
  totalUsd: number;
  tag: string;
  strategy: string;
  protocols: string;
  marketsActive: number;
  tokenTypes: string;
  keyPosition: string;
};

const WALLET_PROFILES: WalletProfile[] = [
  {
    address: "0x04cf1309ed163ceaf8ceded40b5f8429748a1882",
    totalUsd: 28_256_181,
    tag: "BTC Whale",
    strategy: "YT Speculation",
    protocols: "Lista DAO ($24.2M), Venus ($3.9M), Pendle ($4K YT)",
    marketsActive: 1,
    tokenTypes: "YT",
    keyPosition: "#1 YT-slisBNBx-Jun26 (883.6 YT)",
  },
  {
    address: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3",
    totalUsd: 17_601_538,
    tag: "Institutional LP",
    strategy: "Multi-chain LP",
    protocols: "Pendle ($972K across 21 positions on multiple chains)",
    marketsActive: 4,
    tokenTypes: "LP",
    keyPosition: "#2 LP-slisBNBx-Jun26, LP in 4 BSC markets",
  },
  {
    address: "0xb71f5229ce8366b72d988447fb491e87ec712ca1",
    totalUsd: 15_739_468,
    tag: "satUSD Specialist",
    strategy: "LP + YT Combo",
    protocols: "Pendle ($1.08M LP), Segment Finance ($50K), Term Finance ($100K)",
    marketsActive: 2,
    tokenTypes: "LP, YT",
    keyPosition: "#1 LP-satUSD+-Mar26 (397K LP), #1 YT-satUSD+-Dec25 (7.7M YT)",
  },
  {
    address: "0x782d9d67feaa4d1cdf8222d9053c8cba1c3b7982",
    totalUsd: 2_180_015,
    tag: "Pendle LP Pro",
    strategy: "Professional LP",
    protocols: "Pendle ($2.18M, 14 positions across chains)",
    marketsActive: 4,
    tokenTypes: "LP",
    keyPosition: "#1 LP-slisBNBx-Jun26 (1,386 LP), $2.1M slisBNBx-Jun26 LP",
  },
  {
    address: "0xbad43138c9bf4f546c1d326f30963084a1e40c2e",
    totalUsd: 1_137_549,
    tag: "Fixed Yield Maximizer",
    strategy: "Fixed Yield (PT)",
    protocols: "Pendle only ($1.14M, 2 positions)",
    marketsActive: 1,
    tokenTypes: "PT",
    keyPosition: "#1 PT-satUSD+-Mar26 (1.09M PT = $1.09M fixed yield)",
  },
  {
    address: "0x8ca23dea974781c94d961950230fb1ffdb61bb60",
    totalUsd: 924_328,
    tag: "PT+LP Compounder",
    strategy: "PT + LP Combo",
    protocols: "Pendle ($924K), PancakeSwap ($215 meme positions)",
    marketsActive: 1,
    tokenTypes: "PT, LP",
    keyPosition: "#2 PT-slisBNBx-Oct25 (565 PT) + #1 LP-slisBNBx-Oct25 (432 LP)",
  },
  {
    address: "0x6d3bd68e90b42615cb5abf4b8de92b154adc435e",
    totalUsd: 424_357,
    tag: "Pure Fixed Yield",
    strategy: "Fixed Yield (PT)",
    protocols: "Pendle only ($424K, single position)",
    marketsActive: 1,
    tokenTypes: "PT",
    keyPosition: "#2 PT-slisBNBx-Jun26 (665.9 PT-clisBNB)",
  },
  {
    address: "0x82d92a455468bf2a2275062e85bac04e4e2c550c",
    totalUsd: 98_477,
    tag: "USDe LP Specialist",
    strategy: "LP (Stablecoin)",
    protocols: "Pendle only ($98K, single LP position)",
    marketsActive: 1,
    tokenTypes: "LP",
    keyPosition: "#1 LP-USDe-Oct25 (44,500 LP)",
  },
  {
    address: "0xc34ae1a39662415a4720d4a3e7c2be0e202568c2",
    totalUsd: 71_880,
    tag: "Serial YT Speculator",
    strategy: "YT Speculation",
    protocols: "Pendle ($292 active), River ($6.1K), Venus ($12)",
    marketsActive: 5,
    tokenTypes: "YT",
    keyPosition: "YT across 5 markets (SolvBTC, USDe, satUSD+x2, slisBNBx)",
  },
];

type CrossMarketWallet = {
  wallet: string;
  marketsActive: number;
  tokenTypes: number;
  types: string;
  markets: string;
};

const CROSS_MARKET_TOP: CrossMarketWallet[] = [
  { wallet: "0x888888888889758f76e7103c6cbf23abbf58f946", marketsActive: 8, tokenTypes: 2, types: "PT, YT", markets: "SolvBTC, USDe, satUSD+x2, slisBNBx x2, uniBTCx2" },
  { wallet: "0x28e2ea090877bf75740558f6bfb36a5ffee9e9df", marketsActive: 7, tokenTypes: 2, types: "LP, PT", markets: "SolvBTC, satUSD+x2, slisBNBx x2, uniBTCx2" },
  { wallet: "0x8ccca92b80aecf9e330f9ab883a14bccd216c1a7", marketsActive: 6, tokenTypes: 3, types: "LP, PT, YT", markets: "SolvBTC, USDe, satUSD+, slisBNBx x2, uniBTC" },
  { wallet: "0x22fc5a29bd3d6cce19a06f844019fd506fce4455", marketsActive: 6, tokenTypes: 2, types: "LP, YT", markets: "SolvBTC, USDe, satUSD+, slisBNBx x2, ynBNBx" },
  { wallet: "0xc34ae1a39662415a4720d4a3e7c2be0e202568c2", marketsActive: 5, tokenTypes: 1, types: "YT", markets: "SolvBTC, USDe, satUSD+x2, slisBNBx" },
  { wallet: "0x869191325254a82fbc858ab3cad9bf91703da353", marketsActive: 5, tokenTypes: 1, types: "LP", markets: "SolvBTC, USDe, slisBNBx x2, uniBTC" },
  { wallet: "0x782d9d67feaa4d1cdf8222d9053c8cba1c3b7982", marketsActive: 4, tokenTypes: 1, types: "LP", markets: "SolvBTC, satUSD+, slisBNBx x2" },
  { wallet: "0x64627901dadb46ed7f275fd4fc87d086cff1e6e3", marketsActive: 4, tokenTypes: 1, types: "LP", markets: "SolvBTC, satUSD+, slisBNBx x2" },
];

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtBal(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(2);
}

function addr(s: string): string {
  return `${s.slice(0, 6)}...${s.slice(-4)}`;
}

type ViewTab = "overview" | "holders" | "wallets" | "strategies";

export default function PendleBscResearch() {
  const { tokens: t } = useHostTheme();
  const [tab, setTab] = useCanvasState<ViewTab>("tab", "overview");
  const [holderFilter, setHolderFilter] = useCanvasState<"PT" | "YT" | "LP">("holderFilter", "PT");
  const [selectedMarket, setSelectedMarket] = useCanvasState<string>("selectedMarket", "slisBNBx-Jun26");

  const totalTvl = TOP_MARKETS.reduce((s, m) => s + m.tvl, 0);
  const activeTvl = TOP_MARKETS.filter((m) => m.status === "Active").reduce((s, m) => s + m.tvl, 0);
  const expiredTvl = totalTvl - activeTvl;

  return (
    <Stack gap={20}>
      <H1>Pendle Finance on BSC</H1>
      <Text tone="secondary">
        Comprehensive on-chain analysis of Pendle V2 markets on BNB Chain.
        35 total markets mapped, top 10 by TVL analyzed in depth with holder identification via Dune Analytics and wallet profiling via DeBank.
      </Text>

      <Row gap={8} wrap>
        {(["overview", "holders", "wallets", "strategies"] as ViewTab[]).map((v) => (
          <Pill key={v} active={tab === v} onClick={() => setTab(v)}>
            {v === "overview" ? "Market Overview" : v === "holders" ? "Top Holders" : v === "wallets" ? "Wallet Profiles" : "Strategies"}
          </Pill>
        ))}
      </Row>

      <Divider />

      {tab === "overview" && (
        <OverviewTab
          totalTvl={totalTvl}
          activeTvl={activeTvl}
          expiredTvl={expiredTvl}
          tokens={t}
        />
      )}
      {tab === "holders" && (
        <HoldersTab
          holderFilter={holderFilter}
          setHolderFilter={setHolderFilter}
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
        />
      )}
      {tab === "wallets" && <WalletsTab />}
      {tab === "strategies" && <StrategiesTab tokens={t} />}

      <Divider />
      <Text tone="tertiary" size="small">
        Data sources: Pendle V2 API, Dune Analytics (queries 7334275, 7334281, 7334287, 7334294), DeBank Pro API. Collected April 2026.
      </Text>
    </Stack>
  );
}

function OverviewTab({ totalTvl, activeTvl, expiredTvl, tokens }: { totalTvl: number; activeTvl: number; expiredTvl: number; tokens: any }) {
  return (
    <Stack gap={20}>
      <Grid columns={4} gap={16}>
        <Stat value="35" label="Total Markets" />
        <Stat value={fmt(totalTvl)} label="Total TVL (Top 10)" />
        <Stat value="4" label="Active Markets" tone="success" />
        <Stat value="31" label="Expired Markets" tone="warning" />
      </Grid>

      <Grid columns={2} gap={20}>
        <Stack gap={12}>
          <H2>TVL by Market (Top 10)</H2>
          <BarChart
            categories={TOP_MARKETS.map((m) => m.name)}
            series={[{ name: "TVL ($M)", data: TOP_MARKETS.map((m) => m.tvl / 1_000_000) }]}
            horizontal
            height={300}
            valueSuffix="M"
          />
        </Stack>
        <Stack gap={12}>
          <H2>TVL: Active vs Expired</H2>
          <PieChart
            data={[
              { label: `Active (${fmt(activeTvl)})`, value: activeTvl },
              { label: `Expired (${fmt(expiredTvl)})`, value: expiredTvl },
            ]}
            donut
            size={200}
          />
          <Text tone="secondary" size="small">
            Expired markets dominate TVL because large satUSD+ and SolvBTC positions remain locked past maturity.
          </Text>
        </Stack>
      </Grid>

      <H2>Top 10 Markets by TVL</H2>
      <Table
        headers={["Market", "Underlying", "TVL", "Status", "Expiry", "Category"]}
        rows={TOP_MARKETS.map((m) => [
          m.name,
          m.underlying,
          fmt(m.tvl),
          m.status,
          m.expiry,
          m.category,
        ])}
        columnAlign={["left", "left", "right", "center", "center", "center"]}
        rowTone={TOP_MARKETS.map((m) => (m.status === "Active" ? "success" : undefined))}
        striped
      />

      <H2>Category Breakdown</H2>
      <PieChart
        data={[
          { label: "Stablecoin", value: 105_000_000 },
          { label: "BTC", value: 51_700_000 },
          { label: "BNB LST", value: 15_700_000 },
          { label: "Yield", value: 5_600_000 },
        ]}
        donut
        size={180}
      />

      <Card collapsible defaultOpen={false}>
        <CardHeader trailing={<Pill size="sm" tone="info" active>10 markets</Pill>}>
          Contract Addresses
        </CardHeader>
        <CardBody>
          <Table
            headers={["Market", "PT", "YT", "LP"]}
            rows={TOP_MARKETS.map((m) => [
              m.name,
              m.pt,
              m.yt,
              m.lp,
            ])}
            striped
          />
        </CardBody>
      </Card>
    </Stack>
  );
}

function HoldersTab({
  holderFilter,
  setHolderFilter,
  selectedMarket,
  setSelectedMarket,
}: {
  holderFilter: "PT" | "YT" | "LP";
  setHolderFilter: (v: "PT" | "YT" | "LP") => void;
  selectedMarket: string;
  setSelectedMarket: (v: string) => void;
}) {
  const data = holderFilter === "PT" ? PT_HOLDERS : holderFilter === "YT" ? YT_HOLDERS : LP_HOLDERS;
  const marketsInData = [...new Set(data.map((h) => h.market))];
  const filteredData = data.filter((h) => h.market === selectedMarket);

  return (
    <Stack gap={16}>
      <H2>Token Holders by Market</H2>
      <Text tone="secondary">
        Top holders identified from on-chain transfer balances via Dune Analytics. Select a token type and market to view.
      </Text>

      <Row gap={8}>
        {(["PT", "YT", "LP"] as const).map((f) => (
          <Pill key={f} active={holderFilter === f} onClick={() => {
            setHolderFilter(f);
            const newData = f === "PT" ? PT_HOLDERS : f === "YT" ? YT_HOLDERS : LP_HOLDERS;
            const markets = [...new Set(newData.map((h) => h.market))];
            if (!markets.includes(selectedMarket)) setSelectedMarket(markets[0]);
          }}>
            {f === "PT" ? "Principal Tokens (PT)" : f === "YT" ? "Yield Tokens (YT)" : "LP Tokens"}
          </Pill>
        ))}
      </Row>

      <Row gap={8} wrap>
        {marketsInData.map((m) => (
          <Pill key={m} active={selectedMarket === m} onClick={() => setSelectedMarket(m)} size="sm">
            {m}
          </Pill>
        ))}
      </Row>

      {filteredData.length > 0 ? (
        <Table
          headers={["Rank", "Wallet", "Balance", "Label"]}
          rows={filteredData.map((h) => [
            `#${h.rank}`,
            h.wallet,
            fmtBal(h.balance),
            h.label || "-",
          ])}
          columnAlign={["center", "left", "right", "left"]}
          striped
        />
      ) : (
        <Text tone="tertiary" italic>No data for {holderFilter}-{selectedMarket}. Try another market.</Text>
      )}

      <Divider />

      <H2>Cross-Market Activity</H2>
      <Text tone="secondary">
        Wallets active in 4+ Pendle BSC markets in the last 180 days, ranked by market diversity.
      </Text>
      <Table
        headers={["Wallet", "Markets", "Types", "Token Types", "Markets Active"]}
        rows={CROSS_MARKET_TOP.map((w) => [
          addr(w.wallet),
          String(w.marketsActive),
          String(w.tokenTypes),
          w.types,
          w.markets,
        ])}
        columnAlign={["left", "center", "center", "left", "left"]}
        striped
      />
    </Stack>
  );
}

function WalletsTab() {
  const { tokens: t } = useHostTheme();
  const sorted = [...WALLET_PROFILES].sort((a, b) => b.totalUsd - a.totalUsd);

  return (
    <Stack gap={16}>
      <H2>Key Wallet Profiles</H2>
      <Text tone="secondary">
        Deep profiles of the most significant wallets via DeBank Pro API. Sorted by total portfolio value.
      </Text>

      <Grid columns={4} gap={16}>
        <Stat value="9" label="Wallets Profiled" />
        <Stat value={fmt(sorted[0].totalUsd)} label="Largest Portfolio" />
        <Stat value="4" label="Distinct Strategies" />
        <Stat value="50" label="Cross-Market Wallets" />
      </Grid>

      {sorted.map((w) => (
        <Card key={w.address}>
          <CardHeader trailing={<Pill size="sm" active tone={w.strategy.includes("YT") ? "warning" : w.strategy.includes("LP") ? "info" : "success"}>{w.strategy}</Pill>}>
            {w.tag} — {fmt(w.totalUsd)}
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small" style={{ fontFamily: "monospace" }}>{w.address}</Text>
              <Row gap={16} wrap>
                <Stack gap={2}>
                  <Text tone="secondary" size="small" weight="semibold">Protocols</Text>
                  <Text size="small">{w.protocols}</Text>
                </Stack>
                <Stack gap={2}>
                  <Text tone="secondary" size="small" weight="semibold">Key Position</Text>
                  <Text size="small">{w.keyPosition}</Text>
                </Stack>
              </Row>
              <Row gap={8}>
                <Pill size="sm">{w.marketsActive} market{w.marketsActive > 1 ? "s" : ""}</Pill>
                <Pill size="sm">{w.tokenTypes}</Pill>
              </Row>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
}

function StrategiesTab({ tokens }: { tokens: any }) {
  return (
    <Stack gap={20}>
      <H2>Strategy Classification</H2>
      <Text tone="secondary">
        Four distinct strategies observed among Pendle BSC participants, from conservative fixed yield to aggressive yield speculation.
      </Text>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="success">Low Risk</Pill>}>
            Fixed Yield (PT Holders)
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>Buy PT at discount, hold to maturity for guaranteed fixed yield. Equivalent to buying a zero-coupon bond.</Text>
              <Text weight="semibold" size="small">Key Players:</Text>
              <Text size="small">0x6d3b...435e — $424K single PT-slisBNBx-Jun26 position</Text>
              <Text size="small">0xbad4...40c2 — $1.09M in PT-satUSD+-Mar26 (largest PT position)</Text>
              <Text size="small">0x8ca2...bb60 — 565 PT-slisBNBx-Oct25 + LP combo</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="warning">High Risk</Pill>}>
            Yield Speculation (YT Holders)
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>Buy YT to bet on future yield being higher than implied. Leveraged upside if yield rises, total loss if yield drops to zero.</Text>
              <Text weight="semibold" size="small">Key Players:</Text>
              <Text size="small">0x04cf...a882 — $28M whale, 883 YT-slisBNBx-Jun26 (yield bet on BNB staking)</Text>
              <Text size="small">0xc34a...0818 — Serial speculator across 5 YT markets</Text>
              <Text size="small">0xb71f...ca1 — 7.7M YT-satUSD+-Dec25 (massive stablecoin yield bet)</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="info">Medium Risk</Pill>}>
            Liquidity Provision (LP)
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>Provide PT/underlying liquidity to Pendle AMM pools. Earn swap fees + underlying yield + PENDLE rewards. Exposed to impermanent loss.</Text>
              <Text weight="semibold" size="small">Key Players:</Text>
              <Text size="small">0x782d...7982 — Pro LP, $2.18M across 14 Pendle positions (multi-chain)</Text>
              <Text size="small">0x6462...0de3 — $17.6M institutional, 21 Pendle positions across chains</Text>
              <Text size="small">0xb71f...ca1 — 397K LP-satUSD+-Mar26 ($1.08M single LP position)</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing={<Pill size="sm" active tone="renamed">DeFi Composability</Pill>}>
            PT as Collateral (Looping)
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>Use Pendle PTs as collateral in lending markets like Lista Moolah. Borrow against fixed-yield positions for capital efficiency or leverage.</Text>
              <Text weight="semibold" size="small">Key Finding:</Text>
              <Text size="small">Lista Moolah Controller accepts Pendle PTs, enabling PT holders to borrow against their fixed-yield positions. This DeFi composability is unique to BSC Pendle.</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Divider />

      <H2>Strategy Distribution</H2>
      <BarChart
        categories={["Fixed Yield (PT)", "YT Speculation", "Liquidity Provision", "PT as Collateral"]}
        series={[
          { name: "Identified Wallets", data: [3, 3, 4, 1] },
        ]}
        height={200}
      />

      <Divider />

      <H2>Key Research Findings</H2>
      <Stack gap={8}>
        <Row gap={8} align="start">
          <Pill size="sm" tone="warning" active>1</Pill>
          <Text>Expired markets dominate BSC TVL ($150M+ in expired vs $25M active). Most TVL is locked past maturity in satUSD+ and SolvBTC pools.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="success" active>2</Pill>
          <Text>slisBNBx-Jun26 is the flagship active market ($8.3M TVL) with the most diverse holder base across PT, YT, and LP.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="info" active>3</Pill>
          <Text>Professional LP providers operate multi-chain: the top 2 LP providers ($17.6M and $2.18M) have 14-21 Pendle positions across BSC, Ethereum, and other chains.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" tone="renamed" active>4</Pill>
          <Text>A $28M BTC whale uses Pendle for minor YT speculation alongside massive Lista DAO ($24.2M SolvBTC) and Venus ($3.9M) positions.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" active>5</Pill>
          <Text>Lista Moolah accepts Pendle PTs as collateral, enabling unique DeFi composability: fixed yield + leverage. This is not commonly seen outside BSC.</Text>
        </Row>
        <Row gap={8} align="start">
          <Pill size="sm" active>6</Pill>
          <Text>satUSD+ markets show extreme holder concentration: one wallet holds $1.09M PT (fixed yield) and another holds $1.08M LP + 7.7M YT in the same asset — a combined LP + speculation strategy.</Text>
        </Row>
      </Stack>

      <Divider />

      <H3>Dune Queries Used</H3>
      <Table
        headers={["Query ID", "Purpose"]}
        rows={[
          ["7334275", "Top 10 PT holders per market"],
          ["7334281", "Top 10 YT holders per market"],
          ["7334287", "Top 10 LP holders per market"],
          ["7334294", "Cross-market wallet activity (50 wallets, 2+ markets)"],
        ]}
        striped
      />
    </Stack>
  );
}
