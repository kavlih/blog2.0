import { axiosHelper } from '../_helpers';

const login = (data) => {
  return axiosHelper.post('account/login', data)
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res;
    })
}

const logout = () => {
  localStorage.clear();
}

const register = (data) => {
  return axiosHelper.post('account/register', data)
}

export const accountService = {
  login,
  logout,
  register,
};