import React, {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../utils/utils";

// interface TextareaProps
//   extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
//   size?: "sm" | "lg";
//   disabled?: boolean;
//   rows?: number;
//   cols?: number;
//   children?: ReactNode;
// }

// const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
//   ({ size, className, rows, cols, disabled, children, ...props }, ref) => {
//     return (
//       <textarea
//         {...props}
//         ref={ref}
//         disabled={disabled}
//         rows={rows}
//         cols={cols}
//         className={cn(
//           "group flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 shadow-xs hover:bg-gray-50 hover:border-gray-300 text-sm focus-within:border-gray-800 focus-within:bg-gray-25 focus-within:hover:bg-gray-50 focus-within:hover:border-gray-800 outline-none disabled:bg-gray-300 disabled:select-none disabled:pointer-events-none disabled:opacity-30 placeholder:text-gray-500 hover:placeholder:text-gray-500 shadow-[0px_1px_2px_0px_#1018280D]",
//           size === "sm" ? "py-2.5 px-3.5" : "p-2.5",
//           className,
//           size
//         )}
//       >
//         {children}
//       </textarea>
//     );
//   }
// );

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: "sm" | "lg";
  disabled?: boolean;
  rows?: number;
  cols?: number;
  children?: ReactNode;
  label?: string;
  error?: string;
  description?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size,
      className,
      rows,
      cols,
      disabled,
      children,
      label,
      error,
      description,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const descriptionId = `${textareaId}-description`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          {...props}
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          cols={cols}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            cn(description ? descriptionId : "", error ? errorId : "").trim() ||
            undefined
          }
          className={cn(
            "group flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 shadow-xs hover:bg-gray-50 hover:border-gray-300 text-sm focus-within:border-gray-800 focus-within:bg-gray-25 focus-within:hover:bg-gray-50 focus-within:hover:border-gray-800 outline-none disabled:bg-gray-300 disabled:select-none disabled:pointer-events-none disabled:opacity-30 placeholder:text-gray-500 hover:placeholder:text-gray-500 shadow-[0px_1px_2px_0px_#1018280D]",
            size === "sm" ? "py-2.5 px-3.5" : "p-2.5",
            error && "border-red-500 focus-within:border-red-500",
            className,
            size
          )}
        >
          {children}
        </textarea>
        {description && (
          <span id={descriptionId} className="text-sm text-gray-500">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="text-sm text-red-500" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
