import type { Metadata } from "next";

import { MyProfileDetails } from "./_components/my-profile-details";

export const metadata: Metadata = {
  title: "My profile",
  description: "Your account profile and access details.",
};

export default function ProfilePage() {
  return <MyProfileDetails />;
}
