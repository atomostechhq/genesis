// AvatarGroup.tsx
import React, { forwardRef } from "react";
import { cn } from "../utils/utils";
import Avatar, { ImageProps, IconProps, TextProps } from "./Avatar";

type AvatarItemProps =
  | Omit<ImageProps, "size">
  | Omit<IconProps, "size">
  | Omit<TextProps, "size">;

interface AvatarGroupProps {
  avatars: AvatarItemProps[];
  size?: "sm" | "md" | "lg";
  max?: number;
  className?: string;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, size = "md", max, className }, ref) => {
    const displayAvatars = max ? avatars.slice(0, max) : avatars;
    const remainingCount = max ? avatars.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-6 rtl:space-x-reverse", className)}
      >
        {displayAvatars.map((avatar, index) => (
          <div
            className="hover:-translate-x-3 transition-all duration-200"
            key={index}
          >
            <Avatar {...avatar} size={size} />
          </div>
        ))}
        {remainingCount > 0 && (
          <div>
            <Avatar
              type="text"
              text={`+${remainingCount}`}
              size={size}
              rounded
              className="bg-gray-100"
            />
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
