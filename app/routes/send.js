import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import Balance from "../components/balance";

export default class SendScreen extends Component {
  static navigationOptions = {};
  render() {
    console.log(this.props);
    var { account } = this.props.screenProps.state;
    return (
      <Wrapper>
        <Balance account={account} {...this.props} />

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
