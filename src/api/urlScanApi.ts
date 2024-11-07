import axios from 'axios';

export const urlScanApi = axios.create({
  baseURL: 'http://localhost:8000',
});
