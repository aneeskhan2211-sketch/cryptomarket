import { formatPrice, formatQuantity } from "@/lib/format";
import type { Coin } from "@/types/coin";
import type { Transaction, TxKind } from "@/types/portfolio";
import { TX_KIND_COLORS, TX_KIND_LABELS } from "@/types/portfolio";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
  TrendingDownIcon,
} from "lucide-react";
import { useMemo } from "react";

interface TransactionsListProps {
  txs: Transaction[];
  coinsById: Map<string, Coin>;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

function kindIcon(kind: TxKind) {
  switch (kind) {
    case "buy":
      return <ShoppingCartIcon className="w-4 h-4" />;
    case "sell":
      return <TrendingDownIcon className="w-4 h-4" />;
    case "transfer_in":
      return <ArrowDownLeftIcon className="w-4 h-4" />;
    case "transfer_out":
      return <ArrowUpRightIcon className="w-4 h-4" />;
  }
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TransactionsList({
  txs,
  coinsById,
  onEdit,
  onDelete,
}: TransactionsListProps) {
  const sorted = useMemo(
    () => [...txs].sort((a, b) => b.timestamp - a.timestamp),
    [txs],
  );

  if (sorted.length === 0) {
    return (
      <div
        className="rounded-xl border border-border/60 bg-background py-10 text-center"
        data-ocid="portfolio.transactions.empty"
      >
        <p className="text-sm text-muted-foreground">
          Noch keine Transaktionen.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Tippe auf „Neue Transaktion" um deinen ersten Eintrag zu erfassen.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-background overflow-hidden shadow-subtle">
      {sorted.map((tx) => {
        const coin = coinsById.get(tx.coinId);
        const total = tx.quantity * tx.pricePerUnit;
        const showPrice =
          tx.kind === "buy" || tx.kind === "sell" || tx.pricePerUnit > 0;
        return (
          <div
            key={tx.id}
            className="grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center px-3 sm:px-4 py-3 border-b border-border/40 last:border-b-0 hover:bg-card/40 transition-colors"
            data-ocid={`portfolio.transactions.row.${tx.id}`}
          >
            <div
              className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-muted/40 ${TX_KIND_COLORS[tx.kind]}`}
            >
              {kindIcon(tx.kind)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-display font-semibold text-foreground truncate">
                  {TX_KIND_LABELS[tx.kind]} {coin?.name ?? tx.symbol}
                </p>
                {coin?.image && (
                  <img
                    src={coin.image}
                    alt=""
                    className="w-4 h-4 rounded-full shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.visibility =
                        "hidden";
                    }}
                  />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {formatDate(tx.timestamp)}
                {tx.notes ? ` · ${tx.notes}` : ""}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-mono text-foreground tabular-nums">
                {formatQuantity(tx.quantity)} {tx.symbol}
              </p>
              {showPrice && (
                <p className="text-[10px] text-muted-foreground tabular-nums">
                  @ {formatPrice(tx.pricePerUnit)} · {formatPrice(total)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onEdit(tx)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                aria-label="Bearbeiten"
                data-ocid={`portfolio.transactions.edit.${tx.id}`}
              >
                <PencilIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(tx.id)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-price-down hover:bg-card transition-colors"
                aria-label="Löschen"
                data-ocid={`portfolio.transactions.delete.${tx.id}`}
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
