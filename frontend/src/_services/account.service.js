import { axiosHelper } from '../_helpers';

const login = (data) => {
  return axiosHelper.post('userservice/login', data)
    .then((res) => {
      localStorage.setItem("jwt", JSON.stringify(res.data.jwt));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // console.log(JSON.stringify(res.data));
      return res;
    })
}

const logout = () => {
  localStorage.clear();
}

const register = (data) => {
  return axiosHelper.post('userservice/register', data)
}

export const accountService = {
  login,
  logout,
  register,
};