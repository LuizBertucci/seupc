import { Button } from "@/components/ui/button";
import { DialogHeader, ModalContext } from "@/components/ui/dialog";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { requestDeleteLoja } from "../../hooks/request";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function DeleteLoja({selected, setRowSelection }: { selected: string, setRowSelection: any }) {
  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
   await requestDeleteLoja(selected)
    toast({ title: "Loja deletada com sucesso!"})
    setIsOpen(false)
    setRowSelection({})
  }

  return (
    <>
      <DialogHeader>
        Deletar Loja
      </DialogHeader>

      <h4>Deseja realmente <b>deletar</b> a loja selecionada?</h4>

<div className="flex flex-row justify-between items-center  w-full mt-5" >
<Button type="submit" icon={faTrash} size="sm" closeModal onClick={handleDelete} >Deletar</Button>
<Button icon={faXmark} size="sm" closeModal >Cancelar</Button>
</div>
    </>
  )
}
