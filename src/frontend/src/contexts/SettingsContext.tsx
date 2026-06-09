import {
  useFiatRates,
  useMarketDataInfinite,
  useUpdateUserSettings,
  useUserSettings,
} from "@/lib/api";
import { setFormatConfig } from "@/lib/format";
import { translate } from "@/lib/i18n";
import type { Coin } from "@/types/coin";
import {
  type AppSettings,
  DEFAULT_SETTINGS,
  type ThemeMode,
  findCurrency,
  findLanguage,
} from "@/types/settings";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LOCAL_KEY = "cryptomarket.settings.v1";

interface SettingsContextValue {
  settings: AppSettings;
  setCurrency: (code: string) => void;
  setLanguage: (code: string) => void;
  setTheme: (mode: ThemeMode) => void;
  setColorblind: (on: boolean) => void;
  isAuthenticated: boolean;
  /** Translate a key with optional interpolation vars. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Convert a EUR-denominated value into the active currency. */
  convert: (eurValue: number) => number;
  /** Format a EUR-denominated value as a string in the active currency. */
  formatMoney: (eurValue: number) => string;
  /** Format a compact (K/M/B) EUR value in the active currency. */
  formatMoneyCompact: (eurValue: number) => string;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function readLocal(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      currency:
        typeof parsed.currency === "string"
          ? parsed.currency
          : DEFAULT_SETTINGS.currency,
      language:
        typeof parsed.language === "string"
          ? parsed.language
          : DEFAULT_SETTINGS.language,
      theme: ["light", "dark", "system"].includes(parsed.theme)
        ? parsed.theme
        : DEFAULT_SETTINGS.theme,
      colorblind:
        typeof parsed.colorblind === "boolean"
          ? parsed.colorblind
          : DEFAULT_SETTINGS.colorblind,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeLocal(s: AppSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function applyTheme(theme: ThemeMode, colorblind: boolean): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const effectiveDark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", effectiveDark);
  root.classList.toggle("light", !effectiveDark);
  root.classList.toggle("colorblind", colorblind);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const { data: backendSettings } = useUserSettings();
  const updateSettings = useUpdateUserSettings();
  const { data: fiatRates } = useFiatRates();
  const { data: pages } = useMarketDataInfinite();

  const [local, setLocal] = useState<AppSettings>(() => readLocal());

  // Effective settings: backend when logged in & present, else local.
  const settings: AppSettings = useMemo(() => {
    if (isAuthenticated && backendSettings) {
      return {
        currency: backendSettings.currency,
        language: backendSettings.language,
        theme: ["light", "dark", "system"].includes(backendSettings.theme)
          ? (backendSettings.theme as ThemeMode)
          : "system",
        colorblind: backendSettings.colorblind,
      };
    }
    return local;
  }, [isAuthenticated, backendSettings, local]);

  // Persist + apply.
  useEffect(() => {
    writeLocal(local);
  }, [local]);

  useEffect(() => {
    applyTheme(settings.theme, settings.colorblind);
  }, [settings.theme, settings.colorblind]);

  // Re-apply on system theme change when in "system" mode.
  useEffect(() => {
    if (settings.theme !== "system") return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system", settings.colorblind);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [settings.theme, settings.colorblind]);

  // Sync across tabs (local only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: StorageEvent) => {
      if (e.key === LOCAL_KEY) setLocal(readLocal());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Persist a change: always write local (so it survives logout), and when
  // authenticated also push to the backend.
  const persist = (next: AppSettings) => {
    setLocal(next);
    if (isAuthenticated) {
      updateSettings.mutate({
        currency: next.currency,
        language: next.language,
        theme: next.theme,
        colorblind: next.colorblind,
      });
    }
  };

  const setCurrency = (code: string) =>
    persist({ ...settings, currency: code });
  const setLanguage = (code: string) =>
    persist({ ...settings, language: code });
  const setTheme = (mode: ThemeMode) => persist({ ...settings, theme: mode });
  const setColorblind = (on: boolean) =>
    persist({ ...settings, colorblind: on });

  // ---------- Currency conversion ----------

  // Reference coin EUR prices for crypto denominations.
  const coinPriceEur = useMemo(() => {
    const m = new Map<string, number>();
    if (pages) {
      for (const page of pages.pages) {
        for (const c of page.coins as Coin[]) {
          m.set(c.id, c.currentPrice);
        }
      }
    }
    return m;
  }, [pages]);

  const currencyDef = findCurrency(settings.currency);
  const langDef = findLanguage(settings.language);

  // The single EUR->display multiplier for the active currency.
  const activeRate = useMemo(() => {
    if (currencyDef.kind === "fiat") {
      return (
        fiatRates?.[currencyDef.code] ?? (currencyDef.code === "eur" ? 1 : 1)
      );
    }
    const ref = currencyDef.refCoinId
      ? coinPriceEur.get(currencyDef.refCoinId)
      : undefined;
    if (!ref || ref === 0) return 0;
    return 1 / ref;
  }, [currencyDef, fiatRates, coinPriceEur]);

  // Keep the global formatter config in sync so every formatPrice() call site
  // reflects the chosen currency + locale without prop drilling.
  useEffect(() => {
    setFormatConfig({
      locale: langDef.locale,
      symbol: currencyDef.symbol,
      kind: currencyDef.kind,
      digits: currencyDef.digits,
      rate: activeRate,
    });
  }, [
    langDef.locale,
    currencyDef.symbol,
    currencyDef.kind,
    currencyDef.digits,
    activeRate,
  ]);

  const convert = (eurValue: number): number => {
    if (currencyDef.kind === "fiat") {
      const rate =
        fiatRates?.[currencyDef.code] ?? (currencyDef.code === "eur" ? 1 : 1);
      return eurValue * rate;
    }
    // crypto denomination
    const ref = currencyDef.refCoinId
      ? coinPriceEur.get(currencyDef.refCoinId)
      : undefined;
    if (!ref || ref === 0) return 0;
    return eurValue / ref;
  };

  const formatMoney = (eurValue: number): string => {
    const v = convert(eurValue);
    const digits = pickDigits(v, currencyDef.digits);
    const num = new Intl.NumberFormat(langDef.locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
    return withSymbol(num, currencyDef.symbol, currencyDef.kind);
  };

  const formatMoneyCompact = (eurValue: number): string => {
    const v = convert(eurValue);
    const compact = compactNumber(v, langDef.locale);
    return withSymbol(compact, currencyDef.symbol, currencyDef.kind);
  };

  const t = useMemo(
    () => (key: string, vars?: Record<string, string | number>) =>
      translate(settings.language, key, vars),
    [settings.language],
  );

  const value: SettingsContextValue = {
    settings,
    setCurrency,
    setLanguage,
    setTheme,
    setColorblind,
    isAuthenticated,
    t,
    convert,
    formatMoney,
    formatMoneyCompact,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

// ---------- Formatting helpers ----------

function pickDigits(value: number, base: number): number {
  const abs = Math.abs(value);
  if (abs > 0 && abs < 0.01) return Math.max(base, 6);
  if (abs > 0 && abs < 1) return Math.max(base, 4);
  return base;
}

function withSymbol(
  num: string,
  symbol: string,
  kind: "fiat" | "crypto",
): string {
  // Fiat: symbol prefix ($1,234.56). Crypto: symbol suffix (0.0123 ₿).
  if (kind === "fiat") {
    // Multi-char fiat codes read better as suffix.
    if (symbol.length > 1) return `${num} ${symbol}`;
    return `${symbol}${num}`;
  }
  return `${num} ${symbol}`;
}

function compactNumber(value: number, locale: string): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000_000) {
    return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 1_000_000_000_000)}T`;
  }
  if (abs >= 1_000_000_000) {
    return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 1_000)}K`;
  }
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
