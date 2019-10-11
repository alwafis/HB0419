
import {
    GET_APP_VERSION_FETCH,
    GET_APP_VERSION_SUCCESS,
    GET_APP_VERSION_FAILED
  } from './constants';


  const initialState = {
    templat_only: false,
  };
  /* eslint-disable import/prefer-default-export */
  export function TemplateOnly(state = initialState, action) {
  
    switch (action.type) {
        case TEMPLATE_ONLY:
          return {
            ...state,
            template_only: true,
          };
      default:
        return state;
    }
  }
  