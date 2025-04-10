import { FC } from "react";
import { cn } from "../utils/utils";

interface CircularProgressBarProps {
  strokeWidth?: number;
  size?: number;
  percentage: number;
  text?: string;
  textClassName?: string;
}

const CircularProgressBar = ({
  percentage,
  size = 160,
  strokeWidth = 8,
  text,
  textClassName,
}: CircularProgressBarProps) => {
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        className="fill-none stroke-gray-200"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="fill-none stroke-primary-600 transition-all delay-200 ease-in"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
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

export default CircularProgressBar;
