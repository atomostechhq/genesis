"use client";
import Chip from "@/app/components/Chip";
import { tableData } from "@/app/components/Table/table";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/app/components/TableComponents";
import TablePagination from "@/app/components/TablePagination";
import React, { useState } from "react";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";

const TableExpanding = () => {
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

  // expandable row
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prevExpandedRows) => {
      if (prevExpandedRows?.includes(id)) {
        return [];
      }
      return [id];
    });
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>
              First Name
            </TableHeadCell>
            <TableHeadCell>Last Name</TableHeadCell>
            <TableHeadCell>Age</TableHeadCell>
            <TableHeadCell>Visits</TableHeadCell>
            <TableHeadCell>Progress</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageData?.map((data, index) => (
            <React.Fragment key={index}>
              <TableRow onClick={() => toggleRowExpansion(data.id)}>
                <TableDataCell>
                  <div className="flex items-center gap-1">
                    {data.firstName}{" "}
                    {data.subRows && data.subRows.length > 0 && (
                      <ArrowDownSLineIcon size={18} />
                    )}
                  </div>
                </TableDataCell>
                <TableDataCell>{data.lastName}</TableDataCell>
                <TableDataCell>{data.age}</TableDataCell>
                <TableDataCell>{data.visits}</TableDataCell>
                <TableDataCell>{data.progress}</TableDataCell>
                <TableDataCell>
                  <Chip intent="primary">{data.status}</Chip>
                </TableDataCell>
              </TableRow>
              {expandedRows?.includes(data.id) &&
                data.subRows &&
                data.subRows.map((subData, subIndex) => (
                  <TableRow key={`${index}-${subIndex}`}>
                    <TableDataCell>{subData.firstName}</TableDataCell>
                    <TableDataCell>{subData.lastName}</TableDataCell>
                    <TableDataCell>{subData.age}</TableDataCell>
                    <TableDataCell>{subData.visits}</TableDataCell>
                    <TableDataCell>{subData.progress}</TableDataCell>
                    <TableDataCell>
                      <Chip intent="primary">{subData.status}</Chip>
                    </TableDataCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <TablePagination
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

export default TableExpanding;