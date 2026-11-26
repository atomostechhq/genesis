"use client";
import React from "react";
import { RiCheckLine } from "@remixicon/react";
import { cn } from "../utils/utils";

export interface StepConfig {
  id?: string;
  name: string;
  helperName?: string;
  Component: React.ComponentType<any>;
}

export interface StepperProps {
  stepsConfig: StepConfig[];
  currentStep: number;
  isComplete?: boolean;
  position?: "horizontal" | "vertical";
  /** Render the active step's Component inside the Stepper. Set false to render it yourself. */
  showContent?: boolean;
  className?: string;
  contentClassName?: string;
}

type StepStatus = "completed" | "current" | "pending";

const getStatus = (
  stepNumber: number,
  currentStep: number,
  isComplete: boolean,
): StepStatus => {
  if (isComplete || currentStep > stepNumber) return "completed";
  if (currentStep === stepNumber) return "current";
  return "pending";
};

const STATUS_LABEL: Record<StepStatus, string> = {
  completed: "completed",
  current: "current step",
  pending: "pending",
};

const Stepper = ({
  stepsConfig,
  currentStep,
  isComplete = false,
  position = "horizontal",
  showContent = true,
  className,
  contentClassName,
}: StepperProps) => {
  if (!stepsConfig?.length) return null;

  const total = stepsConfig.length;
  const isHorizontal = position === "horizontal";
  const safeStep = Math.min(Math.max(currentStep, 1), total);
  const activeStep = stepsConfig[safeStep - 1];
  const ActiveComponent = activeStep?.Component;

  const done = isComplete && safeStep === total;
  const announcement = done
    ? "All steps completed"
    : `Step ${safeStep} of ${total}: ${activeStep.name}`;

  return (
    <div
      role="region"
      aria-label="Step progress"
      className={cn(!isHorizontal && "flex gap-8", className)}
    >
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      <ol
        aria-label={`Progress: step ${safeStep} of ${total}`}
        className={cn(
          "m-0 list-none p-0",
          isHorizontal ? "flex items-start justify-center" : "flex flex-col",
        )}
      >
        {stepsConfig?.map((step, index) => {
          const stepNumber = index + 1;
          const isLast = index === total - 1;
          const status = getStatus(stepNumber, safeStep, done);
          const isCompleted = status === "completed";
          const isCurrent = status === "current";

          return (
            <li
              key={step.id ?? `${step.name}-${index}`}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`${step.name}${
                step.helperName ? `, ${step.helperName}` : ""
              }, ${STATUS_LABEL[status]}`}
              className={cn(
                "flex",
                isHorizontal
                  ? cn("flex-col gap-4", isLast ? "w-auto" : "w-full")
                  : "flex-row gap-4",
                isCompleted && "complete",
              )}
            >
              {/* Indicator + connector */}
              <div
                className={cn(
                  "flex",
                  isHorizontal ? "items-center" : "flex-col items-center",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isCompleted && "border-transparent bg-primary-600",
                    isCurrent && "border-primary-600 bg-gray-100",
                    status === "pending" && "border-gray-200 bg-gray-100",
                  )}
                >
                  {isCurrent && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                  )}
                  {isCompleted && <RiCheckLine size={12} color="#fff" />}
                </span>

                {!isLast && (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "overflow-hidden rounded-lg bg-gray-200",
                      isHorizontal
                        ? "mx-2 h-1 flex-1"
                        : "my-2 min-h-[40px] w-1 flex-1",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-lg bg-primary-600 transition-all duration-300",
                        isHorizontal ? "h-full" : "w-full",
                        isCompleted
                          ? isHorizontal
                            ? "w-full"
                            : "h-full"
                          : isHorizontal
                            ? "w-0"
                            : "h-0",
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Labels */}
              <div
                className={cn(
                  "whitespace-nowrap",
                  !isHorizontal && "pb-6",
                  (!isHorizontal || step.helperName) && "-mt-1",
                )}
              >
                {step.helperName && (
                  <span className="block text-text-xs text-gray-500">
                    {step.helperName}
                  </span>
                )}
                <p
                  className={cn(
                    "m-0",
                    isCurrent ? "font-medium text-gray-900" : "text-gray-600",
                  )}
                >
                  {step.name}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {showContent && ActiveComponent && (
        <div className={cn(!isHorizontal && "flex-1", contentClassName)}>
          <ActiveComponent />
        </div>
      )}
    </div>
  );
};

export default React.memo(Stepper);
