import "./shim";
import { AppRegistry } from "react-native";
import Wallet from "./app/entry";

AppRegistry.registerComponent("mobileWallet", () => Wallet);
