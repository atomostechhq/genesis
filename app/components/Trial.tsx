// import React, {
//   HTMLAttributes,
//   ReactNode,
//   TableHTMLAttributes,
//   TdHTMLAttributes,
//   ThHTMLAttributes,
// } from "react";
// import { cn } from "../utils/utils";
// import SortDescIcon from "remixicon-react/SortDescIcon";
// import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
// import Checkbox from "./Checkbox";

// interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
//   children?: ReactNode;
// }

// interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
//   children?: ReactNode;
// }

// interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
//   children?: ReactNode;
// }

// interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
//   children?: ReactNode;
//   icon?: JSX.Element;
// }

// interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
//   children?: ReactNode;
//   icon?: JSX.Element;
// }

// export const Table = ({ children, className, ...props }: TableProps) => {
//   return (
//     <table
//       {...props}
//       className={cn("max-w-7xl w-full border border-collapse", className)}
//     >
//       {children}
//     </table>
//   );
// };

// export const TableHead = ({
//   children,
//   className,
//   ...props
// }: TableHeadProps) => {
//   return (
//     <thead
//       {...props}
//       className={cn(
//         "sticky top-0 bg-gray-50 border border-gray-200",
//         className
//       )}
//     >
//       {children}
//     </thead>
//   );
// };

// export const TableBody = ({
//   children,
//   className,
//   ...props
// }: TableHeadProps) => {
//   return (
//     <tbody {...props} className={cn(className)}>
//       {children}
//     </tbody>
//   );
// };

// export const TableRow = ({ children, className, ...props }: TableRowProps) => {
//   return (
//     <tr {...props} className={cn("border border-gray-200", className)}>
//       {children}
//     </tr>
//   );
// };

// export const TableHeadCell = ({
//   children,
//   className,
//   icon,
//   ...props
// }: TableHeadCellProps) => {
//   return (
//     <th {...props} className={cn("px-6 py-3 text-left", className)}>
//       <span>{children}</span>
//       <span>{icon}</span>
//     </th>
//   );
// };

// export const TableDataCell = ({
//   children,
//   className,
//   icon,
//   ...props
// }: TableCellProps) => {
//   return (
//     <td {...props} className={cn("px-6 py-4 text-sm font-medium space-x-2", className)}>
//       {children}
//       <span className="hover:bg-gray-100 mx-1 w-7 h-7 flex items-center justify-center p-1 rounded">{icon}</span>
//     </td>
//   );
// };

// const data = [
//   {
//     Name: "John",
//     Age: 30,
//     Gender: "Male",
//     Country: "USA",
//     Occupation: "Engineer",
//     more: {
//       okay: "okay",
//       fine: "okay",
//       hmm: "okay",
//     },
//   },
//   {
//     Name: "Alice",
//     Age: 25,
//     Gender: "Female",
//     Country: "Canada",
//     Occupation: "Doctor",
//     more: {
//       okay: "okay",
//       fine: "okay",
//       hmm: "okay",
//     },
//   },
//   {
//     Name: "Michael",
//     Age: 35,
//     Gender: "Male",
//     Country: "UK",
//     Occupation: "Teacher",
//     more: {
//       okay: "okay",
//       fine: "okay",
//       hmm: "okay",
//     },
//   },
//   {
//     Name: "Emily",
//     Age: 28,
//     Gender: "Female",
//     Country: "Australia",
//     Occupation: "Designer",
//     more: {
//       okay: "okay",
//       fine: "okay",
//       hmm: "okay",
//     },
//   },
//   {
//     Name: "David",
//     Age: 40,
//     Gender: "Male",
//     Country: "Germany",
//     Occupation: "Manager",
//   },
//   {
//     Name: "Sophia",
//     Age: 27,
//     Gender: "Female",
//     Country: "France",
//     Occupation: "Software Developer",
//   },
//   {
//     Name: "James",
//     Age: 33,
//     Gender: "Male",
//     Country: "Japan",
//     Occupation: "Entrepreneur",
//   },
//   {
//     Name: "Emma",
//     Age: 29,
//     Gender: "Female",
//     Country: "Italy",
//     Occupation: "Artist",
//   },
//   {
//     Name: "Daniel",
//     Age: 31,
//     Gender: "Male",
//     Country: "Spain",
//     Occupation: "Writer",
//   },
// ];

// const Trial = () => {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableHeadCell>
//           <Checkbox />
//           </TableHeadCell>
//           <TableHeadCell icon={<SortDescIcon size={15} />}>Name</TableHeadCell>
          
//           <TableHeadCell icon={<SortDescIcon size={15} />}>Age</TableHeadCell>
//           <TableHeadCell icon={<SortDescIcon size={15} />}>
//             Gender
//           </TableHeadCell>
//           <TableHeadCell icon={<SortDescIcon size={15} />}>
//             Country
//           </TableHeadCell>
//           <TableHeadCell icon={<SortDescIcon size={15} />}>
//             Occupation
//           </TableHeadCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data.map((data, i) => (
//           <TableRow key={i}>
//             <TableDataCell>

//             <Checkbox />
//             </TableDataCell>
//             <TableDataCell
//               className="flex items-center"
//               icon={
//                 <ArrowDownSLineIcon
//                   size={15}
//                   onClick={() => console.log("Clicked")}
//                 />
//               }
//             >
//               {data.Name}
//             </TableDataCell>
//             <TableDataCell>{data.Age}</TableDataCell>
//             <TableDataCell>{data.Gender}</TableDataCell>
//             <TableDataCell>{data.Occupation}</TableDataCell>
//             <TableDataCell>{data.Country}</TableDataCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default Trial;
