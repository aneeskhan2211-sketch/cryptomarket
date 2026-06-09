/**
 * Portfolio data model.
 *
 * A portfolio is a list of transactions. Holdings (current quantity, cost
 * basis, realized P/L) are derived from the transactions at read time — never
 * stored. This keeps the source of truth tiny and lets the user freely edit
 * past entries without bookkeeping bugs.
 */

export type TxKind = "buy" | "sell" | "transfer_in" | "transfer_out";

export interface Transaction {
  id: string; // uuid-like local id
  coinId: string; // CoinGecko id, e.g. "bitcoin"
  symbol: string; // cached for display when coin metadata is missing
  kind: TxKind;
  /** Quantity of the coin moved by this transaction. Always positive. */
  quantity: number;
  /**
   * Price per unit in EUR at the moment of the transaction.
   * For transfer_in / transfer_out, this may be 0 (no cost basis change).
   * For buy / sell, this is required and used for P/L math.
   */
  pricePerUnit: number;
  /** Unix ms timestamp. */
  timestamp: number;
  notes?: string;
}

export interface Holding {
  coinId: string;
  symbol: string;
  /** Current quantity, after all buys, sells, transfers in/out. */
  quantity: number;
  /**
   * Total EUR invested into the remaining open quantity, computed via
   * weighted-average cost basis. Used to derive unrealized P/L vs current
   * market price.
   */
  costBasis: number;
  /** Realized profit/loss from sells, in EUR. */
  realizedPnL: number;
}

export interface PortfolioSummary {
  totalValue: number; // current value of all holdings at live prices
  totalCost: number; // sum of cost basis across open positions
  totalRealizedPnL: number; // realized across all sells
  totalUnrealizedPnL: number; // open positions: value - cost
  totalPnL: number; // realized + unrealized
  totalPnLPercent: number;
  /** % change of total value over the last 24h, weighted by allocation. */
  change24hPercent: number;
}

export const TX_KIND_LABELS: Record<TxKind, string> = {
  buy: "Kauf",
  sell: "Verkauf",
  transfer_in: "Transfer rein",
  transfer_out: "Transfer raus",
};

export const TX_KIND_COLORS: Record<TxKind, string> = {
  buy: "text-price-up",
  sell: "text-price-down",
  transfer_in: "text-muted-foreground",
  transfer_out: "text-muted-foreground",
};

/** Portfolio chart timeframes — narrower than the per-coin chart options. */
export type PortfolioTimeframe = "24h" | "7d" | "30d" | "90d" | "1y" | "all";

export const PORTFOLIO_TIMEFRAMES: PortfolioTimeframe[] = [
  "24h",
  "7d",
  "30d",
  "90d",
  "1y",
  "all",
];

export function portfolioTfToDays(tf: PortfolioTimeframe): number {
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

export function portfolioTfLabel(tf: PortfolioTimeframe): string {
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

/** Three overview modes the user can toggle. */
export type OverviewMode = "holdings" | "pnl" | "allocation";

export const OVERVIEW_MODE_LABELS: Record<OverviewMode, string> = {
  holdings: "Bestände",
  pnl: "Gesamtgewinn",
  allocation: "Verteilung",
};
