"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { companyConfig } from "@/config/company";
import {
  BrandMarkVisual,
  useIntroMotion,
} from "@/components/motion/IntroMotionProvider";

interface LogoProps {
  theme?: "light" | "dark";
  location?: "header" | "footer";
  className?: string;
}

export function Logo({
  theme = "dark",
  location = "footer",
  className = "",
}: LogoProps) {
  const { introPhase, prefersReducedMotion, hasLogoImage } = useIntroMotion();
  const textColor = theme === "dark" ? "text-white" : "text-navy";

  if (location === "header") {
    const isFlyingAtCenter =
      !prefersReducedMotion &&
      (introPhase === "fade-in" || introPhase === "spin");

    const showWordmark =
      prefersReducedMotion ||
      introPhase === "wordmark" ||
      introPhase === "complete";

    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent rounded ${className}`}
        aria-label={companyConfig.name}
      >
        {/* Logo Mark target slot */}
        <span className="relative inline-flex items-center justify-center min-w-[2rem] min-h-[2rem]">
          {!isFlyingAtCenter ? (
            <motion.span
              layoutId={
                prefersReducedMotion ? undefined : "nie-brand-logo-shared"
              }
              transition={{
                layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{ willChange: "transform, opacity" }}
              className="inline-flex items-center justify-center"
            >
              <BrandMarkVisual hasLogoImage={hasLogoImage} size="header" />
            </motion.span>
          ) : (
            <span className="opacity-0 pointer-events-none inline-flex items-center justify-center">
              <BrandMarkVisual hasLogoImage={hasLogoImage} size="header" />
            </span>
          )}
        </span>

        {/* Slide/clip reveal of "NAV INDIA ENTERPRISES" to the right of the logo */}
        <span className="overflow-hidden inline-flex items-center py-0.5">
          <motion.span
            initial={
              prefersReducedMotion
                ? { opacity: 1, x: "0%" }
                : { opacity: 0, x: "-102%" }
            }
            animate={
              showWordmark
                ? { opacity: 1, x: "0%" }
                : { opacity: 0, x: "-102%" }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: "transform, opacity" }}
            className={`font-extrabold tracking-tight text-sm sm:text-base md:text-lg leading-none whitespace-nowrap ${textColor}`}
          >
            {companyConfig.name}
          </motion.span>
        </span>
      </Link>
    );
  }

  // Footer / standard logo
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent rounded ${className}`}
      aria-label={companyConfig.name}
    >
      <BrandMarkVisual hasLogoImage={hasLogoImage} size="header" />
      <span
        className={`font-extrabold tracking-tight text-sm sm:text-base md:text-lg leading-none ${textColor}`}
      >
        {companyConfig.name}
      </span>
    </Link>
  );
}
