import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, StatusBar } from "react-native";
import { OpenBox, SaveBox, DeleteBox, hashPwd } from "./libs/crypto";

import { DrawerNavigator } from "react-navigation";

import HomeScreen from "./routes/home";
import SendScreen from "./routes/send";
import RecieveScreen from "./routes/recieve";
import SettingsScreen from "./routes/settings";

import Iota from "./libs/iota";

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
      node: {}
    };
  }

  componentDidMount() {
    const account = this.props.navigation.state.params.account;
    this.setState({
      account: account,
      node: this.props.navigation.state.params.node,
      transfers: Iota.categorizeTransfers(account.transfers, account.addresses),
      pwd: this.props.navigation.state.params.pwd
    });
  }

  newAddress = async () => {
    if (this.state.pwd) {
      const addy = await Iota.newAddress(await OpenBox("seed", this.state.pwd));
      const newAccount = this.state.account;
      newAccount.latestAddress = addy;
      console.log(newAccount);
      this.setState({ account: newAccount });
    }
    /// Prompt for password entry if no hash in memory.
  };

  send = async (depth, minMag, transfers) => {
    if (this.state.pwd) {
      const result = await Iota.send(
        await OpenBox("seed", this.state.pwd),
        depth,
        minMag,
        transfers
      );
      return result;
    }
    /// Prompt for password entry if no hash in memory.
  };
  attachToTangle = async () => {
    console.log("Attaching address to tanlge");
    const result = await this.send(6, 18, [
      {
        address: this.state.account.latestAddress,
        value: 0,
        tag: Iota.toTrytes("iOSWALLET")
      }
    ]);
    console.log(result);
  };

  render() {
    var data = {
      state: this.state,
      newAddress: this.newAddress,
      send: this.send,
      attachToTangle: this.attachToTangle
    };
    console.log(this.state);
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
