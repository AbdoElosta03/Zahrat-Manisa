"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { sonnerOutlineWarningStyle } from "@/lib/sonner-outline-styles";

const OutlineWarningSonnerDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.warning("Warning: Please check the entered data.", { style: sonnerOutlineWarningStyle })}
    >
      Outline Warning Toast
    </Button>
  );
};

export default OutlineWarningSonnerDemo;
