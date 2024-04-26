"use client";
import { tableData, User } from "@/app/components/Table/table";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/app/components/TableComponents";
import React, { useState } from "react";
import SortAscIcon from "remixicon-react/SortAscIcon";
import Chip from "../Chip";

const TableSorting = () => {
  const [data, setData] = useState<User[]>(tableData);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' }>({
    key: 'id',
    direction: 'ascending',
  });
  
  const sortBy = (key: keyof User) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
  
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
  
      // Check if either aValue or bValue is undefined
      if (aValue === undefined || bValue === undefined) {
        return 0; // or handle this case as needed
      }
  
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  
    setSortConfig({ key, direction });
    setData(sortedData);
  };
  
  return (
    <div className="overflow-auto">
      <Table className="w-full table-fixed">
        <TableHead>
          <TableRow className="text-left">
            <TableHeadCell sticky left="10px" onClick={() => sortBy('id')}>
              ID
            </TableHeadCell>
            <TableHeadCell icon={<SortAscIcon onClick={() => sortBy('firstName')} />} >First Name</TableHeadCell>
            <TableHeadCell  icon={<SortAscIcon onClick={() => sortBy('lastName')} />} >Last Name</TableHeadCell>
            <TableHeadCell  icon={<SortAscIcon onClick={() => sortBy('age')} />} >Age</TableHeadCell>
            <TableHeadCell  icon={<SortAscIcon onClick={() => sortBy('progress')} />} >Progress</TableHeadCell>
            <TableHeadCell  icon={<SortAscIcon onClick={() => sortBy('status')} />} >Status</TableHeadCell>
            <TableHeadCell  icon={<SortAscIcon onClick={() => sortBy('visits')} />} >Visits</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow className="text-left">
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
              </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSorting;
