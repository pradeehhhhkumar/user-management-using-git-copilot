import axiosInstance from "../config/api";

export const adminLogin = (data) => {
    const url = '/admin/login';
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };