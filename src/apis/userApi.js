import rootApi from './root';

const login = (email, password) =>
  rootApi.post('/users/login', {
    email,
    password,
  });
const register = (email, password) =>
  rootApi.post('/users/register', {
    email,
    password,
  });
const getOtpThroughEmail = (token) =>
  rootApi.get('/users/otp', {
    headers: `Bearer ${token}`,
  });

const userApi = {
  login,
  register,
  getOtpThroughEmail,
};

export default userApi;
