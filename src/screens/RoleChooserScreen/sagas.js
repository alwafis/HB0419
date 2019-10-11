import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {
  TEMPLATE_ONLY,
} from './constants';
import {
  templateOnly
} from './action';
import { config } from '../../config/global';

function* templateOnly() {
  try {
 
    const response = yield fetch(config.api_url+config.api_uri.force_update,{
      headers: headers
    })
    .then(response => response.json());    
    if (response.status === 'Success') {
      yield put(templateOnly());
    }
  } catch (error) {
    yield put(templateOnly());
  }
}
export const forceUpdateWatcher = [
    takeLatest(TEMPLATE_ONLY, templateOnly),
];