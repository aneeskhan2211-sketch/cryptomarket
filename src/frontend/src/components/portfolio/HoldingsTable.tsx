import { formatPercent, formatPrice, formatQuantity } from "@/lib/format";
import type { Coin } from "@/types/coin";
import type { Holding } from "@/types/portfolio";
import { ArrowUpDownIcon } from "lucide-react";
import { useMemo, useState } from "react";

type SortKey = "value" | "quantity" | "price" | "pnl" | "pnlPct";
type SortDir = "asc" | "desc";

interface HoldingRow {
  holding: Holding;
  coin?: Coin;
  price: number;
  value: number;
  pnl: number;
  pnlPct: number;
}

interface HoldingsTableProps {
  holdings: Holding[];
  coinsById: Map<string, Coin>;
  privacy: boolean;
  onSelect?: (coinId: string) => void;
}

function mask(s: string): string {
  return s.replace(/[0-9\-+.,]/g, "•");
}

export function HoldingsTable({
  holdings,
  coinsById,
  privacy,
  onSelect,
}: HoldingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const rows = useMemo<HoldingRow[]>(() => {
    const arr = holdings
      .filter((h) => h.quantity > 0)
      .map((h) => {
        const coin = coinsById.get(h.coinId);
        const price = coin?.currentPrice ?? 0;
        const value = h.quantity * price;
        const pnl = value - h.costBasis;
        const pnlPct = h.costBasis > 0 ? (pnl / h.costBasis) * 100 : 0;
        return { holding: h, coin, price, value, pnl, pnlPct };
      });
    arr.sort((a, b) => {
      let d = 0;
      if (sortKey === "value") d = a.value - b.value;
      else if (sortKey === "quantity")
        d = a.holding.quantity - b.holding.quantity;
      else if (sortKey === "price") d = a.price - b.price;
      else if (sortKey === "pnl") d = a.pnl - b.pnl;
      else d = a.pnlPct - b.pnlPct;
      return sortDir === "asc" ? d : -d;
    });
    return arr;
  }, [holdings, coinsById, sortKey, sortDir]);

  function handleSort(k: SortKey) {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("desc");
    }
  }

  function Col({
    k,
    label,
    className,
  }: { k: SortKey; label: string; className?: string }) {
    const active = sortKey === k;
    return (
      <button
        type="button"
        onClick={() => handleSort(k)}
        className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider transition-colors ${
          active
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        } ${className ?? ""}`}
        data-ocid={`portfolio.holdings.sort_${k}`}
      >
        {label}
        <ArrowUpDownIcon
          className={`w-3 h-3 transition-opacity ${active ? "opacity-100" : "opacity-40"} ${
            active && sortDir === "asc" ? "rotate-180" : ""
          }`}
        />
      </button>
    );
  }

  if (rows.length === 0) {
    return (
      <div
        className="rounded-xl border border-border/60 bg-background py-10 text-center"
        data-ocid="portfolio.holdings.empty"
      >
        <p className="text-sm text-muted-foreground">Noch keine Bestände.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Tippe auf „Neue Transaktion" um deinen ersten Kauf zu erfassen.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-background overflow-hidden shadow-subtle">
      <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 border-b border-border/60 bg-muted/20">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
          Asset
        </span>
        <Col k="price" label="Preis" className="hidden sm:flex justify-end" />
        <Col
          k="quantity"
          label="Bestände"
          className="justify-end hidden sm:flex"
        />
        <Col k="value" label="Wert" className="justify-end" />
        <Col k="pnl" label="G/V" className="justify-end" />
      </div>

      {rows.map(({ holding, coin, price, value, pnl, pnlPct }) => {
        const pos = pnl >= 0;
        return (
          <button
            key={holding.coinId}
            type="button"
            onClick={() => onSelect?.(holding.coinId)}
            className="w-full grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 sm:gap-4 items-center px-3 sm:px-4 py-3 border-b border-border/40 last:border-b-0 hover:bg-card/60 transition-colors text-left"
            data-ocid={`portfolio.holdings.row.${holding.coinId}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {coin?.image ? (
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-8 h-8 rounded-full shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted shrink-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  {holding.symbol.slice(0, 2)}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-display font-semibold text-foreground truncate leading-tight">
                  {coin?.name ?? holding.symbol}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {holding.symbol}
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right shrink-0">
              <p className="text-sm font-mono text-foreground tabular-nums">
                {formatPrice(price)}
              </p>
              {coin && (
                <p
                  className={`text-[10px] font-semibold tabular-nums ${coin.priceChangePercentage24h >= 0 ? "text-price-up" : "text-price-down"}`}
                >
                  {formatPercent(coin.priceChangePercentage24h)}
                </p>
              )}
            </div>
            <div className="hidden sm:block text-right shrink-0">
              <p className="text-sm font-mono text-foreground tabular-nums">
                {privacy ? "••••" : formatQuantity(holding.quantity)}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {holding.symbol}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-mono font-semibold text-foreground tabular-nums">
                {privacy ? mask(formatPrice(value)) : formatPrice(value)}
              </p>
              <p className="text-[10px] text-muted-foreground sm:hidden tabular-nums">
                {privacy ? "••••" : formatQuantity(holding.quantity)}{" "}
                {holding.symbol}
              </p>
            </div>
            <div
              className={`text-right shrink-0 ${pos ? "text-price-up" : "text-price-down"}`}
            >
              <p className="text-sm font-mono font-semibold tabular-nums">
                {privacy ? mask(formatPrice(pnl)) : formatPrice(pnl)}
              </p>
              <p className="text-[10px] font-semibold tabular-nums">
                {formatPercent(pnlPct)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
