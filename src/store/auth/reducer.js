import { GET_ALL_TRANSACTION, LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT_SUCCESS, SET_ISLOGGEDIN_TRUE } from './constants';

const initialState = {
  isLoggedIn: false,
  user: {},
  transactionList: [],
  transactionsCount: null
};
export default function auth(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: payload.loginSuccess,
        user: payload.userDetails
      };
    case LOGIN_UNSUCCESS:
      return {
        ...state,
        isLoggedIn: payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    case SET_ISLOGGEDIN_TRUE:
      return {
        ...state,
        isLoggedIn: true
      };
    case GET_ALL_TRANSACTION:
      return {
        ...state,
        transactionList: payload?.arrList,
        transactionsCount: payload?.count
      };
    default:
      return state;
  }
}
