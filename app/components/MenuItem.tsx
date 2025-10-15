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

// Content Component with enhanced positioning
interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  alignOffset?: number;
}

export function DropdownMenuContent({
  children,
  className = "",
  align = "start",
  side = "bottom",
  sideOffset = 0,
  alignOffset = 0,
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

  const sideClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full",
  };

  const getAlignmentStyle = () => {
    if (alignOffset === 0) return {};
    
    switch (align) {
      case "start":
        return { left: `${alignOffset}px` };
      case "end":
        return { right: `${alignOffset}px` };
      case "center":
        return { left: `calc(50% + ${alignOffset}px)` };
      default:
        return {};
    }
  };

  const getSideStyle = () => {
    if (sideOffset === 0) return {};
    
    switch (side) {
      case "top":
        return { bottom: `calc(100% + ${sideOffset}px)` };
      case "bottom":
        return { top: `calc(100% + ${sideOffset}px)` };
      case "left":
        return { right: `calc(100% + ${sideOffset}px)` };
      case "right":
        return { left: `calc(100% + ${sideOffset}px)` };
      default:
        return {};
    }
  };

  return (
    <div
      ref={contentRef}
      style={{
        ...getAlignmentStyle(),
        ...getSideStyle(),
      }}
      className={`
        absolute w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
        focus:outline-none z-50 ${alignmentClasses[align]} ${sideClasses[side]} ${className}
      `}
    >
      <div className="">{children}</div>
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
  return <div className={`border-t border-gray-100 ${className}`} />;
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
const isDropdownMenuSubContent = (element: ReactElement): element is ReactElement<{ 
  children: React.ReactNode;
}> => {
  return element.type === DropdownMenuSubContent;
};

// Sub Menu Components - Fixed version
interface DropdownMenuSubProps {
  children: React.ReactNode;
}

export function DropdownMenuSub({ 
  children, 
}: DropdownMenuSubProps) {
  const [submenuContent, setSubmenuContent] = useState<React.ReactNode | null>(
    null
  );

  // Extract submenu content from children - FIXED VERSION
  useEffect(() => {
    let foundContent: React.ReactNode | null = null;
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && isDropdownMenuSubContent(child)) {
        foundContent = child.props.children;
      }
    });
    
    setSubmenuContent(foundContent);
  }, [children]);

  return (
    <SubmenuContext.Provider value={{ 
      submenuContent, 
      setSubmenuContent,
    }}>
      {/* Only render the trigger, not the content */}
      {React.Children.map(children, (child) => 
        React.isValidElement(child) && child.type !== DropdownMenuSubContent 
          ? child 
          : null
      )}
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
          className="absolute left-0 top-full w-full rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
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

interface DropdownMenuSubContentProps {
  children: React.ReactNode;
}

export function DropdownMenuSubContent({
  children,
}: DropdownMenuSubContentProps) {
  // This component doesn't render anything directly
  // Its content is extracted by DropdownMenuSub and used in the submenu
  return null;
}