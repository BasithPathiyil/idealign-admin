const { default: api } = require('./api');

const handleToken = (accessToken) => {
  console.log('working handletoken');
  if (accessToken) {
    console.log('working handletoken if');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticate', 'authenticated');
    api.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    console.log('working handletoken else');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAuthenticate');
    localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
  }
};

export { handleToken };
