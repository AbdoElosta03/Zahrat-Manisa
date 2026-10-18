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

import type { Permission } from "@/lib/auth/permissions";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
  permission?: Permission;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
  permission?: Permission;
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
            permission: "dashboard.view",
          },
          {
            id: "dashboard-finance",
            title: "Finance",
            url: "/dashboard/finance",
            icon: Wallet,
            permission: "payments.view",
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
        permission: "bookings.view",
      },
      {
        id: "flights",
        title: "Flights",
        url: "/dashboard/flights",
        icon: Plane,
        permission: "flights.view",
      },
      {
        id: "ticketing",
        title: "Ticketing",
        url: "/dashboard/ticketing",
        icon: Ticket,
        permission: "ticketing.view",
      },
      {
        id: "cancellations",
        title: "Cancellations",
        url: "/dashboard/cancellations",
        icon: XCircle,
        permission: "cancellations.view",
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
        url: "/dashboard/customers",
        icon: Users,
        permission: "customers.view",
      },
      {
        id: "support",
        title: "Support",
        url: "/dashboard/support",
        icon: Headset,
        permission: "support.view",
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
        url: "/dashboard/transactions",
        icon: CircleDollarSign,
        permission: "payments.view",
      },
      {
        id: "refunds",
        title: "Refunds",
        url: "/dashboard/refunds",
        icon: RotateCcw,
        permission: "payments.view",
      },
      {
        id: "reconciliation",
        title: "Reconciliation",
        url: "/dashboard/reconciliation",
        icon: Scale,
        permission: "payments.view",
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
        url: "/dashboard/promotions",
        icon: Megaphone,
        permission: "promotions.view",
      },
      {
        id: "notifications",
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
        permission: "notifications.view",
      },
      {
        id: "campaigns",
        title: "Campaigns",
        url: "/dashboard/campaigns",
        icon: Mail,
        permission: "campaigns.view",
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
        url: "/dashboard/reports",
        icon: ChartBar,
        permission: "reports.view",
      },
      {
        id: "analytics",
        title: "Analytics",
        url: "/dashboard/analytics-overview",
        icon: Waypoints,
        permission: "reports.view",
      },
    ],
  },
  {
    id: 7,
    label: "User Management",
    items: [
      {
        id: "users",
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        permission: "users.view",
      },
      {
        id: "roles-permissions",
        title: "Roles & Permissions",
        url: "/dashboard/roles-permissions",
        icon: Shield,
        permission: "roles.view",
      },
    ],
  },
  {
    id: 8,
    label: "System",
    items: [
      {
        id: "airlines",
        title: "Airlines & Providers",
        url: "/dashboard/airlines-providers",
        icon: Plane,
        permission: "providers.view",
      },
      {
        id: "integrations",
        title: "Integrations",
        url: "/dashboard/integrations",
        icon: Plug,
        permission: "integrations.view",
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        url: "/dashboard/audit-logs",
        icon: ScrollText,
        permission: "audit.view",
      },
      {
        id: "settings",
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        permission: "settings.view",
      },
    ],
  },
];
