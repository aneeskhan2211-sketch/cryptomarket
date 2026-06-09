export type OrderType = "buy" | "sell";
export type OrderStatus = "pending" | "completed" | "failed";

export interface TradeOrder {
  id: string;
  coinId: string;
  coinSymbol: string;
  orderType: OrderType;
  fiatAmount: number;
  coinQuantity: number;
  priceAtExecution: number;
  stripePaymentIntentId?: string;
  status: OrderStatus;
  timestamp: number;
}

export interface TradeFormValues {
  coinId: string;
  coinSymbol: string;
  orderType: OrderType;
  fiatAmount: number;
}
