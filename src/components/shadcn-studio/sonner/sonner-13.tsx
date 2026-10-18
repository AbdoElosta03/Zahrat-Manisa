"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { sonnerOutlineInfoStyle } from "@/lib/sonner-outline-styles";

const OutlineInfoSonnerDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.info("This is for your information, please note.", { style: sonnerOutlineInfoStyle })}
    >
      Outline Info Toast
    </Button>
  );
};

export default OutlineInfoSonnerDemo;
