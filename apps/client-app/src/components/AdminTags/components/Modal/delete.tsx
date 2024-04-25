'use client';

import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

import { requestDeleteTags } from '../../hooks/request';

export default function DeleteTags({ selected, setRowSelection }: { selected: string; setRowSelection: any }) {
  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
    await requestDeleteTags(selected);
    toast({ title: 'Tag deletada com sucesso!' });
    setIsOpen(false);
    setRowSelection({});
  };

  return (
    <>
      <DialogHeader>Deletar Tag</DialogHeader>

      <h4>
        Deseja realmente <b>deletar</b> a tag selecionada?
      </h4>

      <div className="flex flex-row justify-between items-center  w-full mt-5">
        <Button type="submit" icon={faTrash} size="sm" closeModal onClick={handleDelete}>
          Deletar
        </Button>
        <Button icon={faXmark} size="sm" closeModal>
          Cancelar
        </Button>
      </div>
    </>
  );
}
