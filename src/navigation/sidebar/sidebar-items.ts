import {
  Bell,
  ChartBar,
  CircleDollarSign,
  Headset,
  LayoutDashboard,
  type LucideIcon,
  Mail,
  Megaphone,
  Plane,
  Plug,
  ReceiptText,
  RotateCcw,
  Scale,
  ScrollText,
  Settings,
  Shield,
  Ticket,
  Users,
  Wallet,
  Waypoints,
  XCircle,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboard",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: LayoutDashboard,
        subItems: [
          {
            id: "overview",
            title: "Overview",
            url: "/dashboard/default",
            icon: LayoutDashboard,
          },
          {
            id: "dashboard-finance",
            title: "Finance",
            url: "/dashboard/finance",
            icon: Wallet,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Operations",
    items: [
      {
        id: "bookings",
        title: "Bookings",
        url: "/dashboard/bookings",
        icon: ReceiptText,
      },
      {
        id: "flights",
        title: "Flights",
        url: "/dashboard/logistics",
        icon: Plane,
      },
      {
        id: "ticketing",
        title: "Ticketing",
        url: "/dashboard/invoice",
        icon: Ticket,
      },
      {
        id: "cancellations",
        title: "Cancellations",
        url: "/dashboard/tasks",
        icon: XCircle,
      },
    ],
  },
  {
    id: 3,
    label: "Customers",
    items: [
      {
        id: "customers",
        title: "Customers",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        id: "support",
        title: "Support",
        url: "/dashboard/chat",
        icon: Headset,
      },
    ],
  },
  {
    id: 4,
    label: "Finance",
    items: [
      {
        id: "transactions",
        title: "Transactions",
        url: "/dashboard/finance-v1",
        icon: CircleDollarSign,
      },
      {
        id: "refunds",
        title: "Refunds",
        url: "/dashboard/kanban",
        icon: RotateCcw,
      },
      {
        id: "reconciliation",
        title: "Reconciliation",
        url: "/dashboard/analytics",
        icon: Scale,
      },
    ],
  },
  {
    id: 5,
    label: "Marketing",
    items: [
      {
        id: "promotions",
        title: "Promotions",
        url: "/dashboard/productivity",
        icon: Megaphone,
      },
      {
        id: "notifications",
        title: "Notifications",
        url: "/dashboard/mail",
        icon: Bell,
      },
      {
        id: "campaigns",
        title: "Campaigns",
        url: "/dashboard/crm",
        icon: Mail,
      },
    ],
  },
  {
    id: 6,
    label: "Analytics",
    items: [
      {
        id: "reports",
        title: "Reports",
        url: "/dashboard/analytics-v1",
        icon: ChartBar,
      },
      {
        id: "analytics",
        title: "Analytics",
        url: "/dashboard/academy",
        icon: Waypoints,
      },
    ],
  },
  {
    id: 7,
    label: "System",
    items: [
      {
        id: "airlines",
        title: "Airlines & Providers",
        url: "/dashboard/infrastructure",
        icon: Plane,
      },
      {
        id: "integrations",
        title: "Integrations",
        url: "/dashboard/file-manager",
        icon: Plug,
      },
      {
        id: "roles",
        title: "Roles & Permissions",
        url: "/dashboard/roles",
        icon: Shield,
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        url: "/dashboard/calendar",
        icon: ScrollText,
      },
      {
        id: "settings",
        title: "Settings",
        url: "/dashboard/profile",
        icon: Settings,
      },
    ],
  },
];
