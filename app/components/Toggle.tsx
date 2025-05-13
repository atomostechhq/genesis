import { cva, type VariantProps } from "class-variance-authority";
import React, { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/utils";

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof toggleVariants> {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: never;
}

const toggleVariants = cva("", {
  variants: {
    size: {
      sm: "w-5 h-3 after:w-2 after:h-2",
      md: "w-9 h-5 after:w-4 after:h-4",
      lg: "w-11 h-6 after:w-5 after:h-5",
    },
    intent: {
      primary: "peer-checked:bg-primary-600",
      success: "peer-checked:bg-success-500",
    },
  },
  defaultVariants: {
    size: "md",
    intent: "primary",
  },
});

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ size, className, intent, disabled, children, id, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center cursor-pointer",
          disabled && "opacity-30 pointer-events-none"
        )}
        htmlFor={id}
      >
        <input
          type="checkbox"
          disabled={disabled}
          ref={ref}
          id={id}
          role="switch"
          aria-checked={props?.checked || false}
          {...props}
          className="sr-only peer"
        />
        <span
          className={cn(
            "relative w-11 h-7 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary-600 peer-focus:ring-offset-2 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all",
            toggleVariants({
              intent,
              className,
              size,
            })
          )}
          aria-hidden="true"
        >
          {children}
        </span>
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
