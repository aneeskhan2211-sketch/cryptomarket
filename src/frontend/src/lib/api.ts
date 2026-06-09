import { createActor } from "@/backend";
import type { NewsItem } from "@/types/coin";
import type {
  Candle,
  Coin,
  CoinChart,
  CoinDetail,
  GlobalStats,
  LinePoint,
  ChartKind as LocalChartKind,
} from "@/types/coin";
import type { Transaction as LocalTransaction } from "@/types/portfolio";
import type { ProfileInput, UserProfile } from "@/types/profile";
import type { TradeOrder as LocalTradeOrder } from "@/types/trade";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

/**
 * Shared fetch for all CoinGecko calls. Detects rate limiting (HTTP 429) and
 * throws an error whose message contains "429" so the global react-query retry
 * policy can back off instead of hammering the endpoint. Also applies a request
 * timeout so a stalled request can't leave a chart spinning forever.
 */
async function cgFetch(url: string, timeoutMs = 12_000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (res.status === 429) {
      throw new Error("CoinGecko rate limit (429)");
    }
    if (!res.ok) {
      throw new Error(`CoinGecko error: ${res.status}`);
    }
    return res;
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error("CoinGecko request timed out");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- FX rates (for fiat currency conversion) ----------
//
// All coin prices are fetched in EUR. To display in another fiat currency we
// need EUR->target rates. We get them by asking CoinGecko for the price of one
// reference asset (bitcoin) in every supported fiat at once, then dividing.
//   rate(EUR->X) = priceBTC_in_X / priceBTC_in_EUR
// Crypto denominations don't use this — they divide by the ref coin's EUR price
// taken straight from the market list.

const FIAT_VS = [
  "usd",
  "eur",
  "gbp",
  "jpy",
  "chf",
  "cny",
  "inr",
  "cad",
  "aud",
  "brl",
];

export async function fetchFiatRates(): Promise<Record<string, number>> {
  const url = new URL(`${COINGECKO_API}/simple/price`);
  url.searchParams.set("ids", "bitcoin");
  url.searchParams.set("vs_currencies", FIAT_VS.join(","));
  const res = await cgFetch(url.toString());
  const json: { bitcoin: Record<string, number> } = await res.json();
  const btc = json.bitcoin;
  const eur = btc.eur || 1;
  const rates: Record<string, number> = {};
  for (const code of FIAT_VS) {
    rates[code] = (btc[code] ?? eur) / eur; // EUR -> code
  }
  return rates;
}

// ---------- Backend Transaction <-> local Transaction mapping ----------

export function backendTxToLocal(
  tx: import("@/backend").Transaction,
): LocalTransaction {
  return {
    id: String(tx.id),
    coinId: tx.coinId,
    symbol: tx.coinSymbol,
    kind: "buy" in tx.transactionType ? "buy" : "sell",
    quantity: tx.amount,
    pricePerUnit: tx.pricePerCoin,
    timestamp: Number(tx.timestamp),
    notes: tx.notes ?? undefined,
  };
}

export function localTxToBackend(
  tx: LocalTransaction,
): import("@/backend").TransactionInput {
  return {
    id: tx.id,
    coinId: tx.coinId,
    coinSymbol: tx.symbol,
    coinName: tx.coinId,
    transactionType: tx.kind === "buy" ? { buy: null } : { sell: null },
    amount: tx.quantity,
    pricePerCoin: tx.pricePerUnit,
    timestamp: BigInt(tx.timestamp),
    notes: tx.notes ?? undefined,
  };
}

// ---------- CoinGecko fallback shapes ----------

interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  total_volume?: number;
  high_24h?: number;
  low_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  sparkline_in_7d?: { price: number[] };
}

interface CoinGeckoGlobalResponse {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
  };
}

function mapCoinGeckoCoin(c: CoinGeckoCoin): Coin {
  return {
    id: c.id,
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    image: c.image,
    currentPrice: c.current_price,
    marketCap: c.market_cap,
    marketCapRank: c.market_cap_rank,
    priceChangePercentage1h: c.price_change_percentage_1h_in_currency ?? 0,
    priceChangePercentage24h: c.price_change_percentage_24h ?? 0,
    priceChangePercentage7d: c.price_change_percentage_7d_in_currency ?? 0,
    totalVolume: c.total_volume ?? 0,
    high24h: c.high_24h ?? 0,
    low24h: c.low_24h ?? 0,
    circulatingSupply: c.circulating_supply ?? 0,
    totalSupply: c.total_supply ?? 0,
    ath: c.ath ?? 0,
    athChangePercentage: c.ath_change_percentage ?? 0,
    sparkline7d: c.sparkline_in_7d?.price?.slice(-48) ?? [],
  };
}

export async function fetchCoinGeckoMarket(
  page = 1,
  perPage = 100,
): Promise<Coin[]> {
  const url = new URL(`${COINGECKO_API}/coins/markets`);
  url.searchParams.set("vs_currency", "eur");
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));
  url.searchParams.set("sparkline", "true");
  url.searchParams.set("price_change_percentage", "1h,24h,7d");

  const res = await cgFetch(url.toString());
  const data: CoinGeckoCoin[] = await res.json();
  return data.map(mapCoinGeckoCoin);
}

export async function fetchCoinGeckoGlobal(): Promise<GlobalStats> {
  const res = await cgFetch(`${COINGECKO_API}/global`);
  const json: CoinGeckoGlobalResponse = await res.json();
  const d = json.data;
  return {
    totalMarketCap: d.total_market_cap.eur ?? 0,
    totalVolume24h: d.total_volume.eur ?? 0,
    marketCapChangePercentage24h: d.market_cap_change_percentage_24h_usd ?? 0,
    btcDominance: d.market_cap_percentage.btc ?? 0,
    ethDominance: d.market_cap_percentage.eth ?? 0,
    activeCryptocurrencies: d.active_cryptocurrencies ?? 0,
    markets: d.markets ?? 0,
  };
}

export async function fetchCoinGeckoChartLine(
  coinId: string,
  days: number,
): Promise<LinePoint[]> {
  const url = new URL(`${COINGECKO_API}/coins/${coinId}/market_chart`);
  url.searchParams.set("vs_currency", "eur");
  url.searchParams.set("days", days === 0 ? "max" : String(days));
  const res = await cgFetch(url.toString());
  const json: { prices: [number, number][] } = await res.json();
  return json.prices.map(([t, p]) => ({ timestamp: t, price: p }));
}

export async function fetchCoinGeckoChartCandles(
  coinId: string,
  days: number,
): Promise<Candle[]> {
  const url = new URL(`${COINGECKO_API}/coins/${coinId}/ohlc`);
  url.searchParams.set("vs_currency", "eur");
  url.searchParams.set("days", days === 0 ? "max" : String(days));
  const res = await cgFetch(url.toString());
  const json: [number, number, number, number, number][] = await res.json();
  return json.map(([t, o, h, l, c]) => ({
    timestamp: t,
    open: o,
    high: h,
    low: l,
    close: c,
  }));
}

// ---------- Hooks ----------

// ---------- Profile hooks ----------

export function useUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor || isFetching) return null;
      const result = await actor.getUserProfile();
      if (!result) return null;
      const p = result as import("@/backend").UserProfile;
      return {
        id: p.id.toText?.() ?? String(p.id),
        username: p.username,
        displayName: p.displayName,
        profilePictureUrl: p.profilePictureUrl ?? undefined,
        createdAt: Number(p.createdAt),
      } satisfies UserProfile;
    },
    staleTime: 5 * 60_000,
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ProfileInput) => {
      if (!actor) throw new Error("Nicht angemeldet");
      const result = await actor.updateUserProfile({
        username: input.username,
        displayName: input.displayName,
        profilePictureUrl: input.profilePictureUrl ?? undefined,
      });
      const p = result as import("@/backend").UserProfile;
      return {
        id: p.id.toText?.() ?? String(p.id),
        username: p.username,
        displayName: p.displayName,
        profilePictureUrl: p.profilePictureUrl ?? undefined,
        createdAt: Number(p.createdAt),
      } satisfies UserProfile;
    },
    onSuccess: (data) => {
      qc.setQueryData(["userProfile"], data);
    },
  });
}

interface BackendSettings {
  currency: string;
  language: string;
  theme: string;
  colorblind: boolean;
  reportPrefs?: {
    defaultChartDays: number;
    roundingDecimals: number;
  };
}

/** Reads the caller's saved settings from the backend (null if none saved). */
export function useUserSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BackendSettings | null>({
    queryKey: ["userSettings"],
    queryFn: async () => {
      if (!actor || isFetching) return null;
      const result = await actor.getUserSettings();
      if (!result) return null;
      return {
        currency: result.currency,
        language: result.language,
        theme: result.theme,
        colorblind: result.colorblind,
        reportPrefs: result.reportPrefs
          ? {
              defaultChartDays: Number(result.reportPrefs.defaultChartDays),
              roundingDecimals: Number(result.reportPrefs.roundingDecimals),
            }
          : undefined,
      };
    },
    staleTime: 5 * 60_000,
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateUserSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: BackendSettings) => {
      if (!actor) throw new Error("Not signed in");
      const result = await actor.updateUserSettings(settings);
      return {
        currency: result.currency,
        language: result.language,
        theme: result.theme,
        colorblind: result.colorblind,
        reportPrefs: result.reportPrefs
          ? {
              defaultChartDays: Number(result.reportPrefs.defaultChartDays),
              roundingDecimals: Number(result.reportPrefs.roundingDecimals),
            }
          : undefined,
      } satisfies BackendSettings;
    },
    onSuccess: (data) => {
      qc.setQueryData(["userSettings"], data);
    },
  });
}

// ---------- Watchlist hooks (backend) ----------

export function useBackendWatchlist() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["backendWatchlist"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      return actor.getWatchlist();
    },
    staleTime: 60_000,
    enabled: !!actor && !isFetching,
  });
}

export function useSetBackendWatchlist() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (coinIds: string[]) => {
      if (!actor) throw new Error("Nicht angemeldet");
      await actor.setWatchlist(coinIds);
      return coinIds;
    },
    onSuccess: (coinIds) => {
      qc.setQueryData(["backendWatchlist"], coinIds);
    },
  });
}

// ---------- Portfolio hooks (backend) ----------

export function useBackendPortfolioTransactions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LocalTransaction[]>({
    queryKey: ["backendPortfolioTxs"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const txs = await actor.getPortfolioTransactions();
      return txs.map(backendTxToLocal);
    },
    staleTime: 60_000,
    enabled: !!actor && !isFetching,
  });
}

export function useSetBackendPortfolioTransactions() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (txs: LocalTransaction[]) => {
      if (!actor) throw new Error("Nicht angemeldet");
      await actor.setPortfolioTransactions(txs.map(localTxToBackend));
      return txs;
    },
    onSuccess: (txs) => {
      qc.setQueryData(["backendPortfolioTxs"], txs);
    },
  });
}

// CoinGecko allows up to 250 results per page. Using the max means we cover
// the same number of coins in far fewer requests (4 × 250 = 1000 instead of
// 10 × 100), which is gentler on the free-tier rate limit.
const PER_PAGE = 250;
export const MAX_PAGES = 4; // 4 × 250 = 1000 coins
export const TOTAL_COINS_TARGET = MAX_PAGES * PER_PAGE;

function mapBackendCoin(c: {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: bigint;
  priceChangePercentage1h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  circulatingSupply: number;
  totalSupply: number;
  ath: number;
  athChangePercentage: number;
  sparkline7d: number[];
}): Coin {
  return {
    id: c.id,
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    image: c.image,
    currentPrice: c.currentPrice,
    marketCap: c.marketCap,
    marketCapRank: Number(c.marketCapRank),
    priceChangePercentage1h: c.priceChangePercentage1h,
    priceChangePercentage24h: c.priceChangePercentage24h,
    priceChangePercentage7d: c.priceChangePercentage7d,
    totalVolume: c.totalVolume,
    high24h: c.high24h,
    low24h: c.low24h,
    circulatingSupply: c.circulatingSupply,
    totalSupply: c.totalSupply,
    ath: c.ath,
    athChangePercentage: c.athChangePercentage,
    sparkline7d: c.sparkline7d,
  };
}

/**
 * Infinite-query: pulls one page of 100 coins at a time, up to MAX_PAGES.
 * Use `fetchNextPage` to load more.
 */
export function useMarketDataInfinite() {
  const { actor, isFetching } = useActor(createActor);

  return useInfiniteQuery<{ coins: Coin[]; page: number }>({
    queryKey: ["marketData", "infinite"],
    initialPageParam: 1,
    getNextPageParam: (last, allPages) => {
      if (last.coins.length < PER_PAGE) return undefined;
      if (allPages.length >= MAX_PAGES) return undefined;
      return last.page + 1;
    },
    queryFn: async ({
      pageParam,
    }): Promise<{ coins: Coin[]; page: number }> => {
      const page = pageParam as number;
      if (actor && !isFetching) {
        try {
          const result = await actor.getMarketDataPage(
            BigInt(page),
            BigInt(PER_PAGE),
          );
          if (result.__kind__ === "ok") {
            return { coins: result.ok.coins.map(mapBackendCoin), page };
          }
        } catch (_) {
          // fall through
        }
      }
      return { coins: await fetchCoinGeckoMarket(page, PER_PAGE), page };
    },
    staleTime: 4_000,
    refetchInterval: 5_000,
    refetchIntervalInBackground: false,
  });
}

export function useGlobalStats() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<GlobalStats>({
    queryKey: ["globalStats"],
    queryFn: async (): Promise<GlobalStats> => {
      if (actor && !isFetching) {
        try {
          const result = await actor.getGlobalStats();
          if (result.__kind__ === "ok") {
            const { stats } = result.ok;
            return {
              totalMarketCap: stats.totalMarketCap,
              totalVolume24h: stats.totalVolume24h,
              marketCapChangePercentage24h: stats.marketCapChangePercentage24h,
              btcDominance: stats.btcDominance,
              ethDominance: stats.ethDominance,
              activeCryptocurrencies: Number(stats.activeCryptocurrencies),
              markets: Number(stats.markets),
            };
          }
        } catch (_) {}
      }
      return fetchCoinGeckoGlobal();
    },
    staleTime: 4_000,
    refetchInterval: 5_000,
    refetchIntervalInBackground: false,
  });
}

export function useFiatRates() {
  return useQuery<Record<string, number>>({
    queryKey: ["fiatRates"],
    queryFn: fetchFiatRates,
    staleTime: 10 * 60_000,
    refetchInterval: 10 * 60_000,
  });
}

export function useCoinNews(coinId: string | null, enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NewsItem[]>({
    queryKey: ["coinNews", coinId],
    enabled: enabled && !!coinId,
    queryFn: async (): Promise<NewsItem[]> => {
      if (!actor || isFetching || !coinId) return [];
      const result = await actor.getCoinNews(coinId);
      if (result.__kind__ === "ok") {
        return result.ok.map((n) => ({
          title: n.title,
          source: n.source,
          url: n.url,
          publishedAt: Number(n.publishedAt),
        }));
      }
      return [];
    },
    staleTime: 5 * 60_000,
  });
}

export function useCoinChart(
  coinId: string | null,
  days: number,
  kind: LocalChartKind,
  enabled: boolean,
) {
  return useQuery<CoinChart>({
    queryKey: ["coinChart", coinId, days, kind],
    enabled: enabled && !!coinId,
    queryFn: async (): Promise<CoinChart> => {
      if (!coinId) throw new Error("no coin");
      // Charts go directly to CoinGecko. Routing them through the canister
      // adds a 2-5s HTTP outcall round-trip which made the drawer feel
      // unresponsive. Caching is handled by react-query (5 min staleTime).
      if (kind === "line") {
        const line = await fetchCoinGeckoChartLine(coinId, days);
        return {
          coinId,
          days,
          kind: "line",
          line,
          candles: [],
          updatedAt: Date.now(),
        };
      }
      const candles = await fetchCoinGeckoChartCandles(coinId, days);
      return {
        coinId,
        days,
        kind: "candle",
        line: [],
        candles,
        updatedAt: Date.now(),
      };
    },
    staleTime: 5 * 60_000,
  });
}

// ---------- Coin detail (description, links, ATL, max supply) ----------

interface CoinGeckoDetailResponse {
  description?: { en?: string };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
    twitter_screen_name?: string;
    subreddit_url?: string;
    repos_url?: { github?: string[] };
  };
  market_data?: {
    ath?: { eur?: number };
    ath_date?: { eur?: string };
    atl?: { eur?: number };
    atl_change_percentage?: { eur?: number };
    atl_date?: { eur?: string };
    max_supply?: number | null;
  };
  genesis_date?: string | null;
  categories?: string[];
}

async function fetchCoinDetail(coinId: string): Promise<CoinDetail> {
  const url = new URL(`${COINGECKO_API}/coins/${coinId}`);
  url.searchParams.set("localization", "false");
  url.searchParams.set("tickers", "false");
  url.searchParams.set("market_data", "true");
  url.searchParams.set("community_data", "false");
  url.searchParams.set("developer_data", "false");
  url.searchParams.set("sparkline", "false");
  const res = await cgFetch(url.toString());
  const j: CoinGeckoDetailResponse = await res.json();

  const homepage = j.links?.homepage?.find((u) => u && u.length > 0);
  const explorer = j.links?.blockchain_site?.find((u) => u && u.length > 0);
  const github = j.links?.repos_url?.github?.find((u) => u && u.length > 0);
  const twitter = j.links?.twitter_screen_name
    ? `https://twitter.com/${j.links.twitter_screen_name}`
    : undefined;

  return {
    id: coinId,
    descriptionEn: j.description?.en?.trim() ?? "",
    homepage,
    explorer,
    twitter,
    reddit: j.links?.subreddit_url || undefined,
    github,
    ath: j.market_data?.ath?.eur ?? 0,
    athDate: j.market_data?.ath_date?.eur,
    atl: j.market_data?.atl?.eur ?? 0,
    atlChangePercentage: j.market_data?.atl_change_percentage?.eur ?? 0,
    atlDate: j.market_data?.atl_date?.eur,
    maxSupply: j.market_data?.max_supply ?? null,
    genesisDate: j.genesis_date ?? undefined,
    categories: j.categories?.filter((c) => !!c) ?? [],
  };
}

/**
 * Lazily loads extended detail for one coin (description, links, ATL, max
 * supply). Goes straight to CoinGecko like the chart does; only runs while the
 * detail drawer is open.
 */
export function useCoinDetail(coinId: string | null, enabled: boolean) {
  return useQuery<CoinDetail>({
    queryKey: ["coinDetail", coinId],
    enabled: enabled && !!coinId,
    queryFn: async () => {
      if (!coinId) throw new Error("no coin");
      return fetchCoinDetail(coinId);
    },
    staleTime: 10 * 60_000,
  });
}

// ---------- Trade order hooks ----------

function mapBackendTradeOrder(
  o: import("@/backend").TradeOrder,
): LocalTradeOrder {
  return {
    id: o.id,
    coinId: o.coinId,
    coinSymbol: o.coinSymbol,
    orderType: o.orderType as "buy" | "sell",
    fiatAmount: o.fiatAmount,
    coinQuantity: o.coinQuantity,
    priceAtExecution: o.priceAtExecution,
    stripePaymentIntentId: o.stripePaymentIntentId ?? undefined,
    status: o.status as "pending" | "completed" | "failed",
    timestamp: Number(o.timestamp),
  };
}

export function useTradeOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LocalTradeOrder[]>({
    queryKey: ["tradeOrders"],
    queryFn: async () => {
      if (!actor || isFetching) return [];
      const orders = await actor.getTradeOrders();
      return orders.map(mapBackendTradeOrder);
    },
    staleTime: 60_000,
    enabled: !!actor && !isFetching,
  });
}

export function useAddTradeOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (order: LocalTradeOrder) => {
      if (!actor) throw new Error("Nicht angemeldet");
      const backendOrder: import("@/backend").TradeOrder = {
        id: order.id,
        coinId: order.coinId,
        coinSymbol: order.coinSymbol,
        orderType: order.orderType as import("@/backend").OrderType,
        fiatAmount: order.fiatAmount,
        coinQuantity: order.coinQuantity,
        priceAtExecution: order.priceAtExecution,
        stripePaymentIntentId: order.stripePaymentIntentId ?? undefined,
        status: order.status as import("@/backend").OrderStatus,
        timestamp: BigInt(order.timestamp),
      };
      await actor.addTradeOrder(backendOrder);
      return order;
    },
    onSuccess: (order) => {
      qc.setQueryData<LocalTradeOrder[]>(["tradeOrders"], (prev) => [
        ...(prev ?? []),
        order,
      ]);
    },
  });
}

export function useCompleteTradeOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: "completed" | "failed";
    }) => {
      if (!actor) throw new Error("Nicht angemeldet");
      // Backend does not expose a single update endpoint; we fetch all,
      // mutate the matching order, and rewrite the full list.
      const orders = await actor.getTradeOrders();
      const _updated = orders.map((o) =>
        o.id === orderId ? { ...o, status } : o,
      );
      // Clear and re-add all orders (simplest with current backend interface)
      // Note: backend addTradeOrder appends; there is no clear endpoint.
      // This hook is a placeholder until a dedicated update endpoint is added.
      return { orderId, status };
    },
    onSuccess: ({ orderId, status }) => {
      qc.setQueryData<LocalTradeOrder[]>(["tradeOrders"], (prev) =>
        (prev ?? []).map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
    },
  });
}

// ---------- Report preferences hook ----------

export function useUpdateReportPrefs() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (prefs: {
      roundingDecimals: number;
      defaultChartDays: number;
    }) => {
      if (!actor) throw new Error("Nicht angemeldet");
      const result = await actor.updateReportPrefs({
        roundingDecimals: BigInt(prefs.roundingDecimals),
        defaultChartDays: BigInt(prefs.defaultChartDays),
      });
      return {
        currency: result.currency,
        language: result.language,
        theme: result.theme,
        colorblind: result.colorblind,
        reportPrefs: {
          roundingDecimals: Number(result.reportPrefs.roundingDecimals),
          defaultChartDays: Number(result.reportPrefs.defaultChartDays),
        },
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
}
