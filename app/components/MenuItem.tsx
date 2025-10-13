// import React, { useState, useRef, useEffect } from "react";
// import { cn } from "../utils/utils";
// import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

// interface MenuDropdownProps {
//   trigger: JSX.Element;
//   children: React.ReactNode;
//   width?: string;
//   className?: string;
// }

// export default function MenuDropdown({
//   trigger,
//   children,
//   width = "250px",
//   className,
// }: MenuDropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const menuId = useRef(
//     `menu-${Math.random().toString(36).substr(2, 9)}`
//   ).current;

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative w-full" ref={dropdownRef}>
//       <div
//         className="cursor-pointer w-full text-left"
//         onClick={() => setIsOpen(!isOpen)}
//         role="button"
//         tabIndex={0}
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//         aria-controls={menuId}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             setIsOpen(!isOpen);
//           }
//         }}
//       >
//         {trigger}
//       </div>
//       {isOpen && (
//         <div
//           id={menuId}
//           role="menu"
//           style={{ width }}
//           className={cn(
//             "border border-gray-200 rounded-lg absolute left-0 mt-1 z-[100000] w-full bg-white shadow-sm",
//             className
//           )}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// interface MenuSubItemProps {
//   label: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   children?: React.ReactNode;
//   className?: string;
// }

// export const MenuSubItem: React.FC<MenuSubItemProps> = ({
//   label,
//   onClick,
//   disabled,
//   children,
//   className = "",
// }) => (
//   <button
//     className={cn(
//       "w-full text-left p-4 text-sm border-y-[0.5px] last:border-y first:rounded-t hover:bg-primary-50 hover:rounded",
//       disabled ? "opacity-50 cursor-not-allowed" : "",
//       className
//     )}
//     onClick={onClick}
//     disabled={disabled}
//     role="menuitem"
//     aria-disabled={disabled}
//   >
//     {label}
//     {children && <>{children}</>}
//   </button>
// );

// interface MenuItemProps {
//   content: React.ReactNode;
//   children: React.ReactNode;
//   label?: string;
//   className?: string;
//   sectionClassName?: string;
//   menuClassName?: string;
// }

// export const MenuItem: React.FC<MenuItemProps> = ({
//   content,
//   children,
//   className = "",
//   sectionClassName = "",
//   menuClassName = "",
// }) => {
//   const [isSubOpen, setIsSubOpen] = useState(false);
//   const subMenuId = useRef(
//     `submenu-${Math.random().toString(36).substr(2, 9)}`
//   ).current;

//   return (
//     <div className={cn("relative", className)} role="none">
//       <div
//         onClick={() => setIsSubOpen(!isSubOpen)}
//         className={cn(
//           "cursor-pointer hover:bg-primary-50 p-4 flex text-sm border-y-[0.5px] justify-between items-center gap-1 w-full text-left",
//           sectionClassName
//         )}
//         role="menuitem"
//         aria-expanded={isSubOpen}
//         aria-haspopup="true"
//         aria-controls={subMenuId}
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             setIsSubOpen(!isSubOpen);
//           }
//         }}
//       >
//         {content}
//         <span aria-hidden="true">
//           {isSubOpen ? (
//             <RiArrowUpSLine size={20} />
//           ) : (
//             <RiArrowDownSLine size={20} />
//           )}
//         </span>
//       </div>
//       {isSubOpen && (
//         <div
//           id={subMenuId}
//           role="menu"
//           aria-label="Submenu"
//           className={cn("border-primary-100 bg-gray-50", menuClassName)}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

"use client";
import { RiArrowRightLine } from "@remixicon/react";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactElement,
} from "react";

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(
  undefined
);

const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu");
  }
  return context;
};

// Root Component
interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

// Trigger Component
interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DropdownMenuTrigger({
  children,
  asChild,
}: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = useDropdownMenu();
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={triggerRef}
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}

// Content Component
interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
}

export function DropdownMenuContent({
  children,
  className = "",
  align = "start",
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen } = useDropdownMenu();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const alignmentClasses = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 transform -translate-x-1/2",
  };

  return (
    <div
      ref={contentRef}
      className={`
        absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
        focus:outline-none z-50 ${alignmentClasses[align]} ${className}
      `}
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

// Common item wrapper
const DropdownMenuItemWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({
  children,
  className = "",
  onClick,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { setIsOpen } = useDropdownMenu();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        flex items-center justify-between px-4 py-2 text-sm cursor-pointer
        transition-colors duration-150
        ${
          disabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Label Component
export function DropdownMenuLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-4 py-2 text-sm font-semibold text-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

// Item Component
export function DropdownMenuItem({
  children,
  className = "",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <DropdownMenuItemWrapper
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </DropdownMenuItemWrapper>
  );
}

// Group Component
export function DropdownMenuGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

// Separator Component
export function DropdownMenuSeparator({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`border-t border-gray-100 my-1 ${className}`} />;
}

// Shortcut Component
export function DropdownMenuShortcut({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`ml-auto text-xs tracking-widest opacity-60 ${className}`}>
      {children}
    </span>
  );
}

// Sub Menu Context
interface SubmenuContextType {
  submenuContent: React.ReactNode | null;
  setSubmenuContent: (content: React.ReactNode) => void;
}

const SubmenuContext = createContext<SubmenuContextType | undefined>(undefined);

const useSubmenu = () => {
  const context = useContext(SubmenuContext);
  if (!context) {
    throw new Error("useSubmenu must be used within a DropdownMenuSub");
  }
  return context;
};

// Type guard to check if element is DropdownMenuSubContent
const isDropdownMenuSubContent = (element: ReactElement): element is ReactElement<{ children: React.ReactNode }> => {
  return element.type === DropdownMenuSubContent;
};

// Type guard to check if element is DropdownMenuPortal
const isDropdownMenuPortal = (element: ReactElement): element is ReactElement<{ children: React.ReactNode }> => {
  return element.type === DropdownMenuPortal;
};

// Sub Menu Components
export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [submenuContent, setSubmenuContent] = useState<React.ReactNode | null>(
    null
  );

  // Extract submenu content from children
  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (isDropdownMenuPortal(child)) {
          // Find DropdownMenuSubContent inside the portal
          React.Children.forEach(child.props.children, (portalChild) => {
            if (React.isValidElement(portalChild) && isDropdownMenuSubContent(portalChild)) {
              setSubmenuContent(portalChild.props.children);
            }
          });
        } else if (isDropdownMenuSubContent(child)) {
          // Direct DropdownMenuSubContent
          setSubmenuContent(child.props.children);
        }
      }
    });
  }, [children]);

  return (
    <SubmenuContext.Provider value={{ submenuContent, setSubmenuContent }}>
      {children}
    </SubmenuContext.Provider>
  );
}

export function DropdownMenuSubTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const { submenuContent } = useSubmenu();
  const subTriggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsSubOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubOpen(false);
  };

  return (
    <div
      ref={subTriggerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenuItemWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="flex-1">{children}</span>
        <RiArrowRightLine className="h-4 w-4" />
      </DropdownMenuItemWrapper>
      {isSubOpen && submenuContent && (
        <div
          className="absolute left-full top-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="">
            {submenuContent}
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownMenuSubContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function DropdownMenuPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}