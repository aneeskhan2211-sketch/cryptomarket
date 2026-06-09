import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ReportPrefsInput {
    roundingDecimals: bigint;
    defaultChartDays: bigint;
}
export type ApiResult_1 = {
    __kind__: "ok";
    ok: GlobalResponse;
} | {
    __kind__: "err";
    err: string;
};
export interface NewsItem {
    url: string;
    title: string;
    source: string;
    publishedAt: bigint;
}
export interface Transaction {
    id: string;
    transactionType: TransactionType;
    coinSymbol: string;
    pricePerCoin: number;
    notes?: string;
    timestamp: Timestamp;
    coinName: string;
    coinId: string;
    amount: number;
}
export interface MarketResponse {
    page: bigint;
    coins: Array<Coin>;
    perPage: bigint;
    updatedAt: bigint;
}
export interface TradeOrder {
    id: string;
    status: OrderStatus;
    coinSymbol: string;
    coinQuantity: number;
    orderType: OrderType;
    priceAtExecution: number;
    timestamp: bigint;
    fiatAmount: number;
    stripePaymentIntentId?: string;
    coinId: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Candle {
    low: number;
    high: number;
    close: number;
    open: number;
    timestamp: bigint;
}
export interface SettingsInput {
    theme: string;
    colorblind: boolean;
    language: string;
    currency: string;
}
export interface ChartData {
    days: bigint;
    kind: ChartKind;
    line: Array<LinePoint>;
    candles: Array<Candle>;
    updatedAt: bigint;
    coinId: string;
}
export interface GlobalStats {
    btcDominance: number;
    totalMarketCap: number;
    activeCryptocurrencies: bigint;
    marketCapChangePercentage24h: number;
    totalVolume24h: number;
    markets: bigint;
    ethDominance: number;
}
export interface TransactionInput {
    id: string;
    transactionType: TransactionType;
    coinSymbol: string;
    pricePerCoin: number;
    notes?: string;
    timestamp: Timestamp;
    coinName: string;
    coinId: string;
    amount: number;
}
export interface LinePoint {
    timestamp: bigint;
    price: number;
}
export interface Coin {
    id: string;
    ath: number;
    athChangePercentage: number;
    currentPrice: number;
    totalVolume: number;
    circulatingSupply: number;
    marketCap: number;
    name: string;
    priceChangePercentage24h: number;
    priceChangePercentage1h: number;
    priceChangePercentage7d: number;
    low24h: number;
    totalSupply: number;
    high24h: number;
    sparkline7d: SparklineData;
    image: string;
    marketCapRank: bigint;
    symbol: string;
}
export type ApiResult_3 = {
    __kind__: "ok";
    ok: ChartData;
} | {
    __kind__: "err";
    err: string;
};
export type ApiResult = {
    __kind__: "ok";
    ok: MarketResponse;
} | {
    __kind__: "err";
    err: string;
};
export type ApiResult_2 = {
    __kind__: "ok";
    ok: Array<NewsItem>;
} | {
    __kind__: "err";
    err: string;
};
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface GlobalResponse {
    updatedAt: bigint;
    stats: GlobalStats;
}
export type UserId = Principal;
export interface PriceAlert {
    id: string;
    direction: Variant_above_below;
    createdAt: bigint;
    targetPrice: number;
    coinName: string;
    coinId: string;
    triggered: boolean;
}
export interface UserSettings {
    theme: string;
    colorblind: boolean;
    language: string;
    reportPrefs: ReportPrefs;
    currency: string;
}
export type SparklineData = Array<number>;
export interface ProfileInput {
    username: string;
    displayName: string;
    profilePictureUrl?: string;
}
export interface UserProfile {
    id: UserId;
    username: string;
    displayName: string;
    createdAt: Timestamp;
    settings?: UserSettings;
    profilePictureUrl?: string;
}
export interface ReportPrefs {
    roundingDecimals: bigint;
    defaultChartDays: bigint;
}
export enum ChartKind {
    line = "line",
    candle = "candle"
}
export enum OrderStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum OrderType {
    buy = "buy",
    sell = "sell"
}
export enum Variant_above_below {
    above = "above",
    below = "below"
}
export interface backendInterface {
    addTradeOrder(order: TradeOrder): Promise<void>;
    cancelTradeOrder(orderId: string): Promise<void>;
    completeTradeOrder(orderId: string): Promise<void>;
    deletePriceAlert(alertId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCoinChart(coinId: string, days: bigint, kind: ChartKind): Promise<ApiResult_3>;
    getCoinNews(coinId: string): Promise<ApiResult_2>;
    getGlobalStats(): Promise<ApiResult_1>;
    getMarketData(): Promise<ApiResult>;
    getMarketDataPage(page: bigint, perPage: bigint): Promise<ApiResult>;
    getPortfolioTransactions(): Promise<Array<Transaction>>;
    getPriceAlerts(): Promise<Array<PriceAlert>>;
    getTradeOrders(): Promise<Array<TradeOrder>>;
    getUserProfile(): Promise<UserProfile | null>;
    getUserSettings(): Promise<UserSettings | null>;
    getWatchlist(): Promise<Array<string>>;
    setPortfolioTransactions(txs: Array<TransactionInput>): Promise<void>;
    setPriceAlert(alert: PriceAlert): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setWatchlist(coinIds: Array<string>): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updatePriceAlert(alertId: string, triggered: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateReportPrefs(input: ReportPrefsInput): Promise<UserSettings>;
    updateUserProfile(input: ProfileInput): Promise<UserProfile>;
    updateUserSettings(input: SettingsInput): Promise<UserSettings>;
}
