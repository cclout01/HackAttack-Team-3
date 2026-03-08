import * as React from "react";

// Simple wrapper for charts - you would use this with recharts or other chart library
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const ChartTooltipContent = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const ChartLegend = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const ChartLegendContent = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };
