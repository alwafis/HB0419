import firebase from 'react-native-firebase';
import { config } from '../../config/global'; 

// fcm auth function
function auth (){
    firebase.messaging().requestPermission()
    .then(() => {
        console.log('auth success');

        firebase.messaging().getToken()
        .then((res) => {
            console.log(res)
        });
    })
    .catch(error => {
        console.log(error);
    });
};
// get fcm token funct
const getToken = () => {
    firebase.messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            console.log(fcmToken);
        } else {
            console.log('user doesn`t have token');
        } 
    });
};
//on notif function
const onNotification = firebase.notifications().onNotification((notification) => {
        const channel = new firebase.notifications.Android.Channel(config.notification.default_channel, config.notification.default_channel_description, firebase.notifications.Android.Importance.Max)
            .setDescription(config.notification.default_channel_description)
            .setVibrationPattern([500]) 
            .setSound(config.notification.default_sound)
            .enableLights(config.notification.default_light)
            .enableVibration(config.notification.default_vibration);

        // Create the channel
        firebase.notifications().android.createChannel(channel);

        // set default notification props for android
        notification.setSound(config.notification.default_sound);
        notification.android.setColor(config.notification.default_color);
        notification.android.setChannelId(config.notification.default_channel);
        notification.android.setVibrate(config.notification.default_vibration);
        notification.android.setDefaults(firebase.notifications.Android.Defaults.All);
        notification.android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.All);
        notification.android.setCategory(firebase.notifications.Android.Category.Alarm);
        notification.android.setSmallIcon(config.notification.default_launcher_icon);
        notification.android.setPriority(firebase.notifications.Android.Priority.High);
        notification.android.setVisibility(firebase.notifications.Android.Visibility.Public);
        notification.android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.All);
        notification.android.setCategory(firebase.notifications.Android.Category.Alarm);
        console.log(notification);
        // display notification
        firebase.notifications().displayNotification(notification);
    });

export { auth, getToken, onNotification };