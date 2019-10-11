import { _retrieveData, _storeData } from "../utils/storage";

const config = {
  app_title: 'sampleapp Business',
  colors:{
    primary_green: '#0f7b44',
    primary_background: '#3abc88',
    field_inactive: '#979797'
  },
  notification: {
    default_sound: 'default',
    default_color: '#0f7b44',
    default_channel: 'sample-app-main',
    default_launcher_icon: '@mipmap/ic_launcher',
    default_channel_description: 'sampleapp Business Default Notification Channel',
    default_light: true,
    default_vibration: true
  },
  period:{
    sms_delay: 180, //in seconds
  },
  user_role: {
    1: 'Pembeli',
    2: 'Penyuplai'
  },
  api_url: {
    app: 'https://9z2dwbvyvc.execute-api.ap-southeast-1.amazonaws.com/dev/',
    account: 'https://hmd84delq2.execute-api.ap-southeast-1.amazonaws.com/dev/'
  },
  api_uri: {
    force_update: 'api/app/check',
    send_message: 'api/otp',
    verify_otp: 'api/otp/verify'
  }
}

const lang = async () => {
  const lang = await _retrieveData('default_language');

  if(lang == null){
    await _storeData('default_language', 'id');
    return 'id';
  }
  else{
    return lang;
  }
};
export { config, lang };
