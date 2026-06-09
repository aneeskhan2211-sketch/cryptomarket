import { useSettings } from "@/contexts/SettingsContext";
import { formatPercent, formatPrice } from "@/lib/format";
import type { PortfolioSummary } from "@/types/portfolio";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PortfolioSummaryCardsProps {
  summary: PortfolioSummary;
  privacy: boolean;
  onTogglePrivacy: () => void;
}

function masked(text: string): string {
  return text.replace(/[0-9\-+.,]/g, "•");
}

export function PortfolioSummaryCards({
  summary,
  privacy,
  onTogglePrivacy,
}: PortfolioSummaryCardsProps) {
  const { t } = useSettings();
  const fmt = (s: string) => (privacy ? masked(s) : s);
  const valueStr = formatPrice(summary.totalValue);
  const allTimePct = formatPercent(summary.totalPnLPercent);
  const day24Pct = formatPercent(summary.change24hPercent);
  const pnlPos = summary.totalPnL >= 0;
  const day24Pos = summary.change24hPercent >= 0;

  return (
    <div
      className="rounded-2xl bg-card border border-border/60 p-4 sm:p-5 mb-4"
      data-ocid="portfolio.summary"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p
              className="text-3xl sm:text-4xl font-display font-bold text-foreground tabular-nums tracking-tight"
              data-ocid="portfolio.totalValue"
            >
              {fmt(valueStr)}
            </p>
            <button
              type="button"
              onClick={onTogglePrivacy}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label={
                privacy ? t("portfolio.showValues") : t("portfolio.hideValues")
              }
              data-ocid="portfolio.privacy_toggle"
            >
              {privacy ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground text-xs w-16 shrink-0">
                {t("portfolio.summary.value24h")}
              </span>
              <span className="font-mono text-foreground tabular-nums text-xs">
                {fmt(
                  formatPrice(
                    (summary.totalValue * summary.change24hPercent) / 100,
                  ),
                )}
              </span>
              <span
                className={`text-xs font-semibold tabular-nums ${day24Pos ? "text-price-up" : "text-price-down"}`}
              >
                {day24Pct}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground text-xs w-16 shrink-0">
                {t("portfolio.summary.allTime")}
              </span>
              <span className="font-mono text-foreground tabular-nums text-xs">
                {fmt(formatPrice(summary.totalPnL))}
              </span>
              <span
                className={`text-xs font-semibold tabular-nums ${pnlPos ? "text-price-up" : "text-price-down"}`}
              >
                {allTimePct}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
