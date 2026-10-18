export type TransactionStatus = "Approved" | "Pending" | "Review" | "Settled" | "Voided";

export type TransactionType = "Booking" | "Card capture" | "Refund" | "Settlement" | "Transfer";

export type TransactionRow = {
  id: string;
  bookingId: string;
  customer: string;
  date: string;
  method: string;
  risk: "Clear" | "Monitor" | "Review";
  status: TransactionStatus;
  type: TransactionType;
  amount: number;
};

export type SettlementItem = {
  label: string;
  amount: number;
  helper: string;
};

export type RiskItem = {
  label: string;
  value: string;
  helper: string;
};

export type FlowPoint = {
  month: string;
  captures: number;
  refunds: number;
};

export type PaymentMixItem = {
  key: string;
  label: string;
  amount: number;
};

export const transactionRows: TransactionRow[] = [
  {
    id: "TRX-94028",
    bookingId: "BK-7821",
    customer: "Amina Karaman",
    date: "03 Oct 2026",
    method: "Visa ending 1482",
    risk: "Clear",
    status: "Approved",
    type: "Booking",
    amount: 1280,
  },
  {
    id: "TRX-94027",
    bookingId: "BK-7818",
    customer: "Omar Haddad",
    date: "03 Oct 2026",
    method: "Bank transfer",
    risk: "Monitor",
    status: "Pending",
    type: "Transfer",
    amount: 2460,
  },
  {
    id: "TRX-94026",
    bookingId: "BK-7815",
    customer: "Maya Demir",
    date: "02 Oct 2026",
    method: "Mastercard ending 9071",
    risk: "Clear",
    status: "Settled",
    type: "Card capture",
    amount: 840,
  },
  {
    id: "TRX-94025",
    bookingId: "BK-7811",
    customer: "Yusuf Alami",
    date: "02 Oct 2026",
    method: "Agency wallet",
    risk: "Review",
    status: "Review",
    type: "Booking",
    amount: 3120,
  },
  {
    id: "TRX-94024",
    bookingId: "BK-7809",
    customer: "Leila Hassan",
    date: "01 Oct 2026",
    method: "Visa ending 5530",
    risk: "Clear",
    status: "Settled",
    type: "Settlement",
    amount: 1860,
  },
  {
    id: "TRX-94023",
    bookingId: "BK-7804",
    customer: "Can Yilmaz",
    date: "01 Oct 2026",
    method: "Mastercard ending 4419",
    risk: "Monitor",
    status: "Voided",
    type: "Refund",
    amount: -420,
  },
  {
    id: "TRX-94022",
    bookingId: "BK-7801",
    customer: "Nour El-Sayed",
    date: "01 Oct 2026",
    method: "Visa ending 2204",
    risk: "Clear",
    status: "Approved",
    type: "Booking",
    amount: 1540,
  },
  {
    id: "TRX-94021",
    bookingId: "BK-7798",
    customer: "Karim Boutros",
    date: "30 Sep 2026",
    method: "Bank transfer",
    risk: "Monitor",
    status: "Pending",
    type: "Transfer",
    amount: 980,
  },
  {
    id: "TRX-94020",
    bookingId: "BK-7794",
    customer: "Sara Qureshi",
    date: "30 Sep 2026",
    method: "Mastercard ending 1188",
    risk: "Clear",
    status: "Settled",
    type: "Card capture",
    amount: 720,
  },
  {
    id: "TRX-94019",
    bookingId: "BK-7790",
    customer: "Hassan Malik",
    date: "29 Sep 2026",
    method: "Agency wallet",
    risk: "Clear",
    status: "Approved",
    type: "Booking",
    amount: 2100,
  },
  {
    id: "TRX-94018",
    bookingId: "BK-7786",
    customer: "Elena Petrova",
    date: "29 Sep 2026",
    method: "Visa ending 7741",
    risk: "Review",
    status: "Review",
    type: "Booking",
    amount: 4650,
  },
  {
    id: "TRX-94017",
    bookingId: "BK-7782",
    customer: "Tariq Nasser",
    date: "28 Sep 2026",
    method: "Mastercard ending 3390",
    risk: "Clear",
    status: "Settled",
    type: "Settlement",
    amount: 1340,
  },
  {
    id: "TRX-94016",
    bookingId: "BK-7779",
    customer: "Fatima Zahra",
    date: "28 Sep 2026",
    method: "Visa ending 6612",
    risk: "Monitor",
    status: "Voided",
    type: "Refund",
    amount: -260,
  },
  {
    id: "TRX-94015",
    bookingId: "BK-7775",
    customer: "Daniel Costa",
    date: "27 Sep 2026",
    method: "Bank transfer",
    risk: "Clear",
    status: "Approved",
    type: "Transfer",
    amount: 1880,
  },
  {
    id: "TRX-94014",
    bookingId: "BK-7771",
    customer: "Lina Haddad",
    date: "27 Sep 2026",
    method: "Agency wallet",
    risk: "Clear",
    status: "Settled",
    type: "Booking",
    amount: 640,
  },
  {
    id: "TRX-94013",
    bookingId: "BK-7768",
    customer: "Omar Farouk",
    date: "26 Sep 2026",
    method: "Visa ending 9055",
    risk: "Clear",
    status: "Approved",
    type: "Card capture",
    amount: 1190,
  },
  {
    id: "TRX-94012",
    bookingId: "BK-7764",
    customer: "Mariam Saleh",
    date: "26 Sep 2026",
    method: "Mastercard ending 4482",
    risk: "Monitor",
    status: "Pending",
    type: "Booking",
    amount: 2750,
  },
  {
    id: "TRX-94011",
    bookingId: "BK-7760",
    customer: "Youssef Nabil",
    date: "25 Sep 2026",
    method: "Bank transfer",
    risk: "Clear",
    status: "Settled",
    type: "Settlement",
    amount: 3210,
  },
  {
    id: "TRX-94010",
    bookingId: "BK-7757",
    customer: "Hana Al-Masri",
    date: "25 Sep 2026",
    method: "Visa ending 3307",
    risk: "Clear",
    status: "Approved",
    type: "Booking",
    amount: 890,
  },
  {
    id: "TRX-94009",
    bookingId: "BK-7753",
    customer: "Rami Khouri",
    date: "24 Sep 2026",
    method: "Agency wallet",
    risk: "Review",
    status: "Review",
    type: "Transfer",
    amount: 1470,
  },
  {
    id: "TRX-94008",
    bookingId: "BK-7749",
    customer: "Sofia Mendes",
    date: "24 Sep 2026",
    method: "Mastercard ending 2196",
    risk: "Clear",
    status: "Settled",
    type: "Card capture",
    amount: 560,
  },
  {
    id: "TRX-94007",
    bookingId: "BK-7745",
    customer: "Adel Rahman",
    date: "23 Sep 2026",
    method: "Visa ending 8810",
    risk: "Monitor",
    status: "Voided",
    type: "Refund",
    amount: -180,
  },
  {
    id: "TRX-94006",
    bookingId: "BK-7742",
    customer: "Layla Osman",
    date: "23 Sep 2026",
    method: "Bank transfer",
    risk: "Clear",
    status: "Approved",
    type: "Booking",
    amount: 2360,
  },
  {
    id: "TRX-94005",
    bookingId: "BK-7738",
    customer: "Ibrahim Sharif",
    date: "22 Sep 2026",
    method: "Agency wallet",
    risk: "Clear",
    status: "Settled",
    type: "Settlement",
    amount: 1020,
  },
];

export const transactionFilters = {
  status: ["All", "Approved", "Pending", "Review", "Settled", "Voided"],
  type: ["All", "Booking", "Card capture", "Refund", "Settlement", "Transfer"],
  method: ["All", "Visa", "Mastercard", "Bank transfer", "Agency wallet"],
} as const;

export const settlementItems: SettlementItem[] = [
  {
    label: "Gateway settlement",
    amount: 18420,
    helper: "Expected by 18:00",
  },
  {
    label: "Bank transfers",
    amount: 6240,
    helper: "4 transfers awaiting proof",
  },
  {
    label: "Refund reserve",
    amount: 2180,
    helper: "Held for active disputes",
  },
];

export const riskItems: RiskItem[] = [
  {
    label: "Manual review",
    value: "3",
    helper: "High-value or unusual method changes",
  },
  {
    label: "Unmatched payments",
    value: "5",
    helper: "Require booking ledger reconciliation",
  },
  {
    label: "Chargeback exposure",
    value: "$1.4k",
    helper: "Within the monthly control threshold",
  },
];

export const flowChartData: FlowPoint[] = [
  { month: "Jan", captures: 18400, refunds: -2100 },
  { month: "Feb", captures: 15200, refunds: -2800 },
  { month: "Mar", captures: 19800, refunds: -1900 },
  { month: "Apr", captures: 22100, refunds: -2400 },
  { month: "May", captures: 17600, refunds: -3100 },
  { month: "Jun", captures: 20900, refunds: -1700 },
  { month: "Jul", captures: 16400, refunds: -2600 },
  { month: "Aug", captures: 18800, refunds: -2200 },
  { month: "Sep", captures: 23600, refunds: -2900 },
  { month: "Oct", captures: 21200, refunds: -1800 },
  { month: "Nov", captures: 14700, refunds: -3300 },
  { month: "Dec", captures: 17300, refunds: -1600 },
];

export const paymentMix: PaymentMixItem[] = [
  { key: "visa", label: "Visa", amount: 3140 },
  { key: "mastercard", label: "Mastercard", amount: 1260 },
  { key: "transfer", label: "Bank transfer", amount: 2460 },
  { key: "wallet", label: "Agency wallet", amount: 3120 },
  { key: "settlement", label: "Settlement", amount: 1860 },
];

export const transactionSummary = {
  approvedTotal: transactionRows
    .filter((transaction) => transaction.amount > 0 && transaction.status !== "Voided")
    .reduce((total, transaction) => total + transaction.amount, 0),
  pendingAmount: 2460,
  pendingCount: transactionRows.filter((transaction) => transaction.status === "Pending").length,
  refundTotal: transactionRows
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0),
  reviewCount: transactionRows.filter((transaction) => transaction.risk !== "Clear").length,
  clearanceRate: "92%",
  statementDate: "03 Oct 2026",
  ledgerStatus: "Balanced",
};
