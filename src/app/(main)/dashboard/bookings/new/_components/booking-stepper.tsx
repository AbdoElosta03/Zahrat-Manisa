"use client";

import { Check } from "lucide-react";

import { Progress } from "@/components/ui/progress";

import { STEPS } from "./types";

export function BookingStepper({
  currentIndex,
  maxReachedIndex,
  onStepClick,
}: {
  currentIndex: number;
  maxReachedIndex: number;
  onStepClick: (index: number) => void;
}) {
  return (
    <div>
      <div className="hidden items-center sm:flex">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isClickable = index <= maxReachedIndex && index !== STEPS.length - 1;

          return (
            <div key={step.key} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick(index)}
                className="flex items-center gap-2 disabled:cursor-default"
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    isComplete
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-primary/10 text-primary ring-2 ring-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isComplete ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    isCurrent ? "text-foreground" : isComplete ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {index < STEPS.length - 1 ? (
                <div className={`mx-3 h-px flex-1 ${isComplete ? "bg-primary" : "bg-border"}`} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 sm:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Step {currentIndex + 1} of {STEPS.length}
          </span>
          <span className="font-medium">{STEPS[currentIndex]?.label}</span>
        </div>
        <Progress value={((currentIndex + 1) / STEPS.length) * 100} />
      </div>
    </div>
  );
}
