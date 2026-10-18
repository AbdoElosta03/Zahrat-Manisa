"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";

import { Trash2Icon, UploadCloudIcon } from "lucide-react";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { MyProfile, UpdateMyProfileRequest } from "@/lib/api/types/auth";
import { notify } from "@/lib/notify";
import { getInitials } from "@/lib/utils";

type ProfileDraft = {
  first_name: string;
  last_name: string;
  username: string;
  occupation: string;
  image: string | null;
};

function toDraft(profile: MyProfile): ProfileDraft {
  return {
    first_name: profile.first_name,
    last_name: profile.last_name,
    username: profile.username ?? "",
    occupation: profile.occupation ?? "",
    image: profile.image ?? null,
  };
}

function toPatch(draft: ProfileDraft, baseline: ProfileDraft, includeOccupation: boolean): UpdateMyProfileRequest {
  const patch: UpdateMyProfileRequest = {};
  if (draft.first_name !== baseline.first_name) patch.first_name = draft.first_name.trim() || null;
  if (draft.last_name !== baseline.last_name) patch.last_name = draft.last_name.trim() || null;
  if (draft.username !== baseline.username) patch.username = draft.username.trim() || null;
  if (includeOccupation && draft.occupation !== baseline.occupation) {
    patch.occupation = draft.occupation.trim() || null;
  }
  if (draft.image !== baseline.image) patch.image = draft.image;
  return patch;
}

export function MyProfileDetailsSection({
  profile,
  pending,
  deletePending,
  onSave,
  onDeleteAccount,
}: {
  profile: MyProfile;
  pending: boolean;
  deletePending: boolean;
  onSave: (input: UpdateMyProfileRequest) => Promise<void>;
  onDeleteAccount: (password: string) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [baseline, setBaseline] = useState(() => toDraft(profile));
  const [draft, setDraft] = useState(() => toDraft(profile));
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    const next = toDraft(profile);
    setBaseline(next);
    setDraft(next);
    setPreviewUrl(null);
  }, [profile]);

  const isOwner = profile.is_owner || profile.account_type === "owner";
  const displayName = `${draft.first_name} ${draft.last_name}`.trim();
  const avatarSrc = previewUrl ?? draft.image;
  const patch = toPatch(draft, baseline, !isOwner);
  const isDirty = Object.keys(patch).length > 0;

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      notify.error("Image must be under 10MB.");
      return;
    }
    notify.warning(
      "Image preview only. Upload to storage is not wired yet — use a profile image URL from your account.",
    );
    setPreviewUrl(URL.createObjectURL(file));
    event.target.value = "";
  };

  const save = async () => {
    if (!isDirty || pending) return;
    if (!draft.first_name.trim() || !draft.last_name.trim()) {
      notify.error("First and last name are required.");
      return;
    }
    await onSave(patch);
  };

  const confirmDelete = async () => {
    if (!deletePassword.trim() || deletePending) return;
    await onDeleteAccount(deletePassword);
    setDeleteOpen(false);
    setDeletePassword("");
  };

  return (
    <div className="flex flex-col gap-6">
      <SettingsSection title="Picture" description="Shown on your account and across the admin workspace.">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="size-16">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt={displayName} /> : null}
            <AvatarFallback className="text-lg font-semibold">{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={pending}
                onClick={() => inputRef.current?.click()}
              >
                <UploadCloudIcon className="size-4" />
                Upload
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={pending || (!avatarSrc && !draft.image)}
                onClick={() => {
                  setPreviewUrl(null);
                  setDraft((prev) => ({ ...prev, image: null }));
                }}
              >
                <Trash2Icon className="size-4" />
                Remove
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">Square PNG, JPEG, or GIF under 10MB.</p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={upload} />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Your details"
        description="How you appear to others in Manisa Travel Admin."
        action={
          <>
            <Button type="button" size="sm" disabled={!isDirty || pending} onClick={() => void save()}>
              {pending && <Spinner data-icon="inline-start" />}
              Save changes
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!isDirty || pending}
              onClick={() => {
                setDraft(baseline);
                setPreviewUrl(null);
              }}
            >
              Cancel
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="my-profile-first-name">First name</Label>
            <Input
              id="my-profile-first-name"
              value={draft.first_name}
              maxLength={100}
              disabled={pending}
              onChange={(event) => setDraft((prev) => ({ ...prev, first_name: event.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="my-profile-last-name">Last name</Label>
            <Input
              id="my-profile-last-name"
              value={draft.last_name}
              maxLength={100}
              disabled={pending}
              onChange={(event) => setDraft((prev) => ({ ...prev, last_name: event.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="my-profile-username">Username</Label>
            <Input
              id="my-profile-username"
              value={draft.username}
              maxLength={30}
              disabled={pending}
              dir="ltr"
              onChange={(event) => setDraft((prev) => ({ ...prev, username: event.target.value }))}
            />
          </div>
          {!isOwner ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="my-profile-occupation">Occupation</Label>
              <Input
                id="my-profile-occupation"
                value={draft.occupation}
                maxLength={255}
                disabled={pending}
                onChange={(event) => setDraft((prev) => ({ ...prev, occupation: event.target.value }))}
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="my-profile-email">Email</Label>
            <Input id="my-profile-email" type="email" value={profile.email ?? ""} disabled readOnly dir="ltr" />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Danger zone" description="Delete your account and everything associated with it.">
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-destructive! border-destructive/40! hover:bg-destructive/10!"
            >
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-100">
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription>
                This permanently removes your profile and access. Enter your password to confirm.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="my-profile-delete-password">Password</Label>
              <Input
                id="my-profile-delete-password"
                type="password"
                autoComplete="current-password"
                value={deletePassword}
                disabled={deletePending}
                onChange={(event) => setDeletePassword(event.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={deletePending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                disabled={!deletePassword.trim() || deletePending}
                onClick={() => void confirmDelete()}
              >
                {deletePending && <Spinner data-icon="inline-start" />}
                Delete account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SettingsSection>
    </div>
  );
}
