import { axiosService } from '../services';

const createPost = (userId, data) => {
  return axiosService.post(`/post/create/${userId}`, data)
}

const deletePost = (postId) => {
  return axiosService.delete(`/post/delete/${postId}`)
}

const getPosts = (userId) => {
  return axiosService.get(`/post/getAllFeed/${userId}`)
}

const getUserLikes = (username) => {
  return axiosService.get(`/post/getAllLiked/${username}`)
}

const getUserPosts = (username) => {
  return axiosService.get(`/post/getAllUser/${username}`)
}

const toggleLike = (postId, data) => {
  return axiosService.post(`/post/like/${postId}`, data)
}

export const postHelper = {
  createPost,
  deletePost,
  getPosts,
  getUserLikes,
  getUserPosts,
  toggleLike
};