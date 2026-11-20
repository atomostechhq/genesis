import React from "react";
import ProgressBar from "./Progress";

interface StepProgressProps {
  totalSteps: number;
  currentStep: number; 
}

const StepProgress: React.FC<StepProgressProps> = ({
  totalSteps,
  currentStep,
}) => {
  const progress =
    totalSteps > 0
      ? Math.min(100, Math.max(0, (currentStep / totalSteps) * 100))
      : 0;

  return (
    <div className="w-full mb-8">
      <ProgressBar
        progress={progress}
        progressColor="bg-primary-600 delay-500"
      />
    </div>
  );
};

export default StepProgress;