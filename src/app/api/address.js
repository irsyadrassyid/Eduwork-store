import axios from "axios";
import { config } from "../../config";

export async function getAddress(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${config.api_host}/api/address`, {
    params: {
      limit: params.limit,
      skip: params.page * params.limit - params.limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function createAddress(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(config.api_host + "/api/address", payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
