import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";
import type { LinePoint } from "@/types/coin";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface PortfolioChartProps {
  points: LinePoint[];
  isLoading: boolean;
  loadedCount: number;
  totalCount: number;
  privacy: boolean;
}

function mask(s: string): string {
  return s.replace(/[0-9\-+.,]/g, "•");
}

interface ChartPoint {
  timestamp: number;
  value: number;
}

function PortfolioTooltip(
  props: TooltipProps<number, string> & { privacy: boolean },
) {
  const { active, payload, privacy } = props;
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload as ChartPoint;
  if (!p) return null;
  const dateStr = new Date(p.timestamp).toLocaleString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const valueStr = formatPrice(p.value);
  return (
    <div className="rounded-md border border-border/60 bg-card/95 backdrop-blur-sm px-3 py-2 text-[11px] shadow-lg">
      <p className="text-muted-foreground mb-1">{dateStr}</p>
      <p className="font-mono font-semibold text-foreground tabular-nums">
        {privacy ? mask(valueStr) : valueStr}
      </p>
    </div>
  );
}

function fmtXAxis(value: number): string {
  return new Date(value).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
  });
}

function fmtYAxis(value: number, privacy: boolean): string {
  if (privacy) return "•••";
  if (Math.abs(value) >= 1000)
    return `${Math.round(value).toLocaleString("de-DE")}`;
  if (Math.abs(value) >= 1) return value.toFixed(2);
  return value.toPrecision(2);
}

export function PortfolioChart({
  points,
  isLoading,
  loadedCount,
  totalCount,
  privacy,
}: PortfolioChartProps) {
  const data = useMemo<ChartPoint[]>(() => {
    if (points.length === 0) return [];
    // Deduplicate by timestamp + sort ascending.
    const seen = new Set<number>();
    const out: ChartPoint[] = [];
    for (const p of points) {
      if (seen.has(p.timestamp)) continue;
      seen.add(p.timestamp);
      out.push({ timestamp: p.timestamp, value: p.price });
    }
    out.sort((a, b) => a.timestamp - b.timestamp);
    return out;
  }, [points]);

  const trendPositive =
    data.length >= 2 && data[data.length - 1].value >= data[0].value;
  const color = trendPositive ? "oklch(0.72 0.22 145)" : "oklch(0.62 0.24 25)";

  const showSkeleton = isLoading && data.length === 0;

  return (
    <div
      className="rounded-lg border border-border/50 bg-background/40 p-2 relative"
      style={{ height: 236 }}
      data-ocid="portfolioChart.container"
    >
      {(() => {
        if (showSkeleton) {
          return (
            <div className="absolute inset-2 flex flex-col items-center justify-center gap-2">
              <Skeleton className="w-full h-full rounded" />
              <p className="absolute text-[10px] text-muted-foreground">
                Lade Chart-Daten... {loadedCount}/{totalCount}
              </p>
            </div>
          );
        }
        if (data.length === 0) {
          return (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">
                Noch keine Daten — füge eine Transaktion hinzu.
              </p>
            </div>
          );
        }
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 8, left: 0, bottom: 8 }}
            >
              <defs>
                <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
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
                dataKey="value"
                tickFormatter={(v) => fmtYAxis(v, privacy)}
                stroke="rgba(220,220,230,0.45)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={60}
                orientation="right"
              />
              <Tooltip
                content={<PortfolioTooltip privacy={privacy} />}
                cursor={{
                  stroke: "oklch(0.72 0.22 145 / 0.5)",
                  strokeWidth: 1,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill="url(#portfolioFill)"
                isAnimationActive={false}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      })()}
      {!showSkeleton && data.length > 0 && totalCount > loadedCount && (
        <p className="absolute top-1 right-2 text-[10px] text-muted-foreground">
          Lädt... {loadedCount}/{totalCount}
        </p>
      )}
    </div>
  );
}
