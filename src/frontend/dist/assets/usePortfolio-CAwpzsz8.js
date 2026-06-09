import { n as useInternetIdentity, z as useBackendPortfolioTransactions, A as useSetBackendPortfolioTransactions, r as reactExports } from "./index-CAwuyKvd.js";
const PRIVACY_KEY = "cryptomarket.portfolio.privacy.v1";
function readPrivacy() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PRIVACY_KEY) === "true";
  } catch {
    return false;
  }
}
function writePrivacy(v) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PRIVACY_KEY, v ? "true" : "false");
  } catch {
  }
}
function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function deriveHoldings(txs) {
  const sorted = [...txs].sort((a, b) => a.timestamp - b.timestamp);
  const map = /* @__PURE__ */ new Map();
  for (const tx of sorted) {
    let h = map.get(tx.coinId);
    if (!h) {
      h = {
        coinId: tx.coinId,
        symbol: tx.symbol,
        quantity: 0,
        costBasis: 0,
        realizedPnL: 0
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
    (h) => h.quantity > 0 || h.realizedPnL !== 0
  );
}
function usePortfolio() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { data: backendTxs, isLoading } = useBackendPortfolioTransactions();
  const setBackendTxs = useSetBackendPortfolioTransactions();
  const [privacy, setPrivacy] = reactExports.useState(() => readPrivacy());
  reactExports.useEffect(() => {
    writePrivacy(privacy);
  }, [privacy]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e) => {
      if (e.key === PRIVACY_KEY) setPrivacy(readPrivacy());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  const txs = isAuthenticated ? backendTxs ?? [] : [];
  const addTransaction = reactExports.useCallback(
    (tx) => {
      const next = { ...tx, id: makeId() };
      if (!isAuthenticated) return next;
      const updated = [...backendTxs ?? [], next];
      setBackendTxs.mutate(updated);
      return next;
    },
    [isAuthenticated, backendTxs, setBackendTxs]
  );
  const updateTransaction = reactExports.useCallback(
    (id, patch) => {
      if (!isAuthenticated) return;
      const updated = (backendTxs ?? []).map(
        (t) => t.id === id ? { ...t, ...patch } : t
      );
      setBackendTxs.mutate(updated);
    },
    [isAuthenticated, backendTxs, setBackendTxs]
  );
  const deleteTransaction = reactExports.useCallback(
    (id) => {
      if (!isAuthenticated) return;
      const updated = (backendTxs ?? []).filter((t) => t.id !== id);
      setBackendTxs.mutate(updated);
    },
    [isAuthenticated, backendTxs, setBackendTxs]
  );
  const clearAll = reactExports.useCallback(() => {
    if (!isAuthenticated) return;
    setBackendTxs.mutate([]);
  }, [isAuthenticated, setBackendTxs]);
  const togglePrivacy = reactExports.useCallback(() => setPrivacy((p) => !p), []);
  const holdings = reactExports.useMemo(() => deriveHoldings(txs), [txs]);
  const heldCoinIds = reactExports.useMemo(
    () => holdings.filter((h) => h.quantity > 0).map((h) => h.coinId),
    [holdings]
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
    togglePrivacy
  };
}
export {
  usePortfolio as u
};
