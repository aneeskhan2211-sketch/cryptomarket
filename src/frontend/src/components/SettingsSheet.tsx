import { ProfileSetupModal } from "@/components/ProfileSetupModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/contexts/SettingsContext";
import { usePriceAlerts } from "@/hooks/usePriceAlerts";
import {
  useUpdateReportPrefs,
  useUserProfile,
  useUserSettings,
} from "@/lib/api";
import type { UserProfile } from "@/types/profile";
import {
  ALL_CURRENCIES,
  CRYPTO_CURRENCIES,
  FIAT_CURRENCIES,
  LANGUAGES,
  type ThemeMode,
} from "@/types/settings";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  BarChart3Icon,
  BellIcon,
  ChevronRightIcon,
  LogIn,
  LogOut,
  MonitorIcon,
  MoonIcon,
  PencilIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  SunIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SubView = "main" | "currency" | "language";

const AUTO_REFRESH_KEY = "autoRefreshEnabled";

const CHART_DAY_OPTIONS = [
  { value: 7, labelKey: "settings.chartDays.7" },
  { value: 30, labelKey: "settings.chartDays.30" },
  { value: 90, labelKey: "settings.chartDays.90" },
];

const ROUNDING_OPTIONS = [
  { value: 2, labelKey: "settings.rounding.2" },
  { value: 4, labelKey: "settings.rounding.4" },
  { value: 6, labelKey: "settings.rounding.6" },
];

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { settings, setCurrency, setLanguage, setTheme, setColorblind, t } =
    useSettings();
  const { login, clear: logout, identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { data: profile } = useUserProfile();
  const { data: userSettings } = useUserSettings();
  const updateReportPrefs = useUpdateReportPrefs();
  const [view, setView] = useState<SubView>("main");
  const [editProfile, setEditProfile] = useState(false);

  const [autoRefresh, setAutoRefresh] = useState(() => {
    if (typeof window === "undefined") return true;
    const raw = window.localStorage.getItem(AUTO_REFRESH_KEY);
    return raw === null ? true : raw === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AUTO_REFRESH_KEY, String(autoRefresh));
  }, [autoRefresh]);

  const reportPrefs = useMemo(() => {
    return {
      defaultChartDays: userSettings?.reportPrefs?.defaultChartDays ?? 30,
      roundingDecimals: userSettings?.reportPrefs?.roundingDecimals ?? 2,
    };
  }, [userSettings]);

  const handleChartDaysChange = useCallback(
    (days: number) => {
      if (!isAuthenticated) return;
      updateReportPrefs.mutate({
        defaultChartDays: days,
        roundingDecimals: reportPrefs.roundingDecimals,
      });
    },
    [isAuthenticated, updateReportPrefs, reportPrefs.roundingDecimals],
  );

  const handleRoundingChange = useCallback(
    (decimals: number) => {
      if (!isAuthenticated) return;
      updateReportPrefs.mutate({
        defaultChartDays: reportPrefs.defaultChartDays,
        roundingDecimals: decimals,
      });
    },
    [isAuthenticated, updateReportPrefs, reportPrefs.defaultChartDays],
  );

  const currentCurrency = ALL_CURRENCIES.find(
    (c) => c.code === settings.currency,
  );
  const currentLang = LANGUAGES.find((l) => l.code === settings.language);

  const themes: { mode: ThemeMode; label: string; icon: typeof SunIcon }[] = [
    { mode: "light", label: t("settings.theme.light"), icon: SunIcon },
    { mode: "dark", label: t("settings.theme.dark"), icon: MoonIcon },
    { mode: "system", label: t("settings.theme.system"), icon: MonitorIcon },
  ];

  function handleClose(o: boolean) {
    if (!o) setView("main");
    onOpenChange(o);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={handleClose}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-card border-border/60 overflow-y-auto p-0"
          data-ocid="settings.sheet"
        >
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-border/40">
            <SheetTitle className="text-lg font-display font-bold text-foreground">
              {view === "currency"
                ? t("settings.currency")
                : view === "language"
                  ? t("settings.language")
                  : t("settings.title")}
            </SheetTitle>
          </SheetHeader>

          {view === "main" && (
            <div className="px-5 py-4 space-y-6">
              {/* Profile section */}
              <section className="space-y-2">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {t("settings.profile")}
                </p>
                {isAuthenticated ? (
                  <div className="rounded-xl border border-border/50 bg-background/40 divide-y divide-border/40">
                    <div className="flex items-center gap-3 px-3 py-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                        <UserIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {(profile as UserProfile | null)?.displayName ||
                            (profile as UserProfile | null)?.username ||
                            t("settings.profile")}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {t("settings.syncedAccount")}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditProfile(true)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:bg-card/60 transition-colors"
                      data-ocid="settings.edit_profile"
                    >
                      <PencilIcon className="w-4 h-4 text-muted-foreground" />
                      {t("settings.editProfile")}
                    </button>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-price-down hover:bg-card/60 transition-colors"
                      data-ocid="settings.logout"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("settings.logout")}
                    </button>
                  </div>
                ) : (
                  <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {t("settings.notLoggedIn")}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {t("settings.syncedLocal")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => login()}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                      data-ocid="settings.login"
                    >
                      <LogIn className="w-4 h-4" />
                      {t("settings.login")}
                    </button>
                  </div>
                )}
              </section>

              {/* Settings section */}
              <section className="space-y-3">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {t("settings.title")}
                </p>

                {/* Theme */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {t("settings.theme")}
                  </span>
                  <div className="flex items-center rounded-lg border border-border/60 bg-background p-0.5">
                    {themes.map(({ mode, label, icon: Icon }) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setTheme(mode)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          settings.theme === mode
                            ? "bg-primary/15 text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label={label}
                        data-ocid={`settings.theme_${mode}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colorblind */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {t("settings.colorblind")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {t("settings.colorblind.desc")}
                    </p>
                  </div>
                  <Switch
                    checked={settings.colorblind}
                    onCheckedChange={setColorblind}
                    data-ocid="settings.colorblind_toggle"
                  />
                </div>

                {/* Currency */}
                <button
                  type="button"
                  onClick={() => setView("currency")}
                  className="w-full flex items-center justify-between gap-3 py-1.5"
                  data-ocid="settings.currency_open"
                >
                  <span className="text-sm font-medium text-foreground">
                    {t("settings.currency")}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    {currentCurrency?.label ?? settings.currency.toUpperCase()}
                    <ChevronRightIcon className="w-4 h-4" />
                  </span>
                </button>

                {/* Language */}
                <button
                  type="button"
                  onClick={() => setView("language")}
                  className="w-full flex items-center justify-between gap-3 py-1.5"
                  data-ocid="settings.language_open"
                >
                  <span className="text-sm font-medium text-foreground">
                    {t("settings.language")}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    {currentLang?.label ?? settings.language}
                    <ChevronRightIcon className="w-4 h-4" />
                  </span>
                </button>
              </section>

              {/* Chart & Display Preferences */}
              <section className="space-y-3">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3Icon className="w-3.5 h-3.5" />
                  {t("settings.chartPrefs")}
                </p>

                <div
                  className={`space-y-3 ${!isAuthenticated ? "opacity-50 pointer-events-none" : ""}`}
                >
                  {/* Default chart days */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {t("settings.chartDays")}
                    </span>
                    <div className="flex items-center rounded-lg border border-border/60 bg-background p-0.5">
                      {CHART_DAY_OPTIONS.map(({ value, labelKey }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleChartDaysChange(value)}
                          className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                            reportPrefs.defaultChartDays === value
                              ? "bg-primary/15 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          data-ocid={`settings.chart_days_${value}`}
                        >
                          {t(labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rounding decimals */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {t("settings.rounding")}
                    </span>
                    <div className="flex items-center rounded-lg border border-border/60 bg-background p-0.5">
                      {ROUNDING_OPTIONS.map(({ value, labelKey }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleRoundingChange(value)}
                          className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                            reportPrefs.roundingDecimals === value
                              ? "bg-primary/15 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          data-ocid={`settings.rounding_${value}`}
                        >
                          {t(labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {!isAuthenticated && (
                  <p className="text-[11px] text-muted-foreground">
                    {t("settings.loginToSave")}
                  </p>
                )}
              </section>

              {/* Data Refresh */}
              <section className="space-y-3">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCwIcon className="w-3.5 h-3.5" />
                  {t("settings.dataRefresh")}
                </p>

                {/* Refresh interval indicator */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {t("settings.refreshInterval")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t("settings.refreshInterval.value")}
                  </span>
                </div>

                {/* Auto-refresh toggle */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {t("settings.autoRefresh")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {t("settings.autoRefresh.desc")}
                    </p>
                  </div>
                  <Switch
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                    data-ocid="settings.auto_refresh_toggle"
                  />
                </div>
              </section>

              {/* Price Alerts */}
              <PriceAlertsSection t={t} isAuthenticated={isAuthenticated} />
            </div>
          )}

          {view === "currency" && (
            <div className="px-5 py-4 space-y-4">
              <button
                type="button"
                onClick={() => setView("main")}
                className="text-sm text-primary hover:underline"
              >
                ← {t("settings.title")}
              </button>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Fiat
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {FIAT_CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCurrency(c.code);
                        setView("main");
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                        settings.currency === c.code
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid={`settings.currency_${c.code}`}
                    >
                      <span className="font-semibold">{c.label}</span>
                      <span className="text-xs opacity-70">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Krypto
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CRYPTO_CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCurrency(c.code);
                        setView("main");
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                        settings.currency === c.code
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid={`settings.currency_${c.code}`}
                    >
                      <span className="font-semibold">{c.label}</span>
                      <span className="text-xs opacity-70">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "language" && (
            <div className="px-5 py-4 space-y-3">
              <button
                type="button"
                onClick={() => setView("main")}
                className="text-sm text-primary hover:underline"
              >
                ← {t("settings.title")}
              </button>
              <div className="rounded-xl border border-border/50 bg-background/40 divide-y divide-border/40">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLanguage(l.code);
                      setView("main");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-3 text-sm transition-colors hover:bg-card/60 ${
                      settings.language === l.code
                        ? "text-primary font-semibold"
                        : "text-foreground"
                    }`}
                    data-ocid={`settings.language_${l.code}`}
                  >
                    {l.label}
                    {settings.language === l.code && (
                      <span className="text-primary">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {/* note: only EN/DE/ES/FR fully translated for now */}
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <ProfileSetupModal
        open={editProfile}
        onClose={() => setEditProfile(false)}
        existingProfile={(profile as UserProfile | null) ?? null}
        isSetup={false}
      />
    </>
  );
}

/* ── Price Alerts sub-component ─────────────────────────────── */

import { Variant_above_below } from "@/backend";
import { Input } from "@/components/ui/input";

function PriceAlertsSection({
  t,
  isAuthenticated,
}: {
  t: (key: string) => string;
  isAuthenticated: boolean;
}) {
  const { alerts, createAlert, removeAlert, toggleAlert } = usePriceAlerts();
  const [coinName, setCoinName] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!coinName.trim() || !targetPrice.trim()) return;
    const price = Number.parseFloat(targetPrice);
    if (Number.isNaN(price) || price <= 0) return;
    setAdding(true);
    await createAlert(
      coinName.trim().toLowerCase(),
      coinName.trim(),
      price,
      direction,
    );
    setAdding(false);
    setCoinName("");
    setTargetPrice("");
  };

  return (
    <section className="space-y-3">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <BellIcon className="w-3.5 h-3.5" />
        {t("priceAlerts.title")}
      </p>

      {!isAuthenticated ? (
        <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-3">
          <p className="text-sm text-muted-foreground">
            {t("settings.loginToSave")}
          </p>
        </div>
      ) : (
        <>
          {/* Add alert form */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3 space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">
                {t("priceAlerts.target")}
              </span>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="bitcoin"
                  value={coinName}
                  onChange={(e) => setCoinName(e.target.value)}
                  className="flex-1 h-9 text-sm bg-background"
                  data-ocid="price_alert.coin_input"
                />
                <Input
                  type="number"
                  placeholder="50000"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-28 h-9 text-sm bg-background"
                  data-ocid="price_alert.price_input"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center rounded-lg border border-border/60 bg-background p-0.5">
                {(["above", "below"] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => setDirection(dir)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      direction === dir
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid={`price_alert.direction_${dir}`}
                  >
                    {t(`priceAlerts.${dir}`)}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={adding || !coinName.trim() || !targetPrice.trim()}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-ocid="price_alert.add_button"
              >
                {adding ? "…" : t("priceAlerts.add")}
              </button>
            </div>
          </div>

          {/* Alerts list */}
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {alerts.length === 0 ? (
              <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {t("priceAlerts.empty")}
                </p>
              </div>
            ) : (
              alerts.map((alert, idx) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border/50 bg-background/40 px-3 py-2.5"
                  data-ocid={`price_alert.item.${idx + 1}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {alert.coinName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`alert-badge ${
                          alert.triggered
                            ? "alert-badge-triggered"
                            : "alert-badge-active"
                        }`}
                      >
                        {alert.direction === Variant_above_below.above
                          ? t("priceAlerts.above")
                          : t("priceAlerts.below")}{" "}
                        {alert.targetPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {alert.triggered && (
                      <button
                        type="button"
                        onClick={() => toggleAlert(alert.id, false)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        aria-label="Re-enable alert"
                        data-ocid={`price_alert.re_enable.${idx + 1}`}
                      >
                        <RotateCcwIcon className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAlert(alert.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Delete alert"
                      data-ocid={`price_alert.delete.${idx + 1}`}
                    >
                      <Trash2Icon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}
