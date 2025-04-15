import Image from "next/image";
import React, { forwardRef } from "react";
import { cn } from "../utils/utils";

interface BaseProps {
  type: "image" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  rounded?: boolean;
  border?: boolean;
  borderColor?: string;
  borderWidth?: string;
  radius?: string;
  disabled?: boolean;
}

interface ImageProps extends BaseProps {
  type: "image";
  src: string;
  alt?: string;
}

interface IconProps extends BaseProps {
  type: "icon";
  icon: JSX.Element;
}

interface TextProps extends BaseProps {
  type: "text";
  text: string;
}

type AvatarProps = ImageProps | IconProps | TextProps;

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    type,
    size = "md",
    className,
    onClick,
    rounded,
    border,
    borderColor,
    borderWidth,
    radius,
    disabled,
  } = props;

  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const displayText =
    type === "text" && props.text
      ? props.text.length === 2
        ? props.text.toUpperCase()
        : props.text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")
            .slice(0, 2)
      : "";

  return (
    <div
      ref={ref}
      className={cn(
        rounded && "rounded-full",
        border && "border border-gray-200",
        disabled && "opacity-50 pointer-events-none select-none"
      )}
      style={{
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: radius,
      }}
    >
      {type === "image" && (
        <div
          className={cn(
            "relative flex items-center justify-center",
            rounded && "rounded-full",
            sizes[size],
            className
          )}
          onClick={onClick}
        >
          <Image
            fill
            src={(props as ImageProps).src}
            alt={(props as ImageProps).alt || ""}
          />
        </div>
      )}
      {type === "icon" && (
        <div
          className={cn(
            "flex items-center justify-center",
            rounded && "rounded-full",
            className,
            sizes[size]
          )}
          onClick={onClick}
        >
          {(props as IconProps).icon}
        </div>
      )}
      {type === "text" && (
        <p
          onClick={onClick}
          className={cn(
            "flex items-center justify-center text-sm font-medium text-gray-700",
            rounded && "rounded-full",
            className,
            sizes[size],
            size === "sm" && "text-xs",
            size === "lg" && "text-xl",
            size === "md" && "text-base"
          )}
        >
          {displayText}
        </p>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
