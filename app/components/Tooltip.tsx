import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import React from "react";

const tooltipVariants = cva(
  "bg-white shadow-lg rounded-lg absolute hidden group-hover:block p-3 z-10 max-w-[328px] w-max whitespace-normal opacity-0 group-hover:opacity-100 transform transition-all duration-1000 ease-in-out group-hover:delay-[2000ms]",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+0px)] group-hover:translate-y-0 delay-1000 translate-y-[-10px]",
        right:
          "top-1/2 -translate-y-1/2 left-[calc(100%+0px)] group-hover:translate-x-0 translate-x-[-10px]",
        bottom:
          "top-[calc(100%+0px)] group-hover:translate-y-0 translate-y-[10px]",
        left: "top-1/2 -translate-y-1/2 right-[calc(100%+0px)] group-hover:translate-x-0 translate-x-[10px]",
      },
    },
  }
);

interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  children: ReactNode;
  position: "top" | "right" | "bottom" | "left";
  content: JSX.Element | string;
}

const Tooltip: React.FC<TooltipProps> = ({
  position,
  content,
  children,
  ...props
}) => {
  return (
    <div {...props} className="relative cursor-pointer text-sm group">
      <div>{children}</div>
      <span className={cn(tooltipVariants({ position }))}>{content}</span>
    </div>
  );
};

export default Tooltip;
