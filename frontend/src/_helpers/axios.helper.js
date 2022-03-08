import axios from "axios";

const CONFIG = "http://localhost:8888/index.php?_url=";

const get = (url) => {
  let baseURL = CONFIG + url;

  return axios({
    method: "get",
    url: baseURL
  })
}

const post = (url, body) => {
  let baseURL = CONFIG + url;

  return axios({
    method: "post",
    url: baseURL,
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