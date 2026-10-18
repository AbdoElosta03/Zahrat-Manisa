import type { Metadata } from "next";

import { IntegrationGroups } from "./_components/integration-groups";
import { IntegrationsHeader } from "./_components/integrations-header";
import { integrationGroups } from "./_components/integrations-data";

export const metadata: Metadata = {
  title: "Integrations | Manisa Travel Admin",
  description: "Monitor airline, payment, and messaging integration health, credentials, and webhooks.",
  alternates: {
    canonical: "/dashboard/integrations",
  },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <IntegrationsHeader />
      <IntegrationGroups groups={integrationGroups} />
    </div>
  );
}
