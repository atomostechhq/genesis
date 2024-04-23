import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { makeData, Person } from "./data";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../TableComponents";
import SortDescIcon from "remixicon-react/SortDescIcon";
import Edit2LineIcon from "remixicon-react/Edit2LineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Checkbox from "../Checkbox";

const sortStatusFn: SortingFn<Person> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;
  const statusOrder = ["single", "complicated", "relationship"];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

const TableSorting = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: () => "First Name",
        cell: (info) => info.getValue(),
        //this column will sort in ascending order by default since it is a string column
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => "Last Name",
        sortUndefined: "last", //force undefined values to the end
        sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      },
      {
        accessorKey: "age",
        header: () => "Age",
        //this column will sort in descending order by default since it is a number column
      },
      {
        accessorKey: "visits",
        header: () => "Visits",
        sortUndefined: "last", //force undefined values to the end
      },
      {
        accessorKey: "status",
        header: "Status",
        sortingFn: sortStatusFn, //use our custom sorting function for this enum column
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        // enableSorting: false, //disable sorting for this column
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(1_000));
  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    state: {
      sorting,
    },
  });

  return (
    <div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
               <TableHeadCell className="relative z-20">
                <Checkbox className="bg-white z-0" />
              </TableHeadCell>
              {headerGroup.headers.map((header) => {
                return (
                  <>
                    <TableHeadCell
                      icon={
                        <SortDescIcon
                       
                        size={14}
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      }
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === "asc"
                                  ? "Sort ascending"
                                  : header.column.getNextSortingOrder() ===
                                    "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                                : undefined
                            }
                          >
                            {{
                              asc: "",
                              desc: "",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </TableHeadCell>
                  </>
                );
              })}
              <TableHeadCell>
                Action
              </TableHeadCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table
            .getRowModel()
            .rows.slice(0, 15)
            .map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableDataCell>
                    <Checkbox />
                  </TableDataCell>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableDataCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableDataCell>
                    );
                  })}
                  <TableDataCell >
                    <div className="flex items-center gap-2">

                    <Edit2LineIcon className="hover:bg-gray-100 mx-1 w-7 h-7 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300" size={20} />
                    <DeleteBinLineIcon className="hover:bg-gray-100 mx-1 w-7 h-7 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300" size={20} />
                    </div>
                  </TableDataCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSorting;
