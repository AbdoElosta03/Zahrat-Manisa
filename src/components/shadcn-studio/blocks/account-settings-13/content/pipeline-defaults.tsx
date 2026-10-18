"use client";

import { useState } from "react";

import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const CURRENCY_OPTIONS = [
  { value: "usd", label: "US Dollar (USD)" },
  { value: "eur", label: "Euro (EUR)" },
  { value: "gbp", label: "British Pound (GBP)" },
  { value: "inr", label: "Indian Rupee (INR)" },
];

const PIPELINE_OPTIONS = [
  { value: "sales", label: "Sales Pipeline" },
  { value: "enterprise", label: "Enterprise Pipeline" },
  { value: "renewal", label: "Renewal Pipeline" },
];

const DealDefaults = () => {
  const [currency, setCurrency] = useState("usd");
  const [pipeline, setPipeline] = useState("sales");

  return (
    <SettingsSection title="Deal defaults" description="Applied when a new deal is created.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-currency">Default currency</Label>
          <Select value={currency} onValueChange={(value) => value && setCurrency(value)}>
            <SelectTrigger id="account-settings-13-currency" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CURRENCY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="account-settings-13-pipeline">Default pipeline</Label>
          <Select value={pipeline} onValueChange={(value) => value && setPipeline(value)}>
            <SelectTrigger id="account-settings-13-pipeline" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PIPELINE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsSection>
  );
};

const PipelineHygiene = () => {
  const [rotDays, setRotDays] = useState(14);
  const [autoAssign, setAutoAssign] = useState(true);

  return (
    <SettingsSection
      title="Pipeline hygiene"
      description="Keep deals moving and leads assigned."
      action={
        <Button type="button" size="sm" onClick={() => toast.success("Pipeline preferences saved")}>
          Save changes
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:max-w-xs">
          <Label htmlFor="account-settings-13-rot-days">Flag deals as stale after (days)</Label>
          <Input
            id="account-settings-13-rot-days"
            type="number"
            min={1}
            max={90}
            value={rotDays}
            onChange={(e) => setRotDays(Number(e.target.value) || 0)}
          />
          <p className="text-muted-foreground text-xs">Deals with no activity past this many days are marked stale.</p>
        </div>

        <Field orientation="horizontal" className="items-center">
          <FieldContent>
            <FieldLabel htmlFor="account-settings-13-auto-assign">Auto-assign new leads to their owner</FieldLabel>
            <FieldDescription>
              New leads are routed to an owner automatically instead of sitting unassigned.
            </FieldDescription>
          </FieldContent>
          <Switch id="account-settings-13-auto-assign" checked={autoAssign} onCheckedChange={setAutoAssign} />
        </Field>
      </div>
    </SettingsSection>
  );
};

const PipelineDefaults = () => {
  return (
    <div className="flex flex-col gap-6">
      <DealDefaults />
      <PipelineHygiene />
    </div>
  );
};

export default PipelineDefaults;
