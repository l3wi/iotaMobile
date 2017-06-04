import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

export default class InitialScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          Initial Page
        </Text>
      </View>
    );
  }
}
