import axios from "axios";

const CONFIG = "http://localhost:8888/index.php?_url=";

const get = (url) => {
  return axios({
    method: "get",
    url: CONFIG + url
  })
}

const post = (url, body) => {
  return axios({
    method: "post",
    url: CONFIG + url,
    data: body,
    headers: { 
      "Content-Type": "multipart/form-data"
    },
  })
}

export const axiosHelper = {
  get,
  post,
  // put,
  // delete: _delete
}