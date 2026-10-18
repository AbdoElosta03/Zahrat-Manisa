"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { AccessError } from "@/app/(main)/dashboard/_components/access/access-feedback";
import { usePermissions } from "@/app/(main)/dashboard/_components/access/access.queries";
import { AccessSkeleton } from "@/app/(main)/dashboard/_components/access/access-skeleton";
import { DeleteDialog } from "@/app/(main)/dashboard/_components/access/delete-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/language-provider";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { usersApi } from "@/lib/api/services/users";
import type { User } from "@/lib/api/types/users";

import { UserEditor } from "./user-editor";

const PAGE_SIZE = 10;

export function UsersWorkspace() {
  const { locale, formatNumber } = useI18n();
  const ar = locale === "ar";
  const { can, currentUser } = usePermissions();
  const client = useQueryClient();
  const [page, setPage] = useState(1);
  const [editor, setEditor] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const usersQuery = useQuery({
    queryKey: ["users-v1", page, PAGE_SIZE],
    queryFn: ({ signal }) => usersApi.list(page, PAGE_SIZE, signal),
    placeholderData: keepPreviousData,
    enabled: can("users.view"),
  });
  const rolesQuery = useQuery({
    queryKey: ["users-v1", "roles"],
    queryFn: ({ signal }) => usersApi.roles(signal),
    enabled: can("users.create"),
  });
  const invalidate = () => client.invalidateQueries({ queryKey: ["users-v1"] });
  const blocking = useMutation({
    mutationFn: ({ id, blocked }: { id: string; blocked: boolean }) => usersApi.setBlocked(id, blocked),
    onSuccess: async () => {
      await invalidate();
    },
  });
  const removal = useMutation({
    mutationFn: usersApi.delete,
    onSuccess: async () => {
      await invalidate();
    },
  });

  if (usersQuery.isPending) return <AccessSkeleton />;
  if (!usersQuery.data)
    return (
      <AccessError error={usersQuery.error} retry={() => void usersQuery.refetch()} busy={usersQuery.isFetching} />
    );

  const { items, total, pages } = usersQuery.data;
  const date = (value: string) =>
    new Intl.DateTimeFormat(ar ? "ar" : "en", { dateStyle: "medium" }).format(new Date(value));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{ar ? "إدارة المستخدمين" : "Users"}</h1>
          <p className="text-sm text-muted-foreground">
            {ar ? "عرض المستخدمين ودعوتهم وتعديل بياناتهم وحظرهم." : "View, invite, edit, block and delete users."}
          </p>
        </div>
        {can("users.create") && (
          <Button onClick={() => setEditor("new")} disabled={!rolesQuery.data?.length}>
            {ar ? "إضافة مستخدم" : "Invite user"}
          </Button>
        )}
      </div>

      {rolesQuery.isError && (
        <AccessError error={rolesQuery.error} retry={() => void rolesQuery.refetch()} busy={rolesQuery.isFetching} />
      )}
      {usersQuery.isError && (
        <AccessError error={usersQuery.error} retry={() => void usersQuery.refetch()} busy={usersQuery.isFetching} />
      )}
      {blocking.isError && <AccessError error={blocking.error} />}
      <Card>
        <CardHeader>
          <CardTitle>{ar ? "قائمة المستخدمين" : "User directory"}</CardTitle>
          <CardDescription>
            {formatNumber(total)} {ar ? "مستخدم" : "users"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0" aria-busy={usersQuery.isFetching}>
          {items.length ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="ps-4 text-start">{ar ? "المستخدم" : "User"}</TableHead>
                    <TableHead className="text-start">{ar ? "نوع الحساب" : "Account"}</TableHead>
                    <TableHead className="text-start">{ar ? "الحالة" : "Status"}</TableHead>
                    <TableHead className="text-start">{ar ? "تاريخ الإنشاء" : "Created"}</TableHead>
                    <TableHead className="pe-4 text-end">{ar ? "إجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((user) => {
                    const name = `${user.first_name} ${user.last_name}`.trim();
                    const protectedUser = user.is_owner || user.id === currentUser?.id;
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="ps-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {user.first_name[0]}
                                {user.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="font-medium">{name}</div>
                              <div className="truncate text-xs text-muted-foreground" dir="ltr">
                                {user.email ?? user.phone_number ?? "—"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.account_type === "employee" ? (ar ? "موظف" : "Employee") : ar ? "عميل" : "Customer"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.is_blocked ? "destructive" : "secondary"}>
                            {user.is_blocked ? (ar ? "محظور" : "Blocked") : ar ? "نشط" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>{date(user.created_at)}</TableCell>
                        <TableCell className="pe-4">
                          <div className="flex justify-end gap-2">
                            {can("users.edit") && user.account_type === "employee" && (
                              <Button size="sm" variant="outline" onClick={() => setEditor(user.id)}>
                                {ar ? "تعديل" : "Edit"}
                              </Button>
                            )}
                            {can("users.edit") && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={protectedUser || blocking.isPending}
                                onClick={() =>
                                  blocking.mutate(
                                    { id: user.id, blocked: !user.is_blocked },
                                    {
                                      onSuccess: () =>
                                        toast.success(
                                          user.is_blocked
                                            ? ar
                                              ? "تم إلغاء الحظر"
                                              : "User unblocked"
                                            : ar
                                              ? "تم الحظر"
                                              : "User blocked",
                                        ),
                                      onError: (error) => toast.error(getApiErrorMessage(error)),
                                    },
                                  )
                                }
                              >
                                {blocking.isPending && blocking.variables?.id === user.id && (
                                  <Spinner data-icon="inline-start" />
                                )}
                                {user.is_blocked ? (ar ? "إلغاء الحظر" : "Unblock") : ar ? "حظر" : "Block"}
                              </Button>
                            )}
                            {can("users.delete") && (
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={protectedUser || removal.isPending}
                                onClick={() => setDeleting(user)}
                              >
                                {ar ? "حذف" : "Delete"}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Empty className="min-h-48">
              <EmptyHeader>
                <EmptyTitle>{ar ? "لا يوجد مستخدمون" : "No users"}</EmptyTitle>
                <EmptyDescription>
                  {ar ? "ستظهر الحسابات هنا بعد إنشائها." : "Accounts will appear here once created."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </CardContent>
      </Card>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {formatNumber(page)} / {formatNumber(Math.max(pages, 1))}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || usersQuery.isFetching}
            onClick={() => setPage(page - 1)}
          >
            {ar ? "السابق" : "Previous"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pages || usersQuery.isFetching}
            onClick={() => setPage(page + 1)}
          >
            {ar ? "التالي" : "Next"}
          </Button>
        </div>
      </div>
      {editor && (
        <UserEditor
          key={editor}
          userId={editor === "new" ? undefined : editor}
          roles={rolesQuery.data ?? []}
          ar={ar}
          onClose={() => setEditor(null)}
          onSaved={() => void invalidate()}
        />
      )}
      {deleting && (
        <DeleteDialog
          name={`${deleting.first_name} ${deleting.last_name}`}
          onClose={() => setDeleting(null)}
          onDelete={async () => {
            await removal.mutateAsync(deleting.id);
            if (items.length === 1 && page > 1) setPage(page - 1);
          }}
        />
      )}
    </div>
  );
}
