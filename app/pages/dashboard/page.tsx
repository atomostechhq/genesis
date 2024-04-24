"use client"
import Button from "@/app/components/Button";
import Sidebar from "@/app/components/Sidebar";
import React, { useState } from "react";


const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  console.log("collapsed", collapsed);
  return (
    <div>
       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <Sidebar.Header collapsed={collapsed} setCollapsed={setCollapsed}>
            <span>Logo</span>
          </Sidebar.Header>
          <Sidebar.Menu collapsed={collapsed} setCollapsed={setCollapsed} />
          <Sidebar.Footer collapsed={collapsed} setCollapsed={setCollapsed}>
            <Button
              className="w-full"
              variant="outlined"
              intent="default-outlined"
            >
              Log out
            </Button>
          </Sidebar.Footer>
        </Sidebar>
    </div>
  )
};

export default Dashboard;
