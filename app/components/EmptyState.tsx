import React, { ReactNode } from "react";
import Label from "./Label";
import HelperText from "./HelperText";
import Button from "./Button";
import { cn } from "../utils/utils";

interface EmptyStateProps {
  children?: ReactNode;
  className?: string;
}

export const EmptyImageSVG = () => {
  return (
    <svg
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.5848 77.9968C60.9965 77.7263 78 59.8727 78 38.4123V0.991873C78 0.450854 77.5502 0 77.0104 0H52.9896C52.4498 0 52 0.450854 52 0.991873V3.69696H26.9896C26.4498 3.69696 26 4.14782 26 4.68884V39.0435H0.989652C0.44986 39.0435 0 39.4944 0 40.0354C0.629758 61.2253 18.173 78.2673 39.5848 77.9968Z"
        fill="#F2F4F7"
      />
      <path
        d="M64.9248 56.6069C64.9248 56.6069 65.0112 56.5529 65.0436 56.5204L71.539 52.1974L68.4048 50.5006L65.2706 51.2572L56.9704 19.5802C56.203 16.6406 53.2742 14.8141 50.2913 15.4301L10.7033 23.5034L9.30911 20.38L5.89395 26.2593C5.8183 26.3782 5.74263 26.5079 5.67779 26.6267V26.6484C5.00772 27.902 4.79152 29.4151 5.22382 30.8957L15.664 67.5441C16.053 68.9167 17.4688 69.7164 18.8414 69.3382L64.1142 56.996C64.3844 56.9203 64.633 56.7906 64.8599 56.6501L64.914 56.6177L64.9248 56.6069Z"
        fill="#F2F4F7"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M70.7622 52.5535L23.0902 65.555C21.6419 65.9441 20.1505 65.1119 19.7398 63.6637L8.74853 25.07C7.78666 21.698 9.90494 18.218 13.3417 17.5155L56.2153 8.77221C59.3495 8.13457 62.4404 10.0583 63.2402 13.1493L72.686 49.2248C73.0642 50.673 72.2104 52.1645 70.7622 52.5535Z"
        fill="white"
      />
      <path
        d="M64.4516 17.8181L10.068 29.7605L8.7279 25.07C7.76603 21.6981 9.88431 18.218 13.3211 17.5155L56.2055 8.77221C59.3396 8.13457 62.4306 10.0583 63.2304 13.1493L64.4516 17.8181Z"
        fill="#1570EF"
      />
      <path
        d="M17.3936 22.4184C17.6962 23.4884 17.0586 24.5475 15.9778 24.7853C14.8862 25.0231 13.7515 24.3314 13.4489 23.2614C13.1463 22.1915 13.7839 21.1215 14.8755 20.8946C15.967 20.6676 17.091 21.3593 17.3936 22.4292V22.4184Z"
        fill="white"
      />
      <path
        d="M24.3751 20.9381C24.6669 21.9972 24.0509 23.0455 22.9809 23.2725C21.911 23.4994 20.7978 22.8186 20.506 21.7486C20.2142 20.6787 20.8302 19.6303 21.9109 19.4034C22.9917 19.1764 24.0833 19.8681 24.3751 20.9272V20.9381Z"
        fill="#F2F4F7"
      />
      <path
        d="M10.0868 29.8424C10.0868 29.8424 10.411 26.6866 10.692 23.4552L9.31948 20.375L5.90426 26.2543C5.82861 26.3732 5.75301 26.5029 5.68816 26.6218V26.6434C5.01809 27.8971 4.8019 29.4101 5.2342 30.8908L6.62841 35.7974L10.0868 29.8316V29.8424Z"
        fill="#1570EF"
      />
      <path
        d="M70.7622 52.5535L23.0902 65.555C21.6419 65.9441 20.1505 65.1119 19.7398 63.6637L8.74853 25.07C7.78666 21.698 9.90494 18.218 13.3417 17.5155L56.2153 8.77221C59.3495 8.13457 62.4404 10.0583 63.2402 13.1493L72.686 49.2248C73.0642 50.673 72.2104 52.1645 70.7622 52.5535Z"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M33.0003 40.8058L25.943 42.5134C25.5107 42.6215 25.2513 43.0646 25.3702 43.4969L28.7097 55.4176L37.2153 53.202L33.9406 41.357C33.8325 40.9463 33.411 40.6977 32.9895 40.795L33.0003 40.8058Z"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M43.2152 27.7587L36.4064 29.3042C35.9633 29.4015 35.7039 29.8446 35.8228 30.2877L41.7886 52.0109L50.0023 49.871L44.1662 28.3207C44.0582 27.91 43.6475 27.6615 43.226 27.7587H43.2152Z"
        fill="#1570EF"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M57.285 30.6058L50.7896 32.1188C50.3573 32.2161 50.0871 32.6592 50.206 33.0915L54.3993 48.73L62.3321 46.6658L58.236 31.1678C58.128 30.7571 57.7065 30.5085 57.2958 30.6058H57.285Z"
        fill="#F2F4F7"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.3553 60.2827L69.1952 47.8972"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.5596 47.6014L30.8657 41.3244"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M34.4999 43.7638L28.0771 53.1231"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M32.4999 54.4171L36.0926 49.1731"
        stroke="#1570EF"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Text = ({ children, className, ...props }: EmptyStateProps) => {
  return (
    <Label size={"lg"} className={cn("font-bold", className)} {...props}>
      {children}
    </Label>
  );
};

export const Desc = ({ children, className, ...props }: EmptyStateProps) => {
  return (
     <HelperText size="lg" {...props} className={cn("text-center",className)}>{children}</HelperText> 
  );
};

const EmptyState = ({
  children,
  className
}: EmptyStateProps) => {
  return (
    <div className={cn("max-w-[300px] w-full flex flex-col justify-center items-center gap-3", className)}>
{children}
    </div>
  );
};

export default EmptyState;
