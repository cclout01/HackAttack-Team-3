import * as React from "react";
import { cn } from "./utils";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, name, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, name }}>
        <div ref={ref} role="radiogroup" className={cn("grid gap-2", className)} {...props} />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value: itemValue, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const checked = context.value === itemValue;

    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="radio"
          className="peer sr-only"
          checked={checked}
          value={itemValue}
          name={context.name}
          onChange={() => context.onValueChange?.(itemValue)}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 rounded-full border-2 border-gray-300 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-2 peer-checked:border-[var(--color-primary)] peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
        >
          {checked && (
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" />
          )}
        </div>
      </div>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
