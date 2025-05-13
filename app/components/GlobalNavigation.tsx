// "use client";
// import React, { useEffect, useRef, forwardRef } from "react";
// import { cn } from "../utils/utils";

// interface GlobalNavigationProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
//   className?: string;
//   children: React.ReactNode;
//   trigger: JSX.Element;
//   postion?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
// }

// const GlobalNavigation = forwardRef<HTMLDivElement, GlobalNavigationProps>(
//   (
//     {
//       isOpen,
//       setIsOpen,
//       trigger,
//       children,
//       className,
//       postion = "bottom-right",
//     },
//     ref
//   ) => {
//     const popoverRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (
//           popoverRef.current &&
//           !popoverRef.current.contains(event.target as Node)
//         ) {
//           setIsOpen(false);
//         }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//       <div className="relative w-max" ref={ref}>
//         <div
//           className="cursor-pointer"
//           ref={popoverRef}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {trigger}
//         </div>
//         {isOpen && (
//           <div
//             className={cn(
//               "absolute z-10 bg-white rounded-lg shadow-sm border min-w-[200px] p-4 transition-all duration-300 ease-in-out",
//               postion === "bottom-left" && "left-0 top-4/4",
//               postion === "bottom-right" && "top-4/4 right-0",
//               postion === "top-left" && "bottom-[57px] left-0",
//               postion === "top-right" && "bottom-[57px] right-0",
//               className
//             )}
//           >
//             {children}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// GlobalNavigation.displayName = "GlobalNavigation";

// export default GlobalNavigation;

"use client";
import React, { useEffect, useRef, forwardRef } from "react";
import { cn } from "../utils/utils";
interface GlobalNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  children: React.ReactNode;
  trigger: JSX.Element;
  postion?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const GlobalNavigation = forwardRef<HTMLDivElement, GlobalNavigationProps>(
  (
    {
      isOpen,
      setIsOpen,
      trigger,
      children,
      className,
      postion = "bottom-right",
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Only close if click is outside both button and menu
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      // Only add listener when menu is open
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, setIsOpen]);

    return (
      <div className="relative w-max" ref={ref}>
        <button
          type="button"
          className="cursor-pointer"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger}
        </button>
        {isOpen && (
          <div
            ref={menuRef}
            role="menu"
            aria-orientation="vertical"
            className={cn(
              "absolute z-10 bg-white rounded-lg shadow-sm border min-w-[200px] p-4 transition-all duration-300 ease-in-out",
              postion === "bottom-left" && "left-0 top-4/4",
              postion === "bottom-right" && "top-4/4 right-0",
              postion === "top-left" && "bottom-[57px] left-0",
              postion === "top-right" && "bottom-[57px] right-0",
              className
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

GlobalNavigation.displayName = "GlobalNavigation";

export default GlobalNavigation;
