import { Layout } from "@/components/Layout";
import { Sparkline } from "@/components/Sparkline";
import { useSettings } from "@/contexts/SettingsContext";
import { useMarketDataInfinite } from "@/lib/api";
import type { Coin } from "@/types/coin";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRightLeft, Plus, Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

function useCompareCoins() {
  const navigate = useNavigate({ from: "/compare" });
  const search = useSearch({ from: "/compare" }) as { coins?: string };

  const selectedIds = useMemo(() => {
    const raw = search.coins ?? "";
    if (!raw) return [];
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [search.coins]);

  const setSelectedIds = useCallback(
    (ids: string[]) => {
      const next = ids.length > 0 ? { coins: ids.join(",") } : {};
      navigate({ search: next, replace: true });
    },
    [navigate],
  );

  const addCoin = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) return;
      if (selectedIds.length >= 4) return;
      setSelectedIds([...selectedIds, id]);
    },
    [selectedIds, setSelectedIds],
  );

  const removeCoin = useCallback(
    (id: string) => {
      setSelectedIds(selectedIds.filter((c) => c !== id));
    },
    [selectedIds, setSelectedIds],
  );

  return { selectedIds, addCoin, removeCoin };
}

function CoinSearchInput({
  query,
  onChange,
  placeholder,
}: {
  query: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        data-ocid="compare.search_input"
      />
      {query && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
          data-ocid="compare.search_clear"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function CoinSelector({
  coins,
  selectedIds,
  onAdd,
  onRemove,
  t,
}: {
  coins: Coin[];
  selectedIds: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  const [query, setQuery] = useState("");
  const atMax = selectedIds.length >= 4;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coins.slice(0, 20);
    return coins
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q),
      )
      .slice(0, 20);
  }, [coins, query]);

  return (
    <div className="space-y-3">
      <CoinSearchInput
        query={query}
        onChange={setQuery}
        placeholder={t("market.search")}
      />

      {atMax && <p className="text-xs text-muted-foreground">Max 4 coins</p>}

      {/* Selected chips */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIds.map((id) => {
            const coin = coins.find((c) => c.id === id);
            if (!coin) return null;
            return (
              <div
                key={id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
              >
                <img
                  src={coin.image}
                  alt=""
                  className="h-4 w-4 rounded-full"
                  loading="lazy"
                />
                <span>{coin.symbol}</span>
                <button
                  type="button"
                  onClick={() => onRemove(id)}
                  className="ml-0.5 hover:text-destructive"
                  aria-label={t("compare.remove")}
                  data-ocid={`compare.remove_button.${id}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Search results */}
      {query.trim() && (
        <div className="border border-border rounded-lg bg-card overflow-hidden max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              {t("market.noResults", { query: query.trim() })}
            </div>
          ) : (
            filtered.map((coin) => {
              const isSelected = selectedIds.includes(coin.id);
              return (
                <button
                  key={coin.id}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      onRemove(coin.id);
                    } else if (!atMax) {
                      onAdd(coin.id);
                    }
                    setQuery("");
                  }}
                  disabled={!isSelected && atMax}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-smooth hover:bg-muted/50 ${
                    isSelected ? "bg-primary/5" : ""
                  } ${!isSelected && atMax ? "opacity-50 cursor-not-allowed" : ""}`}
                  data-ocid={`compare.coin_option.${coin.id}`}
                >
                  <img
                    src={coin.image}
                    alt=""
                    className="h-6 w-6 rounded-full"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {coin.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {coin.symbol}
                    </p>
                  </div>
                  {isSelected ? (
                    <X className="h-4 w-4 text-muted-foreground" />
                  ) : atMax ? null : (
                    <Plus className="h-4 w-4 text-primary" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function ComparisonCard({
  coin,
  formatMoney,
  formatMoneyCompact,
}: {
  coin: Coin;
  formatMoney: (v: number) => string;
  formatMoneyCompact: (v: number) => string;
}) {
  const positive24h = coin.priceChangePercentage24h >= 0;

  return (
    <div
      className="comparison-card flex flex-col gap-3"
      data-ocid={`compare.card.${coin.id}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="h-10 w-10 rounded-full"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {coin.name}
          </p>
          <p className="text-xs text-muted-foreground">{coin.symbol}</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-2xl font-bold font-mono text-foreground">
        {formatMoney(coin.currentPrice)}
      </div>

      {/* 24h change */}
      <div
        className={`inline-flex items-center gap-1 text-sm font-semibold ${
          positive24h ? "text-price-up" : "text-price-down"
        }`}
      >
        <span>{positive24h ? "+" : ""}</span>
        <span>
          {coin.priceChangePercentage24h.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          %
        </span>
      </div>

      {/* Sparkline */}
      <div className="py-1">
        <Sparkline
          data={coin.sparkline7d}
          positive={positive24h}
          width={240}
          height={48}
          showFill
        />
      </div>

      {/* Stats rows */}
      <div className="space-y-0">
        <div className="comparison-row">
          <span className="comparison-row-label">Market Cap</span>
          <span className="comparison-row-value">
            {formatMoneyCompact(coin.marketCap)}
          </span>
        </div>
        <div className="comparison-row">
          <span className="comparison-row-label">24h Volume</span>
          <span className="comparison-row-value">
            {formatMoneyCompact(coin.totalVolume)}
          </span>
        </div>
        <div className="comparison-row">
          <span className="comparison-row-label">1h %</span>
          <span
            className={`comparison-row-value ${
              coin.priceChangePercentage1h >= 0
                ? "text-price-up"
                : "text-price-down"
            }`}
          >
            {coin.priceChangePercentage1h >= 0 ? "+" : ""}
            {coin.priceChangePercentage1h.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </span>
        </div>
        <div className="comparison-row">
          <span className="comparison-row-label">7d %</span>
          <span
            className={`comparison-row-value ${
              coin.priceChangePercentage7d >= 0
                ? "text-price-up"
                : "text-price-down"
            }`}
          >
            {coin.priceChangePercentage7d >= 0 ? "+" : ""}
            {coin.priceChangePercentage7d.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </span>
        </div>
        <div className="comparison-row">
          <span className="comparison-row-label">Rank</span>
          <span className="comparison-row-value">#{coin.marketCapRank}</span>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable({
  coins,
  formatMoney,
  formatMoneyCompact,
}: {
  coins: Coin[];
  formatMoney: (v: number) => string;
  formatMoneyCompact: (v: number) => string;
}) {
  if (coins.length === 0) return null;

  const rows = [
    {
      label: "Price",
      key: "price",
      fmt: (c: Coin) => formatMoney(c.currentPrice),
    },
    {
      label: "Market Cap",
      key: "mcap",
      fmt: (c: Coin) => formatMoneyCompact(c.marketCap),
    },
    {
      label: "24h Volume",
      key: "vol",
      fmt: (c: Coin) => formatMoneyCompact(c.totalVolume),
    },
    {
      label: "1h %",
      key: "1h",
      fmt: (c: Coin) =>
        `${c.priceChangePercentage1h >= 0 ? "+" : ""}${c.priceChangePercentage1h.toFixed(2)}%`,
      color: (c: Coin) =>
        c.priceChangePercentage1h >= 0 ? "text-price-up" : "text-price-down",
    },
    {
      label: "24h %",
      key: "24h",
      fmt: (c: Coin) =>
        `${c.priceChangePercentage24h >= 0 ? "+" : ""}${c.priceChangePercentage24h.toFixed(2)}%`,
      color: (c: Coin) =>
        c.priceChangePercentage24h >= 0 ? "text-price-up" : "text-price-down",
    },
    {
      label: "7d %",
      key: "7d",
      fmt: (c: Coin) =>
        `${c.priceChangePercentage7d >= 0 ? "+" : ""}${c.priceChangePercentage7d.toFixed(2)}%`,
      color: (c: Coin) =>
        c.priceChangePercentage7d >= 0 ? "text-price-up" : "text-price-down",
    },
    { label: "Rank", key: "rank", fmt: (c: Coin) => `#${c.marketCapRank}` },
  ] as const;

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border sticky left-0 bg-background z-10">
              Metric
            </th>
            {coins.map((coin) => (
              <th
                key={coin.id}
                className="text-left py-3 px-4 border-b border-border min-w-[160px]"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="h-6 w-6 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {coin.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {coin.symbol}
                    </p>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.key}
              className="border-b border-border/50 last:border-0"
            >
              <td className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-background z-10">
                {row.label}
              </td>
              {coins.map((coin) => (
                <td
                  key={coin.id + row.key}
                  className={`py-3 px-4 text-sm font-mono font-semibold ${
                    "color" in row ? row.color(coin) : "text-foreground"
                  }`}
                >
                  {row.fmt(coin)}
                </td>
              ))}
            </tr>
          ))}
          {/* Sparkline row */}
          <tr>
            <td className="py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-background z-10">
              7d Trend
            </td>
            {coins.map((coin) => (
              <td key={`${coin.id}spark`} className="py-3 px-4">
                <Sparkline
                  data={coin.sparkline7d}
                  positive={coin.priceChangePercentage24h >= 0}
                  width={140}
                  height={40}
                  showFill
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ t }: { t: (key: string) => string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      data-ocid="compare.empty_state"
    >
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <ArrowRightLeft className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {t("compare.title")}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Search and add coins to compare them side-by-side
      </p>
    </div>
  );
}

export default function ComparePage() {
  const { t, formatMoney, formatMoneyCompact } = useSettings();
  const { data: pages } = useMarketDataInfinite();
  const { selectedIds, addCoin, removeCoin } = useCompareCoins();

  const allCoins = useMemo(() => {
    if (!pages) return [];
    return pages.pages[0]?.coins ?? [];
  }, [pages]);

  const selectedCoins = useMemo(() => {
    const map = new Map(allCoins.map((c) => [c.id, c]));
    return selectedIds
      .map((id) => map.get(id))
      .filter((c): c is Coin => c !== undefined);
  }, [allCoins, selectedIds]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center gap-3">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">
            {t("compare.title")}
          </h1>
        </div>

        {/* Coin selector */}
        <CoinSelector
          coins={allCoins}
          selectedIds={selectedIds}
          onAdd={addCoin}
          onRemove={removeCoin}
          t={t}
        />

        {/* Comparison content */}
        {selectedCoins.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          <div className="space-y-6">
            {/* Desktop table */}
            <ComparisonTable
              coins={selectedCoins}
              formatMoney={formatMoney}
              formatMoneyCompact={formatMoneyCompact}
            />

            {/* Mobile cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {selectedCoins.map((coin) => (
                <ComparisonCard
                  key={coin.id}
                  coin={coin}
                  formatMoney={formatMoney}
                  formatMoneyCompact={formatMoneyCompact}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
