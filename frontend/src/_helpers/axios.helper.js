import axios from "axios";

const post = (url, body) => {
   return axios({
      method: "post",
      url: url,
      data: body,
      headers: { 
         "Content-Type": "multipart/form-data"
      },
   })
}

export const axiosHelper = {
   // get,
   post,
   // put,
   // delete: _delete
}