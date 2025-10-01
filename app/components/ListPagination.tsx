"use client";
import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Button from "./Button";
import { cn } from "../utils/utils";

interface ListPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

const ListPagination: React.FC<ListPaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  className,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const [expanded, setExpanded] = useState(false);

  const renderPages = () => {
    if (totalPages <= 6 || expanded) {
      return [...Array(totalPages)].map((_, i) => (
        <PageBtn key={i} i={i} page={page} onPageChange={onPageChange} />
      ));
    }

    const start = [0, 1];
    const mid = [page - 1, page, page + 1].filter(
      (i) => i > 1 && i < totalPages - 2
    );
    const end = [totalPages - 2, totalPages - 1];

    const range = Array.from(new Set([...start, ...mid, ...end]));
    return range.map((i, idx) =>
      typeof range[idx - 1] === "number" && i - range[idx - 1] > 1 ? (
        <Button
          key={`dots-${i}`}
          size="sm"
          variant="outlined"
          onClick={() => setExpanded(true)}
        >
          ...
        </Button>
      ) : (
        <PageBtn key={i} i={i} page={page} onPageChange={onPageChange} />
      )
    );
  };

  return (
    <section className={cn("flex items-center gap-1", className)}>
      <NavBtn
        icon={<RiArrowLeftSLine size={22} />}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      />
      <div className="max-w-[90vw] w-max overflow-auto flex items-center gap-2 p-2">
        {renderPages()}
      </div>
      <NavBtn
        icon={<RiArrowRightSLine size={22} />}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
      />
    </section>
  );
};

const PageBtn = ({
  i,
  page,
  onPageChange,
}: {
  i: number;
  page: number;
  onPageChange: (i: number) => void;
}) => (
  <Button
    size="sm"
    variant={"outlined"}
    className={cn(
      i === page &&
        "bg-primary-50 shadow-[0px_0px_0px_2px] shadow-primary-700 hover:shadow-[0px_0px_0px_2px] hover:shadow-primary-700"
    )}
    onClick={() => onPageChange(i)}
  >
    {i + 1}
  </Button>
);

const NavBtn = ({
  icon,
  onClick,
  disabled,
}: {
  icon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
}) => (
  <Button
    size="sm"
    variant="outlined"
    startIcon={icon}
    onClick={onClick}
    disabled={disabled}
    className="p-2"
  />
);

export default ListPagination;
