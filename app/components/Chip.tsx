import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  children: ReactNode;
}

// interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   children: ReactNode;
// }

const chipVariants = cva("rounded-full w-fit", {
  variants: {
    intent: {
      // default: "bg-gray-50 text-purple-600",
      // success: "bg-success-50 text-success-600",
      // warning: "bg-warning-50 text-blue-500",
      // error: "bg-error-50 text-error-600",
      // primary: "bg-primary-50 text-primary-500",
      default: "bg-gray-50 ",
      success: "bg-success-50 ",
      warning: "bg-warning-50",
      error: "bg-error-50",
      primary: "bg-primary-50 ",
    },
    size: {
      sm: "text-text-xs px-2 py-[2px]",
      md: "text-text-sm px-[10px] py-[2px]",
      lg: "text-text-sm px-[12px] py-1",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
  },
});

const Chip = ({ children, className, size, intent, ...props }: ChipProps) => {
  return (
    <div style={{color: "blue"}} {...props} className={cn(chipVariants({ intent, className, size }))}>
      {children}
    </div>
  );
};

export default Chip;
