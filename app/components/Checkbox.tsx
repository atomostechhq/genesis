import React, { forwardRef } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

const checkboxVariant = cva(
  "peer relative cursor-pointer appearance-none rounded-[4px] border border-gray-300 transition-all checked:border-primary-600 checked:bg-primary-50 hover:bg-primary-50 disabled:opacity-30 disabled:pointer-events-none",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        lg: "h-3.5 w-3.5",
        xl: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariant> {
  size?: "sm" | "lg" | "xl";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size, className, checked, ...props }, ref) => {
    return (
      <div className="inline-flex relative items-center">
        <input
          ref={ref}
          type="checkbox"
          {...(checked !== undefined ? { checked } : {})}
          {...props}
          className={cn(
            "peer",
            checkboxVariant({ size, className }),
            "focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          )}
        />
        <span
          aria-hidden="true"
          className="absolute text-primary-600 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2.5 h-2.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
