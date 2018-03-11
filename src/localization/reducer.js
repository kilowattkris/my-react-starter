import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';
import en from './en';
import fr from './fr';

export default function localizationReducer(state = en, action) {
  switch (action.type){
    case types.SET_LOCALIZATION: {
      if(action.lang === 'French'){
        return fr;
      }
      else{
        return en;
      }
    }
    default: {
      return state;
    }
  }
}
