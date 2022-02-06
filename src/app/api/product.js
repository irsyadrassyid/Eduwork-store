import axios from "axios";
import { config } from "../../config";

export const getProducts = async (params) => {
  return axios.get(`${config.api_host}/api/products`, {params});
};
