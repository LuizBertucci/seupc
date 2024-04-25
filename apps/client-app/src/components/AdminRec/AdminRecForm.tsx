import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Recomendacao } from '@/types/parts';

import { requestAddRec, requestEditRec } from './hooks/request';

export default function AdminRecForm({
  edit,
  editValues,
  editIndex,
}: {
  edit?: boolean;
  editValues?: Recomendacao;
  editIndex?: number;
}) {
  const { toast } = useToast();
  const { setIsOpen } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Recomendacao>({ defaultValues: edit ? editValues : {} });

  const onSubmit: SubmitHandler<Recomendacao> = async (data: Recomendacao) => {
    if (edit) {
      await requestEditRec(data, editIndex);
    } else {
      await requestAddRec(data);
    }

    toast({ title: `Site de Recomendação ${edit ? 'editada' : 'criada'} com sucesso!` });
    setIsOpen(false);
  };

  return (
    <>
      <DialogHeader>
        <h2>{edit ? 'Editar' : 'Criar'} Site de Recomendação</h2>
      </DialogHeader>
      <form className="flex flex-col space-y-4 justify-center items-center w-full " onSubmit={handleSubmit(onSubmit)}>
        <Input
          formError={errors?.name?.message}
          {...register('name', {
            required: 'Nome para o site obrigatório',
            maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
          })}
          placeholder="Nome do Site"
        />

        <Button type="submit" className="self-end" closeModal errors={errors} icon={edit ? faSave : faAdd}>
          {edit ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </>
  );
}
