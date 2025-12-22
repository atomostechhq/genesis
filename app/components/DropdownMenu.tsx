"use client";
import { RiArrowDownSLine } from "@remixicon/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../utils/utils";

// ─────────────────────────────
// Types
// ─────────────────────────────
type DropdownAlignment =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "start"
  | "end";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  itemsCount: number;
  registerItem: () => number;
  menuItemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const DropdownContext = React.createContext<DropdownContextType | null>(null);

// ─────────────────────────────
// Root DropdownMenu
// ─────────────────────────────
export default function DropdownMenu({ children }: { children: React.ReactNode }) {
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

  // ── Outside click handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !contentRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // ── Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          closeMenu();
          triggerRef.current?.focus();
          break;

        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < itemsCountRef.current - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : itemsCountRef.current - 1
          );
          break;

        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          break;

        case "End":
          event.preventDefault();
          setFocusedIndex(itemsCountRef.current - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKey);
    setFocusedIndex(0);

    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Focus current active item
  useEffect(() => {
    if (!isOpen) return;
    const el = menuItemsRef.current[focusedIndex];
    if (el) el.focus();
  }, [focusedIndex, isOpen]);

  const contextValue: DropdownContextType = {
    isOpen,
    setIsOpen,
    triggerRef,
    contentRef,
    focusedIndex,
    setFocusedIndex,
    itemsCount: itemsCountRef.current,
    registerItem,
    menuItemsRef,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

// ─────────────────────────────
// Trigger
// ─────────────────────────────
export function DropdownMenuTrigger({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}) {
  const ctx = React.useContext(DropdownContext);
  const actualIsOpen = ctx?.isOpen ?? isOpen;
  const actualSetIsOpen = ctx?.setIsOpen ?? setIsOpen;

  const handleKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        actualSetIsOpen?.(!actualIsOpen);
        break;
      case "ArrowDown":
        e.preventDefault();
        actualSetIsOpen?.(true);
        break;
      case "ArrowUp":
        e.preventDefault();
        actualSetIsOpen?.(true);
        break;
    }
  };

  return (
    <div
      ref={ctx?.triggerRef}
      tabIndex={0}
      role="button"
      aria-haspopup="menu"
      aria-expanded={actualIsOpen}
      onClick={() => actualSetIsOpen?.(!actualIsOpen)}
      onKeyDown={handleKey}
      className="cursor-pointer outline-none focus:ring-2 focus:ring-primary-500 rounded"
    >
      {children}
    </div>
  );
}

// ─────────────────────────────
// Content
// ─────────────────────────────
export function DropdownMenuContent({
  children,
  isOpen,
  align = "right",
  className = "",
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  align?: DropdownAlignment;
}) {
  const ctx = React.useContext(DropdownContext);
  const actualIsOpen = ctx?.isOpen ?? isOpen;
  const [visible, setVisible] = useState(actualIsOpen);

  useEffect(() => {
    if (actualIsOpen) setVisible(true);
    else setTimeout(() => setVisible(false), 150);
  }, [actualIsOpen]);

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
      ref={ctx?.contentRef}
      role="menu"
      className={cn(
        "absolute w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all",
        actualIsOpen ? "opacity-100" : "opacity-0 -translate-y-2",
        pos,
        className
      )}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────
// Internal Item Wrapper
// ─────────────────────────────
function DropdownMenuItemWrapper({
  children,
  onClick,
  onKeyDown,
  disabled,
  isSubTrigger,
  className,
  "aria-expanded": ariaExpanded,
}: any) {
  const ctx = React.useContext(DropdownContext);
  const [index] = useState(() => ctx?.registerItem() ?? -1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ctx && index >= 0) {
      ctx.menuItemsRef.current[index] = ref.current;
    }
  }, [index, ctx]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (onKeyDown) onKeyDown(e);

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) onClick?.();
    }
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-expanded={ariaExpanded}
      onClick={() => !disabled && onClick?.()}
      onKeyDown={handleKey}
      className={cn(
        "px-4 py-2 flex items-center justify-between text-sm cursor-pointer rounded",
        disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100",
        className
      )}
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
  shortcut,
}: any) {
  const ctx = React.useContext(DropdownContext);

  return (
    <DropdownMenuItemWrapper
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick?.();
          ctx?.setIsOpen(false);
        }
      }}
      className={className}
    >
      <span>{children}</span>
      {shortcut && <kbd className="text-xs text-gray-400">{shortcut}</kbd>}
    </DropdownMenuItemWrapper>
  );
}

// ─────────────────────────────
// Label
// ─────────────────────────────
export function DropdownMenuLabel({ children }: any) {
  return (
    <div className="px-4 py-2 text-sm font-semibold text-gray-700">
      {children}
    </div>
  );
}

// ─────────────────────────────
// Separator
// ─────────────────────────────
export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-100 my-1" />;
}

// ─────────────────────────────
// Submenu
// ─────────────────────────────
const SubmenuContext = React.createContext<any>(null);

export function DropdownMenuSub({ children }: any) {
  const [isSubOpen, setIsSubOpen] = useState(false);
  return (
    <SubmenuContext.Provider value={{ isSubOpen, setIsSubOpen }}>
      <div className="relative">{children}</div>
    </SubmenuContext.Provider>
  );
}

// ─────────────────────────────
// Sub Trigger
// ─────────────────────────────
export function DropdownMenuSubTrigger({ children }: any) {
  const sub = React.useContext(SubmenuContext);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      sub.setIsSubOpen(true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      sub.setIsSubOpen(false);
    }
  };

  return (
    <DropdownMenuItemWrapper
      isSubTrigger
      aria-expanded={sub.isSubOpen}
      onClick={() => sub.setIsSubOpen(!sub.isSubOpen)}
      onKeyDown={handleKey}
    >
      <span className="flex-1">{children}</span>
      <RiArrowDownSLine
        className={cn(
          "w-4 h-4 transition-transform",
          sub.isSubOpen && "rotate-180"
        )}
      />
    </DropdownMenuItemWrapper>
  );
}

// ─────────────────────────────
// Sub Content
// ─────────────────────────────
export function DropdownMenuSubContent({ children }: any) {
  const sub = React.useContext(SubmenuContext);

  return (
    <div
      className={cn(
        "overflow-hidden bg-gray-50 transition-all",
        sub.isSubOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      {children}
    </div>
  );
}
