import { localService } from '../services';

const deleteUser = (userId, data) => {
  return localService.post(`/account/delete/${userId}`, data)
}

const login = (data) => {
  return localService.post('/account/login', data)
}

const resetIdenticon = (userId) => {
  return localService.put(`/account/resetIdenticon/${userId}`)
}

const signUp = (data) => {
  return localService.post('/account/signUp', data)
}

const updateUsername = (userId, data) => {
  return localService.post(`/account/updateUsername/${userId}`, data)
}

const updateEmail = (userId, data) => {
  return localService.post(`/account/updateEmail/${userId}`, data)
}

const updatePassword = (userId, data) => {
  return localService.post(`/account/updatePassword/${userId}`, data)
}

const updateIdenticon = (userId) => {
  return localService.put(`/account/updateIdenticon/${userId}`)
}

export const accountHelper = {
  deleteUser,
  login,
  resetIdenticon,
  signUp,
  updateUsername,
  updateEmail,
  updatePassword,
  updateIdenticon,
}