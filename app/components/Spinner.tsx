import React from "react";
import { cn } from "../utils/utils";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "primary" | "black" | "gray" | string;
}

const colorVars: Record<string, { c1: string; c2: string }> = {
  primary: {
    c1: "var(--primary-500)",
    c2: "var(--primary-200)",
  },
  black: {
    c1: "rgba(0, 0, 0, 1)",
    c2: "rgba(0, 0, 0, 0.5)",
  },
  gray: {
    c1: "var(--gray-500)",
    c2: "var(--gray-300)",
  },
};

const Spinner = ({ size = "md", color = "primary" }: SpinnerProps) => {
  const sizeClass = cn({
    "w-4 h-4": size === "xs",
    "w-6 h-6": size === "sm",
    "w-10 h-10": size === "md",
    "w-16 h-16": size === "lg",
  });

  const getColorValues = (color: string) => {
    if (colorVars[color]) {
      return colorVars[color];
    }
    if (color.startsWith('#')) {
      return {
        c1: color,
        c2: `${color}80` 
      };
    }
    return colorVars.primary;
  };

  const colorValues = getColorValues(color);

  return (
    <div className={cn("relative", sizeClass)}>
      <div
        className="spinner"
        style={{
          ["--spinner-color-1" as any]: colorValues.c1,
          ["--spinner-color-2" as any]: colorValues.c2,
        }}
      />
    </div>
  );
};

export default Spinner;
