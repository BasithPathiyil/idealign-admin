import axios from 'axios';
import { useNavigate } from 'react-router';
import { LOGIN_UNSUCCESS } from 'store/auth/constants';
import store from 'store/store';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  // baseURL: 'http://54.157.240.144/api',
  baseURL:"/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('err in api', err);
    if (err.response.status === 401 && err.response.data === 'UNAUTHERIZED_CREDENTIALS') {
      store.dispatch({ type: LOGIN_UNSUCCESS, payload: false });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAuthenticate');
      localStorage.removeItem('user');
      const navigate = useNavigate();
      navigate('/login');
    }
    if (err.response.status === 401 && err.response.data === 'INVALID_TOKEN_PROVIDED') {
      store.dispatch({ type: LOGIN_UNSUCCESS, payload: false });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAuthenticate');
      localStorage.removeItem('user');
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(err);
  }
);
export default api;
