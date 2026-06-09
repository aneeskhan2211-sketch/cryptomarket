import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as formatPrice, g as formatPercent, t as formatQuantity, S as Skeleton, b as useSettings, X, q as useMarketDataInfinite } from "./index-CAwuyKvd.js";
import { D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, h as Label, I as Input, B as Button, P as Pencil, L as Layout } from "./Layout-CGMG0XZW.js";
import { A as ArrowUpDown, L as LoginPrompt } from "./LoginPrompt-BA2toAdN.js";
import { R as ResponsiveContainer, r as AreaChart, s as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, p as Area, t as TrendingDown } from "./AreaChart-DWvYJu2m.js";
import { S as Search } from "./search-D6LFxpVr.js";
import { A as ArrowUpRight, u as usePortfolioChart } from "./usePortfolioChart-CfulEvlO.js";
import { u as usePortfolio } from "./usePortfolio-CAwpzsz8.js";
import { P as Plus } from "./plus-BGE87G-4.js";
import "./index-D4u-7GDa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
];
const ArrowDownLeft = createLucideIcon("arrow-down-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }]
];
const Trash = createLucideIcon("trash", __iconNode);
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
  "oklch(0.65 0.2 235)"
];
function mask$2(s) {
  return s.replace(/[0-9\-+.,]/g, "•");
}
function AllocationChart({
  holdings,
  coinsById,
  privacy
}) {
  const slices = reactExports.useMemo(() => {
    const enriched = holdings.filter((h) => h.quantity > 0).map((h) => {
      const coin = coinsById.get(h.coinId);
      const value = h.quantity * ((coin == null ? void 0 : coin.currentPrice) ?? 0);
      return {
        coinId: h.coinId,
        symbol: h.symbol,
        name: (coin == null ? void 0 : coin.name) ?? h.symbol,
        value,
        image: coin == null ? void 0 : coin.image
      };
    }).filter((x) => x.value > 0);
    const total = enriched.reduce((s, x) => s + x.value, 0);
    if (total === 0) return [];
    return enriched.map((x) => ({ ...x, share: x.value / total })).sort((a, b) => b.share - a.share).map((x, i) => ({ ...x, color: PALETTE[i % PALETTE.length] }));
  }, [holdings, coinsById]);
  if (slices.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-background py-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Keine Bestände für die Verteilung." }) });
  }
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
      strokeDashoffset: -offset
    };
    offset += length;
    return seg;
  });
  const totalValue = slices.reduce((s, x) => s + x.value, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-background p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: size,
          height: size,
          viewBox: `0 0 ${size} ${size}`,
          role: "img",
          "aria-label": "Portfolio Verteilung",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Portfolio Verteilung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx,
                cy,
                r,
                fill: "none",
                stroke: "oklch(0.18 0.015 265)",
                strokeWidth: stroke
              }
            ),
            segments.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx,
                cy,
                r,
                fill: "none",
                stroke: s.color,
                strokeWidth: stroke,
                strokeDasharray: s.strokeDasharray,
                strokeDashoffset: s.strokeDashoffset,
                transform: `rotate(-90 ${cx} ${cy})`,
                strokeLinecap: "butt"
              },
              s.coinId
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Gesamt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-mono font-bold text-foreground tabular-nums", children: privacy ? mask$2(formatPrice(totalValue)) : formatPrice(totalValue) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex-1 w-full space-y-2", children: slices.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2.5 h-2.5 rounded-sm shrink-0",
          style: { background: s.color }
        }
      ),
      s.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: s.image,
          alt: s.name,
          className: "w-5 h-5 rounded-full shrink-0",
          onError: (e) => {
            e.target.style.visibility = "hidden";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate flex-1 min-w-0", children: s.symbol }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground tabular-nums text-xs shrink-0", children: [
        (s.share * 100).toLocaleString("de-DE", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        }),
        " ",
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground tabular-nums text-xs shrink-0 w-20 text-right", children: privacy ? mask$2(formatPrice(s.value)) : formatPrice(s.value) })
    ] }, s.coinId)) })
  ] });
}
function mask$1(s) {
  return s.replace(/[0-9\-+.,]/g, "•");
}
function HoldingsTable({
  holdings,
  coinsById,
  privacy,
  onSelect
}) {
  const [sortKey, setSortKey] = reactExports.useState("value");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const rows = reactExports.useMemo(() => {
    const arr = holdings.filter((h) => h.quantity > 0).map((h) => {
      const coin = coinsById.get(h.coinId);
      const price = (coin == null ? void 0 : coin.currentPrice) ?? 0;
      const value = h.quantity * price;
      const pnl = value - h.costBasis;
      const pnlPct = h.costBasis > 0 ? pnl / h.costBasis * 100 : 0;
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
  function handleSort(k) {
    if (sortKey === k) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(k);
      setSortDir("desc");
    }
  }
  function Col({
    k,
    label,
    className
  }) {
    const active = sortKey === k;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleSort(k),
        className: `flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"} ${className ?? ""}`,
        "data-ocid": `portfolio.holdings.sort_${k}`,
        children: [
          label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArrowUpDown,
            {
              className: `w-3 h-3 transition-opacity ${active ? "opacity-100" : "opacity-40"} ${active && sortDir === "asc" ? "rotate-180" : ""}`
            }
          )
        ]
      }
    );
  }
  if (rows.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border/60 bg-background py-10 text-center",
        "data-ocid": "portfolio.holdings.empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Noch keine Bestände." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: 'Tippe auf „Neue Transaktion" um deinen ersten Kauf zu erfassen.' })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-background overflow-hidden shadow-subtle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 border-b border-border/60 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground uppercase tracking-wider", children: "Asset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { k: "price", label: "Preis", className: "hidden sm:flex justify-end" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Col,
        {
          k: "quantity",
          label: "Bestände",
          className: "justify-end hidden sm:flex"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { k: "value", label: "Wert", className: "justify-end" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { k: "pnl", label: "G/V", className: "justify-end" })
    ] }),
    rows.map(({ holding, coin, price, value, pnl, pnlPct }) => {
      const pos = pnl >= 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelect == null ? void 0 : onSelect(holding.coinId),
          className: "w-full grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 sm:gap-4 items-center px-3 sm:px-4 py-3 border-b border-border/40 last:border-b-0 hover:bg-card/60 transition-colors text-left",
          "data-ocid": `portfolio.holdings.row.${holding.coinId}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
              (coin == null ? void 0 : coin.image) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: coin.image,
                  alt: coin.name,
                  className: "w-8 h-8 rounded-full shrink-0",
                  onError: (e) => {
                    e.target.style.visibility = "hidden";
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted shrink-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground", children: holding.symbol.slice(0, 2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground truncate leading-tight", children: (coin == null ? void 0 : coin.name) ?? holding.symbol }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: holding.symbol })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-foreground tabular-nums", children: formatPrice(price) }),
              coin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-[10px] font-semibold tabular-nums ${coin.priceChangePercentage24h >= 0 ? "text-price-up" : "text-price-down"}`,
                  children: formatPercent(coin.priceChangePercentage24h)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-foreground tabular-nums", children: privacy ? "••••" : formatQuantity(holding.quantity) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: holding.symbol })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold text-foreground tabular-nums", children: privacy ? mask$1(formatPrice(value)) : formatPrice(value) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground sm:hidden tabular-nums", children: [
                privacy ? "••••" : formatQuantity(holding.quantity),
                " ",
                holding.symbol
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `text-right shrink-0 ${pos ? "text-price-up" : "text-price-down"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold tabular-nums", children: privacy ? mask$1(formatPrice(pnl)) : formatPrice(pnl) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold tabular-nums", children: formatPercent(pnlPct) })
                ]
              }
            )
          ]
        },
        holding.coinId
      );
    })
  ] });
}
function mask(s) {
  return s.replace(/[0-9\-+.,]/g, "•");
}
function PortfolioTooltip(props) {
  const { active, payload, privacy } = props;
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload;
  if (!p) return null;
  const dateStr = new Date(p.timestamp).toLocaleString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const valueStr = formatPrice(p.value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/60 bg-card/95 backdrop-blur-sm px-3 py-2 text-[11px] shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-1", children: dateStr }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground tabular-nums", children: privacy ? mask(valueStr) : valueStr })
  ] });
}
function fmtXAxis(value) {
  return new Date(value).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short"
  });
}
function fmtYAxis(value, privacy) {
  if (privacy) return "•••";
  if (Math.abs(value) >= 1e3)
    return `${Math.round(value).toLocaleString("de-DE")}`;
  if (Math.abs(value) >= 1) return value.toFixed(2);
  return value.toPrecision(2);
}
function PortfolioChart({
  points,
  isLoading,
  loadedCount,
  totalCount,
  privacy
}) {
  const data = reactExports.useMemo(() => {
    if (points.length === 0) return [];
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const p of points) {
      if (seen.has(p.timestamp)) continue;
      seen.add(p.timestamp);
      out.push({ timestamp: p.timestamp, value: p.price });
    }
    out.sort((a, b) => a.timestamp - b.timestamp);
    return out;
  }, [points]);
  const trendPositive = data.length >= 2 && data[data.length - 1].value >= data[0].value;
  const color = trendPositive ? "oklch(0.72 0.22 145)" : "oklch(0.62 0.24 25)";
  const showSkeleton = isLoading && data.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border/50 bg-background/40 p-2 relative",
      style: { height: 236 },
      "data-ocid": "portfolioChart.container",
      children: [
        (() => {
          if (showSkeleton) {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-2 flex flex-col items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-full rounded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "absolute text-[10px] text-muted-foreground", children: [
                "Lade Chart-Daten... ",
                loadedCount,
                "/",
                totalCount
              ] })
            ] });
          }
          if (data.length === 0) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Noch keine Daten — füge eine Transaktion hinzu." }) });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AreaChart,
            {
              data,
              margin: { top: 10, right: 8, left: 0, bottom: 8 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "portfolioFill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: 0.35 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: 0 })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.04)", vertical: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "timestamp",
                    tickFormatter: fmtXAxis,
                    stroke: "rgba(220,220,230,0.45)",
                    fontSize: 10,
                    tickLine: false,
                    axisLine: false,
                    minTickGap: 48
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    dataKey: "value",
                    tickFormatter: (v) => fmtYAxis(v, privacy),
                    stroke: "rgba(220,220,230,0.45)",
                    fontSize: 10,
                    tickLine: false,
                    axisLine: false,
                    width: 60,
                    orientation: "right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    content: /* @__PURE__ */ jsxRuntimeExports.jsx(PortfolioTooltip, { privacy }),
                    cursor: {
                      stroke: "oklch(0.72 0.22 145 / 0.5)",
                      strokeWidth: 1
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Area,
                  {
                    type: "monotone",
                    dataKey: "value",
                    stroke: color,
                    strokeWidth: 2,
                    fill: "url(#portfolioFill)",
                    isAnimationActive: false,
                    dot: false
                  }
                )
              ]
            }
          ) });
        })(),
        !showSkeleton && data.length > 0 && totalCount > loadedCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "absolute top-1 right-2 text-[10px] text-muted-foreground", children: [
          "Lädt... ",
          loadedCount,
          "/",
          totalCount
        ] })
      ]
    }
  );
}
function masked(text) {
  return text.replace(/[0-9\-+.,]/g, "•");
}
function PortfolioSummaryCards({
  summary,
  privacy,
  onTogglePrivacy
}) {
  const { t } = useSettings();
  const fmt = (s) => privacy ? masked(s) : s;
  const valueStr = formatPrice(summary.totalValue);
  const allTimePct = formatPercent(summary.totalPnLPercent);
  const day24Pct = formatPercent(summary.change24hPercent);
  const pnlPos = summary.totalPnL >= 0;
  const day24Pos = summary.change24hPercent >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-2xl bg-card border border-border/60 p-4 sm:p-5 mb-4",
      "data-ocid": "portfolio.summary",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-3xl sm:text-4xl font-display font-bold text-foreground tabular-nums tracking-tight",
              "data-ocid": "portfolio.totalValue",
              children: fmt(valueStr)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onTogglePrivacy,
              className: "text-muted-foreground hover:text-foreground transition-colors shrink-0",
              "aria-label": privacy ? t("portfolio.showValues") : t("portfolio.hideValues"),
              "data-ocid": "portfolio.privacy_toggle",
              children: privacy ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-col gap-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs w-16 shrink-0", children: t("portfolio.summary.value24h") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground tabular-nums text-xs", children: fmt(
              formatPrice(
                summary.totalValue * summary.change24hPercent / 100
              )
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold tabular-nums ${day24Pos ? "text-price-up" : "text-price-down"}`,
                children: day24Pct
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs w-16 shrink-0", children: t("portfolio.summary.allTime") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground tabular-nums text-xs", children: fmt(formatPrice(summary.totalPnL)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold tabular-nums ${pnlPos ? "text-price-up" : "text-price-down"}`,
                children: allTimePct
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}
const TX_KIND_LABELS = {
  buy: "Kauf",
  sell: "Verkauf",
  transfer_in: "Transfer rein",
  transfer_out: "Transfer raus"
};
const TX_KIND_COLORS = {
  buy: "text-price-up",
  sell: "text-price-down",
  transfer_in: "text-muted-foreground",
  transfer_out: "text-muted-foreground"
};
const PORTFOLIO_TIMEFRAMES = [
  "24h",
  "7d",
  "30d",
  "90d",
  "1y",
  "all"
];
function portfolioTfToDays(tf) {
  switch (tf) {
    case "24h":
      return 1;
    case "7d":
      return 7;
    case "30d":
      return 30;
    case "90d":
      return 90;
    case "1y":
      return 365;
    case "all":
      return 0;
  }
}
function portfolioTfLabel(tf) {
  switch (tf) {
    case "24h":
      return "24 Std";
    case "7d":
      return "7 T";
    case "30d":
      return "30 T";
    case "90d":
      return "90 T";
    case "1y":
      return "1 J";
    case "all":
      return "Alle";
  }
}
const KINDS = ["buy", "sell", "transfer_in", "transfer_out"];
function todayIso() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromTimestamp(ms) {
  const d = new Date(ms);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function TransactionModal({
  open,
  onOpenChange,
  availableCoins,
  initialCoinId,
  editTx,
  onSubmit
}) {
  const [kind, setKind] = reactExports.useState("buy");
  const [coinId, setCoinId] = reactExports.useState(null);
  const [coinSearch, setCoinSearch] = reactExports.useState("");
  const [pickerOpen, setPickerOpen] = reactExports.useState(false);
  const [quantity, setQuantity] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [date, setDate] = reactExports.useState(todayIso());
  const [notes, setNotes] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!open) return;
    if (editTx) {
      setKind(editTx.kind);
      setCoinId(editTx.coinId);
      setCoinSearch("");
      setQuantity(String(editTx.quantity));
      setPrice(String(editTx.pricePerUnit));
      setDate(fromTimestamp(editTx.timestamp));
      setNotes(editTx.notes ?? "");
    } else {
      setKind("buy");
      setCoinId(initialCoinId ?? null);
      setCoinSearch("");
      setQuantity("");
      setPrice("");
      setDate(todayIso());
      setNotes("");
    }
    setPickerOpen(false);
  }, [open, editTx, initialCoinId]);
  const coinsById = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const c of availableCoins) m.set(c.id, c);
    return m;
  }, [availableCoins]);
  const selectedCoin = coinId ? coinsById.get(coinId) : null;
  reactExports.useEffect(() => {
    if (!selectedCoin) return;
    if (price !== "") return;
    if (editTx) return;
    if (kind === "transfer_in" || kind === "transfer_out") return;
    setPrice(String(selectedCoin.currentPrice));
  }, [selectedCoin, price, editTx, kind]);
  const filteredCoins = reactExports.useMemo(() => {
    const q = coinSearch.trim().toLowerCase();
    if (!q) return availableCoins.slice(0, 50);
    return availableCoins.filter(
      (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [availableCoins, coinSearch]);
  const canSubmit = coinId !== null && quantity !== "" && Number.parseFloat(quantity) > 0 && (kind === "transfer_in" || kind === "transfer_out" || price !== "" && Number.parseFloat(price) >= 0);
  function handleSubmit() {
    if (!canSubmit || !coinId) return;
    const coin = coinsById.get(coinId);
    onSubmit({
      id: editTx == null ? void 0 : editTx.id,
      kind,
      coinId,
      symbol: (coin == null ? void 0 : coin.symbol) ?? (editTx == null ? void 0 : editTx.symbol) ?? "",
      quantity: Number.parseFloat(quantity),
      pricePerUnit: price === "" ? 0 : Number.parseFloat(price),
      timestamp: new Date(date).getTime(),
      notes: notes.trim() || void 0
    });
    onOpenChange(false);
  }
  const showPrice = kind === "buy" || kind === "sell";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border/60 max-w-md p-0",
      "data-ocid": "portfolio.tx_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-5 pt-5 pb-3 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg font-display font-bold text-foreground", children: editTx ? "Transaktion bearbeiten" : "Neue Transaktion" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5 rounded-lg border border-border/60 bg-background p-1", children: KINDS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setKind(k),
              className: `px-2 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors ${kind === k ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `portfolio.tx_modal.kind_${k}`,
              children: TX_KIND_LABELS[k]
            },
            k
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Coin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPickerOpen((v) => !v),
                className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-background hover:bg-card/60 transition-colors text-left",
                "data-ocid": "portfolio.tx_modal.coin_picker_toggle",
                children: [
                  selectedCoin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: selectedCoin.image,
                        alt: selectedCoin.name,
                        className: "w-6 h-6 rounded-full shrink-0",
                        onError: (e) => {
                          e.target.style.visibility = "hidden";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground truncate flex-1", children: selectedCoin.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: selectedCoin.symbol })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Coin auswählen..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground shrink-0" })
                ]
              }
            ),
            pickerOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-background overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: coinSearch,
                    onChange: (e) => setCoinSearch(e.target.value),
                    placeholder: "Name oder Symbol...",
                    className: "pl-9 border-0 border-b border-border/60 rounded-none bg-transparent focus:ring-0",
                    autoFocus: true,
                    "data-ocid": "portfolio.tx_modal.coin_search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto", children: filteredCoins.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-4 text-xs text-muted-foreground text-center", children: "Keine Coins gefunden." }) : filteredCoins.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setCoinId(c.id);
                    setPickerOpen(false);
                    setCoinSearch("");
                    if (!editTx) setPrice("");
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 hover:bg-card transition-colors text-left",
                  "data-ocid": `portfolio.tx_modal.coin_option.${c.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: c.image,
                        alt: c.name,
                        className: "w-6 h-6 rounded-full shrink-0",
                        onError: (e) => {
                          e.target.style.visibility = "hidden";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate flex-1", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: c.symbol }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground tabular-nums shrink-0", children: formatPrice(c.currentPrice) })
                  ]
                },
                c.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-qty", className: "text-xs text-muted-foreground", children: "Menge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "tx-qty",
                type: "number",
                inputMode: "decimal",
                step: "any",
                min: "0",
                value: quantity,
                onChange: (e) => setQuantity(e.target.value),
                placeholder: "0,00",
                className: "bg-background border-border/60 font-mono tabular-nums",
                "data-ocid": "portfolio.tx_modal.quantity"
              }
            )
          ] }),
          showPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "tx-price",
                className: "text-xs text-muted-foreground",
                children: "Preis pro Coin (EUR)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "tx-price",
                type: "number",
                inputMode: "decimal",
                step: "any",
                min: "0",
                value: price,
                onChange: (e) => setPrice(e.target.value),
                placeholder: "0,00",
                className: "bg-background border-border/60 font-mono tabular-nums",
                "data-ocid": "portfolio.tx_modal.price"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-date", className: "text-xs text-muted-foreground", children: "Datum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "tx-date",
                type: "datetime-local",
                value: date,
                onChange: (e) => setDate(e.target.value),
                className: "bg-background border-border/60 font-mono",
                "data-ocid": "portfolio.tx_modal.date"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tx-notes", className: "text-xs text-muted-foreground", children: "Notiz (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "tx-notes",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                placeholder: "z.B. Käufer, Wallet, Quelle",
                className: "bg-background border-border/60",
                "data-ocid": "portfolio.tx_modal.notes"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t border-border/40 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              onClick: () => onOpenChange(false),
              className: "flex-1",
              "data-ocid": "portfolio.tx_modal.cancel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1" }),
                "Abbrechen"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              disabled: !canSubmit,
              className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90",
              "data-ocid": "portfolio.tx_modal.submit",
              children: editTx ? "Speichern" : "Hinzufügen"
            }
          )
        ] })
      ]
    }
  ) });
}
function kindIcon(kind) {
  switch (kind) {
    case "buy":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" });
    case "sell":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4" });
    case "transfer_in":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4" });
    case "transfer_out":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" });
  }
}
function formatDate(ms) {
  return new Date(ms).toLocaleString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function TransactionsList({
  txs,
  coinsById,
  onEdit,
  onDelete
}) {
  const sorted = reactExports.useMemo(
    () => [...txs].sort((a, b) => b.timestamp - a.timestamp),
    [txs]
  );
  if (sorted.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border/60 bg-background py-10 text-center",
        "data-ocid": "portfolio.transactions.empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Noch keine Transaktionen." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: 'Tippe auf „Neue Transaktion" um deinen ersten Eintrag zu erfassen.' })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-background overflow-hidden shadow-subtle", children: sorted.map((tx) => {
    const coin = coinsById.get(tx.coinId);
    const total = tx.quantity * tx.pricePerUnit;
    const showPrice = tx.kind === "buy" || tx.kind === "sell" || tx.pricePerUnit > 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center px-3 sm:px-4 py-3 border-b border-border/40 last:border-b-0 hover:bg-card/40 transition-colors",
        "data-ocid": `portfolio.transactions.row.${tx.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-muted/40 ${TX_KIND_COLORS[tx.kind]}`,
              children: kindIcon(tx.kind)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-display font-semibold text-foreground truncate", children: [
                TX_KIND_LABELS[tx.kind],
                " ",
                (coin == null ? void 0 : coin.name) ?? tx.symbol
              ] }),
              (coin == null ? void 0 : coin.image) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: coin.image,
                  alt: "",
                  className: "w-4 h-4 rounded-full shrink-0",
                  onError: (e) => {
                    e.target.style.visibility = "hidden";
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              formatDate(tx.timestamp),
              tx.notes ? ` · ${tx.notes}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono text-foreground tabular-nums", children: [
              formatQuantity(tx.quantity),
              " ",
              tx.symbol
            ] }),
            showPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground tabular-nums", children: [
              "@ ",
              formatPrice(tx.pricePerUnit),
              " · ",
              formatPrice(total)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onEdit(tx),
                className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
                "aria-label": "Bearbeiten",
                "data-ocid": `portfolio.transactions.edit.${tx.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onDelete(tx.id),
                className: "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-price-down hover:bg-card transition-colors",
                "aria-label": "Löschen",
                "data-ocid": `portfolio.transactions.delete.${tx.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ]
      },
      tx.id
    );
  }) });
}
function PortfolioPage() {
  const {
    txs,
    holdings,
    heldCoinIds,
    privacy,
    isAuthenticated,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    togglePrivacy
  } = usePortfolio();
  const { t } = useSettings();
  const { data: pages } = useMarketDataInfinite();
  const coins = reactExports.useMemo(() => {
    if (!pages) return [];
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const p of pages.pages) {
      for (const c of p.coins) {
        if (seen.has(c.id)) continue;
        seen.add(c.id);
        out.push(c);
      }
    }
    return out;
  }, [pages]);
  const coinsById = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const c of coins) m.set(c.id, c);
    return m;
  }, [coins]);
  const summary = reactExports.useMemo(() => {
    let totalValue = 0;
    let totalCost = 0;
    let totalRealized = 0;
    let weighted24hChange = 0;
    for (const h of holdings) {
      const coin = coinsById.get(h.coinId);
      const price = (coin == null ? void 0 : coin.currentPrice) ?? 0;
      const value = h.quantity * price;
      totalValue += value;
      totalCost += h.costBasis;
      totalRealized += h.realizedPnL;
      const c24 = (coin == null ? void 0 : coin.priceChangePercentage24h) ?? 0;
      weighted24hChange += value * c24;
    }
    const totalUnrealized = totalValue - totalCost;
    const totalPnL = totalUnrealized + totalRealized;
    const totalPnLPercent = totalCost > 0 ? totalPnL / totalCost * 100 : 0;
    const change24hPercent = totalValue > 0 ? weighted24hChange / totalValue : 0;
    return {
      totalValue,
      totalCost,
      totalRealizedPnL: totalRealized,
      totalUnrealizedPnL: totalUnrealized,
      totalPnL,
      totalPnLPercent,
      change24hPercent
    };
  }, [holdings, coinsById]);
  const [tab, setTab] = reactExports.useState("overview");
  const [overviewMode, setOverviewMode] = reactExports.useState("holdings");
  const [chartTf, setChartTf] = reactExports.useState("24h");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTx, setEditTx] = reactExports.useState(null);
  const [initialCoinId, setInitialCoinId] = reactExports.useState(null);
  const chartEnabled = tab === "overview" && (overviewMode === "holdings" || overviewMode === "pnl");
  const chartData = usePortfolioChart({
    txs,
    coinIds: heldCoinIds,
    days: portfolioTfToDays(chartTf),
    pnlMode: overviewMode === "pnl",
    enabled: chartEnabled
  });
  const handleSubmitTx = reactExports.useCallback(
    (tx) => {
      const { id, ...rest } = tx;
      if (id) {
        updateTransaction(id, rest);
      } else {
        addTransaction(rest);
      }
      setEditTx(null);
      setInitialCoinId(null);
    },
    [addTransaction, updateTransaction]
  );
  const handleAddNew = reactExports.useCallback(() => {
    setEditTx(null);
    setInitialCoinId(null);
    setModalOpen(true);
  }, []);
  const handleAddForCoin = reactExports.useCallback((coinId) => {
    setEditTx(null);
    setInitialCoinId(coinId);
    setModalOpen(true);
  }, []);
  const handleEdit = reactExports.useCallback((tx) => {
    setEditTx(tx);
    setInitialCoinId(null);
    setModalOpen(true);
  }, []);
  const handleDelete = reactExports.useCallback(
    (id) => {
      if (typeof window === "undefined") {
        deleteTransaction(id);
        return;
      }
      if (window.confirm("Diese Transaktion löschen?")) {
        deleteTransaction(id);
      }
    },
    [deleteTransaction]
  );
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: t("portfolio.title") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LoginPrompt,
        {
          titleKey: "login.portfolioTitle",
          descKey: "login.portfolioDesc"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: t("portfolio.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: t("portfolio.assets", {
            assets: holdings.filter((h) => h.quantity > 0).length,
            txs: txs.length
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleAddNew,
            className: "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors",
            "data-ocid": "portfolio.new_tx_button_top",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("portfolio.newTx") })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PortfolioSummaryCards,
        {
          summary,
          privacy,
          onTogglePrivacy: togglePrivacy
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 border-b border-border/40 mb-4", children: [
        { key: "overview", label: t("portfolio.tab.overview") },
        { key: "transactions", label: t("portfolio.tab.transactions") }
      ].map(({ key, label }) => {
        const active = tab === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setTab(key),
            className: `relative pb-2.5 text-sm font-semibold transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `portfolio.tab_${key}`,
            children: [
              label,
              active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" })
            ]
          },
          key
        );
      }) }),
      tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto -mx-1 px-1", children: ["holdings", "pnl", "allocation"].map(
          (m) => {
            const active = overviewMode === m;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setOverviewMode(m),
                className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${active ? "bg-card border border-border text-foreground" : "text-muted-foreground hover:text-foreground border border-transparent"}`,
                "data-ocid": `portfolio.overview_mode_${m}`,
                children: t(`portfolio.mode.${m === "pnl" ? "pnl" : m}`)
              },
              m
            );
          }
        ) }),
        overviewMode === "allocation" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          AllocationChart,
          {
            holdings,
            coinsById,
            privacy
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: PORTFOLIO_TIMEFRAMES.map((tf) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setChartTf(tf),
              className: `px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors ${chartTf === tf ? "bg-primary/15 text-primary border border-primary/30" : "bg-card border border-border/60 text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `portfolio.chart_tf_${tf}`,
              children: portfolioTfLabel(tf)
            },
            tf
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PortfolioChart,
            {
              points: chartData.points,
              isLoading: chartData.isLoading,
              loadedCount: chartData.loadedCount,
              totalCount: chartData.totalCount,
              privacy
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HoldingsTable,
          {
            holdings,
            coinsById,
            privacy,
            onSelect: handleAddForCoin
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleAddNew,
            className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border/60 bg-card hover:bg-card/80 text-sm font-semibold text-foreground transition-colors",
            "data-ocid": "portfolio.new_tx_button_bottom",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              t("portfolio.newTx")
            ]
          }
        )
      ] }),
      tab === "transactions" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        TransactionsList,
        {
          txs,
          coinsById,
          onEdit: handleEdit,
          onDelete: handleDelete
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransactionModal,
      {
        open: modalOpen,
        onOpenChange: setModalOpen,
        availableCoins: coins,
        initialCoinId,
        editTx,
        onSubmit: handleSubmitTx
      }
    )
  ] });
}
export {
  PortfolioPage as default
};
