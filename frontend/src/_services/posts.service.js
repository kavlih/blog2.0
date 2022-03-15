import { axiosHelper } from '../_helpers';

const create = (data) => {
  return axiosHelper.post('posts/create', data)
    .then((res) => {
      // console.log(res);
      return res;
    })
}

const getPosts = (data) => {
  return axiosHelper.post('posts', data)
    .then((res) => {
      // console.log(res);
      return res;
    })
}

const getLikes = (post_id) => {
  return axiosHelper.get(`posts/likes/${post_id}`)
    .then((res) => {
      // console.log(res);
      return res;
    })
}

const toggleLike = (post_id, data) => {
  return axiosHelper.post(`posts/like/${post_id}`, data)
    .then((res) => {
      // console.log(res);
      return res;
    })
}

export const postsService = {
  create,
  getPosts,
  getLikes,
  toggleLike
};