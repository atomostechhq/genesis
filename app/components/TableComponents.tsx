import React, {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { cn } from "../utils/utils";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  icon?: JSX.Element;
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  icon?: JSX.Element;
  expandedRows?: any;
}

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <table
      {...props}
      className={cn(
        "max-w-7xl bg-white w-full relative overflow-x-scroll border border-collapse",
        className
      )}
    >
      {children}
    </table>
  );
};

export const TableHead = ({
  children,
  className,
  ...props
}: TableHeadProps) => {
  return (
    <thead
      {...props}
      className={cn(
        "sticky top-0 bg-gray-50 z-[100] border border-gray-200",
        className
      )}
    >
      {children}
    </thead>
  );
};

export const TableBody = ({
  children,
  className,
  ...props
}: TableHeadProps) => {
  return (
    <tbody {...props} className={cn(className)}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr {...props} className={cn("border border-gray-200", className)}>
      {children}
    </tr>
  );
};

export const TableHeadCell = ({
  children,
  className,
  icon,
  ...props
}: TableHeadCellProps) => {

  return (
    <th {...props} className={cn("px-6 py-3 text-left", className)}>
      <div className="flex items-center gap-1">
        <span className="font-medium text-xs">{children}</span>
        <span className="hover:bg-gray-100 w-5 h-5 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300">
          {icon}
        </span>
      </div>
    </th>
  );
};

export const TableDataCell = ({
  children,
  className,
  icon,
  ...props
}: TableCellProps) => {
  return (
    <td
      {...props}
      className={cn("px-6 py-4 text-sm font-medium space-x-2", className)}
    >
      <span className="font-medium text-sm">{children}</span>
      {icon}
    </td>
  );
};
