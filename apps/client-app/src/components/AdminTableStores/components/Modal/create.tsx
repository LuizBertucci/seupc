import { Button } from '@/components/ui/button'
import { DialogHeader, ModalContext } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { Loja } from "@/types/parts"
import { requestAddLoja, requestEditLoja } from '../../hooks/request'
import { useToast } from '@/components/ui/use-toast'
import { useContext } from 'react'

export default function CreateLoja({ edit, editValues, editIndex }: { edit?: boolean, editValues?: Loja, editIndex?: number }) {
  const { toast } = useToast()
  const { setIsOpen } = useContext(ModalContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Loja>({ defaultValues: edit ? editValues : {}})

      const onSubmit: SubmitHandler<Loja> = async (data: Loja) => {
       edit ? await requestEditLoja(data, editIndex) : await requestAddLoja(data)
      
        toast({ title: `Loja ${edit ? "editada" : "criada"} com sucesso!`})
        setIsOpen(false)
      } 

  return (
    <>
    <DialogHeader>
        <h2>{edit ? "Editar" : "Criar"} Loja</h2>
    </DialogHeader>
    <form className='flex flex-col space-y-4 justify-center items-center w-full ' onSubmit={handleSubmit(onSubmit)} >

    <Input formError={errors?.name?.message} {...register("name", { required: "Nome para a loja obrigatório", maxLength: { value: 100, message: "Tamanho máximo do nome ultrapassado" } }) } placeholder='Nome da  Loja' />

    <Button type='submit' className='self-end' closeModal errors={errors} icon={edit ? faSave : faAdd} >{edit ? "Salvar" : "Criar"}</Button>
    </form>
    </>
  )
}
