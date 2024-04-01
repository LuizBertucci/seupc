"use client"
 
import { useEffect, useState } from "react";
import OptionsTable from "./components/Options";
import { usePartStore } from "./storage";
import { requestGetParts } from "./hooks/request";
import { useToast } from "@/components/ui/use-toast";
import { SimpleTable } from "@/components/ui/simpleTable";
import { DataTable } from "@/components/ui/dataTable";

export default function PartsTable({ type, className }: { type?: string, className?: string }) {
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
<div className={className} >
{ type === "simple" ? 
<SimpleTable title="partes" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} className="w-full" rightMenu={ <OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} /> } />
: <DataTable title="partes" columnsFilter={[ { column: "partType", options:[{ label: "HD", value: "HD" }, { label: "SSD", value: "SSD" }, { label: "Memória RAM", value: "Ram Memory" }, { label: "Processador", value: "Processor" }, { label: "Placa Gráfica", value: "Video Card" }], title: "Partes"  } ]} filterId="name" filterPlaceholder="Filtrar por nome" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} className="w-full" rightMenu={ <OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} /> } />}
      </div>
    </>
  )
}
