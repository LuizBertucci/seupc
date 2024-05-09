import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { INotebook } from '@/api/notebooks';
import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Checkbox } from '../ui/checkbox';
import { requestAddNotebooks } from './hooks/request';

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
    watch,
    control,
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
        <Controller
          name="has_numeric_keypad"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Checkbox
              label="Teclado numérico"
              id="numeric_keyboard_label"
              checked={value}
              onCheckedChange={onChange}
              ref={ref}
              onBlur={onBlur}
            />
          )}
        />
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
