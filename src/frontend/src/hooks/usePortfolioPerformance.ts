import { useCoinChart } from "@/lib/api";
import type { LinePoint } from "@/types/coin";
import type { Transaction } from "@/types/portfolio";
import { useMemo } from "react";

export type PerformanceTimeframe = "24h" | "7d" | "30d" | "1y";

const TF_DAYS: Record<PerformanceTimeframe, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "1y": 365,
};

export interface PerformancePoint {
  timestamp: number;
  value: number;
}

export interface UsePortfolioPerformanceResult {
  points: PerformancePoint[];
  isLoading: boolean;
  isError: boolean;
}

/**
 * Build a portfolio value time-series by combining each held coin's
 * historical price chart × the quantity held at each point in time.
 *
 * Uses the existing usePortfolioChart approach: fetches per-coin line charts
 * from CoinGecko and merges them weighted by running quantity.
 */
export function usePortfolioPerformance(
  txs: Transaction[],
  coinIds: string[],
  tf: PerformanceTimeframe,
  enabled = true,
): UsePortfolioPerformanceResult {
  const days = TF_DAYS[tf];
  const MAX = 20;
  const top = useMemo(() => coinIds.slice(0, MAX), [coinIds]);

  const id0 = top[0] ?? null;
  const id1 = top[1] ?? null;
  const id2 = top[2] ?? null;
  const id3 = top[3] ?? null;
  const id4 = top[4] ?? null;
  const id5 = top[5] ?? null;
  const id6 = top[6] ?? null;
  const id7 = top[7] ?? null;
  const id8 = top[8] ?? null;
  const id9 = top[9] ?? null;
  const id10 = top[10] ?? null;
  const id11 = top[11] ?? null;
  const id12 = top[12] ?? null;
  const id13 = top[13] ?? null;
  const id14 = top[14] ?? null;
  const id15 = top[15] ?? null;
  const id16 = top[16] ?? null;
  const id17 = top[17] ?? null;
  const id18 = top[18] ?? null;
  const id19 = top[19] ?? null;

  const q0 = useCoinChart(id0, days, "line", enabled && !!id0);
  const q1 = useCoinChart(id1, days, "line", enabled && !!id1);
  const q2 = useCoinChart(id2, days, "line", enabled && !!id2);
  const q3 = useCoinChart(id3, days, "line", enabled && !!id3);
  const q4 = useCoinChart(id4, days, "line", enabled && !!id4);
  const q5 = useCoinChart(id5, days, "line", enabled && !!id5);
  const q6 = useCoinChart(id6, days, "line", enabled && !!id6);
  const q7 = useCoinChart(id7, days, "line", enabled && !!id7);
  const q8 = useCoinChart(id8, days, "line", enabled && !!id8);
  const q9 = useCoinChart(id9, days, "line", enabled && !!id9);
  const q10 = useCoinChart(id10, days, "line", enabled && !!id10);
  const q11 = useCoinChart(id11, days, "line", enabled && !!id11);
  const q12 = useCoinChart(id12, days, "line", enabled && !!id12);
  const q13 = useCoinChart(id13, days, "line", enabled && !!id13);
  const q14 = useCoinChart(id14, days, "line", enabled && !!id14);
  const q15 = useCoinChart(id15, days, "line", enabled && !!id15);
  const q16 = useCoinChart(id16, days, "line", enabled && !!id16);
  const q17 = useCoinChart(id17, days, "line", enabled && !!id17);
  const q18 = useCoinChart(id18, days, "line", enabled && !!id18);
  const q19 = useCoinChart(id19, days, "line", enabled && !!id19);

  const txsByCoin = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const tx of txs) {
      const list = map.get(tx.coinId) ?? [];
      list.push(tx);
      map.set(tx.coinId, list);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.timestamp - b.timestamp);
    }
    return map;
  }, [txs]);

  const data0 = q0.data;
  const data1 = q1.data;
  const data2 = q2.data;
  const data3 = q3.data;
  const data4 = q4.data;
  const data5 = q5.data;
  const data6 = q6.data;
  const data7 = q7.data;
  const data8 = q8.data;
  const data9 = q9.data;
  const data10 = q10.data;
  const data11 = q11.data;
  const data12 = q12.data;
  const data13 = q13.data;
  const data14 = q14.data;
  const data15 = q15.data;
  const data16 = q16.data;
  const data17 = q17.data;
  const data18 = q18.data;
  const data19 = q19.data;

  const merged = useMemo(() => {
    if (!enabled) return [] as PerformancePoint[];

    const pairs: Array<[string | null, typeof data0]> = [
      [top[0] ?? null, data0],
      [top[1] ?? null, data1],
      [top[2] ?? null, data2],
      [top[3] ?? null, data3],
      [top[4] ?? null, data4],
      [top[5] ?? null, data5],
      [top[6] ?? null, data6],
      [top[7] ?? null, data7],
      [top[8] ?? null, data8],
      [top[9] ?? null, data9],
      [top[10] ?? null, data10],
      [top[11] ?? null, data11],
      [top[12] ?? null, data12],
      [top[13] ?? null, data13],
      [top[14] ?? null, data14],
      [top[15] ?? null, data15],
      [top[16] ?? null, data16],
      [top[17] ?? null, data17],
      [top[18] ?? null, data18],
      [top[19] ?? null, data19],
    ];

    const timestamps = new Set<number>();
    const validQueries: Array<{ coinId: string; line: LinePoint[] }> = [];
    for (const [coinId, data] of pairs) {
      if (!coinId) continue;
      if (data?.line && data.line.length > 0) {
        validQueries.push({ coinId, line: data.line });
        for (const p of data.line) timestamps.add(p.timestamp);
      }
    }
    if (timestamps.size === 0) return [] as PerformancePoint[];

    const sortedTs = Array.from(timestamps).sort((a, b) => a - b);

    const priceCursors = new Map<string, number>();
    for (const { coinId } of validQueries) priceCursors.set(coinId, 0);

    const qtyCursors = new Map<
      string,
      { idx: number; qty: number; cost: number }
    >();
    for (const { coinId } of validQueries) {
      qtyCursors.set(coinId, { idx: 0, qty: 0, cost: 0 });
    }

    const points: PerformancePoint[] = [];

    for (const t of sortedTs) {
      let totalValue = 0;

      for (const { coinId, line } of validQueries) {
        let pi = priceCursors.get(coinId) ?? 0;
        while (pi + 1 < line.length && line[pi + 1].timestamp <= t) pi += 1;
        priceCursors.set(coinId, pi);
        const price = line[pi]?.price ?? 0;

        const ledger = txsByCoin.get(coinId) ?? [];
        const state = qtyCursors.get(coinId);
        if (!state) continue;
        while (state.idx < ledger.length && ledger[state.idx].timestamp <= t) {
          const tx = ledger[state.idx];
          if (tx.kind === "buy") {
            state.qty += tx.quantity;
            state.cost += tx.quantity * tx.pricePerUnit;
          } else if (tx.kind === "sell") {
            const sellQty = Math.min(tx.quantity, state.qty);
            const avg = state.qty > 0 ? state.cost / state.qty : 0;
            state.qty -= sellQty;
            state.cost -= sellQty * avg;
          } else if (tx.kind === "transfer_in") {
            state.qty += tx.quantity;
            if (tx.pricePerUnit > 0)
              state.cost += tx.quantity * tx.pricePerUnit;
          } else if (tx.kind === "transfer_out") {
            const outQty = Math.min(tx.quantity, state.qty);
            const avg = state.qty > 0 ? state.cost / state.qty : 0;
            state.qty -= outQty;
            state.cost -= outQty * avg;
          }
          state.idx += 1;
        }
        if (state.qty <= 0) continue;
        totalValue += state.qty * price;
      }
      points.push({ timestamp: t, value: totalValue });
    }

    return points;
  }, [
    enabled,
    txsByCoin,
    top,
    data0,
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
    data11,
    data12,
    data13,
    data14,
    data15,
    data16,
    data17,
    data18,
    data19,
  ]);

  const isLoading =
    (q0.isLoading && !!id0) ||
    (q1.isLoading && !!id1) ||
    (q2.isLoading && !!id2) ||
    (q3.isLoading && !!id3) ||
    (q4.isLoading && !!id4) ||
    (q5.isLoading && !!id5) ||
    (q6.isLoading && !!id6) ||
    (q7.isLoading && !!id7) ||
    (q8.isLoading && !!id8) ||
    (q9.isLoading && !!id9) ||
    (q10.isLoading && !!id10) ||
    (q11.isLoading && !!id11) ||
    (q12.isLoading && !!id12) ||
    (q13.isLoading && !!id13) ||
    (q14.isLoading && !!id14) ||
    (q15.isLoading && !!id15) ||
    (q16.isLoading && !!id16) ||
    (q17.isLoading && !!id17) ||
    (q18.isLoading && !!id18) ||
    (q19.isLoading && !!id19);

  const anyData = merged.length > 0;
  const isError = !anyData && top.length > 0 && !isLoading;

  return { points: merged, isLoading, isError };
}
