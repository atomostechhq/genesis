"use client";

import { VariantProps, cva } from "class-variance-authority";
import React, {
  HtmlHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import { cn } from "../utils/utils";

interface StepConfig {
  name: string;
  Component: React.ComponentType<any>;
}

interface CheckoutStepperProps {
  stepsConfig: StepConfig[];
  currentStep: any;
  setCurrentStep: any;
  isComplete: any;
  setIsComplete: any;
  position: any;
}

const Stepper = ({
  stepsConfig,
  currentStep,
  setCurrentStep,
  isComplete,
  setIsComplete,
  position,
}: CheckoutStepperProps) => {
  const [margins, setMargins] = useState<{
    marginLeft: number;
    marginRight: number;
  }>({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const firstStepWidth = stepRef.current[0]?.offsetWidth;
    const lastStepWidth = stepRef.current[stepsConfig.length - 1]?.offsetWidth;

    setMargins({
      marginLeft: firstStepWidth !== undefined ? firstStepWidth / 2 : 0,
      marginRight: lastStepWidth !== undefined ? lastStepWidth / 2 : 0,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  // const calculateProgressBarWidth = () => {
  //   console.log("calculateProgressBarWidth", ((currentStep - 1) / (stepsConfig.length - 1)) * 100)
  //   console.log("currentStep", currentStep, stepsConfig.length)
  //   return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  // };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  // console.log("currentStep", currentStep);

  return (
    <>
      <div
        className={cn(
          "stepper relative",
          position === "horizontal"
            ? "flex justify-between items-start"
            : "flex flex-col gap-[60px]"
        )}
      >
        {stepsConfig.map((step, index) => (
          <>
            <div
              key={step.name}
              ref={(el: any) => (stepRef.current[index] = el)}
              className={`step w-full ${
                position === "horizontal"
                  ? "flex flex-col"
                  : "flex gap-4 justify-start ml-6"
              }  ${currentStep > index + 1 || isComplete ? "complete" : ""} ${
                currentStep === index + 1 ? "" : ""
              } `}
            >
              <div
                className={cn(
                  " ",
                  position === "horizontal" ? "flex items-center" : "flex flex-col"
                )}
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full bg-gray-100 flex justify-center items-center ${
                    currentStep == index + 1
                      ? "border border-primary-600"
                      : "border border-gray-200"
                  } ${
                    currentStep > index + 1 || isComplete
                      ? "bg-primary-600 border-none"
                      : ""
                  } `}
                >
                  {currentStep === index + 1 && !isComplete ? (
                    <span className="w-[10px] h-[10px] rounded-full bg-primary-600"></span>
                  ) : (
                    ""
                  )}

                  {currentStep > index + 1 || isComplete ? (
                    <span>
                      <CheckLineIcon size={12} color="#fff" />{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {index !== stepsConfig?.length -1 && <div className={cn("w-[80%] mx-auto h-2 rounded-lg bg-gray-200")}>
                  <p
                    className={cn("h-full rounded-lg ", (currentStep > index + 1 ? "bg-primary-600" : ""))}
                  ></p>
                </div>}
              </div>

              {/* step name */}
              <div className="whitespace-nowrap">
                <span className="text-gray-400 text-text-xs">
                  STEP{index + 1}
                </span>
                <p>{step?.name}</p>
              </div>
            </div>
          </>
        ))}
        {/* <div
          className={cn(
            "progress-bar absolute",
            position === "horizontal"
              ? "top-[10%] left-0 h-[3px] bg-gray-200"
              : "h-[100px]"
          )}
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="bg-primary-600 h-full transition-all duration-75 ease"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div> */}
        {/* <div
          className={cn(
            "progress-bar absolute",
            position === "horizontal"
              ? "top-[10%] left-0 h-[3px] bg-gray-200"
              : "left-0 top-0 w-[3px] bg-gray-200"
          )}
          style={{
            height: position === "horizontal" ? undefined : "100%",
            width:
              position === "horizontal"
                ? `calc(100% - ${margins.marginLeft + margins.marginRight}px)`
                : undefined,
            marginRight:
              position === "horizontal" ? margins.marginRight : undefined,
          }}
        >
          <div
            className="bg-primary-600 h-full transition-all duration-75 ease"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div> */}
      </div>

      {/* Conditional rendering of ActiveComponent */}
      {ActiveComponent && <ActiveComponent />}
    </>
  );
};

export default Stepper;
