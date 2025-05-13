import React, { useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import { cn } from "../utils/utils";

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
  const [openItems, setOpenItems] = useState<string[]>(() => {
    const defaultOpen: string[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Get the trigger element from AccordionItem children
        const triggerChild = React.Children.toArray(child.props.children)[0];
        if (
          React.isValidElement(triggerChild) &&
          triggerChild.props.defaultOpen
        ) {
          defaultOpen.push((child.props as AccordionItemProps).value);
        }
      }
    });
    return defaultOpen;
  });

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
    <div className={className} role="region" aria-label="Accordion">
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
  const headerId = `accordion-header-${value}`;
  const contentId = `accordion-content-${value}`;

  const toggle = () => {
    if (!disabled && handleToggle) {
      handleToggle(value);
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow transition-all duration-300 ease-in-out",
        disabled ? "opacity-50 pointer-events-none select-none" : "",
        isOpen ? "border border-gray-300" : "border",
        className
      )}
    >
      {children && Array.isArray(children) ? (
        <>
          <div
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={isOpen}
            aria-disabled={disabled}
            aria-controls={contentId}
            id={headerId}
            className="cursor-pointer"
          >
            {React.cloneElement(children[0] as React.ReactElement, { isOpen })}
          </div>
          <div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden">{children[1]}</div>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}

type AccordionTriggerProps = {
  isOpen?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  triggerIcon?: React.ReactNode;
};

export function AccordionTrigger({
  isOpen,
  children,
  className,
  triggerIcon = <RiArrowDownSLine size={18} />,
}: AccordionTriggerProps) {
  return (
    <div
      className={cn(
        "flex p-3.5 text-lg rounded-lg bg-white hover:bg-gray-50 justify-between items-center font-semibold transition-all delay-150 ease-in",
        isOpen ? "bg-gray-100" : "",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "transition-transform duration-300 transform",
          isOpen ? "rotate-180" : "rotate-0"
        )}
        aria-hidden="true"
      >
        {triggerIcon}
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
