"use client";
import React from "react";
import { cn } from "../utils/utils";

interface TabItem {
  label: string;
  value: string;
}

interface TabsContainerProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
  position?: "horizontal" | "vertical";
}

interface TabListProps {
  onChange: (value: string) => void;
  ariaLabel?: string;
  children: React.ReactNode;
  box?: boolean;
  pill?: boolean;
  pillBox?: boolean;
  className?: string;
  position?: "horizontal" | "vertical";
  persist?: "url" | "localStorage";
  persistKey?: string;
  dense?: boolean;
}

interface TabProps extends TabItem {
  onChange?: (value: string) => void;
  box?: boolean;
  pill?: boolean;
  pillBox?: boolean;
  content?: React.ReactNode;
  selectedTabValue: string;
  icon?: JSX.Element;
  className?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  position?: "horizontal" | "vertical";
  dense?: boolean;
}

interface TabPanelProps {
  value: string;
  currentValue: string;
  children: React.ReactNode;
  className?: string;
}

type Variant = "default" | "box" | "pill" | "pillBox";

const getVariant = (
  box?: boolean,
  pill?: boolean,
  pillBox?: boolean,
): Variant => (box ? "box" : pillBox ? "pillBox" : pill ? "pill" : "default");

const setRef = <T,>(ref: React.Ref<T> | undefined, el: T | null) => {
  if (!ref) return;
  if (typeof ref === "function") ref(el);
  else (ref as React.MutableRefObject<T | null>).current = el;
};

export const TabsContainer: React.FC<TabsContainerProps> = ({
  children,
  className,
  position = "horizontal",
}) => {
  return (
    <div
      className={cn(
        position === "vertical"
          ? "flex items-start gap-4 [&>[role=tabpanel]]:flex-1 [&>[role=tabpanel]]:min-w-0"
          : "block",
        className,
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
  pill = false,
  pillBox = false,
  className,
  position = "horizontal",
  persist,
  persistKey,
  dense = false,
}) => {
  const vertical = position === "vertical";
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const variant = getVariant(box, pill, pillBox);

  const tabs = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<any>[];
  const tabCount = tabs.length;

  const selectedIndex = Math.max(
    tabs.findIndex((t) => t.props.value === t.props.selectedTabValue),
    0,
  );
  const activeIndex = Math.min(focusIndex ?? selectedIndex, tabCount - 1);

  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    if (!persist || !persistKey || typeof window === "undefined") return;

    const stored =
      persist === "url"
        ? new URLSearchParams(window.location.search).get(persistKey)
        : window.localStorage.getItem(persistKey);

    if (stored && tabs.some((t) => t.props.value === stored)) {
      onChangeRef.current(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist, persistKey]);

  const handleChange = React.useCallback(
    (value: string) => {
      if (typeof window !== "undefined" && persistKey) {
        if (persist === "url") {
          const url = new URL(window.location.href);
          url.searchParams.set(persistKey, value);
          window.history.replaceState({}, "", url.toString());
        } else if (persist === "localStorage") {
          window.localStorage.setItem(persistKey, value);
        }
      }
      setFocusIndex(null);
      onChange(value);
    },
    [persist, persistKey, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys =
      position === "horizontal"
        ? { next: "ArrowRight", prev: "ArrowLeft" }
        : { next: "ArrowDown", prev: "ArrowUp" };

    let target: number | null = null;
    if (e.key === keys.next) target = (index + 1) % tabCount;
    else if (e.key === keys.prev) target = (index - 1 + tabCount) % tabCount;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = tabCount - 1;

    if (target === null) return;
    e.preventDefault();
    setFocusIndex(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div
      className={cn(
        vertical ? "flex flex-col items-stretch shrink-0" : "flex items-center",

        variant === "box" &&
          cn(
            "bg-gray-50 rounded-lg border border-gray-200",
            vertical && (dense ? "p-0.5 gap-0.5" : "p-1 gap-1"),
          ),

        variant === "pillBox" &&
          cn(
            "bg-gray-100 w-fit",
            dense ? "p-0.5 gap-0.5" : "p-1 gap-1",
            vertical ? (dense ? "rounded-2xl" : "rounded-3xl") : "rounded-full",
          ),

        variant === "pill" &&
          (vertical
            ? cn(
                "bg-gray-100 w-fit",
                dense ? "p-0.5 gap-0.5 rounded-2xl" : "p-1 gap-1 rounded-3xl",
              )
            : "rounded-full border border-gray-300 bg-white overflow-hidden w-fit"),

        variant === "default" &&
          (vertical ? "border-r border-gray-200" : "border-b border-gray-200"),

        className,
      )}
    >
      {tabs.map((child, index) => {
        const originalRef = (child as any).ref;
        return React.cloneElement(child, {
          onChange: handleChange,
          box,
          pill,
          pillBox,
          position,
          dense,
          onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, index),
          tabIndex: index === activeIndex ? 0 : -1,
          ref: (el: HTMLButtonElement | null) => {
            tabRefs.current[index] = el;
            setRef(originalRef, el);
          },
        } as any);
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
      pillBox = false,
      dense = false,
      selectedTabValue,
      className,
      onKeyDown,
      tabIndex,
      position = "horizontal",
    },
    ref,
  ) => {
    const isSelected = value === selectedTabValue;
    const variant = getVariant(box, pill, pillBox);
    const horizontal = position === "horizontal";

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={isSelected ? `panel-${value}` : undefined}
        id={`tab-${value}`}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onClick={() => onChange?.(value)}
        className={cn(
          "flex items-center font-medium cursor-pointer",
          dense
            ? "gap-1.5 px-2.5 py-1.5 text-text-xs"
            : "gap-2 px-4 py-3 text-text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",

          variant === "default" && [
            horizontal ? "border-b-2 -mb-px" : "border-r-2 -mr-px",
            isSelected
              ? "text-primary-600 border-primary-600"
              : "text-gray-700 border-transparent",
            horizontal
              ? "hover:bg-gray-100 hover:rounded-t"
              : "hover:bg-gray-100 hover:rounded-l",
            "transition-colors ease-linear duration-200 delay-75",
          ],

          variant === "box" && [
            horizontal
              ? dense
                ? "m-0.5 rounded-md"
                : "m-1 rounded-lg"
              : dense
                ? "rounded-md"
                : "rounded-lg",
            isSelected
              ? "bg-white hover:bg-white shadow-md"
              : "hover:bg-gray-100",
            "transition-colors ease-linear duration-200 delay-75",
          ],

          variant === "pill" &&
            (horizontal
              ? [
                  dense ? "py-1 px-3 text-xs" : "py-2 px-4 text-sm",
                  "transition-colors duration-200",
                  "border-l border-gray-300 first:border-l-0",
                  isSelected
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-white text-gray-700 hover:bg-gray-100",
                ]
              : [
                  dense ? "py-1 px-3 text-xs" : "py-2 px-4 text-sm",
                  "rounded-full border transition-all duration-200",
                  isSelected
                    ? "bg-primary-600 border-primary-600 text-white shadow-sm hover:bg-primary-700"
                    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400",
                ]),

          variant === "pillBox" && [
            "rounded-full transition-colors duration-200",
            dense ? "text-xs py-1 px-3" : "text-sm py-1.5 px-4",
            isSelected
              ? "bg-white text-primary-600 shadow-sm"
              : "text-gray-700 hover:bg-gray-200/60",
          ],
          className,
        )}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {label}
        {content && <span>{content}</span>}
      </button>
    );
  },
);

Tab.displayName = "Tab";

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
