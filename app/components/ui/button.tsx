import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline: "border-2 border-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white",
      secondary: "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]",
      ghost: "hover:bg-gray-100",
      link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-xl px-3",
      lg: "h-11 rounded-2xl px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
