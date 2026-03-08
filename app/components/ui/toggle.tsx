import * as React from "react";
import { cn } from "./utils";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    className, 
    pressed, 
    onPressedChange, 
    variant = "default", 
    size = "default",
    onClick,
    ...props 
  }, ref) => {
    const [internalPressed, setInternalPressed] = React.useState(false);
    const isPressed = pressed ?? internalPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !isPressed;
      if (pressed === undefined) {
        setInternalPressed(newPressed);
      }
      onPressedChange?.(newPressed);
      onClick?.(e);
    };

    const variants = {
      default: isPressed
        ? "bg-gray-200 text-gray-900"
        : "bg-transparent hover:bg-gray-100 hover:text-gray-900",
      outline: isPressed
        ? "border-gray-300 bg-gray-100"
        : "border-gray-200 hover:bg-gray-100 hover:text-gray-900",
    };

    const sizes = {
      default: "h-10 px-3",
      sm: "h-9 px-2.5",
      lg: "h-11 px-5",
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Toggle.displayName = "Toggle";

export { Toggle };
