"use client";
import React, { useState } from "react";
import { cn } from "../utils/utils";
import { RiArrowDownSLine } from "@remixicon/react";

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Accordion({
  type = "single",
  collapsible = true,
  className,
  children,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    if (type === "single") {
      setOpenItems((prev) =>
        prev.includes(value) ? (collapsible ? [] : prev) : [value]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<{
              openItems: string[];
              handleToggle: (value: string) => void;
            }>,
            {
              openItems,
              handleToggle,
            }
          );
        }
        return child;
      })}
    </div>
  );
}

type AccordionItemProps = {
  value: string;
  disabled?: boolean;
  openItems?: string[];
  handleToggle?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({
  value,
  disabled = false,
  openItems,
  handleToggle,
  children,
  className,
}: AccordionItemProps) {
  const isOpen = openItems?.includes(value);

  const toggle = () => {
    if (!disabled && handleToggle) {
      handleToggle(value);
    }
  };

  return (
    <div
      className={cn(
        "bg-white hover:bg-gray-50 rounded-lg shadow transition-all duration-300 ease-in-out",
        disabled
          ? "opacity-50 pointer-events-none select-none"
          : "cursor-pointer",
          isOpen ? "border border-gray-300" : "border",
        className
      )}
    >
      <div
        className="font-semibold transition-all duration-300 ease-in-out"
        onClick={toggle}
      >
        {children && Array.isArray(children) ? (
          <>
            {React.cloneElement(children[0] as React.ReactElement, { isOpen })}
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className={cn("")}>{children[1]}</div>
              </div>
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

type AccordionTriggerProps = {
  isOpen?: boolean;
  children: React.ReactNode;
};

export function AccordionTrigger({ isOpen, children }: AccordionTriggerProps) {
  return (
    <div className="flex p-3.5 justify-between items-center text-sm font-semibold transition-all delay-150 ease-in">
      {children}
      <span
        className={cn(
          "transition-transform duration-300 transform",
          isOpen ? "rotate-180" : "rotate-0"
        )}
      >
        <RiArrowDownSLine size={18} />
      </span>
    </div>
  );
}

type AccordionContentProps = {
  isOpen?: boolean;
  children: React.ReactNode;
};

export function AccordionContent({ isOpen, children }: AccordionContentProps) {
  return (
    <div
      className={cn(
        "w-full font-normal px-3.5 pb-3.5 text-sm overflow-hidden transition-all duration-500 ease-in",
        !isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
      )}
    >
      {children}
    </div>
  );
}
