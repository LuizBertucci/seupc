import { api } from './config';

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
  created_at: string;
  updated_at: string;
}

export interface IGetNotebooksResponse {
  success: boolean;
  message: string;
  responseObject: INotebook[];
}

export const getNotebooks = async () => api.get<IGetNotebooksResponse>('/notebooks');
