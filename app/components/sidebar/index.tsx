"use client";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import ListCheckIcon from "remixicon-react/ListCheckIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import SidebarItem from "./item";
import { useState } from "react";
import MenuFoldFillIcon from "remixicon-react/MenuFoldFillIcon";
import Image from "next/image";

interface ISidebarItem {
  name: string;
  path: string;
  icon: any;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: AlertFillIcon,
  },
  {
    name: "Transaction",
    path: "/transaction",
    icon: ListCheckIcon,
  },
  {
    name: "Payment",
    path: "/payment",
    icon: AlertFillIcon,
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: CloseLineIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: AlertFillIcon,
    items: [
      {
        name: "General",
        path: "/settings",
      },
      {
        name: "Security",
        path: "/settings/security",
      },
      {
        name: "Notifications",
        path: "/settings/notifications",
      },
    ],
  },
];

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  console.log("collapse", collapse);

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all bg-white duration-75 ease-linear ${
        collapse ? "w-20 overflow-hidden" : "w-64"
      } shadow-lg z-10 p-4`}
    >
      <div className="flex flex-col space-y-10 w-full">
        <section className="flex justify-between items-center">
          <Image className="h-10 w-fit" src="/logo-expanded.png" alt="Logo" />
          <MenuFoldFillIcon onClick={() => setCollapse((prev) => !prev)} />
        </section>
        <div className="flex flex-col space-y-2">
          {items?.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// make context to pass or write it in one file to pass states and data

export default Sidebar;
