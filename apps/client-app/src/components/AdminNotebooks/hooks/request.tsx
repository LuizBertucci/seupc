import { INotebook, addNotebooks, addPartNotebooks, getNotebooks } from '@/api/notebooks';

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

export const requestAddPartsToNotebook = async (partsIds: string[], index?: number): Promise<boolean> => {
  if (!partsIds.length) return true;

  const { dataTable } = useNotebooksStore.getState().dados;

  const { id: notebookId } = await dataTable.getState().dados;

  const { data } = await addPartNotebooks(partsIds.map((partId) => ({ notebookId, partId })));

  return data.success;
};
