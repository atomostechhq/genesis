import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/utils";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "lg";
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  disabled?: boolean;
  error?: boolean;
  type:
    | "text"
    | "url"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "search"
    | "time";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size,
      startIcon,
      endIcon,
      className,
      type,
      error,
      disabled,
      id,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "group flex items-center gap-2 p-3.5 border border-gray-200 rounded-lg bg-white shadow-[0px_1px_2px_0px_#1018280D] hover:bg-gray-50 hover:border-gray-300 focus-within:border-primary-600 focus-within:bg-gray-25 focus-within:hover:bg-gray-50 focus-within:hover:border-primary-600 has-[:disabled]:opacity-30 has-[:disabled]:bg-gray-300 has-[:disabled]:select-none has-[:disabled]:pointer-events-none",
          size === "sm"
            ? "w-[320px] h-10"
            : size === "lg"
            ? "w-[313px] h-11"
            : "w-full h-10",
          error &&
            "border-error-500 hover:border-error-600 focus-within:border-error-500 focus-within:hover:border-error-500",
          className
        )}
      >
        {startIcon && (
          <span
            aria-hidden="true"
            className={cn(
              "group-hover:text-gray-600 group-focus-within:text-gray-600",
              disabled && "text-gray-900",
              error && "text-error-500"
            )}
          >
            {startIcon}
          </span>
        )}
        <input
          {...props}
          ref={ref}
          id={id}
          disabled={disabled}
          type={type}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-disabled={disabled}
          className={cn(
            "w-full text-sm focus:outline-none focus:ring-offset-0 bg-transparent disabled:text-gray-900 placeholder:text-gray-500 group-hover:placeholder:text-gray-500 rounded-md",
            size
          )}
        />
        {endIcon && (
          <span
            aria-hidden="true"
            className={cn(
              "group-hover:text-gray-600 group-focus-within:text-gray-600",
              disabled && "text-gray-900"
            )}
          >
            {endIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
