import differenceInMilliseconds from "date-fns/difference_in_milliseconds";
import { AsyncStorage, AppState } from "react-native";

// Dispatch Clear Pass func
import { store } from "./store";
import { clearPwd } from "../actions/crypto";
import { finishLoading } from "../actions/iota";

import { init } from "../entry";

var exit;

export const initialiseRemember = () => {
  AppState.addEventListener("change", nullify);
};

const nullify = nextAppState => {
  console.log("App changed to: ", nextAppState);
  if (nextAppState === "active") {
    // ExpiredRemember();
  } else if (nextAppState === "inactive") {
    exitApp();
  }
};

// Checks to see if Remember me is expired
const ExpiredRemember = async () => {
  // Get state
  var state = await store.getState();
  // Check
  if (
    differenceInMilliseconds(Date.now(), exit) <
      state.crypto.remember * 60000 + 1 &&
    state.crypto.remember !== null
  ) {
    console.log("Session within Remember Me");
  } else {
    // Writing it 'null'
    store.dispatch(clearPwd());
    store.dispatch(finishLoading());
    init();
    console.log("Key Cleaned & Rerouted to login");
  }
};

export const exitApp = () => {
  exit = Date.now();
};
