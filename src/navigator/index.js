import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  LoginScreen,
  CameraScreen,
  ForceUpdateScreen,
  AuthScreen,
  VerificationCodeScreen,
  RoleChooserScreen,
  RegistrationScreen
} from "../screens";

const LoginNav = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    }
  },
  {
    initialRouteName: "Login",
    mode: "modal",
    headerMode: "none"
  }
);
const ForceUpdateNav = createStackNavigator(
  {
    ForceUpdate: {
      screen: ForceUpdateScreen
    }
  },
  {
    initialRouteName: "ForceUpdate",
    mode: "modal",
    headerMode: "none"
  }
);

const AuthNav = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen
    },
    VerificationCode: {
      screen: VerificationCodeScreen,
      headerMode: "screen"
    }
  },
  {
    initialRouteName: "Auth",
    mode: "modal",
    headerMode: "none"
  }
);

const RegistrationNav = createStackNavigator(
  {
    RoleChooser: {
      screen: RoleChooserScreen
    },
    RegistrationMain: {
      screen: RegistrationScreen
    }
  },
  {
    initialRouteName: "RegistrationMain",
    mode: "modal",
    headerMode: "none"
  }
);

const CameraNav = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen
    }
  },
  {
    initialRouteName: "Camera",
    mode: "modal",
    headerMode: "none"
  }
);

const MainNav = createSwitchNavigator(
  {
    Login: LoginNav,
    Camera: CameraNav,
    Auth: AuthNav,
    ForceUpdate: ForceUpdateNav,
    Registration: RegistrationNav
  },
  {
    initialRouteName: "ForceUpdate"
  }
);

const App = createAppContainer(MainNav);

export default App;
