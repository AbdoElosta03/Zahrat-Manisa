"use client";

import { type ReactNode, useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheckIcon, UserIcon } from "lucide-react";

import { AccessError } from "@/app/(main)/dashboard/_components/access/access-feedback";
import {
  SettingsInfoCard,
  SettingsInfoRow,
} from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-info-card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { isMockApi } from "@/lib/api/client";
import { authApi } from "@/lib/api/services/auth";
import type {
  ChangePasswordRequest,
  DeleteAccountRequest,
  MyProfile,
  UpdateMyProfileRequest,
} from "@/lib/api/types/auth";
import { notify } from "@/lib/notify";
import { currentUserKey } from "@/lib/query/query-client";
import { cn } from "@/lib/utils";

import { myProfileKey } from "./my-profile.keys";
import { MyProfileDetailsSection } from "./my-profile-details-section";
import { MyProfileSecuritySection } from "./my-profile-security-section";

type SectionId = "profile" | "security";

type NavItem = { id: SectionId; label: string; icon: ReactNode };

const navItems: NavItem[] = [
  { id: "profile", label: "Profile", icon: <UserIcon className="size-4" /> },
  { id: "security", label: "Security", icon: <ShieldCheckIcon className="size-4" /> },
];

function ProfileInfoPanel({ profile }: { profile: MyProfile }) {
  const primaryRole = profile.roles[0]?.name ?? profile.account_type;
  return (
    <SettingsInfoCard title="Account">
      <SettingsInfoRow
        label="Your role"
        icon={<ShieldCheckIcon className="size-3.5 shrink-0 opacity-70" />}
        value={<Badge variant="secondary">{primaryRole}</Badge>}
      />
      <SettingsInfoRow label="Account type" value={profile.account_type} />
      {profile.employee_id ? <SettingsInfoRow label="Employee ID" value={profile.employee_id} /> : null}
    </SettingsInfoCard>
  );
}

export function MyProfileWorkspace() {
  const router = useRouter();
  const client = useQueryClient();
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  const profileQuery = useQuery({
    queryKey: myProfileKey,
    queryFn: ({ signal }) => authApi.getMyProfile(signal),
    enabled: !isMockApi,
  });

  const invalidateSession = async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: myProfileKey }),
      client.invalidateQueries({ queryKey: currentUserKey }),
    ]);
  };

  const updateProfile = useMutation({
    mutationKey: ["session", "my-profile", "update"],
    mutationFn: (input: UpdateMyProfileRequest) => authApi.updateMyProfile(input),
    onSuccess: async () => {
      await invalidateSession();
      notify.success("Profile updated");
    },
    onError: (error) => notify.error(getApiErrorMessage(error)),
  });

  const changePassword = useMutation({
    mutationKey: ["session", "my-profile", "change-password"],
    mutationFn: (input: ChangePasswordRequest) => authApi.changePassword(input),
    onSuccess: () => notify.success("Password updated"),
    onError: (error) => notify.error(getApiErrorMessage(error)),
  });

  const deleteAccount = useMutation({
    mutationKey: ["session", "my-profile", "delete"],
    mutationFn: (input: DeleteAccountRequest) => authApi.deleteMyAccount(input),
    onSuccess: async () => {
      client.setQueryData(currentUserKey, null);
      await client.cancelQueries();
      client.clear();
      router.replace("/login");
    },
    onError: (error) => notify.error(getApiErrorMessage(error)),
  });

  if (isMockApi) {
    return (
      <p className="text-muted-foreground text-sm">
        My profile requires the live API. Set <code className="text-xs">NEXT_PUBLIC_API_MODE=python</code> and sign in.
      </p>
    );
  }

  if (profileQuery.isPending) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <AccessError
        error={profileQuery.error}
        retry={() => void profileQuery.refetch()}
        busy={profileQuery.isFetching}
      />
    );
  }

  const profile = profileQuery.data;

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
              {activeSection === "profile" ? (
                <MyProfileDetailsSection
                  profile={profile}
                  pending={updateProfile.isPending}
                  deletePending={deleteAccount.isPending}
                  onSave={(input) => updateProfile.mutateAsync(input)}
                  onDeleteAccount={(password) => deleteAccount.mutateAsync({ password })}
                />
              ) : (
                <MyProfileSecuritySection
                  pending={changePassword.isPending}
                  onChangePassword={(input) => changePassword.mutateAsync(input)}
                />
              )}
            </div>

            {activeSection === "profile" ? (
              <aside className="mt-6 flex flex-col gap-6 xl:sticky xl:top-6 xl:mt-0">
                <ProfileInfoPanel profile={profile} />
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
