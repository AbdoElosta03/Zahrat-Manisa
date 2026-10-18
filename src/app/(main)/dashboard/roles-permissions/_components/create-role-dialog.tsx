"use client";

import { useMutation } from "@tanstack/react-query";
import { type FormEvent } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { authorizationApi } from "@/lib/api/services/authorization";
import type { RoleResponse } from "@/lib/api/types/authorization";

export function CreateRoleDialog({
  ar,
  onClose,
  onCreated,
}: {
  ar: boolean;
  onClose: () => void;
  onCreated: (role: RoleResponse) => Promise<void>;
}) {
  const create = useMutation({ mutationFn: authorizationApi.createRole });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    if (!name || !description) return;
    let role: RoleResponse;
    try {
      role = await create.mutateAsync({ name, description });
    } catch {
      // Keep the dialog open so the server error remains visible.
      return;
    }
    try {
      await onCreated(role);
      toast.success(ar ? "تم إنشاء الدور" : "Role created");
    } catch {
      toast.error(ar ? "تم إنشاء الدور، لكن تعذّر تحديث القائمة." : "Role created, but the list could not refresh.");
    }
    onClose();
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !create.isPending) onClose();
      }}
    >
      <DialogContent dir={ar ? "rtl" : "ltr"} showCloseButton={!create.isPending}>
        <DialogHeader>
          <DialogTitle>{ar ? "إضافة دور" : "Add role"}</DialogTitle>
          <DialogDescription>
            {ar
              ? "أدخل الاسم والوصف، ثم اختر الصلاحيات بعد الإنشاء."
              : "Enter a name and description. Assign permissions after creation."}
          </DialogDescription>
        </DialogHeader>
        <form id="create-role" onSubmit={(event) => void submit(event)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="role-name">{ar ? "الاسم" : "Name"}</FieldLabel>
              <Input
                id="role-name"
                name="name"
                minLength={1}
                maxLength={100}
                required
                disabled={create.isPending}
                autoFocus
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="role-description">{ar ? "الوصف" : "Description"}</FieldLabel>
              <Input
                id="role-description"
                name="description"
                minLength={1}
                maxLength={500}
                required
                disabled={create.isPending}
              />
            </Field>
          </FieldGroup>
        </form>
        {create.isError && <AccessError error={create.error} />}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={create.isPending}>
            {ar ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="submit" form="create-role" disabled={create.isPending}>
            {create.isPending && <Spinner data-icon="inline-start" />}
            {ar ? "إنشاء" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
