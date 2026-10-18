import type { ReactNode } from "react";

import { cookies } from "next/headers";

import { cn } from "cn";

import { AppSidebar } from "@/app/(main)/dashboard/_components/sidebar/app-sidebar";
import { AccessGate } from "@/app/(main)/dashboard/_components/access/access-gate";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/i18n/language-provider";
import { LanguageSwitcher } from "@/i18n/language-switcher";
import { getTimeZone, LOCALE_COOKIE, parseLocale } from "@/i18n/locale";
import { messages } from "@/i18n/messages";
import { getPreference } from "@/server/server-actions";

import { AccountSwitcher } from "./_components/header/account-switcher";
import { LayoutControls } from "./_components/header/layout-controls";
import { SearchDialog } from "./_components/header/search-dialog";
import { ThemeSwitcher } from "./_components/header/theme-switcher";

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const collapsible = await getPreference("sidebar_collapsible");

  return (
    <LanguageProvider initialLocale={locale} messages={messages} timeZone={getTimeZone()}>
      <SidebarProvider
        defaultOpen={defaultOpen}
        className={cn(
          "dashboard-shell",
          "[html[data-navbar-style=sticky]_&]:h-svh [html[data-navbar-style=sticky]_&]:overflow-hidden",
          "[&_[data-slot=sidebar-inner]]:rounded-xl",
          "[html[data-theme-mode=manisa]_&]:[&_[data-slot=sidebar-inner]]:bg-sidebar/20 [html[data-theme-mode=manisa]_&]:[&_[data-slot=sidebar-inner]]:shadow-sm [html[data-theme-mode=manisa]_&]:[&_[data-slot=sidebar-inner]]:backdrop-blur-sm [html[data-theme-mode=manisa]_&]:[&_[data-slot=sidebar-inner]]:ring-white/10",
        )}
      >
        <AppSidebar variant="inset" collapsible={collapsible} />
        <SidebarInset
          className={cn(
            "peer-data-[variant=inset]:border",
            "[--dashboard-header-height:--spacing(12)]",
            "min-w-0 overflow-x-clip md:peer-data-[variant=inset]:!mt-3.5 md:peer-data-[variant=inset]:!rounded-t-3xl md:peer-data-[variant=inset]:rounded-b-xl",
            "[html[data-navbar-style=sticky]_&]:min-h-0 [html[data-navbar-style=sticky]_&]:overflow-hidden",
            "[html[data-theme-mode=manisa]_&]:border-white/10 [html[data-theme-mode=manisa]_&]:bg-transparent",
            "[html[data-theme-mode=dark]_&]:bg-sidebar [html[data-theme-mode=dark]_&]:border-border",
          )}
        >
          <header
            className={cn(
              "flex h-12 w-full shrink-0 items-center gap-2 rounded-t-3xl border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
              // Handle sticky navbar style with conditional classes so blur, background, z-index, and rounded corners remain consistent across all SidebarVariant layouts.
              "[html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-50 [html[data-navbar-style=sticky]_&]:overflow-hidden [html[data-navbar-style=sticky]_&]:bg-background/50 [html[data-navbar-style=sticky]_&]:backdrop-blur-md dark:[html[data-navbar-style=sticky]_&]:bg-background/35 [html[data-theme-mode=dark][data-navbar-style=sticky]_&]:bg-[color:var(--dashboard-surface)]/90 [html[data-theme-mode=dark][data-navbar-style=sticky]_&]:backdrop-blur-sm [html[data-theme-mode=manisa][data-navbar-style=sticky]_&]:bg-background/35",
            )}
          >
            <div className="flex w-full items-center justify-between px-4 lg:px-6">
              <div className="flex items-center gap-1 lg:gap-2">
                <SidebarTrigger className="-ms-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
                />
                <SearchDialog />
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <LayoutControls />
                <ThemeSwitcher />
                <AccountSwitcher />
              </div>
            </div>
          </header>
          {/* Pages can set data-content-padding="false" to render full-bleed app layouts. */}
          <div
            className={cn(
              "min-h-0 min-w-0 flex-1 overflow-x-hidden p-4 [html[data-navbar-style=sticky]_&]:overflow-y-auto has-data-[content-padding=false]:p-0 md:p-6 md:has-data-[content-padding=false]:p-0",
              "[html[data-content-layout=centered]_&]:mx-auto [html[data-content-layout=centered]_&]:w-full [html[data-content-layout=centered]_&]:max-w-screen-2xl",
            )}
          >
            <AccessGate>{children}</AccessGate>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </LanguageProvider>
  );
}
