import React, { useState } from 'react'
import Input from './Input';
import Button from './Button';
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon';
import Dropdown from './Dropdown';


interface PaginationProps {
  currentPage: number;
  onPageChange: (value:number) => void;
  totalPages: number;
}
const Pagination = ({ currentPage, totalPages, onPageChange }:PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="flex flex-wrap justify-between items-center gap-2 max-w-[1216px] w-full h-[60px] border-t border-gray-200 px-6 py-1">
    {/* <div className="flex items-center gap-1">
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
    </div> */}
    {/* <div className="flex items-center gap-2">
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
        <Button
          className="border-r-0 border px-3.5 w-12 h-8 border-gray-400 shadow-xs rounded-ss-lg rounded-es-lg flex justify-center items-center py-1.5"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftLineIcon className="w-5 h-5 text-gray-700" />
        </Button>
        <Button
          className="border px-3.5 w-12 h-8 border-gray-400 shadow-xs rounded-se-lg rounded-ee-lg flex justify-center items-center py-1.5"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRightLineIcon className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
    </div> */}
  </div>
  )
}

export default Pagination