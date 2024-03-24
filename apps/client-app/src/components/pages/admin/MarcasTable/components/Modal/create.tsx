import { Button } from '@/components/ui/button'
import { DialogHeader, ModalContext } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { Marca } from "@/types/parts"
import { requestAddMarca, requestEditMarca } from '../../hooks/request'
import { useToast } from '@/components/ui/use-toast'
import { useContext } from 'react'

export default function CreateMarca({ edit, editValues, editIndex }: { edit?: boolean, editValues?: Marca, editIndex?: number }) {
  const { toast } = useToast()
  const { setIsOpen } = useContext(ModalContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Marca>({ defaultValues: edit ? editValues : {}})

      const onSubmit: SubmitHandler<Marca> = async (data: Marca) => {
       edit ? await requestEditMarca(data, editIndex) : await requestAddMarca(data)
      
        toast({ title: `Marca ${edit ? "editada" : "criada"} com sucesso!`})
        setIsOpen(false)
      } 

  return (
    <>
    <DialogHeader>
        <h2>{edit ? "Editar" : "Criar"} Marca</h2>
    </DialogHeader>
    <form className='flex flex-col space-y-4 justify-center items-center w-full ' onSubmit={handleSubmit(onSubmit)} >

    <Input formError={errors?.name?.message} {...register("name", { required: "Nome para a marca obrigatório", maxLength: { value: 100, message: "Tamanho máximo do nome ultrapassado" } }) } placeholder='Nome da Marca' />

    <Button type='submit' className='self-end' closeModal errors={errors} icon={edit ? faSave : faAdd} >{edit ? "Salvar" : "Criar"}</Button>
    </form>
    </>
  )
}
