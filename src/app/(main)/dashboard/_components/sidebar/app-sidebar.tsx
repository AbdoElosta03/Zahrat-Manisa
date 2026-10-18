"use client";

import Link from "next/link";

import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ManisaTravelMark } from "@/components/brand/manisa-travel-mark";
import { APP_CONFIG } from "@/config/app-config";
import { useLanguage } from "@/i18n/language-provider";
import { type NavGroup, type NavMainItem, type NavMainLinkItem, sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";
import { usePermissions } from "@/app/(main)/dashboard/_components/access/access.queries";

import { NavMain, type SidebarNavItem } from "./nav-main";

function isNavLink(item: NavMainItem): item is NavMainLinkItem {
  return "url" in item;
}

const translatedNavItems: Record<string, string> = {
  "/dashboard/default": "navigation.overview",
  "/dashboard/finance": "navigation.finance",
  "/dashboard/bookings": "navigation.bookings",
  "/dashboard/flights": "navigation.flights",
  "/dashboard/ticketing": "navigation.ticketing",
  "/dashboard/cancellations": "navigation.cancellations",
  "/dashboard/customers": "navigation.customers",
  "/dashboard/support": "navigation.support",
  "/dashboard/transactions": "navigation.transactions",
  "/dashboard/refunds": "navigation.refunds",
  "/dashboard/users": "navigation.users",
  "/dashboard/roles-permissions": "navigation.rolesPermissions",
};

const translatedGroups: Record<string, string> = {
  Operations: "navigation.operations",
  Customers: "navigation.customers",
  Finance: "navigation.finance",
  "User Management": "navigation.userManagement",
};

function toSidebarNavItem(item: NavMainItem, t: (id: string) => string): SidebarNavItem | null {
  if (!isNavLink(item)) {
    const firstUrl = item.subItems[0]?.url ?? "#";

    return {
      title: item.id === "dashboard" ? t("navigation.dashboard") : item.title,
      url: firstUrl,
      icon: item.icon ? <item.icon /> : undefined,
      forceOpen: true,
      items: item.subItems.map((subItem) => ({
        title: translatedNavItems[subItem.url] ? t(translatedNavItems[subItem.url]) : subItem.title,
        url: subItem.url,
        newTab: subItem.newTab,
      })),
    };
  }

  return {
    title: translatedNavItems[item.url] ? t(translatedNavItems[item.url]) : item.title,
    url: item.url,
    icon: item.icon ? <item.icon /> : undefined,
  };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { direction, inlineStart, t } = useLanguage();
  const { sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarCollapsible: s.values.sidebar_collapsible,
      isSynced: s.isSynced,
    })),
  );

  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;
  const { can, currentUser } = usePermissions();
  const visibleGroups = sidebarItems.reduce<NavGroup[]>((groups, group) => {
    const items = group.items.reduce<NavMainItem[]>((visibleItems, item) => {
      if (isNavLink(item)) {
        if (!item.permission || can(item.permission)) visibleItems.push(item);
        return visibleItems;
      }
      const subItems = item.subItems.filter((subItem) => !subItem.permission || can(subItem.permission));
      if (subItems.length) visibleItems.push({ ...item, subItems });
      return visibleItems;
    }, []);
    if (items.length) groups.push({ ...group, items });
    return groups;
  }, []);

  return (
    <Sidebar {...props} dir={direction} side={inlineStart} variant="inset" collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard/default">
                <ManisaTravelMark
                  className="!size-11 shrink-0 rounded-md group-data-[collapsible=icon]/sidebar-wrapper:!size-7"
                  aria-label={APP_CONFIG.name}
                />
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">{APP_CONFIG.name}</span>
                  <span className="truncate text-xs">{t("navigation.tagline")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {currentUser && visibleGroups.map((group) => (
          <NavMain
            key={group.id}
            label={
              group.items.some((item) => !isNavLink(item))
                ? undefined
                : group.label && translatedGroups[group.label]
                  ? t(translatedGroups[group.label])
                  : group.label
            }
            items={group.items.flatMap((item) => {
              const navItem = toSidebarNavItem(item, t);
              return navItem ? [navItem] : [];
            })}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
