/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// eslint-disable-next-line import/prefer-default-export
export const useTagsStore = create(
  immer((set) => ({
    dados: {
      dataTable: [],
      columns: [
        {
          accessorKey: 'name',
          header: 'Nome',
        },
        {
          accessorKey: 'category',
          header: 'Categoria',
        },
        {
          accessorKey: 'createdAt',
          header: 'Data de criação',
          cell: (params) => {

            const date = new Date(params.cell.getValue());
            if (isNaN(date)) {
              return 'Data inválida';
            }
            return new Intl.DateTimeFormat('pt-BR',
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })
            .format(date);
          }
        }
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
