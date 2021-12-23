import { axiosHelper } from '../_helpers';

const config = "http://localhost:8888/index.php?_url=";
const baseUrl = `${config}userservice`;

const login = (data) => {
   return axiosHelper.post(`${baseUrl}/login`, data)
}

const register = (data) => {
   return axiosHelper.post(`${baseUrl}/register`, data)
}

export const accountService = {
   login,
   register
};