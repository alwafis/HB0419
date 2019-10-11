import {
  put, takeLatest,
} from 'redux-saga/effects';
import {
  GET_APP_VERSION_FETCH,
} from './constants';
import {
  versionCheckSuccess,
  versionCheckFailed
} from './action';
import { config } from '../../config/global';

function* fetchAppVersion() {
  try {
    const headers = {
      'app_name': 'sampleapp',
      'platform': 'android'
    };
 
    const response = yield fetch(config.api_url.app+config.api_uri.force_update,{
      headers: headers
    })
    .then(response => response.json());    
    if (response.status === 'Success') {
      yield put(versionCheckSuccess(response.data));
    } else {
      yield put(versionCheckFailed(response));
    }
  } catch (error) {
    yield put(versionCheckFailed(error.message));
  }
}
export const forceUpdateWatcher = [
    takeLatest(GET_APP_VERSION_FETCH, fetchAppVersion),
];