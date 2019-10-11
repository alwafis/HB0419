
import {
    GET_APP_VERSION_FETCH,
    GET_APP_VERSION_SUCCESS,
    GET_APP_VERSION_FAILED
  } from './constants';


  const initialState = {
    version_fetch: false,
    version_res: null,
    version_err: null,
  };
  /* eslint-disable import/prefer-default-export */
  export function ReducerForceUpdate(state = initialState, action) {
  
    switch (action.type) {
        case GET_APP_VERSION_FETCH:
          return {
            ...state,
            version_fetch: true,
            action: action.type,
          };
        case GET_APP_VERSION_SUCCESS:
          return {
            ...state,
            version_fetch: false,
            version_res: action.version_res,
            action: action.type,
          };
        case GET_APP_VERSION_FAILED:
          return {
            ...state,
            version_fetch: false,
            version_err: action.version_err,
            action: action.type,
          };
      default:
        return state;
    }
  }
  