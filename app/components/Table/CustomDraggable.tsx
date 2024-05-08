"use client";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/app/components/TableComponents";

import React, { useState } from "react";
import { tableData } from "./table";
import Pagination from "../Pagination";
type TableRowData = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

const CustomDraggable = () => {
  const [draggedItem, setDraggedItem] = useState<TableRowData | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    setDraggedItem(tableData[index]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault();

    if (draggedItem) {
      const targetRowIndex = Number(event.currentTarget.dataset.index);
      const updatedData = [...tableData];
      updatedData.splice(updatedData.indexOf(draggedItem), 1);
      updatedData.splice(targetRowIndex, 0, draggedItem);
      tableData.splice(0, tableData.length, ...updatedData);
    }
  };

  //   pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = (page + 1) * rowsPerPage;

  const currentPageData = tableData?.slice(startIndex, endIndex);

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
          {currentPageData?.map((item, index) => (
            <React.Fragment key={item.id}>
              <TableRow
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                data-index={index}
                className="text-left"
              >
                <TableDataCell>{item.id}</TableDataCell>
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
      <Pagination
        count={tableData?.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomDraggable;
