import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { INotebook } from '@/api/notebooks';
import { Button } from '@/components/ui/button';
import { DialogHeader, ModalContext } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { AddOWR } from '@/types/otherRecommendationWebsite/orw';
import { AddParts, PartTypeEnum, Parts, SelectOption } from '@/types/parts';
import { Checkbox } from '../ui/checkbox';
import { SelectSingle } from '../ui/select';
import { requestAddNotebooks } from './hooks/request';

interface IPartsSelectionOption {
  processors: SelectOption[];
  ram: SelectOption[];
  hd: SelectOption[];
  ssd: SelectOption[];
  gpu: SelectOption[];
}

export default function AdminNotebooksForm({
  edit,
  editValues,
  parts,
}: {
  edit?: boolean;
  editValues?: INotebook;
  editIndex?: number;
  parts?: Parts[];
}) {
  const { setIsOpen } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<INotebook>({
    defaultValues: edit ? editValues : {},
  });

  const emptyPartsSelection = (): IPartsSelectionOption => {
    return {
      processors: [],
      ram: [],
      hd: [],
      ssd: [],
      gpu: [],
    };
  };

  const [{ processors, ram, hd, ssd, gpu }, setPartSelection] = useState<IPartsSelectionOption>(emptyPartsSelection());

  useEffect(() => {
    const newPartSelection = emptyPartsSelection();
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
  }, [parts]);

  const onSubmit: SubmitHandler<INotebook & AddParts & AddOWR> = async (data: INotebook & AddParts & AddOWR) => {
    const partsIds: string[] = [];

    for (const part of [data?.gpu, data?.hd, data?.processors, data?.ram, data?.ssd]) {
      if (part) {
        partsIds.push(part);
      }
    }
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
            className="border-2 border-gray-400"
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
            <div className="self-start bg-gray-100 p-3 rounded-sm border-2 border-gray-400">
              <Checkbox
                label="Teclado numérico"
                id="numeric_keyboard_label"
                checked={value}
                onCheckedChange={onChange}
                ref={ref}
                onBlur={onBlur}
              />
            </div>
          )}
        />

        <div className="flex gap-3 w-full flex-1">
          <div className="flex flex-col">
            <p>Marca</p>
            <Input
              className="border-2 border-gray-400"
              formError={errors?.brand?.message}
              {...register('brand', {
                required: 'Nome para a marca do notebook é obrigatória',
                maxLength: { value: 100, message: 'Tamanho máximo do nome ultrapassado' },
              })}
            />
          </div>

          <div className="flex flex-col">
            <p>Resolução da Tela</p>
            <Input {...register('screen_resolution')} className="border-2 border-gray-400" />
          </div>
          <div className="flex flex-col">
            <p>Tamanho da Tela</p>
            <Input {...register('screen_size')} className="border-2 border-gray-400" />
          </div>
          <div className="flex flex-col">
            <p>S.O</p>
            <Input {...register('operating_system')} className="border-2 border-gray-400" />
          </div>
          <div className="flex flex-col">
            <p>Cor</p>
            <Input {...register('color')} className="border-2 border-gray-400" />
          </div>
        </div>

        {!edit && (
          <div className="flex gap-3 w-full flex-1">
            <div className="flex flex-col">
              <p>Bateria</p>
              <Input {...register('battery')} className="border-2 border-gray-400" />
            </div>
            <div className="flex flex-col">
              <p>ID do Fabricante</p>
              <Input {...register('manufacturer_id')} className="border-2 border-gray-400" />
            </div>
            <div className="flex flex-col">
              <p>Peso</p>
              <Input {...register('weight')} className="border-2 border-gray-400" />
            </div>
          </div>
        )}

        <div style={{ alignSelf: 'self-start', marginLeft: '5px' }}>
          <h2>Associar Parts</h2>
        </div>

        <div className="flex gap-3 w-full flex-1">
          <>
            {processors.length > 0 && (
              <SelectSingle
                options={processors}
                formControl={control}
                formName="processors"
                placeholder="Processador"
              />
            )}
            {ram.length > 0 && <SelectSingle options={ram} formControl={control} formName="ram" placeholder="RAM" />}
            {hd.length > 0 && <SelectSingle options={hd} formControl={control} formName="hd" placeholder="HD" />}
            {ssd.length > 0 && <SelectSingle options={ssd} formControl={control} formName="ssd" placeholder="SSD" />}
            {gpu.length > 0 && (
              <SelectSingle options={gpu} formControl={control} formName="gpu" placeholder="Placa de vídeo" />
            )}
          </>
        </div>

        <div className="flex flex-col gap-3 w-full flex-1">
          <h2>Outros sites de recomendação</h2>
          <div className="flex gap-3 w-full flex-1">
            <div className="flex flex-col">
              <Input
                {...register('otherRecommendationWebsite')}
                className="border-2 border-gray-400"
                placeholder="URL"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="self-end" closeModal errors={errors} icon={edit ? faSave : faAdd}>
          {edit ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </>
  );
}
