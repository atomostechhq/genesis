import React, { CSSProperties } from "react";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData, Person } from "./data";
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableDataCell } from "../TableComponents";

const getCommonPinningStyles = (column: Column<Person>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    id: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "age",
    id: "age",
    header: "Age",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "visits",
    id: "visits",
    header: "Visits",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    footer: (props) => props.column.id,
    size: 180,
  },
  {
    accessorKey: "progress",
    id: "progress",
    header: "Profile Progress",
    footer: (props) => props.column.id,
    size: 180,
  },
];

const TableFixedColumn = () => {
  const [data, setData] = React.useState(() => makeData(30));
  const [columns] = React.useState(() => [...defaultColumns]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="table-container">
      <Table
        style={{
          width: table.getTotalSize(),
        }}
      >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;

                return (
                  <TableHeadCell
                    key={header.id}
                    colSpan={header.colSpan}
                    //IMPORTANT: This is where the magic happens!
                    style={{ ...getCommonPinningStyles(column) }}
                     className="bg-gray-50"
                  >
                    <div className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}{" "}
                      {/* Demo getIndex behavior */}
                      {column.getIndex(column.getIsPinned() || "center")}
                    </div>
                    {!header.isPlaceholder && header.column.getCanPin() && (
                      <div className="flex gap-1 justify-center">
                        {header.column.getIsPinned() !== "left" ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin("left");
                            }}
                          >
                            {"<="}
                          </button>
                        ) : null}
                        {header.column.getIsPinned() ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin(false);
                            }}
                          >
                            X
                          </button>
                        ) : null}
                        {header.column.getIsPinned() !== "right" ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin("right");
                            }}
                          >
                            {"=>"}
                          </button>
                        ) : null}
                      </div>
                    )}
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                      }}
                    />
                  </TableHeadCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const { column } = cell;
                return (
                  <TableDataCell
                    key={cell.id}
                    //IMPORTANT: This is where the magic happens!
                    style={{ ...getCommonPinningStyles(column) }}
                    className="bg-white"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableDataCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableFixedColumn;
