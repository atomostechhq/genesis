"use client";

import { RiArrowDownSLine } from "@remixicon/react";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
} from "react";
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

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  registerItem: () => number;
  menuItemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  closeMenu: () => void;
}

interface SubmenuProps {
  isSubOpen: boolean;
  setIsSubOpen: (open: boolean) => void;
}

// Helper function to check component type
const isComponentType = (
  child: any,
  component: React.ComponentType<any>
): boolean => {
  return child.type === component;
};

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

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  const dropdownProps: DropdownProps = {
    isOpen,
    setIsOpen,
    triggerRef,
    contentRef,
    registerItem,
    menuItemsRef,
    closeMenu,
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
  }, [isOpen, closeMenu]);

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
          setFocusedIndex((p) => (p < itemsCountRef.current - 1 ? p + 1 : 0));
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((p) => (p > 0 ? p - 1 : itemsCountRef.current - 1));
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
  }, [isOpen, closeMenu]);

  /* Focus active item */
  useEffect(() => {
    if (!isOpen) return;
    menuItemsRef.current[focusedIndex]?.focus();
  }, [focusedIndex, isOpen]);

  /* Enhance children with dropdown props */
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    // Add displayName for identification
    const childWithDisplayName = cloneElement(child as React.ReactElement, {
      ...child.props,
      dropdownProps,
    });

    return childWithDisplayName;
  });

  return <div className="relative inline-block">{enhancedChildren}</div>;
}

/* ─────────────────────────────
   Trigger
───────────────────────────── */
export function DropdownMenuTrigger({
  children,
  dropdownProps,
}: {
  children: React.ReactNode;
  dropdownProps?: DropdownProps;
}) {
  const { isOpen, setIsOpen, triggerRef } = dropdownProps || {};

  if (!dropdownProps) {
    throw new Error("DropdownMenuTrigger must be used inside DropdownMenu");
  }

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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* ─────────────────────────────
   Content
───────────────────────────── */
export function DropdownMenuContent({
  children,
  align = "right",
  className,
  dropdownProps,
}: {
  children: React.ReactNode;
  align?: DropdownAlignment;
  className?: string;
  dropdownProps?: DropdownProps;
}) {
  const { isOpen, contentRef } = dropdownProps || {};
  const [visible, setVisible] = useState(false);

  if (!dropdownProps) {
    throw new Error("DropdownMenuContent must be used inside DropdownMenu");
  }

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  const positionClasses = {
    left: "right-0",
    right: "left-0",
    start: "right-0",
    end: "left-0",
    center: "left-1/2 -translate-x-1/2",
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };

  // Function to recursively inject dropdownProps
  const injectPropsToChildren = (
    children: React.ReactNode
  ): React.ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      // Check if this is a menu item or submenu
      const isMenuItem = isComponentType(child, DropdownMenuItem);
      const isSubMenu = isComponentType(child, DropdownMenuSub);
      if (isMenuItem || isSubMenu) {
        return cloneElement(child as React.ReactElement, {
          ...child.props,
          dropdownProps,
        });
      }

      // If it has children, recursively inject props
      if (child.props.children) {
        return cloneElement(child as React.ReactElement, {
          ...child.props,
          children: injectPropsToChildren(child.props.children),
        });
      }

      return child;
    });
  };

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "absolute mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 transition-all duration-150",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
        positionClasses[align] || positionClasses.right,
        className
      )}
    >
      {injectPropsToChildren(children)}
    </div>
  );
}
DropdownMenuContent.displayName = "DropdownMenuContent";

/* ─────────────────────────────
   Label
───────────────────────────── */
export function DropdownMenuLabel({
  children,
  className,
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
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/* ─────────────────────────────
   Separator
───────────────────────────── */
export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-100" />;
}
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/* ─────────────────────────────
   Item Wrapper
───────────────────────────── */
function DropdownMenuItemWrapper({
  children,
  onClick,
  disabled,
  className,
  dropdownProps,
  closeOnClick = true,
  ariaExpanded,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  dropdownProps?: DropdownProps;
  closeOnClick?: boolean;
  ariaExpanded?: boolean;
}) {
  const [index] = useState(() => dropdownProps?.registerItem?.() ?? -1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index >= 0 && dropdownProps?.menuItemsRef) {
      dropdownProps.menuItemsRef.current[index] = ref.current;
    }
  }, [index, dropdownProps]);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    if (closeOnClick) {
      dropdownProps?.closeMenu();
    }
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-expanded={ariaExpanded}
      aria-disabled={disabled}
      onClick={handleClick}
      className={cn(
        "px-4 py-2 text-sm flex items-center justify-between cursor-pointer rounded outline-none focus:bg-gray-50",
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100",
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
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  dropdownProps?: DropdownProps;
}) {
  return (
    <DropdownMenuItemWrapper
      className={className}
      disabled={disabled}
      onClick={onClick}
      closeOnClick={true}
      dropdownProps={dropdownProps}
    >
      {children}
    </DropdownMenuItemWrapper>
  );
}
DropdownMenuItem.displayName = "DropdownMenuItem";

/* ─────────────────────────────
   Submenu
───────────────────────────── */
export function DropdownMenuSub({
  children,
  dropdownProps,
}: {
  children: React.ReactNode;
  dropdownProps?: DropdownProps;
}) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const submenuProps: SubmenuProps = {
    isSubOpen,
    setIsSubOpen,
  };

  // Function to inject both dropdownProps and submenuProps
  const injectPropsToChildren = (
    children: React.ReactNode
  ): React.ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      const isSubTrigger = isComponentType(child, DropdownMenuSubTrigger);
      const isSubContent = isComponentType(child, DropdownMenuSubContent);
      const isMenuItem = isComponentType(child, DropdownMenuItem);
      const isNestedSubMenu = isComponentType(child, DropdownMenuSub);

      if (isSubTrigger || isSubContent || isMenuItem || isNestedSubMenu) {
        return cloneElement(child as React.ReactElement, {
          ...child.props,
          dropdownProps, // Always pass dropdownProps
          ...(isSubTrigger || isSubContent ? { submenuProps } : {}),
        });
      }

      // If it has children, recursively inject props
      if (child.props.children) {
        return cloneElement(child as React.ReactElement, {
          ...child.props,
          children: injectPropsToChildren(child.props.children),
        });
      }

      return child;
    });
  };

  return <div className="relative">{injectPropsToChildren(children)}</div>;
}
DropdownMenuSub.displayName = "DropdownMenuSub";

export function DropdownMenuSubTrigger({
  children,
  submenuProps,
  dropdownProps,
  className,
}: {
  children: React.ReactNode;
  submenuProps?: SubmenuProps;
  dropdownProps?: DropdownProps;
  className?: string;
}) {
  return (
    <DropdownMenuItemWrapper
      dropdownProps={dropdownProps}
      aria-expanded={submenuProps?.isSubOpen}
      onClick={() => submenuProps?.setIsSubOpen(!submenuProps?.isSubOpen)}
      closeOnClick={false}
      className={className}
    >
      <span>{children}</span>
      <RiArrowDownSLine
        className={cn(
          "w-4 h-4 transition-transform duration-200",
          submenuProps?.isSubOpen ? "rotate-180" : "rotate-0"
        )}
      />
    </DropdownMenuItemWrapper>
  );
}
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export function DropdownMenuSubContent({
  children,
  submenuProps,
  dropdownProps,
}: {
  children: React.ReactNode;
  submenuProps?: SubmenuProps;
  dropdownProps?: DropdownProps;
}) {
  // Function to inject dropdownProps to all nested components
  const injectPropsToChildren = (
    children: React.ReactNode
  ): React.ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      const isMenuItem = isComponentType(child, DropdownMenuItem);
      const isSubMenu = isComponentType(child, DropdownMenuSub);

      if (isMenuItem || isSubMenu) {
        return cloneElement(child as React.ReactElement, {
          ...child.props,
          dropdownProps,
        });
      }

      // If it has children, recursively inject props
      if (child.props.children) {
        return cloneElement(child as React.ReactElement, {
          ...child.props,
          children: injectPropsToChildren(child.props.children),
        });
      }

      return child;
    });
  };

  return (
    <div
      className={cn(
        "pl-4 overflow-hidden transition-all duration-200",
        submenuProps?.isSubOpen
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
      )}
    >
      {injectPropsToChildren(children)}
    </div>
  );
}
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

DropdownMenu.displayName = "DropdownMenu";
