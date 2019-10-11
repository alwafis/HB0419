import React from "react";
import { AppRegistry, StatusBar, Platform } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from "react-native-flash-message";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { persistor, store } from "./src/config/store";
import { name as appName } from "./app.json";
import { auth, onNotification } from "./src/utils/firebase";
import Navigator from "./src/navigator";
import { config } from "./src/config/global";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: config.colors.primary_background,
    accent: '#ffffff',
  }
};

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    
    // firebase action
    auth();
    this.notificationListener = onNotification;
  }
  componentWillUnmount() {
    this.notificationListener();
  }
  render(){
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <Navigator
            ref={nav => {
              this.nav = nav;
            }}
            onNavigationStateChange={(prevState, currentState) => {
              // const currentScreen = this.getCurrentRouteName(currentState);
              // const prevScreen = this.getCurrentRouteName(prevState);

              // if (prevScreen !== currentScreen) {
              //   this.setCurrentRouteName(currentScreen);
              // }
            }}/>
            <StatusBar
              barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
            />
            <FlashMessage position="bottom" />
          </PersistGate>
        </PaperProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
