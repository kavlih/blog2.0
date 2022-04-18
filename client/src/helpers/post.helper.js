import { localService, googleService } from '../services';

const YOUTUBE_API_KEY = 'AIzaSyCIK4g7_Lc4RTV2Z5l9COtnbmMQwKT5HhI';

const createPost = (userId, data) => {
  return localService.post(`/post/create/${userId}`, data)
}

const deletePost = (postId) => {
  return localService.delete(`/post/delete/${postId}`)
}

const getPosts = (userId) => {
  return localService.get(`/post/getAllFeed/${userId}`)
}

const getUserLikes = (username) => {
  return localService.get(`/post/getAllLiked/${username}`)
}

const getUserPosts = (username) => {
  return localService.get(`/post/getAllUser/${username}`)
}

const getYtData = async (videoId) => {
  let res = [];

  try {
    res['snippets'] = await googleService.get(`/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`);
    res['details'] =  await googleService.get(`/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`);
  }
  catch(error) {
    console.log(error);
  }

  return res;
}

const toggleLike = (postId, data) => {
  return localService.post(`/post/like/${postId}`, data)
}

export const postHelper = {
  createPost,
  deletePost,
  getPosts,
  getUserLikes,
  getUserPosts,
  getYtData,
  toggleLike
};