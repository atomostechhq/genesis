import TableExpanding from "@/app/components/Table/TableExpanding";
import TableFixedColumn from "@/app/components/Table/TableFixedColumn";
import TableSorting from "@/app/components/Table/TableSorting";
import { RiArrowLeftSLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

const tables = () => {
  return (
    <div className="py-5 px-3 space-y-10">
      <h1 className="text-4xl text-primary-400 flex items-center">
        {" "}
        <Link href="/">
          <RiArrowLeftSLine size={40} />
        </Link>{" "}
        Tables
      </h1>
      <div className="space-y-2">
        <h1>Table With Fixed Column</h1>
        <TableFixedColumn />
      </div>
      <div className="space-y-2">
        <h1>Table With Row Expanding, Header and Pagination</h1>
        <TableExpanding />
      </div>
      <div className="space-y-2">
        <h1>Table With Sorting, Checkbox and Dense Mode</h1>
        <TableSorting />
      </div>
    </div>
  );
};

export default tables;
