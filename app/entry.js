import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";

import InitialScreen from "./routes/initial";
import HomeScreen from "./routes/home";

export default (SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Initial: { screen: InitialScreen }
}));
