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
    <div className={"relative w-full"} ref={dropdownRef}>
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
      >
        {trigger}
      </div>
      {isOpen && (
        <div
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

  return (
    <div className={cn("relative", className)}>
      <section
        onClick={() => setIsSubOpen(!isSubOpen)}
        className={cn(
          "cursor-pointer hover:bg-primary-50 p-4 flex text-sm border-y-[0.5px] justify-between items-center gap-1 w-full text-left",
          sectionClassName
        )}
      >
        {content}
        {isSubOpen ? (
          <RiArrowUpSLine size={20} />
        ) : (
          <RiArrowDownSLine size={20} />
        )}
      </section>
      {isSubOpen && (
        <div className={cn(" border-primary-100 bg-gray-50", menuClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};
