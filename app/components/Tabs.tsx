import React, { createContext, useContext } from "react";

interface TabContextData {
  position: string;
  selectedTabValue: string;
  handleTabChange: (value: string) => void;
}

const defaultContextData: TabContextData = {
  position: 'top',
  selectedTabValue: '',
  handleTabChange: () => {},
};

const TabsContainerContext = createContext<TabContextData>(defaultContextData);

type TabContextProps = {
  value: string;
  position: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

export const TabContext = ({
  value,
  position,
  children,
  onChange,
}: TabContextProps) => {
  const data = { position, selectedTabValue: value, handleTabChange: onChange };
  return (
    <TabsContainerContext.Provider value={data}>
      {children}
    </TabsContainerContext.Provider>
  );
};

export const TabList = ({ children }: { children: React.ReactNode }) => {
  const { position } = useContext(TabsContainerContext) || { position: "" };
  return <ul className={`flex items-center border-b border-gray-600 ${position}`}>{children}</ul>;
};

type TabProps = {
  value: string;
  children: React.ReactNode;
};

export const Tab = ({ value, children }: TabProps) => {
  const { selectedTabValue, handleTabChange, position } =
    useContext(TabsContainerContext) || {};

  const handleClick = () => {
    if (value !== selectedTabValue && handleTabChange) {
      handleTabChange(value);
    }
  };

  return (
    <li
      className={`flex items-center px-4 py-3 text-text-sm font-medium active:bg-primary-50 hover:bg-primary-50 cursor-pointer ${
        value === selectedTabValue
          ? "text-primary-700 border-b-2 border-primary-700"
          : "border-b-2 border-transparent"
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
  return value === selectedTabValue ? (
    <div className="tab-panel">{children}</div>
  ) : null;
};

export default TabContext;
