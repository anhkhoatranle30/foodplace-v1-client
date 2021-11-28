import axios from 'axios';
import { config } from './constants';

const rootApi = axios.create({
  baseURL: config.url.API_URL,
});

export default rootApi;

export const imageRootApi = axios.create({
  baseURL: config.url.IMAGE_SERVER_URL,
});
