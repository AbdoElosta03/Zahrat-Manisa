export const permissionActions = ["view", "create", "edit", "delete"] as const;

const resources = [
  { id: "dashboard", en: "Dashboard", ar: "لوحة التحكم" },
  { id: "inquiries", en: "Inquiries", ar: "الاستفسارات" },
  { id: "bookings", en: "Bookings", ar: "الحجوزات" },
  { id: "customers", en: "Customers", ar: "العملاء" },
  { id: "packages", en: "Tour packages", ar: "الباقات السياحية" },
  { id: "promotions", en: "Promotions", ar: "العروض" },
  { id: "payments", en: "Payments & finance", ar: "المدفوعات والمالية" },
  { id: "documents", en: "Documents & visa", ar: "المستندات والتأشيرات" },
  { id: "reviews", en: "Reviews", ar: "المراجعات" },
  { id: "flights", en: "Flights", ar: "الرحلات" },
  { id: "ticketing", en: "Ticketing", ar: "التذاكر" },
  { id: "cancellations", en: "Cancellations", ar: "الإلغاءات" },
  { id: "support", en: "Support", ar: "الدعم" },
  { id: "notifications", en: "Notifications", ar: "الإشعارات" },
  { id: "campaigns", en: "Campaigns", ar: "الحملات" },
  { id: "reports", en: "Reports & analytics", ar: "التقارير والتحليلات" },
  { id: "users", en: "Team members", ar: "المستخدمون" },
  { id: "roles", en: "Roles & permissions", ar: "الأدوار والصلاحيات" },
  { id: "providers", en: "Airlines & providers", ar: "شركات الطيران والمزودون" },
  { id: "integrations", en: "Integrations", ar: "التكاملات" },
  { id: "audit", en: "Audit logs", ar: "سجل التدقيق" },
  { id: "settings", en: "Settings", ar: "الإعدادات" },
] as const;

export type Permission = `${(typeof resources)[number]["id"]}.${(typeof permissionActions)[number]}`;
export const permissionGroups = resources.map((resource) => ({ ...resource, actions: permissionActions }));
export const allPermissions: Permission[] = resources.flatMap((resource) =>
  permissionActions.map((action): Permission => `${resource.id}.${action}`),
);

export function hasPermission(permissions: readonly Permission[], permission: Permission) {
  return permissions.includes(permission);
}

// The same policy drives navigation visibility and the client-side route gate.
export const routePermissions: Record<string, Permission> = {
  "/dashboard/default": "dashboard.view",
  "/dashboard/finance": "payments.view",
  "/dashboard/bookings": "bookings.view",
  "/dashboard/flights": "flights.view",
  "/dashboard/ticketing": "ticketing.view",
  "/dashboard/cancellations": "cancellations.view",
  "/dashboard/customers": "customers.view",
  "/dashboard/support": "support.view",
  "/dashboard/transactions": "payments.view",
  "/dashboard/refunds": "payments.view",
  "/dashboard/reconciliation": "payments.view",
  "/dashboard/promotions": "promotions.view",
  "/dashboard/notifications": "notifications.view",
  "/dashboard/campaigns": "campaigns.view",
  "/dashboard/reports": "reports.view",
  "/dashboard/analytics-overview": "reports.view",
  "/dashboard/users": "users.view",
  "/dashboard/roles-permissions": "roles.view",
  "/dashboard/airlines-providers": "providers.view",
  "/dashboard/integrations": "integrations.view",
  "/dashboard/audit-logs": "audit.view",
  "/dashboard/settings": "settings.view",
};

export function getRoutePermission(pathname: string): Permission | undefined {
  const route = Object.keys(routePermissions)
    .sort((a, b) => b.length - a.length)
    .find((path) => pathname === path || pathname.startsWith(`${path}/`));
  return route ? routePermissions[route] : undefined;
}
