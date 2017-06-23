import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AppState,
  Alert
} from "react-native";
import timer from "react-native-timer";
import { DrawerNavigator, NavigationActions } from "react-navigation";

// My libs
import Iota from "./libs/iota";
import {
  OpenBox,
  SaveBox,
  DeleteBox,
  hashPwd,
  stringToU8,
  uintToS
} from "./libs/crypto";
import { exitApp, ExpiredRemember } from "./libs/remember";

// App routes
import HomeScreen from "./routes/home";
import SendScreen from "./routes/send";
import RecieveScreen from "./routes/recieve";
import SettingsScreen from "./routes/settings";

// Initialise Routes for the main app
const MainScreenNavigator = DrawerNavigator(
  {
    Transactions: { screen: HomeScreen },
    Recieve: { screen: RecieveScreen },
    Send: { screen: SendScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    navigationOptions: {
      headerMode: "none"
    }
  }
);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      node: {},
      loading: false
    };
  }

  // When the MAIN component enters
  componentDidMount() {
    // timer.setInterval("refresh", this.refreshWallet, 90000);
    const account = this.props.navigation.state.params.account;
    this.setState({
      account: account,
      node: this.props.navigation.state.params.node,
      transfers: Iota.categorizeTransfers(account.transfers, account.addresses),
      pwd: this.props.navigation.state.params.pwd
    });
    /// Listen for state changes
    AppState.addEventListener("change", this.nullify);
  }

  // When the MAIN component leaves
  componentWillUnmount() {
    // timer.clearInterval("refresh");
    AppState.removeEventListener("change", this.nullify);
  }
  // Func that get called to null write the pwd
  nullify = nextAppState => {
    console.log("App changed to: ", nextAppState);
    if (nextAppState === "active" && !ExpiredRemember()) {
      // Writing it 'null'
      this.setState({ pwd: stringToU8("000000000000000000000000") });
      // Removing it's refs do the GC can clean it
      delete this.state.pwd;
      // Construct a reset action for the naviggator
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Initial"
          })
        ]
      });
      this.props.navigation.dispatch(resetAction);
      console.log("Key Cleaned & Rerouted to login");
    } else if (nextAppState === "inactive") {
      exitApp();
    }
  };

  replay = async hash => {
    this.setState({ loading: { title: "Replaying Bundle" } }, async () => {
      const result = await Iota.replay(9, 15, hash);
      this.setState({ loading: false });
      this.forceUpdate();
    });
  };

  render() {
    var data = {
      state: this.state,
      newAddress: this.newAddress,
      getWallet: this.getAccount,
      send: this.send,
      attachToTangle: this.attachToTangle,
      replay: this.replay
    };
    if (this.state.account) {
      return (
        <Wrapper>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <MainScreenNavigator screenProps={data} />
        </Wrapper>
      );
    }
    return <Text>Loading</Text>;
  }
}

const Wrapper = styled.View`
    height: 100%;
    width:100%;
`;
