import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariant> {
  size?: "sm" | "lg" | "xl";
  disabled?: boolean;
  checked?: boolean;
  children?: never;
}

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

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ disabled, checked, size, className, children, id, ...props }, ref) => {
    return (
      <div className="inline-flex relative items-center">
        <input
          type="checkbox"
          ref={ref}
          id={id}
          aria-checked={checked}
          role="checkbox"
          {...props}
          disabled={disabled}
          checked={checked}
          className={cn(
            checkboxVariant({ className, size })
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
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
