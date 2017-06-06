import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import Balance from "../components/balance";

export default class SendScreen extends Component {
  static navigationOptions = {};
  render() {
    return (
      <Wrapper>
        <Text>
          Send
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
