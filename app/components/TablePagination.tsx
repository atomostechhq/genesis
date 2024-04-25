"use client"
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";

type TablePaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: (number | { label: string; value: number })[];
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  console.log("totalPages", totalPages)

  const handlePrevPageClick = () => {
    onPageChange(page - 1);
  };

  const handleNextPageClick = () => {
    onPageChange(page + 1);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10) - 1;
    if (!isNaN(newPage) && newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
      <section>
        <span>Items per page</span>
        <select
          name="itemsPerPage"
          id="itemsPerPage"
          onChange={handleRowsPerPageChange}
          value={rowsPerPage}
        >
          {rowsPerPageOptions?.map((option) => (
            <option
              key={typeof option === "number" ? option : option.value}
              value={typeof option === "number" ? option : option.value}
            >
              {typeof option === "number" ? option : option.label}
            </option>
          ))}
        </select>
      </section>
      <section className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span>Page</span>
          <Input
            type="number"
            size="sm"
            placeholder="1"
            className="w-[70px] px-2 text-center"
            disabled={page >= totalPages}
            value={page + 1}
            onChange={handlePageInputChange}
          />
          <span>of {totalPages}</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="outlined"
            intent="default-outlined"
            startIcon={<ArrowLeftLineIcon size={20} />}
            onClick={handlePrevPageClick}
            disabled={page === 0}
          />
          <Button
            variant="outlined"
            intent="default-outlined"
            startIcon={<ArrowRightLineIcon size={20} />}
            onClick={handleNextPageClick}
            disabled={page === totalPages - 1}
          />
        </div>
      </section>
    </div>
  );
};

export default TablePagination;
