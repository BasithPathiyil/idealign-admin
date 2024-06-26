const { default: api } = require('./api');

const handleToken = (accessToken) => {
  console.log('working handletoken');
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticate', 'authenticated');
    api.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAuthenticate');
    localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
  }
};
const storedAccessToken = localStorage.getItem('accessToken');
if (storedAccessToken) {
  api.defaults.headers.common.Authorization = storedAccessToken;
}
export { handleToken };
