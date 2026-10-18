export type CustomerStatus = "Active" | "At risk" | "VIP" | "Dormant" | "New";

const segmentValues = ["Leisure", "Business", "Family", "Honeymoon", "Group", "Medical"] as const;
const tierValues = ["Explorer", "Silver", "Gold", "Platinum"] as const;
const interestValues = ["Beach", "City Break", "Culture", "Umrah", "Wellness", "Adventure"] as const;

export type CustomerSegment = (typeof segmentValues)[number];
export type CustomerTier = (typeof tierValues)[number];
export type TravelInterest = (typeof interestValues)[number];

export type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  segment: CustomerSegment;
  tier: CustomerTier;
  interest: TravelInterest;
  favoriteDestination: string;
  lastTrip: string;
  nextTrip: string;
  bookings: number;
  totalSpend: number;
  loyaltyPoints: number;
  satisfaction: number;
};

export const customers: CustomerRow[] = [
  {
    id: "CUS-1001",
    name: "Amina Karaman",
    email: "amina.karaman@example.com",
    phone: "+90 532 118 45 72",
    status: "VIP",
    segment: "Family",
    tier: "Platinum",
    interest: "Beach",
    favoriteDestination: "Antalya",
    lastTrip: "18 Sep 2026",
    nextTrip: "12 Dec 2026",
    bookings: 14,
    totalSpend: 18420,
    loyaltyPoints: 9240,
    satisfaction: 96,
  },
  {
    id: "CUS-1002",
    name: "Omar Haddad",
    email: "omar.haddad@example.com",
    phone: "+218 91 442 81 33",
    status: "Active",
    segment: "Business",
    tier: "Gold",
    interest: "City Break",
    favoriteDestination: "Istanbul",
    lastTrip: "04 Sep 2026",
    nextTrip: "22 Oct 2026",
    bookings: 9,
    totalSpend: 11680,
    loyaltyPoints: 5520,
    satisfaction: 89,
  },
  {
    id: "CUS-1003",
    name: "Leyla Demir",
    email: "leyla.demir@example.com",
    phone: "+90 555 903 21 17",
    status: "New",
    segment: "Honeymoon",
    tier: "Explorer",
    interest: "Wellness",
    favoriteDestination: "Cappadocia",
    lastTrip: "27 Aug 2026",
    nextTrip: "14 Nov 2026",
    bookings: 2,
    totalSpend: 2410,
    loyaltyPoints: 820,
    satisfaction: 92,
  },
  {
    id: "CUS-1004",
    name: "Murat Aydin",
    email: "murat.aydin@example.com",
    phone: "+90 533 410 75 60",
    status: "At risk",
    segment: "Leisure",
    tier: "Silver",
    interest: "Culture",
    favoriteDestination: "Rome",
    lastTrip: "16 May 2026",
    nextTrip: "Not scheduled",
    bookings: 5,
    totalSpend: 4980,
    loyaltyPoints: 1740,
    satisfaction: 64,
  },
  {
    id: "CUS-1005",
    name: "Nadia Elmasri",
    email: "nadia.elmasri@example.com",
    phone: "+218 92 708 14 90",
    status: "Active",
    segment: "Medical",
    tier: "Gold",
    interest: "Wellness",
    favoriteDestination: "Izmir",
    lastTrip: "29 Sep 2026",
    nextTrip: "18 Jan 2027",
    bookings: 7,
    totalSpend: 9320,
    loyaltyPoints: 4310,
    satisfaction: 87,
  },
  {
    id: "CUS-1006",
    name: "Yusuf Kaya",
    email: "yusuf.kaya@example.com",
    phone: "+90 544 681 93 20",
    status: "Dormant",
    segment: "Group",
    tier: "Explorer",
    interest: "Adventure",
    favoriteDestination: "Trabzon",
    lastTrip: "11 Feb 2026",
    nextTrip: "Not scheduled",
    bookings: 3,
    totalSpend: 2875,
    loyaltyPoints: 910,
    satisfaction: 71,
  },
  {
    id: "CUS-1007",
    name: "Sara Benali",
    email: "sara.benali@example.com",
    phone: "+216 27 339 814",
    status: "VIP",
    segment: "Leisure",
    tier: "Platinum",
    interest: "Culture",
    favoriteDestination: "Paris",
    lastTrip: "08 Oct 2026",
    nextTrip: "06 Dec 2026",
    bookings: 18,
    totalSpend: 22460,
    loyaltyPoints: 11800,
    satisfaction: 98,
  },
  {
    id: "CUS-1008",
    name: "Can Ersoy",
    email: "can.ersoy@example.com",
    phone: "+90 539 117 64 09",
    status: "Active",
    segment: "Business",
    tier: "Silver",
    interest: "City Break",
    favoriteDestination: "Dubai",
    lastTrip: "21 Sep 2026",
    nextTrip: "02 Nov 2026",
    bookings: 6,
    totalSpend: 7450,
    loyaltyPoints: 2860,
    satisfaction: 84,
  },
  {
    id: "CUS-1009",
    name: "Hana Kilic",
    email: "hana.kilic@example.com",
    phone: "+90 551 660 40 18",
    status: "New",
    segment: "Family",
    tier: "Explorer",
    interest: "Umrah",
    favoriteDestination: "Makkah",
    lastTrip: "05 Oct 2026",
    nextTrip: "28 Mar 2027",
    bookings: 1,
    totalSpend: 1680,
    loyaltyPoints: 520,
    satisfaction: 90,
  },
  {
    id: "CUS-1010",
    name: "Tarek Mansour",
    email: "tarek.mansour@example.com",
    phone: "+218 94 510 22 61",
    status: "At risk",
    segment: "Business",
    tier: "Gold",
    interest: "City Break",
    favoriteDestination: "Doha",
    lastTrip: "02 Apr 2026",
    nextTrip: "Not scheduled",
    bookings: 8,
    totalSpend: 10490,
    loyaltyPoints: 3900,
    satisfaction: 58,
  },
  {
    id: "CUS-1011",
    name: "Elif Sahin",
    email: "elif.sahin@example.com",
    phone: "+90 536 820 14 77",
    status: "Active",
    segment: "Honeymoon",
    tier: "Silver",
    interest: "Beach",
    favoriteDestination: "Bodrum",
    lastTrip: "25 Aug 2026",
    nextTrip: "19 Dec 2026",
    bookings: 4,
    totalSpend: 6320,
    loyaltyPoints: 2040,
    satisfaction: 93,
  },
  {
    id: "CUS-1012",
    name: "Rima Özkan",
    email: "rima.ozkan@example.com",
    phone: "+90 552 718 38 04",
    status: "Active",
    segment: "Group",
    tier: "Gold",
    interest: "Adventure",
    favoriteDestination: "Bali",
    lastTrip: "13 Sep 2026",
    nextTrip: "09 Feb 2027",
    bookings: 11,
    totalSpend: 15370,
    loyaltyPoints: 6740,
    satisfaction: 91,
  },
];

export const filters = {
  tier: ["All", ...tierValues],
  segment: ["All", ...segmentValues],
  status: ["All", "Active", "At risk", "VIP", "Dormant", "New"],
  interest: ["All", ...interestValues],
};

export const statusMeta: Record<CustomerStatus, { badgeClass: string; dotClass: string }> = {
  Active: {
    badgeClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    dotClass: "bg-emerald-500",
  },
  "At risk": {
    badgeClass: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    dotClass: "bg-amber-500",
  },
  VIP: {
    badgeClass: "border-brand-sea/20 bg-brand-sea/10 text-brand-sea",
    dotClass: "bg-brand-sea",
  },
  Dormant: {
    badgeClass: "border-border bg-muted/50 text-muted-foreground",
    dotClass: "bg-muted-foreground",
  },
  New: {
    badgeClass: "border-sky-500/20 bg-sky-500/10 text-sky-600",
    dotClass: "bg-sky-500",
  },
};
