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

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export const configureStore = initialState => {
  return new Promise((resolve, reject) => {
    const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
    persistStore(store, { storage: AsyncStorage }, () => resolve(store));
  });
};
