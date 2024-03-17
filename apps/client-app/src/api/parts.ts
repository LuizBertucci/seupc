import { Parts } from "@/types/parts";
import { api } from "./config";

interface GetPartsResponse {
    success: boolean,
    message: string,
    responseObject: Parts[] | string,
    statusCode: number
}

interface AddPartsParams {
    name: string, 
    partType: string,
    point: number
}

export interface EditPartsParams {
    name: string,
    point: number
}

export const getParts =  async () => api.get<GetPartsResponse>("/parts")

export const addParts =  async (params: AddPartsParams) => api.post<GetPartsResponse>("/parts", params)

export const editParts =  async (params: EditPartsParams | undefined, id: string) => api.put<GetPartsResponse>(`/parts/${id}`, params)

export const deleteParts =  async (id: string) => api.delete<GetPartsResponse>(`/parts/${id}`)