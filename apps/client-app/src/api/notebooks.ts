import { api } from './config';
import { ORWName } from './otherRecommendationWebsite';

export interface IAddPartsNotebooksParams {
  notebookId: string;
  partId: string;
}

export interface INotebook {
  id: string;
  name: string;
  brand: string;
  color?: string;
  screen_size?: string;
  screen_resolution?: string;
  battery?: string;
  has_numeric_keypad?: boolean;
  operating_system?: string;
  manufacturer_id?: string;
  weight?: string;
  partsIds?: string[];
  otherRecommendationWebsite: ORWName;
  created_at: string;
  updated_at: string;
}

export interface IGetNotebooksResponse {
  success: boolean;
  message: string;
  responseObject: INotebook[];
}

export interface IAddNotebookResponse {
  success: boolean;
  message: string;
  responseObject: string;
  statusCode: number;
}

export const getNotebooks = async () => api.get<IGetNotebooksResponse>('/notebooks');

export const addNotebooks = async (params: INotebook) => api.post<IAddNotebookResponse>('/notebooks', params);

export const editNotebooks = async (params: INotebook | undefined, id: string) =>
  api.put<IGetNotebooksResponse>(`/notebooks/${id}`, params);

export const deleteNotebooks = async (id: string) => api.delete<IGetNotebooksResponse>(`/notebooks/${id}`);

export const addPartNotebooks = async (params: IAddPartsNotebooksParams[]) =>
  api.post<IGetNotebooksResponse>(`/notebooks/add-parts`, params);
