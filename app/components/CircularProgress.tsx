import React from "react";
import { cn } from "../utils/utils";

interface CircularProgressBarProps {
  strokeWidth?: number;
  size?: number;
  percentage: number;
  text?: string;
  textClassName?: string;
}

const CircularProgress = ({
  percentage,
  size = 160,
  strokeWidth = 8,
  text,
  textClassName,
}: CircularProgressBarProps) => {
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;

  const normalizedPercentage = Math.min(Math.max(percentage || 0, 0), 100);

  const dashOffset = dashArray - (dashArray * normalizedPercentage) / 100;

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        className="fill-none stroke-gray-200"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />

      <circle
        className="circular-progress fill-none stroke-primary-600"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={
          {
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            "--dash-array": dashArray,
            "--dash-offset": dashOffset,
          } as React.CSSProperties
        }
      />

      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fill="currentColor"
        className={cn(textClassName)}
      >
        {text}
      </text>
    </svg>
  );
};

export default CircularProgress;
