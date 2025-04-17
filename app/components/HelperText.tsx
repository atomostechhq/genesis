import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";

interface HelperTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: "sm" | "lg";
  error?: boolean;
}

const HelperText = ({ children, className, size, error }: HelperTextProps) => {
  return (
    <span
      className={cn(
        "text-gray-500",
        error && "text-error-500",
        className,
        size === "sm" ? "text-xs" : "text-sm"
      )}
    >
      {children}
    </span>
  );
};

export default HelperText;
