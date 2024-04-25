import { Marca } from '@/types/parts';

import { useMarcasStore } from '../storage';

export const requestGetMarcas = async () => {
  const { setDataTable } = useMarcasStore.getState().dispatch;

  const mockMarcas = [{ name: 'Asus' }, { name: 'Dell' }, { name: 'Positivo' }, { name: 'Lenovo' }];

  await setDataTable(mockMarcas);
};

export const requestAddMarca = async (value: Marca) => {
  const { addDataTable } = useMarcasStore.getState().dispatch;

  await addDataTable(value);
  return true;
};

export const requestEditMarca = async (value: Marca | undefined, index: number | undefined) => {
  const { editDataTable } = useMarcasStore.getState().dispatch;
  const { dataTable } = useMarcasStore.getState().dados;

  const editData = dataTable.map((category: Marca, i: number | undefined) => {
    if (index === i) {
      return value;
    }

    return category;
  });

  await editDataTable(editData);
  return true;
};

export const requestDeleteMarca = async (value: string) => {
  const { setDataTable } = useMarcasStore.getState().dispatch;
  const { dataTable } = useMarcasStore.getState().dados;

  const filterData = dataTable.filter((category: Marca, index: number) => value !== index.toString());

  await setDataTable(filterData);
  return true;
};
