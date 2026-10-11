"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { prefersReducedMotion } = useIntroMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
