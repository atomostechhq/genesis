import React, { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "../utils/utils";

interface TableProps extends TableHTMLAttributes<HTMLTableElement>{
  children?:ReactNode;
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement>{
  children?:ReactNode;
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>{
  children?:ReactNode;
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement>{
  children?:ReactNode;
}

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
   <table {...props} className={cn(className)}>{children}</table>
  );
};

export const TableHead = ({ children, className, ...props }: TableHeadProps) => {
  return (
   <thead {...props} className={cn(className)}>{children}</thead>
  );
};

export const TableBody = ({ children, className, ...props }: TableHeadProps) => {
  return (
   <tbody {...props} className={cn(className)}>{children}</tbody>
  );
};

export const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
   <tr {...props} className={cn(className)}>{children}</tr>
  );
};



export const TableHeadCell = ({ children,className, ...props }: TableCellProps) => {
  return (
    <th {...props} className={cn(className)}>{children}</th>
  );
};

export const TableDataCell = ({ children,className, ...props }: TableCellProps) => {
  return (
   <td {...props} className={cn(className)}>{children}</td>
  );
};

const data = [
  {"Name": "John", "Age": 30, "Gender": "Male", "Country": "USA", "Occupation": "Engineer"},
  {"Name": "Alice", "Age": 25, "Gender": "Female", "Country": "Canada", "Occupation": "Doctor"},
  {"Name": "Michael", "Age": 35, "Gender": "Male", "Country": "UK", "Occupation": "Teacher"},
  {"Name": "Emily", "Age": 28, "Gender": "Female", "Country": "Australia", "Occupation": "Designer"},
  {"Name": "David", "Age": 40, "Gender": "Male", "Country": "Germany", "Occupation": "Manager"},
  {"Name": "Sophia", "Age": 27, "Gender": "Female", "Country": "France", "Occupation": "Software Developer"},
  {"Name": "James", "Age": 33, "Gender": "Male", "Country": "Japan", "Occupation": "Entrepreneur"},
  {"Name": "Emma", "Age": 29, "Gender": "Female", "Country": "Italy", "Occupation": "Artist"},
  {"Name": "Daniel", "Age": 31, "Gender": "Male", "Country": "Spain", "Occupation": "Writer"}
]

const Trial = () => {
  return (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Age</TableHeadCell>
        <TableHeadCell>Gender</TableHeadCell>
        <TableHeadCell>Country</TableHeadCell>
        <TableHeadCell>Occupation</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableDataCell></TableDataCell>
      </TableRow>
    </TableBody>
  </Table>
  );
};

export default Trial;
