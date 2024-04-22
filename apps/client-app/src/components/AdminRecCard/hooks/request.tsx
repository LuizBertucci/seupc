import { Recomendacao } from "@/types/parts";
import { useRecStore } from "../storage";
import { addTags, deleteTags, editTags, getTags } from "@/api/tags";


export const requestGetRec = async () => {
const { setDataTable } = useRecStore.getState().dispatch;

// const { data } = await getTags()

const mockRec = [
  {name: "Buscapé"}, {name: "Zoom" }, {name: "TecMundo" }
]

await setDataTable(mockRec)
}


export const requestAddRec = async (value: Recomendacao) => {
    const { addDataTable } = useRecStore.getState().dispatch;

    // const { data } = await addTags(value)

// if(!data?.success) return false

await addDataTable(value)
// await requestGetCategoriesTags()
return true
}

export const requestEditRec = async (value: Recomendacao | undefined, index: number | undefined) => {
  const { editDataTable } = useRecStore.getState().dispatch;
  const { dataTable } = useRecStore.getState().dados;

  const editData = dataTable.map((recomendacao: Recomendacao, i: number | undefined) => {
    if(index === i) {
      return value
    }

    return recomendacao
  })

//   const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === index)

//   const { data } = await editTags(value, getPartId.id)

//   if(!data?.success) return false


await editDataTable(editData)
return true
}


export const requestDeleteRec = async (value: string) => {
    const { setDataTable } = useRecStore.getState().dispatch;
    const { dataTable } = useRecStore.getState().dados;
  
    const filterData = dataTable.filter((recomendacao: Recomendacao, index: number) => value !== index.toString())
  
    // const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === Number(value))
    
    // const { data } = await deleteTags(getPartId.id)
  
    // if(!data?.success) return false
  
  await setDataTable(filterData)
  return true
  }