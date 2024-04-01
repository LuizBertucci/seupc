import { Button } from '@/components/ui/button'
import { DialogHeader, ModalContext } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { CategoryTags } from "@/types/parts"
import { requestAddCategoriesTags, requestEditCategoriesTags } from '../../hooks/request'
import { useToast } from '@/components/ui/use-toast'
import { useContext } from 'react'

export default function CreateCategoriesTags({ edit, editValues, editIndex }: { edit?: boolean, editValues?: CategoryTags, editIndex?: number }) {
  const { toast } = useToast()
  const { setIsOpen } = useContext(ModalContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<CategoryTags>({ defaultValues: edit ? editValues : {}})

      const onSubmit: SubmitHandler<CategoryTags> = async (data: CategoryTags) => {
       edit ? await requestEditCategoriesTags(data, editIndex) : await requestAddCategoriesTags(data)
      
        toast({ title: `Categoria ${edit ? "editada" : "criada"} com sucesso!`})
        setIsOpen(false)
      } 

  return (
    <>
    <DialogHeader>
        <h2>{edit ? "Editar" : "Criar"} Categoria Tag</h2>
    </DialogHeader>
    <form className='flex flex-col space-y-4 justify-center items-center w-full ' onSubmit={handleSubmit(onSubmit)} >

    <Input formError={errors?.category?.message} {...register("category", { required: "Nome para a categoria obrigatório", maxLength: { value: 100, message: "Tamanho máximo do nome ultrapassado" } }) } placeholder='Nome da Categoria' />

    <Button type='submit' className='self-end' closeModal errors={errors} icon={edit ? faSave : faAdd} >{edit ? "Salvar" : "Criar"}</Button>
    </form>
    </>
  )
}
