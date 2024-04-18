import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";

interface TooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltupVariants> {
  children: ReactNode;
  position: any;
  content: string;
}

const tooltupVariants = cva(
  "bg-white shadow-lg rounded-lg absolute hidden group-hover:inline-block p-3 z-10 max-w-[328px] w-max whitespace-wrap",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+8px)]",
        right: "top-1/2 -translate-y-1/2 left-[calc(100%+8px)]",
        bottom: "top-[calc(100%+8px)]",
        left: "top-1/2 -translate-y-1/2 right-[calc(100%+8px)]",
      },
    },
  }
);

export const Tooltip = ({ position, content, children }: TooltipProps) => {
  return (
    <div id="tooltip" className="relative cursor-pointer group">
      <div>{children}</div>
      <span className={cn(tooltupVariants({ position }))}>{content}</span>
    </div>
  );
};
