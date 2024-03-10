import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';

type Part = {
    tipo: string;
    nome: string;
    pontos: number;
  };
  
  type Column = {
    accessorKey: string;
    header: string;
  };
  
interface PartStoreState {
    dados: {
      dataTable: Part[];
      columns: Column[];
    };
    loaders: object
    dispatch: {
        setDataTable: (payload: Part[]) => void;
    }
  }

  //@ts-ignore
export const usePartStore = create<PartStoreState>(immer(set => ({
dados: {
    dataTable: [],
    columns: [
        {
          accessorKey: "nome",
          header: "Nome",
        },
        {
          accessorKey: "tipo",
          header: "Tipo da Parte",
        },
        {
          accessorKey: "pontos",
          header: "Pontos",
        },
      ],
},
loaders: {},
dispatch: {
    setDataTable: (payload: Part[]) => set(state => {
        state.dados.dataTable = payload
    }),
}


})))