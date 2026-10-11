"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WorkStep } from "@/config/company";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

interface StepCardProps {
  step: WorkStep;
  index: number;
  totalSteps: number;
}

export function StepCard({ step, index, totalSteps }: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useIntroMotion();
  const isInView = useInView(ref, {
    once: true,
    margin: "-15% 0px -15% 0px",
  });

  const isLit = prefersReducedMotion || isInView;

  return (
    <motion.div
      ref={ref}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
      className="relative flex h-full flex-col justify-between rounded-xl border border-silver bg-white p-6 shadow-card overflow-hidden"
    >
      {/* Active light-up border glow overlay (opacity only) */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLit ? 1 : 0 }}
        transition={{
          duration: 0.45,
          delay: prefersReducedMotion ? 0 : index * 0.1,
          ease: "easeOut",
        }}
        style={{ willChange: "opacity" }}
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-amber-accent/55"
      />

      {/* Top progressive amber light-up bar (scaleX transform only) */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        animate={{ scaleX: isLit ? 1 : 0 }}
        transition={{
          duration: 0.5,
          delay: prefersReducedMotion ? 0 : index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ willChange: "transform" }}
        className="pointer-events-none absolute left-0 right-0 top-0 h-1 origin-left bg-amber-accent"
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <motion.span
            initial={
              prefersReducedMotion
                ? { scale: 1, opacity: 1 }
                : { scale: 0.88, opacity: 0.65 }
            }
            animate={
              isLit
                ? { scale: 1, opacity: 1 }
                : { scale: 0.88, opacity: 0.65 }
            }
            transition={{
              duration: 0.4,
              delay: prefersReducedMotion ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform, opacity" }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-sm font-extrabold tracking-wider text-amber-accent shadow-sm"
          >
            {step.stepNumber}
          </motion.span>
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

      <motion.div
        initial={{ scaleX: prefersReducedMotion ? 1 : 0.4, opacity: 0.5 }}
        animate={
          isLit
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0.4, opacity: 0.5 }
        }
        transition={{
          duration: 0.45,
          delay: prefersReducedMotion ? 0 : index * 0.12,
          ease: "easeOut",
        }}
        style={{ willChange: "transform, opacity" }}
        className="relative z-10 mt-5 h-1 w-10 origin-left rounded-full bg-amber-accent/90"
        aria-hidden="true"
      />
    </motion.div>
  );
}
