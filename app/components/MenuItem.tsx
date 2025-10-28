"use client";
import { RiArrowDownSLine } from "@remixicon/react";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "../utils/utils";

// ─────────────────────────────
// Root DropdownMenu
// ─────────────────────────────
interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, {
          isOpen,
          setIsOpen,
        })
      : child
  );

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {childrenWithProps}
    </div>
  );
}

// ─────────────────────────────
// Trigger
// ─────────────────────────────
interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export function DropdownMenuTrigger({
  children,
  isOpen,
  setIsOpen,
}: DropdownMenuTriggerProps) {
  return (
    <div onClick={() => setIsOpen?.(!isOpen)} className="cursor-pointer">
      {children}
    </div>
  );
}

// ─────────────────────────────
// Content (with alignment + animation)
// ─────────────────────────────
interface DropdownMenuContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  align?: "left" | "right" | "top" | "bottom" | "center" | string;
}

export function DropdownMenuContent({
  children,
  isOpen,
  className = "",
  align = "right",
}: DropdownMenuContentProps) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  const alignmentClasses =
    align === "left"
      ? "right-0 top-full mt-2"
      : align === "right"
      ? "left-0 top-full mt-2"
      : align === "top"
      ? "bottom-10 mb-2"
      : align === "bottom"
      ? "top-full mt-2"
      : align === "center"
      ? "left-1/2 transform -translate-x-1/2 top-full mt-2"
      : "";

  return (
    <div
      className={cn(
        "absolute w-56 rounded-md mt-2  shadow bg-white z-50 transition-all duration-200 ease-out",
        alignmentClasses,
        isOpen ? "border border-primary-600" : "border border-gray-200",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
    >
      <div className="">{children}</div>
    </div>
  );
}

// ─────────────────────────────
// Common Item Wrapper
// ─────────────────────────────
const DropdownMenuItemWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  setIsOpen?: (open: boolean) => void;
}> = ({ children, className = "", onClick, disabled = false, setIsOpen }) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setIsOpen?.(false);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150",
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        className
      )}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────
// Label
// ─────────────────────────────
export function DropdownMenuLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("px-4 py-2 text-sm font-semibold text-gray-700", className)}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────
// Item
// ─────────────────────────────
export function DropdownMenuItem({
  children,
  className = "",
  onClick,
  disabled,
  setIsOpen,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  setIsOpen?: (open: boolean) => void;
}) {
  return (
    <DropdownMenuItemWrapper
      className={className}
      onClick={onClick}
      disabled={disabled}
      setIsOpen={setIsOpen}
    >
      {children}
    </DropdownMenuItemWrapper>
  );
}

// ─────────────────────────────
// Separator
// ─────────────────────────────
export function DropdownMenuSeparator({
  className = "",
}: {
  className?: string;
}) {
  return <div className={cn("border-t border-gray-100", className)} />;
}

// ─────────────────────────────
// Inline Submenu
// ─────────────────────────────
interface DropdownMenuSubProps {
  children: React.ReactNode;
}

export function DropdownMenuSub({ children }: DropdownMenuSubProps) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const childArray = React.Children.toArray(children);
  const trigger = childArray.find(
    (child: any) =>
      React.isValidElement(child) && child.type === DropdownMenuSubTrigger
  );
  const content = childArray.find(
    (child: any) =>
      React.isValidElement(child) && child.type === DropdownMenuSubContent
  );

  return (
    <div className="w-full">
      {trigger &&
        React.cloneElement(trigger as React.ReactElement, {
          isSubOpen,
          setIsSubOpen,
        })}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isSubOpen
            ? "max-h-[500px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        )}
      >
        {isSubOpen && content}
      </div>
    </div>
  );
}

// ─────────────────────────────
// Sub Trigger
// ─────────────────────────────
interface DropdownMenuSubTriggerProps {
  children: React.ReactNode;
  isSubOpen?: boolean;
  setIsSubOpen?: (open: boolean) => void;
}

export function DropdownMenuSubTrigger({
  children,
  isSubOpen,
  setIsSubOpen,
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuItemWrapper onClick={() => setIsSubOpen?.(!isSubOpen)}>
      <span className="flex-1">{children}</span>
      <RiArrowDownSLine
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          isSubOpen ? "rotate-180" : ""
        )}
      />
    </DropdownMenuItemWrapper>
  );
}

// ─────────────────────────────
// Sub Content
// ─────────────────────────────
interface DropdownMenuSubContentProps {
  children: React.ReactNode;
}

export function DropdownMenuSubContent({
  children,
}: DropdownMenuSubContentProps) {
  return <div className="bg-gray-50">{children}</div>;
}
