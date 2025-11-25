// import React, { ReactNode, HTMLAttributes } from "react";
// import { cn } from "../utils/utils";
// import { cva, VariantProps } from "class-variance-authority";

// interface ChipProps
//   extends HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof chipVariants> {
//   children: ReactNode;
//   dot?: boolean;
//   dotColor?: string;
//   startIcon?: JSX.Element;
//   endIcon?: JSX.Element;
// }

// const chipVariants = cva(
//   "rounded-full capitalize flex items-center w-fit gap-2",
//   {
//     variants: {
//       intent: {
//         default: "bg-gray-50 text-gray-600",
//         success: "bg-success-50 text-success-600",
//         warning: "bg-warning-50 text-warning-500",
//         error: "bg-error-50 text-error-600",
//         blue: "bg-blue-100 text-blue-700",
//         primary: "bg-primary-100 text-primary-700",
//         bluegray: "bg-bluegray-100 text-bluegray-500",
//         bluelight: "bg-bluelight-100 text-bluelight-600",
//         violet: "bg-violet-50 text-violet-700",
//         indigo: "bg-indigo-100 text-indigo-700",
//         purple: "bg-purple-50 text-purple-700",
//         pink: "bg-pink-25 text-pink-700",
//         rose: "bg-rose-50 text-rose-600",
//         orange: "bg-orange-50 text-orange-600",
//       },
//       size: {
//         sm: "text-xs px-2 py-0.5",
//         md: "text-sm px-2.5 py-0.5",
//         lg: "text-base px-3 py-1",
//       },
//     },
//     defaultVariants: {
//       intent: "default",
//       size: "md",
//     },
//   }
// );

// const dotColorVariants: Record<string, string> = {
//   default: "bg-gray-600",
//   success: "bg-success-600",
//   warning: "bg-warning-600",
//   error: "bg-error-600",
//   blue: "bg-blue-600",
//   primary: "bg-primary-600",
//   bluegray: "bg-bluegray-500",
//   bluelight: "bg-bluelight-600",
//   violet: "bg-violet-700",
//   indigo: "bg-indigo-700",
//   purple: "bg-purple-700",
//   pink: "bg-pink-700",
//   rose: "bg-rose-600",
//   orange: "bg-orange-600",
// };

// const Chip = ({
//   children,
//   className,
//   size,
//   intent = "default",
//   dot,
//   dotColor,
//   startIcon,
//   endIcon,
// }: ChipProps) => {
//   const resolvedIntent = intent ?? "default";

//   return (
//     <div
//       className={cn(chipVariants({ intent: resolvedIntent, size }), className)}
//     >
//       {startIcon
//         ? startIcon
//         : dot && (
//             <span
//               className={cn(
//                 "w-1.5 h-1.5 rounded-full",
//                 dotColor || dotColorVariants[resolvedIntent] || "bg-primary-600" // Default fallback
//               )}
//             ></span>
//           )}
//       <span>{children}</span>
//       {endIcon}
//     </div>
//   );
// };

// export default Chip;




import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "../utils/utils";
import { cva, VariantProps } from "class-variance-authority";

interface ChipProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  children: ReactNode;
  dot?: boolean;
  dotColor?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const chipVariants = cva(
  "inline-flex items-center w-fit gap-2 rounded-full capitalize",
  {
    variants: {
      intent: {
        default: "bg-gray-50 text-gray-600",
        success: "bg-success-50 text-success-600",
        warning: "bg-warning-50 text-warning-500",
        error: "bg-error-50 text-error-600",
        blue: "bg-blue-100 text-blue-700",
        primary: "bg-primary-100 text-primary-700",
        bluegray: "bg-bluegray-100 text-bluegray-500",
        bluelight: "bg-bluelight-100 text-bluelight-600",
        violet: "bg-violet-50 text-violet-700",
        indigo: "bg-indigo-100 text-indigo-700",
        purple: "bg-purple-50 text-purple-700",
        pink: "bg-pink-25 text-pink-700",
        rose: "bg-rose-50 text-rose-600",
        orange: "bg-orange-50 text-orange-600",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  }
);

const dotColorVariants: Record<string, string> = {
  default: "bg-gray-600",
  success: "bg-success-600",
  warning: "bg-warning-600",
  error: "bg-error-600",
  blue: "bg-blue-600",
  primary: "bg-primary-600",
  bluegray: "bg-bluegray-500",
  bluelight: "bg-bluelight-600",
  violet: "bg-violet-700",
  indigo: "bg-indigo-700",
  purple: "bg-purple-700",
  pink: "bg-pink-700",
  rose: "bg-rose-600",
  orange: "bg-orange-600",
};

const Chip = ({
  children,
  className,
  size,
  intent = "default",
  dot,
  dotColor,
  startIcon,
  endIcon,
  ...rest
}: ChipProps) => {
  const resolvedIntent = intent ?? "default";

  return (
    <span
      className={cn(chipVariants({ intent: resolvedIntent, size }), className)}
      {...rest}
    >
      {startIcon && (
        <span aria-hidden="true">
          {startIcon}
        </span>
      )}

      {!startIcon && dot && (
        <span
          aria-hidden="true"
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            dotColor ||
              dotColorVariants[resolvedIntent] ||
              "bg-primary-600"
          )}
        />
      )}

      {children}

      {endIcon && (
        <span aria-hidden="true">
          {endIcon}
        </span>
      )}
    </span>
  );
};

export default Chip;

