import axios from "axios";

const baseUrl = "http://localhost:8888/index.php?_url=";

export const axiosHelper = {
   // get,
   post,
   // put,
   // delete: _delete
}

function post(target, body) {
   return axios({
      method: "post",
      url: baseUrl + target,
      data: body,
      headers: { 
         "Content-Type": "multipart/form-data"
      },
   })
}