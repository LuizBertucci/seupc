import { Button } from '@/components/ui/button'
import { DialogHeader, ModalContext } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SelectSingle } from '@/components/ui/select'
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { Parts, SelectOption } from "@/types/parts"
import { addParts, editParts } from '../../hooks/request'
import { useToast } from '@/components/ui/use-toast'
import { useContext } from 'react'

export default function CreatePart({ edit, editValues, editIndex }: { edit?: boolean, editValues?: Parts, editIndex?: number }) {
  const { toast } = useToast()
  const { setIsOpen } = useContext(ModalContext)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<Parts>({ defaultValues: edit ? editValues : {}})

      const onSubmit: SubmitHandler<Parts> = async (data) => {
       edit ? await editParts(data, editIndex) : await addParts(data)
      
        toast({ title: `Parte ${edit ? "editada" : "criada"} com sucesso!`})
        setIsOpen(false)
      } 

      const options: Array<SelectOption> = [{ label: "HD", value: "HD" }, { label: "SSD", value: "SSD" }, { label: "Processador", value: "PROCESSADOR" }, { label: "Placa Gráfica", value: "PLACA GRÁFICA" }]

  return (
    <>
    <DialogHeader>
        <h2>{edit ? "Editar" : "Criar"} Parte</h2>
    </DialogHeader>
    <form className='flex flex-col space-y-4 justify-center items-center w-full ' onSubmit={handleSubmit(onSubmit)} >

    <Input formError={errors?.nome?.message} {...register("nome", { required: "Nome para o tipo obrigatório", maxLength: { value: 100, message: "Tamanho máximo do nome ultrapassado" } }) } placeholder='Nome da parte' />

    <SelectSingle options={options} formControl={control} formName="tipo" placeholder={"Tipo da Parte"}  />  

    <Input type='number' formError={errors?.pontos?.message} {...register("pontos", { pattern: /^[0-9]+$/, required: "Pontos são obrigatórios", maxLength: { value: 6, message: "pontuação máxima ultrapassada" }  })} placeholder='Pontos' />

    <Button type='submit' className='self-end' closeModal errors={errors} icon={edit ? faSave : faAdd} >{edit ? "Salvar" : "Criar"}</Button>
    </form>
    </>
  )
}
