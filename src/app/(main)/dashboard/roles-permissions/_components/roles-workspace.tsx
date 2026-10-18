"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { AccessError, AccessUpdating } from "@/app/(main)/dashboard/_components/access/access-feedback";
import { usePermissions } from "@/app/(main)/dashboard/_components/access/access.queries";
import { AccessSkeleton } from "@/app/(main)/dashboard/_components/access/access-skeleton";
import { DeleteDialog } from "@/app/(main)/dashboard/_components/access/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/i18n/language-provider";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { authorizationApi } from "@/lib/api/services/authorization";
import type { RoleWithPermissionsResponse } from "@/lib/api/types/authorization";
import { currentUserKey } from "@/lib/query/query-client";

import { CreateRoleDialog } from "./create-role-dialog";

const rolesKey = ["authorization", "roles"] as const;
const permissionsKey = ["authorization", "permissions"] as const;

export function RolesWorkspace() {
  const { locale, formatNumber } = useI18n();
  const ar = locale === "ar";
  const { can } = usePermissions();
  const client = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<RoleWithPermissionsResponse | null>(null);
  const rolesQuery = useQuery({
    queryKey: rolesKey,
    queryFn: ({ signal }) => authorizationApi.roles(signal),
    enabled: can("roles.view"),
  });
  const permissionsQuery = useQuery({
    queryKey: permissionsKey,
    queryFn: ({ signal }) => authorizationApi.permissions(signal),
    enabled: can("roles.view"),
  });
  const refreshRoles = async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: rolesKey }),
      client.invalidateQueries({ queryKey: ["users-v1", "roles"] }),
      client.invalidateQueries({ queryKey: currentUserKey }),
    ]);
  };
  const toggle = useMutation({
    mutationFn: ({ roleId, permissionId, checked }: { roleId: string; permissionId: string; checked: boolean }) =>
      checked
        ? authorizationApi.addPermissions(roleId, [permissionId])
        : authorizationApi.removePermissions(roleId, [permissionId]),
    onSuccess: refreshRoles,
  });
  const remove = useMutation({ mutationFn: authorizationApi.deleteRole, onSuccess: refreshRoles });

  if (rolesQuery.isPending || permissionsQuery.isPending) return <AccessSkeleton kind="roles" />;
  if (!rolesQuery.data)
    return (
      <AccessError error={rolesQuery.error} retry={() => void rolesQuery.refetch()} busy={rolesQuery.isFetching} />
    );
  if (!permissionsQuery.data)
    return (
      <AccessError
        error={permissionsQuery.error}
        retry={() => void permissionsQuery.refetch()}
        busy={permissionsQuery.isFetching}
      />
    );

  const roles = rolesQuery.data;
  const permissions = permissionsQuery.data;
  const selected = roles.find((role) => role.id === selectedId) ?? roles[0];
  const busy = toggle.isPending || rolesQuery.isFetching;
  const selectedPermissionIds = new Set(selected?.permissions.map((permission) => permission.id) ?? []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{ar ? "الأدوار والصلاحيات" : "Roles & permissions"}</h1>
          <p className="text-sm text-muted-foreground">
            {ar
              ? "أنشئ الأدوار وحدد صلاحيات كل دور من الصلاحيات المتاحة."
              : "Create roles and assign existing permissions."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {can("users.view") && (
            <Button asChild variant="outline">
              <Link href="/dashboard/users">{ar ? "المستخدمون" : "Users"}</Link>
            </Button>
          )}
          {can("roles.create") && <Button onClick={() => setCreating(true)}>{ar ? "إضافة دور" : "Add role"}</Button>}
        </div>
      </div>

      {rolesQuery.isError && (
        <AccessError error={rolesQuery.error} retry={() => void rolesQuery.refetch()} busy={rolesQuery.isFetching} />
      )}
      {permissionsQuery.isError && (
        <AccessError
          error={permissionsQuery.error}
          retry={() => void permissionsQuery.refetch()}
          busy={permissionsQuery.isFetching}
        />
      )}
      {toggle.isError && <AccessError error={toggle.error} />}

      {roles.length ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id} className={role.id === selected?.id ? "ring-primary" : undefined}>
                <CardHeader>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription className="break-words">{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {formatNumber(role.permissions.length)} {ar ? "صلاحية" : "permissions"}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={role.id === selected?.id ? "secondary" : "outline"}
                      onClick={() => setSelectedId(role.id)}
                      aria-pressed={role.id === selected?.id}
                    >
                      {ar ? "الصلاحيات" : "Permissions"}
                    </Button>
                    {can("roles.delete") && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleting(role)}
                        disabled={remove.isPending}
                      >
                        {ar ? "حذف" : "Delete"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {selected && (
            <Card>
              <CardHeader>
                <CardTitle>{ar ? `صلاحيات ${selected.name}` : `${selected.name} permissions`}</CardTitle>
                <CardDescription>
                  {ar
                    ? "غيّر صلاحية واحدة في كل مرة. تُحفظ التغييرات على الخادم مباشرة."
                    : "Changes are saved immediately, one permission at a time."}
                </CardDescription>
                <AccessUpdating active={busy} />
              </CardHeader>
              <CardContent className="flex flex-col gap-0" aria-busy={busy}>
                {permissions.length ? (
                  permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between gap-4 border-b py-3 last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="font-medium break-words">{permission.name}</p>
                        {permission.description && (
                          <p className="text-xs text-muted-foreground break-words">{permission.description}</p>
                        )}
                      </div>
                      <Switch
                        checked={selectedPermissionIds.has(permission.id)}
                        disabled={!can("roles.edit") || busy}
                        onCheckedChange={(checked) =>
                          toggle.mutate(
                            { roleId: selected.id, permissionId: permission.id, checked },
                            {
                              onError: (error) => toast.error(getApiErrorMessage(error)),
                            },
                          )
                        }
                        aria-label={`${selected.name}: ${permission.name}`}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {ar ? "لا توجد صلاحيات متاحة." : "No permissions available."}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{ar ? "لا توجد أدوار" : "No roles yet"}</EmptyTitle>
            <EmptyDescription>
              {ar ? "أنشئ دورًا لتعيين صلاحياته." : "Create a role to assign permissions."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {creating && (
        <CreateRoleDialog
          ar={ar}
          onClose={() => setCreating(false)}
          onCreated={async (role) => {
            setSelectedId(role.id);
            await refreshRoles();
          }}
        />
      )}
      {deleting && (
        <DeleteDialog
          name={deleting.name}
          onClose={() => setDeleting(null)}
          onDelete={async () => {
            await remove.mutateAsync(deleting.id);
            if (selectedId === deleting.id) setSelectedId(null);
          }}
        />
      )}
    </div>
  );
}
