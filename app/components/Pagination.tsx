"use client";
import React, { useState } from "react";
import Button from "./Button";
import { RiArrowLeftLine, RiArrowRightLine, RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

type TablePaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: (number | { label: string; value: number })[];
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
};

const Pagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePrevPageClick = () => {
    onPageChange(page - 1);
  };

  const handleNextPageClick = () => {
    onPageChange(page + 1);
  };
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (
    option: number | { label: string; value: number }
  ) => {
    if (typeof option === "number") {
      onRowsPerPageChange(option);
    } else {
      onRowsPerPageChange(option.value);
    }
    setShowOptions(false);
  };

  return (
    <div className="border border-gray-200 px-6 py-4 flex justify-between items-center">
      <section className="flex gap-[6px] items-center">
        <span className="text-gray-800 text-text-sm font-medium">Items per page</span>
        <div className="relative z-[100]">
          <div
            className="border border-gray-600 w-[88px] rounded text-sm px-[6px] py-1 cursor-pointer flex items-center justify-between gap-1 text-gray-600"
            onClick={() => setShowOptions(!showOptions)}
          >
            {rowsPerPage}{" "}
            {!showOptions ? <RiArrowDownSLine size={14} /> : <RiArrowUpSLine size={14} />}
          </div>
          {showOptions && (
            <div className="absolute top-full left-0 shadow bg-white rounded-md text-sm mt-1 z-50">
              {rowsPerPageOptions?.map((option, index) => (
                <div
                  key={index}
                  className="px-2 py-[6px] w-[88px] text-gray-800 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {typeof option === "number" ? option : option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="flex items-center gap-2 font-medium">
        <div className="flex items-center gap-2 text-gray-800 text-text-sm">
          <span>page</span>
          <select
            value={page + 1}
            onChange={(e) => onPageChange(parseInt(e.target.value, 10) - 1)}
            className="bg-gray-25 text-gray-500 px-[14px] py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-600"
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
            startIcon={<RiArrowLeftLine size={20} />}
            onClick={handlePrevPageClick}
            disabled={page === 0}
            className="rounded-none h-[32px] rounded-l-lg"
          />
          <Button
            variant="outlined"
            intent="default-outlined"
            startIcon={<RiArrowRightLine size={20} />}
            onClick={handleNextPageClick}
            disabled={page === totalPages - 1}
            className="rounded-none h-[32px] rounded-r-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Pagination;
