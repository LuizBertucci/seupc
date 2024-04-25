import { faAdd, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import ActionButton from '@/components/ui/actionButton';
import { Button } from '@/components/ui/button';
import { DialogHeader, Modal, ModalContext } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

import AdminStoresForm from './AdminStoresForm';
import { requestDeleteLoja } from './hooks/request';
import { useLojasStore } from './storage';

export default function AdminStoresHeader({
  rowSelection,
  setRowSelection,
}: {
  rowSelection: object;
  setRowSelection: any;
}) {
  const { dataTable } = useLojasStore((state) => state.dados);

  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
    await requestDeleteLoja(Object.keys(rowSelection)[0]);
    toast({ title: 'Loja deletada com sucesso!' });
    setIsOpen(false);
    setRowSelection({});
  };

  return (
    <>
      <Modal
        content={
          <>
            <DialogHeader>Deletar Loja</DialogHeader>

            <h4>
              Deseja realmente <b>deletar</b> a loja selecionada?
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
          <AdminStoresForm
            edit
            editValues={dataTable?.[Object.keys(rowSelection)[0]]}
            editIndex={Number(Object.keys(rowSelection)[0])}
          />
        }
      >
        <ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal content={<AdminStoresForm />}>
        <Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm">
          ADICIONAR
        </Button>
      </Modal>
    </>
  );
}
