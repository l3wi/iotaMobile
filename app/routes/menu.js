import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, ScrollView } from "react-native";

export default class HomeScreen extends Component {
  static navigationOptions = {};
  render() {
    return (
      <Wrapper>
        <Text>Hey</Text>
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
