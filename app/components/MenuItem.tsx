import React, { useState, useRef, useEffect } from "react";
import { cn } from "../utils/utils";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

interface MenuDropdownProps {
  trigger: JSX.Element;
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export default function MenuDropdown({
  trigger,
  children,
  width = "250px",
  className,
}: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useRef(
    `menu-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="cursor-pointer w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          style={{ width }}
          className={cn(
            "border border-gray-200 rounded-lg absolute left-0 mt-1 z-[100000] w-full bg-white shadow-sm",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface MenuSubItemProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const MenuSubItem: React.FC<MenuSubItemProps> = ({
  label,
  onClick,
  disabled,
  children,
  className = "",
}) => (
  <button
    className={cn(
      "w-full text-left p-4 text-sm border-y-[0.5px] last:border-y first:rounded-t hover:bg-primary-50 hover:rounded",
      disabled ? "opacity-50 cursor-not-allowed" : "",
      className
    )}
    onClick={onClick}
    disabled={disabled}
    role="menuitem"
    aria-disabled={disabled}
  >
    {label}
    {children && <>{children}</>}
  </button>
);

interface MenuItemProps {
  content: React.ReactNode;
  children: React.ReactNode;
  label?: string;
  className?: string;
  sectionClassName?: string;
  menuClassName?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  content,
  children,
  className = "",
  sectionClassName = "",
  menuClassName = "",
}) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const subMenuId = useRef(
    `submenu-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  return (
    <div className={cn("relative", className)} role="none">
      <div
        onClick={() => setIsSubOpen(!isSubOpen)}
        className={cn(
          "cursor-pointer hover:bg-primary-50 p-4 flex text-sm border-y-[0.5px] justify-between items-center gap-1 w-full text-left",
          sectionClassName
        )}
        role="menuitem"
        aria-expanded={isSubOpen}
        aria-haspopup="true"
        aria-controls={subMenuId}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsSubOpen(!isSubOpen);
          }
        }}
      >
        {content}
        <span aria-hidden="true">
          {isSubOpen ? (
            <RiArrowUpSLine size={20} />
          ) : (
            <RiArrowDownSLine size={20} />
          )}
        </span>
      </div>
      {isSubOpen && (
        <div
          id={subMenuId}
          role="menu"
          aria-label="Submenu"
          className={cn("border-primary-100 bg-gray-50", menuClassName)}
        >
          {children}
        </div>
      )}
    </div>
  );
};
