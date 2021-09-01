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

const fetchNumberOfPlaces = (token, categoryId) =>
  rootApi.get(`/categories/${categoryId}/countPlaces`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const categoryApi = {
  fetchById,
  fetchAll,
  fetchNumberOfPlaces,
};

export default categoryApi;
