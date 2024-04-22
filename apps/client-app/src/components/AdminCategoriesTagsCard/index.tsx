"use client"

import { SimpleTable } from "@/components/ui/simpleTable";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { DataTable } from "../ui/dataTable";
import OptionsTable from "./components/Options";
import { requestGetCategoriesTags } from "./hooks/request";
import { useCategoriesTagsStore } from "./storage";

export default function AdminCategoriesTagsCard({ type, className }: { type?: string, className?: string }) {
  const { dataTable, columns } = useCategoriesTagsStore((state) => state.dados)
  const [rowSelection, setRowSelection] = useState({})
  const { toast } = useToast()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getData = async () => {
      await requestGetCategoriesTags()
      toast({ title: "Categorias das tags encontradas com sucesso!" })
    }

    getData()
  }, [])

  return (

    <div className={className} >
      {type === "simple" ?
        <SimpleTable title="categorias tags" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} rightMenu={<OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} />} className="w-full" />
        : <DataTable title="categorias tags" filterId="category" filterPlaceholder="Filtrar por categoria" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} className="w-full" rightMenu={<OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} />} />}
    </div>

  )
}
