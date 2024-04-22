"use client"

import { SimpleTable } from "@/components/ui/simpleTable";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import OptionsTable from "./components/Options";
import { requestGetLojas } from "./hooks/request";
import { useLojasStore } from "./storage";

export default function AdminStoresCard() {
  const { dataTable, columns } = useLojasStore((state) => state.dados)
  const [rowSelection, setRowSelection] = useState({})
  const { toast } = useToast()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getData = async () => {
      await requestGetLojas()
      toast({ title: "Lojas encontradas com sucesso!" })
    }

    getData()
  }, [])

  return (
    <>
      <div className="w-1/2" >
        <SimpleTable title="Lojas" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} rightMenu={<OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} />} className="w-full" />
      </div>
    </>
  )
}
