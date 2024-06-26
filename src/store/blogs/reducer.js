import { GET_BLOGS } from './constants';

const initialState = {
  blogsList: null
};

export default function blogs(state = initialState, { type, payload }) {
  switch (type) {
    case GET_BLOGS:
      return {
        ...state,
        blogsList: payload.arrList
      };

    default:
      return state;
  }
}
