import React, { InputHTMLAttributes } from "react";
import MailLineIcon from "remixicon-react/MailLineIcon";
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
    <div className={cn("relative flex items-center", size ==="sm"?"w-[320px] h-[40px]":"w-[313px] h-[44px]")}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {startIcon}
      </span>
      <input
        {...props}
        type={type}
        disabled={disabled}
        className={cn(
          "w-full px-3.5 py-2.5 pr-10 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-500 bg-transparent hover:bg-gray-50 hover:border-gray-300 active:bg-gray-25 active:border-gray-800 active:text-gray-900 pl-10 hover:focus:border-gray-800 hover:focus:bg-gray-50 focus:outline-none focus:text-gray-900 focus:border-gray-800 group disabled:pointer-events-none disabled:opacity-30 disabled:bg-gray-400 placeholder:disabled:text-gray-900 disabled:border-gray-400 disabled:text-gray-900 invalid:border-error-400",className,size
        )}
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:border-gray-400 disabled:text-gray-100 invalid:text-error-400">{endIcon}</span>
    </div>
  );
};

export default Input;
