import type { Metadata } from "next";

import SolidInfoSonnerDemo from "@/components/shadcn-studio/sonner/sonner-17";
import SolidSuccessSonnerDemo from "@/components/shadcn-studio/sonner/sonner-18";
import SolidWarningSonnerDemo from "@/components/shadcn-studio/sonner/sonner-19";
import SolidDestructiveSonnerDemo from "@/components/shadcn-studio/sonner/sonner-20";
import { APP_CONFIG } from "@/config/app-config";

export const metadata: Metadata = {
  title: "Toast previews",
  description: `Solid toast styles (${APP_CONFIG.name}).`,
  robots: { index: false, follow: false },
};

export default function SonnerSolidPreviewPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-lg font-semibold">Solid toasts (sonner 17–20)</h1>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <SolidInfoSonnerDemo />
        <SolidSuccessSonnerDemo />
        <SolidWarningSonnerDemo />
        <SolidDestructiveSonnerDemo />
      </div>
    </main>
  );
}
