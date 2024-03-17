import { Tags } from "@/types/parts";
import { useTagsStore } from "../storage";


export const requestGetTags = async () => {
const { setDataTable } = useTagsStore.getState().dispatch;

const data: Tags[] = [{ name: "Fortnite", category: "Games" }, { name: "Blender", category: "Programs" }, { name: "Udemy", category: "Courses" }]

await setDataTable(data)
}