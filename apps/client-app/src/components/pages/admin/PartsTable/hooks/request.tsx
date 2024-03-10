import { useToast } from "@/components/ui/use-toast"
import { usePartStore } from "../storage"
import { Parts } from "@/types/parts";



export const getParts = async () => {
    const { setDataTable } = usePartStore.getState().dispatch;

const payload = {
  dados : [{
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
      }
    ]
}

// Call para o back será aqui

await setDataTable(payload.dados)
}


export const addParts = async (value: Parts) => {
    const { addDataTable } = usePartStore.getState().dispatch;

    // payload quando tiver endpoints
    const payload = {}

await addDataTable(value)
return true
}

export const editParts = async (value: Parts | undefined, index: number | undefined) => {
  const { editDataTable } = usePartStore.getState().dispatch;
  const { dataTable } = usePartStore.getState().dados;

  const editData = dataTable.map((part: Parts, i: number | undefined) => {
    if(index === i) {
      return value
    }

    return part
  })

  
  // payload quando tiver endpoints
  const payload = {}

await editDataTable(editData)
return true
}