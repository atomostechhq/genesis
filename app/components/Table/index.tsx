import React, { InputHTMLAttributes } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import {
  Column,
  Table as OG,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { makeData, Person } from "./data";
import Input from "../Input";
import Chip from "../Chip";
import Button from "../Button";

const Table = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{" "}
            <div className="flex items-center justify-between">
              <span>First Name</span>
              <button
                {...{
                  onClick: table.getToggleAllRowsExpandedHandler(),
                }}
              >
                {table.getIsAllRowsExpanded() ? (
                  <ArrowDownSLineIcon />
                ) : (
                  <ArrowRightSLineIcon />
                )}
              </button>{" "}
            </div>
          </div>
        ),
        cell: ({ row, getValue }) => (
          <div className="w-[259.25px] px-5 flex items-center justify-start h-10">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />{" "}
            {getValue<boolean>()}
            {row.getCanExpand() ? (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? (
                  <ArrowDownSLineIcon />
                ) : (
                  <ArrowRightSLineIcon />
                )}
              </button>
            ) : (
              ""
            )}{" "}
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(100, 5, 3));
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // filterFromLeafRows: true,
    // maxLeafRowFilterDepth: 0,
    debugTable: true,
  });
  return (
    <div className="border shadow-md rounded-xl">
      {/* table head  */}
      <div className="max-w-[1216px] px-6 py-2 w-full h-[91px] border-b border-gray-200 flex items-center justify-between gap-2">
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
      {/* table content */}
      <table className="max-w-[1216px] px-6 py-2 w-full h-[91px]">
        <thead className="bg-gray-50 sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th className="px-5" key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className="w-[259.25px] flex items-center justify-start h-10">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="w-[259.25px] h-10" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex flex-wrap justify-between items-center gap-2 max-w-[1216px] w-full h-[60px] border-t border-gray-200 px-6 py-1">
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm text-gray-800">
            Items per page
          </span>
          <select
            value={table.getState().pagination.pageSize}
            className="border border-gray-700 rounded text-xs w-[88px] h-[27px] px-1"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="bg-gray-50 shadow-md"
              >
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm font-medium">
            page
            <Input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              value={table.getState().pagination.pageIndex + 1}
              className="w-[52px] bg-gray-25 px-2 h-7"
            />
            <span>of {table.getPageCount()}</span>
          </span>
          <div className="flex items-center">
            <button
              className="border-r-0 border px-3.5 w-12 h-8 border-gray-400 shadow-xs rounded-ss-lg rounded-es-lg flex justify-center items-center py-1.5"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftLineIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="border px-3.5 w-12 h-8 border-gray-400 shadow-xs rounded-se-lg rounded-ee-lg flex justify-center items-center py-1.5"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRightLineIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <>
      <input
        type="checkbox"
        ref={ref}
        className={className + "cursor-pointer"}
        {...rest}
      />
    </>
  );
}

export default Table;
