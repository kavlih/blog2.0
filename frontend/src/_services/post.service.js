import { axiosHelper } from '../_helpers';

const createPost = (user_id, data) => {
  return axiosHelper.post(`/post/create/${user_id}`, data)
}

const deletePost = (post_id) => {
  return axiosHelper.delete(`/post/delete/${post_id}`)
}

const getPosts = (user_id) => {
  return axiosHelper.get(`/post/getAllFeed/${user_id}`)
}

const getUserLikes = (user_id) => {
  return axiosHelper.get(`/post/getAllLiked/${user_id}`)
}

const getUserPosts = (user_id) => {
  return axiosHelper.get(`/post/getAllUser/${user_id}`)
}

const getPostLikes = (post_id) => {
  return axiosHelper.get(`/post/getLikes/${post_id}`)
}

const toggleLike = (post_id, data) => {
  return axiosHelper.post(`/post/like/${post_id}`, data)
}

export const postService = {
  createPost,
  deletePost,
  getPosts,
  getUserLikes,
  getUserPosts,
  getPostLikes,
  toggleLike
};