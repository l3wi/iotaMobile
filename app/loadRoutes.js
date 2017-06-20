import { Navigation } from "react-native-navigation";

import TransactionScreen from "./routes/transactions";
import SendScreen from "./routes/send";
import RecieveScreen from "./routes/recieve";
import SettingsScreen from "./routes/settings";
import InitialScreen from "./routes/initial";
import MenuScreen from "./routes/menu";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("auth", () => InitialScreen);
  Navigation.registerComponent("menu", () => MenuScreen);
  Navigation.registerComponent("transactions", () => TransactionScreen);
  Navigation.registerComponent("receive", () => RecieveScreen);
  Navigation.registerComponent("send", () => SendScreen);
  Navigation.registerComponent("settings", () => SettingsScreen);
}
