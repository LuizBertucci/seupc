"use client"
import { DataTable } from "@/components/ui/dataTable";
import { Parts } from "@/types/parts";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import OptionsTable from "./Options";


export default function PartsTable() {
    const [rowSelection, setRowSelection ] = useState({})
       
    const parts: Parts[] = [
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
      ]

  const columns: ColumnDef<Parts>[] = [
        {
          accessorKey: "nome",
          header: "Nome",
        },
        {
          accessorKey: "tipo",
          header: "Tipo da Parte",
        },
        {
          accessorKey: "pontos",
          header: "Pontos",
        },
      ]


  return (
    <>
<div className="w-1/2" >
<DataTable title="partes" setRowSelection={setRowSelection} rowSelection={rowSelection} columns={columns || []} data={parts || []} className="w-full" rightMenu={ <OptionsTable /> } />
      </div>
    </>
  )
}
