import { axiosService } from '../services';

const login = (data) => {
  return axiosService.post('/account/login', data)
}

const logout = () => {
  localStorage.clear();
}

const resetIdenticon = (userId) => {
  return axiosService.put(`/account/resetIdenticon/${userId}`)
}

const signUp = (data) => {
  return axiosService.post('/account/signUp', data)
}

const updateUsername = (userId, data) => {
  return axiosService.post(`/account/updateUsername/${userId}`, data)
}

const updateEmail = (userId, data) => {
  return axiosService.post(`/account/updateEmail/${userId}`, data)
}

const updatePassword = (userId, data) => {
  return axiosService.post(`/account/updatePassword/${userId}`, data)
}

const updateIdenticon = (userId) => {
  return axiosService.put(`/account/updateIdenticon/${userId}`)
}

export const accountHelper = {
  login,
  logout,
  resetIdenticon,
  signUp,
  updateUsername,
  updateEmail,
  updatePassword,
  updateIdenticon,
}