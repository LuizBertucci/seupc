"use client"
 
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRecStore } from "./storage";
import { requestGetRec } from "./hooks/request";
import OptionsTable from "./components/Options";
import { SimpleTable } from "@/components/ui/simpleTable";

export default function RecTable() {
    const { dataTable, columns } = useRecStore((state) => state.dados)
  const [rowSelection, setRowSelection ] = useState({})
  const { toast } = useToast()

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
useEffect(() => {
    const getData = async () => {
     await requestGetRec()
     toast({ title: "Sites de recomendação encontrados com sucesso!"  })
    }

    getData()
    }, [])

  return (
    <>
<div className="w-1/2" >
<SimpleTable title="Sites de Recomendação" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} rightMenu={ <OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} /> } className="w-full" />
      </div>
    </>
  )
}
