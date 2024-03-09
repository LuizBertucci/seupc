import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SelectSingle } from '@/components/ui/select'
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { SelectOption } from "@/types/parts"

type FormParts = {
    nome: string,
    tipo: string,
    pontos: number
  }

export default function CreatePart({ edit }: { edit?: boolean }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<FormParts>()

      const onSubmit: SubmitHandler<FormParts> = (data) => {
        console.log(data)
      } 

      const options: Array<SelectOption> = [{ label: "RAM", value: "ram" }, { label: "GPU", value: "gpu" }]

  return (
    <>
    <DialogHeader>
        <h2>{edit ? "Editar" : "Criar"} Parte</h2>
    </DialogHeader>
    <form className='flex flex-col space-y-4 justify-center items-center w-full ' onSubmit={handleSubmit(onSubmit)} >
    <Input {...register("nome")} />
    
    <SelectSingle options={options} formControl={control} formName="tipo" placeholder={"Tipo da Parte"} width='100%' />  

    <Input {...register("pontos", { pattern: /^[0-9]+$/ })} />

    <Button type='submit' className='self-end' closeModal={true} icon={edit ? faSave : faAdd} >{edit ? "Salvar" : "Criar"}</Button>
    </form>
    </>
  )
}
