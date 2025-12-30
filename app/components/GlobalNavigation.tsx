"use client";
import React, { useEffect, useRef, forwardRef } from "react";
import { cn } from "../utils/utils";

interface GlobalNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  children: React.ReactNode;
  trigger: JSX.Element;
  postion?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const GlobalNavigation = forwardRef<HTMLDivElement, GlobalNavigationProps>(
  (
    {
      isOpen,
      setIsOpen,
      trigger,
      children,
      className,
      postion = "bottom-right",
    },
    ref
  ) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          !triggerRef.current?.contains(event.target as Node) &&
          !contentRef.current?.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    return (
      <div className="relative w-max" ref={ref}>
        <div
          className="cursor-pointer"
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          {trigger}
        </div>
        {isOpen && (
          <div
            ref={contentRef}
            className={cn(
              "absolute z-10 bg-white rounded-lg shadow-sm border min-w-[200px] p-4 transition-all duration-300 ease-in-out",
              postion === "bottom-left" && "left-0 top-4/4",
              postion === "bottom-right" && "top-4/4 right-0",
              postion === "top-left" && "bottom-[57px] left-0",
              postion === "top-right" && "bottom-[57px] right-0",
              className
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

GlobalNavigation.displayName = "GlobalNavigation";

export default GlobalNavigation;
