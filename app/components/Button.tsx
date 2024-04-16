import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils"
import { cva, VariantProps } from "class-variance-authority";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

const buttonVariants = cva("rounded-full px-4 py-2", {
  variants: {
    intent: {
      filled: "bg-primary-400",
      outline: "bg-emerald-700",
    //   danger: "bg-red-500",
    },
    size: {
      sm: "text-sm px-2 py-1",
      lg: "text-lg px-5 py-3",
    },
  },
  defaultVariants: {
    intent: "filled",
    size: "sm",
  },
});

const Button = ({
  children,
  className,
  intent,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ intent, className,  size}))}
    >
      {children}
    </button>
  );
};

export default Button;
