import { Skeleton } from "@/components/ui/skeleton";
import { useCoinChart } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import {
  CHART_TIMEFRAMES,
  type ChartKind,
  type ChartTimeframe,
  timeframeLabel,
  timeframeToDays,
} from "@/types/coin";
import { BarChart3Icon, LineChartIcon } from "lucide-react";
import { memo, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface CoinChartWidgetProps {
  coinId: string;
  open: boolean;
}

// ---------- Tooltip ----------

interface CustomTooltipPayload {
  payload?: {
    timestamp: number;
    price?: number;
    open?: number;
    high?: number;
    low?: number;
    close?: number;
  };
}

function ChartTooltip(props: TooltipProps<number, string>) {
  const { active, payload } = props;
  if (!active || !payload || payload.length === 0) return null;
  const p = (payload[0] as CustomTooltipPayload).payload;
  if (!p) return null;
  const dateStr = new Date(p.timestamp).toLocaleString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-md border border-border/60 bg-card/95 backdrop-blur-sm px-3 py-2 text-[11px] shadow-lg">
      <p className="text-muted-foreground mb-1">{dateStr}</p>
      {typeof p.price === "number" && (
        <p className="font-mono font-semibold text-foreground tabular-nums">
          {formatPrice(p.price)}
        </p>
      )}
      {typeof p.open === "number" && typeof p.close === "number" && (
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 mt-0.5">
          <span className="text-muted-foreground">O</span>
          <span className="font-mono tabular-nums text-foreground text-right">
            {formatPrice(p.open)}
          </span>
          <span className="text-muted-foreground">H</span>
          <span className="font-mono tabular-nums text-price-up text-right">
            {formatPrice(p.high ?? 0)}
          </span>
          <span className="text-muted-foreground">L</span>
          <span className="font-mono tabular-nums text-price-down text-right">
            {formatPrice(p.low ?? 0)}
          </span>
          <span className="text-muted-foreground">C</span>
          <span className="font-mono tabular-nums text-foreground text-right">
            {formatPrice(p.close)}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------- Candle as a custom recharts shape ----------
//
// Recharts has no native candlestick. We trick it: each candle is rendered
// as a single Bar whose dataKey is a `[low, high]` tuple. Recharts draws
// that as a bar from low to high, which is the wick. We override the bar's
// `shape` to also draw a thicker rectangle for the open->close body.
//
// Because we use a tuple dataKey, recharts gives us the correctly-scaled
// `y` (top of bar = high) and `height` (bar pixel height = high - low).
// From that we can derive the price-per-pixel scale and place open/close
// correctly without knowing the y-axis domain ourselves.

interface CandleShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}

function CandleShape(props: CandleShapeProps) {
  const { x = 0, y = 0, width = 4, height = 0, payload } = props;
  if (!payload || height <= 0) return null;
  const { open, high, low, close } = payload;
  // Pixel scale: `height` pixels span `(high - low)` price units.
  const range = high - low || 1;
  const pxPerPrice = height / range;
  // Body extends from open to close. y=top (= high pixel coordinate).
  const yOpen = y + (high - open) * pxPerPrice;
  const yClose = y + (high - close) * pxPerPrice;
  const positive = close >= open;
  const color = positive ? "oklch(0.72 0.22 145)" : "oklch(0.62 0.24 25)";
  const bodyTop = Math.min(yOpen, yClose);
  const bodyHeight = Math.max(1, Math.abs(yOpen - yClose));
  const cx = x + width / 2;
  const bodyWidth = Math.max(2, width * 0.7);
  return (
    <g>
      {/* Wick */}
      <line
        x1={cx}
        x2={cx}
        y1={y}
        y2={y + height}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={cx - bodyWidth / 2}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        fill={color}
      />
    </g>
  );
}

const candleShape = (shapeProps: CandleShapeProps) => (
  <CandleShape {...shapeProps} />
);

// ---------- Main widget ----------

function fmtXAxis(value: number): string {
  const d = new Date(value);
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
}

function fmtYAxis(value: number): string {
  if (value >= 1000) return `${Math.round(value).toLocaleString("de-DE")}`;
  if (value >= 1) return value.toFixed(2);
  return value.toPrecision(3);
}

function CoinChartWidgetImpl({ coinId, open }: CoinChartWidgetProps) {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("7d");
  const [kind, setKind] = useState<ChartKind>("line");

  const days = timeframeToDays(timeframe);
  const { data, isLoading, isError, refetch, isFetching } = useCoinChart(
    coinId,
    days,
    kind,
    open,
  );

  // Build chart data once per fetch.
  const series = useMemo(() => {
    if (!data) return [];
    if (kind === "line") {
      return data.line.map((p) => ({
        timestamp: p.timestamp,
        price: p.price,
      }));
    }
    return data.candles.map((c) => ({
      timestamp: c.timestamp,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
      // Recharts tuple-dataKey: Bar will render from low (pixel) to high (pixel).
      range: [c.low, c.high] as [number, number],
    }));
  }, [data, kind]);

  // Y-axis domain (pad a bit so candles don't touch the edges).
  const yDomain = useMemo<[number, number]>(() => {
    if (series.length === 0) return [0, 1];
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const p of series) {
      if (kind === "line") {
        const v = (p as { price: number }).price;
        if (v < min) min = v;
        if (v > max) max = v;
      } else {
        const c = p as { high: number; low: number };
        if (c.low < min) min = c.low;
        if (c.high > max) max = c.high;
      }
    }
    const pad = (max - min) * 0.08 || max * 0.02 || 1;
    return [Math.max(0, min - pad), max + pad];
  }, [series, kind]);

  const summary = useMemo(() => {
    if (!data) return null;
    if (kind === "line" && data.line.length > 0) {
      const first = data.line[0].price;
      const last = data.line[data.line.length - 1].price;
      const change = ((last - first) / first) * 100;
      return { price: last, change };
    }
    if (kind === "candle" && data.candles.length > 0) {
      const first = data.candles[0].open;
      const last = data.candles[data.candles.length - 1].close;
      const change = ((last - first) / first) * 100;
      return { price: last, change };
    }
    return null;
  }, [data, kind]);

  const lineTrendPositive =
    series.length >= 2 &&
    kind === "line" &&
    (series[series.length - 1] as { price: number }).price >=
      (series[0] as { price: number }).price;
  const lineColor = lineTrendPositive
    ? "oklch(0.72 0.22 145)"
    : "oklch(0.62 0.24 25)";

  const CHART_HEIGHT = 320;
  const PLOT_TOP = 10;

  return (
    <div className="space-y-3" data-ocid="coinChart.container">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          {summary ? (
            <>
              <p className="text-2xl font-display font-bold text-foreground tabular-nums">
                {formatPrice(summary.price)}
              </p>
              <p
                className={`text-xs font-semibold tabular-nums ${
                  summary.change >= 0 ? "text-price-up" : "text-price-down"
                }`}
              >
                {summary.change >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(summary.change).toFixed(2)} % über{" "}
                {timeframeLabel(timeframe)}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? "Lade Chart..."
                : isError
                  ? "Chart konnte nicht geladen werden"
                  : "Keine Daten"}
            </p>
          )}
        </div>
        <div className="flex items-center rounded-lg border border-border/60 bg-card p-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setKind("line")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              kind === "line"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Linien-Chart"
            data-ocid="coinChart.kind_line"
          >
            <LineChartIcon className="w-3.5 h-3.5" />
            Linie
          </button>
          <button
            type="button"
            onClick={() => setKind("candle")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              kind === "candle"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Candlestick-Chart"
            data-ocid="coinChart.kind_candle"
          >
            <BarChart3Icon className="w-3.5 h-3.5" />
            Kerzen
          </button>
        </div>
      </div>

      {/* Chart */}
      <div
        className="relative rounded-lg border border-border/50 bg-background/40 p-2"
        style={{ height: CHART_HEIGHT + 16 }}
        data-ocid="coinChart.canvas_container"
      >
        {(() => {
          if (isLoading && series.length === 0) {
            return (
              <div className="absolute inset-2">
                <Skeleton className="w-full h-full rounded" />
              </div>
            );
          }
          if (series.length === 0) {
            return (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground px-4 text-center">
                <span>
                  {isError
                    ? "Daten konnten nicht geladen werden"
                    : isFetching
                      ? "Lade Chart..."
                      : "Keine Daten"}
                </span>
                {isError && !isFetching && (
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="px-3 py-1.5 rounded-lg border border-border/60 bg-card text-foreground hover:border-primary/40 hover:text-primary transition-colors font-semibold"
                    data-ocid="coinChart.retry"
                  >
                    Erneut versuchen
                  </button>
                )}
              </div>
            );
          }
          if (kind === "line") {
            return (
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <AreaChart
                  data={series}
                  margin={{ top: PLOT_TOP, right: 8, left: 0, bottom: 8 }}
                >
                  <defs>
                    <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={lineColor}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor={lineColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={fmtXAxis}
                    stroke="rgba(220,220,230,0.45)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={48}
                  />
                  <YAxis
                    dataKey="price"
                    domain={yDomain}
                    tickFormatter={fmtYAxis}
                    stroke="rgba(220,220,230,0.45)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                    orientation="right"
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{
                      stroke: "oklch(0.72 0.22 145 / 0.5)",
                      strokeWidth: 1,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={lineColor}
                    strokeWidth={2}
                    fill="url(#lineFill)"
                    isAnimationActive={false}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            );
          }
          // Candle mode
          return (
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <ComposedChart
                data={series}
                margin={{ top: PLOT_TOP, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid
                  stroke="rgba(255,255,255,0.04)"
                  vertical={false}
                />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={fmtXAxis}
                  stroke="rgba(220,220,230,0.45)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={48}
                />
                <YAxis
                  domain={yDomain}
                  tickFormatter={fmtYAxis}
                  stroke="rgba(220,220,230,0.45)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                  orientation="right"
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{
                    stroke: "oklch(0.72 0.22 145 / 0.5)",
                    strokeWidth: 1,
                  }}
                />
                <Bar
                  dataKey="range"
                  shape={candleShape}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          );
        })()}
      </div>

      {/* Timeframe selector */}
      <div className="flex flex-wrap gap-1">
        {CHART_TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setTimeframe(tf)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              timeframe === tf
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-card border border-border/60 text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`coinChart.tf_${tf}`}
          >
            {timeframeLabel(tf)}
          </button>
        ))}
      </div>
    </div>
  );
}

export const CoinChartWidget = memo(CoinChartWidgetImpl);
