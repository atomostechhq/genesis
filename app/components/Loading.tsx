import React from "react";
import { cn } from "../utils/utils";

interface LoadingProps {
  width?: string;
  height?: string;
  loaderColor?: string;
  variant?: "light" | "heavy";
}

const Loading = ({ width, height, loaderColor, variant }: LoadingProps) => {
  return (
    <div
      className={cn(
        "animate-spin-slow border-primary-600 border-t-gray-200/50 rounded-full",
        variant === "light" ? "border-2" : "border-4"
      )}
      style={{
        width: width,
        height: height,
        borderColor: loaderColor,
        borderTopColor: "rgb(234 236 240 / 0.5)",
      }}
    ></div>
  );
};

export default Loading;
