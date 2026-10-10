import React from "react";
import { CategoryShapeType } from "@/config/company";

interface CategoryStaticIconProps {
  shapeType: CategoryShapeType;
  className?: string;
}

export function CategoryStaticIcon({
  shapeType,
  className = "w-20 h-20",
}: CategoryStaticIconProps) {
  switch (shapeType) {
    case "hose":
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Coiled industrial hose illustration */}
          <circle
            cx="40"
            cy="40"
            r="26"
            stroke="#0B1F3A"
            strokeWidth="5"
            strokeDasharray="130 20"
          />
          <circle
            cx="40"
            cy="40"
            r="18"
            stroke="#5B6B7C"
            strokeWidth="4.5"
          />
          <circle
            cx="40"
            cy="40"
            r="10"
            stroke="#0B1F3A"
            strokeWidth="4"
          />
          {/* Coupling end */}
          <rect
            x="58"
            y="18"
            width="10"
            height="14"
            rx="2"
            fill="#F5A524"
            stroke="#0B1F3A"
            strokeWidth="2"
          />
          <line
            x1="58"
            y1="23"
            x2="68"
            y2="23"
            stroke="#0B1F3A"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "fastener":
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Hex bolt head + threaded shaft */}
          <polygon
            points="24,18 56,18 62,28 18,28"
            fill="#0B1F3A"
            stroke="#0B1F3A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect
            x="31"
            y="28"
            width="18"
            height="36"
            rx="2"
            fill="#E6EBF0"
            stroke="#0B1F3A"
            strokeWidth="2.5"
          />
          <line x1="31" y1="36" x2="49" y2="39" stroke="#5B6B7C" strokeWidth="2.2" />
          <line x1="31" y1="43" x2="49" y2="46" stroke="#5B6B7C" strokeWidth="2.2" />
          <line x1="31" y1="50" x2="49" y2="53" stroke="#5B6B7C" strokeWidth="2.2" />
          <line x1="31" y1="57" x2="49" y2="60" stroke="#5B6B7C" strokeWidth="2.2" />
          <rect
            x="26"
            y="40"
            width="28"
            height="9"
            rx="1.5"
            fill="#F5A524"
            stroke="#0B1F3A"
            strokeWidth="2"
          />
        </svg>
      );

    case "seal":
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Precision concentric O-rings / seals */}
          <circle
            cx="38"
            cy="40"
            r="24"
            stroke="#0B1F3A"
            strokeWidth="7"
          />
          <circle
            cx="38"
            cy="40"
            r="24"
            stroke="#5B6B7C"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle
            cx="48"
            cy="44"
            r="13"
            fill="#FFFFFF"
            stroke="#F5A524"
            strokeWidth="5"
          />
          <circle
            cx="48"
            cy="44"
            r="13"
            stroke="#0B1F3A"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "abrasive":
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Grinding / cutting wheel */}
          <circle
            cx="40"
            cy="40"
            r="26"
            fill="#E6EBF0"
            stroke="#0B1F3A"
            strokeWidth="3.5"
          />
          <circle
            cx="40"
            cy="40"
            r="20"
            stroke="#5B6B7C"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle
            cx="40"
            cy="40"
            r="11"
            fill="#F5A524"
            stroke="#0B1F3A"
            strokeWidth="2.5"
          />
          <circle
            cx="40"
            cy="40"
            r="4.5"
            fill="#FFFFFF"
            stroke="#0B1F3A"
            strokeWidth="2"
          />
        </svg>
      );

    case "lifting":
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Industrial D-shackle / lifting loop */}
          <path
            d="M26 48V32C26 22.0589 32.268 15 40 15C47.732 15 54 22.0589 54 32V48"
            stroke="#0B1F3A"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect
            x="20"
            y="46"
            width="40"
            height="8"
            rx="3"
            fill="#F5A524"
            stroke="#0B1F3A"
            strokeWidth="2.2"
          />
          <circle
            cx="24"
            cy="50"
            r="5"
            fill="#0B1F3A"
          />
          <circle
            cx="56"
            cy="50"
            r="5"
            fill="#0B1F3A"
          />
        </svg>
      );

    case "metal":
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Structural steel I-beam & flange profile */}
          <path
            d="M20 20H60V28H45V52H60V60H20V52H35V28H20V20Z"
            fill="#E6EBF0"
            stroke="#0B1F3A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect
            x="24"
            y="22.5"
            width="32"
            height="3"
            fill="#F5A524"
          />
        </svg>
      );

    case "general":
    default:
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* Modular industrial gear / hardware block */}
          <polygon
            points="40,14 62,27 62,53 40,66 18,53 18,27"
            fill="#E6EBF0"
            stroke="#0B1F3A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="40,26 52,33 52,47 40,54 28,47 28,33"
            fill="#F5A524"
            stroke="#0B1F3A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="40" r="5" fill="#0B1F3A" />
        </svg>
      );
  }
}
