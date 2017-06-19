import differenceInMilliseconds from "date-fns/difference_in_milliseconds";
import { AsyncStorage } from "react-native";

var exit;

export const ExpiredRemember = async () => {
  try {
    await AsyncStorage.getItem("remember", (err, result) => {
      const rememberMe = JSON.parse(result);
      if (
        differenceInMilliseconds(Date.now(), exit) < rememberMe &&
        rememberMe !== null
      ) {
        console.log("Session within Remember Me");
        return false;
      } else {
        console.log("Session Expired");
        return true;
      }
    });
  } catch (error) {
    // Error saving data
  }
};

export const exitApp = () => {
  exit = Date.now();
};

export const setRemember = async time => {
  try {
    await AsyncStorage.setItem("remember", JSON.stringify(time * 60000));
  } catch (error) {
    // Error saving data
  }
};
export const getRemember = async () => {
  var time = "";
  await AsyncStorage.getItem("remember", (err, result) => {
    console.log("Remember set at: " + JSON.parse(result) / 60000 + " min");
    time = JSON.parse(result) / 60000;
  });
  return time;
};
