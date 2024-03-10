"use client"
import { DataTable } from "@/components/ui/dataTable";
import { Parts } from "@/types/parts";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import OptionsTable from "./Options";
import { usePartStore } from "./storage";

export default function PartsTable() {
  const { dataTable, columns } = usePartStore((state) => state.dados)
    const [rowSelection, setRowSelection ] = useState({})

  return (
    <>
<div className="w-1/2" >
<DataTable title="partes" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} className="w-full" rightMenu={ <OptionsTable rowSelection={rowSelection} /> } />
      </div>
    </>
  )
}
