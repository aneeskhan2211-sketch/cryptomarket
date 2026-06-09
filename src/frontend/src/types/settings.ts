// ---------- Currencies ----------
//
// Fiat currencies are converted from the EUR base price via exchange rates.
// Crypto denominations (btc/eth/sol/bnb/xrp) are derived from each coin's EUR
// price divided by the reference coin's EUR price.

export type CurrencyKind = "fiat" | "crypto";

export interface CurrencyDef {
  code: string; // lowercase id used for storage + coingecko, e.g. "usd", "btc"
  label: string; // display label, e.g. "USD", "BTC"
  symbol: string; // prefix/suffix symbol, e.g. "$", "₿"
  kind: CurrencyKind;
  // For crypto denominations: the CoinGecko coin id used as the reference price.
  refCoinId?: string;
  // Number of fraction digits to show for "normal" magnitude values.
  digits: number;
}

export const FIAT_CURRENCIES: CurrencyDef[] = [
  { code: "usd", label: "USD", symbol: "$", kind: "fiat", digits: 2 },
  { code: "eur", label: "EUR", symbol: "€", kind: "fiat", digits: 2 },
  { code: "gbp", label: "GBP", symbol: "£", kind: "fiat", digits: 2 },
  { code: "jpy", label: "JPY", symbol: "¥", kind: "fiat", digits: 0 },
  { code: "chf", label: "CHF", symbol: "CHF", kind: "fiat", digits: 2 },
  { code: "cny", label: "CNY", symbol: "¥", kind: "fiat", digits: 2 },
  { code: "inr", label: "INR", symbol: "₹", kind: "fiat", digits: 2 },
  { code: "cad", label: "CAD", symbol: "C$", kind: "fiat", digits: 2 },
  { code: "aud", label: "AUD", symbol: "A$", kind: "fiat", digits: 2 },
  { code: "brl", label: "BRL", symbol: "R$", kind: "fiat", digits: 2 },
];

export const CRYPTO_CURRENCIES: CurrencyDef[] = [
  {
    code: "btc",
    label: "BTC",
    symbol: "₿",
    kind: "crypto",
    refCoinId: "bitcoin",
    digits: 8,
  },
  {
    code: "eth",
    label: "ETH",
    symbol: "Ξ",
    kind: "crypto",
    refCoinId: "ethereum",
    digits: 6,
  },
  {
    code: "sol",
    label: "SOL",
    symbol: "SOL",
    kind: "crypto",
    refCoinId: "solana",
    digits: 4,
  },
  {
    code: "bnb",
    label: "BNB",
    symbol: "BNB",
    kind: "crypto",
    refCoinId: "binancecoin",
    digits: 4,
  },
  {
    code: "xrp",
    label: "XRP",
    symbol: "XRP",
    kind: "crypto",
    refCoinId: "ripple",
    digits: 2,
  },
];

export const ALL_CURRENCIES: CurrencyDef[] = [
  ...FIAT_CURRENCIES,
  ...CRYPTO_CURRENCIES,
];

export function findCurrency(code: string): CurrencyDef {
  return ALL_CURRENCIES.find((c) => c.code === code) ?? FIAT_CURRENCIES[0];
}

// ---------- Languages ----------

export interface LanguageDef {
  code: string;
  label: string; // native name
  locale: string; // Intl locale for number formatting
}

// English is the app default. Four languages now; more added later.
export const LANGUAGES: LanguageDef[] = [
  { code: "en", label: "English", locale: "en-US" },
  { code: "de", label: "Deutsch", locale: "de-DE" },
  { code: "es", label: "Español", locale: "es-ES" },
  { code: "fr", label: "Français", locale: "fr-FR" },
];

export function findLanguage(code: string): LanguageDef {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

// ---------- Theme ----------

export type ThemeMode = "light" | "dark" | "system";

// ---------- Settings object ----------

export interface AppSettings {
  currency: string; // currency code
  language: string; // language code
  theme: ThemeMode;
  colorblind: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  currency: "usd",
  language: "en",
  theme: "system",
  colorblind: false,
};
