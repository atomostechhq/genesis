import React, { createContext, useContext } from "react";
import { cn } from "../utils/utils";

interface TabContextData {
  position: string;
  selectedTabValue: string;
  handleTabChange: (value: string) => void;
  box?: boolean;
}

const defaultContextData: TabContextData = {
  position: "top",
  selectedTabValue: "",
  handleTabChange: () => {},
  box: false,
};

const TabsContainerContext = createContext<TabContextData>(defaultContextData);

type TabContextProps = {
  value: string;
  position: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  box: boolean;
};

export const TabContext = ({
  value,
  position,
  children,
  onChange,
  box,
}: TabContextProps) => {
  const data = {
    position,
    box,
    selectedTabValue: value,
    handleTabChange: onChange,
  };
  return (
    <TabsContainerContext.Provider value={data}>
      {children}
    </TabsContainerContext.Provider>
  );
};

export const TabList = ({ children }: { children: React.ReactNode }) => {
  const { box } = useContext(TabsContainerContext) || { box: "" };
  const { position } = useContext(TabsContainerContext) || { position: "" };
  return (
    <ul
      className={cn(
        "flex items-center ",
        box ? "bg-gray-50" : "border-b border-gray-600"
      )}
    >
      {children}
    </ul>
  );
};

type TabProps = {
  value: string;
  children: React.ReactNode;
};

export const Tab = ({ value, children }: TabProps) => {
  const { selectedTabValue, handleTabChange, position, box } =
    useContext(TabsContainerContext) || {};

  const handleClick = () => {
    if (value !== selectedTabValue && handleTabChange) {
      handleTabChange(value);
    }
  };

  return (
    <li
      className={`flex items-center gap-2 px-4 py-3 text-text-sm font-medium hover:bg-gray-100 cursor-pointer ${
        value === selectedTabValue || box === false
          ? "text-primary-700 border-b-2 border-primary-700"
          : "border-b-2 border-transparent text-gray-700"
      } `}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

type TabPanelProps = {
  value: string;
  children: React.ReactNode;
};

export const TabPanel = ({ value, children }: TabPanelProps) => {
  const { selectedTabValue } = useContext(TabsContainerContext) || {};
  return value === selectedTabValue ? <div className="">{children}</div> : null;
};

export default TabContext;
