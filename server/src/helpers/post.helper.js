import { axiosService } from '../services';

const createPost = (user_id, data) => {
  return axiosService.post(`/post/create/${user_id}`, data)
}

const deletePost = (post_id) => {
  return axiosService.delete(`/post/delete/${post_id}`)
}

const getPosts = (user_id) => {
  return axiosService.get(`/post/getAllFeed/${user_id}`)
}

const getUserLikes = (user_id) => {
  return axiosService.get(`/post/getAllLiked/${user_id}`)
}

const getUserPosts = (user_id) => {
  return axiosService.get(`/post/getAllUser/${user_id}`)
}

const getPostLikes = (post_id) => {
  return axiosService.get(`/post/getLikes/${post_id}`)
}

const toggleLike = (post_id, data) => {
  return axiosService.post(`/post/like/${post_id}`, data)
}

export const postHelper = {
  createPost,
  deletePost,
  getPosts,
  getUserLikes,
  getUserPosts,
  getPostLikes,
  toggleLike
};