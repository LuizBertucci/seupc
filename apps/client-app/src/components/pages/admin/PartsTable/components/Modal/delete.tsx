"use client"
import { Button } from "@/components/ui/button";
import { DialogHeader, ModalContext } from "@/components/ui/dialog";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteParts } from "../../hooks/request";
import { toast } from "@/components/ui/use-toast";
import { useContext } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function DeletePart({selected, setRowSelection }: { selected: string[], setRowSelection: any }) {
  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
   await deleteParts(selected)
    toast({ title: `${selected.length > 1 ? "Partes" : "Parte"} deletada com sucesso!`})
    setIsOpen(false)
    setRowSelection({})
  }

  return (
    <>
      <DialogHeader>
        Deletar {selected.length > 1 ? "Partes" : "Parte"}
      </DialogHeader>

      <h4>Deseja realmente <b>deletar</b> {selected.length > 1 ? "as partes selecionadas?" : "a parte selecionada?" }</h4>

<div className="flex flex-row justify-between items-center  w-full mt-5" >
<Button type="submit" icon={faTrash} size="sm" closeModal onClick={handleDelete} >Deletar</Button>
<Button icon={faXmark} size="sm" closeModal >Cancelar</Button>
</div>
    </>
  )
}
