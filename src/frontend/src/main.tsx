import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SettingsProvider } from "./contexts/SettingsContext";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // CoinGecko's free tier rate-limits aggressively (HTTP 429). Without a
      // sensible retry policy a single 429 leaves charts stuck on "loading" or
      // failed. We retry a few times with exponential backoff, but never retry
      // a 429 immediately (that just burns more of the limit).
      retry: (failureCount, error) => {
        const msg = error instanceof Error ? error.message : "";
        const isRateLimit = msg.includes("429");
        // Rate limit: retry up to 4x (backoff gives the limit time to reset).
        if (isRateLimit) return failureCount < 4;
        // Other errors: retry twice.
        return failureCount < 2;
      },
      retryDelay: (attempt, error) => {
        const msg = error instanceof Error ? error.message : "";
        const isRateLimit = msg.includes("429");
        // Rate limit: longer waits (2s, 4s, 8s, 16s, capped at 20s).
        // Other errors: quick backoff (0.5s, 1s, 2s).
        const base = isRateLimit ? 2000 : 500;
        return Math.min(base * 2 ** attempt, 20_000);
      },
      // Don't refetch everything every time the user switches back to the tab —
      // that silently doubles request volume.
      refetchOnWindowFocus: false,
      // Keep showing cached data while refetching in the background.
      gcTime: 30 * 60_000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
