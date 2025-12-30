import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import React from "react";
import { cn } from "../utils/utils";
import {
  RiAlertFill,
  RiCloseLine,
  RiErrorWarningLine,
  RiQuestionLine,
  RiThumbUpLine,
  RiShieldCheckLine,
} from "@remixicon/react";

interface VariantIconProps {
  variant: "success" | "warning" | "info" | "error" | "default";
}

const VariantIcon = ({ variant }: VariantIconProps) => {
  switch (variant) {
    case "success":
      return (
        <span>
          <RiThumbUpLine size={20} color="#039855" />
        </span>
      );
    case "warning":
      return (
        <span>
          <RiQuestionLine color="#F79009" size={20} />
        </span>
      );
    case "info":
      return (
        <span>
          <RiErrorWarningLine color="#1570EF" size={20} />
        </span>
      );
    case "error":
      return (
        <span>
          <RiAlertFill color="#F04438" size={20} />
        </span>
      );
    default:
      return (
        <span>
          <RiShieldCheckLine color="#475467" size={20} />
        </span>
      );
  }
};

interface NoticeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noticeVariants> {
  children?: ReactNode;
  noticeTitle?: string;
  variant: "success" | "warning" | "info" | "error" | "default";
  position?: "top" | "bottom" | "center";
  showIcon?: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const noticeVariants = cva("p-4 w-fit rounded-[6px]", {
  variants: {
    variant: {
      success: "bg-success-25 border border-success-600",
      warning: "bg-warning-25 border border-warning-600",
      info: "bg-primary-25 border border-primary-600",
      error: "bg-error-25 border border-error-600",
      default: "bg-gray-25 border border-gray-600",
    },
    position: {
      top: "top-4 transition-all duration-700 m-auto left-0 right-0",
      bottom: "bottom-4 transition-all duration-700 right-4",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
  },
});

const Notice = ({
  children,
  variant,
  position,
  noticeTitle,
  open,
  setOpen,
  showIcon = true,
}: NoticeProps) => {
  const handleClose = () => setOpen(false);
  return (
    <>
      {open && (
        <div
          className={cn(
            noticeVariants({ variant, position }),
            `fixed z-10`,
            position === "top" && open && `animate-slide-in-top`,
            position === "bottom" && open && `animate-slide-in-right`,
            position === "center" && open && `animate-fade-in`
          )}
        >
          <div className="relative">
            {showIcon ? (
              noticeTitle == "" ? (
                <div className="flex items-start">
                  <VariantIcon variant={variant} />
                  <span className="ml-2 mr-8 text-text-sm">{children}</span>
                  <span onClick={handleClose}>
                    <RiCloseLine size={20} />
                  </span>
                </div>
              ) : (
                <div className="">
                  <section className="flex items-start">
                    <VariantIcon variant={variant} />
                    <div className="ml-2 mr-8 -mt-[3px]">
                      <span className="font-bold text-gray-800 mb-1">
                        {noticeTitle}
                      </span>
                      <p className="text-text-sm text-gray-700">{children}</p>
                    </div>
                  </section>
                  <span
                    className={cn("absolute top-0 right-0 cursor-pointer")}
                    onClick={handleClose}
                  >
                    <RiCloseLine size={20} />
                  </span>
                </div>
              )
            ) : (
              <div className="mr-8">
                <section className="flex items-center">
                  <p className="font-bold text-gray-800 mb-1">{noticeTitle}</p>
                </section>
                <span
                  className={cn("absolute top-0 right-0 cursor-pointer")}
                  onClick={handleClose}
                >
                  <RiCloseLine size={20} />
                </span>
                <p className="text-text-sm">{children}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notice;
