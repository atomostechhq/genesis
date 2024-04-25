"use client"
import Chip from "@/app/components/Chip";
import CombinedTable from "@/app/components/Table/BasicTable";
import { tableData, User } from "@/app/components/Table/table";
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


interface Props {
  subRows: User[];
}

const ExpandedRow: React.FC<Props> = ({ subRows }) => (
  <>
    {subRows &&
      subRows.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.age}</td>
          <td>{row.visits}</td>
          <td>{row.progress}</td>
          <td>{row.status}</td>
        </tr>
      ))}
  </>
);

const defaultColumns = [
  {
    header: "ID",
    accessorKey: "id",
    width: 60,
  },
  {
    header: "Age",
    accessorKey: "age",
    width: 250,
  },
  {
    header: "First Name",
    accessorKey: "firstName",
    width: 200,
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
    width: 200,
  },
  {
    header: "Progress",
    accessorKey: "progress",
    width: 200,
  },
  {
    header: "Status",
    accessorKey: "status",
    width: 200,
  },
  {
    header: "Visits",
    accessorKey: "visits",
    width: 200,
  },
];


const Page = () => {
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
      <CombinedTable ExpandedRow={ExpandedRow} defaultColumns={defaultColumns} />
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>First Name</TableHeadCell>
            <TableHeadCell>Last Name</TableHeadCell>
            <TableHeadCell>Age</TableHeadCell>
            <TableHeadCell>Visits</TableHeadCell>
            <TableHeadCell>Progress</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageData?.map((data, index) => (
            <TableRow key={index}>
              <TableDataCell>{data.firstName}</TableDataCell>
              <TableDataCell>{data.lastName}</TableDataCell>
              <TableDataCell>{data.age}</TableDataCell>
              <TableDataCell>{data.visits}</TableDataCell>
              <TableDataCell>{data.progress}</TableDataCell>
              <TableDataCell>
                <Chip intent="primary">{data.status}</Chip>
              </TableDataCell>
            </TableRow>
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
      /> */}
    </div>
  );
};

export default Page;
