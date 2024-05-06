import React, { InputHTMLAttributes } from "react";
import { cn } from "../utils/utils";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "lg";
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  disabled?: boolean;
}

const Input = ({
  size,
  startIcon,
  endIcon,
  className,
  type,
  disabled,
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 p-3.5 border border-gray-200 rounded-lg bg-gray-50 shadow-xs hover:bg-gray-50 hover:border-gray-300 focus-within:border-gray-800  focus-within:bg-gray-25  focus-within:hover:bg-gray-50 focus-within:hover:border-gray-800 has-[:disabled]:opacity-30 has-[:disabled]:bg-gray-300 has-[:disabled]:select-none has-[:disabled]:pointer-events-none", size === "sm"? "w-[320px] h-10":"w-[313px] h-11",className
      )}
    >
      <span
        className={cn(
          startIcon ? "group-hover:text-gray-600 group-focus-within:text-gray-600": "hidden",
          disabled === true && "text-gray-900"
        )}
      >
        {startIcon}
      </span>
      <input
        {...props}
        disabled={disabled}
        type={type}
        className={cn("w-full text-sm focus:outline-none bg-transparent disabled:text-gray-900 placeholder:text-gray-500 group-hover:placeholder:text-gray-500", size)}
      />
      <span className={cn(
          endIcon ? "group-hover:text-gray-600 group-focus-within:text-gray-600": "hidden",
          disabled === true && "text-gray-900"
        )}>
        {endIcon}
      </span>
    </div>
  );
};

export default Input;
