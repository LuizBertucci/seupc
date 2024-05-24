import { faAdd, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import ActionButton from '@/components/ui/actionButton';
import { Button } from '@/components/ui/button';
import { DialogHeader, Modal, ModalContext } from '@/components/ui/dialog';

import { usePartStore } from '../AdminParts/storage';
import AdminNotebooksForm from './AdminNotebooksForm';
import { useNotebooksStore } from './storage';

export default function AdminNotebooksHeader({ rowSelection }: { rowSelection: object }) {
  const { dataTable } = useNotebooksStore((state) => state.dados);
  const { dataTable: parts } = usePartStore((state) => state.dados);

  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        content={
          <>
            <DialogHeader>Deletar Parte</DialogHeader>

            <h4>
              Deseja realmente <b>deletar</b> o notebook selecionado?
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
        className="max-w-[980px]"
        content={
          <AdminNotebooksForm
            edit
            editValues={dataTable?.[Object.keys(rowSelection)[0]]}
            editIndex={Number(Object.keys(rowSelection)[0])}
            parts={parts}
          />
        }
      >
        <ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal content={<AdminNotebooksForm parts={parts} />} className="max-w-[980px]">
        <Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm">
          ADICIONAR
        </Button>
      </Modal>
    </>
  );
}
