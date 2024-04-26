"use client";
"use client";
import Chip from "@/app/components/Chip";
import CombinedTable from "@/app/components/Table/BasicTable";
import { tableData, User } from "@/app/components/Table/table";
import TableSorting from "@/app/components/Table/TableSorting";
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
import SortAscIcon from "remixicon-react/SortAscIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ArrowUpSLineIcon from "remixicon-react/ArrowUpSLineIcon";

// interface Props {
//   subRows: User[];
// }

// const ExpandedRow: React.FC<Props> = ({ subRows }) => (
//   <>
//     {subRows &&
//       subRows.map((row) => (
//         <tr key={row.id}>
//           <td>{row.id}</td>
//           <td>{row.firstName}</td>
//           <td>{row.lastName}</td>
//           <td>{row.age}</td>
//           <td>{row.visits}</td>
//           <td>{row.progress}</td>
//           <td>{row.status}</td>
//         </tr>
//       ))}
//   </>
// );

// const defaultColumns = [
//   {
//     header: "ID",
//     accessorKey: "id",
//     width: 60,
//   },
//   {
//     header: "Age",
//     accessorKey: "age",
//     width: 250,
//   },
//   {
//     header: "First Name",
//     accessorKey: "firstName",
//     width: 200,
//   },
//   {
//     header: "Last Name",
//     accessorKey: "lastName",
//     width: 200,
//   },
//   {
//     header: "Progress",
//     accessorKey: "progress",
//     width: 200,
//   },
//   {
//     header: "Status",
//     accessorKey: "status",
//     width: 200,
//   },
//   {
//     header: "Visits",
//     accessorKey: "visits",
//     width: 200,
//   },
// ];

const StickyTable = () => {
  // array to populate rows
  const [data, setdata] = useState(tableData);
  return (
    <div className="overflow-auto">
      <Table className="table-fixed w-full">
        <TableHead>
          <TableRow className="text-left">
            <TableHeadCell className="w-10 p-2 sticky left-0 bg-indigo-900 text-white">
              ID
            </TableHeadCell>
            <th className="w-40 p-2 bg-indigo-900 text-white">
              Column 2
            </th>
            <th className="w-96 p-2 bg-indigo-500">Column 3</th>
            <th className="w-96 p-2 bg-indigo-500">Column 4</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id} className="text-left">
                <TableDataCell sticky left={"0px"} className="p-2 bg-white">{item.id}</TableDataCell>
                <TableDataCell sticky left={"40px"} className="bg-white">{item.firstName}</TableDataCell>
                <TableDataCell sticky left="200px" className="p-2">{item.lastName}</TableDataCell>
                <TableDataCell  className="p-2">{item.age}</TableDataCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

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
    <div className="overflow-auto">
      <TableSorting />
      {/* <StickyTable /> */}
      {/* <CombinedTable ExpandedRow={ExpandedRow} defaultColumns={defaultColumns} /> */}
      {/* <Table className="table-fixed w-full">
        <TableHead>
          <TableRow>
            <TableHeadCell className="sticky left-[40px] bg-indigo-900 text-white">
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
                <TableDataCell className="sticky left-[40px] bg-indigo-900 text-white">
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
      </Table> */}
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

export default Page;
