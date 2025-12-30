import { cva, VariantProps } from "class-variance-authority";
import React, { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

const labelVariants = cva("flex item-start", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Label = ({
  children,
  htmlFor,
  size,
  required,
  disabled,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "cursor-pointer",
        labelVariants({ className, size }),
        disabled === true
          ? "opacity-30 select-none pointer-events-none"
          : "opacity-100"
      )}
      aria-disabled={disabled}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {required && (
          <span
            aria-label="required field"
            role="presentation"
            className="text-red-500"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </span>
    </label>
  );
};

export default Label;
