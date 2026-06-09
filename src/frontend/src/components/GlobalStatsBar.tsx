import { Skeleton } from "@/components/ui/skeleton";
import { formatMarketCap, formatPercentPlain } from "@/lib/format";
import type { GlobalStats } from "@/types/coin";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCwIcon } from "lucide-react";

interface GlobalStatsBarProps {
  data: GlobalStats | undefined;
  isLoading: boolean;
  coinCount: number;
  isLive?: boolean;
  lastUpdated?: Date | null;
}

interface StatItemProps {
  label: string;
  value: string;
  trend?: number;
  testId?: string;
}

function StatItem({ label, value, trend, testId }: StatItemProps) {
  const trendColor =
    trend === undefined
      ? "text-muted-foreground"
      : trend >= 0
        ? "text-price-up"
        : "text-price-down";
  return (
    <div
      className="flex flex-col gap-0.5 px-3 sm:px-4 py-2.5 border-r border-border/40 last:border-r-0 min-w-[120px]"
      data-ocid={testId}
    >
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-mono font-semibold text-foreground tabular-nums">
          {value}
        </span>
        {trend !== undefined && (
          <span className={`text-[11px] font-semibold ${trendColor}`}>
            {trend >= 0 ? "▲" : "▼"}
            {formatPercentPlain(Math.abs(trend))}
          </span>
        )}
      </div>
    </div>
  );
}

export function GlobalStatsBar({
  data,
  isLoading,
  coinCount,
  isLive,
  lastUpdated,
}: GlobalStatsBarProps) {
  const qc = useQueryClient();
  if (isLoading) {
    return (
      <div
        className="rounded-xl border border-border/60 bg-card overflow-hidden mb-4 sm:mb-6"
        data-ocid="globalStats.loading"
      >
        <div className="flex flex-wrap">
          {["a", "b", "c", "d", "e"].map((k) => (
            <div
              key={k}
              className="flex flex-col gap-1 px-3 sm:px-4 py-2.5 border-r border-border/40 last:border-r-0 min-w-[120px]"
            >
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const handleRefresh = () => {
    qc.invalidateQueries({ queryKey: ["globalStats"] });
  };

  return (
    <div
      className="rounded-xl border border-border/60 bg-card overflow-hidden mb-4 sm:mb-6"
      data-ocid="globalStats.container"
    >
      <div className="flex flex-wrap items-center">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-r border-border/40">
          <span
            className={`w-2 h-2 rounded-full ${
              isLive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/50"
            }`}
            title={isLive ? "Live" : "Stale"}
          />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider hidden sm:block">
            {isLive ? "Live" : "Stale"}
          </span>
          {lastUpdated && (
            <span className="text-[10px] text-muted-foreground font-mono hidden sm:block">
              {lastUpdated.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          )}
          <button
            type="button"
            onClick={handleRefresh}
            className="ml-1 w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Aktualisieren"
            data-ocid="globalStats.refresh_button"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
          </button>
        </div>
        <StatItem
          label="Marktkapital."
          value={formatMarketCap(data.totalMarketCap)}
          trend={data.marketCapChangePercentage24h}
          testId="globalStats.marketCap"
        />
        <StatItem
          label="24h Volumen"
          value={formatMarketCap(data.totalVolume24h)}
          testId="globalStats.volume"
        />
        <StatItem
          label="BTC Dominanz"
          value={formatPercentPlain(data.btcDominance)}
          testId="globalStats.btcDominance"
        />
        <StatItem
          label="ETH Dominanz"
          value={formatPercentPlain(data.ethDominance)}
          testId="globalStats.ethDominance"
        />
        <StatItem
          label="Coins"
          value={`${data.activeCryptocurrencies > 0 ? data.activeCryptocurrencies.toLocaleString("de-DE") : coinCount}`}
          testId="globalStats.activeCoins"
        />
      </div>
    </div>
  );
}
