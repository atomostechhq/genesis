// "use client";
// import React, { ReactNode, useState } from "react";
// import Link from "next/link";
// import { cn } from "../utils/utils";
// import Divider from "@/app/components/Divider";
// import { RiArrowRightSFill, RiArrowDownSFill, RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";
// import { usePathname } from "next/navigation";

// // -------------------- Types --------------------

// interface NavItem {
//   label: string;
//   href?: string;
//   icon?: React.ReactElement;
//   subItems?: NavItem[];
// }

// interface SidebarProps {
//   children: React.ReactNode;
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   scroll?: boolean;
//   navItems?: {
//     label: string;
//     items: NavItem[];
//   }[];
// }

// interface SidebarHeaderProps {
//   children: ReactNode;
// }

// interface SidebarMenuProps {
//   collapsed: boolean;
//   navItems?: {
//     label: string;
//     items: NavItem[];
//   }[];
//   scroll?: boolean;
// }

// interface FooterProps {
//   children: React.ReactNode;
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   navItems?: {
//     label: string;
//     items: NavItem[];
//   }[];
// }

// // -------------------- Sidebar --------------------

// const Sidebar: React.FC<SidebarProps> & {
//   Header: React.FC<SidebarHeaderProps>;
//   Menu: React.FC<SidebarMenuProps>;
//   Footer: React.FC<FooterProps>;
// } = ({ children, collapsed, setCollapsed }) => {
//   return (
//     <div
//       onMouseEnter={() => setCollapsed(true)}
//       onMouseLeave={() => setCollapsed(false)}
//       className={cn(
//         "border border-gray-200 shadow-sm relative flex flex-col min-h-screen transition-all duration-300 ease-in-out cursor-pointer",
//         !collapsed ? "w-[80px] py-[21px] px-[17px]" : "w-[308px] py-[22px] px-6"
//       )}
//     >
//       <div>{children}</div>
//     </div>
//   );
// };

// // -------------------- SidebarHeader --------------------

// const SidebarHeader: React.FC<SidebarHeaderProps> = ({
//   children,
// }) => {
//   return (
//     <div className="z-20 mb-4">
//       <div className="flex justify-between items-center">
//         <span className="whitespace-nowrap">{children}</span>
//       </div>
//     </div>
//   );
// };

// // -------------------- SidebarMenu --------------------
// const SidebarMenu: React.FC<SidebarMenuProps> = ({
//   collapsed,
//   navItems,
//   scroll = false,
// }) => {
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
//   const currentPath = usePathname();

//   const toggleMenu = (label: string) => {
//     setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Calculate menu height based on footer items
//   const getMenuHeight = () => {
//     const footerItemsLength =
//       navItems?.reduce((acc, item) => acc + item.items.length, 0) || 0;
//     if (footerItemsLength <= 1) {
//       return "max-h-[80vh]";
//     } else if (footerItemsLength === 2) {
//       return "max-h-[70vh]";
//     } else {
//       return "max-h-[60vh]";
//     }
//   };

//   const renderMenuItems = (items: NavItem[], level = 0) => {
//     return (
//       <ul className={level > 0 ? "ml-5 border-l border-gray-200" : ""}>
//         {items?.map((item, index) => {
//           const hasSubItems = item.subItems && item.subItems.length > 0;
//           const isActive = item.href === currentPath;
//           const hasActiveChild =
//             hasSubItems &&
//             item.subItems!.some(
//               (sub) =>
//                 sub.href === currentPath ||
//                 (sub.subItems &&
//                   sub.subItems.some((s) => s.href === currentPath))
//             );

//           const isOpen =
//             collapsed && (openMenus[item.label] || isActive || hasActiveChild);
//           const paddingLeft = level === 0 ? "12px" : `${level * 5 + 12}px`;

//           return (
//             <li key={index}>
//               {hasSubItems ? (
//                 <Link
//                   href={item.href || "#"}
//                   className={cn(
//                     "flex items-center justify-between px-3 py-2 mb-[6px] rounded-md cursor-pointer transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden",
//                     isActive ? "bg-primary-600 text-white" : "text-gray-700",
//                     isOpen ? "bg-gray-100" : "",
//                     "hover:bg-gray-100",
//                     level > 0 ? "text-sm font-medium" : ""
//                   )}
//                   style={{ paddingLeft }}
//                   onClick={(e) => {
//                     if (collapsed) {
//                       toggleMenu(item.label);
//                     }
//                     if (!item.href) e.preventDefault();
//                   }}
//                 >
//                   <div className="flex items-center gap-2">
//                     {item.icon && level === 0 && (
//                       <span className="text-text-sm">{item.icon}</span>
//                     )}
//                     <span className={cn(!collapsed ? "opacity-0" : "")}>
//                       {item.label}
//                     </span>
//                   </div>
//                   {collapsed &&
//                     hasSubItems && (
//                       <span>
//                         {isOpen ? (
//                           <RiArrowDownSLine size={18} color="#475467" />
//                         ) : (
//                           <RiArrowRightSLine size={18} color="#475467" />
//                         )}
//                       </span>
//                     )}
//                 </Link>
//               ) : (
//                 <Link
//                   href={item.href || "#"}
//                   className={cn(
//                     "flex items-center gap-2 px-3 py-2 mb-[6px] rounded-md cursor-pointer transition-colors duration-300 whitespace-nowrap overflow-hidden",
//                     isActive ? "bg-primary-600 text-white" : "text-gray-700",
//                     "hover:bg-gray-100",
//                     level > 0 ? "text-sm font-medium" : "font-semibold"
//                   )}
//                   style={{ paddingLeft }}
//                 >
//                   {item.icon && level === 0 && (
//                     <span className="text-text-sm">{item.icon}</span>
//                   )}
//                   <span className={cn(!collapsed ? "opacity-0" : "")}>
//                     {item.label}
//                   </span>
//                 </Link>
//               )}

//               {hasSubItems && isOpen && (
//                 <div className="mt-1">
//                   {renderMenuItems(item.subItems!, level + 1)}
//                 </div>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   return (
//     <nav
//       className={cn(
//         getMenuHeight(),
//         "",
//         scroll && collapsed ? "overflow-y-auto customScroll" : "overflow-hidden"
//       )}
//     >
//       <ul className="my-2 flex flex-col gap-2 items-stretch">
//         {navItems?.map((parentItem, parentIndex) => (
//           <li
//             key={parentIndex}
//             className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
//           >
//             <p
//               className={cn(
//                 "text-[14px] text-gray-500 font-medium",
//                 !collapsed ? "opacity-0" : ""
//               )}
//             >
//               {parentItem.label}
//             </p>
//             {renderMenuItems(parentItem.items)}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// // -------------------- Footer --------------------

// const SidebarFooter: React.FC<FooterProps> = ({
//   children,
//   setCollapsed,
//   collapsed,
//   navItems,
// }) => {
//   const currentPath = usePathname();
//   return (
//     <div
//       className={cn({
//         "absolute bottom-0 max-h-[230px] overflow-auto bg-white z-10 py-3 w-[85%]":
//           true,
//         "w-[55%]": !collapsed,
//       })}
//       onClick={() => setCollapsed(true)}
//     >
//       {collapsed && (
//         <div className="shadow-md">
//           <Divider />
//         </div>
//       )}
//       {navItems && navItems.length > 0 && (
//         <nav className="flex-grow w-full">
//           <ul className="my-2 flex flex-col gap-2 items-stretch">
//             {navItems?.map((parentItem, parentIndex) => (
//               <li
//                 key={parentIndex}
//                 className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
//               >
//                 <p
//                   className={cn({
//                     "text-[14px] text-gray-500": true,
//                     "w-[37px] text-ellipsis text-white whitespace-nowrap overflow-hidden":
//                       !collapsed,
//                   })}
//                 >
//                   {parentItem.label}
//                 </p>
//                 {
//                   <ul>
//                     {parentItem?.items?.map((item, index) => (
//                       <li key={index}>
//                         <Link
//                           className={cn({
//                             "hover:bg-gray-100 px-3 py-2 flex items-center mb-[6px] cursor-pointer rounded-md transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden":
//                               true,
//                             "text-white bg-primary-600":
//                               currentPath === item?.href,
//                             "text-gray-700": currentPath !== item?.href,
//                             "hover:bg-primary-600": currentPath === item?.href,
//                           })}
//                           href={item?.href || "#"}
//                           passHref
//                         >
//                           <div
//                             className={`flex items-center gap-2 whitespace-nowrap`}
//                           >
//                             <span className="text-text-sm"> {item.icon}</span>
//                             <span className={cn(!collapsed ? "opacity-0" : "")}>
//                               {item.label}
//                             </span>
//                           </div>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 }
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//       {children}
//     </div>
//   );
// };

// Sidebar.Header = SidebarHeader;
// Sidebar.Menu = SidebarMenu;
// Sidebar.Footer = SidebarFooter;

// export default Sidebar;

"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { cn } from "../utils/utils";
import Divider from "@/app/components/Divider";
import {
  RiArrowRightSFill,
  RiArrowDownSFill,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";

// -------------------- Types --------------------

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactElement;
  subItems?: NavItem[];
}

interface SidebarProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  scroll?: boolean;
  dense?: boolean;
  navItems?: {
    label: string;
    items: NavItem[];
  }[];
}

interface SidebarHeaderProps {
  children: ReactNode;
  dense?: boolean;
}

interface SidebarMenuProps {
  collapsed: boolean;
  navItems?: {
    label: string;
    items: NavItem[];
  }[];
  scroll?: boolean;
  dense?: boolean;
}

interface FooterProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navItems?: {
    label: string;
    items: NavItem[];
  }[];
  dense?: boolean;
}

// -------------------- Sidebar --------------------

const Sidebar: React.FC<SidebarProps> & {
  Header: React.FC<SidebarHeaderProps>;
  Menu: React.FC<SidebarMenuProps>;
  Footer: React.FC<FooterProps>;
} = ({ children, collapsed, setCollapsed, dense = false }) => {
  return (
    <div
      onMouseEnter={() => setCollapsed(true)}
      onMouseLeave={() => setCollapsed(false)}
      className={cn(
        "border border-gray-200 shadow-sm relative flex flex-col min-h-screen transition-all duration-300 ease-in-out cursor-pointer",
        !collapsed
          ? dense
            ? "w-[76px] py-[19px] px-[15px]"
            : "w-[80px] py-[21px] px-[17px]"
          : dense
          ? "w-[304px] py-[20px] px-5"
          : "w-[308px] py-[22px] px-6"
      )}
    >
      <div>{children}</div>
    </div>
  );
};

// -------------------- SidebarHeader --------------------

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  dense = false,
}) => {
  return (
    <div className={cn("z-20", dense ? "mb-3" : "mb-4")}>
      <div className="flex justify-between items-center">
        <span className="whitespace-nowrap">{children}</span>
      </div>
    </div>
  );
};

// -------------------- SidebarMenu --------------------
const SidebarMenu: React.FC<SidebarMenuProps> = ({
  collapsed,
  navItems,
  scroll = false,
  dense = false,
}) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const currentPath = usePathname();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Close all submenus when sidebar collapses
  React.useEffect(() => {
    if (!collapsed) {
      setOpenMenus({});
    }
  }, [collapsed]);

  // Calculate menu height based on footer items
  const getMenuHeight = () => {
    const footerItemsLength =
      navItems?.reduce((acc, item) => acc + item.items.length, 0) || 0;
    if (footerItemsLength <= 1) {
      return "max-h-[80vh]";
    } else if (footerItemsLength === 2) {
      return "max-h-[70vh]";
    } else {
      return "max-h-[60vh]";
    }
  };

  const renderMenuItems = (items: NavItem[], level = 0) => {
    return (
      <ul className={level > 0 ? "ml-5 border-l border-gray-200" : ""}>
        {items?.map((item, index) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isActive = item.href === currentPath;

          const isOpen = openMenus[item.label];
          const paddingLeft =
            level === 0
              ? dense
                ? "10px"
                : "12px"
              : `${level * 5 + (dense ? 10 : 12)}px`;

          return (
            <li key={index}>
              {hasSubItems ? (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center justify-between rounded-md cursor-pointer transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden",
                    dense ? "px-3 py-1.5 mb-1" : "px-3 py-2 mb-[6px]",
                    isActive ? "bg-primary-600 text-white" : "text-gray-700",
                    isOpen ? "bg-gray-100" : "",
                    "hover:bg-gray-100",
                    level > 0 ? "text-sm font-medium" : ""
                  )}
                  style={{ paddingLeft }}
                  onClick={(e) => {
                    if (collapsed) {
                      toggleMenu(item.label);
                    }
                    if (!item.href) e.preventDefault();
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && level === 0 && (
                      <span className={dense ? "text-xs" : "text-text-sm"}>
                        {item.icon}
                      </span>
                    )}
                    <span className={cn(!collapsed ? "opacity-0" : "")}>
                      {item.label}
                    </span>
                  </div>
                  {collapsed && hasSubItems && (
                    <span>
                      {isOpen ? (
                        <RiArrowDownSLine
                          size={dense ? 16 : 18}
                          color="#475467"
                        />
                      ) : (
                        <RiArrowRightSLine
                          size={dense ? 16 : 18}
                          color="#475467"
                        />
                      )}
                    </span>
                  )}
                </Link>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-2 rounded-md cursor-pointer transition-colors duration-300 whitespace-nowrap overflow-hidden",
                    "hover:bg-gray-100",
                    dense ? "px-3 py-1 mb-1" : "px-3 py-2 mb-[6px]",
                    isActive
                      ? "bg-primary-600 hover:bg-primary-700 text-white"
                      : "text-gray-700",
                    level > 0 ? "text-sm font-medium" : "font-semibold"
                  )}
                >
                  {item.icon && level === 0 && (
                    <span className={dense ? "text-xs" : "text-text-sm"}>
                      {item.icon}
                    </span>
                  )}
                  <span className={cn(!collapsed ? "opacity-0" : "")}>
                    {item.label}
                  </span>
                </Link>
              )}

              {hasSubItems && isOpen && (
                <div className={dense ? "mt-0.5" : "mt-1"}>
                  {renderMenuItems(item.subItems!, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav
      className={cn(
        getMenuHeight(),
        "",
        scroll && collapsed ? "overflow-y-auto customScroll" : "overflow-hidden"
      )}
    >
      <ul
        className={cn(
          "flex flex-col gap-2 items-stretch",
          dense ? "my-1.5" : "my-2"
        )}
      >
        {navItems?.map((parentItem, parentIndex) => (
          <li
            key={parentIndex}
            className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
          >
            <p
              className={cn(
                "text-gray-500 font-medium",
                dense ? "text-[12px]" : "text-[14px]",
                !collapsed ? "opacity-0" : ""
              )}
            >
              {parentItem.label}
            </p>
            {renderMenuItems(parentItem.items)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// -------------------- Footer --------------------

const SidebarFooter: React.FC<FooterProps> = ({
  children,
  setCollapsed,
  collapsed,
  navItems,
  dense = false,
}) => {
  const currentPath = usePathname();
  return (
    <div
      className={cn({
        "absolute bottom-0 overflow-auto bg-white z-10": true,
        "max-h-[226px] py-2.5 w-[85%]": dense,
        "max-h-[230px] py-3 w-[85%]": !dense,
        "w-[53%]": !collapsed && dense,
        "w-[55%]": !collapsed && !dense,
      })}
      onClick={() => setCollapsed(true)}
    >
      {collapsed && (
        <div className="shadow-md">
          <Divider />
        </div>
      )}
      {navItems && navItems.length > 0 && (
        <nav className="flex-grow w-full">
          <ul
            className={cn(
              "flex flex-col gap-2 items-stretch",
              dense ? "my-1.5" : "my-2"
            )}
          >
            {navItems?.map((parentItem, parentIndex) => (
              <li
                key={parentIndex}
                className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
              >
                <p
                  className={cn({
                    "text-gray-500": true,
                    "text-[12px]": dense,
                    "text-[14px]": !dense,
                    "w-[35px] text-ellipsis text-white whitespace-nowrap overflow-hidden":
                      !collapsed && dense,
                    "w-[37px] text-ellipsis text-white whitespace-nowrap overflow-hidden":
                      !collapsed && !dense,
                  })}
                >
                  {parentItem.label}
                </p>
                {
                  <ul>
                    {parentItem?.items?.map((item, index) => (
                      <li key={index}>
                        <Link
                          className={cn({
                            "hover:bg-gray-100 flex items-center cursor-pointer rounded-md transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden":
                              true,
                            "px-2 py-1.5 mb-1": dense,
                            "px-3 py-2 mb-[6px]": !dense,
                            "text-white bg-primary-600":
                              currentPath === item?.href,
                            "text-gray-700": currentPath !== item?.href,
                            "hover:bg-primary-600": currentPath === item?.href,
                          })}
                          href={item?.href || "#"}
                          passHref
                        >
                          <div
                            className={`flex items-center gap-2 whitespace-nowrap`}
                          >
                            <span
                              className={dense ? "text-xs" : "text-text-sm"}
                            >
                              {" "}
                              {item.icon}
                            </span>
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
      )}
      {children}
    </div>
  );
};

Sidebar.Header = SidebarHeader;
Sidebar.Menu = SidebarMenu;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
