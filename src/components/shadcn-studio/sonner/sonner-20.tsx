"use client";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";

const SolidDestructiveSonnerDemo = () => {
  return (
    <Button variant="outline" onClick={() => notify.error("Oops, there was an error processing your request.")}>
      Solid Destructive Toast
    </Button>
  );
};

export default SolidDestructiveSonnerDemo;
