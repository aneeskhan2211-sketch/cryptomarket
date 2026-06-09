import { CoinChartWidget } from "@/components/CoinChartWidget";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSettings } from "@/contexts/SettingsContext";
import { useCoinDetail, useCoinNews } from "@/lib/api";
import {
  formatMarketCap,
  formatPercent,
  formatPrice,
  formatSupply,
} from "@/lib/format";
import type { Coin } from "@/types/coin";
import {
  ExternalLinkIcon,
  GithubIcon,
  GlobeIcon,
  MessageCircleIcon,
  NewspaperIcon,
  SearchIcon,
  StarIcon,
  TwitterIcon,
} from "lucide-react";
import { type ReactNode, useState } from "react";

type DetailTab = "chart" | "info" | "news";

function TabButton({
  active,
  label,
  onClick,
  dataOcid,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  dataOcid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
      data-ocid={dataOcid}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </button>
  );
}

function NewsSkeleton() {
  return (
    <div className="space-y-3 px-4 py-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

interface CoinDetailDrawerProps {
  coin: Coin | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function StatRow({
  label,
  value,
  trend,
}: { label: string; value: string; trend?: number }) {
  const trendColor =
    trend === undefined
      ? "text-foreground"
      : trend >= 0
        ? "text-price-up"
        : "text-price-down";
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-b-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-mono font-semibold tabular-nums ${trendColor}`}
      >
        {value}
      </span>
    </div>
  );
}

function LinkChip({
  icon,
  label,
  url,
}: { icon: ReactNode; label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-background/40 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
      data-ocid={`coinDetail.link.${label}`}
    >
      {icon}
      {label}
      <ExternalLinkIcon className="w-3 h-3 opacity-50" />
    </a>
  );
}

/** Strips HTML tags from CoinGecko's description text. */
function stripHtml(html: string): string {
  return html
    .replace(/<a[^>]*>/gi, "")
    .replace(/<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function CoinDetailDrawer({
  coin,
  open,
  onOpenChange,
  isFavorite,
  onToggleFavorite,
}: CoinDetailDrawerProps) {
  const { t, settings } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<DetailTab>("chart");
  const { data: detail } = useCoinDetail(coin?.id ?? null, open);
  const { data: newsItems, isLoading: newsLoading } = useCoinNews(
    coin?.id ?? null,
    open && activeTab === "news",
  );

  if (!coin) return null;
  const positive24h = coin.priceChangePercentage24h >= 0;

  const locale =
    settings.language === "de"
      ? "de-DE"
      : settings.language === "es"
        ? "es-ES"
        : settings.language === "fr"
          ? "fr-FR"
          : "en-US";
  const fmtDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const description = detail?.descriptionEn
    ? stripHtml(detail.descriptionEn)
    : "";
  const maxSupply = detail?.maxSupply ?? null;
  const supplyPct =
    maxSupply && maxSupply > 0
      ? Math.min(100, (coin.circulatingSupply / maxSupply) * 100)
      : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl bg-card border-border/60 overflow-y-auto p-0"
        data-ocid="coinDetail.drawer"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border/40">
          <div className="flex items-center gap-3">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-12 h-12 rounded-full shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.visibility = "hidden";
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-lg font-display font-bold text-foreground truncate">
                  {coin.name}
                </SheetTitle>
                <span className="text-xs text-muted-foreground uppercase tracking-wider shrink-0">
                  {coin.symbol}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 rounded bg-muted/40 shrink-0">
                  #{coin.marketCapRank}
                </span>
              </div>
              <SheetDescription className="text-xs flex items-baseline gap-2">
                <span className="font-mono text-foreground tabular-nums">
                  {formatPrice(coin.currentPrice)}
                </span>
                <span
                  className={`font-semibold tabular-nums ${positive24h ? "text-price-up" : "text-price-down"}`}
                >
                  {formatPercent(coin.priceChangePercentage24h)} (24h)
                </span>
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => onToggleFavorite(coin.id)}
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                isFavorite
                  ? "bg-primary/15 border-primary/30 text-primary"
                  : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
              }`}
              aria-label={
                isFavorite
                  ? t("detail.removeWatchlist")
                  : t("detail.addWatchlist")
              }
              data-ocid="coinDetail.favorite_button"
            >
              <StarIcon
                className="w-4 h-4"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
        </SheetHeader>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-5 border-b border-border/40">
          <TabButton
            active={activeTab === "chart"}
            label={t("detail.performance")}
            onClick={() => setActiveTab("chart")}
            dataOcid="coinDetail.tab.chart"
          />
          <TabButton
            active={activeTab === "info"}
            label={t("detail.marketData")}
            onClick={() => setActiveTab("info")}
            dataOcid="coinDetail.tab.info"
          />
          <TabButton
            active={activeTab === "news"}
            label={t("news.tab")}
            onClick={() => setActiveTab("news")}
            dataOcid="coinDetail.tab.news"
          />
        </div>

        <div className="px-5 py-4 space-y-5">
          {activeTab === "chart" && (
            <>
              {/* Interactive chart */}
              <CoinChartWidget coinId={coin.id} open={open} />

              {/* Performance grid */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {t("detail.performance")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "1h", value: coin.priceChangePercentage1h },
                    { label: "24h", value: coin.priceChangePercentage24h },
                    { label: "7d", value: coin.priceChangePercentage7d },
                  ].map((p) => {
                    const pos = p.value >= 0;
                    return (
                      <div
                        key={p.label}
                        className="rounded-lg border border-border/50 bg-background/40 px-3 py-2.5 text-center"
                      >
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {p.label}
                        </p>
                        <p
                          className={`text-sm font-mono font-semibold tabular-nums mt-0.5 ${pos ? "text-price-up" : "text-price-down"}`}
                        >
                          {formatPercent(p.value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === "info" && (
            <>
              {/* Links */}
              {detail &&
                (detail.homepage ||
                  detail.explorer ||
                  detail.twitter ||
                  detail.reddit ||
                  detail.github) && (
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {t("detail.links")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {detail.homepage && (
                        <LinkChip
                          icon={<GlobeIcon className="w-3.5 h-3.5" />}
                          label={t("detail.website")}
                          url={detail.homepage}
                        />
                      )}
                      {detail.explorer && (
                        <LinkChip
                          icon={<SearchIcon className="w-3.5 h-3.5" />}
                          label={t("detail.explorer")}
                          url={detail.explorer}
                        />
                      )}
                      {detail.twitter && (
                        <LinkChip
                          icon={<TwitterIcon className="w-3.5 h-3.5" />}
                          label={t("detail.twitter")}
                          url={detail.twitter}
                        />
                      )}
                      {detail.reddit && (
                        <LinkChip
                          icon={<MessageCircleIcon className="w-3.5 h-3.5" />}
                          label={t("detail.reddit")}
                          url={detail.reddit}
                        />
                      )}
                      {detail.github && (
                        <LinkChip
                          icon={<GithubIcon className="w-3.5 h-3.5" />}
                          label={t("detail.github")}
                          url={detail.github}
                        />
                      )}
                    </div>
                  </div>
                )}

              {/* Market data */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {t("detail.marketData")}
                </p>
                <div className="rounded-lg border border-border/50 bg-background/40 px-3">
                  <StatRow
                    label={t("detail.marketCap")}
                    value={formatMarketCap(coin.marketCap)}
                  />
                  <StatRow
                    label={t("detail.volume24h")}
                    value={formatMarketCap(coin.totalVolume)}
                  />
                  <StatRow
                    label={t("detail.high24h")}
                    value={formatPrice(coin.high24h)}
                  />
                  <StatRow
                    label={t("detail.low24h")}
                    value={formatPrice(coin.low24h)}
                  />
                  <StatRow
                    label={t("detail.ath")}
                    value={formatPrice(coin.ath)}
                    trend={coin.athChangePercentage}
                  />
                  <StatRow
                    label={t("detail.athChange")}
                    value={formatPercent(coin.athChangePercentage)}
                    trend={coin.athChangePercentage}
                  />
                  {detail && detail.atl > 0 && (
                    <>
                      <StatRow
                        label={t("detail.atl")}
                        value={formatPrice(detail.atl)}
                        trend={detail.atlChangePercentage}
                      />
                      <StatRow
                        label={t("detail.atlChange")}
                        value={formatPercent(detail.atlChangePercentage)}
                        trend={detail.atlChangePercentage}
                      />
                    </>
                  )}
                  <StatRow
                    label={t("detail.circulating")}
                    value={formatSupply(coin.circulatingSupply, coin.symbol)}
                  />
                  <StatRow
                    label={t("detail.total")}
                    value={formatSupply(coin.totalSupply, coin.symbol)}
                  />
                  {maxSupply !== null && maxSupply > 0 && (
                    <StatRow
                      label={t("detail.max")}
                      value={formatSupply(maxSupply, coin.symbol)}
                    />
                  )}
                  {detail?.genesisDate && (
                    <StatRow
                      label={t("detail.genesis")}
                      value={fmtDate(detail.genesisDate)}
                    />
                  )}
                </div>

                {/* Supply progress bar */}
                {supplyPct !== null && (
                  <div className="mt-2 px-1">
                    <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/70"
                        style={{ width: `${supplyPct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {t("detail.supplyProgress", {
                        pct: `${supplyPct.toFixed(1)}%`,
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* About / description */}
              {description && (
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {t("detail.about", { name: coin.name })}
                  </p>
                  <p
                    className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-4"}`}
                  >
                    {description}
                  </p>
                  {description.length > 240 && (
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => !e)}
                      className="text-xs font-semibold text-primary hover:underline mt-1.5"
                      data-ocid="coinDetail.read_more"
                    >
                      {expanded ? t("detail.readLess") : t("detail.readMore")}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "news" && (
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <NewspaperIcon className="w-3.5 h-3.5" />
                {t("news.tab")}
              </p>
              {newsLoading ? (
                <NewsSkeleton />
              ) : newsItems && newsItems.length > 0 ? (
                <div className="rounded-lg border border-border/50 bg-background/40 overflow-hidden">
                  {newsItems.map((item, idx) => (
                    <a
                      key={`${item.url}-${idx}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-feed-item block"
                      data-ocid={`coinDetail.news.item.${idx + 1}`}
                    >
                      <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          {item.source}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(item.publishedAt).toLocaleDateString(
                            locale,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-lg border border-border/50 bg-background/40 px-4 py-6 text-center"
                  data-ocid="coinDetail.news.empty_state"
                >
                  <NewspaperIcon className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {t("news.empty")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
