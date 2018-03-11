import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

function actionTypeEndsInSuccess(type){
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxReducer(state = initialState.ajax, action) {
  // console.log(action.error);
  // console.log(state.callsInProgress);
  if(action.type == types.BEGIN_AJAX_CALL){
    let newState = {
      callsInProgress: state.callsInProgress + 1,
      error: ""
    };
    return newState;
  }
  else if(actionTypeEndsInSuccess(action.type)){
    let newState = {
      callsInProgress: state.callsInProgress - 1,
      error: ""
    };
    return newState;
  }
  else if(action.type == types.AJAX_CALL_ERROR){
    let newState = {
      callsInProgress: state.callsInProgress - 1,
      error: action.error
    };
    return newState;
  }
  return state;
}
