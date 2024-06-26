import { GET_NEWS_EVENTS } from './constants';

const initialState = {
  newsEventsList: null
};

export default function newsevents(state = initialState, { type, payload }) {
  switch (type) {
    case GET_NEWS_EVENTS:
      return {
        ...state,
        newsEventsList: payload.arrList
      };

    default:
      return state;
  }
}
