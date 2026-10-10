import React from "react";
import { WorkStep } from "@/config/company";

interface StepCardProps {
  step: WorkStep;
  index: number;
  totalSteps: number;
}

export function StepCard({ step, index, totalSteps }: StepCardProps) {
  return (
    <div className="relative flex flex-col justify-between rounded-xl border border-silver bg-white p-6 shadow-card transition-all duration-200 hover:border-navy/40">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-sm font-extrabold tracking-wider text-amber-accent">
            {step.stepNumber}
          </span>
          {index < totalSteps - 1 && (
            <span
              className="hidden lg:inline-block text-xs font-semibold uppercase tracking-widest text-silver"
              aria-hidden="true"
            >
              Step {index + 1} of {totalSteps}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold tracking-tight text-navy">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-steel">
          {step.description}
        </p>
      </div>
      <div className="mt-5 h-1 w-10 rounded-full bg-amber-accent/80" aria-hidden="true" />
    </div>
  );
}
