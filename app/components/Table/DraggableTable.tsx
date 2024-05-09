"use client";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/app/components/TableComponents";
import React, { useEffect, useState } from "react";
import { tableData } from "./table";
type TableRowData = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

const DraggableTable = () => {
  
  const [draggedItem, setDraggedItem] = useState<TableRowData | null>(null);
  console.log("draggedItem",draggedItem)
  const [initialData, setInitialData] = useState(tableData)

  const handleDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    const draggedItemIndex = initialData.findIndex(item => item.id === tableData[index].id);
    setDraggedItem(initialData[draggedItemIndex]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();
  
    if (draggedItem) {
      const targetRowIndex = Number(event.currentTarget.dataset.index);
      const updatedData = [...initialData];
      updatedData.splice(updatedData.indexOf(draggedItem), 1);
      updatedData.splice(targetRowIndex, 0, draggedItem);
      setInitialData(updatedData);
    }
  };
  

  useEffect(() => {
    console.log("initialData updated:", initialData);
  }, [initialData]);
  

  return (
    <div>
      <Table dense>
        <TableHead>
          <TableRow className="text-left">
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>First Name</TableHeadCell>
            <TableHeadCell>Last Name</TableHeadCell>
            <TableHeadCell>Age</TableHeadCell>
            <TableHeadCell>Progress</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Visits</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialData?.slice(0,10)?.map((item, index) => (
            <React.Fragment key={item.id}>
              <TableRow
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                data-index={index}
                className="text-left"
              >
                <TableDataCell>:: {item.id}</TableDataCell>
                <TableDataCell>{item.firstName}</TableDataCell>
                <TableDataCell>{item.lastName}</TableDataCell>
                <TableDataCell>{item.age}</TableDataCell>
                <TableDataCell>{item.progress}</TableDataCell>
                <TableDataCell>m</TableDataCell>
                <TableDataCell>{item.visits}</TableDataCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DraggableTable;
