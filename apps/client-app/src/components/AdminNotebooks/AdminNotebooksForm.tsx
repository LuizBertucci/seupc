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
        <h2>Infos</h2>
      </DialogHeader>
      <form className="flex flex-col space-y-4 justify-center items-center w-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            formError={errors?.name?.message}
            {...register('name', {
              required: 'Nome para o notebook obrigatório',
              maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
            })}
            placeholder="Nome do Notebook"
          />
        </div>

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
        <div className="flex gap-3 w-full flex-1">
          <div className="flex flex-col">
            <p>Marca</p>
            <Input
              formError={errors?.brand?.message}
              {...register('brand', {
                required: 'Nome para a marca do notebook é obrigatória',
                maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
              })}
            />
          </div>

          <div className="flex flex-col">
            <p>Resolução da Tela</p>
            <Input {...register('screen_resolution')} />
          </div>
          <div className="flex flex-col">
            <p>Tamanho da Tela</p>
            <Input {...register('screen_size')} />
          </div>
          <div className="flex flex-col">
            <p>S.O</p>
            <Input {...register('operating_system')} />
          </div>
          <div className="flex flex-col">
            <p>Cor</p>
            <Input {...register('color')} />
          </div>
        </div>

        {/* <Input placeholder="Bateria" {...register('battery')} />
        <Input placeholder="ID do Fabricante" {...register('manufacturer_id')} />
        <Input placeholder="Peso" {...register('weight')} /> */}

        <Button type="submit" className="self-end" closeModal errors={errors} icon={edit ? faSave : faAdd}>
          {edit ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </>
  );
}
