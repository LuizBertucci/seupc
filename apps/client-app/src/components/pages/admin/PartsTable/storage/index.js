import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';

  //@ts-ignore
export const usePartStore = create(immer(set => ({
dados: {
    dataTable: [],
    columns: [
        {
          accessorKey: "name",
          header: "Nome",
        },
        {
          accessorKey: "partType",
          header: "Tipo da Parte",
        },
        {
          accessorKey: "point",
          header: "Pontos",
        },
      ],
},
loaders: {},
dispatch: {
    setDataTable: (payload) => set(state => {
        state.dados.dataTable = payload
    }),
    addDataTable: (payload) => set(state => {
        state.dados.dataTable = [...state.dados.dataTable, payload]
    }),
    editDataTable: (payload) => set(state => {
        state.dados.dataTable = payload
    }),
}


})))