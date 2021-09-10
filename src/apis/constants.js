// Constants.js
const prod = {
	url: {
		API_URL: 'https://khoatrn-foodplace-v1.herokuapp.com/',
	},
};
const dev = {
	url: {
		API_URL: 'http://localhost:5000',
		// API_URL: `https://khoatrn-foodplace-v1.herokuapp.com/`,
	},
};
// eslint-disable-next-line no-undef
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
