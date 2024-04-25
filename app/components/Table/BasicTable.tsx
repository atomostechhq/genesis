import React, { useMemo, useState } from 'react'
import { tableData, User } from './table'
import { RowModel, Table, useReactTable,ColumnDef, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';


const columnHelper =  createColumnHelper<User>()

const columns = [
  columnHelper.accessor("firstName",{
    header: ()=> "First Name",
    cell: (info) => info.getValue()
  }),
]

const BasicTable = () => {
  // const [data, setData] = useState(tableData);

  // const data = useMemo<ColumnDef<typeof tableData>[]>(
  //   () => [
  //     {
  //       header: "First Name",
  //       accessorKey:"firstName"
  //     },
  //     {
  //       header: "lastName",
  //       accessorKey:"Last Name"
  //     }
  //   ], []
  // )

  // const table = useReactTable({
  //   data, 
  //   columns,
  //   getSubRows: (row) => row.subRows,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getExpandedRowModel: getExpandedRowModel(),
  //   debugTable: true,
  // })

  return (
    <div>BasicTable</div>
  )
}

export default BasicTable