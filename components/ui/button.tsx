import { ButtonHTMLAttributes } from "react";

// 3. Type definitions
export type ButtonVariant = "dark" | "secondary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  dark: "bg-text-primary text-white hover:opacity-90",
  secondary:
    "bg-surface border border-border text-text-primary hover:bg-surface-secondary",
};

export function buttonVariants(variant: ButtonVariant = "dark") {
  return `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${variantClasses[variant]}`;
}

// 4. Component
export function Button({ variant = "dark", className = "", ...props }: Props) {
  return (
    <button className={`${buttonVariants(variant)} ${className}`} {...props} />
  );
}
