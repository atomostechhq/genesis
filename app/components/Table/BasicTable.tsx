"use client"
import React, { useState } from "react";
import { tableData, User } from "../Table/table";
import { cn } from "@/app/utils/utils";
import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow } from "../TableComponents";
import TablePagination from "../TablePagination";


interface TableComponentProps {
  defaultColumns: any;
  ExpandedRow:any;
}

type ColumnDef<T> = {
  header: string; //header Text
  accessorKey: keyof T; //key for how to get the value
  width: number; // column width
  isPinned?: boolean; //column pinned state
};



const CombinedTable = ({ExpandedRow,defaultColumns}:TableComponentProps) => {
  const [columns, setColumns] = useState<ColumnDef<User>[]>([
    ...defaultColumns,
  ]);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [data, setData] = useState<User[]>(tableData);

  const onPinColumn = (accessorKey: keyof User, isPinned: boolean = false) => {
    const newCols = columns.map((col) => {
      if (col.accessorKey === accessorKey) {
        return {
          ...col,
          isPinned,
        };
      }
      return col;
    });

    newCols.sort((a, b) => {
      const aPinned = a.isPinned ? 1 : 0;
      const bPinned = b.isPinned ? 1 : 0;
      return bPinned - aPinned;
    });
    setColumns([...newCols]);
  };

  const getLeftStickyPos = (index: number) => {
    if (!index) return 0;

    const prevColumnsTotalWidth = columns
      .slice(0, index)
      .reduce((curr, column) => {
        return curr + column.width;
      }, 0);
    return prevColumnsTotalWidth;
  };

  const handleRowClick = (id: number) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
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
    <div>
      <div className="overflow-auto max-h-[400px]">
        <Table className="table-fixed w-full">
          <TableHead>
            <TableRow>
              {columns.map((col, i) => {
                return (
                  <TableHeadCell
                    className={cn({
                      "p-2 text-left whitespace-nowrap": true,
                      "bg-indigo-500": !col.isPinned,
                      "sticky bg-indigo-900 text-indigo-50": col.isPinned,
                    })}
                    style={{
                      left: getLeftStickyPos(i),
                      width: col.width,
                    }}
                    key={col.header}
                  >
                    {col.header}
                    <button
                      onClick={() =>
                        onPinColumn(col.accessorKey, !col.isPinned)
                      }
                      className="mx-2 text-xs text-white"
                    >
                      {col.isPinned ? "x" : "pin"}
                    </button>
                  </TableHeadCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData?.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <TableRow
                    onClick={() => handleRowClick(item.id)}
                    className="text-left"
                  >
                    {columns.map((col, i) => {
                      const accessorKey = col.accessorKey;
                      const value = item[accessorKey];
                      return (
                        <TableDataCell
                          className={cn({
                            "p-2": true,
                            "sticky bg-indigo-200": col.isPinned,
                          })}
                          style={{
                            left: getLeftStickyPos(i),
                            width: col.width,
                          }}
                          key={col.header}
                        >
                          {value?.toString()}
                        </TableDataCell>
                      );
                    })}
                  </TableRow>
                  {expandedRowId === item.id && item.subRows && (
                    <ExpandedRow subRows={item.subRows} />
                  )}
                </React.Fragment>
              );
            })}
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
    </div>
  );
};

export default CombinedTable;
