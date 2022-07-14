import { BASE_URL } from "../shared/baseurl";

const instance = axios.create({
    url: BASE_URL,
    timeout: 2000,
  });