
import {
  SENDING_MESSAGE,
  SENDING_MESSAGE_SUCCESS,
  SENDING_MESSAGE_FAILED,
  CLEAR_VERIFICATION_RESULT,
  SENDING_VERIFICATION,
  SENDING_VERIFICATION_SUCCESS,
  SENDING_VERIFICATION_FAILED

} from './constants';


const initialState = {
  send_message_fetch: false,
  param: null,
  send_message_res: null,
  send_message_err: null,
  send_verification: false,
  verification_code: null,
  send_verification_res: null,
  send_verification_err: null,
};
/* eslint-disable import/prefer-default-export */
export function ReducerSendMessage(state = initialState, action) {

  switch (action.type) {
      case SENDING_MESSAGE:
        return {
          ...state,
          send_message_fetch: true,
          param: action.param,
          action: action.type,
        };
      case SENDING_MESSAGE_SUCCESS:
        return {
          ...state,
          send_message_fetch: false,
          send_message_res: action.send_message_res,
          action: action.type,
        };
      case SENDING_MESSAGE_FAILED:
        return {
          ...state,
          send_message_fetch: false,
          send_message_err: action.send_message_err,
          action: action.type,
        };
    default:
      return state;
  }
}

export function ReducerVerifyCode(state = initialState, action) {

  switch (action.type) {
      case CLEAR_VERIFICATION_RESULT:
        return {
          ...state,
          verification_code: null,
          send_verification_res: null,
          send_verification_err: null,
        };
      case SENDING_VERIFICATION:
        return {
          ...state,
          send_verification: true,
          verification_code: action.params,
          action: action.type,
        };
      case SENDING_VERIFICATION_SUCCESS:
        console.log('success');
        console.log(action.send_verification_res);
        return {
          ...state,
          send_verification: false,
          send_verification_res: action.send_verification_res,
          action: action.type,
        };
      case SENDING_VERIFICATION_FAILED:
        console.log('failed');
        console.log(action.send_verification_err);
        return {
          ...state,
          send_verification: false,
          send_verification_err: action.send_verification_err,
          action: action.type,
        };
    default:
      return state;
  }
}
