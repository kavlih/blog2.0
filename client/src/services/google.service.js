import axios from "axios";

const CONFIG = 'https://www.googleapis.com';

const get = (url) => {
  return axios.get(CONFIG + url);
}

export const googleService = {
  get
}