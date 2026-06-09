import { useBackendWatchlist, useSetBackendWatchlist } from "@/lib/api";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback } from "react";

/**
 * Account-bound watchlist. Data lives only in the backend canister, keyed by
 * the caller's Internet Identity principal. When the user is not logged in the
 * watchlist is empty and mutations are no-ops — the UI should prompt a login.
 */
export function useWatchlist() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const { data: backendIds, isLoading } = useBackendWatchlist();
  const setBackend = useSetBackendWatchlist();

  const ids = isAuthenticated ? (backendIds ?? []) : [];

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      if (!isAuthenticated) return;
      const current = backendIds ?? [];
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      setBackend.mutate(next);
    },
    [isAuthenticated, backendIds, setBackend],
  );

  const clear = useCallback(() => {
    if (!isAuthenticated) return;
    setBackend.mutate([]);
  }, [isAuthenticated, setBackend]);

  return { ids, has, toggle, clear, isAuthenticated, isLoading };
}
