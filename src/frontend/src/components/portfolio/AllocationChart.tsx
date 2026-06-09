import { formatPrice } from "@/lib/format";
import type { Coin } from "@/types/coin";
import type { Holding } from "@/types/portfolio";
import { useMemo } from "react";

interface AllocationChartProps {
  holdings: Holding[];
  coinsById: Map<string, Coin>;
  privacy: boolean;
}

// A spread of palette-friendly colors for slices.
const PALETTE = [
  "oklch(0.72 0.22 145)",
  "oklch(0.65 0.22 25)",
  "oklch(0.7 0.18 250)",
  "oklch(0.78 0.16 85)",
  "oklch(0.65 0.2 305)",
  "oklch(0.72 0.18 195)",
  "oklch(0.7 0.2 60)",
  "oklch(0.6 0.22 340)",
  "oklch(0.7 0.18 175)",
  "oklch(0.65 0.2 235)",
];

interface Slice {
  coinId: string;
  symbol: string;
  name: string;
  value: number;
  share: number;
  color: string;
  image?: string;
}

function mask(s: string): string {
  return s.replace(/[0-9\-+.,]/g, "•");
}

export function AllocationChart({
  holdings,
  coinsById,
  privacy,
}: AllocationChartProps) {
  const slices = useMemo<Slice[]>(() => {
    const enriched = holdings
      .filter((h) => h.quantity > 0)
      .map((h) => {
        const coin = coinsById.get(h.coinId);
        const value = h.quantity * (coin?.currentPrice ?? 0);
        return {
          coinId: h.coinId,
          symbol: h.symbol,
          name: coin?.name ?? h.symbol,
          value,
          image: coin?.image,
        };
      })
      .filter((x) => x.value > 0);
    const total = enriched.reduce((s, x) => s + x.value, 0);
    if (total === 0) return [];
    return enriched
      .map((x) => ({ ...x, share: x.value / total }))
      .sort((a, b) => b.share - a.share)
      .map((x, i) => ({ ...x, color: PALETTE[i % PALETTE.length] }));
  }, [holdings, coinsById]);

  if (slices.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-background py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Keine Bestände für die Verteilung.
        </p>
      </div>
    );
  }

  // Build SVG donut.
  const size = 200;
  const stroke = 32;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const segments = slices.map((s) => {
    const length = s.share * circumference;
    const seg = {
      ...s,
      strokeDasharray: `${length} ${circumference - length}`,
      strokeDashoffset: -offset,
    };
    offset += length;
    return seg;
  });

  const totalValue = slices.reduce((s, x) => s + x.value, 0);

  return (
    <div className="rounded-xl border border-border/60 bg-background p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <div className="relative shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Portfolio Verteilung"
        >
          <title>Portfolio Verteilung</title>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="oklch(0.18 0.015 265)"
            strokeWidth={stroke}
          />
          {segments.map((s) => (
            <circle
              key={s.coinId}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={s.strokeDasharray}
              strokeDashoffset={s.strokeDashoffset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Gesamt
          </p>
          <p className="text-base font-mono font-bold text-foreground tabular-nums">
            {privacy ? mask(formatPrice(totalValue)) : formatPrice(totalValue)}
          </p>
        </div>
      </div>
      <ul className="flex-1 w-full space-y-2">
        {slices.map((s) => (
          <li key={s.coinId} className="flex items-center gap-2.5 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ background: s.color }}
            />
            {s.image && (
              <img
                src={s.image}
                alt={s.name}
                className="w-5 h-5 rounded-full shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.visibility = "hidden";
                }}
              />
            )}
            <span className="font-medium text-foreground truncate flex-1 min-w-0">
              {s.symbol}
            </span>
            <span className="text-muted-foreground tabular-nums text-xs shrink-0">
              {(s.share * 100).toLocaleString("de-DE", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}{" "}
              %
            </span>
            <span className="font-mono text-foreground tabular-nums text-xs shrink-0 w-20 text-right">
              {privacy ? mask(formatPrice(s.value)) : formatPrice(s.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
