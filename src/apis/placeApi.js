import rootApi from './root';

const fetchAll = (token, { skip, limit }) => {
	return rootApi.get('/places', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			skip,
			limit,
		},
	});
};

const fetchTop9Favorites = (token) =>
	rootApi.get('/places', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			skip: 0,
			limit: 9,
			isYourFavorite: true,
		},
	});

const fetchRandom = (token) =>
	rootApi.get('/places/random', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

const fetchById = (token, placeId) =>
	rootApi.get(`/places${placeId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

const fetchImageById = (token, placeId) =>
	rootApi.get(`/places/${placeId}/image`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		responseType: 'blob',
	});

const fetchQuantity = (token) =>
	rootApi.get('/places/quantity', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

const createNewPlace = (token, place) => {
	// console.log("-------");
	// console.log(place);
	// console.log("-------");
	return rootApi.post(
		'/places',
		{ ...place },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

const uploadImage = (token, placeId, imageFile) => {
	const bodyFormData = new FormData();
	bodyFormData.append('image', imageFile);
	return rootApi.post(`/places/${placeId}/image`, bodyFormData, {
		headers: {
			Authorization: `Bearer ${token}`,
			// "Content-Type": `multipart/form-data; boundary=${body}`,
		},
	});
};

const placeApi = {
	fetchAll,
	fetchById,
	fetchTop9Favorites,
	fetchRandom,
	fetchImageById,
	fetchQuantity,
	createNewPlace,
	uploadImage,
};

export default placeApi;
