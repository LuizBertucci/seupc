/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useCategoriesTagsStore = create(
  immer((set) => ({
    dados: {
      dataTable: [],
      columns: [
        {
          accessorKey: 'category',
          header: 'Categoria',
        },
      ],
    },
    loaders: {},
    dispatch: {
      setDataTable: (payload) =>
        set((state) => {
          state.dados.dataTable = payload;
        }),
      addDataTable: (payload) =>
        set((state) => {
          state.dados.dataTable = [...state.dados.dataTable, payload];
        }),
      editDataTable: (payload) =>
        set((state) => {
          state.dados.dataTable = payload;
        }),
    },
  }))
);
