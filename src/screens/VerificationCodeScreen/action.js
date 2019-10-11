import {
  SENDING_MESSAGE,
  SENDING_MESSAGE_SUCCESS,
  SENDING_MESSAGE_FAILED,
  SENDING_VERIFICATION,
  CLEAR_VERIFICATION_RESULT,
  SENDING_VERIFICATION_SUCCESS,
  SENDING_VERIFICATION_FAILED
} from './constants';

  // Sending OTP
  export const sendMessage = (value) => ({ type: SENDING_MESSAGE, param: value });
  export const sendMessageSuccess = value => ({ type: SENDING_MESSAGE_SUCCESS, send_message_res: value });
  export const sendMessageFailed = value => ({ type: SENDING_MESSAGE_FAILED, send_message_err: value });
  // Verify OTP
  export const sendVerification = (value) => ({ type: SENDING_VERIFICATION, params: value });
  export const clearData = () => ({ type: CLEAR_VERIFICATION_RESULT });
  export const sendVerificationSuccess = value => ({ type: SENDING_VERIFICATION_SUCCESS, send_verification_res: value });
  export const sendVerificationFailed = value => ({ type: SENDING_VERIFICATION_FAILED, send_verification_err: value });
  