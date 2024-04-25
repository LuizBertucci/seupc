import { Recomendacao } from '@/types/parts';

import { useRecStore } from '../storage';

export const requestGetRec = async () => {
  const { setDataTable } = useRecStore.getState().dispatch;

  const mockRec = [{ name: 'Buscapé' }, { name: 'Zoom' }, { name: 'TecMundo' }];

  await setDataTable(mockRec);
};

export const requestAddRec = async (value: Recomendacao) => {
  const { addDataTable } = useRecStore.getState().dispatch;

  await addDataTable(value);

  return true;
};

export const requestEditRec = async (value: Recomendacao | undefined, index: number | undefined) => {
  const { editDataTable } = useRecStore.getState().dispatch;
  const { dataTable } = useRecStore.getState().dados;

  const editData = dataTable.map((recomendacao: Recomendacao, i: number | undefined) => {
    if (index === i) {
      return value;
    }

    return recomendacao;
  });

  await editDataTable(editData);
  return true;
};

export const requestDeleteRec = async (value: string) => {
  const { setDataTable } = useRecStore.getState().dispatch;
  const { dataTable } = useRecStore.getState().dados;

  const filterData = dataTable.filter((recomendacao: Recomendacao, index: number) => value !== index.toString());

  await setDataTable(filterData);
  return true;
};
