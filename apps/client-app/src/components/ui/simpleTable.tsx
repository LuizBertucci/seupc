"use client"



import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

const selectionColumn: ColumnDef<[]> = {
  id: "select",
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  )};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  className: string,
  setRowSelection: any,
  rowSelection: any,
  title: string,
  rightMenu?: React.ReactNode
}

export function SimpleTable<TData, TValue>({
    data,
  columns,
  className,
  rowSelection,
  setRowSelection,
  title,
  rightMenu
}: DataTableProps<TData, TValue>) {
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(0)
  

  const table = useReactTable({
    data: data as any,
    columns: [selectionColumn, ...columns as any],
    state: {
      pagination: {
        pageSize,
        pageIndex
      },
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
  })

  return (
    <div className="w-full p-4 bg-white rounded-md hover:translate-y-[-2px] min-h-[380px] transition-all duration-150 hover:shadow-md " >
      <div className="flex flex-row w-full justify-between items-center " >
      <h1 className=" font-bold hover:translate-y-[-1px] text-gray-500 " >{title.toUpperCase()}</h1>
      <div className="flex flex-row justify-center items-center space-x-2" >
      {rightMenu}
      </div>
      </div>
    <div className={`flex flex-col justify-between items-start rounded-md border bg-white mt-[10px] min-h-[380px] ${className} `}>
      <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className=" font-bold " key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex self-end items-center justify-end space-x-2 py-4 px-4 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
          disabled={!table.getCanPreviousPage() || pageIndex === 0}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-white"
          onClick={() => setPageIndex(old => old + 1)} disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
    </div>
  )
}
