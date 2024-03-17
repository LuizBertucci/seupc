import { useToast } from "@/components/ui/use-toast"
import { usePartStore } from "../storage"
import { Parts } from "@/types/parts";
import { getParts } from "@/api/parts";



export const requestGetParts = async () => {
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

const {data} = await getParts()

console.log(data.responseObject)

await setDataTable(data.responseObject)
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


export const deleteParts = async (values: string[]) => {
  const { setDataTable } = usePartStore.getState().dispatch;
  const { dataTable } = usePartStore.getState().dados;

  const filterData = dataTable.filter((part: Parts, index: number) => !values.includes(index.toString()) )

  // payload quando tiver endpoints
  const payload = {}

await setDataTable(filterData)
return true
}