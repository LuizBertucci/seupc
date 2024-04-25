import { Tags } from "@/types/parts";
import { api } from "./config";

interface GetTagsResponse {
    success: boolean,
    message: string,
    responseObject: Tags[] | string,
    statusCode: number
}

interface AddTagsParams {
    name: string,
    category: 'Games' | 'Programs' | 'Courses'
}

export interface EditTagsParams {
    name: string
}

export const getTags =  async () => api.get<GetTagsResponse>("/tags")

export const addTags =  async (params: AddTagsParams) => api.post<GetTagsResponse>("/tags", params)

export const editTags =  async (params: EditTagsParams | undefined, id: string) => api.put<GetTagsResponse>(`/tags/${id}`, params)

export const deleteTags =  async (id: string) => api.delete<GetTagsResponse>(`/tags/${id}`)