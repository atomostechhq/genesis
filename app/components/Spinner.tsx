// import React from "react";
// import { cn } from "../utils/utils";

// interface SpinnerProps {
//   size?: "sm" | "md" | "lg";
// }

// const Spinner = ({ size = "md" }: SpinnerProps) => {
//   const sizeClass = cn({
//     "w-6": size === "sm",
//     "w-10": size === "md",
//     "w-16": size === "lg",
//   });
//   return (
//     <div
//       className={cn(
//         "spinner relative grid aspect-square rounded-full before:content-[''] after:content-['']",
//         sizeClass
//       )}
//     />
//   );
// };

// export default Spinner;

import React from "react";
import { cn } from "../utils/utils";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "primary" | "white" | "black" | "gray";
}

const colorVars: Record<string, { c1: string; c2: string }> = {
  primary: {
    c1: "var(--primary-500)",
    c2: "var(--primary-200)",
  },
  white: {
    c1: "rgba(255, 255, 255, 1)",
    c2: "rgba(255, 255, 255, 0.5)",
  },
  black: {
    c1: "rgba(0, 0, 0, 1)",
    c2: "rgba(0, 0, 0, 0.5)",
  },
  gray: {
    c1: "var(--gray-500)",
    c2: "var(--gray-200)",
  },
};

const Spinner = ({ size = "md", color = "primary" }: SpinnerProps) => {
  const sizeClass = cn({
    "w-4 h-4": size === "xs",
    "w-6 h-6": size === "sm",
    "w-10 h-10": size === "md",
    "w-16 h-16": size === "lg",
  });

  return (
    <div
      className={cn("spinner", sizeClass)}
      style={{
        ["--spinner-color-1" as any]: colorVars[color].c1,
        ["--spinner-color-2" as any]: colorVars[color].c2,
      }}
    />
  );
};

export default Spinner;
