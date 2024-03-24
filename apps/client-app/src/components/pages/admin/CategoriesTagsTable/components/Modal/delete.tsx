"use client"
import { Button } from "@/components/ui/button";
import { DialogHeader, ModalContext } from "@/components/ui/dialog";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { requestDeleteCategoriesTags } from "../../hooks/request";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function DeleteCategoriesTags({selected, setRowSelection }: { selected: string, setRowSelection: any }) {
  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
   await requestDeleteCategoriesTags(selected)
    toast({ title: "Tag deletada com sucesso!"})
    setIsOpen(false)
    setRowSelection({})
  }

  return (
    <>
      <DialogHeader>
        Deletar Tag
      </DialogHeader>

      <h4>Deseja realmente <b>deletar</b> a categoria selecionada?</h4>

<div className="flex flex-row justify-between items-center  w-full mt-5" >
<Button type="submit" icon={faTrash} size="sm" closeModal onClick={handleDelete} >Deletar</Button>
<Button icon={faXmark} size="sm" closeModal >Cancelar</Button>
</div>
    </>
  )
}
