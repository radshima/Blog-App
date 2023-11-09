import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import blogPostReducer from './blogPostReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  post: blogPostReducer,
  user: userReducer,
  users: usersReducer,
});
