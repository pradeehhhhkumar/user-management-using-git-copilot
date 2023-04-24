import axios from "axios";
import { toast } from "react-toastify";
const baseURL = "http://localhost:4000/api/";

const instance = axios.create({ baseURL });

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      toast.error("You are not authorized to perform this action");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
