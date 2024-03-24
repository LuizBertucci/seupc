import { Loja } from "@/types/parts";
import { useLojasStore } from "../storage";
import { addTags, deleteTags, editTags, getTags } from "@/api/tags";


export const requestGetLojas = async () => {
const { setDataTable } = useLojasStore.getState().dispatch;

// const { data } = await getTags()

const mockLojas = [
  {name: "Amazon"}, {name: "Americanas" }, {name: "Casas Bahia" }, {name: "Submarino" }
]

await setDataTable(mockLojas)
}


export const requestAddLoja = async (value: Loja) => {
    const { addDataTable } = useLojasStore.getState().dispatch;

    // const { data } = await addTags(value)

// if(!data?.success) return false

await addDataTable(value)
// await requestGetCategoriesTags()
return true
}

export const requestEditLoja = async (value: Loja | undefined, index: number | undefined) => {
  const { editDataTable } = useLojasStore.getState().dispatch;
  const { dataTable } = useLojasStore.getState().dados;

  const editData = dataTable.map((loja: Loja, i: number | undefined) => {
    if(index === i) {
      return value
    }

    return loja
  })

//   const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === index)

//   const { data } = await editTags(value, getPartId.id)

//   if(!data?.success) return false


await editDataTable(editData)
return true
}


export const requestDeleteLoja = async (value: string) => {
    const { setDataTable } = useLojasStore.getState().dispatch;
    const { dataTable } = useLojasStore.getState().dados;
  
    const filterData = dataTable.filter((loja: Loja, index: number) => value !== index.toString())
  
    // const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === Number(value))
    
    // const { data } = await deleteTags(getPartId.id)
  
    // if(!data?.success) return false
  
  await setDataTable(filterData)
  return true
  }