import api from 'utils/api';
import { GET_PROJECTS } from './constants';

export const addProject = (body) => async (dispatch) => {
  try {
    const { data } = await api.post('/projects/add', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const getAllProjects = () => async (dispatch) => {
  try {
    const { data } = await api.get('/projects/get');
    console.log('data', data);
    dispatch({
      type: GET_PROJECTS,
      payload: data
    });
  } catch (error) {
    console.log('error');
    throw error;
  }
};

export const deleteProjects = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/projects/delete?id=${id}`);
    dispatch(getAllProjects());
  } catch (error) {
    console.log('error');
  }
};

export const editProject = (id, body) => async (dispatch) => {
  try {
    const { data } = await api.put(`/projects/edit?id=${id}`, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch(getAllProjects());
  } catch (error) {
    console.log('error');
  }
};
