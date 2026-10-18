export type IntegrationEnvironment = "Sandbox" | "Production" | "Disabled";

export type IntegrationHealth = "Connected" | "Degraded" | "Disconnected";

export type IntegrationAuth = "API key" | "OAuth 2.0" | "Certificate" | "Webhook secret";

export type IntegrationRow = {
  id: string;
  name: string;
  vendor: string;
  slug: string;
  environment: IntegrationEnvironment;
  health: IntegrationHealth;
  latency: string;
  lastSync: string;
  auth: IntegrationAuth;
  webhook: "Active" | "Paused" | "None";
  region: string;
};

export type IntegrationGroup = {
  id: string;
  category: string;
  subtitle: string;
  rows: IntegrationRow[];
};

export const integrationGroups: IntegrationGroup[] = [
  {
    id: "gds",
    category: "GDS & airline connectivity",
    subtitle: "Availability, pricing, booking, and ticketing",
    rows: [
      {
        id: "int-amadeus",
        name: "Amadeus Web Services",
        vendor: "Amadeus",
        slug: "amadeus",
        environment: "Production",
        health: "Connected",
        latency: "142ms",
        lastSync: "2 min ago",
        auth: "Certificate",
        webhook: "Active",
        region: "EU-West",
      },
      {
        id: "int-sabre",
        name: "Sabre REST API",
        vendor: "Sabre",
        slug: "sabre",
        environment: "Sandbox",
        health: "Degraded",
        latency: "318ms",
        lastSync: "18 min ago",
        auth: "OAuth 2.0",
        webhook: "Paused",
        region: "US-East",
      },
      {
        id: "int-pegasus-ndc",
        name: "Pegasus NDC",
        vendor: "Pegasus",
        slug: "pegasus",
        environment: "Production",
        health: "Connected",
        latency: "89ms",
        lastSync: "45 sec ago",
        auth: "API key",
        webhook: "Active",
        region: "TR-Istanbul",
      },
      {
        id: "int-tk-direct",
        name: "Turkish Airlines Direct Connect",
        vendor: "Turkish Airlines",
        slug: "turkish",
        environment: "Production",
        health: "Connected",
        latency: "104ms",
        lastSync: "1 min ago",
        auth: "Certificate",
        webhook: "None",
        region: "EU-Central",
      },
    ],
  },
  {
    id: "payments",
    category: "Payments & settlement",
    subtitle: "Capture, refunds, and gateway reconciliation",
    rows: [
      {
        id: "int-hyperpay",
        name: "HyperPay Gateway",
        vendor: "HyperPay",
        slug: "hyperpay",
        environment: "Production",
        health: "Connected",
        latency: "56ms",
        lastSync: "30 sec ago",
        auth: "API key",
        webhook: "Active",
        region: "MENA",
      },
      {
        id: "int-stripe",
        name: "Stripe Connect",
        vendor: "Stripe",
        slug: "stripe",
        environment: "Sandbox",
        health: "Connected",
        latency: "72ms",
        lastSync: "4 min ago",
        auth: "OAuth 2.0",
        webhook: "Active",
        region: "EU",
      },
      {
        id: "int-moyasar",
        name: "Moyasar Checkout",
        vendor: "Moyasar",
        slug: "moyasar",
        environment: "Disabled",
        health: "Disconnected",
        latency: "—",
        lastSync: "3 days ago",
        auth: "API key",
        webhook: "None",
        region: "KSA",
      },
    ],
  },
  {
    id: "comms",
    category: "Messaging & notifications",
    subtitle: "SMS, email, and push delivery",
    rows: [
      {
        id: "int-twilio",
        name: "Twilio Messaging",
        vendor: "Twilio",
        slug: "twilio",
        environment: "Production",
        health: "Connected",
        latency: "61ms",
        lastSync: "1 min ago",
        auth: "API key",
        webhook: "Active",
        region: "Global",
      },
      {
        id: "int-sendgrid",
        name: "SendGrid Transactional",
        vendor: "SendGrid",
        slug: "sendgrid",
        environment: "Production",
        health: "Degraded",
        latency: "210ms",
        lastSync: "12 min ago",
        auth: "API key",
        webhook: "Paused",
        region: "US",
      },
      {
        id: "int-fcm",
        name: "Firebase Cloud Messaging",
        vendor: "Google",
        slug: "firebase",
        environment: "Production",
        health: "Connected",
        latency: "48ms",
        lastSync: "3 min ago",
        auth: "OAuth 2.0",
        webhook: "None",
        region: "Global",
      },
    ],
  },
  {
    id: "identity",
    category: "Identity & webhooks",
    subtitle: "Admin SSO and inbound event endpoints",
    rows: [
      {
        id: "int-okta",
        name: "Okta Workforce SSO",
        vendor: "Okta",
        slug: "okta",
        environment: "Production",
        health: "Connected",
        latency: "95ms",
        lastSync: "6 min ago",
        auth: "OAuth 2.0",
        webhook: "None",
        region: "EU",
      },
      {
        id: "int-platform-hooks",
        name: "Platform webhook ingress",
        vendor: "Manisa Travel",
        slug: "webhooks",
        environment: "Production",
        health: "Connected",
        latency: "22ms",
        lastSync: "8 sec ago",
        auth: "Webhook secret",
        webhook: "Active",
        region: "Primary",
      },
    ],
  },
];

export const integrationSummary = {
  connected: integrationGroups.reduce(
    (acc, group) => acc + group.rows.filter((row) => row.health === "Connected").length,
    0,
  ),
  degraded: integrationGroups.reduce(
    (acc, group) => acc + group.rows.filter((row) => row.health === "Degraded").length,
    0,
  ),
  disconnected: integrationGroups.reduce(
    (acc, group) => acc + group.rows.filter((row) => row.health === "Disconnected").length,
    0,
  ),
  total: integrationGroups.reduce((acc, group) => acc + group.rows.length, 0),
  webhooksActive: integrationGroups.reduce(
    (acc, group) => acc + group.rows.filter((row) => row.webhook === "Active").length,
    0,
  ),
};
