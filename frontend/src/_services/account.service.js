// TODO get users data after login from database
// TODO store users data in a useContext hook after successful login

import { axiosHelper } from '../_helpers';

const config = "http://localhost:8888/index.php?_url=";
const baseUrl = `${config}userservice`;

const login = (data) => {
  return axiosHelper.post(`${baseUrl}/login`, data)
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    })
}

const logout = () => {
  localStorage.clear();
}

const register = (data) => {
  return axiosHelper.post(`${baseUrl}/register`, data)
}

export const accountService = {
  login,
  logout,
  register,
};