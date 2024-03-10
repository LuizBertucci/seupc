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
    dataTable: [
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
        {
          tipo: "MEMÓRIA RAM",
          nome: "RXT CORSAIR",
          pontos: 200
        },
        {
          tipo: "PROCESSADOR",
          nome: "I5-10400F",
          pontos: 1000
        },
        {
          tipo: "PLACA GRÁFICA",
          nome: "RX 7600 AMD",
          pontos: 2400
        },
      ],
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