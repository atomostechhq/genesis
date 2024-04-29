"use client";
import { tableData } from "@/app/components/Table/table";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/app/components/TableComponents";
import React, { useState } from "react";
import Chip from "../Chip";
import Button from "../Button";
import Pagination from "../Pagination";
import { cn } from "@/app/utils/utils";

const TableFixedColumn = () => {
  const [data, setdata] = useState(tableData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = (page + 1) * rowsPerPage;

  const currentPageData = data?.slice(startIndex, endIndex);
  return (
    <div className="shadow-sm rounded-xl">
      <div className="px-6 py-2 w-full h-[91px] border-b border-gray-200 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">Heading</h1>
            <Chip intent={"primary"}>Label</Chip>
          </div>
          <p className="text-sm text-gray-600">
            Keep track of vendor and their security ratings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"outlined"} intent={"primary-outlined"}>
            Button CTA
          </Button>
          <Button variant={"filled"} intent="primary">
            Button CTA
          </Button>
        </div>
      </div>
      <div className="overflow-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell sticky left="0px" shadow>
              ID
            </TableHeadCell>
            <TableHeadCell>First Name</TableHeadCell>
            <TableHeadCell>Last Name</TableHeadCell>
            <TableHeadCell>Age</TableHeadCell>
            <TableHeadCell>Progress</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Visits</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageData?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableDataCell sticky left="0px" shadow>
                  {item.id}
                </TableDataCell>
                <TableDataCell>{item.firstName}</TableDataCell>
                <TableDataCell>{item.lastName}</TableDataCell>
                <TableDataCell>{item.age}</TableDataCell>
                <TableDataCell>{item.progress}</TableDataCell>
                <TableDataCell>
                  <Chip intent={"primary"} size={"md"}>
                    {item.status}
                  </Chip>
                </TableDataCell>
                <TableDataCell>{item.visits}</TableDataCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
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

export default TableFixedColumn;
