import { ChartKind, OrderStatus, OrderType, Variant_above_below } from "../backend";
import type { backendInterface } from "../backend";

const mockCoin = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
  currentPrice: 67432.5,
  marketCap: 1327000000000,
  marketCapRank: BigInt(1),
  totalVolume: 28400000000,
  priceChangePercentage24h: 2.34,
  priceChangePercentage1h: 0.12,
  priceChangePercentage7d: 5.67,
  high24h: 68100,
  low24h: 65900,
  circulatingSupply: 19700000,
  totalSupply: 21000000,
  ath: 73750,
  athChangePercentage: -8.5,
  sparkline7d: [60000, 62000, 63500, 64000, 65500, 66800, 67432],
};

const mockCoin2 = {
  id: "ethereum",
  name: "Ethereum",
  symbol: "eth",
  image: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
  currentPrice: 3812.4,
  marketCap: 458000000000,
  marketCapRank: BigInt(2),
  totalVolume: 14200000000,
  priceChangePercentage24h: -0.87,
  priceChangePercentage1h: 0.05,
  priceChangePercentage7d: 3.21,
  high24h: 3900,
  low24h: 3750,
  circulatingSupply: 120000000,
  totalSupply: 120000000,
  ath: 4878,
  athChangePercentage: -21.8,
  sparkline7d: [3600, 3650, 3700, 3720, 3760, 3800, 3812],
};

const mockTransaction = {
  id: "tx-001",
  transactionType: "buy" as any,
  coinSymbol: "BTC",
  coinName: "Bitcoin",
  coinId: "bitcoin",
  amount: 0.05,
  pricePerCoin: 67000,
  timestamp: BigInt(Date.now() * 1_000_000 - 86400000 * 1_000_000),
  notes: "Erstkauf",
};

const mockTransaction2 = {
  id: "tx-002",
  transactionType: "sell" as any,
  coinSymbol: "ETH",
  coinName: "Ethereum",
  coinId: "ethereum",
  amount: 1.5,
  pricePerCoin: 3800,
  timestamp: BigInt(Date.now() * 1_000_000 - 43200000 * 1_000_000),
  notes: "",
};

const mockTradeOrder = {
  id: "order-001",
  status: OrderStatus.pending,
  coinSymbol: "BTC",
  coinId: "bitcoin",
  coinQuantity: 0.01,
  orderType: OrderType.buy,
  priceAtExecution: 67432.5,
  fiatAmount: 674.33,
  timestamp: BigInt(Date.now() * 1_000_000),
};

const mockSettings = {
  theme: "dark",
  colorblind: false,
  language: "de",
  currency: "EUR",
  reportPrefs: {
    roundingDecimals: BigInt(2),
    defaultChartDays: BigInt(7),
  },
};

const mockProfile = {
  id: { toText: () => "user-principal" } as any,
  username: "kryptouser",
  displayName: "Krypto Nutzer",
  createdAt: BigInt(Date.now() * 1_000_000 - 86400000 * 30 * 1_000_000),
};

export const mockBackend: backendInterface = {
  getMarketData: async () => ({
    __kind__: "ok",
    ok: {
      page: BigInt(1),
      perPage: BigInt(100),
      updatedAt: BigInt(Date.now() * 1_000_000),
      coins: Array.from({ length: 20 }, (_, i) => ({
        ...mockCoin,
        id: `coin-${i}`,
        name: i % 2 === 0 ? "Bitcoin" : "Ethereum",
        symbol: i % 2 === 0 ? "btc" : "eth",
        marketCapRank: BigInt(i + 1),
        currentPrice: i % 2 === 0 ? 67432.5 - i * 10 : 3812.4 - i * 5,
      })),
    },
  }),

  getMarketDataPage: async (page: bigint, perPage: bigint) => ({
    __kind__: "ok",
    ok: {
      page,
      perPage,
      updatedAt: BigInt(Date.now() * 1_000_000),
      coins: [mockCoin, mockCoin2],
    },
  }),

  getGlobalStats: async () => ({
    __kind__: "ok",
    ok: {
      updatedAt: BigInt(Date.now() * 1_000_000),
      stats: {
        btcDominance: 52.3,
        ethDominance: 17.8,
        totalMarketCap: 2420000000000,
        totalVolume24h: 98700000000,
        activeCryptocurrencies: BigInt(12500),
        markets: BigInt(730),
        marketCapChangePercentage24h: 1.45,
      },
    },
  }),

  getCoinChart: async (coinId: string, days: bigint, kind: ChartKind) => ({
    __kind__: "ok",
    ok: {
      coinId,
      days,
      kind,
      updatedAt: BigInt(Date.now() * 1_000_000),
      line: Array.from({ length: 30 }, (_, i) => ({
        timestamp: BigInt(Date.now() * 1_000_000 - (29 - i) * 86400000 * 1_000_000),
        price: 65000 + Math.sin(i * 0.3) * 3000 + i * 100,
      })),
      candles: Array.from({ length: 14 }, (_, i) => ({
        timestamp: BigInt(Date.now() * 1_000_000 - (13 - i) * 86400000 * 1_000_000),
        open: 66000 + i * 100,
        close: 66200 + i * 100,
        high: 67000 + i * 100,
        low: 65500 + i * 100,
      })),
    },
  }),

  getPortfolioTransactions: async () => [mockTransaction, mockTransaction2],

  setPortfolioTransactions: async () => undefined,

  getTradeOrders: async () => [mockTradeOrder],

  addTradeOrder: async () => undefined,

  cancelTradeOrder: async () => undefined,

  completeTradeOrder: async () => undefined,

  getUserSettings: async () => mockSettings,

  updateUserSettings: async (input) => ({ ...mockSettings, ...input }),

  updateReportPrefs: async (input) => ({
    ...mockSettings,
    reportPrefs: {
      roundingDecimals: input.roundingDecimals,
      defaultChartDays: input.defaultChartDays,
    },
  }),

  getUserProfile: async () => mockProfile,

  updateUserProfile: async (input) => ({ ...mockProfile, ...input }),

  getWatchlist: async () => ["bitcoin", "ethereum"],

  setWatchlist: async () => undefined,

  getPriceAlerts: async () => [
    {
      id: "alert-001",
      coinId: "bitcoin",
      coinName: "Bitcoin",
      targetPrice: 70000,
      direction: Variant_above_below.above,
      triggered: false,
      createdAt: BigInt(Date.now() * 1_000_000 - 86400000 * 1_000_000),
    },
  ],

  setPriceAlert: async (_alert) => ({ __kind__: "ok", ok: null }),

  updatePriceAlert: async (_alertId, _triggered) => ({ __kind__: "ok", ok: null }),

  deletePriceAlert: async (_alertId) => ({ __kind__: "ok", ok: null }),

  getCoinNews: async (_coinId: string) => ({
    __kind__: "ok" as const,
    ok: [
      {
        title: "Bitcoin Price Analysis",
        source: "CoinDesk",
        url: "https://coindesk.com",
        publishedAt: BigInt(Math.floor(Date.now() / 1000)),
      },
    ],
  }),

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};
