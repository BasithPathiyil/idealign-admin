import { GET_PROJECTS } from './constants';

const initialState = {
  projectsList: null
};

export default function projects(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projectsList: payload.arrList
      };

    default:
      return state;
  }
}
