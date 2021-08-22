import rootApi from "./root";

const login = (email, password) =>
  rootApi.post("/users/login", {
    email: email,
    password: password,
  });
const register = (email, password) =>
  rootApi.post("/users/register", {
    email,
    password,
  });

const userApi = {
  login,
  register,
};

export default userApi;
