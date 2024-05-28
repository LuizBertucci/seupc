import { addPartsTags, addTags, deleteTags, editTags, getTags } from '@/api/tags';
import { CreateTagDTO, Tags, WriteTagDTO } from '@/types/parts';

import { useTagsStore } from '../storage';

export const requestGetTags = async () => {
  const { setDataTable } = useTagsStore.getState().dispatch;

  const { data } = await getTags();

  await setDataTable(data.responseObject);
};

export const requestAddTags = async (value: CreateTagDTO) => {
  const { addDataTable } = useTagsStore.getState().dispatch;

  const { data } = await addTags(value);

  if (!data?.success) return false;

  await addDataTable(value);
  await requestGetTags();
  return true;
};

export const requestAddPartsToTag = async (partsIds: string[], index?: number): Promise<boolean> => {
  if (!partsIds.length) return true;

  const { dataTable } = useTagsStore.getState().dados;
  const { id: tagId } = await dataTable.find((_data: Tags, i: number) => i === index);
  const { data } = await addPartsTags(partsIds.map((partId) => ({ tagId, partId })));
  return data.success;
};

export const requestEditTags = async (
  value: (WriteTagDTO & { partsIds: string[] }) | undefined,
  index: number | undefined
) => {
  const { editDataTable } = useTagsStore.getState().dispatch;
  const { dataTable } = useTagsStore.getState().dados;

  const editData = dataTable.map((tag: Tags, i: number | undefined) => {
    if (index === i) {
      return value;
    }

    return tag;
  });

  const getTag: Tags = await dataTable.find((data: Tags, i: number) => i === index);

  const { data } = await editTags(value, getTag.id);

  if (!data?.success) return false;

  await editDataTable(editData);
  return true;
};

export const requestDeleteTags = async (value: string) => {
  const { setDataTable } = useTagsStore.getState().dispatch;
  const { dataTable } = useTagsStore.getState().dados;

  const filterData = dataTable.filter((part: Tags, index: number) => value !== index.toString());

  const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === Number(value));

  const { data } = await deleteTags(getPartId.id);

  if (!data?.success) return false;

  await setDataTable(filterData);
  return true;
};
