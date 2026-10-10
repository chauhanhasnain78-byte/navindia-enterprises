import React from "react";
import { BuyerFeature } from "@/config/company";

interface FeatureCardProps {
  feature: BuyerFeature;
}

function FeatureIcon({ iconName }: { iconName: BuyerFeature["iconName"] }) {
  switch (iconName) {
    case "capability":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-amber-accent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "consolidation":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-amber-accent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "documentation":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-amber-accent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="14" y2="17" />
        </svg>
      );
    case "gulf":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-amber-accent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-silver bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-card-hover">
      <div>
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy">
          <FeatureIcon iconName={feature.iconName} />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-navy leading-snug">
          {feature.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-steel">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
