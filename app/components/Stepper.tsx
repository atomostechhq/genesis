"use client";
import React, { useRef } from "react";
import { RiCheckLine } from "@remixicon/react";
import { cn } from "../utils/utils";

interface StepConfig {
  name: string;
  helperName?: string;
  Component: React.ComponentType<any>;
}

interface CheckoutStepperProps {
  stepsConfig: StepConfig[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isComplete: boolean;
  setIsComplete: (complete: boolean) => void;
  position?: string;
}

const Stepper = ({
  stepsConfig,
  currentStep,
  setCurrentStep,
  isComplete,
  setIsComplete,
  position = "horizontal",
}: CheckoutStepperProps) => {
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  if (!stepsConfig.length) {
    return null;
  }

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <div
      role="region"
      aria-label="Step Progress"
      className={cn(position !== "horizontal" && "flex")}
    >
      <div
        className={cn(
          "relative",
          position === "horizontal"
            ? "flex justify-center items-start"
            : "flex flex-col"
        )}
        role="list"
        aria-label={`Progress: ${currentStep} of ${stepsConfig.length} steps`}
      >
        {stepsConfig?.map((step, index) => (
          <div
            key={index}
            ref={(el: any) => (stepRef.current[index] = el)}
            className={cn(
              position === "horizontal"
                ? "flex gap-4 flex-col"
                : "flex gap-6 justify-start",
              index === stepsConfig.length - 1 ? "w-auto" : "w-full",
              currentStep > index + 1 || isComplete ? "complete" : "",
              currentStep === index + 1 ? "" : ""
            )}
            role="listitem"
            aria-current={currentStep === index + 1 ? "step" : undefined}
            aria-label={`${step.name}${
              step.helperName ? `, ${step.helperName}` : ""
            }, ${
              currentStep > index + 1 || isComplete
                ? "completed"
                : currentStep === index + 1
                ? "current step"
                : "pending"
            }`}
          >
            <div
              className={cn(
                "",
                position === "horizontal"
                  ? "flex items-center"
                  : "flex flex-col"
              )}
            >
              <div
                className={`w-[20px] h-[20px] rounded-full bg-gray-100 flex justify-center items-center ${
                  currentStep === index + 1
                    ? "border border-primary-600"
                    : "border border-gray-200"
                } ${
                  currentStep > index + 1 || isComplete
                    ? "bg-primary-600 border-none"
                    : ""
                }`}
                role="status"
                aria-label={`Step ${index + 1} ${
                  currentStep > index + 1 || isComplete
                    ? "completed"
                    : currentStep === index + 1
                    ? "current"
                    : "pending"
                }`}
              >
                {currentStep === index + 1 && !isComplete && (
                  <span
                    aria-hidden="true"
                    className="w-[10px] h-[10px] rounded-full bg-primary-600"
                  ></span>
                )}
                {(currentStep > index + 1 || isComplete) && (
                  <span aria-hidden="true">
                    <RiCheckLine size={12} color="#fff" />
                  </span>
                )}
              </div>
              {index !== stepsConfig.length - 1 && (
                <div
                  className={cn(
                    "mx-auto rounded-lg bg-gray-200",
                    position === "horizontal"
                      ? "w-[80%] h-1"
                      : "h-[100px] w-1 my-2"
                  )}
                  aria-hidden="true"
                >
                  <p
                    className={cn(
                      "h-full rounded-lg",
                      currentStep > index + 1 ? "bg-primary-600" : ""
                    )}
                  ></p>
                </div>
              )}
            </div>

            {/* step name */}
            <div
              aria-hidden={currentStep !== index + 1}
              className={cn(
                "whitespace-nowrap",
                position === "vertical" || step?.helperName ? "-mt-1" : ""
              )}
            >
              <span
                aria-label="Helper text"
                className="text-gray-400 text-text-xs"
              >
                {step?.helperName}
              </span>
              <p>{step?.name}</p>
            </div>
          </div>
        ))}
      </div>

      {ActiveComponent && (
        <div
          role="tabpanel"
          aria-label={`Current step: ${stepsConfig[currentStep - 1]?.name}`}
          tabIndex={0}
        >
          <ActiveComponent />
        </div>
      )}
    </div>
  );
};

export default Stepper;
