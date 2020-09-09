import axios from 'axios';
import { appConfig } from 'config/appConfig';

export const client = axios.create({
  baseURL: appConfig.API.BASE_URL,
});
