import { cva, VariantProps } from "class-variance-authority";
import React, { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  htmlFor?: string;
  children: ReactNode;
}

const labelVariants = cva("", {
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
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(labelVariants({ className, size }))}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
