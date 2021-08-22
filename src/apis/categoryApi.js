import rootApi from "./root";

const fetchById = (token, categoryId) =>
  rootApi.get(`/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const fetchAll = (token) =>
  rootApi.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
const categoryApi = {
  fetchById,
  fetchAll,
};

export default categoryApi;
