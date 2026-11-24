"use client";

import { RiArrowDownSLine } from "@remixicon/react";
import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/utils";

/* ─────────────────────────────
   Types
───────────────────────────── */
type DropdownAlignment = "left" | "right" | "center" | "top" | "bottom";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeMenu: (returnFocus?: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  triggerId: string;
  contentId: string;
}

interface SubmenuProps {
  isSubOpen: boolean;
  setIsSubOpen: (open: boolean) => void;
}

/* Enabled, visible menu items inside a container */
const getMenuItems = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])',
    ),
  ).filter((el) => !el.closest('[aria-hidden="true"]'));
};

/**
 * Walks the children tree (through fragments / plain elements) and injects
 * props only into elements whose type is in `targets`.
 * It never descends into a target element, and never adds props to DOM nodes.
 */
const injectProps = (
  nodes: React.ReactNode,
  targets: React.ComponentType<any>[],
  getProps: (type: React.ComponentType<any>) => Record<string, unknown>,
  stopAt: React.ComponentType<any>[] = [],
): React.ReactNode =>
  Children.map(nodes, (child) => {
    if (!isValidElement<any>(child)) return child;

    const type = child.type as React.ComponentType<any>;

    if (targets.includes(type)) {
      return cloneElement(child, getProps(type));
    }

    if (stopAt.includes(type)) return child;

    if (child.props?.children) {
      return cloneElement(child, {
        children: injectProps(child.props.children, targets, getProps, stopAt),
      });
    }

    return child;
  });

/* ─────────────────────────────
   Root DropdownMenu
───────────────────────────── */
interface DropdownMenuProps {
  children: React.ReactNode;
  /** Controlled open state (optional) */
  open?: boolean;
  /** Called whenever the menu wants to open/close */
  onOpenChange?: (open: boolean) => void;
}

export default function DropdownMenu({
  children,
  open,
  onOpenChange,
}: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  const setIsOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const closeMenu = useCallback(
    (returnFocus = true) => {
      setIsOpen(false);
      if (returnFocus) triggerRef.current?.focus();
    },
    [setIsOpen],
  );

  /* Outside click (pointerdown covers mouse + touch + pen) */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !contentRef.current?.contains(target)
      ) {
        closeMenu(false);
      }
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [isOpen, closeMenu]);

  /* Keyboard navigation (items are read from the DOM, no registration) */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      const items = getMenuItems(contentRef.current);
      const current = items.indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeMenu(true);
          break;

        case "ArrowDown":
          if (!items.length) return;
          e.preventDefault();
          items[(current + 1) % items.length]?.focus();
          break;

        case "ArrowUp":
          if (!items.length) return;
          e.preventDefault();
          items[current <= 0 ? items.length - 1 : current - 1]?.focus();
          break;

        case "Home":
          if (!items.length) return;
          e.preventDefault();
          items[0]?.focus();
          break;

        case "End":
          if (!items.length) return;
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;

        case "Tab":
          // Let focus move naturally, just close the menu
          closeMenu(false);
          break;
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeMenu]);

  const dropdownProps: DropdownProps = {
    isOpen,
    setIsOpen,
    closeMenu,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
  };

  const enhancedChildren = injectProps(
    children,
    [DropdownMenuTrigger, DropdownMenuContent],
    () => ({ dropdownProps }),
  );

  return <div className="relative inline-block">{enhancedChildren}</div>;
}
DropdownMenu.displayName = "DropdownMenu";

/* ─────────────────────────────
   Trigger
───────────────────────────── */
export function DropdownMenuTrigger({
  children,
  className,
  dropdownProps,
}: {
  children: React.ReactNode;
  className?: string;
  dropdownProps?: DropdownProps;
}) {
  if (!dropdownProps) {
    throw new Error("DropdownMenuTrigger must be used inside DropdownMenu");
  }

  const { isOpen, setIsOpen, triggerRef, triggerId, contentId } = dropdownProps;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Ignore keys coming from interactive children (e.g. an inner input)
    if (e.target !== e.currentTarget) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
    }
  };

  return (
    <div
      ref={triggerRef}
      id={triggerId}
      tabIndex={0}
      role="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? contentId : undefined}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      className={cn(
        "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded",
        className,
      )}
    >
      {children}
    </div>
  );
}
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const positionClasses: Record<DropdownAlignment, string> = {
  right: "left-0 top-full mt-2",
  left: "right-0 top-full mt-2",
  center: "left-1/2 -translate-x-1/2 top-full mt-2",
  bottom: "left-0 top-full mt-2",
  top: "left-0 bottom-full mb-2",
};

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
  if (!dropdownProps) {
    throw new Error("DropdownMenuContent must be used inside DropdownMenu");
  }

  const { isOpen, contentRef, closeMenu, triggerId, contentId } = dropdownProps;
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  /* Mount -> animate in. Animate out -> unmount. */
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }
    setEntered(false);
    const timer = setTimeout(() => setMounted(false), 150);
    return () => clearTimeout(timer);
  }, [isOpen]);

  /* Focus first item once the menu is on screen */
  useEffect(() => {
    if (!isOpen || !mounted) return;
    const raf = requestAnimationFrame(() => {
      getMenuItems(contentRef.current)[0]?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, [isOpen, mounted, contentRef]);

  if (!mounted) return null;

  /* Close after an item is activated (click or Enter/Space, which clicks) */
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>(
      '[role="menuitem"]',
    );
    if (!item || !e.currentTarget.contains(item)) return;
    if (item.getAttribute("aria-disabled") === "true") return;
    if (item.dataset.closeOnClick === "false") return;
    closeMenu(true);
  };

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={triggerId}
      onClick={handleClick}
      className={cn(
        "absolute w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 transition-all duration-150",
        entered && isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
        positionClasses[align] ?? positionClasses.right,
        className,
      )}
    >
      {children}
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
  return <div role="separator" className="border-t border-gray-100" />;
}
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/* ─────────────────────────────
   Item Wrapper (shared by Item + SubTrigger)
   Needs no injected props: closing is handled by Content's click handler.
───────────────────────────── */
function DropdownMenuItemWrapper({
  children,
  onClick,
  disabled,
  className,
  closeOnClick = true,
  ariaExpanded,
  ariaHasPopup,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  closeOnClick?: boolean;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean;
}) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup ? "menu" : undefined}
      aria-disabled={disabled || undefined}
      data-close-on-click={closeOnClick ? "true" : "false"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "px-4 py-2 text-sm flex items-center justify-between rounded outline-none focus:bg-gray-50",
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100 cursor-pointer",
        className,
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
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <DropdownMenuItemWrapper
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </DropdownMenuItemWrapper>
  );
}
DropdownMenuItem.displayName = "DropdownMenuItem";

/* ─────────────────────────────
   Submenu
───────────────────────────── */
export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const submenuProps: SubmenuProps = { isSubOpen, setIsSubOpen };

  const enhancedChildren = injectProps(
    children,
    [DropdownMenuSubTrigger, DropdownMenuSubContent],
    () => ({ submenuProps }),
    [DropdownMenuSub],
  );

  return <div className="relative">{enhancedChildren}</div>;
}
DropdownMenuSub.displayName = "DropdownMenuSub";

export function DropdownMenuSubTrigger({
  children,
  className,
  submenuProps,
}: {
  children: React.ReactNode;
  className?: string;
  submenuProps?: SubmenuProps;
}) {
  if (!submenuProps) {
    throw new Error(
      "DropdownMenuSubTrigger must be used inside DropdownMenuSub",
    );
  }

  const { isSubOpen, setIsSubOpen } = submenuProps;

  return (
    <DropdownMenuItemWrapper
      ariaExpanded={isSubOpen}
      ariaHasPopup
      onClick={() => setIsSubOpen(!isSubOpen)}
      closeOnClick={false}
      className={className}
    >
      <span>{children}</span>
      <RiArrowDownSLine
        className={cn(
          "w-4 h-4 transition-transform duration-200",
          isSubOpen ? "rotate-180" : "rotate-0",
        )}
      />
    </DropdownMenuItemWrapper>
  );
}
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export function DropdownMenuSubContent({
  children,
  submenuProps,
}: {
  children: React.ReactNode;
  submenuProps?: SubmenuProps;
}) {
  if (!submenuProps) {
    throw new Error(
      "DropdownMenuSubContent must be used inside DropdownMenuSub",
    );
  }

  const { isSubOpen } = submenuProps;

  return (
    <div
      role="group"
      aria-hidden={!isSubOpen}
      className={cn(
        "overflow-hidden transition-all duration-200 [&_[role=menuitem]]:pl-8",
        isSubOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
      )}
    >
      {children}
    </div>
  );
}
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
