import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/contexts/SettingsContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useMarketDataInfinite } from "@/lib/api";
import { formatPrice, formatQuantity } from "@/lib/format";
import type { Coin } from "@/types/coin";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  AlertCircleIcon,
  ArrowLeftRightIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  SearchIcon,
  WalletIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type Tab = "buy" | "sell";
type ModalState =
  | { kind: "hidden" }
  | { kind: "confirm_buy"; coin: Coin; amount: number; quantity: number }
  | {
      kind: "confirm_sell";
      holding: { coinId: string; symbol: string; quantity: number };
      qty: number;
      proceeds: number;
      price: number;
    }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const stripePromise = loadStripe("pk_test_placeholder");

export default function TradePage() {
  const { t, formatMoney } = useSettings();
  const { holdings, addTransaction, isAuthenticated } = usePortfolio();
  const { data: pages } = useMarketDataInfinite();

  const [tab, setTab] = useState<Tab>("buy");

  // BUY state
  const [buySearch, setBuySearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [buyAmount, setBuyAmount] = useState("");

  // SELL state
  const [selectedHoldingId, setSelectedHoldingId] = useState<string>("");
  const [sellQty, setSellQty] = useState("");

  const [modal, setModal] = useState<ModalState>({ kind: "hidden" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allCoins: Coin[] = useMemo(() => {
    if (!pages) return [];
    return pages.pages.flatMap((p) => p.coins as Coin[]);
  }, [pages]);

  const filteredCoins = useMemo(() => {
    const q = buySearch.trim().toLowerCase();
    if (!q) return allCoins.slice(0, 20);
    return allCoins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q),
    );
  }, [allCoins, buySearch]);

  const selectedHolding = useMemo(
    () => holdings.find((h) => h.coinId === selectedHoldingId) || null,
    [holdings, selectedHoldingId],
  );

  const buyQuantity = useMemo(() => {
    const amount = Number.parseFloat(buyAmount);
    if (!selectedCoin || !amount || amount <= 0) return 0;
    return amount / selectedCoin.currentPrice;
  }, [buyAmount, selectedCoin]);

  const sellProceeds = useMemo(() => {
    const qty = Number.parseFloat(sellQty);
    if (!selectedHolding || !qty || qty <= 0) return 0;
    const price =
      allCoins.find((c) => c.id === selectedHolding.coinId)?.currentPrice ?? 0;
    return qty * price;
  }, [sellQty, selectedHolding, allCoins]);

  const sellPrice = useMemo(() => {
    if (!selectedHolding) return 0;
    return (
      allCoins.find((c) => c.id === selectedHolding.coinId)?.currentPrice ?? 0
    );
  }, [selectedHolding, allCoins]);

  const handleBuyClick = useCallback(() => {
    const amount = Number.parseFloat(buyAmount);
    if (!selectedCoin || !amount || amount <= 0) return;
    const qty = amount / selectedCoin.currentPrice;
    setModal({
      kind: "confirm_buy",
      coin: selectedCoin,
      amount,
      quantity: qty,
    });
  }, [buyAmount, selectedCoin]);

  const handleSellClick = useCallback(() => {
    const qty = Number.parseFloat(sellQty);
    if (!selectedHolding || !qty || qty <= 0) return;
    const price =
      allCoins.find((c) => c.id === selectedHolding.coinId)?.currentPrice ?? 0;
    const proceeds = qty * price;
    setModal({
      kind: "confirm_sell",
      holding: selectedHolding,
      qty,
      proceeds,
      price,
    });
  }, [sellQty, selectedHolding, allCoins]);

  const executeBuy = useCallback(async () => {
    if (modal.kind !== "confirm_buy") return;
    setIsSubmitting(true);
    try {
      addTransaction({
        coinId: modal.coin.id,
        symbol: modal.coin.symbol,
        kind: "buy",
        quantity: modal.quantity,
        pricePerUnit: modal.coin.currentPrice,
        timestamp: Date.now(),
      });
      setModal({
        kind: "success",
        message: t("trade.successBuy", {
          quantity: formatQuantity(modal.quantity),
          symbol: modal.coin.symbol,
          amount: formatMoney(modal.amount),
        }),
      });
      setBuyAmount("");
      setSelectedCoin(null);
      setBuySearch("");
    } catch {
      setModal({ kind: "error", message: t("trade.error") });
    } finally {
      setIsSubmitting(false);
    }
  }, [modal, addTransaction, t, formatMoney]);

  const executeSell = useCallback(async () => {
    if (modal.kind !== "confirm_sell") return;
    setIsSubmitting(true);
    try {
      addTransaction({
        coinId: modal.holding.coinId,
        symbol: modal.holding.symbol,
        kind: "sell",
        quantity: modal.qty,
        pricePerUnit: modal.price,
        timestamp: Date.now(),
      });
      setModal({
        kind: "success",
        message: t("trade.successSell", {
          quantity: formatQuantity(modal.qty),
          symbol: modal.holding.symbol,
          amount: formatMoney(modal.proceeds),
        }),
      });
      setSellQty("");
      setSelectedHoldingId("");
    } catch {
      setModal({ kind: "error", message: t("trade.error") });
    } finally {
      setIsSubmitting(false);
    }
  }, [modal, addTransaction, t, formatMoney]);

  const closeModal = useCallback(() => setModal({ kind: "hidden" }), []);

  return (
    <Layout>
      <div className="px-4 sm:px-6 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRightIcon className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-display font-bold text-foreground">
            {t("trade.title")}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={tab === "buy" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setTab("buy")}
            data-ocid="trade.buy_tab"
          >
            <CreditCardIcon className="w-4 h-4 mr-2" />
            {t("trade.buy")}
          </Button>
          <Button
            variant={tab === "sell" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setTab("sell")}
            data-ocid="trade.sell_tab"
          >
            <WalletIcon className="w-4 h-4 mr-2" />
            {t("trade.sell")}
          </Button>
        </div>

        {tab === "buy" && (
          <div className="space-y-5">
            {/* Coin search */}
            <div className="space-y-2">
              <Label>{t("trade.selectCoin")}</Label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t("market.search")}
                  value={buySearch}
                  onChange={(e) => setBuySearch(e.target.value)}
                  className="pl-9"
                  data-ocid="trade.search_input"
                />
              </div>
              <div className="max-h-48 overflow-y-auto border border-border rounded-lg bg-card">
                {filteredCoins.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground">
                    {t("market.noResults", { query: buySearch })}
                  </div>
                ) : (
                  filteredCoins.map((coin) => (
                    <button
                      key={coin.id}
                      type="button"
                      onClick={() => {
                        setSelectedCoin(coin);
                        setBuySearch(`${coin.symbol} — ${coin.name}`);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors ${
                        selectedCoin?.id === coin.id ? "bg-muted" : ""
                      }`}
                      data-ocid={`trade.coin.item.${coin.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.symbol}
                          className="w-6 h-6 rounded-full"
                          loading="lazy"
                        />
                        <div>
                          <div className="font-medium text-sm text-foreground">
                            {coin.symbol}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {coin.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-mono text-foreground">
                        {formatPrice(coin.currentPrice)}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Fiat amount */}
            <div className="space-y-2">
              <Label>{t("trade.fiatAmount")}</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                data-ocid="trade.fiat_input"
              />
            </div>

            {/* Derived quantity */}
            {selectedCoin && buyQuantity > 0 && (
              <div className="rounded-lg bg-muted p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("trade.price")}
                  </span>
                  <span className="font-mono text-foreground">
                    {formatPrice(selectedCoin.currentPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("trade.quantity")}
                  </span>
                  <span className="font-mono text-foreground">
                    {formatQuantity(buyQuantity)} {selectedCoin.symbol}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("trade.total")}
                  </span>
                  <span className="font-mono font-semibold text-foreground">
                    {formatMoney(Number.parseFloat(buyAmount || "0"))}
                  </span>
                </div>
              </div>
            )}

            {/* Stripe card + pay */}
            {selectedCoin && Number.parseFloat(buyAmount) > 0 && (
              <div className="space-y-3">
                <Label>{t("trade.cardDetails")}</Label>
                <Elements stripe={stripePromise}>
                  <div className="border border-border rounded-lg p-3 bg-card">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#ffffff",
                            "::placeholder": { color: "#aab7c4" },
                          },
                        },
                      }}
                    />
                  </div>
                </Elements>
                <Button
                  className="w-full"
                  onClick={handleBuyClick}
                  disabled={isSubmitting}
                  data-ocid="trade.pay_button"
                >
                  <CreditCardIcon className="w-4 h-4 mr-2" />
                  {t("trade.pay")}
                </Button>
              </div>
            )}
          </div>
        )}

        {tab === "sell" && (
          <div className="space-y-5">
            {!isAuthenticated || holdings.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <WalletIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>{t("trade.noHoldings")}</p>
              </div>
            ) : (
              <>
                {/* Holding select */}
                <div className="space-y-2">
                  <Label>{t("trade.selectHolding")}</Label>
                  <div className="max-h-48 overflow-y-auto border border-border rounded-lg bg-card">
                    {holdings.map((h) => (
                      <button
                        key={h.coinId}
                        type="button"
                        onClick={() => setSelectedHoldingId(h.coinId)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted transition-colors ${
                          selectedHoldingId === h.coinId ? "bg-muted" : ""
                        }`}
                        data-ocid={`trade.holding.item.${h.coinId}`}
                      >
                        <div>
                          <div className="font-medium text-sm text-foreground">
                            {h.symbol}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t("trade.holding")}: {formatQuantity(h.quantity)}
                          </div>
                        </div>
                        <div className="text-sm font-mono text-foreground">
                          {formatPrice(
                            allCoins.find((c) => c.id === h.coinId)
                              ?.currentPrice ?? 0,
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity input */}
                <div className="space-y-2">
                  <Label>{t("trade.enterQuantity")}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0.00"
                    value={sellQty}
                    onChange={(e) => setSellQty(e.target.value)}
                    data-ocid="trade.quantity_input"
                  />
                </div>

                {/* Derived proceeds */}
                {selectedHolding && Number.parseFloat(sellQty) > 0 && (
                  <div className="rounded-lg bg-muted p-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("trade.price")}
                      </span>
                      <span className="font-mono text-foreground">
                        {formatPrice(sellPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("trade.proceeds")}
                      </span>
                      <span className="font-mono font-semibold text-foreground">
                        {formatMoney(sellProceeds)}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={handleSellClick}
                  disabled={
                    !selectedHolding ||
                    Number.parseFloat(sellQty) <= 0 ||
                    isSubmitting
                  }
                  data-ocid="trade.confirmSell_button"
                >
                  <WalletIcon className="w-4 h-4 mr-2" />
                  {t("trade.confirmSell")}
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Confirmation / Success / Error Modals */}
      <Dialog
        open={modal.kind !== "hidden"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="sm:max-w-md">
          {modal.kind === "confirm_buy" && (
            <>
              <DialogHeader>
                <DialogTitle>{t("trade.confirmTitle")}</DialogTitle>
                <DialogDescription>
                  {t("trade.successBuy", {
                    quantity: formatQuantity(modal.quantity),
                    symbol: modal.coin.symbol,
                    amount: formatMoney(modal.amount),
                  })}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  data-ocid="trade.cancel_button"
                >
                  {t("trade.cancel")}
                </Button>
                <Button
                  onClick={executeBuy}
                  disabled={isSubmitting}
                  data-ocid="trade.confirm_button"
                >
                  {t("trade.confirmButton")}
                </Button>
              </DialogFooter>
            </>
          )}

          {modal.kind === "confirm_sell" && (
            <>
              <DialogHeader>
                <DialogTitle>{t("trade.confirmTitle")}</DialogTitle>
                <DialogDescription>
                  {t("trade.successSell", {
                    quantity: formatQuantity(modal.qty),
                    symbol: modal.holding.symbol,
                    amount: formatMoney(modal.proceeds),
                  })}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  data-ocid="trade.cancel_button"
                >
                  {t("trade.cancel")}
                </Button>
                <Button
                  onClick={executeSell}
                  disabled={isSubmitting}
                  data-ocid="trade.confirm_button"
                >
                  {t("trade.confirmButton")}
                </Button>
              </DialogFooter>
            </>
          )}

          {modal.kind === "success" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckCircle2Icon className="w-5 h-5 text-price-up" />
                  {t("trade.success")}
                </DialogTitle>
                <DialogDescription>{modal.message}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={closeModal} data-ocid="trade.close_button">
                  {t("trade.cancel")}
                </Button>
              </DialogFooter>
            </>
          )}

          {modal.kind === "error" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertCircleIcon className="w-5 h-5 text-price-down" />
                  {t("trade.error")}
                </DialogTitle>
                <DialogDescription>{modal.message}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={closeModal}
                  variant="destructive"
                  data-ocid="trade.close_button"
                >
                  {t("trade.cancel")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
