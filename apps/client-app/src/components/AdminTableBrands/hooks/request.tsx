import { Marca } from "@/types/parts";
import { useMarcasStore } from "../storage";
import { addTags, deleteTags, editTags, getTags } from "@/api/tags";


export const requestGetMarcas = async () => {
const { setDataTable } = useMarcasStore.getState().dispatch;

// const { data } = await getTags()

const mockMarcas = [
  {name: "Asus"}, {name: "Dell" }, {name: "Positivo" }, {name: "Lenovo" }
]

await setDataTable(mockMarcas)
}


export const requestAddMarca = async (value: Marca) => {
    const { addDataTable } = useMarcasStore.getState().dispatch;

    // const { data } = await addTags(value)

// if(!data?.success) return false

await addDataTable(value)
// await requestGetCategoriesTags()
return true
}

export const requestEditMarca = async (value: Marca | undefined, index: number | undefined) => {
  const { editDataTable } = useMarcasStore.getState().dispatch;
  const { dataTable } = useMarcasStore.getState().dados;

  const editData = dataTable.map((category: Marca, i: number | undefined) => {
    if(index === i) {
      return value
    }

    return category
  })

//   const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === index)

//   const { data } = await editTags(value, getPartId.id)

//   if(!data?.success) return false


await editDataTable(editData)
return true
}


export const requestDeleteMarca = async (value: string) => {
    const { setDataTable } = useMarcasStore.getState().dispatch;
    const { dataTable } = useMarcasStore.getState().dados;
  
    const filterData = dataTable.filter((category: Marca, index: number) => value !== index.toString())
  
    // const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === Number(value))
    
    // const { data } = await deleteTags(getPartId.id)
  
    // if(!data?.success) return false
  
  await setDataTable(filterData)
  return true
  }