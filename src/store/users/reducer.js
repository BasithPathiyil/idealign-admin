import { CHANGE_USERS_LIST_PAGE, GET_USERS_LIST } from './constants';

const initialState = {
  usersList: [],
  usersCount: null,
  page: 1
};

export default function users(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS_LIST:
      return {
        ...state,
        usersList: payload?.arrList,
        usersCount: payload?.count
      };
    case CHANGE_USERS_LIST_PAGE:
      return {
        ...state,
        page: payload
      };
    default:
      return state;
  }
}
