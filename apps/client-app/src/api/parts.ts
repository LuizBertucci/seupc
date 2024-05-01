import { Parts } from '@/types/parts';

import { api } from './config';

interface IGetPartsResponse {
  success: boolean;
  message: string;
  responseObject: Parts[] | string;
  statusCode: number;
}

interface IAddPartsParams {
  name: string;
  partType: string;
  point: number;
}

export interface IEditPartsParams {
  name: string;
  point: number;
}

export const getParts = async () => api.get<IGetPartsResponse>('/parts');

export const addParts = async (params: IAddPartsParams) => api.post<IGetPartsResponse>('/parts', params);

export const editParts = async (params: IEditPartsParams | undefined, id: string) =>
  api.put<IGetPartsResponse>(`/parts/${id}`, params);

export const deleteParts = async (id: string) => api.delete<IGetPartsResponse>(`/parts/${id}`);
