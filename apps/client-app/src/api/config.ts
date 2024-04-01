import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://seupc-core-api.azurewebsites.net/',
  headers: { Accept: 'application/json' },
});
