import * as React from "react";
import { cn } from "./utils";

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string) => void;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | undefined>(undefined);

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ type = "single", value: controlledValue, defaultValue, onValueChange, className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (type === "multiple" ? [] : "")
    );
    const value = controlledValue ?? internalValue;

    const handleValueChange = (itemValue: string) => {
      let newValue: string | string[];

      if (type === "multiple") {
        const currentValues = Array.isArray(value) ? value : [];
        newValue = currentValues.includes(itemValue)
          ? currentValues.filter(v => v !== itemValue)
          : [...currentValues, itemValue];
      } else {
        newValue = value === itemValue ? "" : itemValue;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <ToggleGroupContext.Provider value={{ type, value, onValueChange: handleValueChange }}>
        <div ref={ref} role="group" className={cn("flex items-center gap-1", className)} {...props}>
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value: itemValue, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    if (!context) throw new Error("ToggleGroupItem must be used within ToggleGroup");

    const isPressed = Array.isArray(context.value)
      ? context.value.includes(itemValue)
      : context.value === itemValue;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isPressed ? "bg-gray-200 text-gray-900" : "bg-transparent",
          className
        )}
        onClick={() => context.onValueChange(itemValue)}
        {...props}
      />
    );
  }
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
