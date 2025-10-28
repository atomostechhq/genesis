import { cva, type VariantProps } from "class-variance-authority";
import React, {
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/utils";

interface TypographyProps
  extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof typographyVariant> {
  as?: ElementType;
  children: ReactNode;
  intent?: "primary" | "success" | "error" | "warning" | "default";
}

const typographyVariant = cva("text-dark", {
  variants: {
    variant: {
      h1: "text-8xl leading-[144px] font-bold",
      h2: "text-7xl leading-[90px] font-bold",
      h3: "text-5xl leading-[72px] font-bold",
      h4: "text-[32px] leading-[48px] font-bold",
      h5: "text-2xl leading-9 font-bold",
      h6: "text-xl leading-[30px] font-semibold",

      b1: "text-xl font-normal leading-7", // 20px
      b2: "text-lg font-normal leading-6", // 18px
      b3: "text-base font-normal leading-5", // 16px
      b4: "text-sm font-normal leading-4", // 14px
      b5: "text-xs font-normal leading-3", // 12px
    },
    intent: {
      primary: "text-primary-600",
      success: "text-success-600",
      error: "text-error-600",
      warning: "text-warning-600",
      default: "text-black",
    },
  },
  defaultVariants: {
    variant: "h1",
    intent: "default",
  },
});

const Typography = ({
  as,
  variant = "h1",
  intent = "default",
  children,
  className,
  ...props
}: TypographyProps) => {
  const Component =
    as || (variant?.startsWith("b") ? "p" : (variant as ElementType));
  return (
    <Component
      className={cn(typographyVariant({ variant, intent, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
