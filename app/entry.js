import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, StatusBar } from "react-native";
import { StackNavigator } from "react-navigation";

// Import Screens
import MainScreen from "./main";
import InitialScreen from "./routes/initial";

export default class Entry extends Component {
  render() {
    return (
      <Wrapper>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <SimpleApp />
      </Wrapper>
    );
  }
}

const SimpleApp = StackNavigator(
  {
    Initial: { screen: InitialScreen },
    Main: { screen: MainScreen }
  },
  { headerMode: "none" }
);
const Wrapper = styled.View`
    height: 100%;
    width:100%;
`;
