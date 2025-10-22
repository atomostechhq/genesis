"use client";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";
import { cn } from "../utils/utils";
import Button from "./Button";
import { RiCloseLine } from "@remixicon/react";

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  className?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  setIsOpen,
  children,
  position = "right",
  width = "w-80",
  height = "h-64",
  className,
  showCloseButton = true,
  closeOnOutsideClick = true,
}) => {
  const handleClose = () => setIsOpen(false);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 z-[10000000000000000]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => closeOnOutsideClick && handleClose()}
      />

      <div
        className={cn(
          "fixed bg-white shadow-xl p-4 transition-transform duration-300 z-[100000000000000000]",
          position === "right" && `top-0 right-0 ${width} h-full`,
          position === "left" && `top-0 left-0 ${width} h-full`,
          position === "top" && `top-0 left-0 w-full ${height}`,
          position === "bottom" && `bottom-0 left-0 w-full ${height}`,
          !isOpen &&
            (position === "right"
              ? "translate-x-full"
              : position === "left"
              ? "-translate-x-full"
              : position === "top"
              ? "-translate-y-full"
              : "translate-y-full"),
          isOpen && "translate-x-0 translate-y-0",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <Button
            size="sm"
            variant="outlined"
            intent="default-outlined"
            onClick={handleClose}
            startIcon={<RiCloseLine size={20} />}
            aria-label="Close drawer"
            className="absolute border-none p-1 transition-colors top-3 right-4"
          />
        )}

        <div className="overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
