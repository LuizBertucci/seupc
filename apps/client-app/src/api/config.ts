import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://seupc-core-api.azurewebsites.net/',
  baseURL: 'http://localhost:8080',
  headers: { Accept: 'application/json' },
});
