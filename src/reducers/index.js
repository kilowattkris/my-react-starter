import {combineReducers} from 'redux';
import ajax from '../api/reducer';
import localization from '../localization/reducer';
import initialState from './initialState';
import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers({
  ajax,
  localization,
  routing: routerReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = { ...initialState };
  }

  return appReducer(state, action);
};

export default rootReducer;
