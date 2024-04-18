import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, variant }) => {
  const style: React.CSSProperties = {
    width,
    height,
  };

  return <span className={`skeleton ${variant}`} style={style}></span>;
};

export default Skeleton;
