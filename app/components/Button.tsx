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
  "rounded-lg disabled:select-none font-semibold cursor-pointer transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
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
        blue: "bg-blue-600 border-blue-600 active:bg-blue-900 active:border-blue-900 hover:bg-blue-700 hover:border-blue-700",
        bluegray:
          "bg-bluegray-600 border-bluegray-600 active:bg-bluegray-900 active:border-bluegray-900 hover:bg-bluegray-700 hover:border-bluegray-700",
        bluelight:
          "bg-bluelight-600 border-bluelight-600 active:bg-bluelight-900 active:border-bluelight-900 hover:bg-bluelight-700 hover:border-bluelight-700",
        indigo:
          "bg-indigo-600 border-indigo-600 active:bg-indigo-900 active:border-indigo-900 hover:bg-indigo-700 hover:border-indigo-700",
        purple:
          "bg-purple-600 border-purple-600 active:bg-purple-900 active:border-purple-900 hover:bg-purple-700 hover:border-purple-700",
        violet:
          "bg-violet-600 border-violet-600 active:bg-violet-900 active:border-violet-900 hover:bg-violet-700 hover:border-violet-700",
        pink: "bg-pink-600 border-pink-600 active:bg-pink-900 active:border-pink-900 hover:bg-pink-700 hover:border-pink-700",
        rose: "bg-rose-600 border-rose-600 active:bg-rose-900 active:border-rose-900 hover:bg-rose-700 hover:border-rose-700",
        orange:
          "bg-orange-600 border-orange-600 active:bg-orange-900 active:border-orange-900 hover:bg-orange-700 hover:border-orange-700",
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
        "blue-outlined":
          "border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 active:bg-blue-100 active:text-blue-900 active:border-blue-900",
        "bluegray-outlined":
          "border-bluegray-600 text-bluegray-600 hover:bg-bluegray-50 hover:border-bluegray-700 hover:text-bluegray-700 active:bg-bluegray-100 active:text-bluegray-900 active:border-bluegray-900",
        "bluelight-outlined":
          "border-bluelight-600 text-bluelight-600 hover:bg-bluelight-50 hover:border-bluelight-700 hover:text-bluelight-700 active:bg-bluelight-100 active:text-bluelight-900 active:border-bluelight-900",
        "indigo-outlined":
          "border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 active:bg-indigo-100 active:text-indigo-900 active:border-indigo-900",
        "purple-outlined":
          "border-purple-600 text-purple-600 hover:bg-purple-50 hover:border-purple-700 hover:text-purple-700 active:bg-purple-100 active:text-purple-900 active:border-purple-900",
        "violet-outlined":
          "border-violet-600 text-violet-600 hover:bg-violet-50 hover:border-violet-700 hover:text-violet-700 active:bg-violet-100 active:text-violet-900 active:border-violet-900",
        "pink-outlined":
          "border-pink-600 text-pink-600 hover:bg-pink-50 hover:border-pink-700 hover:text-pink-700 active:bg-pink-100 active:text-pink-900 active:border-pink-900",
        "rose-outlined":
          "border-rose-600 text-rose-600 hover:bg-rose-50 hover:border-rose-700 hover:text-rose-700 active:bg-rose-100 active:text-rose-900 active:border-rose-900",
        "orange-outlined":
          "border-orange-600 text-orange-600 hover:bg-orange-50 hover:border-orange-700 hover:text-orange-700 active:bg-orange-100 active:text-orange-900 active:border-orange-900",
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
    // <button
    //   {...props}
    //   disabled={disabled}
    //   type={type}
    //   aria-disabled={disabled}
    //   className={cn(
    //     fullWidth && "w-full",
    //     buttonVariants({ intent, className, variant, size }),
    //     "flex items-center text-center justify-center gap-2"
    //   )}
    // >
    //   {startIcon}
    //   {children}
    //   {endIcon}
    // </button>
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      className={cn(
        fullWidth && "w-full",
        buttonVariants({ intent, className, variant, size }),
        "flex items-center text-center justify-center gap-2"
      )}
    >
      {startIcon && <span aria-hidden="true">{startIcon}</span>}
      {children}
      {endIcon && <span aria-hidden="true">{endIcon}</span>}
    </button>
  );
};

export default Button;
