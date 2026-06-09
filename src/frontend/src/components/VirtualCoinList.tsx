import { CoinRow } from "@/components/CoinRow";
import type { PriceDirection } from "@/hooks/usePriceDirections";
import type { Coin, Timeframe } from "@/types/coin";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface VirtualCoinListProps {
  coins: Coin[];
  timeframe: Timeframe;
  watchlistHas: (id: string) => boolean;
  flashes: Record<string, PriceDirection>;
  onToggleFavorite: (id: string) => void;
  onSelect: (coin: Coin) => void;
  estimatedRowHeight?: number;
  onEndReached?: () => void;
  /** Bust row memoization when display currency/language changes. */
  currencyKey?: string;
}

/**
 * Virtualized list of coin rows backed by the window scroll, so the whole page
 * scrolls as one unit (no separate inner scrollbar). Renders only ~15-20 rows
 * at a time even with 1000 coins loaded.
 *
 * The list's distance from the top of the page (scrollMargin) is re-measured
 * whenever anything above it reflows — the async-loading GlobalStatsBar and
 * TopMovers change height after mount, and a stale offset is exactly what made
 * the first row slide under the sticky column header.
 */
export function VirtualCoinList({
  coins,
  timeframe,
  watchlistHas,
  flashes,
  onToggleFavorite,
  onSelect,
  estimatedRowHeight = 64,
  onEndReached,
  currencyKey,
}: VirtualCoinListProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  // Keep the scrollMargin in sync with the list's real page offset. We measure
  // on mount and again whenever the document or the content above the list
  // resizes (stats/top-movers loading in), so the first row is never
  // mispositioned under the sticky header.
  useLayoutEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      setOffset((prev) => (Math.abs(prev - top) > 0.5 ? top : prev));
    };

    measure();

    const ro = new ResizeObserver(measure);
    // Observe the body so any layout change above the list re-triggers measure.
    ro.observe(document.body);
    if (el.parentElement) ro.observe(el.parentElement);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: coins.length,
    estimateSize: () => estimatedRowHeight,
    overscan: 8,
    scrollMargin: offset,
  });

  const items = virtualizer.getVirtualItems();
  const lastItem = items[items.length - 1];
  useEffect(() => {
    if (!onEndReached) return;
    if (!lastItem) return;
    if (lastItem.index >= coins.length - 5) {
      onEndReached();
    }
  }, [lastItem, coins.length, onEndReached]);

  return (
    <div ref={parentRef} data-ocid="market.virtual_list">
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
          width: "100%",
        }}
      >
        {items.map((vi) => {
          const coin = coins[vi.index];
          return (
            <div
              key={coin.id}
              data-index={vi.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${vi.start - offset}px)`,
              }}
            >
              <CoinRow
                coin={coin}
                rank={coin.marketCapRank}
                timeframe={timeframe}
                isFavorite={watchlistHas(coin.id)}
                flash={flashes[coin.id] ?? null}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelect}
                currencyKey={currencyKey}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
