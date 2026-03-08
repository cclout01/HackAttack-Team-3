import * as React from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "./utils";

const Menubar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-10 items-center space-x-1 rounded-2xl border bg-white p-1", className)}
      {...props}
    />
  )
);
Menubar.displayName = "Menubar";

const MenubarMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">{children}</div>
);

const MenubarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-xl px-3 py-1.5 text-sm font-medium outline-none hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      {...props}
    />
  )
);
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[12rem] overflow-hidden rounded-2xl border bg-white p-1 text-gray-900 shadow-md",
        className
      )}
      {...props}
    />
  )
);
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);
MenubarItem.displayName = "MenubarItem";

const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { checked?: boolean }
>(({ className, children, checked, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-xl py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <CheckIcon className="h-4 w-4" />}
    </span>
    {children}
  </div>
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

const MenubarRadioItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <CircleIcon className="h-2 w-2 fill-current" />
      </span>
      {children}
    </div>
  )
);
MenubarRadioItem.displayName = "MenubarRadioItem";

const MenubarLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  )
);
MenubarLabel.displayName = "MenubarLabel";

const MenubarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-200", className)} {...props} />
  )
);
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest text-gray-500", className)} {...props} />
);
MenubarShortcut.displayName = "MenubarShortcut";

const MenubarGroup = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;
const MenubarPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const MenubarSub = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const MenubarRadioGroup = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;

const MenubarSubContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-2xl border bg-white p-1 shadow-md",
        className
      )}
      {...props}
    />
  )
);
MenubarSubContent.displayName = "MenubarSubContent";

const MenubarSubTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none hover:bg-gray-100",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </div>
  )
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
};
