import { axiosHelper } from '../_helpers';

const create = (user_id, data) => {
  return axiosHelper.post(`/posts/create/${user_id}`, data)
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
  create,
  getPosts,
  getLikes,
  toggleLike
};