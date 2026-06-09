import {
  useBackendPortfolioTransactions,
  useSetBackendPortfolioTransactions,
} from "@/lib/api";
import type { Holding, Transaction } from "@/types/portfolio";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useMemo, useState } from "react";

// Privacy is a per-device display preference (hide/show portfolio values), not
// user data, so it stays in localStorage and does not require an account.
const PRIVACY_KEY = "cryptomarket.portfolio.privacy.v1";

function readPrivacy(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PRIVACY_KEY) === "true";
  } catch {
    return false;
  }
}

function writePrivacy(v: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PRIVACY_KEY, v ? "true" : "false");
  } catch {
    /* ignore */
  }
}

function makeId(): string {
  // Lightweight unique id without bringing in a uuid lib.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Derive holdings from a transaction list using a weighted-average cost basis.
 *
 * On buy:   quantity += q; costBasis += q * price
 * On sell:  realized += proceeds - q * avgCost; quantity/costBasis reduced
 * On transfer_in:   quantity += q; costBasis += q * price (if price > 0)
 * On transfer_out:  proportional cost basis reduction, no realized P/L
 */
export function deriveHoldings(txs: Transaction[]): Holding[] {
  const sorted = [...txs].sort((a, b) => a.timestamp - b.timestamp);
  const map = new Map<string, Holding>();
  for (const tx of sorted) {
    let h = map.get(tx.coinId);
    if (!h) {
      h = {
        coinId: tx.coinId,
        symbol: tx.symbol,
        quantity: 0,
        costBasis: 0,
        realizedPnL: 0,
      };
      map.set(tx.coinId, h);
    }
    if (tx.symbol) h.symbol = tx.symbol;

    if (tx.kind === "buy") {
      h.quantity += tx.quantity;
      h.costBasis += tx.quantity * tx.pricePerUnit;
    } else if (tx.kind === "sell") {
      const sellQty = Math.min(tx.quantity, h.quantity);
      if (sellQty <= 0) continue;
      const avgCost = h.quantity > 0 ? h.costBasis / h.quantity : 0;
      const proceeds = sellQty * tx.pricePerUnit;
      h.realizedPnL += proceeds - sellQty * avgCost;
      h.quantity -= sellQty;
      h.costBasis -= sellQty * avgCost;
      if (h.quantity < 1e-12) {
        h.quantity = 0;
        h.costBasis = 0;
      }
    } else if (tx.kind === "transfer_in") {
      h.quantity += tx.quantity;
      if (tx.pricePerUnit > 0) {
        h.costBasis += tx.quantity * tx.pricePerUnit;
      }
    } else if (tx.kind === "transfer_out") {
      const outQty = Math.min(tx.quantity, h.quantity);
      if (outQty <= 0) continue;
      const avgCost = h.quantity > 0 ? h.costBasis / h.quantity : 0;
      h.quantity -= outQty;
      h.costBasis -= outQty * avgCost;
      if (h.quantity < 1e-12) {
        h.quantity = 0;
        h.costBasis = 0;
      }
    }
  }
  return Array.from(map.values()).filter(
    (h) => h.quantity > 0 || h.realizedPnL !== 0,
  );
}

/**
 * Account-bound portfolio. All transaction data lives only in the backend
 * canister, keyed by the caller's Internet Identity principal. When not logged
 * in, the portfolio is empty and all mutations are no-ops — the UI prompts a
 * login. The privacy display toggle is the only thing kept locally.
 */
export function usePortfolio() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const { data: backendTxs, isLoading } = useBackendPortfolioTransactions();
  const setBackendTxs = useSetBackendPortfolioTransactions();

  const [privacy, setPrivacy] = useState<boolean>(() => readPrivacy());

  useEffect(() => {
    writePrivacy(privacy);
  }, [privacy]);

  // Sync the privacy preference across tabs.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: StorageEvent) => {
      if (e.key === PRIVACY_KEY) setPrivacy(readPrivacy());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const txs = isAuthenticated ? (backendTxs ?? []) : [];

  const addTransaction = useCallback(
    (tx: Omit<Transaction, "id">) => {
      const next: Transaction = { ...tx, id: makeId() };
      if (!isAuthenticated) return next;
      const updated = [...(backendTxs ?? []), next];
      setBackendTxs.mutate(updated);
      return next;
    },
    [isAuthenticated, backendTxs, setBackendTxs],
  );

  const updateTransaction = useCallback(
    (id: string, patch: Partial<Omit<Transaction, "id">>) => {
      if (!isAuthenticated) return;
      const updated = (backendTxs ?? []).map((t) =>
        t.id === id ? { ...t, ...patch } : t,
      );
      setBackendTxs.mutate(updated);
    },
    [isAuthenticated, backendTxs, setBackendTxs],
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      if (!isAuthenticated) return;
      const updated = (backendTxs ?? []).filter((t) => t.id !== id);
      setBackendTxs.mutate(updated);
    },
    [isAuthenticated, backendTxs, setBackendTxs],
  );

  const clearAll = useCallback(() => {
    if (!isAuthenticated) return;
    setBackendTxs.mutate([]);
  }, [isAuthenticated, setBackendTxs]);

  const togglePrivacy = useCallback(() => setPrivacy((p) => !p), []);

  const holdings = useMemo(() => deriveHoldings(txs), [txs]);
  const heldCoinIds = useMemo(
    () => holdings.filter((h) => h.quantity > 0).map((h) => h.coinId),
    [holdings],
  );

  return {
    txs,
    holdings,
    heldCoinIds,
    privacy,
    isAuthenticated,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearAll,
    togglePrivacy,
  };
}
