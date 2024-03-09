import ActionButton from '@/components/ui/actionButton'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/dialog'
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreatePart from '../Modal/create'
import DeletePart from '../Modal/delete'

export default function OptionsTable() {


  return (
<>

<Modal content={<DeletePart />} >
<ActionButton icon={faTrash} />
</Modal>

<Modal content={<CreatePart />} >
<ActionButton icon={faPen} />
</Modal>

<Modal content={<CreatePart />}  >
<Button className="gap-2" icon={faAdd} size="sm" >
  ADICIONAR
  </Button> 
  </Modal>
  </>
  )
}
