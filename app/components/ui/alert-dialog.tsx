import * as React from "react";
import { cn } from "./utils";

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const AlertDialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

const AlertDialog = ({ open = false, onOpenChange = () => {}, children }: AlertDialogProps) => {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
  const handleClick = () => onOpenChange(true);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick } as any);
  }

  return <button onClick={handleClick}>{children}</button>;
};

const AlertDialogPortal = ({ children }: { children: React.ReactNode }) => {
  const { open } = React.useContext(AlertDialogContext);
  
  if (!open) return null;
  
  return <>{children}</>;
};

const AlertDialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)}
      {...props}
    />
  )
);
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={ref}
            className={cn(
              "relative z-50 w-full max-w-lg rounded-3xl border bg-white p-6 shadow-lg",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </AlertDialogPortal>
    );
  }
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props} />
  )
);
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = React.useContext(AlertDialogContext);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(false);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-2xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = React.useContext(AlertDialogContext);
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(false);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-2xl border-2 border-gray-300 bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
