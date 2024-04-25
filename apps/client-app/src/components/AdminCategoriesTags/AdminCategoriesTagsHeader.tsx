import { faAdd, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import ActionButton from '@/components/ui/actionButton';
import { Button } from '@/components/ui/button';
import { DialogHeader, Modal, ModalContext } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

import AdminCategoriesTagsForm from './AdminCategoriesTagsForm';
import { requestDeleteCategoriesTags } from './hooks/request';
import { useCategoriesTagsStore } from './storage';

export default function AdminCategoriesTagsHeader({
  rowSelection,
  setRowSelection,
}: {
  rowSelection: object;
  setRowSelection: any;
}) {
  const { dataTable } = useCategoriesTagsStore((state) => state.dados);
  const { setIsOpen } = useContext(ModalContext);
  const handleDelete = async () => {
    await requestDeleteCategoriesTags(Object.keys(rowSelection)[0]);
    toast({ title: 'Categoria deletada com sucesso!' });
    setIsOpen(false);
    setRowSelection({});
  };

  return (
    <>
      <Modal
        content={
          <>
            <DialogHeader>Deletar Categoria</DialogHeader>

            <h4>
              Deseja realmente <b>deletar</b> a categoria selecionada?
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
          <AdminCategoriesTagsForm
            edit
            editValues={dataTable?.[Object.keys(rowSelection)[0]]}
            editIndex={Number(Object.keys(rowSelection)[0])}
          />
        }
      >
        <ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal content={<AdminCategoriesTagsForm />}>
        <Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm">
          ADICIONAR
        </Button>
      </Modal>
    </>
  );
}
