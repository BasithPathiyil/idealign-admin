import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//
import rootReducer from './reducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  // if the token changes set the value in localStorage and axios headers
  // if (previousState.adminAuth.token !== currentState.adminAuth.token) {
  //   // if (currentState.adminAuth.token) {
  //   const { token } = currentState.adminAuth;
  //   setAuthToken(token);
  // }
});

export default store;
