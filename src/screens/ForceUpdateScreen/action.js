import {
    GET_APP_VERSION_FETCH,
    GET_APP_VERSION_SUCCESS,
    GET_APP_VERSION_FAILED
  } from './constants';

  // app update check
  export const versionFetch = () => ({ type: GET_APP_VERSION_FETCH });
  export const versionCheckSuccess = value => ({ type: GET_APP_VERSION_SUCCESS, version_res: value });
  export const versionCheckFailed = value => ({ type: GET_APP_VERSION_FAILED, version_err: value });
  