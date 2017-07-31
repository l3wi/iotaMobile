import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
// Screens
import Overview from "./routes/overview";
import Transact from "./routes/transactions";
import SendScreen from "./routes/send";
import ActionScreen from "./routes/action";
import RecieveScreen from "./routes/recieve";
import Settings from "./routes/settings";
import InitialScreen from "./routes/initial";
import MenuScreen from "./routes/menu";
import QRScreen from "./routes/qrcode";

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent("auth", () => InitialScreen, store, Provider);
  Navigation.registerComponent("menu", () => MenuScreen, store, Provider);
  Navigation.registerComponent("overview", () => Overview, store, Provider);
  Navigation.registerComponent("transactions", () => Transact, store, Provider);
  Navigation.registerComponent("action", () => ActionScreen, store, Provider);
  Navigation.registerComponent("receive", () => RecieveScreen, store, Provider);
  Navigation.registerComponent("send", () => SendScreen, store, Provider);
  Navigation.registerComponent("qr", () => QRScreen, store, Provider);
  Navigation.registerComponent("settings", () => Settings, store, Provider);
}
