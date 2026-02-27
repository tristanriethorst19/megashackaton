import { type HTMLAttributes } from "react";

type Variant = "primary" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  primary: "badge-primary",
  neutral: "badge-neutral",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={`badge ${variantClass[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
