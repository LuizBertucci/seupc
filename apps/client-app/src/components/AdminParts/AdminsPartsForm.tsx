import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SelectSingle } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Parts, SelectOption } from '@/types/parts';

import { requestAddParts, requestEditParts } from './hooks/request';

export default function AdminsPartsForm({
  edit,
  editValues,
  editIndex,
}: {
  edit?: boolean;
  editValues?: Parts;
  editIndex?: number;
}) {
  const { toast } = useToast();
  const { setIsOpen } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Parts>({ defaultValues: edit ? editValues : {} });

  const onSubmit: SubmitHandler<Parts> = async (data) => {
    const parsedData = {
      ...data,
      point: Number(data.point),
    };

    if (edit) {
      await requestEditParts(parsedData, editIndex);
    } else {
      await requestAddParts(parsedData);
    }

    toast({ title: `Parte ${edit ? 'editada' : 'criada'} com sucesso!` });
    setIsOpen(false);
  };

  const options: Array<SelectOption> = [
    { label: 'HD', value: 'HD' },
    { label: 'SSD', value: 'SSD' },
    { label: 'Memória RAM', value: 'Ram Memory' },
    { label: 'Processador', value: 'Processor' },
    { label: 'Placa Gráfica', value: 'Video Card' },
  ];

  return (
    <>
      <DialogHeader>
        <h2>{edit ? 'Editar' : 'Criar'} Parte</h2>
      </DialogHeader>
      <form className="flex flex-col space-y-4 justify-center items-center w-full " onSubmit={handleSubmit(onSubmit)}>
        <Input
          formError={errors?.name?.message}
          {...register('name', {
            required: 'Nome para o tipo obrigatório',
            maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
          })}
          placeholder="Nome da parte"
        />

        {!edit && (
          <SelectSingle options={options} formControl={control} formName="partType" placeholder="Tipo da Parte" />
        )}

        <Input
          type="number"
          formError={errors?.partType?.message}
          {...register('point', {
            pattern: /^[0-9]+$/,
            required: 'Pontos são obrigatórios',
            maxLength: { value: 6, message: 'pontuação máxima ultrapassada' },
          })}
          placeholder="Pontos"
        />

        <Button type="submit" className="self-end" closeModal errors={errors} icon={edit ? faSave : faAdd}>
          {edit ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </>
  );
}
