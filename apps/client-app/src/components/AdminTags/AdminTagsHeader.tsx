import { faAdd, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import ActionButton from '@/components/ui/actionButton';
import { Button } from '@/components/ui/button';
import { DialogHeader, Modal, ModalContext } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

import { usePartStore } from '../AdminParts/storage';
import AdminTagsForm from './AdminTagsForm';
import { requestDeleteTags } from './hooks/request';
import { useTagsStore } from './storage';

export default function AdminTagsHeader({
  rowSelection,
  setRowSelection,
  onRefresh,
}: {
  rowSelection: object;
  setRowSelection: any;
  onRefresh: () => void;
}) {
  const { dataTable } = useTagsStore((state) => state.dados);
  const { dataTable: parts } = usePartStore((state) => state.dados);

  const { setIsOpen } = useContext(ModalContext);

  const handleDelete = async () => {
    await requestDeleteTags(Object.keys(rowSelection)[0]);
    toast({ title: 'Tag deletada com sucesso!' });
    setIsOpen(false);
    setRowSelection({});
  };

  return (
    <>
      <Modal
        content={
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
        }
      >
        <ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal
        content={
          <AdminTagsForm
            onRefresh={onRefresh}
            edit
            editValues={dataTable?.[Object.keys(rowSelection)[0]]}
            editIndex={Number(Object.keys(rowSelection)[0])}
            parts={parts}
          />
        }
      >
        <ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal content={<AdminTagsForm parts={parts} onRefresh={onRefresh} />}>
        <Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm">
          ADICIONAR
        </Button>
      </Modal>
    </>
  );
}
