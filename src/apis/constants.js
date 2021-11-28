// Constants.js
const prod = {
  url: {
    API_URL: 'https://khoatrn-foodplace-v1.herokuapp.com/',
    IMAGE_SERVER_URL: 'http://localhost:5004',
  },
};
const dev = {
  url: {
    API_URL: 'http://localhost:5000',
    IMAGE_SERVER_URL: 'http://localhost:5004',
    // API_URL: `https://khoatrn-foodplace-v1.herokuapp.com/`,
  },
};
// eslint-disable-next-line no-undef
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
