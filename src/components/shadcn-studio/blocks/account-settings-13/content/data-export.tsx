"use client";

import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

import SettingsSection from "@/components/shadcn-studio/blocks/account-settings-13/content/settings-section";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DATASETS = [
  { key: "companies", label: "Companies", count: 128 },
  { key: "people", label: "People", count: 342 },
  { key: "opportunities", label: "Opportunities", count: 76 },
  { key: "tasks", label: "Tasks", count: 214 },
  { key: "notes", label: "Notes", count: 189 },
  { key: "members", label: "Members", count: 14 },
];

const ExportIcon = () => <DownloadIcon className="size-4" />;

const DataExport = () => {
  const total = DATASETS.reduce((sum, dataset) => sum + dataset.count, 0);

  return (
    <SettingsSection
      title="Export your data"
      description="Downloads a CSV of everything currently in the workspace. Nothing leaves your browser."
      action={
        <Button type="button" size="sm" onClick={() => toast.success(`All data exported — ${total} rows`)}>
          <ExportIcon />
          Export everything
        </Button>
      }
    >
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset</TableHead>
              <TableHead className="w-28 text-right">Records</TableHead>
              <TableHead className="w-32">
                <span className="sr-only">Export</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATASETS.map((dataset) => (
              <TableRow key={dataset.key}>
                <TableCell className="font-medium">{dataset.label}</TableCell>
                <TableCell className="text-muted-foreground text-right tabular-nums">{dataset.count}</TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success(`${dataset.label} exported`, { description: `${dataset.count} rows` })}
                  >
                    <ExportIcon />
                    Export
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

export default DataExport;
