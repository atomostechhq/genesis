import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>,"size">, VariantProps<typeof radioVariants> {
  size?: "sm" | "lg";
  disabled?: boolean;
  checked?: boolean;
}

const radioVariants = cva("",{
variants:{
  size:{
    sm:"h-3 w-3",
    lg:"h-4 w-4"
  }
},
defaultVariants:{
  size:"sm"
}
})

const Radio = ({
  size,
  disabled,
  checked,
  className,
  ...props
}: RadioProps) => {
  return (
    <div className="relative inline-flex mt-1 items-center cursor-pointer">
      <input
        {...props}
        checked={checked}
        disabled={disabled}
        type="radio"
        className={cn(
          "peer relative cursor-pointer appearance-none rounded-full border border-gray-300 hover:border-primary-600 hover:bg-primary-50 transition-all checked:border-primary-600 checked:bg-primary-50 disabled:opacity-30 disabled:cursor-not-allowed",
          radioVariants({size,
          className})
        )}
      />
      <span
        className={cn("absolute transition-opacity opacity-0 ease-in-out pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 h-1.5 w-1.5 bg-primary-600 rounded-full duration-700",size == "sm" && "h-[4.5px] w-[4.5px]")}
      ></span>
    </div>
  );
};

export default Radio;
