"use client"
import { SimpleTable } from "@/components/ui/simpleTable";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { DataTable } from "../ui/dataTable";
import OptionsTable from "./components/Options";
import { requestGetTags } from "./hooks/request";
import { useTagsStore } from "./storage";

export default function AdminTagsCard({ type, className }: { type?: string, className?: string }) {
  const { dataTable, columns } = useTagsStore((state) => state.dados)
  const [rowSelection, setRowSelection] = useState({})
  const { toast } = useToast()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getData = async () => {
      await requestGetTags()
      toast({ title: "Tags encontradas com sucesso!" })
    }

    getData()
  }, [])

  return (
    <>
      <div className={className} >
        {type === "simple" ?
          <SimpleTable title="tags" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} rightMenu={<OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} />} className="w-full" />
          : <DataTable title="tags" filterId="name" filterPlaceholder="Filtrar por nome" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={dataTable || []} className="w-full" rightMenu={<OptionsTable setRowSelection={setRowSelection} rowSelection={rowSelection} />} />}
      </div>
    </>
  )
}
