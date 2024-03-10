import ActionButton from '@/components/ui/actionButton'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/dialog'
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import CreatePart from '../Modal/create'
import DeletePart from '../Modal/delete'

export default function OptionsTable({rowSelection}: { rowSelection: object }) {

  return (
<>

<Modal content={<DeletePart />} >
<ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length === 0} />
</Modal>

<Modal content={<CreatePart edit={true} />} >
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
