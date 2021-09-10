import rootApi from './root';

const login = (email, password) => rootApi.post('/users/login', {
  email,
  password,
});
const register = (email, password) => rootApi.post('/users/register', {
  email,
  password,
});
const verifyEmail = (token) => rootApi.get(`/users/confirmation/${token}`);

const userApi = {
  login,
  register,
  verifyEmail,
};

export default userApi;
