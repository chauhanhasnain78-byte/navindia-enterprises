import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl";
  const titleColor = theme === "dark" ? "text-white" : "text-navy";
  const subtitleColor =
    theme === "dark" ? "text-steel-light/85" : "text-steel";

  return (
    <div className={`${alignClasses} ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] mb-3 ${
            theme === "dark" ? "text-amber-accent" : "text-navy"
          }`}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber-accent"
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${subtitleColor}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
