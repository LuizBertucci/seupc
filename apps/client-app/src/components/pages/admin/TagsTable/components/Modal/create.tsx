import { Button } from '@/components/ui/button'
import { DialogHeader, ModalContext } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SelectSingle } from '@/components/ui/select'
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { SelectOption, Tags } from "@/types/parts"
import { requestAddParts, requestEditParts } from '../../hooks/request'
import { useToast } from '@/components/ui/use-toast'
import { useContext } from 'react'

export default function CreateTags({ edit, editValues, editIndex }: { edit?: boolean, editValues?: Tags, editIndex?: number }) {
  const { toast } = useToast()
  const { setIsOpen } = useContext(ModalContext)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<Tags>({ defaultValues: edit ? editValues : {}})

      const onSubmit: SubmitHandler<Tags> = async (data) => {
       edit ? await requestEditParts(data, editIndex) : await requestAddParts(data)
      
        toast({ title: `Tag ${edit ? "editada" : "criada"} com sucesso!`})
        setIsOpen(false)
      } 

      const options: Array<SelectOption> = [{ label: "Jogo", value: "Games" }, { label: "Programa", value: "Programs" }, { label: "Curso", value: "Courses" }]

  return (
    <>
    <DialogHeader>
        <h2>{edit ? "Editar" : "Criar"} Tag</h2>
    </DialogHeader>
    <form className='flex flex-col space-y-4 justify-center items-center w-full ' onSubmit={handleSubmit(onSubmit)} >

    <Input formError={errors?.name?.message} {...register("name", { required: "Nome para o tipo obrigatório", maxLength: { value: 100, message: "Tamanho máximo do nome ultrapassado" } }) } placeholder='Nome da parte' />

    <SelectSingle options={options} formControl={control} formName="category" placeholder={"Categoria"}  /> 

    <Button type='submit' className='self-end' closeModal errors={errors} icon={edit ? faSave : faAdd} >{edit ? "Salvar" : "Criar"}</Button>
    </form>
    </>
  )
}
