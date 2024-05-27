import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SelectSingle } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { PartTypeEnum, Parts, SelectOption, TagFormValue, Tags } from '@/types/parts';

import { requestAddTags, requestEditTags } from './hooks/request';

interface PartsSelectionOption {
  processors: SelectOption[];
  ram: SelectOption[];
  hd: SelectOption[];
  ssd: SelectOption[];
  gpu: SelectOption[];
}

export default function AdminTagsForm({
  edit,
  editValues,
  editIndex,
  parts,
}: {
  edit?: boolean;
  editValues?: Tags;
  editIndex?: number;
  parts?: Parts[];
}) {
  function emptyPartsSelection(): PartsSelectionOption {
    return {
      processors: [],
      ram: [],
      hd: [],
      ssd: [],
      gpu: [],
    };
  }

  const [{ processors, ram, hd, ssd, gpu }, setPartSelection] = useState<PartsSelectionOption>(emptyPartsSelection());

  const { toast } = useToast();
  const { setIsOpen } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Tags>({ defaultValues: edit ? editValues : {} });

  useEffect(() => {
    const newPartSelection = emptyPartsSelection();

    if (edit && editValues?.parts && editValues?.parts?.length > 0) {
      for (const part of editValues.parts) {
        switch (part.partType) {
          case PartTypeEnum.HD:
            setValue('hd' as any, part.id);
            break;
          case PartTypeEnum.Processor:
            setValue('processors' as any, part.id);
            break;
          case PartTypeEnum.RamMemory:
            setValue('ram' as any, part.id);
            break;
          case PartTypeEnum.SSD:
            setValue('ssd' as any, part.id);
            break;
          case PartTypeEnum.VideoCard:
            setValue('gpu' as any, part.id);
            break;
        }
      }
    }

    for (const part of parts ?? []) {
      const data = { label: part.name, value: part.id };
      switch (part.partType) {
        case PartTypeEnum.HD:
          newPartSelection.hd.push(data);
          break;
        case PartTypeEnum.Processor:
          newPartSelection.processors.push(data);
          break;
        case PartTypeEnum.RamMemory:
          newPartSelection.ram.push(data);
          break;
        case PartTypeEnum.SSD:
          newPartSelection.ssd.push(data);
          break;
        case PartTypeEnum.VideoCard:
          newPartSelection.gpu.push(data);
      }
    }

    setPartSelection(newPartSelection);
  }, [parts, edit, editValues]);

  const onSubmit: SubmitHandler<TagFormValue> = async (data: TagFormValue) => {
    const partsIds: string[] = [];

    for (const part of [data?.gpu, data?.hd, data?.processors, data?.ram, data?.ssd]) {
      if (part) {
        partsIds.push(part);
      }
    }

    if (edit) {
      await Promise.all([requestEditTags({ ...data, partsIds }, editIndex)]);
    } else {
      await requestAddTags({ name: data.name, category: data.category, partsIds });
    }

    toast({ title: `Tag ${edit ? 'editada' : 'criada'} com sucesso!` });
    setIsOpen(false);
  };

  const options: Array<SelectOption> = [
    { label: 'Jogo', value: 'Games' },
    { label: 'Programa', value: 'Programs' },
    { label: 'Curso', value: 'Courses' },
  ];

  return (
    <>
      <DialogHeader>
        <h2>{edit ? 'Editar' : 'Criar'} Tag</h2>
      </DialogHeader>
      <form className="flex flex-col space-y-4 justify-center items-center w-full " onSubmit={handleSubmit(onSubmit)}>
        <Input
          formError={errors?.name?.message}
          {...register('name', {
            required: 'Nome para o tipo obrigatório',
            maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
          })}
          placeholder="Nome da Tag"
        />

        <SelectSingle options={options} formControl={control} formName="category" placeholder="Categoria" />

        <div style={{ alignSelf: 'self-start', marginLeft: '5px' }}>
          <h2>Associar Parts</h2>
        </div>

        {processors.length > 0 && (
          <SelectSingle options={processors} formControl={control} formName="processors" placeholder="Processador" />
        )}
        {ram.length > 0 && <SelectSingle options={ram} formControl={control} formName="ram" placeholder="RAM" />}
        {hd.length > 0 && <SelectSingle options={hd} formControl={control} formName="hd" placeholder="HD" />}
        {ssd.length > 0 && <SelectSingle options={ssd} formControl={control} formName="ssd" placeholder="SSD" />}
        {gpu.length > 0 && (
          <SelectSingle options={gpu} formControl={control} formName="gpu" placeholder="Placa de vídeo" />
        )}

        <Button type="submit" className="self-end" closeModal errors={errors} icon={edit ? faSave : faAdd}>
          {edit ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </>
  );
}
