import React from "react";
import { cn } from "../utils/utils";

interface DividerProps {
  width?: string;
  height?: string;
  position?: "horizontal" | "vertical";
  className?: string;
}

const Divider = ({
  width,
  height,
  position = "horizontal",
  className,
}: DividerProps) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={cn(
        `bg-gray-200`,
        position === "horizontal" ? "w-full h-[1px]" : "w-[1px] h-full",
        className
      )}
    ></div>
  );
};

export default Divider;
