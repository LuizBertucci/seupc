import { CategoryTags } from '@/types/parts';

import { useCategoriesTagsStore } from '../storage';

export const requestGetCategoriesTags = async () => {
  const { setDataTable } = useCategoriesTagsStore.getState().dispatch;

  const MockCategoriesTags = [
    { category: 'Jogos' },
    { category: 'Programa' },
    { category: 'Curso' },
    { category: 'Sites' },
  ];

  await setDataTable(MockCategoriesTags);
};

export const requestAddCategoriesTags = async (value: CategoryTags) => {
  const { addDataTable } = useCategoriesTagsStore.getState().dispatch;

  await addDataTable(value);

  return true;
};

export const requestEditCategoriesTags = async (value: CategoryTags | undefined, index: number | undefined) => {
  const { editDataTable } = useCategoriesTagsStore.getState().dispatch;
  const { dataTable } = useCategoriesTagsStore.getState().dados;

  const editData = dataTable.map((category: CategoryTags, i: number | undefined) => {
    if (index === i) {
      return value;
    }

    return category;
  });

  await editDataTable(editData);
  return true;
};

export const requestDeleteCategoriesTags = async (value: string) => {
  const { setDataTable } = useCategoriesTagsStore.getState().dispatch;
  const { dataTable } = useCategoriesTagsStore.getState().dados;

  const filterData = dataTable.filter((category: CategoryTags, index: number) => value !== index.toString());

  await setDataTable(filterData);
  return true;
};
