import { Layout } from "@/components/Layout";
import { LoginPrompt } from "@/components/LoginPrompt";
import { AllocationChart } from "@/components/portfolio/AllocationChart";
import { HoldingsTable } from "@/components/portfolio/HoldingsTable";
import { PortfolioChart } from "@/components/portfolio/PortfolioChart";
import { PortfolioSummaryCards } from "@/components/portfolio/PortfolioSummaryCards";
import { TransactionModal } from "@/components/portfolio/TransactionModal";
import { TransactionsList } from "@/components/portfolio/TransactionsList";
import { useSettings } from "@/contexts/SettingsContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import { usePortfolioChart } from "@/hooks/usePortfolioChart";
import { useMarketDataInfinite } from "@/lib/api";
import type { Coin } from "@/types/coin";
import {
  type OverviewMode,
  PORTFOLIO_TIMEFRAMES,
  type PortfolioSummary,
  type PortfolioTimeframe,
  type Transaction,
  portfolioTfLabel,
  portfolioTfToDays,
} from "@/types/portfolio";
import { PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type TopTab = "overview" | "transactions";

export default function PortfolioPage() {
  const {
    txs,
    holdings,
    heldCoinIds,
    privacy,
    isAuthenticated,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    togglePrivacy,
  } = usePortfolio();

  const { t } = useSettings();

  const { data: pages } = useMarketDataInfinite();
  const coins = useMemo<Coin[]>(() => {
    if (!pages) return [];
    const seen = new Set<string>();
    const out: Coin[] = [];
    for (const p of pages.pages) {
      for (const c of p.coins) {
        if (seen.has(c.id)) continue;
        seen.add(c.id);
        out.push(c);
      }
    }
    return out;
  }, [pages]);

  const coinsById = useMemo(() => {
    const m = new Map<string, Coin>();
    for (const c of coins) m.set(c.id, c);
    return m;
  }, [coins]);

  // Summary numbers derived from live prices.
  const summary = useMemo<PortfolioSummary>(() => {
    let totalValue = 0;
    let totalCost = 0;
    let totalRealized = 0;
    let weighted24hChange = 0;
    for (const h of holdings) {
      const coin = coinsById.get(h.coinId);
      const price = coin?.currentPrice ?? 0;
      const value = h.quantity * price;
      totalValue += value;
      totalCost += h.costBasis;
      totalRealized += h.realizedPnL;
      const c24 = coin?.priceChangePercentage24h ?? 0;
      weighted24hChange += value * c24;
    }
    const totalUnrealized = totalValue - totalCost;
    const totalPnL = totalUnrealized + totalRealized;
    const totalPnLPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;
    const change24hPercent =
      totalValue > 0 ? weighted24hChange / totalValue : 0;
    return {
      totalValue,
      totalCost,
      totalRealizedPnL: totalRealized,
      totalUnrealizedPnL: totalUnrealized,
      totalPnL,
      totalPnLPercent,
      change24hPercent,
    };
  }, [holdings, coinsById]);

  // UI state
  const [tab, setTab] = useState<TopTab>("overview");
  const [overviewMode, setOverviewMode] = useState<OverviewMode>("holdings");
  const [chartTf, setChartTf] = useState<PortfolioTimeframe>("24h");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [initialCoinId, setInitialCoinId] = useState<string | null>(null);

  // Portfolio chart — only fetched when in "Bestände" or "Gesamtgewinn" modes.
  const chartEnabled =
    tab === "overview" &&
    (overviewMode === "holdings" || overviewMode === "pnl");
  const chartData = usePortfolioChart({
    txs,
    coinIds: heldCoinIds,
    days: portfolioTfToDays(chartTf),
    pnlMode: overviewMode === "pnl",
    enabled: chartEnabled,
  });

  const handleSubmitTx = useCallback(
    (tx: Omit<Transaction, "id"> & { id?: string }) => {
      const { id, ...rest } = tx;
      if (id) {
        updateTransaction(id, rest);
      } else {
        addTransaction(rest);
      }
      setEditTx(null);
      setInitialCoinId(null);
    },
    [addTransaction, updateTransaction],
  );

  const handleAddNew = useCallback(() => {
    setEditTx(null);
    setInitialCoinId(null);
    setModalOpen(true);
  }, []);

  const handleAddForCoin = useCallback((coinId: string) => {
    setEditTx(null);
    setInitialCoinId(coinId);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((tx: Transaction) => {
    setEditTx(tx);
    setInitialCoinId(null);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (typeof window === "undefined") {
        deleteTransaction(id);
        return;
      }
      if (window.confirm("Diese Transaktion löschen?")) {
        deleteTransaction(id);
      }
    },
    [deleteTransaction],
  );

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="mb-3">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            {t("portfolio.title")}
          </h1>
        </div>
        <LoginPrompt
          titleKey="login.portfolioTitle"
          descKey="login.portfolioDesc"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Title row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
              {t("portfolio.title")}
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {t("portfolio.assets", {
                assets: holdings.filter((h) => h.quantity > 0).length,
                txs: txs.length,
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddNew}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            data-ocid="portfolio.new_tx_button_top"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{t("portfolio.newTx")}</span>
          </button>
        </div>

        <PortfolioSummaryCards
          summary={summary}
          privacy={privacy}
          onTogglePrivacy={togglePrivacy}
        />

        {/* Top-level tabs */}
        <div className="flex items-center gap-4 border-b border-border/40 mb-4">
          {(
            [
              { key: "overview", label: t("portfolio.tab.overview") },
              { key: "transactions", label: t("portfolio.tab.transactions") },
            ] as Array<{ key: TopTab; label: string }>
          ).map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`relative pb-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`portfolio.tab_${key}`}
              >
                {label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {tab === "overview" && (
          <div className="space-y-4">
            {/* Overview mode pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto -mx-1 px-1">
              {(["holdings", "pnl", "allocation"] as OverviewMode[]).map(
                (m) => {
                  const active = overviewMode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setOverviewMode(m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                        active
                          ? "bg-card border border-border text-foreground"
                          : "text-muted-foreground hover:text-foreground border border-transparent"
                      }`}
                      data-ocid={`portfolio.overview_mode_${m}`}
                    >
                      {t(`portfolio.mode.${m === "pnl" ? "pnl" : m}`)}
                    </button>
                  );
                },
              )}
            </div>

            {overviewMode === "allocation" ? (
              <AllocationChart
                holdings={holdings}
                coinsById={coinsById}
                privacy={privacy}
              />
            ) : (
              <>
                {/* Timeframe picker */}
                <div className="flex flex-wrap gap-1">
                  {PORTFOLIO_TIMEFRAMES.map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setChartTf(tf)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                        chartTf === tf
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "bg-card border border-border/60 text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid={`portfolio.chart_tf_${tf}`}
                    >
                      {portfolioTfLabel(tf)}
                    </button>
                  ))}
                </div>
                <PortfolioChart
                  points={chartData.points}
                  isLoading={chartData.isLoading}
                  loadedCount={chartData.loadedCount}
                  totalCount={chartData.totalCount}
                  privacy={privacy}
                />
              </>
            )}

            {/* Holdings table */}
            <HoldingsTable
              holdings={holdings}
              coinsById={coinsById}
              privacy={privacy}
              onSelect={handleAddForCoin}
            />

            {/* Bottom CTA (matches CMC) */}
            <button
              type="button"
              onClick={handleAddNew}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border/60 bg-card hover:bg-card/80 text-sm font-semibold text-foreground transition-colors"
              data-ocid="portfolio.new_tx_button_bottom"
            >
              <PlusIcon className="w-4 h-4" />
              {t("portfolio.newTx")}
            </button>
          </div>
        )}

        {tab === "transactions" && (
          <TransactionsList
            txs={txs}
            coinsById={coinsById}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <TransactionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        availableCoins={coins}
        initialCoinId={initialCoinId}
        editTx={editTx}
        onSubmit={handleSubmitTx}
      />
    </Layout>
  );
}
