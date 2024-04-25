import { faAdd, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import ActionButton from '@/components/ui/actionButton';
import { Button } from '@/components/ui/button';
import { DialogHeader, Modal, ModalContext } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

import AdminRecForm from './AdminRecForm';
import { requestDeleteRec } from './hooks/request';
import { useRecStore } from './storage';

export default function AdminRecHeader({
  rowSelection,
  setRowSelection,
}: {
  rowSelection: object;
  setRowSelection: any;
}) {
  const { dataTable } = useRecStore((state) => state.dados);

  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
    await requestDeleteRec(Object.keys(rowSelection)[0]);
    toast({ title: 'Site de recomendação deletado com sucesso!' });
    setIsOpen(false);
    setRowSelection({});
  };

  return (
    <>
      <Modal
        content={
          <>
            <DialogHeader>Deletar Site de Recomendação</DialogHeader>

            <h4>
              Deseja realmente <b>deletar</b> o site de recomendação selecionado?
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
        }
      >
        <ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal
        content={
          <AdminRecForm
            edit
            editValues={dataTable?.[Object.keys(rowSelection)[0]]}
            editIndex={Number(Object.keys(rowSelection)[0])}
          />
        }
      >
        <ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal content={<AdminRecForm />}>
        <Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm">
          ADICIONAR
        </Button>
      </Modal>
    </>
  );
}
