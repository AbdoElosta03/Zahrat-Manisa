import type { MetadataRoute } from "next";

const SITE_URL = "https://studio-admin.arhamkhnz.com";

const PUBLIC_ROUTES = [
  "/",
  "/dashboard/default",
  "/dashboard/finance",
  "/dashboard/bookings",
  "/dashboard/flights",
  "/dashboard/ticketing",
  "/dashboard/cancellations",
  "/dashboard/customers",
  "/dashboard/users",
  "/dashboard/support",
  "/dashboard/transactions",
  "/dashboard/refunds",
  "/dashboard/reconciliation",
  "/dashboard/promotions",
  "/dashboard/notifications",
  "/dashboard/campaigns",
  "/dashboard/reports",
  "/dashboard/analytics-overview",
  "/dashboard/airlines-providers",
  "/dashboard/integrations",
  "/dashboard/roles-permissions",
  "/dashboard/audit-logs",
  "/dashboard/settings",
  "/auth/v1/login",
  "/auth/v2/login",
  "/auth/v1/register",
  "/auth/v2/register",
  "/chat",
  "/mail",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));
}
