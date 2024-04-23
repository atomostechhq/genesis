import React, { CSSProperties, InputHTMLAttributes, useRef } from "react";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import {
  Column,
  Table as OG,
  ExpandedState,
  useReactTable,
  SortingFn,
  getSortedRowModel,
  SortingState,
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
import { cn } from "@/app/utils/utils";
import { TableBody, TableDataCell, TableHead, TableHeadCell, Table as TableMain, TableRow}  from "../TableComponents";

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
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};


//custom sorting logic for one of our enum columns
const sortStatusFn: SortingFn<Person> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.status
  const statusB = rowB.original.status
  const statusOrder = ['single', 'complicated', 'relationship']
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB)
  }
  

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    id: "firstName",
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
          {/* <button
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
            }}
          >
            {table.getIsAllRowsExpanded() ? (
              <ArrowDownSLineIcon />
            ) : (
              <ArrowRightSLineIcon />
            )}
          </button>{" "} */}
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
    size: 180,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
    size: 180,
    sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false,
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
    sortUndefined: 'last',
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    footer: (props) => props.column.id,
    sortingFn: sortStatusFn,
    size: 180,
  },
  {
    accessorKey: 'rank',
    header: 'Rank',
    invertSorting: true, //invert the sorting order (golf score-like where smaller is better)
  },
  {
    accessorKey: "progress",
    id: "progress",
    header: "Profile Progress",
    footer: (props) => props.column.id,
    size: 180,
  },
];


const Table = () => {
  const [data, setData] = React.useState(() => makeData(100, 5, 3));
  console.log("data", data)
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columns] = React.useState(() => [...defaultColumns]);
  const [sorting, setSorting] = React.useState<SortingState>([])


  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      sorting
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
  });

  
  return (
    <div className="border shadow-md rounded-xl">
      {/* table head  */}
      <div className="max-w-[1216px] overflow-x-scroll relative px-6 py-2 w-full h-[91px] border-b border-gray-200 flex items-center justify-between gap-2">
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
      <TableMain
        style={{ width: table.getTotalSize() }}
        className={cn("max-w-[1000px] px-6 py-2 bg-white w-full h-[91px]")}
      >
        <TableHead className="sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;
                return (
                  <TableHeadCell
                    className="px-5"
                    key={header.id}
                    style={{ ...getCommonPinningStyles(column) }}
                    colSpan={header.colSpan}
                  >
                    <div className={cn(header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '')}
                            onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                            >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {column.getIndex(column.getIsPinned() || "center")}
                      {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {!header.isPlaceholder && header.column.getCanPin() && (
                        <div className="flex gap-1 justify-center">
                          {header.column.getIsPinned() !== 'left' ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin('left')
                              }}
                            >
                              {'<='}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin(false)
                              }}
                            >
                              X
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== 'right' ? (
                            <button
                              className="border rounded px-2"
                              onClick={() => {
                                header.column.pin('right')
                              }}
                            >
                              {'=>'}
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
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                        }}
                      />
                  </TableHeadCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody className="">
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell
                  return (
                    <TableDataCell 
                    style={{ ...getCommonPinningStyles(column) }} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableDataCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableMain>
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
  }, [ref, indeterminate, rest.checked]);

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
