import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import ActionButton from '@/components/ui/actionButton';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/dialog';

import { useMarcasStore } from '../../storage';
import CreateMarca from '../Modal/create';
import DeleteMarca from '../Modal/delete';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function OptionsTable({
  rowSelection,
  setRowSelection,
}: {
  rowSelection: object;
  setRowSelection: any;
}) {
  const { dataTable } = useMarcasStore((state) => state.dados);

  return (
    <>
      <Modal content={<DeleteMarca selected={Object.keys(rowSelection)[0]} setRowSelection={setRowSelection} />}>
        <ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal
        content={
          <CreateMarca
            edit
            editValues={dataTable?.[Object.keys(rowSelection)[0]]}
            editIndex={Number(Object.keys(rowSelection)[0])}
          />
        }
      >
        <ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
      </Modal>

      <Modal content={<CreateMarca />}>
        <Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm">
          ADICIONAR
        </Button>
      </Modal>
    </>
  );
}
