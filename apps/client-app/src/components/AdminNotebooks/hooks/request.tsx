import { INotebook, addNotebooks, getNotebooks } from '@/api/notebooks';

import { useNotebooksStore } from '../storage';

export const requestGetNotebooks = async () => {
  const { setDataTable } = useNotebooksStore.getState().dispatch;

  const { data } = await getNotebooks();

  await setDataTable(data.responseObject);
};

export const requestAddNotebooks = async (value: INotebook) => {
  const { addDataTable } = useNotebooksStore.getState().dispatch;

  const { data } = await addNotebooks(value);

  if (!data?.success) return false;

  addDataTable(value);
  await requestGetNotebooks();

  return true;
};
