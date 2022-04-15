import { axiosService } from '../services';

const getFollowers = (userId) => {
  return axiosService.get(`/user/getFollowers/${userId}`)
}

const getFollowing = (userId) => {
  return axiosService.get(`/user/getFollowing/${userId}`)
}

const toggleFollow = (receiverId, data) => {
  return axiosService.post(`/user/follow/${receiverId}`, data)
}

export const userHelper = {
  getFollowers,
  getFollowing,
  toggleFollow
}