// TODO get users data after login from database
// TODO store users data in a useContext hook after successful login

import { axiosHelper } from '../_helpers';

const config = "http://localhost:8888/index.php?_url=";
const baseUrl = `${config}userservice`;

const login = (data) => {
  // returns promise
  return axiosHelper.post(`${baseUrl}/login`, data)
    .then((res) => {
      // store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    })
}

const register = (data) => {
  return axiosHelper.post(`${baseUrl}/register`, data)
}

export const accountService = {
  login,
  register,
};