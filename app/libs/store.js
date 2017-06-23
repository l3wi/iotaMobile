// Main Libs
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// Middleware
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { AsyncStorage } from "react-native"; // we need to import AsyncStorage to use as a storage enging
import { persistStore, autoRehydrate } from "redux-persist"; // add new import
// Reducers
import reducers from "../reducers";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
});

const initialState = {
  iota: {
    loading: false,
    account: {},
    node: {},
    nodeUrl: "http://node.iotawallet.info:14265",
    rememberMe: 60000
  },
  crypto: {
    box: false
  }
};

const middleWare = [thunkMiddleware, loggerMiddleware];

export const configureStore = initialState => {
  return new Promise((resolve, reject) => {
    const store = createStore(
      reducers,
      initialState,
      compose(autoRehydrate(), applyMiddleware(...middleWare))
    );
    persistStore(store, { storage: AsyncStorage }, () => resolve(store));
  });
};
