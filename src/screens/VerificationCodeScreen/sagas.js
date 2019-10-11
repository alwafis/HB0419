import {
  put, takeLatest,
} from 'redux-saga/effects';
import {
  SENDING_MESSAGE,
  SENDING_VERIFICATION
} from './constants';
import {
  sendMessageSuccess,
  sendMessageFailed,
  sendVerificationSuccess,
  sendVerificationFailed
} from './action';
import { config } from '../../config/global';

function* sendMessage(params) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
  
    const response = yield fetch(config.api_url.account+config.api_uri.send_message,{
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phone_number : params.param,
        activity : "login"
      })
    })
    .then(response => response.json());

  console.log(response);
    if (response.status === 'Success') {
      yield put(sendMessageSuccess(response.status));
    } else {
      yield put(sendMessageFailed(response));
    }
  } catch (error) {
    console.log(error)
    yield put(sendMessageFailed(error.message));
  }
}
function* verifyCode(params) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
  
    const response = yield fetch(config.api_url.account+config.api_uri.verify_otp,{
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phone_number : params.params.phone,
        otp_number : params.params.verification_code
      })
    })
    .then(response => response.json());

    if (response.status.indexOf('Success')>=0) {
      yield put(sendVerificationSuccess(response));
    } else {
      yield put(sendVerificationFailed(response));
    }
  } catch (error) {
    console.log(error)
    yield put(sendVerificationFailed(error.message));
  }
}
const sendSMSWatcher = [
    takeLatest(SENDING_MESSAGE, sendMessage),
];
const verifyCodeWatcher = [
  takeLatest(SENDING_VERIFICATION, verifyCode),
];

export {sendSMSWatcher,verifyCodeWatcher};