"use client";

import { useState } from "react";

import { RotateCcwIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type NotificationEvent = {
  key: string;
  label: string;
  description: string;
};

const EVENTS: NotificationEvent[] = [
  {
    key: "record-assigned",
    label: "Record assigned to you",
    description: "A company, person or deal is assigned to you.",
  },
  {
    key: "deal-stage-changed",
    label: "Deal stage changed",
    description: "A deal you own moves to a new pipeline stage.",
  },
  { key: "mention", label: "Mentions", description: "Someone @mentions you in a note or comment." },
  { key: "task-due", label: "Task due soon", description: "A task assigned to you is due within 24 hours." },
  { key: "new-lead", label: "New lead captured", description: "A new lead is added to your workspace." },
  { key: "weekly-digest", label: "Weekly summary", description: "A weekly recap of your pipeline activity." },
];

const initialChannels: Record<string, { email: boolean; inApp: boolean }> = {
  "record-assigned": { email: true, inApp: true },
  "deal-stage-changed": { email: true, inApp: true },
  mention: { email: true, inApp: true },
  "task-due": { email: false, inApp: true },
  "new-lead": { email: true, inApp: false },
  "weekly-digest": { email: true, inApp: false },
};

const Notifications = () => {
  const [channels, setChannels] = useState(initialChannels);

  const setChannel = (key: string, channel: "email" | "inApp", value: boolean) =>
    setChannels((prev) => ({ ...prev, [key]: { ...prev[key], [channel]: value } }));

  return (
    <SettingsSection
      title="Notify me when"
      description="Choose how you hear about each event. Changes apply immediately."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setChannels(initialChannels);
            toast.success("Notification preferences reset");
          }}
        >
          <RotateCcwIcon className="size-4" />
          Reset to defaults
        </Button>
      }
    >
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead className="w-24 text-center">Email</TableHead>
              <TableHead className="w-24 text-center">In-app</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EVENTS.map((event) => (
              <TableRow key={event.key}>
                <TableCell>
                  <p className="font-medium">{event.label}</p>
                  <p className="text-muted-foreground text-xs">{event.description}</p>
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={channels[event.key].email}
                    aria-label={`Email for ${event.label}`}
                    onCheckedChange={(checked) => setChannel(event.key, "email", checked === true)}
                    className="mx-auto"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={channels[event.key].inApp}
                    aria-label={`In-app for ${event.label}`}
                    onCheckedChange={(checked) => setChannel(event.key, "inApp", checked === true)}
                    className="mx-auto"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SettingsSection>
  );
};

export default Notifications;
