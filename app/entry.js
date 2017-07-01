import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import { registerScreens } from "./loadRoutes";
import { configureStore } from "./libs/store";
import { initialiseRemember } from "./libs/remember";

import { store } from "./libs/store";
import { finishLoading } from "./actions/iota";

export const init = async () => {
  initialiseRemember();
  const newStore = await configureStore();
  store.dispatch(finishLoading());

  registerScreens(newStore, Provider);

  Navigation.startSingleScreenApp({
    screen: {
      screen: "auth",
      navigatorStyle: { navBarHidden: true, screenBackgroundColor: "#2d353e" }
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
