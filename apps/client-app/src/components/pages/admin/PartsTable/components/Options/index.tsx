import ActionButton from '@/components/ui/actionButton'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/dialog'
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import CreatePart from '../Modal/create'
import DeletePart from '../Modal/delete'
import { usePartStore } from '../../storage'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function OptionsTable({rowSelection, setRowSelection}: { rowSelection: object, setRowSelection: any }) {
  const { dataTable } = usePartStore((state) => state.dados)

  
  return (
<>

<Modal content={<DeletePart selected={Object.keys(rowSelection)} setRowSelection={setRowSelection} />} >
<ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length === 0} />
</Modal>

<Modal content={<CreatePart edit={true} editValues={dataTable[Object.keys(rowSelection)[0]]} editIndex={Number(Object.keys(rowSelection)[0])} />} >
<ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreatePart />}  >
<Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm"  >
  ADICIONAR
  </Button> 
  </Modal>

  </>
  )
}
