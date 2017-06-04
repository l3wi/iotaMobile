import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import Balance from "../components/balance";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Wrapper>
        <Balance />
        <Text>
          Home Page
        </Text>
      </Wrapper>
    );
  }
}
const Wrapper = styled.View`
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    background: #004f71;
`;
