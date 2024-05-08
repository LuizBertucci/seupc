import { getNotebooks } from '@/api/notebooks';

import { useNotebooksStore } from '../storage';

export const requestGetNotebooks = async () => {
  const { setDataTable } = useNotebooksStore.getState();

  const { data } = await getNotebooks();

  await setDataTable(data.responseObject);
};
