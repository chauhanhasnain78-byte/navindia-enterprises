"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIntroMotion } from "@/components/motion/IntroMotionProvider";

type ButtonVariant = "primary" | "outline" | "outline-dark";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  /** Optional calm, slow glow for the primary hero CTA */
  ambientGlow?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface ActionButtonProps
  extends BaseButtonProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "children" | "className"
    > {
  href?: undefined;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    fullWidth = false,
    ariaLabel,
    ambientGlow = false,
  } = props;

  const { prefersReducedMotion } = useIntroMotion();

  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold tracking-tight rounded-md transition-transform transition-opacity duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent focus-visible:ring-offset-2 select-none will-change-transform";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "min-h-[40px] px-4 py-2 text-sm gap-2",
    md: "min-h-[46px] px-5 py-2.5 text-sm sm:text-base gap-2",
    lg: "min-h-[52px] px-7 py-3.5 text-base gap-2.5",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-amber-accent text-navy-dark hover:bg-[#ff9f1a] hover:shadow-md border border-transparent",
    outline:
      "bg-transparent text-white border border-silver/60 hover:border-white hover:bg-white/10",
    "outline-dark":
      "bg-transparent text-navy border border-silver hover:border-navy hover:bg-steel-light/70",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  const innerContent = (
    <>
      {ambientGlow && variant === "primary" && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0.22, scale: 1 }}
          animate={{ opacity: [0.2, 0.52, 0.2], scale: [1, 1.03, 1] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
          className="pointer-events-none absolute -inset-1 rounded-lg bg-amber-accent blur-md -z-10"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, onClick } = props;
    if (
      external ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return (
        <a
          href={href}
          target={
            external || href.startsWith("http") ? "_blank" : undefined
          }
          rel={
            external || href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          className={combinedClassName}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedClassName}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {innerContent}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    fullWidth: _fw,
    ariaLabel: _al,
    ambientGlow: _ag,
    ...buttonProps
  } = props as ActionButtonProps;

  return (
    <button
      type={buttonProps.type || "button"}
      className={combinedClassName}
      aria-label={ariaLabel}
      {...buttonProps}
    >
      {innerContent}
    </button>
  );
}
