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
}

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  children: ReactNode;
}

interface SidebarMenuProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

// Define the navItems array
const navItems = [
  {
    label: "Home",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: <AlertFillIcon size={18} />,
      },
      {
        label: "Team",
        href: "/team",
        icon: <AlertFillIcon size={18} />,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Setting 1",
        href: "/setting1",
        icon: <AlertFillIcon size={18} />,
      },
      {
        label: "Setting 2",
        href: "/setting2",
        icon: <AlertFillIcon size={18} />,
      },
    ],
  },
];

// Sidebar component
const Sidebar: React.FC<SidebarProps> & {
  Header: React.FC<SidebarHeaderProps>;
  Menu: React.FC<SidebarMenuProps>;
  Footer: React.FC<SidebarProps>;
} = ({ children, collapsed, setCollapsed }) => {
  return (
    <div
      //   className={cn({
      //     "grid min-h-screen": true,
      //     "grid-cols-sidebar": !collapsed,
      //     "grid-cols-sidebar-collapsed": collapsed,
      //     "transition-[grid-template-columns] duration-300 ease-in-out": true,
      //   })}
      className={cn(
        "border border-gray-200 shadow-md relative flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-[80px] py-[21px] px-[17px] " : "w-[308px] py-[22px] px-6"
      )}
    >
      {/* <div className="">
        <button onClick={() => setCollapsed(true)}>
          <AlertFillIcon className="w-10 h-10" />
        </button>
      </div> */}
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
  const currentPath = usePathname();

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
const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed }) => {
  const currentPath = usePathname();
  console.log("currentPath", currentPath);

  return (
    <nav className="flex-grow">
      <ul className="my-2 flex flex-col gap-2 items-stretch">
        {navItems.map((parentItem, parentIndex) => (
          <li key={parentIndex} className="flex flex-col gap-3 mb-6">
            <p className="text-text-sm text-gray-500 w-[320x] text-ellipsis whitespace-nowrap overflow-hidden">
              {parentItem.label}
            </p>
            {
              <ul className="">
                {parentItem.items.map((item, index) => (
                  <li
                    key={index}
                    className={cn({
                      "hover:bg-gray-100 flex px-3 py-2 mb-[6px] items-center cursor-pointer rounded-md transition-colors duration-300":
                        true,
                    })}
                  >
                    <Link
                      className={`flex items-center gap-2,
                           ${
                             currentPath === `${item?.href}`
                               ? "text-white font-semibold bg-primary-600"
                               : "text-slate-600"
                           }
                          `}
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
const Footer: React.FC<SidebarProps> = ({ children, setCollapsed }) => {
  return (
    <div className="absolute bottom-0 py-3" onClick={() => setCollapsed(true)}>
      {children}
    </div>
  );
};

// Assign SidebarHeader, SidebarMenu, and Footer to Sidebar component
Sidebar.Header = SidebarHeader;
Sidebar.Menu = SidebarMenu;
Sidebar.Footer = Footer;

export default Sidebar;
