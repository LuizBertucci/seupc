import ActionButton from '@/components/ui/actionButton'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/dialog'
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import CreateLoja from '../Modal/create'
import DeleteLoja from '../Modal/delete'
import { useLojasStore } from '../../storage'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function OptionsTable({rowSelection, setRowSelection}: { rowSelection: object, setRowSelection: any }) {
  const { dataTable } = useLojasStore((state) => state.dados)

  
  return (
<>

<Modal content={<DeleteLoja selected={Object.keys(rowSelection)[0]} setRowSelection={setRowSelection} />} >
<ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreateLoja edit={true} editValues={dataTable?.[Object.keys(rowSelection)[0]]} editIndex={Number(Object.keys(rowSelection)[0])} />} >
<ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreateLoja />}  >
<Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm"  >
  ADICIONAR
  </Button> 
  </Modal>

  </>
  )
}