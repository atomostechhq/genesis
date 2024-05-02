import React, { ReactNode } from "react";
import Label from "./Label";
import HelperText from "./HelperText";
import { cn } from "../utils/utils";

interface LoadingProps {
  width?: string;
  height?: string;
  children?: ReactNode;
  className?: string;
  color?:string;
}

export const LoadingText = ({
  children,
  className,
  ...props
}: LoadingProps) => {
  return (
    <span className={cn("font-bold", className)} {...props}>
      {children}
    </span>
  );
};

export const LoadingDesc = ({
  children,
  className,
  ...props
}: LoadingProps) => {
  return (
    <HelperText size="lg" {...props} className={cn("text-center", className)}>
      {children}
    </HelperText>
  );
};

const Loading = ({ children, className, width, height, color }: LoadingProps) => {
  return (
    <div className="space-y-3 text-center flex flex-col items-center py-3 justify-center gap-2">
      <div className={cn(`border-[3px] animate-spin-slow rounded-full`, color? `border-[${color}] border-t-gray-200/50`:"border-primary-600 border-t-gray-200/50" )} style={{
        width:width,
        height:height
      }}></div>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-1",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Loading;
