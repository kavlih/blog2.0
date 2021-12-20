import { axiosHelper } from '../_helpers';

export const accountService = {
   login,
   register
};

function login(data) {
   return axiosHelper.post(`userservice/login`, data)
}

function register(data) {
   return axiosHelper.post(`userservice/register`, data)
}
