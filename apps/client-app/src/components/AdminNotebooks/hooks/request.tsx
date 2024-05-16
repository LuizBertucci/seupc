import { IAddNotebookResponse, INotebook, addNotebooks, addPartNotebooks, getNotebooks } from '@/api/notebooks';

import { useNotebooksStore } from '../storage';

export const requestGetNotebooks = async () => {
  const { setDataTable } = useNotebooksStore.getState().dispatch;

  const { data } = await getNotebooks();

  await setDataTable(data.responseObject);
};

export const requestAddNotebooks = async (value: INotebook) => {
  const { addDataTable } = useNotebooksStore.getState().dispatch;

  const { data } = await addNotebooks(value);

  if (!data?.success) return {} as IAddNotebookResponse;

  addDataTable(value);
  await requestGetNotebooks();

  return data;
};

export const requestAddPartsToNotebook = async (partsIds: string[], dataNotebook?: INotebook, editedIndex?: number) => {
  if (!partsIds.length) return true;

  const { dataTable } = useNotebooksStore.getState().dados;

  if (editedIndex !== undefined) {
    const { id: notebookId } = await dataTable.find((_data: INotebook, i: number) => i === editedIndex);

    const { data } = await addPartNotebooks(partsIds.map((partId) => ({ notebookId, partId })));

    return data.success;
  }

  if (dataNotebook) {
    const notebookData: IAddNotebookResponse = await requestAddNotebooks(dataNotebook);

    const { data } = await addPartNotebooks(
      partsIds.map((partId) => ({ notebookId: notebookData.responseObject, partId }))
    );

    return data.success;
  }
};
