import { axiosHelper } from '../_helpers';

const getPosts = (data) => {
  return axiosHelper.post('feed', data)
    .then((res) => {
      // console.log(res);
      return res;
    })
}

export const feedService = {
  getPosts
};