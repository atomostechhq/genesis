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
  dense?: boolean;
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
  indent?: boolean;
}

interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  icon?: JSX.Element;
  sticky?: boolean;
  left?: string;
  stickyIcon?: JSX.Element;
  shadow?: boolean;
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  icon?: JSX.Element;
  sticky?: boolean;
  left?: string;
  shadow?: boolean;
}

export const Table = ({ children, className, dense, ...props }: TableProps) => {
  return (
    <table
      {...props}
      className={cn(
        dense && "group",
        "bg-white text-left w-full border",
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
      className={cn("bg-gray-50 border border-gray-200", className)}
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

export const TableRow = ({
  children,
  className,
  indent,
  ...props
}: TableRowProps) => {
  return (
    <tr
      {...props}
      className={cn(
        "border border-gray-200 hover:bg-gray-50",
        indent && "group/indent border-none",
        className
      )}
    >
      {children}
    </tr>
  );
};

export const TableHeadCell = ({
  children,
  className,
  icon,
  sticky,
  shadow,
  left,
  ...props
}: TableHeadCellProps) => {
  return (
    <th
      {...props}
      className={cn(
        "px-6 py-3 text-left group-has-[th]:py-2",
        sticky && `sticky bg-gray-50`,
        sticky && shadow && "shadow-table",
        left,
        className
      )}
      style={{
        left: left,
      }}
    >
      <div className="flex items-center gap-1">
        <span className="font-medium text-xs">{children}</span>
        {icon && (
          <span
            className={
              "hover:bg-gray-200 w-5 h-5 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300"
            }
          >
            {icon}
          </span>
        )}
      </div>
    </th>
  );
};

export const TableDataCell = ({
  children,
  className,
  icon,
  sticky,
  shadow,
  left,
  ...props
}: TableCellProps) => {
  return (
    <td
      {...props}
      className={cn(
        "px-6 py-4 text-sm font-medium group-has-[td]:py-2 first:group-has-[td]/indent:pl-[60px]",
        sticky && `sticky bg-white`,
        sticky && shadow && "shadow-table",
        left,
        className
      )}
      style={{
        left: left,
      }}
    >
      <span className="font-medium text-sm">{children}</span>
      {icon && (
        <span
          className={
            "hover:bg-gray-200 w-5 h-5 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300"
          }
        >
          {icon}
        </span>
      )}
    </td>
  );
};

export default Table;
