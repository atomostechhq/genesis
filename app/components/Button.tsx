import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "submit" | "reset" | "button";
}

const buttonVariants = cva(
  "rounded-lg disabled:select-none font-semibold cursor-pointer transition-colors duration-300 ease-in-out",
  {
    variants: {
      variant: {
        filled:
          "bg-primary-600 text-white active:bg-primary-900 active:border-primary-900 hover:bg-primary-700 hover:border-primary-700 border border-primary-600 disabled:opacity-[30%] disabled:pointer-events-none",
        outlined:
          "border border-primary-600 bg-white disabled:opacity-[30%] disabled:pointer-events-none text-primary-600 hover:bg-primary-100 active:bg-primary-200 active:border-primary-700",
      },
      intent: {
        primary:
          "bg-primary-600 border-primary-600 active:bg-primary-900 active:border-primary-900 hover:bg-primary-700 hover:border-primary-700",
        success:
          "bg-success-600 border-success-600 active:bg-success-900 active:border-success-900 hover:bg-success-700 hover:border-success-700",
        error:
          "bg-error-700 border-error-700 active:bg-error-900 active:border-error-900 hover:bg-error-800 hover:border-error-800",
        warning:
          "bg-warning-600 border-warning-600 active:bg-warning-900 active:border-warning-900 hover:bg-warning-700 hover:border-warning-700",
        default:
          "bg-gray-600 border-gray-600 active:bg-gray-900 active:border-gray-900 hover:bg-gray-700 hover:border-gray-700",
        "primary-outlined":
          "border-primary-600 text-primary-600 hover:bg-primary-100 active:bg-primary-200 active:border-primary-700",
        "success-outlined":
          "border-success-600 text-success-600 hover:bg-success-50 hover:border-success-700 hover:text-success-700 active:bg-success-100 active:text-success-900 active:border-success-900",
        "error-outlined":
          "border-error-700 text-error-700 hover:bg-error-100 hover:border-error-700 hover:text-error-700 active:bg-error-200 active:text-error-700 active:border-error-800",
        "warning-outlined":
          "border-warning-500 text-warning-500 hover:bg-warning-50 hover:border-warning-600 hover:text-warning-600 active:bg-warning-100 active:text-warning-700 active:border-warning-700",
        "default-outlined":
          "border-gray-700 text-gray-700 hover:bg-gray-100 hover:border-gray-700 hover:text-gray-700 active:bg-gray-300 active:text-gray-800 active:border-gray-800",
      },
      size: {
        sm: "text-sm px-3.5 py-2",
        md: "text-sm px-4 py-2.5",
        lg: "text-base px-[18px] py-2.5",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "sm",
    },
  }
);

const Button = ({
  children,
  className,
  variant,
  intent,
  fullWidth = false,
  startIcon,
  disabled,
  endIcon,
  size,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      aria-disabled={disabled}
      className={cn(
        fullWidth && "w-full",
        buttonVariants({ intent, className, variant, size }),
        "flex items-center text-center justify-center gap-2"
      )}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;
