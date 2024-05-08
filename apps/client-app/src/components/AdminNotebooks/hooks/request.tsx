import { INotebook, getNotebooks } from '@/api/notebooks';

import { useNotebooksStore } from '../storage';

export const requestGetNotebooks = async () => {
  const { setDataTable } = useNotebooksStore.getState();

  const { data } = await getNotebooks();

  await setDataTable(data.responseObject);
};

export const requestAddNotebooks = async (value: INotebook) => {
  const { addDataTable } = useNotebooksStore.getState();

  await addDataTable(value);
};
