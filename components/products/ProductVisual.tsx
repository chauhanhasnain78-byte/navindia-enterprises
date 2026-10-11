"use client";

import React, { useState } from "react";
import { CategoryShapeType, companyConfig } from "@/config/company";
import { CategoryStaticIcon } from "@/components/cards/CategoryStaticIcon";

interface ProductVisualProps {
  productName: string;
  imagePath: string;
  shapeType: CategoryShapeType;
  /**
   * Swappable slot reserved for a 3D viewer in a later phase.
   * Defaults to flat 2D illustrative image or neutral gradient icon placeholder.
   */
  viewerSlot?: React.ReactNode;
}

export function ProductVisual({
  productName,
  imagePath,
  shapeType,
  viewerSlot,
}: ProductVisualProps) {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <div className="rounded-2xl border border-silver bg-white p-4 sm:p-6 shadow-card">
      {/* Swappable 4:3 visual container (no layout shift) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-silver/60 bg-gradient-to-br from-[#10233E] via-[#1B3354] to-[#2B476E] flex items-center justify-center">
        {viewerSlot ? (
          viewerSlot
        ) : !imageMissing ? (
          <img
            src={imagePath}
            alt={productName}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            onError={() => setImageMissing(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="rounded-2xl bg-white/95 p-5 shadow-md">
              <CategoryStaticIcon
                shapeType={shapeType}
                className="h-20 w-20 sm:h-24 sm:w-24"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-steel-light/80">
              {productName}
            </span>
          </div>
        )}
      </div>

      {/* Mandatory illustrative image label */}
      <p className="mt-3 text-center text-xs text-steel">
        {companyConfig.trust.illustrativeImageNotice}
      </p>
    </div>
  );
}
