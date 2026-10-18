import type { Metadata } from "next";

import { MyProfileWorkspace } from "./_components/my-profile-workspace";

export const metadata: Metadata = {
  title: "My profile",
  description: "Your account profile and security settings.",
};

export default function ProfilePage() {
  return <MyProfileWorkspace />;
}
