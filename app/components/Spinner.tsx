import React from "react";
import { cn } from "../utils/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const Spinner = ({ size = "md" }: SpinnerProps) => {
  const sizeClass = cn({
    "w-6": size === "sm",
    "w-10": size === "md",
    "w-16": size === "lg",
  });
  return (
    <div
      className={cn(
        "spinner relative grid aspect-square rounded-full before:content-[''] after:content-['']",
        sizeClass
      )}
    />
  );
};

export default Spinner;
