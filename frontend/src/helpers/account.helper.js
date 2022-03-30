import { axiosService } from '../services';

const login = (data) => {
  return axiosService.post('/account/login', data)
}

const logout = () => {
  localStorage.clear();
}

const register = (data) => {
  return axiosService.post('/account/register', data)
}

export const accountHelper = {
  login,
  register,
  logout
}