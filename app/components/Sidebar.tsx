import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "../utils/utils";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import { usePathname } from "next/navigation";

// Define the props interfaces
interface SidebarProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navItems?: {
    label: string;
    items: {
      label: string;
      href: string;
      icon?: React.ReactElement;
    }[];
  }[];
}

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  children: ReactNode;
}

interface SidebarMenuProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navItems?: {
    label: string;
    items: {
      label: string;
      href: string;
      icon?: React.ReactElement;
    }[];
  }[];
}

interface FooterProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navItems?: {
    label: string;
    items: {
      label: string;
      href: string;
      icon?: React.ReactElement;
    }[];
  }[];
}

// Sidebar component
const Sidebar: React.FC<SidebarProps> & {
  Header: React.FC<SidebarHeaderProps>;
  Menu: React.FC<SidebarMenuProps>;
  Footer: React.FC<FooterProps>;
} = ({ children, collapsed, setCollapsed }) => {
  return (
    <div
      className={cn(
        "border border-gray-200 shadow-md relative flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-[80px] py-[21px] px-[17px] " : "w-[308px] py-[22px] px-6"
      )}
    >
      <div className="">{children}</div>
    </div>
  );
};

// SidebarHeader component
const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  setCollapsed,
  children,
}) => {
  return (
    <div
      className={cn({
        "z-20": true,
      })}
    >
      <div className="flex justify-between items-center">
        {!collapsed && <span className="whitespace-nowrap">{children}</span>}
        <button
          className={cn({
            "grid place-content-center": true,
            "hover:bg-gray-100 ": true,
            "w-10 h-10 rounded-full": true,
          })}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ArrowLeftSLineIcon color="#101828" />
        </button>
      </div>
    </div>
  );
};

// SidebarMenu component
const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed, navItems }) => {
  const currentPath = usePathname();

  return (
    <nav className="flex-grow">
      <ul className="my-2 flex flex-col gap-2 items-stretch">
        {navItems?.map((parentItem, parentIndex) => (
          <li key={parentIndex} className="flex flex-col gap-3 mb-6">
            <p
              className={cn({
                "text-text-sm text-gray-500": true,
                "w-[37px] text-ellipsis whitespace-nowrap overflow-hidden":
                  collapsed,
              })}
            >
              {parentItem.label}
            </p>

            {
              <ul className="">
                {parentItem?.items.map((item, index) => (
                  <li
                    key={index}
                    className={cn({
                      "hover:bg-gray-100 px-3 py-2 flex items-center mb-[6px] cursor-pointer rounded-md transition-colors duration-300":
                        true,
                      "text-white font-semibold bg-primary-600":
                        currentPath === `${item?.href}`,
                      "text-slate-600": currentPath !== `${item?.href}`,
                      "hover:bg-primary-600": currentPath === `${item?.href}`,
                    })}
                  >
                    <Link
                      className={`flex items-center gap-2`}
                      href={item.href}
                      passHref
                    >
                      <span className="text-text-sm"> {item.icon}</span>
                      {!collapsed && <span className="">{item.label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Footer component
const Footer: React.FC<FooterProps> = ({
  children,
  setCollapsed,
  collapsed,
  navItems,
}) => {
  const currentPath = usePathname();
  return (
    <div
      className={cn({
        "absolute bottom-0 py-3 w-[85%]": true,
        "w-[55%]": collapsed,
      })}
      onClick={() => setCollapsed(true)}
    >
      <nav className="flex-grow w-full">
        <ul className="my-2 flex flex-col gap-2 items-stretch">
          {navItems?.map((parentItem, parentIndex) => (
            <li key={parentIndex} className="flex flex-col gap-3 mb-1">
              <p
                className={cn({
                  "text-text-sm text-gray-500": true,
                  "w-[37px] text-ellipsis whitespace-nowrap overflow-hidden":
                    collapsed,
                })}
              >
                {parentItem.label}
              </p>
              {
                <ul className="">
                  {parentItem?.items.map((item, index) => (
                    <li
                      key={index}
                      className={cn({
                        "hover:bg-gray-100 px-3 py-2 flex items-center mb-[6px] cursor-pointer rounded-md transition-colors duration-300":
                          true,
                        "text-white font-semibold bg-primary-600":
                          currentPath === `${item?.href}`,
                        "text-slate-600": currentPath !== `${item?.href}`,
                        "hover:bg-primary-600": currentPath === `${item?.href}`,
                      })}
                    >
                      <Link
                        className={`flex items-center gap-2`}
                        href={item.href}
                        passHref
                      >
                        <span className="text-text-sm"> {item.icon}</span>
                        {!collapsed && <span className="">{item.label}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
};

Sidebar.Header = SidebarHeader;
Sidebar.Menu = SidebarMenu;
Sidebar.Footer = Footer;

export default Sidebar;
