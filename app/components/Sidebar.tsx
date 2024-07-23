"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "../utils/utils";
import { RiArrowLeftSLine } from "@remixicon/react";
import { usePathname } from "next/navigation";
import Divider from "@/app/components/Divider";

interface SidebarProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  scroll?: boolean;
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
  scroll?: boolean;
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
      onMouseEnter={() => setCollapsed(true)}
      onMouseLeave={() => setCollapsed(false)}
      className={cn(
        "border border-gray-200 shadow-sm relative flex flex-col min-h-screen transition-all duration-300 ease-in-out cursor-pointer",
        !collapsed ? "w-[80px] py-[21px] px-[17px]" : "w-[308px] py-[22px] px-6"
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
      <div className="flex justify-between items-center mb-4">
        <span className="whitespace-nowrap">{children}</span>
        {collapsed && (
          <button
            className={cn({
              "grid place-content-center": true,
              "hover:bg-gray-100 ": true,
              "rounded-full": true,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <RiArrowLeftSLine color="#101828" />
          </button>
        )}
      </div>
    </div>
  );
};

// SidebarMenu component
const SidebarMenu: React.FC<SidebarMenuProps> = ({
  collapsed,
  navItems,
  scroll = false,
}) => {
  const currentPath = usePathname();

  return (
    <nav
      className={`max-h-[60vh] ${scroll && "overflow-y-auto customScroll"}`}
    >
      <ul className="my-2 flex flex-col gap-2 items-stretch">
        {navItems?.map((parentItem, parentIndex) => (
          <li
            key={parentIndex}
            className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
          >
            <p
              className={cn({
                "text-[14px] text-gray-500": true,
                "w-[37px] text-ellipsis text-white whitespace-nowrap overflow-hidden":
                  !collapsed,
              })}
            >
              {parentItem.label}
            </p>

            {
              <ul>
                {parentItem?.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      className={cn({
                        "hover:bg-gray-100 px-3 py-2 flex items-center mb-[6px] cursor-pointer rounded-md transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden":
                          true,
                        "text-white bg-primary-600": currentPath === item?.href,
                        "text-gray-700": currentPath !== item?.href,
                        "hover:bg-primary-600": currentPath === item?.href,
                      })}
                      href={item.href}
                      passHref
                    >
                      <div
                        className={`flex items-center gap-2 whitespace-nowrap`}
                      >
                        <span className="text-text-sm"> {item.icon}</span>
                        <span className={cn(!collapsed ? "opacity-0" : "")}>
                          {item.label}
                        </span>
                      </div>
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
        "absolute bottom-0 max-h-[230px] overflow-auto bg-white z-10 py-3 w-[85%]":
          true,
        "w-[55%]": !collapsed,
      })}
      onClick={() => setCollapsed(true)}
    >
      {collapsed && (
        <div className="shadow-md">
          <Divider />
        </div>
      )}
      <nav className="flex-grow w-full">
        <ul className="my-2 flex flex-col gap-2 items-stretch">
          {navItems?.map((parentItem, parentIndex) => (
            <li
              key={parentIndex}
              className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
            >
              <p
                className={cn({
                  "text-[14px] text-gray-500": true,
                  "w-[37px] text-ellipsis text-white whitespace-nowrap overflow-hidden":
                    !collapsed,
                })}
              >
                {parentItem.label}
              </p>
              {
                <ul>
                  {parentItem?.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        className={cn({
                          "hover:bg-gray-100 px-3 py-2 flex items-center mb-[6px] cursor-pointer rounded-md transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden":
                            true,
                          "text-white bg-primary-600":
                            currentPath === item?.href,
                          "text-gray-700": currentPath !== item?.href,
                          "hover:bg-primary-600": currentPath === item?.href,
                        })}
                        href={item.href}
                        passHref
                      >
                        <div
                          className={`flex items-center gap-2 whitespace-nowrap`}
                        >
                          <span className="text-text-sm"> {item.icon}</span>
                          <span className={cn(!collapsed ? "opacity-0" : "")}>
                            {item.label}
                          </span>
                        </div>
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
