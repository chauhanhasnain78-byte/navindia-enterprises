"use client";

import React, { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCategory } from "@/config/company";
import { CategoryStaticIcon } from "./CategoryStaticIcon";

const Category3DScene = dynamic(() => import("./Category3DScene"), {
  ssr: false,
});

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function canUseLightweight3D(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

interface CategoryCardProps {
  category: ProductCategory;
  enable3D?: boolean;
}

export function CategoryCard({
  category,
  enable3D = true,
}: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    if (!enable3D) {
      setWebglAvailable(false);
      return;
    }
    setWebglAvailable(canUseLightweight3D());
  }, [enable3D]);

  useEffect(() => {
    if (!enable3D || !cardRef.current) return;
    const node = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      {
        rootMargin: "60px",
        threshold: 0.1,
      }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [enable3D]);

  const show3D =
    enable3D && webglAvailable && (isInViewport || isHoveredOrTouched);

  const staticFallback = (
    <div className="flex h-full w-full items-center justify-center pointer-events-none">
      <CategoryStaticIcon
        shapeType={category.shapeType}
        className="h-20 w-20 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
      className="h-full"
    >
      <Link
        href={`/products/${category.slug}`}
        onMouseEnter={() => setIsHoveredOrTouched(true)}
        onMouseLeave={() => setIsHoveredOrTouched(false)}
        className="group relative flex h-full flex-col justify-between rounded-xl border border-silver bg-white p-5 sm:p-6 shadow-card transition-colors duration-300 hover:border-amber-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent overflow-hidden touch-pan-x"
      >
        {/* Soft border glow overlay on hover (animates opacity only for 60fps) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-amber-accent/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10">
          {/* Visual Preview Container: [&_canvas]:!pointer-events-none & !touch-auto ensures R3F canvas never blocks mobile swiping */}
          <div className="relative mb-5 flex h-36 w-full items-center justify-center overflow-hidden rounded-lg bg-steel-light/65 border border-silver/50 pointer-events-none [&_canvas]:!pointer-events-none [&_canvas]:!touch-auto">
            {show3D ? (
              <CanvasErrorBoundary fallback={staticFallback}>
                <Category3DScene
                  shapeType={category.shapeType}
                  isHovered={isHoveredOrTouched}
                />
              </CanvasErrorBoundary>
            ) : (
              staticFallback
            )}
            <span className="pointer-events-none absolute right-2.5 top-2.5 rounded bg-white/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-steel border border-silver/60">
              Spec-Based
            </span>
          </div>

          {/* Category Title */}
          <h3 className="text-lg font-bold tracking-tight text-navy group-hover:text-navy-dark leading-snug">
            {category.name}
          </h3>

          {/* Neutral One-Line Description */}
          <p className="mt-2 text-sm leading-relaxed text-steel">
            {category.description}
          </p>
        </div>

        {/* Bottom Link Indicator */}
        <div className="relative z-10 mt-5 flex items-center justify-between border-t border-silver/50 pt-3.5 text-xs font-semibold uppercase tracking-wider text-navy">
          <span>View Category</span>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-steel-light text-navy transition-transform transition-colors duration-200 group-hover:translate-x-0.5 group-hover:bg-amber-accent group-hover:text-navy-dark"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
