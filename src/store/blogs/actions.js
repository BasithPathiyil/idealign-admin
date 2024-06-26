import api from 'utils/api';
import { GET_BLOGS } from './constants';

export const addBlog = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('/blogs/add', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const getAllBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.get('/blogs/get');
    console.log('data', data);
    dispatch({
      type: GET_BLOGS,
      payload: data
    });
  } catch (error) {
    console.log('error');
    throw error;
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/blogs/delete?id=${id}`);
    dispatch(getAllBlogs());
  } catch (error) {
    console.log('error');
  }
};

export const editBlog = (id, body) => async (dispatch) => {
  try {
    const { data } = await api.put(`/blogs/edit?id=${id}`, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch(getAllBlogs());
  } catch (error) {
    console.log('error');
  }
};
