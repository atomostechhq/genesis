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
}

interface TabListProps extends Partial<TabItem> {
  onChange: (value: string) => void;
  ariaLabel?: string;
  children: React.ReactNode;
  box?: boolean;
  pill?: boolean;
  className?: string;
}

interface TabProps extends TabItem {
  onChange: (value: string) => void;
  box?: boolean;
  pill?: boolean;
  content?: React.ReactNode;
  selectedTabValue: string;
  icon?: JSX.Element;
  className?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
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
}) => {
  return <div className={className}>{children}</div>;
};

export const TabList: React.FC<TabListProps> = ({
  onChange,
  ariaLabel,
  children,
  box = false,
  pill = false,
  className,
}) => {
  const [focusIndex, setFocusIndex] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const tabCount = React.Children.count(children);

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = (index + 1) % tabCount;
        setFocusIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = (index - 1 + tabCount) % tabCount;
        setFocusIndex(prevIndex);
        tabRefs.current[prevIndex]?.focus();
        break;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center",
        box
          ? "bg-gray-50 rounded-lg border border-gray-200"
          : pill
          ? "bg-gray-25 rounded-xl p-1"
          : "border-b border-gray-200",
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const childProps = {
            onChange,
            box,
            pill,
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
      pill = false,
      selectedTabValue,
      className,
      onKeyDown,
      tabIndex,
    },
    ref
  ) => {
    const isSelected = value === selectedTabValue;
    // const context = React.useContext(TabsContext);

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
          // Default variant (no box, no pill)
          !box && !pill && [
            isSelected
              ? "text-primary-600 border-b-2 border-primary-600"
              : "border-b-2 border-transparent text-gray-700",
          ],
          // Box variant
          box && [
            "m-1 rounded-lg hover:rounded-lg",
            isSelected ? "bg-white hover:bg-white shadow-md" : "",
          ],
          // Pill variant
          pill && [
            "py-1 px-3.5 border border-gray-700 border-r-0 last:border-r last:rounded-r-xl first:rounded-l-xl",
            isSelected
              ? "bg-primary-600 border-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-25 text-gray-700 hover:bg-gray-100",
          ],
          // Common styles
          "transition-all ease-linear duration-200 delay-75",
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