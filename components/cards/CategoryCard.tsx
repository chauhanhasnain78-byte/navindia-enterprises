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
  const [isHovered, setIsHovered] = useState(false);
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
        rootMargin: "80px",
        threshold: 0.1,
      }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [enable3D]);

  const show3D = enable3D && webglAvailable && (isInViewport || isHovered);

  const staticFallback = (
    <div className="flex h-full w-full items-center justify-center pointer-events-none">
      <CategoryStaticIcon
        shapeType={category.shapeType}
        className="h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
      className="h-full w-full"
    >
      <Link
        href={`/products/${category.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full w-full flex-col justify-between rounded-xl border border-silver bg-white p-3.5 sm:p-6 shadow-card transition-colors duration-300 hover:border-amber-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent overflow-hidden"
      >
        {/* Soft border glow overlay on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-amber-accent/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10">
          {/* Visual Preview Container */}
          <div className="relative mb-3.5 sm:mb-5 flex h-28 sm:h-36 w-full items-center justify-center overflow-hidden rounded-lg bg-steel-light/65 border border-silver/50 pointer-events-none">
            {show3D ? (
              <CanvasErrorBoundary fallback={staticFallback}>
                <Category3DScene
                  shapeType={category.shapeType}
                  modelPath={category.modelPath}
                  isHovered={isHovered}
                />
              </CanvasErrorBoundary>
            ) : (
              staticFallback
            )}
            <span className="pointer-events-none absolute right-2 top-2 rounded bg-white/85 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-steel border border-silver/60">
              Spec-Based
            </span>
          </div>

          {/* Category Title */}
          <h3 className="text-sm sm:text-lg font-bold tracking-tight text-navy group-hover:text-navy-dark leading-snug">
            {category.name}
          </h3>

          {/* Neutral One-Line Description */}
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-steel">
            {category.description}
          </p>
        </div>

        {/* Bottom Link Indicator */}
        <div className="relative z-10 mt-3.5 sm:mt-5 flex items-center justify-between border-t border-silver/50 pt-2.5 sm:pt-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-navy">
          <span>View Category</span>
          <span
            className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-steel-light text-navy transition-transform transition-colors duration-200 group-hover:translate-x-0.5 group-hover:bg-amber-accent group-hover:text-navy-dark"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
