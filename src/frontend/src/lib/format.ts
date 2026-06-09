// All coin values flow through here denominated in EUR (the base the data is
// fetched in). A module-level config — updated by SettingsContext — controls
// the active locale, the display currency, and the EUR->currency conversion.
// This lets every call site keep using formatPrice()/formatCompactNumber()
// unchanged while the whole app reacts to the user's currency choice.

interface FormatConfig {
  locale: string;
  symbol: string;
  kind: "fiat" | "crypto";
  digits: number;
  // Multiply a EUR value by this to get the display-currency value.
  rate: number;
}

let CONFIG: FormatConfig = {
  locale: "en-US",
  symbol: "$",
  kind: "fiat",
  digits: 2,
  rate: 1,
};

/** Called by SettingsContext whenever currency / language / rates change. */
export function setFormatConfig(cfg: Partial<FormatConfig>): void {
  CONFIG = { ...CONFIG, ...cfg };
}

function conv(eurValue: number): number {
  return eurValue * CONFIG.rate;
}

function symbolize(num: string): string {
  if (CONFIG.kind === "fiat") {
    if (CONFIG.symbol.length > 1) return `${num} ${CONFIG.symbol}`;
    return `${CONFIG.symbol}${num}`;
  }
  return `${num} ${CONFIG.symbol}`;
}

function pickDigits(absValue: number): number {
  const base = CONFIG.digits;
  if (absValue > 0 && absValue < 0.01) return Math.max(base, 6);
  if (absValue > 0 && absValue < 1) return Math.max(base, 4);
  return base;
}

export function formatPrice(value: number): string {
  const v = conv(value);
  if (v === 0) return symbolize((0).toFixed(CONFIG.digits));
  const digits = pickDigits(Math.abs(v));
  const num = new Intl.NumberFormat(CONFIG.locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(v);
  return symbolize(num);
}

function compactUnits() {
  // Locale-specific large-number suffixes. We keep them short and neutral.
  return { t: "T", b: "B", m: "M", k: "K" };
}

export function formatMarketCap(value: number): string {
  const v = conv(value);
  const u = compactUnits();
  const nf = (n: number, d = 2) =>
    new Intl.NumberFormat(CONFIG.locale, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    }).format(n);
  if (v >= 1_000_000_000_000)
    return symbolize(`${nf(v / 1_000_000_000_000)}${u.t}`);
  if (v >= 1_000_000_000) return symbolize(`${nf(v / 1_000_000_000)}${u.b}`);
  if (v >= 1_000_000) return symbolize(`${nf(v / 1_000_000)}${u.m}`);
  return symbolize(nf(v, 0));
}

export function formatVolume(value: number): string {
  return formatMarketCap(value);
}

export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "—";
  const v = conv(value);
  const u = compactUnits();
  const nf = (n: number, d = 2) =>
    new Intl.NumberFormat(CONFIG.locale, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    }).format(n);
  if (v >= 1_000_000_000_000) return `${nf(v / 1_000_000_000_000)} ${u.t}`;
  if (v >= 1_000_000_000) return `${nf(v / 1_000_000_000)} ${u.b}`;
  if (v >= 1_000_000) return `${nf(v / 1_000_000)} ${u.m}`;
  if (v >= 1_000) return `${nf(v / 1_000, 1)} ${u.k}`;
  return new Intl.NumberFormat(CONFIG.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);
}

// ---------- Locale-only helpers (no currency conversion) ----------

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const formatted = new Intl.NumberFormat(CONFIG.locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  if (value > 0) return `▲ ${formatted} %`;
  if (value < 0) return `▼ ${formatted} %`;
  return `${formatted} %`;
}

export function formatPercentPlain(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat(CONFIG.locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value)} %`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(CONFIG.locale).format(value);
}

/** A quantity of a coin (not converted — it's a coin amount, not a price). */
export function formatSupply(value: number, symbol: string): string {
  if (!value || !Number.isFinite(value) || value <= 0) return "—";
  const u = compactUnits();
  const nf = (n: number, d = 2) =>
    new Intl.NumberFormat(CONFIG.locale, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    }).format(n);
  let num: string;
  if (value >= 1_000_000_000_000)
    num = `${nf(value / 1_000_000_000_000)} ${u.t}`;
  else if (value >= 1_000_000_000) num = `${nf(value / 1_000_000_000)} ${u.b}`;
  else if (value >= 1_000_000) num = `${nf(value / 1_000_000)} ${u.m}`;
  else if (value >= 1_000) num = `${nf(value / 1_000, 1)} ${u.k}`;
  else
    num = new Intl.NumberFormat(CONFIG.locale, {
      maximumFractionDigits: 0,
    }).format(value);
  return `${num} ${symbol}`;
}

/**
 * Format a plain coin quantity (no symbol) — used for holdings amounts where
 * conversion must NOT apply (it's a number of coins, not a fiat value).
 */
export function formatQuantity(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const u = compactUnits();
  const nf = (n: number, d = 2) =>
    new Intl.NumberFormat(CONFIG.locale, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    }).format(n);
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000_000)
    return `${nf(value / 1_000_000_000_000)} ${u.t}`;
  if (abs >= 1_000_000_000) return `${nf(value / 1_000_000_000)} ${u.b}`;
  if (abs >= 1_000_000) return `${nf(value / 1_000_000)} ${u.m}`;
  if (abs >= 1_000) return `${nf(value / 1_000, 1)} ${u.k}`;
  return new Intl.NumberFormat(CONFIG.locale, {
    maximumFractionDigits: 8,
  }).format(value);
}
