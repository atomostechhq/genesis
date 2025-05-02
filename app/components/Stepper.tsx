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
    <div className={cn(position !== "horizontal" && "flex")}>
      <div
        className={cn(
          "relative",
          position === "horizontal"
            ? "flex justify-center items-start"
            : "flex flex-col"
        )}
      >
        {stepsConfig.map((step, index) => (
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
              >
                {currentStep === index + 1 && !isComplete && (
                  <span className="w-[10px] h-[10px] rounded-full bg-primary-600"></span>
                )}
                {(currentStep > index + 1 || isComplete) && (
                  <span>
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
              className={cn(
                "whitespace-nowrap",
                position === "vertical" || step?.helperName ? "-mt-1" : ""
              )}
            >
              <span className="text-gray-400 text-text-xs">
                {step?.helperName}
              </span>
              <p>{step?.name}</p>
            </div>
          </div>
        ))}
      </div>

      {ActiveComponent && <ActiveComponent />}
    </div>
  );
};

export default Stepper;
