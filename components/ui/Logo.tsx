"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { companyConfig } from "@/config/company";

interface LogoProps {
  theme?: "light" | "dark";
  className?: string;
}

export function Logo({ theme = "dark", className = "" }: LogoProps) {
  const [hasLogoImage, setHasLogoImage] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const img = new window.Image();
    img.onload = () => {
      if (isMounted && img.naturalWidth > 0) {
        setHasLogoImage(true);
      }
    };
    img.onerror = () => {
      if (isMounted) {
        setHasLogoImage(false);
      }
    };
    img.src = companyConfig.logo.path;
    return () => {
      isMounted = false;
    };
  }, []);

  const textColor = theme === "dark" ? "text-white" : "text-navy";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent rounded ${className}`}
      aria-label={companyConfig.name}
    >
      {hasLogoImage ? (
        <img
          src={companyConfig.logo.path}
          alt={companyConfig.logo.alt}
          className="h-9 sm:h-10 w-auto object-contain"
          onError={() => setHasLogoImage(false)}
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-amber-accent text-navy-dark font-extrabold text-xs tracking-tighter"
            aria-hidden="true"
          >
            NIE
          </span>
          <span
            className={`font-extrabold tracking-tight text-sm sm:text-base md:text-lg leading-none ${textColor}`}
          >
            {companyConfig.name}
          </span>
        </div>
      )}
    </Link>
  );
}
