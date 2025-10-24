// "use client";
// import React, { ReactNode } from "react";
// import Link from "next/link";
// import { cn } from "../utils/utils";
// import { usePathname } from "next/navigation";
// import Divider from "@/app/components/Divider";

// interface SidebarProps {
//   children: React.ReactNode;
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   scroll?: boolean;
//   navItems?: {
//     label: string;
//     items: {
//       label: string;
//       href: string;
//       icon?: React.ReactElement;
//     }[];
//   }[];
// }

// interface SidebarHeaderProps {
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   children: ReactNode;
// }

// interface SidebarMenuProps {
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   scroll?: boolean;
//   navItems?: {
//     label: string;
//     items: {
//       label: string;
//       href: string;
//       icon?: React.ReactElement;
//     }[];
//   }[];
// }

// interface FooterProps {
//   children: React.ReactNode;
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
//   navItems?: {
//     label: string;
//     items: {
//       label: string;
//       href: string;
//       icon?: React.ReactElement;
//     }[];
//   }[];
// }

// // Sidebar component
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
//       <div className="">{children}</div>
//     </div>
//   );
// };

// // SidebarHeader component
// const SidebarHeader: React.FC<SidebarHeaderProps> = ({
//   collapsed,
//   setCollapsed,
//   children,
// }) => {
//   return (
//     <div
//       className={cn({
//         "z-20": true,
//       })}
//     >
//       <div className="flex justify-between items-center mb-4">
//         <span className="whitespace-nowrap">{children}</span>
//       </div>
//     </div>
//   );
// };

// // SidebarMenu component
// const SidebarMenu: React.FC<SidebarMenuProps> = ({
//   collapsed,
//   navItems,
//   scroll = false,
// }) => {
//   const currentPath = usePathname();

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
//               className={cn({
//                 "text-[14px] text-gray-500": true,
//                 "w-[37px] text-ellipsis text-white whitespace-nowrap overflow-hidden":
//                   !collapsed,
//               })}
//             >
//               {parentItem.label}
//             </p>

//             {
//               <ul>
//                 {parentItem?.items.map((item, index) => (
//                   <li key={index}>
//                     <Link
//                       className={cn({
//                         "hover:bg-gray-100 px-3 py-2 flex items-center mb-[6px] cursor-pointer rounded-md transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden":
//                           true,
//                         "text-white bg-primary-600": currentPath === item?.href,
//                         "text-gray-700": currentPath !== item?.href,
//                         "hover:bg-primary-600": currentPath === item?.href,
//                       })}
//                       href={item.href}
//                       passHref
//                     >
//                       <div
//                         className={`flex items-center gap-2 whitespace-nowrap`}
//                       >
//                         <span className="text-text-sm"> {item.icon}</span>
//                         <span className={cn(!collapsed ? "opacity-0" : "")}>
//                           {item.label}
//                         </span>
//                       </div>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             }
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// // Footer component
// const Footer: React.FC<FooterProps> = ({
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
//                           href={item.href}
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
// Sidebar.Footer = Footer;

// export default Sidebar;

"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { cn } from "../utils/utils";
import Divider from "@/app/components/Divider";
import { RiArrowRightSFill, RiArrowDownSFill } from "@remixicon/react";
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
  navItems?: {
    label: string;
    items: NavItem[];
  }[];
}

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  children: ReactNode;
}

interface SidebarMenuProps {
  collapsed: boolean;
  navItems?: {
    label: string;
    items: NavItem[];
  }[];
  scroll?: boolean;
}

interface FooterProps {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navItems?: {
    label: string;
    items: NavItem[];
  }[];
}

// -------------------- Sidebar --------------------

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
      <div>{children}</div>
    </div>
  );
};

// -------------------- SidebarHeader --------------------

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  setCollapsed,
  children,
}) => {
  return (
    <div className="z-20 mb-4">
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
}) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const currentPath = usePathname();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

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
      <ul>
        {items.map((item, index) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isActive = item.href === currentPath;
          const hasActiveChild =
            hasSubItems &&
            item.subItems!.some(
              (sub) =>
                sub.href === currentPath ||
                (sub.subItems &&
                  sub.subItems.some((s) => s.href === currentPath))
            );

          const isOpen =
            collapsed && (openMenus[item.label] || isActive || hasActiveChild); // FIXED: Use collapsed
          const paddingLeft = `${level * 16 + 12}px`;

          return (
            <li key={index}>
              {hasSubItems ? (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 mb-[6px] rounded-md cursor-pointer transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden",
                    isActive ? "bg-primary-600 text-white" : "text-gray-700",
                    isOpen ? "bg-gray-100" : "",
                    "hover:bg-gray-100"
                  )}
                  style={{ paddingLeft }}
                  onClick={(e) => {
                    if (collapsed) {
                      // FIXED: Use collapsed
                      toggleMenu(item.label);
                    }
                    if (!item.href) e.preventDefault();
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <span className="text-text-sm">{item.icon}</span>
                    )}
                    <span className={cn(!collapsed ? "opacity-0" : "")}>
                      {" "}
                      {/* CORRECT */}
                      {item.label}
                    </span>
                  </div>
                  {collapsed &&
                    hasSubItems && ( // FIXED: Use collapsed
                      <span>
                        {isOpen ? (
                          <RiArrowDownSFill size={16} />
                        ) : (
                          <RiArrowRightSFill size={16} />
                        )}
                      </span>
                    )}
                </Link>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 mb-[6px] rounded-md cursor-pointer transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden",
                    isActive ? "bg-primary-600 text-white" : "text-gray-700",
                    "hover:bg-gray-100"
                  )}
                  style={{ paddingLeft }}
                >
                  {item.icon && (
                    <span className="text-text-sm">{item.icon}</span>
                  )}
                  <span className={cn(!collapsed ? "opacity-0" : "")}>
                    {" "}
                    {/* CORRECT */}
                    {item.label}
                  </span>
                </Link>
              )}

              {hasSubItems &&
                isOpen &&
                renderMenuItems(item.subItems!, level + 1)}
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
        scroll && collapsed ? "overflow-y-auto customScroll" : "overflow-hidden" // FIXED: Use collapsed
      )}
    >
      <ul className="my-2 flex flex-col gap-2 items-stretch">
        {navItems?.map((parentItem, parentIndex) => (
          <li
            key={parentIndex}
            className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
          >
            <p
              className={cn(
                "text-[14px] text-gray-500",
                !collapsed ? "opacity-0" : "" // FIXED
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
  collapsed,
  setCollapsed,
  navItems,
}) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const currentPath = usePathname();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenuItems = (items: NavItem[], level = 0) => {
    return (
      <ul>
        {items.map((item, index) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenus[item.label] || false;

          return (
            <li key={index}>
              <div
                className={cn(
                  "hover:bg-gray-100 px-3 py-2 flex items-center justify-between mb-[6px] cursor-pointer rounded-md transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden"
                )}
                style={{ paddingLeft: `${level * 16 + 12}px` }}
                onClick={() =>
                  hasSubItems ? toggleMenu(item.label) : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon && (
                    <span className="text-text-sm">{item.icon}</span>
                  )}
                  {item.href && !hasSubItems ? (
                    <Link href={item.href}>
                      <span className={cn(!collapsed ? "opacity-0" : "")}>
                        {" "}
                        {/* FIXED */}
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <span className={cn(!collapsed ? "opacity-0" : "")}>
                      {" "}
                      {/* FIXED */}
                      {item.label}
                    </span>
                  )}
                </div>
                {hasSubItems &&
                  collapsed && ( // FIXED: Use collapsed
                    <span>
                      {isOpen ? (
                        <RiArrowDownSFill size={16} />
                      ) : (
                        <RiArrowRightSFill size={16} />
                      )}
                    </span>
                  )}
              </div>

              {hasSubItems &&
                isOpen &&
                collapsed && // FIXED: Use collapsed
                renderMenuItems(item.subItems!, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 max-h-[230px] overflow-auto bg-white z-10 py-3",
        !collapsed ? "w-[55%]" : "w-[85%]" // FIXED: Reversed width logic
      )}
      onClick={() => setCollapsed(false)} // FIXED: Expand on click
    >
      {collapsed && <Divider />} {/* FIXED: Show divider when collapsed */}
      {navItems?.map((parentItem, i) => (
        <div key={i}>
          <p
            className={cn(
              "text-gray-500 text-[14px] mb-2",
              !collapsed ? "opacity-0" : ""
            )}
          >
            {" "}
            {/* FIXED */}
            {parentItem.label}
          </p>
          {renderMenuItems(parentItem.items)}
        </div>
      ))}
      {children}
    </div>
  );
};
// -------------------- Attach Subcomponents --------------------

Sidebar.Header = SidebarHeader;
Sidebar.Menu = SidebarMenu;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
