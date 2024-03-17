import { Tags } from "@/types/parts";
import { useTagsStore } from "../storage";


export const requestGetTags = async () => {
const { setDataTable } = useTagsStore.getState().dispatch;

const data: Tags[] = [{ name: "Fortnite", category: "Games" }, { name: "Blender", category: "Programs" }, { name: "Udemy", category: "Courses" }]

await setDataTable(data)
}


export const requestAddParts = async (value: Tags) => {
    const { addDataTable } = useTagsStore.getState().dispatch;

    // const { data } = await addParts(value)

// if(!data?.success) return false

await addDataTable(value)
// await requestGetTags()
return true
}

export const requestEditParts = async (value: Tags | undefined, index: number | undefined) => {
  const { editDataTable } = useTagsStore.getState().dispatch;
  const { dataTable } = useTagsStore.getState().dados;

  const editData = dataTable.map((part: Tags, i: number | undefined) => {
    if(index === i) {
      return value
    }

    return part
  })

//   const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === index)

//   const { data } = await editParts(value, getPartId.id)

//   if(!data?.success) return false


await editDataTable(editData)
return true
}


export const requestDeleteParts = async (value: string) => {
  const { setDataTable } = useTagsStore.getState().dispatch;
  const { dataTable } = useTagsStore.getState().dados;

  const filterData = dataTable.filter((part: Tags, index: number) => value !== index.toString())

//   const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === Number(value))

//   console.log(getPartId)
  
//   const { data } = await deleteParts(getPartId.id)

//   if(!data?.success) return false

await setDataTable(filterData)
return true
}