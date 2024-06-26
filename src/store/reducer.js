import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import auth from './auth/reducer';
import users from './users/reducer';
import projects from './project/reducer';
import blogs from './blogs/reducer';
import newsevents from './newsevents/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth,
  users,
  projects,
  blogs,
  newsevents
});

export default reducer;
