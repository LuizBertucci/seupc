import ActionButton from '@/components/ui/actionButton'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/dialog'
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import CreateRec from '../Modal/create'
import DeleteRec from '../Modal/delete'
import { useRecStore } from '../../storage'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function OptionsTable({rowSelection, setRowSelection}: { rowSelection: object, setRowSelection: any }) {
  const { dataTable } = useRecStore((state) => state.dados)

  
  return (
<>

<Modal content={<DeleteRec selected={Object.keys(rowSelection)[0]} setRowSelection={setRowSelection} />} >
<ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreateRec edit={true} editValues={dataTable?.[Object.keys(rowSelection)[0]]} editIndex={Number(Object.keys(rowSelection)[0])} />} >
<ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreateRec />}  >
<Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm"  >
  ADICIONAR
  </Button> 
  </Modal>

  </>
  )
}