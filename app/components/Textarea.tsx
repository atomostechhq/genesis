import React, {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../utils/utils";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: "sm" | "lg";
  disabled?: boolean;
  rows?: number;
  cols?: number;
  children?: ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size, className, rows, cols, disabled, children, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        disabled={disabled}
        rows={rows}
        cols={cols}
        className={cn(
          "group flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 shadow-xs hover:bg-gray-50 hover:border-gray-300 text-sm focus-within:border-gray-800 focus-within:bg-gray-25 focus-within:hover:bg-gray-50 focus-within:hover:border-gray-800 outline-none disabled:bg-gray-300 disabled:select-none disabled:pointer-events-none disabled:opacity-30 placeholder:text-gray-500 hover:placeholder:text-gray-500",
          size === "sm" ? "py-2.5 px-3.5" : "p-2.5",
          className,
          size
        )}
      >
        {children}
      </textarea>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
