import type { Metadata } from "next";
import { Suspense } from "react";

import { AccessSkeleton } from "../_components/access/access-skeleton";

import { UsersWorkspace } from "./_components/users-workspace";

export const metadata: Metadata = {
  title: "Users | Manisa Travel Admin",
  description: "Manage workspace users and their access.",
  alternates: {
    canonical: "/dashboard/users",
  },
};

export default function Page() {
  return <Suspense fallback={<AccessSkeleton />}>
    <UsersWorkspace />
    </Suspense>;
}
