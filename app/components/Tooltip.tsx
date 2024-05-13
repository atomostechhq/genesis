import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import React from "react";

interface TooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltupVariants> {
  children: ReactNode;
  position: "top" | "right" | "bottom" | "left";
  content: string;
}

const tooltupVariants = cva(
  "bg-white shadow-lg rounded-lg absolute hidden group-hover:inline-block p-3 z-10 max-w-[328px] w-max whitespace-wrap",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+0px)]",
        right: "top-1/2 -translate-y-1/2 left-[calc(100%+0px)]",
        bottom: "top-[calc(100%+0px)]",
        left: "top-1/2 -translate-y-1/2 right-[calc(100%+0px)]",
      },
    },
  }
);

const Tooltip = ({ position, content, children }: TooltipProps) => {
  return (
    <div id="tooltip" className="relative cursor-pointer px-2 group">
      <div>{children}</div>
      <span className={cn(tooltupVariants({ position }))}>{content}</span>
    </div>
  );
};

export default Tooltip;
