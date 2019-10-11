/**
 * @author: syafiq.ninety@gmail.com
*/

import { all } from 'redux-saga/effects';
import { forceUpdateWatcher } from '../screens/ForceUpdateScreen/sagas';
import { sendSMSWatcher, verifyCodeWatcher } from '../screens/VerificationCodeScreen/sagas';

const sagas = [
  ...forceUpdateWatcher,
  ...sendSMSWatcher,
  ...verifyCodeWatcher
];

export default function* listSagas() {
  yield all(sagas);
}
