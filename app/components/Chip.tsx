import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  children: ReactNode;
}

const chipVariants = cva("rounded-full capitalize flex items-center gap-2", {
  variants: {
    intent: {
      default: "bg-gray-50 text-gray-600",
      success: "bg-success-50 text-success-600",
      warning: "bg-warning-50 text-warning-500",
      error: "bg-error-50 text-error-600",
      primary: "bg-primary-50 text-primary-500",
    },
    size: {
      sm: "text-xs px-2 py-[2px]",
      md: "text-sm px-[10px] py-[2px]",
      lg: "text-sm px-[12px] py-1",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
  },
});

const Chip = ({ children, className, size, intent }: ChipProps) => {
  return (
    <div className={cn(chipVariants({ intent, className, size }), "")}>
      <span className={cn("w-[6px] rounded-full h-[6px]", intent === "default" ? "bg-gray-600" : intent === "success" ? "bg-success-600" : intent === "warning" ? "bg-warning-600" : intent === "error"? "bg-error-600": "bg-primary-600")}></span>
      <span>
      {children}
      </span>
    </div>
  );
};

export default Chip;
