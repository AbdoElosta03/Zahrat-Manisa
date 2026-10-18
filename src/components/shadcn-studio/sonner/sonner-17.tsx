"use client";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";

const SolidInfoSonnerDemo = () => {
  return (
    <Button variant="outline" onClick={() => notify.info("This is for your information, please note.")}>
      Solid Info Toast
    </Button>
  );
};

export default SolidInfoSonnerDemo;
