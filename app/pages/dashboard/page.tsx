"use client";
import Sidebar from "../../components/Sidebar";
import React, { useState } from "react";
import {
  RiAddCircleFill,
  RiArrowRightSLine,
  RiHome2Line,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/app/components/Breadcrumb";
import Link from "next/link";

const Dashboard = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiAddCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Setting 1",
          href: "/setting1",
        },
        {
          label: "Setting 2",
          href: "/setting2",
        },
      ],
    },
  ];
  return (
    <div className="">
      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
        <Breadcrumbs aria-label="breadcrumb" separator=">">
          <Link href="/" className="text-decoration-none text-inherit">
            Home
          </Link>
          {pathnames.map((name, index) => {
            const href = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isActive = href === pathname;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={href}>
                <Link
                  href={href}
                  className={`${
                    isActive
                      ? "bg-blue-500 text-white px-2 py-1 rounded-full"
                      : "text-decoration-none text-inherit"
                  } ${isLast ? "font-semibold" : ""}`}
                >
                  {name.replace(/-/g, " ").toUpperCase()}
                </Link>
                {/* {!isLast && <span className="mx-2">></span>} */}
              </React.Fragment>
            );
          })}
        </Breadcrumbs>
      </div>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
        <Sidebar.Header collapsed={collapsed} setCollapsed={setCollapsed}>
          <span>Logo</span>
        </Sidebar.Header>
        <Sidebar.Menu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          navItems={navItems}
        />
        <Sidebar.Footer collapsed={collapsed} setCollapsed={setCollapsed}>
          <p className="flex justify-center items-center gap-2">
            {collapsed ? "" : "Logout"}
          </p>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
