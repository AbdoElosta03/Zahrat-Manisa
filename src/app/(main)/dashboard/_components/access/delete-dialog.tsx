"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/i18n/language-provider";

import { AccessError } from "./access-feedback";

export function DeleteDialog({ name, onClose, onDelete }: {
  name: string;
  onClose: () => void;
  onDelete: () => Promise<void>;
}) {
  const { locale } = useI18n();
  const ar = locale === "ar";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  async function remove() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await onDelete();
      onClose();
    } catch (reason) {
      setError(reason);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }}>
      <DialogContent showCloseButton={!busy} dir={ar ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>{ar ? "حذف" : "Delete"} {name}</DialogTitle>
          <DialogDescription>{ar ? "سيتم حذف هذا السجل. لا يمكن التراجع عن العملية." : "This record will be deleted. This action cannot be undone."}</DialogDescription>
        </DialogHeader>
        {error != null && <AccessError error={error} />}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy}>{ar ? "إلغاء" : "Cancel"}</Button>
          <Button variant="destructive" onClick={() => void remove()} disabled={busy}>
            {busy && <Spinner data-icon="inline-start" />}{ar ? "حذف" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
