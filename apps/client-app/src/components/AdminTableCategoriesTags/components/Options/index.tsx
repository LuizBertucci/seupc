import ActionButton from '@/components/ui/actionButton'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/dialog'
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import CreateCategoriesTags from '../Modal/create'
import DeleteCategoriesTags from '../Modal/delete'
import { useCategoriesTagsStore } from '../../storage'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  default function OptionsTable({rowSelection, setRowSelection}: { rowSelection: object, setRowSelection: any }) {
  const { dataTable } = useCategoriesTagsStore((state) => state.dados)

  
  return (
<>

<Modal content={<DeleteCategoriesTags selected={Object.keys(rowSelection)[0]} setRowSelection={setRowSelection} />} >
<ActionButton icon={faTrash} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreateCategoriesTags edit={true} editValues={dataTable?.[Object.keys(rowSelection)[0]]} editIndex={Number(Object.keys(rowSelection)[0])} />} >
<ActionButton icon={faPen} disabled={Object.keys(rowSelection).length !== 1} />
</Modal>

<Modal content={<CreateCategoriesTags />}  >
<Button disabled={Object.keys(rowSelection).length > 0} className="gap-2" icon={faAdd} size="sm"  >
  ADICIONAR
  </Button> 
  </Modal>

  </>
  )
}