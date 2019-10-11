import { combineReducers } from "redux";
import { ReducerForceUpdate } from '../screens/ForceUpdateScreen/reducer';
import { ReducerSendMessage, ReducerVerifyCode } from '../screens/VerificationCodeScreen/reducer';

export default combineReducers({
  force_update: ReducerForceUpdate,
  send_sms: ReducerSendMessage,
  verify_code: ReducerVerifyCode
});
