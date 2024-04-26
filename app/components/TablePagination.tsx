"use client";
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
  console.log("totalPages", totalPages);

  const handlePrevPageClick = () => {
    onPageChange(page - 1);
  };

  const handleNextPageClick = () => {
    onPageChange(page + 1);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPage = parseInt(e.target.value, 10);
    if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage - 1);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };
  console.log("totalPages", totalPages);

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
          <select
            value={page + 1}
            onChange={(e) => onPageChange(parseInt(e.target.value, 10) - 1)}
            className="bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          >
            {totalPages > 0 &&
              [...Array(totalPages)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </select>
          <span>of {totalPages > 0 ? totalPages : 0}</span>
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
