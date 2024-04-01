import { CategoryTags } from "@/types/parts";
import { useCategoriesTagsStore } from "../storage";
import { addTags, deleteTags, editTags, getTags } from "@/api/tags";


export const requestGetCategoriesTags = async () => {
const { setDataTable } = useCategoriesTagsStore.getState().dispatch;

// const { data } = await getTags()

const MockCategoriesTags = [
  {category: "Jogos"}, {category: "Programa" }, {category: "Curso" }, {category: "Sites" }
]

await setDataTable(MockCategoriesTags)
}


export const requestAddCategoriesTags = async (value: CategoryTags) => {
    const { addDataTable } = useCategoriesTagsStore.getState().dispatch;

    // const { data } = await addTags(value)

// if(!data?.success) return false

await addDataTable(value)
// await requestGetCategoriesTags()
return true
}

export const requestEditCategoriesTags = async (value: CategoryTags | undefined, index: number | undefined) => {
  const { editDataTable } = useCategoriesTagsStore.getState().dispatch;
  const { dataTable } = useCategoriesTagsStore.getState().dados;

  const editData = dataTable.map((category: CategoryTags, i: number | undefined) => {
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


export const requestDeleteCategoriesTags = async (value: string) => {
    const { setDataTable } = useCategoriesTagsStore.getState().dispatch;
    const { dataTable } = useCategoriesTagsStore.getState().dados;
  
    const filterData = dataTable.filter((category: CategoryTags, index: number) => value !== index.toString())
  
    // const getPartId: Tags = await dataTable.find((data: Tags, i: number) => i === Number(value))
    
    // const { data } = await deleteTags(getPartId.id)
  
    // if(!data?.success) return false
  
  await setDataTable(filterData)
  return true
  }