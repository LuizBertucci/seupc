"use client"

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCategoriesTagsStore } from "./storage";
import { requestGetCategoriesTags } from "./hooks/request";
import OptionsTable from "./components/Options";
import { SimpleTable } from "@/components/ui/simpleTable";

export default function CategoriesTagsTable() {
    const { dataTable, columns } = useCategoriesTagsStore((state) => state.dados)
  const [rowSelection, setRowSelection ] = useState({})
  const { toast } = useToast()

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
useEffect(() => {
    const getData = async () => {
     await requestGetCategoriesTags()
     toast({ title: "Categorias das tags encontradas com sucesso!"  })
    }

    getData()
    }, [])

  return (
    <>
<div className="w-1/2" >
<SimpleTable title="categorias tags" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} rightMenu={ <OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} /> } className="w-full" />
      </div>
    </>
  )
}
