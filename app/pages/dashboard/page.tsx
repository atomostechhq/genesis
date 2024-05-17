"use client";
import Sidebar from "../../components/Sidebar";
import React, { useState } from "react";
import {
  RiAddCircleFill,
  RiArrowRightSLine,
  RiHome2Line,
} from "@remixicon/react";
import Breadcrumb from "@/app/components/Breadcrumb";

const Dashboard = () => {
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
        <Breadcrumb
          homeElement={<RiHome2Line size={18} />}
          separator={
            <span>
              <RiArrowRightSLine size={18} color="gray" />
            </span>
          }
          activeClasses="bg-gray-200"
          containerClasses="flex gap-[6px] items-center"
          listClasses="hover:bg-gray-100 rounded-lg py-[6px] px-3 text-text-xs font-semibold font-bold cursor-pointer"
          capitalizeLinks
        />
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
