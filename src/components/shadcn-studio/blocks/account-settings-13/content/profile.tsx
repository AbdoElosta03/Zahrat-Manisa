"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

import { Trash2Icon, UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const initialDetails = { name: "Alex Morgan", email: "alex.morgan@nexacrm.app" };

const Picture = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string | null>("https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png");

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(URL.createObjectURL(file));
    toast.success("Picture updated");
  };

  return (
    <SettingsSection title="Picture" description="Shown on your records and in the members list.">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar className="size-16">
          {avatar && <AvatarImage src={avatar} alt={initialDetails.name} />}
          <AvatarFallback className="text-lg font-semibold">{getInitials(initialDetails.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              <UploadCloudIcon className="size-4" />
              Upload
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!avatar}
              onClick={() => {
                setAvatar(null);
                toast.success("Picture removed");
              }}
            >
              <Trash2Icon className="size-4" />
              Remove
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">We support square PNGs, JPEGs and GIFs under 10MB.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={upload} />
      </div>
    </SettingsSection>
  );
};

const YourDetails = () => {
  const [details, setDetails] = useState(initialDetails);
  const [draft, setDraft] = useState(initialDetails);

  const isDirty = draft.name !== details.name || draft.email !== details.email;

  const save = () => {
    setDetails(draft);
    toast.success("Profile updated");
  };

  const cancel = () => setDraft(details);

  return (
    <SettingsSection
      title="Your details"
      description="How you appear to everyone in the workspace."
      action={
        <>
          <Button type="button" size="sm" disabled={!isDirty} onClick={save}>
            Save changes
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={!isDirty} onClick={cancel}>
            Cancel
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-name">Full name</Label>
          <Input
            id="account-settings-13-name"
            value={draft.name}
            onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-email">Email address</Label>
          <Input
            id="account-settings-13-email"
            type="email"
            value={draft.email}
            onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
      </div>
    </SettingsSection>
  );
};

const DangerZone = () => {
  const [open, setOpen] = useState(false);

  return (
    <SettingsSection title="Danger zone" description="Delete your account and everything associated with it.">
      <Dialog open={open} onOpenChange={setOpen}>
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
              This removes your profile, your workspace access and everything you own. It cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={() => setOpen(false)}>
              Delete account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SettingsSection>
  );
};

const Profile = () => {
  return (
    <div className="flex flex-col gap-6">
      <Picture />
      <YourDetails />
      <DangerZone />
    </div>
  );
};

export default Profile;
