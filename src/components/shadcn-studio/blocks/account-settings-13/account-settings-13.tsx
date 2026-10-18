"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { HistoryIcon, MonitorIcon, ShieldCheckIcon, UserIcon, UsersIcon } from "lucide-react";

import Profile from "@/components/shadcn-studio/blocks/account-settings-13/content/profile";
import Security from "@/components/shadcn-studio/blocks/account-settings-13/content/security";
import {
  SettingsInfoCard,
  SettingsInfoRow,
} from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-info-card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SectionId = "profile" | "security";

type NavItem = { id: SectionId; label: string; icon: ReactNode };

const navItems: NavItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <UserIcon className="size-4" />,
  },
  {
    id: "security",
    label: "Security",
    icon: <ShieldCheckIcon className="size-4" />,
  },
];

const recentActivity = [
  { label: "Changed their name", time: "2 hours ago" },
  { label: "Changed the workspace logo", time: "Yesterday" },
  { label: "Enabled two-factor authentication", time: "3 days ago" },
];

const InfoPanel = ({ activeSection }: { activeSection: SectionId }) => {
  if (activeSection === "profile") {
    return (
      <SettingsInfoCard title="Account">
        <SettingsInfoRow
          label="Your role"
          icon={<ShieldCheckIcon className="size-3.5 shrink-0 opacity-70" />}
          value={<Badge variant="secondary">Admin</Badge>}
        />
        <SettingsInfoRow
          label="Workspace members"
          icon={<UsersIcon className="size-3.5 shrink-0 opacity-70" />}
          value={14}
        />
      </SettingsInfoCard>
    );
  }

  return (
    <>
      <SettingsInfoCard title="Sessions">
        <SettingsInfoRow
          label="Active sessions"
          icon={<MonitorIcon className="size-3.5 shrink-0 opacity-70" />}
          value={2}
        />
      </SettingsInfoCard>

      <SettingsInfoCard title="Recent security activity">
        {recentActivity.map((event) => (
          <SettingsInfoRow
            key={event.label}
            label={event.label}
            icon={<HistoryIcon className="size-3.5 shrink-0 opacity-70" />}
            value={<span className="text-muted-foreground text-xs font-normal">{event.time}</span>}
          />
        ))}
      </SettingsInfoCard>
    </>
  );
};

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  return (
    <section className="py-3">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My profile</h1>
          <p className="text-muted-foreground text-sm">Manage your personal details and account security.</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <nav className="hidden w-56 shrink-0 flex-col gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="lg:hidden">
            <Select value={activeSection} onValueChange={(value) => value && setActiveSection(value as SectionId)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent className="w-(--anchor-width)">
                {navItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <span className="inline-flex items-center gap-2.5">
                      {item.icon}
                      {item.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-0 flex-1 xl:grid xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-start xl:gap-8">
            <div className="flex min-w-0 flex-col gap-6">
              {activeSection === "profile" && <Profile />}
              {activeSection === "security" && <Security />}
            </div>

            <aside className="mt-6 flex flex-col gap-6 xl:sticky xl:top-6 xl:mt-0">
              <InfoPanel activeSection={activeSection} />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
