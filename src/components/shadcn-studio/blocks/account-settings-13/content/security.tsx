"use client";

import { useState } from "react";

import { ShieldCheckIcon, SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

const ChangePassword = () => {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });

  const handleSubmit = () => {
    setValues({ current: "", next: "", confirm: "" });
    toast.success("Password updated");
  };

  return (
    <SettingsSection
      title="Change password"
      description="Sets a new password for your account. Requires at least 8 characters."
    >
      <div className="flex max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-current-password">Current password</Label>
          <Input
            id="account-settings-13-current-password"
            type="password"
            autoComplete="current-password"
            value={values.current}
            onChange={(e) => setValues((prev) => ({ ...prev, current: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-new-password">New password</Label>
          <Input
            id="account-settings-13-new-password"
            type="password"
            autoComplete="new-password"
            value={values.next}
            onChange={(e) => setValues((prev) => ({ ...prev, next: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-confirm-password">Confirm new password</Label>
          <Input
            id="account-settings-13-confirm-password"
            type="password"
            autoComplete="new-password"
            value={values.confirm}
            onChange={(e) => setValues((prev) => ({ ...prev, confirm: e.target.value }))}
          />
        </div>
        <div>
          <Button type="button" onClick={handleSubmit}>
            Change password
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
};

const TwoFactor = () => {
  const [enabled, setEnabled] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);

  return (
    <SettingsSection
      title="Two-factor authentication"
      description="Adds a one-time code from your authenticator app on top of your password."
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="text-muted-foreground size-4 shrink-0" />
          <span className="text-sm">Authenticator app</span>
        </div>
        <Badge
          className={cn(
            "rounded-sm",
            enabled
              ? "bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400"
              : "bg-muted text-muted-foreground",
          )}
        >
          {enabled ? "Enabled" : "Not enabled"}
        </Badge>

        {enabled ? (
          <Dialog open={disableOpen} onOpenChange={setDisableOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Turn off
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-100">
              <DialogHeader>
                <DialogTitle>Turn off two-factor authentication?</DialogTitle>
                <DialogDescription>Your account will be protected by your password alone.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setEnabled(false);
                    setDisableOpen(false);
                    toast.success("Two-factor authentication turned off");
                  }}
                >
                  Turn off
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
            <DialogTrigger asChild>
              <Button type="button" size="sm">
                Set up
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-100">
              <DialogHeader>
                <DialogTitle>Set up two-factor authentication</DialogTitle>
                <DialogDescription>Scan this with your authenticator app, then confirm.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="bg-muted flex size-32 items-center justify-center rounded-lg border">
                  <SmartphoneIcon className="text-muted-foreground size-16" />
                </div>
                <p className="text-muted-foreground text-center text-xs">Demo code — no real secret is generated.</p>
              </div>
              <Button
                type="button"
                onClick={() => {
                  setEnabled(true);
                  setSetupOpen(false);
                  toast.success("Two-factor authentication enabled");
                }}
              >
                I&apos;ve scanned it
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SettingsSection>
  );
};

const Security = () => {
  return (
    <div className="flex flex-col gap-6">
      <ChangePassword />
      <TwoFactor />
    </div>
  );
};

export default Security;
