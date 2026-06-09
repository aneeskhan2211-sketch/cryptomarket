import { createActor } from "@/backend";
import { Variant_above_below } from "@/backend";
import type { PriceAlert } from "@/backend";
import { useToast } from "@/components/ToastNotifier";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";

export function usePriceAlerts() {
  const { actor, isFetching } = useActor(createActor);
  const { addToast } = useToast();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const fetchAlerts = useCallback(async () => {
    if (!actor || isFetching) return;
    try {
      const data = await actor.getPriceAlerts();
      setAlerts(data);
    } catch {
      // silently fail — alerts are non-critical
    }
  }, [actor, isFetching]);

  useEffect(() => {
    if (actor && !isFetching) {
      fetchAlerts();
    }
  }, [actor, isFetching, fetchAlerts]);

  const createAlert = useCallback(
    async (
      coinId: string,
      coinName: string,
      targetPrice: number,
      direction: "above" | "below",
    ) => {
      if (!actor) return;
      const alert: PriceAlert = {
        id: `${Date.now()}-${coinId}`,
        coinId,
        coinName,
        targetPrice,
        direction:
          direction === "above"
            ? Variant_above_below.above
            : Variant_above_below.below,
        triggered: false,
        createdAt: BigInt(Date.now()) * 1_000_000n,
      };
      const res = await actor.setPriceAlert(alert);
      if (res.__kind__ === "ok") {
        await fetchAlerts();
      }
    },
    [actor, fetchAlerts],
  );

  const removeAlert = useCallback(
    async (id: string) => {
      if (!actor) return;
      const res = await actor.deletePriceAlert(id);
      if (res.__kind__ === "ok") {
        await fetchAlerts();
      }
    },
    [actor, fetchAlerts],
  );

  const toggleAlert = useCallback(
    async (id: string, triggered: boolean) => {
      if (!actor) return;
      const res = await actor.updatePriceAlert(id, triggered);
      if (res.__kind__ === "ok") {
        await fetchAlerts();
      }
    },
    [actor, fetchAlerts],
  );

  const checkAlerts = useCallback(
    async (currentPrices: Record<string, number>) => {
      if (!actor) return;
      const triggered: PriceAlert[] = [];
      for (const alert of alerts) {
        if (alert.triggered) continue;
        const price = currentPrices[alert.coinId];
        if (price == null) continue;
        const crossed =
          alert.direction === Variant_above_below.above
            ? price >= alert.targetPrice
            : price <= alert.targetPrice;
        if (crossed) {
          triggered.push(alert);
        }
      }
      for (const alert of triggered) {
        addToast(
          `Price alert: ${alert.coinName} is ${alert.direction === Variant_above_below.above ? "above" : "below"} ${alert.targetPrice}`,
          "warning",
        );
        await actor.updatePriceAlert(alert.id, true);
      }
      if (triggered.length > 0) {
        await fetchAlerts();
      }
    },
    [alerts, actor, addToast, fetchAlerts],
  );

  return {
    alerts,
    fetchAlerts,
    createAlert,
    removeAlert,
    toggleAlert,
    checkAlerts,
  };
}
