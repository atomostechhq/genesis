import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

// Variants for the Chip component
const chipVariants = cva(
  "rounded-full capitalize flex items-center w-fit gap-2",
  {
    variants: {
      intent: {
        default: "bg-gray-50 text-gray-600",
        success: "bg-success-50 text-success-600",
        warning: "bg-warning-50 text-warning-500",
        error: "bg-error-50 text-error-600",
        primary: "bg-primary-100 text-primary-700",
        bluegray: "bg-bluegray-100 text-bluegray-500",
        bluelight: "bg-bluelight-100 text-bluelight-600",
        violet: "bg-violet-50 text-violet-700",
        indigo: "bg-indigo-100 text-indigo-700",
        purple: "bg-purple-50 text-purple-700",
        pink: "bg-pink-25 text-pink-700",
        rose: "bg-rose-50 text-rose-600",
        orange: "bg-orange-50 text-orange-600",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  }
);

const dotColorVariants: Record<string, string> = {
  default: "bg-gray-600",
  success: "bg-success-600",
  warning: "bg-warning-600",
  error: "bg-error-600",
  primary: "bg-primary-600",
  bluegray: "bg-bluegray-500",
  bluelight: "bg-bluelight-600",
  violet: "bg-violet-700",
  indigo: "bg-indigo-700",
  purple: "bg-purple-700",
  pink: "bg-pink-700",
  rose: "bg-rose-600",
  orange: "bg-orange-600",
};

// Props for the Chip component
interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  children: ReactNode;
  dot?: boolean;
  dotColor?: string;
}

// Chip component
const Chip = ({
  children,
  className,
  size,
  intent = "default",
  dot,
  dotColor,
}: ChipProps) => {
  const resolvedIntent = intent ?? "default"; // Handle null intent

  return (
    <div className={cn(chipVariants({ intent: resolvedIntent, size }), className)}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            dotColor || dotColorVariants[resolvedIntent] || "bg-primary-600" // Default fallback
          )}
        ></span>
      )}
      <span>{children}</span>
    </div>
  );
};

export default Chip;
