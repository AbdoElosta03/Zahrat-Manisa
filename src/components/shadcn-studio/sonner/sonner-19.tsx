"use client";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";

const SolidWarningSonnerDemo = () => {
  return (
    <Button variant="outline" onClick={() => notify.warning("Warning: Please check the entered data.")}>
      Solid Warning Toast
    </Button>
  );
};

export default SolidWarningSonnerDemo;
