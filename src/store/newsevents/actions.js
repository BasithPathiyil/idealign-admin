import api from 'utils/api';
import { GET_NEWS_EVENTS } from './constants';

export const addNewsEvents = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('/newsevents/add', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const getAllNewsEvents = () => async (dispatch) => {
  try {
    const { data } = await api.get('/newsevents/get');
    console.log('data', data);
    dispatch({
      type: GET_NEWS_EVENTS,
      payload: data
    });
  } catch (error) {
    console.log('error');
    throw error;
  }
};

export const deleteNewsEvents = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/newsevents/delete?id=${id}`);
    dispatch(getAllNewsEvents());
  } catch (error) {
    console.log('error');
  }
};
