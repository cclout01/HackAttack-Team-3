import * as React from "react";
import { MinusIcon } from "lucide-react";
import { cn } from "./utils";

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, maxLength = 6, value = "", onChange, ...props }, ref) => {
    const [otp, setOtp] = React.useState(value);

    const handleChange = (index: number, digit: string) => {
      const newOtp = otp.split("");
      newOtp[index] = digit.slice(-1);
      const newValue = newOtp.join("");
      setOtp(newValue);
      onChange?.(newValue);
    };

    return (
      <div ref={ref} className={cn("flex gap-2", className)}>
        {Array.from({ length: maxLength }).map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="h-10 w-10 text-center rounded-xl border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            {...props}
          />
        ))}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex gap-2", className)}>{children}</div>
);

const InputOTPSlot = ({ index, className }: { index: number; className?: string }) => (
  <div className={cn("h-10 w-10 rounded-xl border border-gray-300", className)} />
);

const InputOTPSeparator = () => (
  <div className="flex items-center justify-center">
    <MinusIcon className="h-4 w-4 text-gray-400" />
  </div>
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
