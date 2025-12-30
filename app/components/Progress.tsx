import React from "react";
import { cn } from "../utils/utils";

export type ProgressBarProps = {
  progress: number;
  progressText?: string;
  progressColor: string;
  progressTextPosition?: "top" | "bottom" | "left" | "right";
};

const ProgressBar = ({
  progress,
  progressText = "",
  progressColor,
  progressTextPosition,
}: ProgressBarProps) => {
  const _progress = Math?.min(Math?.max(0, progress), 100);
  return (
    <div
      className={cn(
        "rounded",
        progressTextPosition === "right"
          ? "flex items-center gap-1"
          : progressTextPosition === "left"
          ? "flex items-center gap-1"
          : ""
      )}
    >
      <span
        className={cn(
          "text-gray-700 text-text-sm",
          progressTextPosition === "left"
            ? "inline-block"
            : progressTextPosition === "top"
            ? "flex justify-end"
            : "hidden"
        )}
      >
        {progressText}
      </span>
      <div
        className="w-full h-2 rounded bg-gray-200"
        role="progressbar"
        aria-valuenow={_progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${progressColor} h-full transition-all delay-100 duration-300 rounded ease-in`}
          style={{ width: `${_progress}%` }}
        ></div>
      </div>
      <span
        className={cn(
          "text-gray-700 text-text-sm",
          progressTextPosition === "bottom"
            ? "flex justify-end"
            : progressTextPosition === "top"
            ? "hidden"
            : progressTextPosition === "right"
            ? "flex justify-end"
            : "hidden"
        )}
      >
        {progressText}
      </span>
    </div>
  );
};

export default ProgressBar;
