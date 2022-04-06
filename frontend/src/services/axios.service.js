import axios from "axios";

const CONFIG = "http://localhost:8888";

const get = (url) => {
  return axios.get(CONFIG + url)
}

const post = (url, body) => {
  return axios.post(CONFIG + url, body, {
    headers: { 
      "Content-Type": "multipart/form-data"
    },
  })
}

const put = (url) => {
  return axios.put(CONFIG + url)
}

const _delete = (url) => {
  return axios.delete(CONFIG + url)
}

export const axiosService = {
  get,
  post,
  put,
  delete: _delete
}