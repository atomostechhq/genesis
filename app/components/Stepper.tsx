// "use client"

import { createContext, useContext } from "react";
import Button from "./Button";

interface TabContextData {
  position: string;
  selectedTabValue: number;
  handleTabChange: (value: number) => void;
  isComplete?: boolean;
  setIsComplete?: any
}

const defaultContextData: TabContextData = {
  position: "horizontal",
  selectedTabValue: 1,
  isComplete: false,
  handleTabChange: () => {},
};

const StepperContainerContext =
  createContext<TabContextData>(defaultContextData);

type StepperContextProps = {
  value: number;
  position: string;
  onChange: (value: number) => void;
  children: React.ReactNode;
};

export const StepperContext = ({
  value,
  position,
  children,
  onChange,
}: StepperContextProps) => {
  const data = { position, selectedTabValue: value, handleTabChange: onChange };
  return (
    <StepperContainerContext.Provider value={data}>
      {children}
    </StepperContainerContext.Provider>
  );
};

export const StepperList = ({ children }: { children: React.ReactNode }) => {
  const { position } = useContext(StepperContainerContext) || { position: "" };
  return (
    <ul
      className={`flex w-full items-center justify-between border-b border-gray-600 ${position}`}
    >
      {children}
    </ul>
  );
};

type StepProps = {
  value: number;
  children: React.ReactNode;
};

export const Step = ({ value, children }: StepProps) => {
  const { selectedTabValue, handleTabChange, position } =
    useContext(StepperContainerContext) || {};

  const handleClick = () => {
    if (value !== selectedTabValue && handleTabChange) {
      handleTabChange(value);
    }
  };

  return (
    <li
        className={`flex flex-col px-4 py-3 text-text-sm font-medium active:bg-primary-50 hover:bg-primary-50 cursor-pointer ${
          value === selectedTabValue
            ? "text-primary-700 border-b-2 border-primary-700"
            : "border-b-2 border-transparent"
        } `}
      onClick={handleClick}
    >
      <span className={`w-5 h-5 rounded-full bg-gray-200`}></span>
      <span>{value}</span>
      {children}
    </li>
  );
};

type StepContentProps = {
  value: number;
  children: React.ReactNode;
};

export const NextButton = ({ value }: StepProps) => {
  const { selectedTabValue, handleTabChange } =
    useContext(StepperContainerContext) || {};

    const handleNextClick = () => {
      const nextStep = selectedTabValue + 1;
      console.log("nextStep", nextStep)
      handleTabChange(nextStep);
    };

  console.log("selectedTabValue", selectedTabValue, value);

  return (
    <Button variant="filled" onClick={handleNextClick}>
      Next
    </Button>
  );
};

export const StepContent = ({ value, children }: StepContentProps) => {
  const { selectedTabValue } = useContext(StepperContainerContext) || {};
  return value === selectedTabValue ? <div className="">{children}</div> : null;
};

export default StepperContext;
