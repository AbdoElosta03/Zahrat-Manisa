"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export type SidebarNavItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  forceOpen?: boolean;
  items?: {
    title: string;
    url: string;
    newTab?: boolean;
  }[];
};

export function NavMain({ items, label }: { items: SidebarNavItem[]; label?: string }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
      <SidebarMenu>
        {items.map((item) => {
          const childActive = item.items?.some((subItem) => pathname === subItem.url) ?? false;
          const active = pathname === item.url || childActive;

          return (
            <Collapsible
              key={item.title}
              asChild
              open={item.forceOpen ? true : undefined}
              defaultOpen={item.forceOpen ? undefined : item.isActive || childActive}
            >
              <SidebarMenuItem>
                {item.forceOpen ? (
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto rotate-90" />
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild tooltip={item.title} isActive={active && !item.items?.length}>
                    <Link href={item.url} prefetch={false}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
                {item.items?.length ? (
                  <>
                    {item.forceOpen ? null : (
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                    )}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <Link
                                href={subItem.url}
                                prefetch={false}
                                target={subItem.newTab ? "_blank" : undefined}
                                rel={subItem.newTab ? "noreferrer" : undefined}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
