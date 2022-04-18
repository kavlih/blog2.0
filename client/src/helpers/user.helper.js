import { localService } from '../services';

const follow = (receiverId, data) => {
  return localService.post(`/user/follow/${receiverId}`, data)
}

const followers = (userId) => {
  return localService.get(`/user/followers/${userId}`)
}

const following = (userId) => {
  return localService.get(`/user/following/${userId}`)
}

const get = (username) => {
  return localService.get(`/user/get/${username}`)
}

const isFollow = (receiverId, data) => {
  return localService.post(`/user/isFollow/${receiverId}`, data)
}

const search = (search) => {
  return localService.get(`/user/search/${search}`)
}

export const userHelper = {
  follow,
  followers,
  following,
  get,
  isFollow,
  search
}