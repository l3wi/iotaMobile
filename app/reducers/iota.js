import createReducer from "../libs/createReducer";
import * as types from "../actions/types";

export const iota = createReducer(
  {},
  {
    [types.SET_NODE](state, action) {
      let newState = state;
      newState.node = action.node;
      return { ...newState };
    },
    [types.SET_REMOTE](state, action) {
      let newState = state;
      newState.nodeUrl = action.node;
      return { ...newState };
    },
    [types.SET_ACCOUNT](state, action) {
      let newState = state;
      newState.account = action.account;
      return { ...newState };
    },
    [types.UPDATE_TRANSFERS](state, action) {
      let newState = state;
      newState.account.transfers = action.data.transfers;
      newState.account.balance = action.data.balance;
      newState.account.inputs = action.data.inputs;
      return { ...newState };
    },
    [types.SET_ADDRESS](state, action) {
      let newState = state;
      newState.account.addresses.push(action.address);
      return { ...newState };
    },
    [types.LOADING](state, action) {
      let newState = state;
      if (action.data) {
        newState.loading = action.data;
      } else {
        newState.loading = false;
      }
      return { ...newState };
    },
    [types.HYDRATE](state, action) {
      let newState = state;
      if (action.data) {
        newState.hydrate = true;
      } else {
        newState.hydrate = false;
      }
      return { ...newState };
    },
    [types.CLEAR_IOTA](state, action) {
      return {
        loading: false,
        account: { balance: 0, transfers: [], addresses: [] },
        node: {},
        nodeUrl: "http://node.iotawallet.info:14265"
      };
    }
  }
);
