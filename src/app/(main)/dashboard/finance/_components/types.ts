export type RevenueBreakdownIcon = "flights" | "packages" | "ticketing";

export type RevenueBreakdownItem = {
  label: string;
  value: number;
  icon: RevenueBreakdownIcon;
};

export type FinanceSummary = {
  totalRevenue: number;
  revenueChange: number;
  revenueComparedAmount: number;
  revenueBreakdown: RevenueBreakdownItem[];
  totalExpenses: number;
  expensesChange: number;
  expensesComparedAmount: number;
  netProfit: number;
  netProfitChange: number;
  netProfitComparedAmount: number;
  outstandingReceivables: number;
  outstandingReceivablesChange: number;
  outstandingReceivablesCaption: string;
};

export type MonthlyFinancePoint = {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
};

export type PaymentStatusKey = "paid" | "pending" | "partial" | "refunded";

export type PaymentStatusItem = {
  key: PaymentStatusKey;
  label: string;
  amount: number;
  percentage: number;
  color: string;
};

export type TransactionType = "booking-payment" | "ticket-payment" | "package-payment" | "refund" | "expense";
export type TransactionStatus = "paid" | "pending" | "refunded";

export type Transaction = {
  id: string;
  customer: { name: string; initials: string };
  type: TransactionType;
  amount: number;
  method: string;
  status: TransactionStatus;
  date: string;
};

export type UpcomingPaymentStatus = "pending" | "partial" | "overdue";

export type UpcomingPayment = {
  id: string;
  customer: { name: string; initials: string };
  bookingId: string;
  dueDate: string;
  amount: number;
  status: UpcomingPaymentStatus;
};

export type RefundStatus = "completed" | "processing" | "pending";

export type Refund = {
  id: string;
  bookingId: string;
  customer: { name: string; initials: string };
  amount: number;
  status: RefundStatus;
  date: string;
};
