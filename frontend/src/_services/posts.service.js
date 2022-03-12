import { axiosHelper } from '../_helpers';

const createPost = (data) => {
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

export const postsService = {
  createPost,
  getPosts
};