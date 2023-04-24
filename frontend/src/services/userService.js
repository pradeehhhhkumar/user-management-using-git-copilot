import axiosInstance from "../config/api";

export const userLogin = (data) => {
  const url = "/user/login";
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const addUser = (data) => {
  const url = "/user/register";
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

// getAllUsers
export const getAllUsers = () => {
  const url = "/admin";
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const me = (id) => {
  const url = `/user/${id}`;
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const updateUser = (id, data) => {
  const url = `/user/${id}`;
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, data, config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export const deleteUser = (id) => {
  const url = `/admin/${id}`;
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}