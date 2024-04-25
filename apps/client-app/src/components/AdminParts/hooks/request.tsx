import { EditPartsParams, addParts, deleteParts, editParts, getParts } from '@/api/parts';
import { Parts } from '@/types/parts';

import { usePartStore } from '../storage';

export const requestGetParts = async () => {
  const { setDataTable } = usePartStore.getState().dispatch;

  const { data } = await getParts();

  await setDataTable(data.responseObject);
};

export const requestAddParts = async (value: Parts) => {
  const { addDataTable } = usePartStore.getState().dispatch;

  const { data } = await addParts(value);

  if (!data?.success) return false;

  await addDataTable(value);
  await requestGetParts();
  return true;
};

export const requestEditParts = async (value: EditPartsParams | undefined, index: number | undefined) => {
  const { editDataTable } = usePartStore.getState().dispatch;
  const { dataTable } = usePartStore.getState().dados;

  const editData = dataTable.map((part: Parts, i: number | undefined) => {
    if (index === i) {
      return value;
    }

    return part;
  });

  const getPartId: Parts = await dataTable.find((data: Parts, i: number) => i === index);

  const { data } = await editParts(value, getPartId.id);

  if (!data?.success) return false;

  await editDataTable(editData);
  return true;
};

export const requestDeleteParts = async (value: string) => {
  const { setDataTable } = usePartStore.getState().dispatch;
  const { dataTable } = usePartStore.getState().dados;

  const filterData = dataTable.filter((part: Parts, index: number) => value !== index.toString());

  const getPartId: Parts = await dataTable.find((data: Parts, i: number) => i === Number(value));

  console.log(getPartId);

  const { data } = await deleteParts(getPartId.id);

  if (!data?.success) return false;

  await setDataTable(filterData);
  return true;
};
