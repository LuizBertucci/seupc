"use client"

import { SimpleTable } from "@/components/ui/simpleTable";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import OptionsTable from "./components/Options";
import { requestGetMarcas } from "./hooks/request";
import { useMarcasStore } from "./storage";

export default function AdminBrandsCard() {
  const { dataTable, columns } = useMarcasStore((state) => state.dados)
  const [rowSelection, setRowSelection] = useState({})
  const { toast } = useToast()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getData = async () => {
      await requestGetMarcas()
      toast({ title: "Marcas encontradas com sucesso!" })
    }

    getData()
  }, [])

  return (
    <>
      <div className="w-1/2" >
        <SimpleTable title="Marcas" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} rightMenu={<OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} />} className="w-full" />
      </div>
    </>
  )
}
