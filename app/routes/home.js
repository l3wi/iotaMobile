import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, ScrollView } from "react-native";

import Balance from "../components/balance";
import Transactions from "../components/transactions";

export default class HomeScreen extends Component {
  static navigationOptions = {};
  render() {
    console.log(this.props);
    var { account, node, loading } = this.props.screenProps.state;
    return (
      <Wrapper>
        <Balance
          account={account}
          loading={loading}
          node={node}
          {...this.props}
        />
        <Transactions account={account} loading={loading} {...this.props} />
      </Wrapper>
    );
  }
}
const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;
