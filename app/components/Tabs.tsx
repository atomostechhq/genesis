import React from "react";
import { cn } from "../utils/utils";

interface TabItem {
  label: string;
  value: string;
}

interface TabsContainerProps {
  value: string;
  children: React.ReactNode;
}

interface TabListProps extends Partial<TabItem> {
  onChange: (value: string) => void;
  ariaLabel?: string;
  children: React.ReactNode;
  box?: boolean;
}

interface TabProps extends TabItem {
  onChange: (value: string) => void;
  box?: boolean;
  content?: React.ReactNode;
  selectedTabValue: string;
  icon?: JSX.Element;
}

interface TabPanelProps {
  value: string;
  currentValue: string;
  children: React.ReactNode;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const TabList: React.FC<TabListProps> = ({
  onChange,
  ariaLabel,
  children,
  box = false,
}) => {
  const handleTabChange = (value: string) => {
    onChange(value);
  };

  return (
    <div
      className={cn(
        "flex items-center",
        box
          ? "bg-gray-50 rounded-lg border border-gray-200"
          : "border-b border-gray-200"
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<TabProps>, {
            onChange: handleTabChange,
            box,
          });
        }
        return null;
      })}
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({
  label,
  value,
  onChange,
  icon,
  content,
  box = false,
  selectedTabValue,
}) => {
  const handleClick = () => {
    onChange(value);
  };

  const isSelected = value === selectedTabValue;

  return (
    <button
      role="tab"
      className={`flex items-center gap-2 px-4 py-3 text-text-sm font-medium cursor-pointer hover:bg-gray-100 hover:rounded-t transition-all ease-linear duration-200 delay-75 ${
        isSelected && !box
          ? "text-primary-600 border-b-2 border-primary-600"
          : "border-b-2 border-transparent text-gray-700"
      } ${isSelected && box ? "bg-white hover:bg-white shadow-md" : ""} ${
        box ? "m-1 rounded-lg" : "m-0"
      }`}
      onClick={handleClick}
    >
      {icon} {label} {content}
    </button>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  currentValue,
  children,
}) => {
  return value === currentValue ? <div>{children}</div> : null;
};

export default TabsContainer;
