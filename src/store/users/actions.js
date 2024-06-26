import api from 'utils/api';
import { GET_USERS_LIST } from './constants';

export const getUsersList = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('/get_user_list', body);
    dispatch({
      type: GET_USERS_LIST,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const approveUser = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('/approve_user', body);
    dispatch(getUsersList({ chrStatus: 'N' }));
  } catch (error) {
    console.log(error);
  }
};
