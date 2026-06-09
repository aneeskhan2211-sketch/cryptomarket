import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/format";
import type { Coin } from "@/types/coin";
import type { Transaction, TxKind } from "@/types/portfolio";
import { TX_KIND_LABELS } from "@/types/portfolio";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Coins available for the searchable picker (top 1000 from market). */
  availableCoins: Coin[];
  /** Pre-fill the coin picker when set (e.g. opened from a holding row). */
  initialCoinId?: string | null;
  /** Editing an existing transaction. When set, modal switches to edit mode. */
  editTx?: Transaction | null;
  onSubmit: (tx: Omit<Transaction, "id"> & { id?: string }) => void;
}

const KINDS: TxKind[] = ["buy", "sell", "transfer_in", "transfer_out"];

function todayIso(): string {
  const d = new Date();
  // Local datetime-local format: YYYY-MM-DDTHH:mm
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromTimestamp(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TransactionModal({
  open,
  onOpenChange,
  availableCoins,
  initialCoinId,
  editTx,
  onSubmit,
}: TransactionModalProps) {
  const [kind, setKind] = useState<TxKind>("buy");
  const [coinId, setCoinId] = useState<string | null>(null);
  const [coinSearch, setCoinSearch] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(todayIso());
  const [notes, setNotes] = useState("");

  // Reset / hydrate state whenever the modal opens.
  useEffect(() => {
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

  const coinsById = useMemo(() => {
    const m = new Map<string, Coin>();
    for (const c of availableCoins) m.set(c.id, c);
    return m;
  }, [availableCoins]);

  const selectedCoin = coinId ? coinsById.get(coinId) : null;

  // Auto-fill price with current market price when the coin is picked and the
  // user hasn't entered a custom price yet.
  useEffect(() => {
    if (!selectedCoin) return;
    if (price !== "") return;
    if (editTx) return;
    if (kind === "transfer_in" || kind === "transfer_out") return;
    setPrice(String(selectedCoin.currentPrice));
  }, [selectedCoin, price, editTx, kind]);

  const filteredCoins = useMemo(() => {
    const q = coinSearch.trim().toLowerCase();
    if (!q) return availableCoins.slice(0, 50);
    return availableCoins
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q),
      )
      .slice(0, 50);
  }, [availableCoins, coinSearch]);

  const canSubmit =
    coinId !== null &&
    quantity !== "" &&
    Number.parseFloat(quantity) > 0 &&
    (kind === "transfer_in" ||
      kind === "transfer_out" ||
      (price !== "" && Number.parseFloat(price) >= 0));

  function handleSubmit() {
    if (!canSubmit || !coinId) return;
    const coin = coinsById.get(coinId);
    onSubmit({
      id: editTx?.id,
      kind,
      coinId,
      symbol: coin?.symbol ?? editTx?.symbol ?? "",
      quantity: Number.parseFloat(quantity),
      pricePerUnit: price === "" ? 0 : Number.parseFloat(price),
      timestamp: new Date(date).getTime(),
      notes: notes.trim() || undefined,
    });
    onOpenChange(false);
  }

  const showPrice = kind === "buy" || kind === "sell";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border/60 max-w-md p-0"
        data-ocid="portfolio.tx_modal"
      >
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border/40">
          <DialogTitle className="text-lg font-display font-bold text-foreground">
            {editTx ? "Transaktion bearbeiten" : "Neue Transaktion"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Kind selector */}
          <div className="grid grid-cols-4 gap-1.5 rounded-lg border border-border/60 bg-background p-1">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`px-2 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  kind === k
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`portfolio.tx_modal.kind_${k}`}
              >
                {TX_KIND_LABELS[k]}
              </button>
            ))}
          </div>

          {/* Coin picker */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Coin</Label>
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-background hover:bg-card/60 transition-colors text-left"
              data-ocid="portfolio.tx_modal.coin_picker_toggle"
            >
              {selectedCoin ? (
                <>
                  <img
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    className="w-6 h-6 rounded-full shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.visibility =
                        "hidden";
                    }}
                  />
                  <span className="text-sm font-display font-semibold text-foreground truncate flex-1">
                    {selectedCoin.name}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {selectedCoin.symbol}
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Coin auswählen...
                </span>
              )}
              <SearchIcon className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>

            {pickerOpen && (
              <div className="rounded-lg border border-border/60 bg-background overflow-hidden">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    value={coinSearch}
                    onChange={(e) => setCoinSearch(e.target.value)}
                    placeholder="Name oder Symbol..."
                    className="pl-9 border-0 border-b border-border/60 rounded-none bg-transparent focus:ring-0"
                    autoFocus
                    data-ocid="portfolio.tx_modal.coin_search_input"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredCoins.length === 0 ? (
                    <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                      Keine Coins gefunden.
                    </p>
                  ) : (
                    filteredCoins.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setCoinId(c.id);
                          setPickerOpen(false);
                          setCoinSearch("");
                          // Clear price so the auto-fill effect kicks in.
                          if (!editTx) setPrice("");
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-card transition-colors text-left"
                        data-ocid={`portfolio.tx_modal.coin_option.${c.id}`}
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-6 h-6 rounded-full shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.visibility =
                              "hidden";
                          }}
                        />
                        <span className="text-sm font-medium text-foreground truncate flex-1">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {c.symbol}
                        </span>
                        <span className="text-xs font-mono text-foreground tabular-nums shrink-0">
                          {formatPrice(c.currentPrice)}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <Label htmlFor="tx-qty" className="text-xs text-muted-foreground">
              Menge
            </Label>
            <Input
              id="tx-qty"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0,00"
              className="bg-background border-border/60 font-mono tabular-nums"
              data-ocid="portfolio.tx_modal.quantity"
            />
          </div>

          {/* Price */}
          {showPrice && (
            <div className="space-y-1.5">
              <Label
                htmlFor="tx-price"
                className="text-xs text-muted-foreground"
              >
                Preis pro Coin (EUR)
              </Label>
              <Input
                id="tx-price"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
                className="bg-background border-border/60 font-mono tabular-nums"
                data-ocid="portfolio.tx_modal.price"
              />
            </div>
          )}

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="tx-date" className="text-xs text-muted-foreground">
              Datum
            </Label>
            <Input
              id="tx-date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-background border-border/60 font-mono"
              data-ocid="portfolio.tx_modal.date"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="tx-notes" className="text-xs text-muted-foreground">
              Notiz (optional)
            </Label>
            <Input
              id="tx-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="z.B. Käufer, Wallet, Quelle"
              className="bg-background border-border/60"
              data-ocid="portfolio.tx_modal.notes"
            />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border/40 flex gap-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            data-ocid="portfolio.tx_modal.cancel"
          >
            <XIcon className="w-4 h-4 mr-1" />
            Abbrechen
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="portfolio.tx_modal.submit"
          >
            {editTx ? "Speichern" : "Hinzufügen"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
