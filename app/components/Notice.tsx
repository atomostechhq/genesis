import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import ListCheckIcon from "remixicon-react/ListCheckIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon";
import QuestionLineIcon from "remixicon-react/QuestionLineIcon";
import ThumbUpLineIcon from "remixicon-react/ThumbUpLineIcon";
import ShieldCheckLineIcon from "remixicon-react/ShieldCheckLineIcon";

interface VariantIconProps {
  variant: "success" | "warning" | "info" | "error" | "default";
}

const VariantIcon = ({ variant }: VariantIconProps) => {
  switch (variant) {
    case "success":
      return (
        <span>
          <ThumbUpLineIcon size={20} color="#039855" />
        </span>
      );
    case "warning":
      return (
        <span>
          <QuestionLineIcon color="#F79009" size={20} />
        </span>
      );
    case "info":
      return (
        <span>
          <ErrorWarningLineIcon color="#1570EF" size={20} />
        </span>
      );
    case "error":
      return (
        <span>
          <AlertFillIcon color="#F04438" size={20} />
        </span>
      );
    default:
      return (
        <span>
          <ShieldCheckLineIcon color="#475467" size={20} />
        </span>
      );
  }
};

interface NoticeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noticeVariants> {
  children: ReactNode;
  noticeTitle?: string;
  variant: "success" | "warning" | "info" | "error" | "default";
  position?: "top" | "bottom";
  showIcon?: boolean;
  open?: boolean;
  setOpen?: any
}

const noticeVariants = cva("p-4 w-fit rounded-[6px]", {
  variants: {
    variant: {
      success: "bg-success-25 border border-success-600",
      warning: "bg-warning-25 border border-warning-600",
      info: "bg-brand-25 border border-brand-600",
      error: "bg-error-25 border border-error-600",
      default: "bg-gray-25 border border-gray-600",
    },
    position: {
      top: "top-4 transition-all duration-700 left-[35%]",
      bottom: "bottom-4 transition-all duration-700 right-4",
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
          )}
        >
          <div className="relative">
            {showIcon ? (
              noticeTitle == "" ? (
                <div className="flex items-start">
                  <VariantIcon variant={variant} />
                  <span className="ml-2 mr-8 text-text-sm">{children}</span>
                  <span

                    onClick={handleClose}
                  >
                    <CloseLineIcon size={20} />
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
                    <CloseLineIcon size={20} />
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
                  <CloseLineIcon
                    size={20}
                  />
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

export default Notice