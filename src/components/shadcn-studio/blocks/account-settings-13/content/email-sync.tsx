"use client";

import { useState } from "react";

import { MailIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const initialSignature = "Alex Morgan\nNexaCRM";

const ConnectedEmail = ({ connected, onToggle }: { connected: boolean; onToggle: () => void }) => {
  return (
    <SettingsSection title="Connected email" description="Sync your CRM activity with your inbox.">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <span className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
            <MailIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">alex.morgan@nexacrm.app</p>
            <p className="text-muted-foreground text-xs">{connected ? "Connected" : "Not connected"}</p>
          </div>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onToggle}>
          {connected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </SettingsSection>
  );
};

const SyncPreferences = ({ disabled }: { disabled: boolean }) => {
  const [syncActivity, setSyncActivity] = useState(true);
  const [trackOpens, setTrackOpens] = useState(true);
  const [trackClicks, setTrackClicks] = useState(false);

  return (
    <SettingsSection title="Sync preferences" description="Control what happens with your connected mailbox.">
      <div className="flex flex-col gap-4">
        <Field orientation="horizontal" className="items-center" data-disabled={disabled ? "true" : undefined}>
          <FieldContent>
            <FieldLabel htmlFor="account-settings-13-sync-activity">Sync CRM activity</FieldLabel>
            <FieldDescription>Log emails sent from your inbox to CRM records automatically.</FieldDescription>
          </FieldContent>
          <Switch
            id="account-settings-13-sync-activity"
            checked={syncActivity}
            disabled={disabled}
            onCheckedChange={setSyncActivity}
          />
        </Field>

        <Field orientation="horizontal" className="items-center" data-disabled={disabled ? "true" : undefined}>
          <FieldContent>
            <FieldLabel htmlFor="account-settings-13-track-opens">Track email opens</FieldLabel>
            <FieldDescription>Get notified when a recipient opens your email.</FieldDescription>
          </FieldContent>
          <Switch
            id="account-settings-13-track-opens"
            checked={trackOpens}
            disabled={disabled}
            onCheckedChange={setTrackOpens}
          />
        </Field>

        <Field orientation="horizontal" className="items-center" data-disabled={disabled ? "true" : undefined}>
          <FieldContent>
            <FieldLabel htmlFor="account-settings-13-track-clicks">Track link clicks</FieldLabel>
            <FieldDescription>See when recipients click links in your emails.</FieldDescription>
          </FieldContent>
          <Switch
            id="account-settings-13-track-clicks"
            checked={trackClicks}
            disabled={disabled}
            onCheckedChange={setTrackClicks}
          />
        </Field>
      </div>
    </SettingsSection>
  );
};

const EmailSignature = () => {
  const [signature, setSignature] = useState(initialSignature);
  const [draft, setDraft] = useState(initialSignature);

  const isDirty = draft !== signature;

  return (
    <SettingsSection
      title="Email signature"
      description="Appended to emails sent from the CRM."
      action={
        <>
          <Button
            type="button"
            size="sm"
            disabled={!isDirty}
            onClick={() => {
              setSignature(draft);
              toast.success("Signature updated");
            }}
          >
            Save changes
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={!isDirty} onClick={() => setDraft(signature)}>
            Cancel
          </Button>
        </>
      }
    >
      <Textarea rows={4} value={draft} onChange={(e) => setDraft(e.target.value)} className="max-w-sm resize-none" />
    </SettingsSection>
  );
};

const EmailSync = () => {
  const [connected, setConnected] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <ConnectedEmail connected={connected} onToggle={() => setConnected((prev) => !prev)} />
      <SyncPreferences disabled={!connected} />
      <EmailSignature />
    </div>
  );
};

export default EmailSync;
