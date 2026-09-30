"use client";

import Image from "next/image";
import Link from "next/link";

import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { type NavMainItem, type NavMainLinkItem, sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { NavMain, type SidebarNavItem } from "./nav-main";
import { NavUser } from "./nav-user";

function isNavLink(item: NavMainItem): item is NavMainLinkItem {
  return "url" in item;
}

function toSidebarNavItem(item: NavMainItem): SidebarNavItem | null {
  if (!isNavLink(item)) {
    const firstUrl = item.subItems[0]?.url ?? "#";

    return {
      title: item.title,
      url: firstUrl,
      icon: item.icon ? <item.icon /> : undefined,
      forceOpen: true,
      items: item.subItems.map((subItem) => ({
        title: subItem.title,
        url: subItem.url,
        newTab: subItem.newTab,
      })),
    };
  }

  return {
    title: item.title,
    url: item.url,
    icon: item.icon ? <item.icon /> : undefined,
  };
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarCollapsible: s.values.sidebar_collapsible,
      isSynced: s.isSynced,
    })),
  );

  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  return (
    <Sidebar {...props} variant="inset" collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard/default" prefetch={false}>
                <Image
                  src="/logo/zahratmanisa-logo.png"
                  alt={APP_CONFIG.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-md object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{APP_CONFIG.name}</span>
                  <span className="truncate text-xs">Travel & Tourism</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <NavMain
            key={group.id}
            label={group.items.some((item) => !isNavLink(item)) ? undefined : group.label}
            items={group.items.flatMap((item) => {
              const navItem = toSidebarNavItem(item);
              return navItem ? [navItem] : [];
            })}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
