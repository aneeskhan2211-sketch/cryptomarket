import { c as createLucideIcon, b as useSettings, q as useMarketDataInfinite, r as reactExports, j as jsxRuntimeExports, B as useNavigate, C as useSearch, X } from "./index-CAwuyKvd.js";
import { L as Layout } from "./Layout-CGMG0XZW.js";
import { S as Sparkline } from "./Sparkline-zLfJmUPg.js";
import { P as Plus } from "./plus-BGE87G-4.js";
import { S as Search } from "./search-D6LFxpVr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
];
const ArrowRightLeft = createLucideIcon("arrow-right-left", __iconNode);
function useCompareCoins() {
  const navigate = useNavigate({ from: "/compare" });
  const search = useSearch({ from: "/compare" });
  const selectedIds = reactExports.useMemo(() => {
    const raw = search.coins ?? "";
    if (!raw) return [];
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }, [search.coins]);
  const setSelectedIds = reactExports.useCallback(
    (ids) => {
      const next = ids.length > 0 ? { coins: ids.join(",") } : {};
      navigate({ search: next, replace: true });
    },
    [navigate]
  );
  const addCoin = reactExports.useCallback(
    (id) => {
      if (selectedIds.includes(id)) return;
      if (selectedIds.length >= 4) return;
      setSelectedIds([...selectedIds, id]);
    },
    [selectedIds, setSelectedIds]
  );
  const removeCoin = reactExports.useCallback(
    (id) => {
      setSelectedIds(selectedIds.filter((c) => c !== id));
    },
    [selectedIds, setSelectedIds]
  );
  return { selectedIds, addCoin, removeCoin };
}
function CoinSearchInput({
  query,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value: query,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "w-full pl-9 pr-9 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
        "data-ocid": "compare.search_input"
      }
    ),
    query && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(""),
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
        "aria-label": "Clear search",
        "data-ocid": "compare.search_clear",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
      }
    )
  ] });
}
function CoinSelector({
  coins,
  selectedIds,
  onAdd,
  onRemove,
  t
}) {
  const [query, setQuery] = reactExports.useState("");
  const atMax = selectedIds.length >= 4;
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coins.slice(0, 20);
    return coins.filter(
      (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [coins, query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CoinSearchInput,
      {
        query,
        onChange: setQuery,
        placeholder: t("market.search")
      }
    ),
    atMax && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Max 4 coins" }),
    selectedIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selectedIds.map((id) => {
      const coin = coins.find((c) => c.id === id);
      if (!coin) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: coin.image,
                alt: "",
                className: "h-4 w-4 rounded-full",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: coin.symbol }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onRemove(id),
                className: "ml-0.5 hover:text-destructive",
                "aria-label": t("compare.remove"),
                "data-ocid": `compare.remove_button.${id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
              }
            )
          ]
        },
        id
      );
    }) }),
    query.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-lg bg-card overflow-hidden max-h-64 overflow-y-auto", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-center text-sm text-muted-foreground", children: t("market.noResults", { query: query.trim() }) }) : filtered.map((coin) => {
      const isSelected = selectedIds.includes(coin.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            if (isSelected) {
              onRemove(coin.id);
            } else if (!atMax) {
              onAdd(coin.id);
            }
            setQuery("");
          },
          disabled: !isSelected && atMax,
          className: `w-full flex items-center gap-3 px-4 py-2.5 text-left transition-smooth hover:bg-muted/50 ${isSelected ? "bg-primary/5" : ""} ${!isSelected && atMax ? "opacity-50 cursor-not-allowed" : ""}`,
          "data-ocid": `compare.coin_option.${coin.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: coin.image,
                alt: "",
                className: "h-6 w-6 rounded-full",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: coin.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: coin.symbol })
            ] }),
            isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" }) : atMax ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-primary" })
          ]
        },
        coin.id
      );
    }) })
  ] });
}
function ComparisonCard({
  coin,
  formatMoney,
  formatMoneyCompact
}) {
  const positive24h = coin.priceChangePercentage24h >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "comparison-card flex flex-col gap-3",
      "data-ocid": `compare.card.${coin.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: coin.image,
              alt: coin.name,
              className: "h-10 w-10 rounded-full",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: coin.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: coin.symbol })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold font-mono text-foreground", children: formatMoney(coin.currentPrice) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `inline-flex items-center gap-1 text-sm font-semibold ${positive24h ? "text-price-up" : "text-price-down"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: positive24h ? "+" : "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                coin.priceChangePercentage24h.toLocaleString(void 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }),
                "%"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Sparkline,
          {
            data: coin.sparkline7d,
            positive: positive24h,
            width: 240,
            height: 48,
            showFill: true
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-label", children: "Market Cap" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-value", children: formatMoneyCompact(coin.marketCap) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-label", children: "24h Volume" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-value", children: formatMoneyCompact(coin.totalVolume) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-label", children: "1h %" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `comparison-row-value ${coin.priceChangePercentage1h >= 0 ? "text-price-up" : "text-price-down"}`,
                children: [
                  coin.priceChangePercentage1h >= 0 ? "+" : "",
                  coin.priceChangePercentage1h.toLocaleString(void 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }),
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-label", children: "7d %" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `comparison-row-value ${coin.priceChangePercentage7d >= 0 ? "text-price-up" : "text-price-down"}`,
                children: [
                  coin.priceChangePercentage7d >= 0 ? "+" : "",
                  coin.priceChangePercentage7d.toLocaleString(void 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }),
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "comparison-row-label", children: "Rank" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "comparison-row-value", children: [
              "#",
              coin.marketCapRank
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ComparisonTable({
  coins,
  formatMoney,
  formatMoneyCompact
}) {
  if (coins.length === 0) return null;
  const rows = [
    {
      label: "Price",
      key: "price",
      fmt: (c) => formatMoney(c.currentPrice)
    },
    {
      label: "Market Cap",
      key: "mcap",
      fmt: (c) => formatMoneyCompact(c.marketCap)
    },
    {
      label: "24h Volume",
      key: "vol",
      fmt: (c) => formatMoneyCompact(c.totalVolume)
    },
    {
      label: "1h %",
      key: "1h",
      fmt: (c) => `${c.priceChangePercentage1h >= 0 ? "+" : ""}${c.priceChangePercentage1h.toFixed(2)}%`,
      color: (c) => c.priceChangePercentage1h >= 0 ? "text-price-up" : "text-price-down"
    },
    {
      label: "24h %",
      key: "24h",
      fmt: (c) => `${c.priceChangePercentage24h >= 0 ? "+" : ""}${c.priceChangePercentage24h.toFixed(2)}%`,
      color: (c) => c.priceChangePercentage24h >= 0 ? "text-price-up" : "text-price-down"
    },
    {
      label: "7d %",
      key: "7d",
      fmt: (c) => `${c.priceChangePercentage7d >= 0 ? "+" : ""}${c.priceChangePercentage7d.toFixed(2)}%`,
      color: (c) => c.priceChangePercentage7d >= 0 ? "text-price-up" : "text-price-down"
    },
    { label: "Rank", key: "rank", fmt: (c) => `#${c.marketCapRank}` }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border sticky left-0 bg-background z-10", children: "Metric" }),
      coins.map((coin) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-3 px-4 border-b border-border min-w-[160px]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: coin.image,
                alt: coin.name,
                className: "h-6 w-6 rounded-full",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: coin.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: coin.symbol })
            ] })
          ] })
        },
        coin.id
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
      rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-background z-10", children: row.label }),
            coins.map((coin) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: `py-3 px-4 text-sm font-mono font-semibold ${"color" in row ? row.color(coin) : "text-foreground"}`,
                children: row.fmt(coin)
              },
              coin.id + row.key
            ))
          ]
        },
        row.key
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-background z-10", children: "7d Trend" }),
        coins.map((coin) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Sparkline,
          {
            data: coin.sparkline7d,
            positive: coin.priceChangePercentage24h >= 0,
            width: 140,
            height: 40,
            showFill: true
          }
        ) }, `${coin.id}spark`))
      ] })
    ] })
  ] }) });
}
function EmptyState({ t }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 px-4 text-center",
      "data-ocid": "compare.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightLeft, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: t("compare.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "Search and add coins to compare them side-by-side" })
      ]
    }
  );
}
function ComparePage() {
  const { t, formatMoney, formatMoneyCompact } = useSettings();
  const { data: pages } = useMarketDataInfinite();
  const { selectedIds, addCoin, removeCoin } = useCompareCoins();
  const allCoins = reactExports.useMemo(() => {
    var _a;
    if (!pages) return [];
    return ((_a = pages.pages[0]) == null ? void 0 : _a.coins) ?? [];
  }, [pages]);
  const selectedCoins = reactExports.useMemo(() => {
    const map = new Map(allCoins.map((c) => [c.id, c]));
    return selectedIds.map((id) => map.get(id)).filter((c) => c !== void 0);
  }, [allCoins, selectedIds]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightLeft, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: t("compare.title") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CoinSelector,
      {
        coins: allCoins,
        selectedIds,
        onAdd: addCoin,
        onRemove: removeCoin,
        t
      }
    ),
    selectedCoins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { t }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ComparisonTable,
        {
          coins: selectedCoins,
          formatMoney,
          formatMoneyCompact
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden", children: selectedCoins.map((coin) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ComparisonCard,
        {
          coin,
          formatMoney,
          formatMoneyCompact
        },
        coin.id
      )) })
    ] })
  ] }) });
}
export {
  ComparePage as default
};
