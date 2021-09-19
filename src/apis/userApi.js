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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const verifyEmail = (token, otp) =>
  rootApi.post(
    '/users/confirmation',
    {
      otp,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

const userApi = {
  login,
  register,
  getOtpThroughEmail,
  verifyEmail,
};

export default userApi;
