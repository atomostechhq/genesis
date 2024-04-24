"use client";
import Button from "@/app/components/Button";
import Sidebar from "../../components/Sidebar";
import React, { useState } from "react";
import AddCircleFillIcon from "remixicon-react/AddCircleFillIcon";
import BreadCrumb from "@/app/components/Breadcrumbs";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <AddCircleFillIcon size={18} />,
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
  console.log("collapsed", collapsed);
  return (
    <div className="">
      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
        <BreadCrumb />
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
        <Sidebar.Footer
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          navItems={navItems}
        >
          <p className="flex justify-center items-center gap-2">
            {collapsed ? "" : "Logout"}
          </p>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
