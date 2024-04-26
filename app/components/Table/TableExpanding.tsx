// import React from "react";
// import {
//   Column,
//   Table as OG,
//   ExpandedState,
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   getExpandedRowModel,
//   ColumnDef,
//   flexRender,
// } from "@tanstack/react-table";
// import { makeData, Person } from "./data";
// import {
//   Table,
//   TableBody,
//   TableDataCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "../TableComponents";
// import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
// import ArrowUpSLineIcon from "remixicon-react/ArrowUpSLineIcon";
// import Chip from "../Chip";
// import Button from "../Button";
// import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
// import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
// import Input from "../Input";

// const TableExpanding = () => {
//   const columns = React.useMemo<ColumnDef<Person>[]>(
//     () => [
//       {
//         accessorKey: "firstName",
//         header: () => "First Name",
//         cell: ({ row, getValue }) => (
//           <div className="flex items-center gap-1">
//             {getValue<boolean>()}
//             {row.getCanExpand() && (
//               <button
//                 {...{
//                   onClick: row.getToggleExpandedHandler(),
                  
//                   style: { cursor: "pointer" },
//                 }}
//               >
//                 {row.getIsExpanded() ? (
//                   <ArrowUpSLineIcon className="hover:bg-gray-100 w-5 h-5 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300" />
//                 ) : (
//                   <ArrowDownSLineIcon className="hover:bg-gray-100 w-5 h-5 flex items-center justify-center p-1 rounded focus:bg-gray-300 active:bg-gray-300" />
//                 )}
//               </button>
//             )}
//           </div>
//         ),
//         footer: (props) => props.column.id,
//       },
//       {
//         accessorFn: (row) => row.lastName,
//         id: "lastName",
//         cell: (info) => info.getValue(),
//         header: () => "Last Name",
//         footer: (props) => props.column.id,
//       },
//       {
//         accessorKey: "age",
//         header: () => "Age",
//         footer: (props) => props.column.id,
//       },
//       {
//         accessorKey: "visits",
//         header: () => <span>Visits</span>,
//         footer: (props) => props.column.id,
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         footer: (props) => props.column.id,
//       },
//       {
//         accessorKey: "progress",
//         header: "Profile Progress",
//         footer: (props) => props.column.id,
//       },
//     ],
//     []
//   );

//   const [data, setData] = React.useState(() => makeData(100, 5, 3));

//   const [expanded, setExpanded] = React.useState<ExpandedState>({});

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     debugTable: true,
//   });
//   return (
//     <div className="border shadow-md rounded-xl max-w-7xl w-full">
//       <div className=" relative px-6 py-2 h-[91px] max-w-7xl w-full border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
//         <div>
//           <div className="flex items-center gap-2">
//             <h1 className="text-lg font-medium">Heading</h1>
//             <Chip intent={"primary"}>Label</Chip>
//           </div>
//           <p className="text-sm text-gray-600">
//             Keep track of vendor and their security ratings.
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant={"outlined"} intent={"primary-outlined"}>
//             Button CTA
//           </Button>
//           <Button variant={"filled"} intent="primary">
//             Button CTA
//           </Button>
//         </div>
//       </div>
//       <Table>
//         <TableHead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHeadCell key={header.id} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </div>
//                     )}
//                   </TableHeadCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHead>
//         <TableBody>
//           {table.getRowModel().rows.map((row) => {
//             return (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <TableDataCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableDataCell>
//                   );
//                 })}
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//       <div className="flex flex-wrap justify-between items-center gap-2 w-full h-[60px] border-t border-gray-200 px-6 py-1">
//         <div className="flex items-center gap-1">
//           <span className="font-medium text-sm text-gray-800">
//             Items per page
//           </span>
//           <select
//             value={table.getState().pagination.pageSize}
//             className="border border-gray-700 rounded text-xs outline-none w-[88px] h-[27px] px-1"
//             onChange={(e) => {
//               table.setPageSize(Number(e.target.value));
//             }}
//           >
//             {[10, 20, 30, 40, 50].map((pageSize) => (
//               <option
//                 key={pageSize}
//                 value={pageSize}
//                 className="bg-gray-50 shadow-md"
//               >
//                 {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="flex items-center gap-1 text-sm font-medium">
//             page
//             <Input
//               type="number"
//               defaultValue={table.getState().pagination.pageIndex + 1}
//               onChange={(e) => {
//                 const page = e.target.value ? Number(e.target.value) - 1 : 0;
//                 table.setPageIndex(page);
//               }}
//               value={table.getState().pagination.pageIndex + 1}
//               className="w-[52px] bg-gray-25 px-2 h-7"
//             />
//             <span>of {table.getPageCount()}</span>
//           </span>
//           <div className="flex items-center">
//             <Button
//             intent="default-outlined"
//             variant="outlined"
//               className="border-r-0 border px-3.5 w-12 h-8 border-gray-400 shadow-xs rounded-ss-lg rounded-se-none rounded-ee-none rounded-es-lg flex justify-center items-center py-1.5"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <ArrowLeftLineIcon className="w-5 h-5 text-gray-700" />
//             </Button>
//             <Button
//               className="border px-3.5 w-12 h-8 border-gray-400 shadow-xs rounded-se-lg rounded-es-none rounded-ee-lg rounded-ss-none flex justify-center items-center py-1.5"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//               intent="default-outlined"
//             variant="outlined"
//             >
//               <ArrowRightLineIcon className="w-5 h-5 text-gray-700" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableExpanding;
