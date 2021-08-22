import axios from "axios";

const rootApi = axios.create({
  baseURL: "http://localhost:5000/",
});

export default rootApi;
