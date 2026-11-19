import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import React from "react";

const tooltipVariants = cva(
  "bg-white shadow-lg rounded-lg absolute p-3 z-10 max-w-[328px] w-max whitespace-normal transform before:absolute " +
    "invisible opacity-0 pointer-events-none group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-hover/tooltip:pointer-events-auto " +
    "transition-[opacity,visibility] duration-150 ease-out delay-100 group-hover/tooltip:delay-150",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+8px)] before:left-0 before:top-full before:w-full before:h-2",
        right:
          "top-1/2 -translate-y-1/2 left-[calc(100%+8px)] before:right-full before:top-0 before:h-full before:w-2",
        bottom:
          "top-[calc(100%+8px)] before:left-0 before:bottom-full before:w-full before:h-2",
        left: "top-1/2 -translate-y-1/2 right-[calc(100%+8px)] before:left-full before:top-0 before:h-full before:w-2",
      },
    },
  }
);

const arrowVariants = cva(
  "absolute w-0 h-0 border-transparent border-solid",
  {
    variants: {
      position: {
        top: "top-full left-5 -translate-x-1/2 border-t-white border-t-[6px] border-x-[6px] border-x-transparent border-b-0",
        right: "right-full top-1/2 -translate-y-1/2 border-r-white border-r-[6px] border-y-[6px] border-y-transparent border-l-0",
        bottom: "bottom-full left-4 -translate-x-1/2 border-b-white border-b-[6px] border-x-[6px] border-x-transparent border-t-0",
        left: "left-full top-1/2 -translate-y-1/2 border-l-white border-l-[6px] border-y-[6px] border-y-transparent border-r-0",
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
  className,
  ...props
}) => {
  return (
    <div {...props} className="relative cursor-pointer text-sm group/tooltip w-fit">
      <div>{children}</div>
      <div className={cn(tooltipVariants({ position }), className)}>
        {content}
        <div className={cn(arrowVariants({ position }))} />
      </div>
    </div>
  );
};

export default Tooltip;