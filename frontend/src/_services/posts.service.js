import { axiosHelper } from '../_helpers';

const createPost = (user_id, data) => {
  return axiosHelper.post(`/posts/create/${user_id}`, data)
}

const deletePost = (post_id) => {
  return axiosHelper.delete(`/posts/delete/${post_id}`)
}

const getPosts = (user_id) => {
  return axiosHelper.get(`/posts/feed/${user_id}`)
}

const getLikes = (post_id) => {
  return axiosHelper.get(`/posts/likes/${post_id}`)
}

const toggleLike = (post_id, data) => {
  return axiosHelper.post(`/posts/like/${post_id}`, data)
}

export const postsService = {
  createPost,
  deletePost,
  getPosts,
  getLikes,
  toggleLike
};