import React from "react";
import { cn } from "../utils/utils";

interface LoadingProps {
  width?: string;
  height?: string;
  color?: string;
}
const Loading = ({ width, height }: LoadingProps) => {
  return (
    <div
      className={cn("border-[3px] animate-spin-slow border-primary-600 border-t-gray-200/50 rounded-full"
      )}
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default Loading;
