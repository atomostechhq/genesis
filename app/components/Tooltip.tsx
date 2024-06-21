// import { VariantProps, cva } from "class-variance-authority";
// import { HTMLAttributes, ReactNode } from "react";
// import { cn } from "../utils/utils";
// import React from "react";

// interface TooltipProps
//   extends HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof tooltupVariants> {
//   children: ReactNode;
//   position: "top" | "right" | "bottom" | "left";
//   content: string;
// }

// const tooltupVariants = cva(
//   "bg-white shadow-lg rounded-lg absolute hidden group-hover:inline-block p-3 z-10 max-w-[328px] w-max whitespace-wrap",
//   {
//     variants: {
//       position: {
//         top: "bottom-[calc(100%+0px)]",
//         right: "top-1/2 -translate-y-1/2 left-[calc(100%+0px)]",
//         bottom: "top-[calc(100%+0px)]",
//         left: "top-1/2 -translate-y-1/2 right-[calc(100%+0px)]",
//       },
//     },
//   }
// );

// const Tooltip = ({ position, content, children }: TooltipProps) => {
//   return (
//     <div id="tooltip" className="relative cursor-pointer px-2 group transition-all duration-1000 ease-in">
//       <div>{children}</div>
//       <span className={cn(tooltupVariants({ position }))}>{content}</span>
//     </div>
//   );
// };

// export default Tooltip;

import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import React from "react";

interface TooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  children: ReactNode;
  position: "top" | "right" | "bottom" | "left";
  content: string;
}

const tooltipVariants = cva(
  "bg-white shadow-lg rounded-lg absolute hidden group-hover:inline-block p-3 z-10 max-w-[328px] w-max whitespace-wrap transition-opacity transition-transform duration-300 opacity-0 group-hover:opacity-100",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+0px)] translate-y-[-10px] group-hover:translate-y-0",
        right:
          "top-1/2 -translate-y-1/2 left-[calc(100%+0px)] translate-x-[-10px] group-hover:translate-x-0",
        bottom:
          "top-[calc(100%+0px)] translate-y-[10px] group-hover:translate-y-0",
        left: "top-1/2 -translate-y-1/2 right-[calc(100%+0px)] translate-x-[10px] group-hover:translate-x-0",
      },
    },
  }
);

const Tooltip = ({ position, content, children }: TooltipProps) => {
  return (
    <div id="tooltip" className="relative cursor-pointer px-2 group">
      <div>{children}</div>
      <span className={cn(tooltipVariants({ position }))}>{content}</span>
    </div>
  );
};

export default Tooltip;
