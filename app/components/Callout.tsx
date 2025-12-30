import { cva, type VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { cn } from "../utils/utils";

// const calloutVariants = cva("py-3 px-4 font-medium rounded-md", {
//   variants: {
//     variant: {
//       filled: "bg-primary-50 text-primary-600",
//       outlined: "border bg-transparent border-primary-200 text-primary-600",
//     },
//     intent: {
//       primary: "bg-primary-50 text-primary-600",
//       warning: "bg-warning-50 text-warning-600",
//       error: "bg-error-50 text-error-600",
//       success: "bg-success-50 text-success-600",
//       default: "bg-gray-50 text-gray-600",
//       "primary-outlined": "border-primary-200 text-primary-600",
//       "warning-outlined": "border-warning-200 text-warning-600",
//       "error-outlined": "border-error-200 text-error-600",
//       "success-outlined": "border-success-200 text-success-600",
//       "default-outlined": "border-gray-300 text-gray-600",
//     },
//     size: {
//       xs: "text-xs",
//       sm: "text-sm",
//       md: "text-base",
//       lg: "text-lg",
//     },
//   },
//   defaultVariants: {
//     variant: "filled",
//     intent: "primary",
//     size: "sm",
//   },
// });

const calloutVariants = cva("py-3 px-4 font-medium rounded-md", {
  variants: {
    variant: {
      filled: "",
      outlined: "border",
    },
    intent: {
      primary: "",
      warning: "",
      error: "",
      success: "",
      default: "",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      intent: "primary",
      className: "bg-primary-50 text-primary-600",
    },
    {
      variant: "outlined",
      intent: "primary",
      className: "border-primary-200 text-primary-600 bg-transparent",
    },

    {
      variant: "filled",
      intent: "warning",
      className: "bg-warning-50 text-warning-600",
    },
    {
      variant: "outlined",
      intent: "warning",
      className: "border-warning-200 text-warning-600 bg-transparent",
    },

    {
      variant: "filled",
      intent: "error",
      className: "bg-error-50 text-error-600",
    },
    {
      variant: "outlined",
      intent: "error",
      className: "border-error-200 text-error-600 bg-transparent",
    },

    {
      variant: "filled",
      intent: "success",
      className: "bg-success-50 text-success-600",
    },
    {
      variant: "outlined",
      intent: "success",
      className: "border-success-200 text-success-600 bg-transparent",
    },

    {
      variant: "filled",
      intent: "default",
      className: "bg-gray-50 text-gray-600",
    },
    {
      variant: "outlined",
      intent: "default",
      className: "border-gray-300 text-gray-600 bg-transparent",
    },
  ],
  defaultVariants: {
    variant: "filled",
    intent: "primary",
    size: "sm",
  },
});

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  children: ReactNode;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  className?: string;
}

const Callout: React.FC<CalloutProps> = ({
  children,
  variant,
  intent,
  size,
  startIcon,
  endIcon,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        calloutVariants({ variant, intent, size }),
        "flex items-center justify-between gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {startIcon && <span>{startIcon}</span>}
        {children}
      </div>
      {endIcon && <span>{endIcon}</span>}
    </div>
  );
};

export default Callout;
