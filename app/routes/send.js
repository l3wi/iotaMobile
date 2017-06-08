import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, ScrollView } from "react-native";

import Balance from "../components/balance";
import Send from "../components/send";

export default class SendScreen extends Component {
  static navigationOptions = {};
  render() {
    console.log(this.props);
    var { account } = this.props.screenProps.state;
    return (
      <Wrapper>
        <Balance account={account} {...this.props} />
        <ScrollView style={{ width: "100%" }}>
          <Send {...this.props} />

        </ScrollView>
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
