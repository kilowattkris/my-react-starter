import * as types from '../actions/actionTypes';

export function setLocalization(lang) {
  return { type: types.SET_LOCALIZATION, lang };
}
