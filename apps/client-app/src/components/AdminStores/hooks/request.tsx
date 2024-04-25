import { Loja } from '@/types/parts';

import { useLojasStore } from '../storage';

export const requestGetLojas = async () => {
  const { setDataTable } = useLojasStore.getState().dispatch;

  const mockLojas = [{ name: 'Amazon' }, { name: 'Americanas' }, { name: 'Casas Bahia' }, { name: 'Submarino' }];

  await setDataTable(mockLojas);
};

export const requestAddLoja = async (value: Loja) => {
  const { addDataTable } = useLojasStore.getState().dispatch;

  await addDataTable(value);

  return true;
};

export const requestEditLoja = async (value: Loja | undefined, index: number | undefined) => {
  const { editDataTable } = useLojasStore.getState().dispatch;
  const { dataTable } = useLojasStore.getState().dados;

  const editData = dataTable.map((loja: Loja, i: number | undefined) => {
    if (index === i) {
      return value;
    }

    return loja;
  });

  await editDataTable(editData);
  return true;
};

export const requestDeleteLoja = async (value: string) => {
  const { setDataTable } = useLojasStore.getState().dispatch;
  const { dataTable } = useLojasStore.getState().dados;

  const filterData = dataTable.filter((loja: Loja, index: number) => value !== index.toString());

  await setDataTable(filterData);
  return true;
};
