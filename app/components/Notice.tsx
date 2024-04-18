import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/utils";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import ListCheckIcon from "remixicon-react/ListCheckIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

interface VariantIconProps {
  variant: "success" | "warning" | "info" | "error" | "default";
}

const VariantIcon = ({ variant }: VariantIconProps) => {
  switch (variant) {
    case "success":
      return (
        <span>
          <AlertFillIcon size={20} color="green" />
        </span>
      );
    case "warning":
      return (
        <span>
          <ListCheckIcon size={20} />
        </span>
      );
    case "info":
      return (
        <span>
          <AlertFillIcon size={20} />
        </span>
      );
    case "error":
      return (
        <span>
          <ListCheckIcon size={20} />
        </span>
      );
    default:
      return (
        <span>
          <AlertFillIcon size={20} />
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
  setOpen?: any;
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
      top: "top-4 left-[35%]",
      bottom: "bottom-4 right-4",
    },
  },
});

export const Notice = ({
  children,
  variant,
  position,
  noticeTitle,
  open,
  setOpen,
  showIcon = true,
}: NoticeProps) => {
  return (
    <>
      {open && (
        <div
          className={cn(
            noticeVariants({ variant, position }),
            "fixed transition-all duration-500"
          )}
        >
          <div className="relative">
            {showIcon ? (
              noticeTitle == "" ? (
                <div className="flex">
                  <VariantIcon variant={variant} />
                  <span className="ml-2 mr-4 text-text-sm">{children}</span>
                  <span className="" onClick={(prev) => setOpen(!prev)}>
                    <CloseLineIcon size={20} />
                  </span>
                </div>
              ) : (
                <div className="">
                  <section className="flex">
                    <VariantIcon variant={variant} />
                    <div className="ml-2 mr-4">
                      <span className="font-bold text-gray-800 mb-1">
                        {noticeTitle}
                      </span>
                      <p className="text-text-sm">{children}</p>
                    </div>
                  </section>
                  <span
                    className="absolute top-0 right-1 cursor-pointer"
                    onClick={(prev) => setOpen(!prev)}
                  >
                    <CloseLineIcon size={20} />
                  </span>
                </div>
              )
            ) : (
              <div className="mr-4">
                <section className="flex items-center">
                  <p className="font-bold text-gray-800 mb-1">{noticeTitle}</p>
                </section>
                <span
                  className="absolute top-0 right-1 cursor-pointer"
                  onClick={(prev) => setOpen(!prev)}
                >
                  <CloseLineIcon size={20} />
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
