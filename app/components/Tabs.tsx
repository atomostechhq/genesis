// import React from "react";
// import { cn } from "../utils/utils";

// interface TabItem {
//   label: string;
//   value: string;
// }

// interface TabsContainerProps {
//   value: string;
//   children: React.ReactNode;
//   className?: string;
// }

// interface TabListProps extends Partial<TabItem> {
//   onChange: (value: string) => void;
//   ariaLabel?: string;
//   children: React.ReactNode;
//   box?: boolean;
//   className?: string;
// }

// interface TabProps extends TabItem {
//   onChange: (value: string) => void;
//   box?: boolean;
//   content?: React.ReactNode;
//   selectedTabValue: string;
//   icon?: JSX.Element;
//   className?: string;
//   tabIndex?: number;
//   onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void; // Update event type
//   ref?: React.Ref<HTMLButtonElement>;
// }

// interface TabPanelProps {
//   value: string;
//   currentValue: string;
//   children: React.ReactNode;
//   className?: string;
// }

// export const TabsContainer: React.FC<TabsContainerProps> = ({
//   children,
//   className,
// }) => {
//   return <div className={className}>{children}</div>;
// };

// export const TabList: React.FC<TabListProps> = ({
//   onChange,
//   ariaLabel,
//   children,
//   box = false,
//   className,
// }) => {
//   const [focusIndex, setFocusIndex] = React.useState(0);
//   const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

//   const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
//     const tabCount = React.Children.count(children);

//     switch (e.key) {
//       case "ArrowRight":
//         e.preventDefault();
//         const nextIndex = (index + 1) % tabCount;
//         setFocusIndex(nextIndex);
//         tabRefs.current[nextIndex]?.focus();
//         break;
//       case "ArrowLeft":
//         e.preventDefault();
//         const prevIndex = (index - 1 + tabCount) % tabCount;
//         setFocusIndex(prevIndex);
//         tabRefs.current[prevIndex]?.focus();
//         break;
//     }
//   };

//   return (
//     <div
//       className={cn(
//         "flex items-center",
//         box
//           ? "bg-gray-50 rounded-lg border border-gray-200"
//           : "border-b border-gray-200",
//         className
//       )}
//       role="tablist"
//       aria-label={ariaLabel}
//       aria-orientation="horizontal"
//     >
//       {React.Children.map(children, (child, index) => {
//         if (React.isValidElement(child)) {
//           const childProps = {
//             onChange,
//             box,
//             onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, index),
//             tabIndex: index === focusIndex ? 0 : -1,
//           };

//           return React.cloneElement(child, {
//             ...childProps,
//             ref: (el: HTMLButtonElement | null) => {
//               // Handle the ref
//               tabRefs.current[index] = el;
//               const originalRef = (child as any).ref;
//               if (originalRef) {
//                 if (typeof originalRef === "function") {
//                   originalRef(el);
//                 } else {
//                   originalRef.current = el;
//                 }
//               }
//             },
//           } as any);
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
//   (
//     {
//       label,
//       value,
//       onChange,
//       icon,
//       content,
//       box = false,
//       selectedTabValue,
//       className,
//       onKeyDown,
//       tabIndex,
//     },
//     ref
//   ) => {
//     const isSelected = value === selectedTabValue;

//     return (
//       <button
//         ref={ref}
//         role="tab"
//         aria-selected={isSelected}
//         aria-controls={`panel-${value}`}
//         id={`tab-${value}`}
//         tabIndex={tabIndex}
//         onKeyDown={onKeyDown}
//         className={cn(
//           "flex items-center gap-2 px-4 py-3 text-text-sm font-medium cursor-pointer",
//           isSelected && !box
//             ? "text-primary-600 border-b-2 border-primary-600"
//             : "border-b-2 border-transparent text-gray-700",
//           isSelected && box ? "bg-white hover:bg-white shadow-md" : "",
//           box ? "m-1 rounded-lg hover:rounded-lg" : "m-0",
//           "hover:bg-gray-100 hover:rounded-t transition-all ease-linear duration-200 delay-75",
//           className
//         )}
//         onClick={() => onChange(value)}
//       >
//         {icon && <span aria-hidden="true">{icon}</span>}
//         {label}
//         {content && <span aria-hidden="true">{content}</span>}
//       </button>
//     );
//   }
// );

// export const TabPanel: React.FC<TabPanelProps> = ({
//   value,
//   currentValue,
//   children,
//   className,
// }) => {
//   return value === currentValue ? (
//     <div
//       role="tabpanel"
//       id={`panel-${value}`}
//       aria-labelledby={`tab-${value}`}
//       tabIndex={0}
//       className={className}
//     >
//       {children}
//     </div>
//   ) : null;
// };

// export default TabsContainer;

// Tab.displayName = "Tab";



import React from "react";
import { cn } from "../utils/utils";

interface TabItem {
  label: string;
  value: string;
}

interface TabsContainerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  position?: "horizontal" | "vertical";
}

interface TabListProps extends Partial<TabItem> {
  onChange: (value: string) => void;
  ariaLabel?: string;
  children: React.ReactNode;
  box?: boolean;
  className?: string;
  position?: "horizontal" | "vertical";
}

interface TabProps extends TabItem {
  onChange: (value: string) => void;
  box?: boolean;
  content?: React.ReactNode;
  selectedTabValue: string;
  icon?: JSX.Element;
  className?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  position?: "horizontal" | "vertical";
  ref?: React.Ref<HTMLButtonElement>;
}

interface TabPanelProps {
  value: string;
  currentValue: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  children,
  className,
  position = "horizontal",
}) => {
  return (
    <div 
      className={cn(
        position === "vertical" ? "flex" : "block",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabList: React.FC<TabListProps> = ({
  onChange,
  ariaLabel,
  children,
  box = false,
  className,
  position = "horizontal",
}) => {
  const [focusIndex, setFocusIndex] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const tabCount = React.Children.count(children);

    switch (e.key) {
      case "ArrowRight":
        if (position === "horizontal") {
          e.preventDefault();
          const nextIndex = (index + 1) % tabCount;
          setFocusIndex(nextIndex);
          tabRefs.current[nextIndex]?.focus();
        }
        break;
      case "ArrowLeft":
        if (position === "horizontal") {
          e.preventDefault();
          const prevIndex = (index - 1 + tabCount) % tabCount;
          setFocusIndex(prevIndex);
          tabRefs.current[prevIndex]?.focus();
        }
        break;
      case "ArrowDown":
        if (position === "vertical") {
          e.preventDefault();
          const nextIndex = (index + 1) % tabCount;
          setFocusIndex(nextIndex);
          tabRefs.current[nextIndex]?.focus();
        }
        break;
      case "ArrowUp":
        if (position === "vertical") {
          e.preventDefault();
          const prevIndex = (index - 1 + tabCount) % tabCount;
          setFocusIndex(prevIndex);
          tabRefs.current[prevIndex]?.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        setFocusIndex(0);
        tabRefs.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        const lastIndex = tabCount - 1;
        setFocusIndex(lastIndex);
        tabRefs.current[lastIndex]?.focus();
        break;
    }
  };

  return (
    <div
      className={cn(
        position === "horizontal" 
          ? "flex items-center" 
          : "flex flex-col items-stretch",
        box
          ? "bg-gray-50 rounded-lg border border-gray-200"
          : position === "horizontal" 
            ? "border-b border-gray-200" 
            : "border-r border-gray-200",
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={position}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const childProps = {
            onChange,
            box,
            position,
            onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, index),
            tabIndex: index === focusIndex ? 0 : -1,
          };

          return React.cloneElement(child, {
            ...childProps,
            ref: (el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
              const originalRef = (child as any).ref;
              if (originalRef) {
                if (typeof originalRef === "function") {
                  originalRef(el);
                } else {
                  originalRef.current = el;
                }
              }
            },
          } as any);
        }
        return null;
      })}
    </div>
  );
};

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      label,
      value,
      onChange,
      icon,
      content,
      box = false,
      selectedTabValue,
      className,
      onKeyDown,
      tabIndex,
      position = "horizontal",
    },
    ref
  ) => {
    const isSelected = value === selectedTabValue;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`panel-${value}`}
        id={`tab-${value}`}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        className={cn(
          "flex items-center gap-2 px-4 py-3 text-text-sm font-medium cursor-pointer",
          isSelected && !box && position === "horizontal"
            ? "text-primary-600 border-b-2 border-primary-600"
            : isSelected && !box && position === "vertical"
            ? "text-primary-600 border-r-2 border-primary-600"
            : "border-transparent text-gray-700",
          isSelected && box ? "bg-white hover:bg-white shadow-md" : "",
          box 
            ? position === "horizontal" 
              ? "m-1 rounded-lg hover:rounded-lg" 
              : "mx-1 my-0.5 rounded-lg hover:rounded-lg"
            : "m-0",
          position === "horizontal"
            ? "hover:bg-gray-100 hover:rounded-t transition-all ease-linear duration-200 delay-75"
            : "hover:bg-gray-100 hover:rounded-l transition-all ease-linear duration-200 delay-75",
          position === "vertical" && !box && !isSelected ? "border-r-2" : "",
          className
        )}
        onClick={() => onChange(value)}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {label}
        {content && <span aria-hidden="true">{content}</span>}
      </button>
    );
  }
);

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  currentValue,
  children,
  className,
}) => {
  return value === currentValue ? (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  ) : null;
};

export default TabsContainer;

Tab.displayName = "Tab";