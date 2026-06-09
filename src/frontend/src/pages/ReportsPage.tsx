import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/contexts/SettingsContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import { usePortfolioChart } from "@/hooks/usePortfolioChart";
import { usePortfolioPerformance } from "@/hooks/usePortfolioPerformance";
import { useMarketDataInfinite } from "@/lib/api";
import { formatPercent, formatQuantity } from "@/lib/format";
import type { LinePoint } from "@/types/coin";
import type { Holding, Transaction, TxKind } from "@/types/portfolio";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  FileTextIcon,
  FolderOpenIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TF_DAYS: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 };
const TF_LABELS: Record<string, string> = {
  "7d": "7 T",
  "30d": "30 T",
  "90d": "90 T",
};

function useCoinPrices() {
  const { data: pages } = useMarketDataInfinite() ?? { data: undefined };
  return useMemo(() => {
    const m = new Map<string, number>();
    if (pages) {
      for (const page of pages.pages) {
        for (const c of page.coins) {
          m.set(c.id, c.currentPrice);
        }
      }
    }
    return m;
  }, [pages]);
}

function SummaryCard({
  label,
  value,
  sub,
  isPositive,
  isNegative,
  loading,
  privacy,
}: {
  label: string;
  value: string;
  sub?: string;
  isPositive?: boolean;
  isNegative?: boolean;
  loading?: boolean;
  privacy?: boolean;
}) {
  const display = privacy ? "••••" : value;
  const subDisplay = privacy ? "••••" : sub;
  return (
    <Card className="bg-card border-border shadow-subtle">
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {loading ? (
          <Skeleton className="h-7 w-28 rounded" />
        ) : (
          <p
            className={`text-xl font-display font-bold ${
              isPositive
                ? "text-price-up"
                : isNegative
                  ? "text-price-down"
                  : "text-foreground"
            }`}
          >
            {display}
          </p>
        )}
        {subDisplay && (
          <p className="text-xs text-muted-foreground mt-1">{subDisplay}</p>
        )}
      </CardContent>
    </Card>
  );
}

function SvgAreaChart({
  data,
  width,
  height,
}: {
  data: LinePoint[];
  width: number;
  height: number;
}) {
  if (data.length < 2) return null;
  const padding = { top: 8, right: 8, bottom: 8, left: 8 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;

  const minPrice = Math.min(...data.map((d) => d.price));
  const maxPrice = Math.max(...data.map((d) => d.price));
  const range = maxPrice - minPrice || 1;

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * w;
  const yScale = (price: number) =>
    padding.top + h - ((price - minPrice) / range) * h;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.price)}`)
    .join(" ");

  const areaPath = `${linePath} L ${xScale(data.length - 1)} ${padding.top + h} L ${padding.left} ${padding.top + h} Z`;

  const isUp = data[data.length - 1].price >= data[0].price;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      role="img"
      aria-label="Portfolio area chart"
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={
              isUp ? "oklch(var(--price-up))" : "oklch(var(--price-down))"
            }
            stopOpacity="0.35"
          />
          <stop
            offset="100%"
            stopColor={
              isUp ? "oklch(var(--price-up))" : "oklch(var(--price-down))"
            }
            stopOpacity="0.02"
          />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke={isUp ? "oklch(var(--price-up))" : "oklch(var(--price-down))"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PortfolioChartSection({
  holdings,
  txs,
}: {
  holdings: Holding[];
  txs: Transaction[];
}) {
  const { t, formatMoney } = useSettings();
  const [tf, setTf] = useState<"7d" | "30d" | "90d">("30d");
  const days = TF_DAYS[tf];
  const coinIds = holdings.map((h) => h.coinId);

  const { points, isLoading } = usePortfolioChart({
    txs,
    coinIds,
    days,
    enabled: coinIds.length > 0,
  });

  return (
    <Card className="bg-card border-border shadow-subtle">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">
            {t("reports.portfolioChart")}
          </CardTitle>
          <Tabs value={tf} onValueChange={(v) => setTf(v as typeof tf)}>
            <TabsList className="h-7 bg-muted">
              {(["7d", "30d", "90d"] as const).map((k) => (
                <TabsTrigger
                  key={k}
                  value={k}
                  className="text-xs px-2 py-0.5"
                  data-ocid={`reports.chart.tab.${k}`}
                >
                  {TF_LABELS[k]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-lg" />
        ) : points.length < 2 ? (
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            {t("reports.noTransactions")}
          </div>
        ) : (
          <div className="h-48 w-full">
            <SvgAreaChart data={points} width={600} height={192} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatMoney(points[0].price)}</span>
              <span>{formatMoney(points[points.length - 1].price)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AssetAllocationSection({
  holdings,
  coinPrices,
}: {
  holdings: Holding[];
  coinPrices: Map<string, number>;
}) {
  const { t, formatMoney } = useSettings();

  const rows = useMemo(() => {
    const withValue = holdings
      .map((h) => {
        const price = coinPrices.get(h.coinId) ?? 0;
        return { ...h, value: h.quantity * price };
      })
      .filter((h) => h.value > 0)
      .sort((a, b) => b.value - a.value);
    const total = withValue.reduce((s, h) => s + h.value, 0);
    return withValue.map((h) => ({
      ...h,
      pct: total > 0 ? (h.value / total) * 100 : 0,
    }));
  }, [holdings, coinPrices]);

  if (rows.length === 0) {
    return (
      <Card className="bg-card border-border shadow-subtle">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {t("reports.assetAllocation")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            {t("reports.noTransactions")}
          </div>
        </CardContent>
      </Card>
    );
  }

  const colors = [
    "oklch(var(--chart-1))",
    "oklch(var(--chart-2))",
    "oklch(var(--chart-3))",
    "oklch(var(--chart-4))",
    "oklch(var(--chart-5))",
    "oklch(var(--primary))",
    "oklch(var(--accent))",
  ];

  return (
    <Card className="bg-card border-border shadow-subtle">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">
          Asset Allocation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((row, i) => (
          <div key={row.coinId} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">
                {row.symbol.toUpperCase()}
              </span>
              <span className="text-muted-foreground">
                {row.pct.toFixed(1)}% · {formatMoney(row.value)}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(row.pct, 100)}%`,
                  backgroundColor: colors[i % colors.length],
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function TransactionHistorySection({ txs }: { txs: Transaction[] }) {
  const { t, formatMoney } = useSettings();
  const [filter, setFilter] = useState<TxKind | "all">("all");

  const filtered = useMemo(() => {
    let list = [...txs].sort((a, b) => b.timestamp - a.timestamp);
    if (filter !== "all") list = list.filter((tx) => tx.kind === filter);
    return list;
  }, [txs, filter]);

  const kindBadge = (kind: TxKind) => {
    const map: Record<TxKind, { label: string; className: string }> = {
      buy: {
        label: t("reports.filter.buy"),
        className:
          "bg-[oklch(var(--trade-buy)/0.15)] text-[oklch(var(--trade-buy))] border-[oklch(var(--trade-buy)/0.3)]",
      },
      sell: {
        label: t("reports.filter.sell"),
        className:
          "bg-[oklch(var(--trade-sell)/0.15)] text-[oklch(var(--trade-sell))] border-[oklch(var(--trade-sell)/0.3)]",
      },
      transfer_in: {
        label: t("reports.filter.transfer"),
        className:
          "bg-[oklch(var(--reports-accent)/0.15)] text-[oklch(var(--reports-accent))] border-[oklch(var(--reports-accent)/0.3)]",
      },
      transfer_out: {
        label: t("reports.filter.transfer"),
        className:
          "bg-[oklch(var(--reports-accent)/0.15)] text-[oklch(var(--reports-accent))] border-[oklch(var(--reports-accent)/0.3)]",
      },
    };
    return map[kind];
  };

  const filters: Array<{ key: TxKind | "all"; label: string }> = [
    { key: "all", label: t("reports.filter.all") },
    { key: "buy", label: t("reports.filter.buy") },
    { key: "sell", label: t("reports.filter.sell") },
    { key: "transfer_in", label: t("reports.filter.transfer") },
  ];

  return (
    <Card className="bg-card border-border shadow-subtle">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {t("reports.transactionHistory")}
          </CardTitle>
          <div className="flex gap-1">
            {filters.map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs px-2"
                onClick={() => setFilter(f.key)}
                data-ocid={`reports.filter.${f.key}`}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {filtered.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            {t("reports.noTransactions")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-2 pr-3 font-medium">
                    {t("reports.coin")}
                  </th>
                  <th className="text-left py-2 pr-3 font-medium">
                    {t("reports.type")}
                  </th>
                  <th className="text-right py-2 pr-3 font-medium">
                    {t("reports.amount")}
                  </th>
                  <th className="text-right py-2 pr-3 font-medium">
                    {t("reports.price")}
                  </th>
                  <th className="text-right py-2 pr-3 font-medium">
                    {t("reports.total")}
                  </th>
                  <th className="text-right py-2 font-medium">
                    {t("reports.date")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, idx) => {
                  const badge = kindBadge(tx.kind);
                  const total = tx.quantity * tx.pricePerUnit;
                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      data-ocid={`reports.tx.item.${idx + 1}`}
                    >
                      <td className="py-2 pr-3 font-medium text-foreground">
                        {tx.symbol.toUpperCase()}
                      </td>
                      <td className="py-2 pr-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${badge.className}`}
                        >
                          {badge.label}
                        </Badge>
                      </td>
                      <td className="py-2 pr-3 text-right text-foreground">
                        {formatQuantity(tx.quantity)}
                      </td>
                      <td className="py-2 pr-3 text-right text-muted-foreground">
                        {formatMoney(tx.pricePerUnit)}
                      </td>
                      <td className="py-2 pr-3 text-right font-medium text-foreground">
                        {formatMoney(total)}
                      </td>
                      <td className="py-2 text-right text-muted-foreground text-xs">
                        {new Date(tx.timestamp).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PerformanceStatsSection({
  holdings,
  coinPrices,
}: {
  holdings: Holding[];
  coinPrices: Map<string, number>;
}) {
  const { t, formatMoneyCompact } = useSettings();

  const stats = useMemo(() => {
    const withPnL = holdings
      .map((h) => {
        const price = coinPrices.get(h.coinId) ?? 0;
        const value = h.quantity * price;
        const unrealized = value - h.costBasis;
        const unrealizedPct =
          h.costBasis > 0 ? (unrealized / h.costBasis) * 100 : 0;
        return { ...h, value, unrealized, unrealizedPct };
      })
      .filter((h) => h.value > 0);

    const best = withPnL.length
      ? withPnL.reduce((a, b) => (a.unrealizedPct > b.unrealizedPct ? a : b))
      : null;
    const worst = withPnL.length
      ? withPnL.reduce((a, b) => (a.unrealizedPct < b.unrealizedPct ? a : b))
      : null;

    const totalRealized = holdings.reduce((s, h) => s + h.realizedPnL, 0);
    const totalUnrealized = withPnL.reduce((s, h) => s + h.unrealized, 0);

    return { best, worst, totalRealized, totalUnrealized };
  }, [holdings, coinPrices]);

  return (
    <Card className="bg-card border-border shadow-subtle">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">
          {t("reports.performanceStats")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="w-9 h-9 rounded-full bg-[oklch(var(--trade-buy)/0.15)] flex items-center justify-center">
            <TrendingUpIcon className="w-4 h-4 text-[oklch(var(--trade-buy))]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {t("reports.bestPerformer")}
            </p>
            {stats.best ? (
              <>
                <p className="text-sm font-semibold text-foreground">
                  {stats.best.symbol.toUpperCase()}
                </p>
                <p className="text-xs text-price-up">
                  +{stats.best.unrealizedPct.toFixed(1)}%
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="w-9 h-9 rounded-full bg-[oklch(var(--trade-sell)/0.15)] flex items-center justify-center">
            <TrendingDownIcon className="w-4 h-4 text-[oklch(var(--trade-sell))]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {t("reports.worstPerformer")}
            </p>
            {stats.worst ? (
              <>
                <p className="text-sm font-semibold text-foreground">
                  {stats.worst.symbol.toUpperCase()}
                </p>
                <p className="text-xs text-price-down">
                  {stats.worst.unrealizedPct.toFixed(1)}%
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">—</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="w-9 h-9 rounded-full bg-[oklch(var(--reports-accent)/0.15)] flex items-center justify-center">
            <ArrowUpRightIcon className="w-4 h-4 text-[oklch(var(--reports-accent))]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {t("reports.totalRealized")}
            </p>
            <p
              className={`text-sm font-semibold ${
                stats.totalRealized >= 0 ? "text-price-up" : "text-price-down"
              }`}
            >
              {stats.totalRealized >= 0 ? "+" : ""}
              {formatMoneyCompact(stats.totalRealized)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="w-9 h-9 rounded-full bg-[oklch(var(--reports-accent)/0.15)] flex items-center justify-center">
            <ArrowDownRightIcon className="w-4 h-4 text-[oklch(var(--reports-accent))]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {t("reports.totalUnrealized")}
            </p>
            <p
              className={`text-sm font-semibold ${
                stats.totalUnrealized >= 0 ? "text-price-up" : "text-price-down"
              }`}
            >
              {stats.totalUnrealized >= 0 ? "+" : ""}
              {formatMoneyCompact(stats.totalUnrealized)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  const { t } = useSettings();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FolderOpenIcon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-1">
        {t("reports.empty.title")}
      </h2>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
        {t("reports.empty.desc")}
      </p>
      <Link to="/portfolio">
        <Button
          variant="default"
          size="sm"
          data-ocid="reports.empty.cta_button"
        >
          {t("reports.empty.cta")}
        </Button>
      </Link>
    </div>
  );
}

/* ────────────────────────── Performance Tab ────────────────────────── */

function PerformanceTab({ txs }: { txs: Transaction[] }) {
  const { t, formatMoney, settings } = useSettings();
  const [perfTf, setPerfTf] = useState<"24h" | "7d" | "30d" | "1y">("7d");

  const coinIds = useMemo(() => [...new Set(txs.map((t) => t.coinId))], [txs]);

  const {
    points,
    isLoading: perfLoading,
    isError: perfError,
  } = usePortfolioPerformance(txs, coinIds, perfTf, coinIds.length > 0);

  const tfOptions: Array<{ key: typeof perfTf; label: string }> = [
    { key: "24h", label: t("reports.timeframe.24h") },
    { key: "7d", label: t("reports.timeframe.7d") },
    { key: "30d", label: t("reports.timeframe.30d") },
    { key: "1y", label: t("reports.timeframe.1y") },
  ];

  if (txs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground text-sm">
        <FolderOpenIcon className="w-8 h-8 mb-2" />
        {t("reports.noTransactions")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t("reports.performance.title")}
        </h2>
        <div className="flex gap-1">
          {tfOptions.map((o) => (
            <Button
              key={o.key}
              variant={perfTf === o.key ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs px-3 rounded-full"
              onClick={() => setPerfTf(o.key)}
              data-ocid={`reports.perf.tf.${o.key}`}
            >
              {o.label}
            </Button>
          ))}
        </div>
      </div>

      {perfLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
        </div>
      ) : perfError ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
          Failed to load chart data
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={points}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) =>
                  new Date(ts).toLocaleDateString(settings.language)
                }
              />
              <YAxis tickFormatter={(v) => formatMoney(Number(v))} width={80} />
              <Tooltip
                labelFormatter={(ts) =>
                  new Date(Number(ts)).toLocaleDateString(settings.language)
                }
                formatter={(v: number) => [formatMoney(v), "Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                fill="var(--color-primary)"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Tax Report Tab ─────────────────────────── */

interface FifoItem {
  coinId: string;
  coinName: string;
  date: string;
  sellQty: number;
  sellPrice: number;
  costBasis: number;
  gainLoss: number;
}

interface FifoResult {
  items: FifoItem[];
  totalGain: number;
  totalLoss: number;
}

function calculateFifoTax(txs: Transaction[]): FifoResult {
  const byCoin = new Map<string, Transaction[]>();
  for (const tx of txs) {
    const list = byCoin.get(tx.coinId) ?? [];
    list.push(tx);
    byCoin.set(tx.coinId, list);
  }

  const items: FifoItem[] = [];
  let totalGain = 0;
  let totalLoss = 0;

  for (const [coinId, list] of byCoin) {
    const sorted = [...list].sort((a, b) => a.timestamp - b.timestamp);
    const buys = sorted.filter(
      (t) => t.kind === "buy" || t.kind === "transfer_in",
    );
    const sells = sorted.filter((t) => t.kind === "sell");

    const buyQueue: { qty: number; price: number }[] = [];
    for (const b of buys) {
      buyQueue.push({ qty: b.quantity, price: b.pricePerUnit });
    }

    for (const s of sells) {
      let remaining = s.quantity;
      let costBasis = 0;
      while (remaining > 0 && buyQueue.length > 0) {
        const front = buyQueue[0];
        const use = Math.min(remaining, front.qty);
        costBasis += use * front.price;
        front.qty -= use;
        remaining -= use;
        if (front.qty <= 0) buyQueue.shift();
      }
      const gainLoss = s.quantity * s.pricePerUnit - costBasis;
      if (gainLoss >= 0) totalGain += gainLoss;
      else totalLoss += gainLoss;

      items.push({
        coinId,
        coinName: s.symbol.toUpperCase(),
        date: new Date(s.timestamp).toISOString().split("T")[0],
        sellQty: s.quantity,
        sellPrice: s.pricePerUnit,
        costBasis,
        gainLoss,
      });
    }
  }

  items.sort((a, b) => a.date.localeCompare(b.date));
  return { items, totalGain, totalLoss };
}

function TaxReportTab({ txs }: { txs: Transaction[] }) {
  const { t, formatMoney } = useSettings();

  const { items, totalGain, totalLoss } = useMemo(
    () => calculateFifoTax(txs),
    [txs],
  );

  const net = totalGain + totalLoss;
  const sellCount = items.length;

  const handleExport = () => {
    const headers = "Date,Coin,SellQty,SellPrice,CostBasis,RealizedGainLoss\n";
    const rows = items
      .map(
        (it) =>
          `${it.date},${it.coinName},${it.sellQty},${it.sellPrice.toFixed(4)},${it.costBasis.toFixed(4)},${it.gainLoss.toFixed(4)}`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const today = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `TaxReport_${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (sellCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground text-sm">
        <FolderOpenIcon className="w-8 h-8 mb-2" />
        {t("tax.noSellTransactions")}
      </div>
    );
  }

  return (
    <div className="tax-section space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {t("reports.tax.title")}
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={handleExport}
          data-ocid="tax.export_csv_button"
        >
          <DownloadIcon className="w-3.5 h-3.5 mr-1" />
          {t("tax.exportCsv")}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="bg-card border-border shadow-subtle">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">
              {t("tax.totalRealizedGain")}
            </p>
            <p className="text-xl font-display font-bold text-price-up">
              {formatMoney(totalGain)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-subtle">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">
              {t("tax.totalRealizedLoss")}
            </p>
            <p className="text-xl font-display font-bold text-price-down">
              {formatMoney(totalLoss)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-subtle">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">
              {t("tax.netGain") || "Net Gain/Loss"}
            </p>
            <p
              className={`text-xl font-display font-bold ${
                net >= 0 ? "text-price-up" : "text-price-down"
              }`}
            >
              {net >= 0 ? "+" : ""}
              {formatMoney(net)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-subtle">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">
              {t("tax.transactionCount")}
            </p>
            <p className="text-xl font-display font-bold text-foreground">
              {sellCount}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-subtle">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {t("tax.details")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-2 pr-3 font-medium">
                    {t("reports.date")}
                  </th>
                  <th className="text-left py-2 pr-3 font-medium">
                    {t("reports.coin")}
                  </th>
                  <th className="text-right py-2 pr-3 font-medium">
                    {t("reports.amount")}
                  </th>
                  <th className="text-right py-2 pr-3 font-medium">
                    {t("reports.price")}
                  </th>
                  <th className="text-right py-2 pr-3 font-medium">
                    Cost Basis
                  </th>
                  <th className="text-right py-2 font-medium">Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr
                    key={`${it.coinId}-${it.date}-${idx}`}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    data-ocid={`tax.item.${idx + 1}`}
                  >
                    <td className="py-2 pr-3 text-foreground">{it.date}</td>
                    <td className="py-2 pr-3 font-medium text-foreground">
                      {it.coinName}
                    </td>
                    <td className="py-2 pr-3 text-right text-foreground">
                      {formatQuantity(it.sellQty)}
                    </td>
                    <td className="py-2 pr-3 text-right text-muted-foreground">
                      {formatMoney(it.sellPrice)}
                    </td>
                    <td className="py-2 pr-3 text-right text-muted-foreground">
                      {formatMoney(it.costBasis)}
                    </td>
                    <td
                      className={`py-2 text-right font-medium ${
                        it.gainLoss >= 0 ? "text-price-up" : "text-price-down"
                      }`}
                    >
                      {it.gainLoss >= 0 ? "+" : ""}
                      {formatMoney(it.gainLoss)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  const { t, formatMoney, formatMoneyCompact } = useSettings();
  const { holdings, txs, isLoading, privacy } = usePortfolio();
  const coinPrices = useCoinPrices();

  const [activeTab, setActiveTab] = useState<
    "overview" | "performance" | "tax"
  >("overview");

  const summary = useMemo(() => {
    const totalValue = holdings.reduce((s, h) => {
      const price = coinPrices.get(h.coinId) ?? 0;
      return s + h.quantity * price;
    }, 0);
    const totalCost = holdings.reduce((s, h) => s + h.costBasis, 0);
    const totalRealized = holdings.reduce((s, h) => s + h.realizedPnL, 0);
    const totalUnrealized = totalValue - totalCost;
    const totalPnL = totalRealized + totalUnrealized;
    const totalPnLPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;
    const change24hPercent = 0;

    return {
      totalValue,
      totalCost,
      totalRealized,
      totalUnrealized,
      totalPnL,
      totalPnLPercent,
      change24hPercent,
    };
  }, [holdings, coinPrices]);

  const hasData = holdings.length > 0 || txs.length > 0;

  const tabLabels: Record<string, string> = {
    overview: t("reports.tab.overview") || "Overview",
    performance: t("reports.tab.performance") || "Performance",
    tax: t("reports.tab.tax") || "Tax Report",
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <FileTextIcon className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-display font-bold text-foreground">
            {t("reports.title")}
          </h1>
        </div>

        {!hasData && !isLoading ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {/* Tab bar */}
            <div className="flex gap-1">
              {(["overview", "performance", "tax"] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 text-xs px-3 rounded-full border"
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`reports.tab.${tab}`}
                >
                  {tabLabels[tab]}
                </Button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Section 1: Portfolio Summary */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <SummaryCard
                    label={t("reports.totalValue")}
                    value={formatMoney(summary.totalValue)}
                    loading={isLoading}
                    privacy={privacy}
                  />
                  <SummaryCard
                    label={t("reports.totalInvested")}
                    value={formatMoney(summary.totalCost)}
                    loading={isLoading}
                    privacy={privacy}
                  />
                  <SummaryCard
                    label={t("reports.unrealizedPnL")}
                    value={
                      (summary.totalUnrealized >= 0 ? "+" : "") +
                      formatMoneyCompact(summary.totalUnrealized)
                    }
                    sub={formatPercent(summary.totalPnLPercent)}
                    isPositive={summary.totalUnrealized > 0}
                    isNegative={summary.totalUnrealized < 0}
                    loading={isLoading}
                    privacy={privacy}
                  />
                  <SummaryCard
                    label={t("reports.realizedPnL")}
                    value={
                      (summary.totalRealized >= 0 ? "+" : "") +
                      formatMoneyCompact(summary.totalRealized)
                    }
                    isPositive={summary.totalRealized > 0}
                    isNegative={summary.totalRealized < 0}
                    loading={isLoading}
                    privacy={privacy}
                  />
                  <SummaryCard
                    label={t("reports.change24h")}
                    value={formatPercent(summary.change24hPercent)}
                    loading={isLoading}
                    privacy={privacy}
                  />
                </div>

                {/* Section 2: Portfolio Chart */}
                <div className="lg:col-span-2">
                  <PortfolioChartSection holdings={holdings} txs={txs} />
                </div>

                <AssetAllocationSection
                  holdings={holdings}
                  coinPrices={coinPrices}
                />

                {/* Section 4: Transaction History */}
                <TransactionHistorySection txs={txs} />

                {/* Section 5: Performance Stats */}
                <div className="lg:col-span-2">
                  <PerformanceStatsSection
                    holdings={holdings}
                    coinPrices={coinPrices}
                  />
                </div>
              </div>
            )}

            {activeTab === "performance" && <PerformanceTab txs={txs} />}

            {activeTab === "tax" && <TaxReportTab txs={txs} />}
          </div>
        )}
      </div>
    </Layout>
  );
}
