import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response >= 400 && error.response < 500;

  if (!expectedError) {
    toast.error(error.response.data);
  }

  return Promise.reject(error);
});

export const setJwt = (jwt) =>
  (axios.defaults.headers.common["x-auth-token"] = jwt);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
