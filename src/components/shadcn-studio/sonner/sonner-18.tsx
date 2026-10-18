"use client";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";

const SolidSuccessSonnerDemo = () => {
  return (
    <Button variant="outline" onClick={() => notify.success("Action completed successfully!")}>
      Solid Success Toast
    </Button>
  );
};

export default SolidSuccessSonnerDemo;
