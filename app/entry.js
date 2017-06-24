import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import { registerScreens } from "./loadRoutes";
import { configureStore } from "./libs/store";
import { initialiseRemember } from "./libs/remember";

export const init = async () => {
  initialiseRemember();
  const store = await configureStore();

  registerScreens(store, Provider);

  Navigation.startSingleScreenApp({
    screen: {
      screen: "auth",
      navigatorStyle: { navBarHidden: true }
    },
    drawer: {
      left: {
        screen: "menu"
      },
      disableOpenGesture: false
    }
  });
};

init();
