import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { FieldErrors, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';

import { INotebook } from '@/api/notebooks';
import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { requestAddNotebooks } from './hooks/request';

function CheckBox({
  label,
  register,
  name,
  errors,
}: {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors;
}) {
  return (
    <div className="flex self-start">
      <input
        type="checkbox"
        id={name}
        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        {...register(name)}
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {errors[name] && <p className="text-red-500 text-xs">{errors[name]?.message as string}</p>}
    </div>
  );
}

export default function AdminNotebooksForm({
  edit,
  editValues,
}: {
  edit?: boolean;
  editValues?: INotebook;
  editIndex?: number;
}) {
  const { setIsOpen } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INotebook>({ defaultValues: edit ? editValues : {} });

  const onSubmit: SubmitHandler<INotebook> = async (data: INotebook) => {
    await requestAddNotebooks(data);
    setIsOpen(false);
  };

  return (
    <>
      <DialogHeader>
        <h2>{edit ? 'Editar' : 'Criar'} Notebook</h2>
      </DialogHeader>
      <form className="flex flex-col space-y-4 justify-center items-center w-full " onSubmit={handleSubmit(onSubmit)}>
        <Input
          formError={errors?.name?.message}
          {...register('name', {
            required: 'Nome para o notebook obrigatório',
            maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
          })}
          placeholder="Nome do Notebook"
        />

        <Input
          formError={errors?.brand?.message}
          {...register('brand', {
            required: 'Nome para a marca do notebook é obrigatória',
            maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
          })}
          placeholder="Nome da marca"
        />

        <Input placeholder="Cor" {...register('color')} />
        <Input placeholder="Tamanho da Tela" {...register('screen_size')} />
        <Input placeholder="Resolução da Tela" {...register('screen_resolution')} />
        <Input placeholder="Bateria" {...register('battery')} />
        <CheckBox label="Teclado numérico" register={register} name="has_numeric_keypad" errors={errors} />
        <Input placeholder="Sistema Operacional" {...register('operating_system')} />
        <Input placeholder="ID do Fabricante" {...register('manufacturer_id')} />
        <Input placeholder="Peso" {...register('weight')} />

        <Button type="submit" className="self-end" closeModal errors={errors} icon={edit ? faSave : faAdd}>
          {edit ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </>
  );
}
