"use client";
import { RiArrowDownSLine } from "@remixicon/react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../utils/utils";

// ─────────────────────────────
// Types and Constants
// ─────────────────────────────
type DropdownAlignment = "left" | "right" | "top" | "bottom" | "center" | "start" | "end";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  itemsCount: number;
  registerItem: () => number;
  unregisterItem: (index: number) => void;
  menuItemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const DropdownContext = React.createContext<DropdownContextType | null>(null);

// ─────────────────────────────
// Root DropdownMenu
// ─────────────────────────────
interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [items, setItems] = useState<number[]>([]);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const registerItem = useCallback(() => {
    const newIndex = items.length;
    setItems(prev => [...prev, newIndex]);
    return newIndex;
  }, [items.length]);

  const unregisterItem = useCallback((index: number) => {
    setItems(prev => prev.filter(i => i !== index));
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current && 
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;

        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
          break;

        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : items.length - 1
          );
          break;

        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          break;

        case "End":
          event.preventDefault();
          setFocusedIndex(items.length - 1);
          break;

        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus first item when opening
      if (items.length > 0) {
        setFocusedIndex(0);
      }
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length]);

  // Focus the current item when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  const contextValue: DropdownContextType = {
    isOpen,
    setIsOpen,
    triggerRef,
    contentRef,
    focusedIndex,
    setFocusedIndex,
    itemsCount: items.length,
    registerItem,
    unregisterItem,
    menuItemsRef,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
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

export function DropdownMenuTrigger({ children, isOpen, setIsOpen }: DropdownMenuTriggerProps) {
  const context = React.useContext(DropdownContext);
  
  const actualIsOpen = context?.isOpen ?? isOpen;
  const actualSetIsOpen = context?.setIsOpen ?? setIsOpen;
  const triggerRef = context?.triggerRef;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        actualSetIsOpen?.(!actualIsOpen);
        break;
      case "ArrowDown":
        event.preventDefault();
        actualSetIsOpen?.(true);
        // Focus first item immediately
        setTimeout(() => {
          context?.setFocusedIndex(0);
        }, 0);
        break;
      case "ArrowUp":
        event.preventDefault();
        actualSetIsOpen?.(true);
        // Focus last item immediately
        setTimeout(() => {
          if (context?.itemsCount) {
            context.setFocusedIndex(context.itemsCount - 1);
          }
        }, 0);
        break;
    }
  };

  return (
    <div
      ref={triggerRef}
      onClick={() => actualSetIsOpen?.(!actualIsOpen)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="menu"
      aria-expanded={actualIsOpen}
      aria-controls="dropdown-menu-content"
      className="cursor-pointer outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
    >
      {children}
    </div>
  );
}

// ─────────────────────────────
// Content
// ─────────────────────────────
interface DropdownMenuContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  align?: DropdownAlignment;
}

export function DropdownMenuContent({
  children,
  isOpen,
  className = "",
  align = "right",
}: DropdownMenuContentProps) {
  const context = React.useContext(DropdownContext);
  const [visible, setVisible] = useState(isOpen);

  const actualIsOpen = context?.isOpen ?? isOpen;
  const contentRef = context?.contentRef;

  useEffect(() => {
    if (actualIsOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [actualIsOpen]);

  if (!visible && !actualIsOpen) return null;

  const alignmentClasses =
    align === "left" || align === "start"
      ? "right-0 top-full mt-2"
      : align === "right" || align === "end"
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
      ref={contentRef}
      id="dropdown-menu-content"
      role="menu"
      aria-orientation="vertical"
      className={cn(
        "absolute w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ease-out",
        alignmentClasses,
        actualIsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
      style={{ 
        visibility: visible ? 'visible' : 'hidden' 
      }}
    >
      <div role="none">{children}</div>
    </div>
  );
}

// ─────────────────────────────
// Common Item Wrapper
// ─────────────────────────────
interface DropdownMenuItemWrapperProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  disabled?: boolean;
  isSubTrigger?: boolean;
  index?: number;
  'aria-expanded'?: boolean;
}

const DropdownMenuItemWrapper: React.FC<DropdownMenuItemWrapperProps> = ({ 
  children, 
  className = "", 
  onClick, 
  onKeyDown,
  disabled = false, 
  isSubTrigger = false,
  index,
  'aria-expanded': ariaExpanded
}) => {
  const context = React.useContext(DropdownContext);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const itemRef = useRef<HTMLDivElement>(null);

  const setIsOpen = context?.setIsOpen;
  const focusedIndex = context?.focusedIndex;
  const setFocusedIndex = context?.setFocusedIndex;
  const registerItem = context?.registerItem;
  const unregisterItem = context?.unregisterItem;
  const menuItemsRef = context?.menuItemsRef;

  useEffect(() => {
    if (registerItem && unregisterItem && index === undefined) {
      const newIndex = registerItem();
      setItemIndex(newIndex);
      return () => unregisterItem(newIndex);
    }
  }, [registerItem, unregisterItem, index]);

  const currentIndex = index ?? itemIndex;

  // Register item with menuItemsRef for focus management
  useEffect(() => {
    if (menuItemsRef && currentIndex >= 0 && itemRef.current) {
      menuItemsRef.current[currentIndex] = itemRef.current;
      return () => {
        menuItemsRef.current[currentIndex] = null;
      };
    }
  }, [menuItemsRef, currentIndex]);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    if (!isSubTrigger && setIsOpen) {
      setIsOpen(false);
    }
  };

  const handleKeyDownInternal = (event: React.KeyboardEvent) => {
    if (disabled) return;

    onKeyDown?.(event);

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleClick();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (setFocusedIndex && context?.itemsCount) {
          const nextIndex = (currentIndex + 1) % context.itemsCount;
          setFocusedIndex(nextIndex);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (setFocusedIndex && context?.itemsCount) {
          const prevIndex = (currentIndex - 1 + context.itemsCount) % context.itemsCount;
          setFocusedIndex(prevIndex);
        }
        break;
      case "ArrowRight":
        if (isSubTrigger) {
          event.preventDefault();
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen?.(false);
        break;
      case "Tab":
        event.preventDefault();
        setIsOpen?.(false);
        break;
    }
  };

  return (
    <div
      ref={itemRef}
      role="menuitem"
      tabIndex={disabled ? -1 : 0} // Always tabbable when not disabled
      aria-disabled={disabled}
      aria-expanded={ariaExpanded}
      onClick={handleClick}
      onKeyDown={handleKeyDownInternal}
      className={cn(
        "flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150 outline-none",
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:ring-2 focus:ring-primary-500 focus:ring-inset",
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
      role="presentation"
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
  shortcut,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  setIsOpen?: (open: boolean) => void;
  shortcut?: string;
}) {
  const context = React.useContext(DropdownContext);
  
  const actualSetIsOpen = context?.setIsOpen ?? setIsOpen;

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    actualSetIsOpen?.(false);
  };

  return (
    <DropdownMenuItemWrapper
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="flex items-center justify-between w-full">
        <span>{children}</span>
        {shortcut && (
          <kbd className="ml-4 text-xs text-gray-400 font-mono">
            {shortcut}
          </kbd>
        )}
      </div>
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
  return (
    <div 
      role="separator" 
      className={cn("border-t border-gray-100", className)} 
    />
  );
}

// ─────────────────────────────
// Submenu Context
// ─────────────────────────────
const SubmenuContext = React.createContext<{
  isSubOpen: boolean;
  setIsSubOpen: (open: boolean) => void;
} | null>(null);

// ─────────────────────────────
// Inline Submenu
// ─────────────────────────────
interface DropdownMenuSubProps {
  children: React.ReactNode;
}

export function DropdownMenuSub({ children }: DropdownMenuSubProps) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <SubmenuContext.Provider value={{ isSubOpen, setIsSubOpen }}>
      <div className="w-full relative">
        {children}
      </div>
    </SubmenuContext.Provider>
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
  const subContext = React.useContext(SubmenuContext);
  
  const actualIsSubOpen = subContext?.isSubOpen ?? isSubOpen;
  const actualSetIsSubOpen = subContext?.setIsSubOpen ?? setIsSubOpen;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      actualSetIsSubOpen?.(true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      actualSetIsSubOpen?.(false);
    }
  };

  return (
    <DropdownMenuItemWrapper
      isSubTrigger={true}
      onClick={() => actualSetIsSubOpen?.(!actualIsSubOpen)}
      onKeyDown={handleKeyDown}
      aria-expanded={actualIsSubOpen}
    >
      <span className="flex-1">{children}</span>
      <RiArrowDownSLine
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          actualIsSubOpen ? "rotate-180" : ""
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
  const subContext = React.useContext(SubmenuContext);
  const { isSubOpen } = subContext || {};

  return (
    <div
      className={cn(
        "bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out",
        isSubOpen
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
      )}
    >
      {children}
    </div>
  );
}