import type { Metadata } from "next";
import { Suspense } from "react";

import { AccessSkeleton } from "../_components/access/access-skeleton";

import { RolesWorkspace } from "./_components/roles-workspace";

export const metadata: Metadata = {
  title: "Roles & Permissions | Manisa Travel Admin",
  description: "Manage workspace roles and access permissions.",
  alternates: { canonical: "/dashboard/roles-permissions" },
};

export default function Page() {
  return <Suspense fallback={<AccessSkeleton kind="roles" />}><RolesWorkspace /></Suspense>;
}
