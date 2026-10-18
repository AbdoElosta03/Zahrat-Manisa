"use client";

import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { AccessError } from "@/app/(main)/dashboard/_components/access/access-feedback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { usersApi } from "@/lib/api/services/users";
import type { RoleWithPermissionsResponse } from "@/lib/api/types/authorization";
import type { CreateUserRequest, UpdateEmployeeRequest, User } from "@/lib/api/types/users";

export function UserEditor({
  userId,
  roles,
  ar,
  onClose,
  onSaved,
}: {
  userId?: string;
  roles: RoleWithPermissionsResponse[];
  ar: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const busy = useIsMutating({ mutationKey: ["users-v1", "editor"] }) > 0;
  const userQuery = useQuery({
    queryKey: ["users-v1", "detail", userId],
    queryFn: ({ signal }) => usersApi.get(userId ?? "", signal),
    enabled: Boolean(userId),
  });
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md" dir={ar ? "rtl" : "ltr"} showCloseButton={!busy}>
        <DialogHeader>
          <DialogTitle>
            {userId ? (ar ? "تعديل المستخدم" : "Edit user") : ar ? "دعوة مستخدم" : "Invite user"}
          </DialogTitle>
          <DialogDescription>
            {userId
              ? ar
                ? "تعديل بيانات الموظف. البريد والأدوار لا تتغير من هنا."
                : "Edit employee details. Email and roles cannot be changed here."
              : ar
                ? "سيتلقى المستخدم دعوة عبر البريد لإكمال إنشاء حسابه."
                : "An email invitation will be sent to complete registration."}
          </DialogDescription>
        </DialogHeader>
        {userId && userQuery.isPending ? (
          <Skeleton className="h-64 w-full" />
        ) : userId && userQuery.isError ? (
          <AccessError error={userQuery.error} retry={() => void userQuery.refetch()} busy={userQuery.isFetching} />
        ) : (
          <UserEditorForm user={userQuery.data} roles={roles} ar={ar} onClose={onClose} onSaved={onSaved} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function UserEditorForm({
  user,
  roles,
  ar,
  onClose,
  onSaved,
}: {
  user?: User;
  roles: RoleWithPermissionsResponse[];
  ar: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
  const create = useMutation({ mutationKey: ["users-v1", "editor", "create"], mutationFn: usersApi.create });
  const update = useMutation({
    mutationKey: ["users-v1", "editor", "update"],
    mutationFn: (input: UpdateEmployeeRequest) => usersApi.update(user?.id ?? "", input),
  });
  const pending = create.isPending || update.isPending;
  const error = create.error ?? update.error;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const first_name = String(data.get("first_name") ?? "").trim();
    const last_name = String(data.get("last_name") ?? "").trim();
    if (!first_name || !last_name) return;
    try {
      if (user) {
        await update.mutateAsync({
          first_name,
          last_name,
          occupation: String(data.get("occupation") ?? "").trim() || null,
        });
        toast.success(ar ? "تم تعديل المستخدم" : "User updated");
      } else {
        if (!roleId) return;
        const input: CreateUserRequest = {
          first_name,
          last_name,
          email: String(data.get("email") ?? "").trim(),
          role_ids: [roleId],
        };
        await create.mutateAsync(input);
        toast.success(ar ? "تم إرسال الدعوة" : "Invitation sent", {
          description: ar
            ? "سيظهر المستخدم في القائمة بعد قبول الدعوة."
            : "The user appears in the list after accepting the invitation.",
        });
      }
      onSaved();
      onClose();
    } catch (reason) {
      toast.error(getApiErrorMessage(reason));
    }
  }

  return (
    <>
      <form id="user-editor-form" onSubmit={(event) => void submit(event)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="user-first-name">{ar ? "الاسم الأول" : "First name"}</FieldLabel>
            <Input
              id="user-first-name"
              name="first_name"
              defaultValue={user?.first_name ?? ""}
              maxLength={100}
              required
              disabled={pending}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="user-last-name">{ar ? "اسم العائلة" : "Last name"}</FieldLabel>
            <Input
              id="user-last-name"
              name="last_name"
              defaultValue={user?.last_name ?? ""}
              maxLength={100}
              required
              disabled={pending}
            />
          </Field>
          {user ? (
            <Field>
              <FieldLabel htmlFor="user-occupation">{ar ? "المهنة" : "Occupation"}</FieldLabel>
              <Input
                id="user-occupation"
                name="occupation"
                defaultValue={user.occupation ?? ""}
                maxLength={255}
                disabled={pending}
              />
            </Field>
          ) : (
            <>
              <Field>
                <FieldLabel htmlFor="user-email">{ar ? "البريد الإلكتروني" : "Email"}</FieldLabel>
                <Input
                  id="user-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={pending}
                  dir="ltr"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="user-role">{ar ? "الدور" : "Role"}</FieldLabel>
                <Select value={roleId} onValueChange={setRoleId} disabled={pending}>
                  <SelectTrigger id="user-role" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </>
          )}
        </FieldGroup>
      </form>
      {error && <AccessError error={error} />}
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onClose} disabled={pending}>
          {ar ? "إلغاء" : "Cancel"}
        </Button>
        <Button type="submit" form="user-editor-form" disabled={pending || (!user && !roleId)}>
          {pending && <Spinner data-icon="inline-start" />}
          {user ? (ar ? "حفظ" : "Save") : ar ? "إرسال الدعوة" : "Send invitation"}
        </Button>
      </DialogFooter>
    </>
  );
}
