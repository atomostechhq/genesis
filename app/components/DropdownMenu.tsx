"use client";

import { RiArrowDownSLine } from "@remixicon/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../utils/utils";

/* ─────────────────────────────
   Types
───────────────────────────── */
type DropdownAlignment =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "start"
  | "end";

/* ─────────────────────────────
   Root DropdownMenu
───────────────────────────── */
export default function DropdownMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemsCountRef = useRef(0);

  const registerItem = useCallback(() => {
    const idx = itemsCountRef.current;
    itemsCountRef.current += 1;
    return idx;
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  /* Outside click */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !contentRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeMenu();
          triggerRef.current?.focus();
          break;

        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((p) =>
            p < itemsCountRef.current - 1 ? p + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((p) =>
            p > 0 ? p - 1 : itemsCountRef.current - 1
          );
          break;

        case "Home":
          setFocusedIndex(0);
          break;

        case "End":
          setFocusedIndex(itemsCountRef.current - 1);
          break;
      }
    };

    document.addEventListener("keydown", handler);
    setFocusedIndex(0);

    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  /* Focus active item */
  useEffect(() => {
    if (!isOpen) return;
    menuItemsRef.current[focusedIndex]?.focus();
  }, [focusedIndex, isOpen]);

  /* Clone children with dropdownProps */
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as React.ReactElement<any>, {
      dropdownProps: {
        isOpen,
        setIsOpen,
        triggerRef,
        contentRef,
        registerItem,
        menuItemsRef,
      },
    });
  });

  return <div className="relative inline-block">{childrenWithProps}</div>;
}

/* ─────────────────────────────
   Trigger
───────────────────────────── */
export function DropdownMenuTrigger({ children, dropdownProps }: any) {
  const { isOpen, setIsOpen, triggerRef } = dropdownProps ?? {};

  return (
    <div
      ref={triggerRef}
      tabIndex={0}
      role="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => setIsOpen?.(!isOpen)}
      className="cursor-pointer outline-none focus:ring-2 focus:ring-primary-500 rounded"
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────
   Content
───────────────────────────── */
export function DropdownMenuContent({
  children,
  align = "right",
  className,
  dropdownProps,
}: any) {
  const { isOpen, contentRef } = dropdownProps ?? {};
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else setTimeout(() => setVisible(false), 150);
  }, [isOpen]);

  if (!visible) return null;

  const pos =
    align === "left" || align === "start"
      ? "right-0"
      : align === "right" || align === "end"
      ? "left-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "";

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "absolute mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 transition-all",
        isOpen ? "opacity-100" : "opacity-0 -translate-y-2",
        pos,
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────
   Label
───────────────────────────── */
export function DropdownMenuLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-2 text-sm font-semibold text-gray-700">
      {children}
    </div>
  );
}

/* ─────────────────────────────
   Separator
───────────────────────────── */
export function DropdownMenuSeparator() {
  return <div className="my-1 border-t border-gray-100" />;
}

/* ─────────────────────────────
   Item Wrapper
───────────────────────────── */
function DropdownMenuItemWrapper({
  children,
  onClick,
  onKeyDown,
  disabled,
  className,
  dropdownProps,
  "aria-expanded": ariaExpanded,
}: any) {
  const [index] = useState(() => dropdownProps?.registerItem?.() ?? -1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index >= 0 && dropdownProps?.menuItemsRef) {
      dropdownProps.menuItemsRef.current[index] = ref.current;
    }
  }, [index, dropdownProps]);

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-expanded={ariaExpanded}
      aria-disabled={disabled}
      onClick={() => !disabled && onClick?.()}
      onKeyDown={onKeyDown}
      className={cn(
        "px-4 py-2 text-sm flex justify-between cursor-pointer rounded",
        disabled ? "text-gray-400" : "hover:bg-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────
   Item
───────────────────────────── */
export function DropdownMenuItem({
  children,
  onClick,
  disabled,
  dropdownProps,
}: any) {
  return (
    <DropdownMenuItemWrapper
      disabled={disabled}
      onClick={() => {
        onClick?.();
        dropdownProps?.setIsOpen(false);
      }}
      dropdownProps={dropdownProps}
    >
      {children}
    </DropdownMenuItemWrapper>
  );
}

/* ─────────────────────────────
   Submenu
───────────────────────────── */
export function DropdownMenuSub({ children }: any) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as React.ReactElement<any>, {
      submenuProps: { isSubOpen, setIsSubOpen },
    });
  });

  return <div className="relative">{childrenWithProps}</div>;
}

export function DropdownMenuSubTrigger({
  children,
  submenuProps,
  dropdownProps,
}: any) {
  return (
    <DropdownMenuItemWrapper
      dropdownProps={dropdownProps}
      aria-expanded={submenuProps?.isSubOpen}
      onClick={() => submenuProps?.setIsSubOpen(!submenuProps?.isSubOpen)}
    >
      <span>{children}</span>
      <RiArrowDownSLine
        className={cn(
          "w-4 h-4 transition-transform",
          submenuProps?.isSubOpen && "rotate-180"
        )}
      />
    </DropdownMenuItemWrapper>
  );
}

export function DropdownMenuSubContent({
  children,
  submenuProps,
}: any) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        submenuProps?.isSubOpen
          ? "max-h-[300px] opacity-100"
          : "max-h-0 opacity-0"
      )}
    >
      {children}
    </div>
  );
}
