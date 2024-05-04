import { Tags } from '@/types/parts';

import { api } from './config';

interface IGetTagsResponse {
  success: boolean;
  message: string;
  responseObject: Tags[] | string;
  statusCode: number;
}

interface IAddTagsParams {
  name: string;
  category: 'Games' | 'Programs' | 'Courses';
}

export interface IEditTagsParams {
  name: string;
}

export interface IAddPartsTagsParams {
  tagId: string;
  partId: string
}

export const getTags = async () => api.get<IGetTagsResponse>('/tags');

export const addTags = async (params: IAddTagsParams) => api.post<IGetTagsResponse>('/tags', params);

export const addPartsTags = async (params: IAddPartsTagsParams[]) => api.post<IGetTagsResponse>(`/tags/add-parts`, params);

export const editTags = async (params: IEditTagsParams | undefined, id: string) =>
  api.put<IGetTagsResponse>(`/tags/${id}`, params);

export const deleteTags = async (id: string) => api.delete<IGetTagsResponse>(`/tags/${id}`);
