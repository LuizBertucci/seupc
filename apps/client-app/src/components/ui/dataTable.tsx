"use client"


import { useState } from "react"
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
} from "@tanstack/react-table"

import { ArrowUpDown, CheckIcon, PlusCircleIcon  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { faBars, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SelectSingle } from "./select"
import { Separator } from "./separator"
import { Badge } from "./badge"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./command"
import { cn } from "@/lib/utils"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

const selectionColumn: ColumnDef<any> = {
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
  data: any,
  className: string,
  setRowSelection: any,
  rowSelection: any,
  title: string,
  rightMenu?: React.ReactNode,
  filterId?: string,
  filterPlaceholder?: string,
  columnsFilter?:  { column: string, title: string, options: { value: string, label: string }[]  }[]
}

export function DataTable<TData, TValue>({
  data,
  columns,
  className,
  rowSelection,
  setRowSelection,
  title,
  rightMenu,
  filterId,
  filterPlaceholder,
  columnsFilter
}: DataTableProps<TData, TValue>) {
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns: [selectionColumn, ...columns],
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
      sorting,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  })

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="w-full p-4 bg-white rounded-md hover:translate-y-[-2px] min-h-[380px] transition-all duration-150 hover:shadow-md " >
      <h1 className=" font-bold hover:translate-y-[-1px] text-gray-500 " >{title.toUpperCase()}</h1>
      <div className="flex flex-row w-full justify-between items-center " >
        <div className="flex flex-row justify-center items-center space-x-2" >
      <div className="flex items-center py-4">
        <Input
          placeholder={filterPlaceholder || "Pesquisar"}
          value={(table.getColumn(filterId || "")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterId || "")?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-[30px] border-primary "
        />
      </div>
      {columnsFilter?.map((column) => table.getColumn(column.column) && (
  <DataTableFacetedFilter
  key={column.title}
  column={table.getColumn(column.column)}
  title={column.title}
  options={column.options}
/>
      ))}
       {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <FontAwesomeIcon icon={faRotateRight} className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-row justify-center items-center space-x-2" >
      {rightMenu}
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <FontAwesomeIcon className=" text-primary " icon={faBars} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return column.id !== "select" && (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString()}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                      : 
                      <Button
                      className={` ${ header.id === "select" && "hidden" } p-0 `}
                      variant="ghost"
                      onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}
                    >
                      {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
          <ArrowUpDown className=" ml-2 h-4 w-4  " />
        </Button>}
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
        <h6 className=" text-gray-500" >Linhas por página</h6>
        <SelectSingle controllable selectValue={pageSize.toString()} classNameTrigger=" border-0 w-[70px] "  setSelectValue={setPageSize} options={[{ label: "10", value: "10"}, { label: "20", value: "20"}, { label: "30", value: "30"}, { label: "40", value: "40"}, { label: "50", value: "50"} ]} placeholder={""}  />
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

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 bg-transparent border-primary border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          && "bg-primary text-primary-foreground"
                          
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}