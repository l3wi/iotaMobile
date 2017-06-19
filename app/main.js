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
    /* stop worker */
    this.worker.terminate();
  }

  // Func that get called to refresh the wallet
  // refreshWallet = () => {
  //   console.log("Timer: Updating the Wallet");
  //   this.getAccount();
  // };
  // Func that get called to null write the pwd
  nullify = nextAppState => {
    console.log("App changed to: ", nextAppState);
    if (nextAppState === "inactive") {
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
    }
  };

  // Get Account
  getAccount = async () => {
    this.setState({ loading: { title: "Updating Wallet" } }, async () => {
      this.forceUpdate();
      Alert.alert(
        "Note",
        "The wallet is running a hashing function. It may be slow during this process. \n \n Please be patient"
      );
      const account = await Iota.getAccount(
        await OpenBox("seed", this.state.pwd)
      );
      if (!account) return alert("Couldn't fetch wallet");
      this.setState({ account: account, loading: false });
      this.forceUpdate();
    });
  };
  // Generate new addreress
  newAddress = async () => {
    if (this.state.pwd) {
      this.setState({ loading: { title: "Generating Address" } }, async () => {
        this.forceUpdate();

        const addy = await Iota.newAddress(
          await OpenBox("seed", this.state.pwd)
        );
        if (
          this.state.account.addresses[
            this.state.account.addresses.length - 1
          ] !== this.state.account.latestAddress
        ) {
          const newAccount = this.state.account;
          newAccount.addresses.push(Iota.removeChecksum(addy));
          this.setState({ account: newAccount, loading: false });
          this.forceUpdate();
        }
      });
    }
    /// Prompt for password entry if no hash in memory.
  };

  attachToTangle = async () => {
    this.setState({ loading: { title: "Attaching Wallet" } }, async () => {
      this.forceUpdate();

      console.log("Attaching address to tanlge");
      const result = await this.send(6, 15, [
        {
          address: this.state.account.addresses[
            this.state.account.addresses.length - 1
          ],
          value: 0,
          tag: Iota.toTrytes("iOSWALLET")
        }
      ]);
      this.getAccount();
      return;
    });
  };

  send = async (depth, minMag, transfers) => {
    if (this.state.pwd) {
      this.setState({ loading: { title: "Sending to Tangle" } }, async () => {
        this.forceUpdate();
        Alert.alert(
          "Note",
          "The wallet is running a hashing function. It may be slow during this process. \n \n Please be patient"
        );
        const result = await Iota.send(
          await OpenBox("seed", this.state.pwd),
          depth,
          minMag,
          transfers,
          this.state.account.inputs
        );
        this.setState({ loading: false });
        this.forceUpdate();
      });
    } else {
      alert("Please relogin to the app");
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
