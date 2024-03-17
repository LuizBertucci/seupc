import { Parts } from "@/types/parts";
import { api } from "./config";

interface GetPartsResponse {
    success: boolean,
    message: string,
    responseObject: Parts[],
    statusCode: number
}

export const getParts =  async () => api.get<GetPartsResponse>("/parts")