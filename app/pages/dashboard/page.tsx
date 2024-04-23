"use client"
import Sidebar from "@/app/components/sidebar";
import React from "react";
import TableSorting from "../../components/Table/TableSorting";
import TableExpanding from "../../components/Table/TableExpanding";
import TableFixedColumn from "../../components/Table/TableFixedColumn";

const Dashboard = () => {
  return <div>
     <TableFixedColumn  />
        {/* <TableExpanding /> */}
        {/* <TableSorting /> */}
  </div>;
};

export default Dashboard;
