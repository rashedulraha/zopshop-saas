export function getPaymentStatus(dueAmount: number, totalAmount: number): "paid" | "partial" | "due" {
  if (totalAmount <= 0) return "paid";
  if (dueAmount <= 0) return "paid";
  if (dueAmount >= totalAmount) return "due";
  return "partial";
}

export function formatTransactionType(type: string): string {
  switch (type) {
    case "SALE":
      return "Sale";
    case "PURCHASE":
      return "Purchase";
    case "EXPENSE":
      return "Expense";
    case "PAYMENT_RECEIVED":
      return "Payment Received";
    case "PAYMENT_SENT":
      return "Payment Sent";
    default:
      return type;
  }
}
