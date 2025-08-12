export enum PaymentType {
  CASH = "cash",
  TRANSFER = "transfer"
}

export const PaymentTypeLabels = {
  [PaymentType.CASH]: "Efectivo",
  [PaymentType.TRANSFER]: "Transferencia"
} as const;
