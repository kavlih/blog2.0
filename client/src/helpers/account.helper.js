import { axiosService } from '../services';

const login = (data) => {
  return axiosService.post('/account/login', data)
}

const logout = () => {
  localStorage.clear();
}

const register = (data) => {
  return axiosService.post('/account/register', data)
}

const updateUsername = (data) => {
  return axiosService.post('/account/updateUsername', data)
}

const updateIdenticon = (userId) => {
  return axiosService.put(`/account/updateIdenticon/${userId}`)
}

export const accountHelper = {
  login,
  register,
  logout,
  updateUsername,
  updateIdenticon
}