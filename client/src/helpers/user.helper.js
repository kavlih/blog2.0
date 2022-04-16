import { axiosService } from '../services';

const follow = (receiverId, data) => {
  return axiosService.post(`/user/follow/${receiverId}`, data)
}

const followers = (userId) => {
  return axiosService.get(`/user/followers/${userId}`)
}

const following = (userId) => {
  return axiosService.get(`/user/following/${userId}`)
}

const get = (username) => {
  return axiosService.get(`/user/get/${username}`)
}

const isFollow = (receiverId, data) => {
  return axiosService.post(`/user/isFollow/${receiverId}`, data)
}


export const userHelper = {
  follow,
  followers,
  following,
  get,
  isFollow
}