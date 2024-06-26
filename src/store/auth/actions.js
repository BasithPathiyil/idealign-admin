import api from 'utils/api';
import { GET_ALL_TRANSACTION, LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT_SUCCESS } from './constants';
import { handleToken } from 'utils/jwt';

export const login = (values) => async (dispatch) => {
  const { data } = await api.post('/user/login', values);
  console.log('Datat', data);

  if (data.status) {
    console.log('here');
    handleToken(data?.token);
    localStorage.setItem('user', JSON.stringify(data));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        loginSuccess: true,
        userDetails: data
      }
    });
  }
  console.log('working');
  console.log(data);
  return data;
};
export const logout = () => async (dispatch) => {
  handleToken(null);
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: false
  });
};

export const createNewUser = (values) => async () => {
  try {
    const { data } = await api.post('/create_user', values);
    return data?.statusCode;
  } catch (error) {
    console.log(error);
    return error.response.data.statusCode;
  }
};

export const getAllTransaction = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('/all_transaction', body);
    console.log(data);
    dispatch({
      type: GET_ALL_TRANSACTION,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
