import DraggableTable from "@/app/components/Table/DraggableTable";
import TableExpanding from "@/app/components/Table/TableExpanding";
import TableFixedColumn from "@/app/components/Table/TableFixedColumn";
import TableSorting from "@/app/components/Table/TableSorting";
import React from "react";

const tables = () => {
  return (
    <div className="py-5 px-3 space-y-10">
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
      <div className="space-y-2">
        <h1>Draggable Table</h1>
        <DraggableTable />
      </div>
    </div>
  );
};

export default tables;
