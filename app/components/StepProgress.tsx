"use client";
import React from "react";
import { cn } from "../utils/utils";
import ProgressBar from "./Progress";

export interface StepProgressProps {
  totalSteps: number;
  currentStep: number;
  progressColor?: string;
  showLabel?: boolean;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
  contentClassName?: string;
}

const StepProgress: React.FC<StepProgressProps> = ({
  totalSteps,
  currentStep,
  progressColor = "bg-primary-600 delay-500",
  showLabel = false,
  ariaLabel = "Step progress",
  className,
  children,
  contentClassName,
}) => {
  const total = Number.isFinite(totalSteps) ? Math.max(0, totalSteps) : 0;
  const current = Number.isFinite(currentStep)
    ? Math.min(total, Math.max(0, currentStep))
    : 0;
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <p className="mb-2 text-sm text-gray-600" aria-hidden="true">
          Step {current} of {total}
        </p>
      )}
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`Step ${current} of ${total}`}
      >
        <ProgressBar progress={progress} progressColor={progressColor} />
      </div>
      {children && <div className={cn("mt-8", contentClassName)}>{children}</div>}
    </div>
  );
};

StepProgress.displayName = "StepProgress";

export default StepProgress;