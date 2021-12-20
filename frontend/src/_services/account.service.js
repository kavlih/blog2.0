import axios from "axios";

const baseUrl = "http://localhost:8888/index.php?_url=";

export const accountService = {
   register
};

function register(data) {
   return axios({
      method: "post",
      url: baseUrl + "userservice/register",
      data: data,
      headers: { 
         "Content-Type": "multipart/form-data"
      },
  })
}