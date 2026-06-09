# Design Brief

## Direction

CryptoMarket — professional, data-dense market-cap dashboard + trading interface + portfolio analytics for German audience. Faster and richer than CoinMarketCap/CoinGecko with live price updates, buy/sell trading, portfolio reports, and Stripe payment integration. Brutalist-minimalist with neon accents: ultra-deep charcoal background, emerald-up / crimson-down, distinct trade colors (buy-green, sell-red), blue analytics accent, purple payment accent.

## Tone

Brutalist-minimalist with precision: ultra-deep charcoal background, vivid neon accents. No decoration, pure information hierarchy. Dual-mode: zen market dashboard + high-contrast trading interface (buy side green, sell side red, center divider). Live connection status pulses in header.

## Differentiation

- Live global stats bar (market cap, 24h volume, BTC/ETH dominance, active coins) + live connection pulse indicator
- Top Movers strip surfaces five biggest gainers/losers per timeframe
- Persistent watchlist (★), stored client-side; reusable tabs (Watchlist, Top Gewinner, Top Verlierer)
- Subtle price-flash highlight (green up, red down, 1.2s settle) on every row
- One-tap coin drawer with 7-day chart, ATH/ATL distance, 24h high/low, supply, volume
- Trade page: buy side (green accent), sell side (red accent), Stripe payment checkout
- Reports page: portfolio analytics, transaction history, blue-accented chart backgrounds
- Auto-refresh: live price updates every 5 seconds with connection indicator
- Settings drawer: theme, colorblind mode, locale (de-DE)

## Color Palette

| Token | OKLCH Light | OKLCH Dark | Role |
|-------|-------------|-----------|------|
| background | 0.99 0.003 260 | 0.10 0.008 260 | Page background |
| foreground | 0.20 0.02 265 | 0.95 0.005 260 | Text on background |
| card | 1 0 0 | 0.14 0.012 265 | Elevated surface |
| primary | 0.62 0.2 145 | 0.72 0.22 145 | Neon emerald accent |
| price-up | 0.62 0.2 145 | 0.72 0.22 145 | Price increase flash |
| price-down | 0.58 0.24 25 | 0.62 0.24 25 | Price decrease flash |
| trade-buy | 0.68 0.24 140 | 0.74 0.26 140 | Trade buy side (vibrant green) |
| trade-sell | 0.60 0.26 20 | 0.68 0.28 20 | Trade sell side (vibrant red) |
| reports-accent | 0.65 0.20 260 | 0.70 0.22 260 | Analytics/reports (cool blue) |
| payment | 0.62 0.22 280 | 0.68 0.24 280 | Stripe payment buttons (purple) |
| connection-live | 0.68 0.24 140 | 0.74 0.26 140 | Live indicator pulse (green) |

## Typography

- Display: Space Grotesk — section headers, coin names, hero numbers
- Body: DM Sans — labels, descriptions, form inputs
- Mono: Geist Mono — prices, percentages, market cap, wallet amounts
- Scale: hero `text-3xl font-bold tracking-tight`, h2 `text-lg font-display font-bold`, label `text-[10px] uppercase tracking-wider`, body `text-sm`, micro `text-[11px]`

## Elevation & Depth

Minimal: card surfaces 1px above background via subtle border. Neon accents handle visual pop. No drop shadows except faint table-card separation.

## Structural Zones

| Zone | Background | Border | Notes |
|------|------------|--------|-------|
| Header | bg-card / 80 | border-border | Sticky, blurred, LIVE pulse + clock |
| Global stats | bg-card | border-border | 5 columns, divided, single row |
| Top movers | bg-card / 60 | border-border | Two scrolling card rows |
| Toolbar | bg-card | border-border | Search · timeframe · refresh |
| Tabs | inline | — | Pill tabs, active gets card bg |
| Market table | bg-background | border-border | Sticky headers |
| Trade page | split | vertical divider | Buy side (green bg), Sell side (red bg), center Stripe form |
| Reports page | bg-card overlay | border-border | Analytics cards, blue-accented chart grids |
| Coin drawer | bg-card | border-l | Slides from right, full-height |
| Connection indicator | animate-pulse-connection | — | Live green pulse in header |
| Settings drawer | bg-card | border-l | Theme, colorblind, locale |
| Footer | bg-card | border-border | Attribution + data source |

## Spacing & Rhythm

Compact density for data: base unit 4px, section gaps 16-24px, card padding 12-16px, row height 56-60px. Mobile shrinks gaps, hides volume/market-cap while keeping price, change, sparkline visible.

## Component Patterns

- Buttons: minimal, transparent or muted fill, rounded 6-8px, no shadows. Icon-only 36×36 square.
- Pills (tabs / timeframe): rounded-md, active state uses card background + 1px border, inactive text-only.
- Cards: 1px border on background, rounded 8-12px, hover shifts background by ~5%.
- Price badges: neon background 10% opacity, neon foreground, rounded 4px, font-semibold, tabular-nums.
- Sparklines: SVG neon stroke 1.5px, matching gradient fill 35% → 0%, inline 88×32px.
- Star button: outline by default, filled emerald in watchlist.
- Trade buttons: buy-green (bg-trade-buy), sell-red (bg-trade-sell), Stripe button purple (bg-payment).
- Connection indicator: green dot (bg-connection-live) with animate-pulse-connection.

## Motion

- Price-flash: 1.2s ease-out background fade on row when price changes
- Connection pulse: 2s infinite pulse on live indicator
- Sheet drawer: 300-500ms slide-in from right, Radix-driven
- Sort arrow: rotates 180° to indicate direction
- Refresh spinner: Tailwind animate-spin on button

No hover scaling, no page transitions, no decorative animation.

## Constraints

- Performance: memoized rows, 60s server-side cache, 30s client-side cache, static SVG sparklines
- Stale-data fallback: previous snapshot returned on HTTP outcall failure
- German formatting (1.234,56 €, Mio, Mrd, Bio) handled in `lib/format.ts`
- Mobile-first: progressive column hiding (volume below md, market-cap/sparkline below sm)
- Keyboard: ⌘K/Ctrl+K focuses search, Esc clears
- Watchlist persisted via localStorage, multi-tab synced via storage event
- Live refresh: polling every 5s with connection indicator
- Stripe integration: payment modal for buy/sell orders

## Signature Detail

Global stats bar never changes, instant timeframe pivoting (1h ↔ 24h ↔ 7d), tap-to-detail drawer, live connection pulse, buy/sell dual-color trading interface, and portfolio analytics dashboard create the feel of a professional trading terminal that respects the eye — high information density without visual noise.
