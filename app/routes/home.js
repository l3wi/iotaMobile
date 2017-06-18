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
        {account.transfers[0]
          ? <Transactions account={account} loading={loading} {...this.props} />
          : <ScrollView>
              <PaddedBox>
                <Header>Looks like this is your first time!</Header>
                <Words>
                  You'll need to go to Recieve and generate an address then
                  attach it to the tangle.
                </Words>
              </PaddedBox>
            </ScrollView>}
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

const PaddedBox = styled.View`
 height: 300px;
    width:100%;
    padding: 50px;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;

const Header = styled.Text`
  font-size: 18px;
    text-align: center;

  margin-bottom: 20px;
`;

const Words = styled.Text`
  text-align: center;
  margin-bottom: 20px;
`;
