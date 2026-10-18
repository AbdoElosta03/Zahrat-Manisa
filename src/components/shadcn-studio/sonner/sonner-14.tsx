"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { sonnerOutlineSuccessStyle } from "@/lib/sonner-outline-styles";

const OutlineSuccessSonnerDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Action completed successfully!", { style: sonnerOutlineSuccessStyle })}
    >
      Outline Success Toast
    </Button>
  );
};

export default OutlineSuccessSonnerDemo;
