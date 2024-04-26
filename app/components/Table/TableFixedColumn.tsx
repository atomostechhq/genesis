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

const TableFixedColumn = () => {
  const [data, setdata] = useState(tableData);
  return (
    <div className="overflow-auto">
      <Table className="w-full table-fixed">
        <TableHead>
          <TableRow className="text-left">
            <TableHeadCell sticky left="10px">
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
          {data.slice(0,10).map((item) => {
            return (
              <TableRow key={item.id} className="text-left">
                <TableDataCell sticky left="10px">{item.id}</TableDataCell>
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
  );
};

export default TableFixedColumn;
