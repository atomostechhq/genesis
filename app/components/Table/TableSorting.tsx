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
import { RiSortAsc } from "@remixicon/react";
import Chip from "../Chip";
import Checkbox from "../Checkbox";
import Pagination from "../Pagination";

const TableSorting = () => {
  const [data, setData] = useState<User[]>(tableData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "ascending" | "descending";
  }>({
    key: "id",
    direction: "ascending",
  });
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const sortBy = (key: keyof User) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      // Check if either aValue or bValue is undefined
      if (aValue === undefined || bValue === undefined) {
        return 0; // or handle this case as needed
      }

      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  // Checkbox

  const toggleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    const newData = data.map((item) => ({
      ...item,
      isChecked: newSelectAllChecked,
    }));
    setData(newData);
  };

  const handleCheckboxChange = (id: number) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setData(newData);
    setSelectAllChecked(newData.every((item) => item.isChecked));
  };

  // pagination

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
    <div className="overflow-auto">
      <Table dense>
        <TableHead>
          <TableRow className="text-left">
            <TableHeadCell>
              <Checkbox
                id="checkAll"
                checked={selectAllChecked}
                onChange={toggleSelectAll}
              />
            </TableHeadCell>
            <TableHeadCell icon={<RiSortAsc onClick={() => sortBy("id")} />}>
              ID
            </TableHeadCell>
            <TableHeadCell
              icon={<RiSortAsc onClick={() => sortBy("firstName")} />}
            >
              First Name
            </TableHeadCell>
            <TableHeadCell
              icon={<RiSortAsc onClick={() => sortBy("lastName")} />}
            >
              Last Name
            </TableHeadCell>
            <TableHeadCell icon={<RiSortAsc onClick={() => sortBy("age")} />}>
              Age
            </TableHeadCell>
            <TableHeadCell
              icon={<RiSortAsc onClick={() => sortBy("progress")} />}
            >
              Progress
            </TableHeadCell>
            <TableHeadCell
              icon={<RiSortAsc onClick={() => sortBy("status")} />}
            >
              Status
            </TableHeadCell>
            <TableHeadCell
              icon={<RiSortAsc onClick={() => sortBy("visits")} />}
            >
              Visits
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageData.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow className="text-left">
                <TableDataCell>
                  <Checkbox
                    id={`check-${item.id}`}
                    checked={item.isChecked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </TableDataCell>
                <TableDataCell>{item.id}</TableDataCell>
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

export default TableSorting;
