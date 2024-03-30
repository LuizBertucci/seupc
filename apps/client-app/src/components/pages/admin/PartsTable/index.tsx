"use client"
 
import { useEffect, useState } from "react";
import OptionsTable from "./components/Options";
import { usePartStore } from "./storage";
import { requestGetParts } from "./hooks/request";
import { useToast } from "@/components/ui/use-toast";
import { SimpleTable } from "@/components/ui/simpleTable";
import { DataTable } from "@/components/ui/dataTable";

export default function PartsTable() {
  const { dataTable, columns } = usePartStore((state) => state.dados)
  const [rowSelection, setRowSelection ] = useState({})
  const { toast } = useToast()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
useEffect(() => {

    const getData = async () => {
     await requestGetParts()
     toast({ title: "Dados encontrados com sucesso!"  })
    }

    getData()
    }, [])

  return (
    <>
<div className="w-1/2" >
<DataTable title="partes" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} className="w-full" rightMenu={ <OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} /> } />
      </div>
    </>
  )
}
