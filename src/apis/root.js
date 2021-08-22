import axios from "axios";
import { config } from "./constants";

const rootApi = axios.create({
  baseURL: config.url,
});

export default rootApi;
