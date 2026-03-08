import * as React from "react";
import { cn } from "./utils";

// Simple toast notification component (simplified version)
export const Toaster = () => {
  return null; // This would normally render a toast container
};

export const toast = {
  success: (message: string) => {
    console.log("Success:", message);
  },
  error: (message: string) => {
    console.error("Error:", message);
  },
  info: (message: string) => {
    console.info("Info:", message);
  },
  warning: (message: string) => {
    console.warn("Warning:", message);
  },
};
