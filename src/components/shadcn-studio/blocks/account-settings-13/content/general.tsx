"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

import { RotateCcwIcon, UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultLogo = "https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png";
const initialWorkspace = { name: "NexaCRM Workspace", plan: "Business plan" };

const Logo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState(defaultLogo);

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogo(URL.createObjectURL(file));
    toast.success("Logo updated");
  };

  return (
    <SettingsSection title="Logo" description="Shown at the top of the sidebar, on every page.">
      <div className="flex flex-wrap items-center gap-4">
        <img src={logo} alt="Workspace logo" className="bg-muted size-16 rounded-md border object-contain p-2" />

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
              disabled={logo === defaultLogo}
              onClick={() => {
                setLogo(defaultLogo);
                toast.success("Default logo restored");
              }}
            >
              <RotateCcwIcon className="size-4" />
              Restore
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">Square PNGs, JPEGs and GIFs under 10MB work best.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={upload} />
      </div>
    </SettingsSection>
  );
};

const Workspace = () => {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [draft, setDraft] = useState(initialWorkspace);

  const isDirty = draft.name !== workspace.name || draft.plan !== workspace.plan;

  return (
    <SettingsSection
      title="Workspace"
      description="How this workspace is named for everyone in it."
      action={
        <>
          <Button
            type="button"
            size="sm"
            disabled={!isDirty}
            onClick={() => {
              setWorkspace(draft);
              toast.success("Workspace updated");
            }}
          >
            Save changes
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={!isDirty} onClick={() => setDraft(workspace)}>
            Cancel
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-workspace-name">Workspace name</Label>
          <Input
            id="account-settings-13-workspace-name"
            value={draft.name}
            onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-workspace-plan">Plan</Label>
          <Input
            id="account-settings-13-workspace-plan"
            value={draft.plan}
            onChange={(e) => setDraft((prev) => ({ ...prev, plan: e.target.value }))}
          />
        </div>
      </div>
    </SettingsSection>
  );
};

const RestoreDefaults = () => {
  return (
    <SettingsSection
      title="Restore defaults"
      description="Puts the name, plan and logo back to the values the template ships with."
      action={
        <Button type="button" variant="outline" size="sm" onClick={() => toast.success("Workspace restored")}>
          <RotateCcwIcon className="size-4" />
          Restore defaults
        </Button>
      }
    >
      <p className="text-muted-foreground text-sm">
        Members, records and permissions are untouched — this only affects the workspace&apos;s name, plan and logo.
      </p>
    </SettingsSection>
  );
};

const General = () => {
  return (
    <div className="flex flex-col gap-6">
      <Logo />
      <Workspace />
      <RestoreDefaults />
    </div>
  );
};

export default General;
