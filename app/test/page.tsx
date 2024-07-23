"use client";
import { RiAlertFill, RiCircleFill, RiLogoutBoxRLine } from "@remixicon/react";
import React, { useState } from "react";
import { Button, Divider, Sidebar } from "../components";

const Test = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [onHover, setOnHover] = useState(true);

  const navItems = [
    {
      label: "Page",
      items: [
        {
          label: "Home",
          href: "/",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Setting 1",
          href: "/setting1",
          icon: <RiAlertFill size={18} />,
        },
        {
          label: "Setting 2",
          href: "/setting2",
          icon: <RiCircleFill size={18} />,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Setting 1",
          href: "/setting1",
          icon: <RiAlertFill size={18} />,
        },
        {
          label: "Subitem 2",
          href: "/subitem2",
          icon: <RiAlertFill size={18} />,
        },
        {
          label: "Setting 2",

          href: "/setting2",
          icon: <RiCircleFill size={18} />,
        },
      ],
    },
  ];

  const footerItems = [
    {
      label: "Footer Item 1",
      items: [
        {
          label: "Subitem 3",
          href: "/subitem3",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const handleCardClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <section className=" bg-white fixed top-0 bottom-0 left-0">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <Sidebar.Header collapsed={collapsed} setCollapsed={setCollapsed}>
            <span onClick={() => setCollapsed((prev) => !prev)}>Logo</span>
          </Sidebar.Header>
          <Sidebar.Menu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            navItems={navItems}
          />
          <Sidebar.Footer
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            navItems={footerItems}
          >
            <Divider className="mb-3" />
            <Button
              className="w-full"
              variant="outlined"
              intent="default-outlined"
              startIcon={<RiLogoutBoxRLine size={20} />}
            >
              {collapsed ? "Logout" : "Logout"}
            </Button>
          </Sidebar.Footer>
        </Sidebar>
      </section>
      <section className="flex flex-col ml-20">
        <div className="flex items-center">
          <div className="relative">
            <div
              className={`group w-[100px] h-[100px] bg-gray-200 border border-gray-300 transition-all duration-300 cursor-pointer flex items-center justify-center absolute overflow-hidden ${
                expanded ? "w-[300px] relative" : "hover:w-[300px]"
              }`}
              onClick={handleCardClick}
            >
              <div className="flex flex-col items-center">
                <span>Riya Vishwakarma</span>
                <span
                  className="mt-2 bg-transparent group-hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the parent div click event
                    setExpanded((prev) => !prev);
                  }}
                >
                  Open
                </span>
              </div>
            </div>
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            aliquid officia explicabo tempore eum quibusdam, molestiae nobis.
            Itaque blanditiis dicta non magnam eveniet? Eveniet eos quaerat
            sequi facilis dolorem, corrupti ipsa? Sit ut quia eius provident
            laudantium numquam error adipisci. Exercitationem ullam amet
            assumenda magni aperiam excepturi odit neque, corporis error ut
            aspernatur unde est nisi nulla vel deleniti in numquam totam rerum
            fugiat, facilis repudiandae? Iusto reiciendis, quis, veniam,
            doloremque at eius ipsum vero nobis consequuntur libero ut facilis!
            In ea non deleniti unde quas facilis id veritatis doloribus, dolorum
            est, nemo minus, inventore tenetur placeat vitae provident mollitia.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Test;
