import { cva, VariantProps } from "class-variance-authority";
import React, { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  disabled?:boolean;
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
      className={cn(labelVariants({ className, size }),disabled === true ? "opacity-30":"opacity-100")}
      {...props}
    >
      {children}
      <span className={cn(required === true ? "block text-red-500":"hidden")}>*</span>
    </label>
  );
};

export default Label;
