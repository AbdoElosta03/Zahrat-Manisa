"use client";

import { CopyIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ApiKey = {
  id: string;
  name: string;
  maskedKey: string;
  role: string;
  expires: string;
};

const API_KEYS: ApiKey[] = [
  {
    id: "key-1",
    name: "Zapier integration",
    maskedKey: "ncrm_live_••••••8f2a",
    role: "Admin",
    expires: "in 11 months",
  },
  {
    id: "key-2",
    name: "Reporting script",
    maskedKey: "ncrm_live_••••••c910",
    role: "Read-only",
    expires: "in 4 months",
  },
  { id: "key-3", name: "CI pipeline", maskedKey: "ncrm_live_••••••4e77", role: "Editor", expires: "in 26 days" },
];

const ApiKeys = () => {
  return (
    <SettingsSection
      title="API keys"
      description="Keys authenticate a script or a service as this workspace. Treat one like a password."
      action={
        <Button type="button" variant="outline" size="sm" onClick={() => toast.success("API key created")}>
          <PlusIcon className="size-4" />
          Create API key
        </Button>
      }
    >
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-32">Name</TableHead>
              <TableHead className="min-w-40">Key</TableHead>
              <TableHead className="w-32">Role</TableHead>
              <TableHead className="w-32">Expires</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Copy</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {API_KEYS.map((key) => (
              <TableRow key={key.id}>
                <TableCell className="font-medium">{key.name}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">{key.maskedKey}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{key.role}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{key.expires}</TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Copy ${key.name}`}
                    onClick={() =>
                      toast("A key is only shown once", { description: "Rotate the key to get a new one." })
                    }
                  >
                    <CopyIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SettingsSection>
  );
};

export default ApiKeys;
