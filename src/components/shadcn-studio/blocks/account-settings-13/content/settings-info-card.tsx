import type { ReactNode } from "react";

export const SettingsInfoCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="rounded-lg border p-4">
    <h2 className="mb-3 text-sm font-medium">{title}</h2>
    <dl className="flex flex-col gap-2.5">{children}</dl>
  </section>
);

export const SettingsInfoRow = ({ label, value, icon }: { label: ReactNode; value: ReactNode; icon?: ReactNode }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <dt className="text-muted-foreground flex min-w-0 items-center gap-1.5">
      {icon}
      <span className="truncate">{label}</span>
    </dt>
    <dd className="shrink-0 text-right font-medium tabular-nums">{value}</dd>
  </div>
);
