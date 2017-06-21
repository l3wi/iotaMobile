import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

class MenuScreen extends Component {
  render() {
    return (
      <Wrapper>
        <MenuButton>
          <MenuText>IOTA Wallet</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.handleDeepLink({
              link: "transactions"
            })}
        >
          <MenuText>Transactions</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.handleDeepLink({
              link: "receive"
            })}
        >
          <MenuText>Receive</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.handleDeepLink({
              link: "send"
            })}
        >
          <MenuText>Send</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.handleDeepLink({
              link: "settings"
            })}
        >
          <MenuText>Settings</MenuText>
        </MenuButton>
      </Wrapper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;

const MenuButton = styled.TouchableOpacity`
    width:100%;
    background: white;
    display:flex;
    padding: 20px;
    align-items: flex-start;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #2d353e;
`;

const MenuText = styled.Text`
    color: #2d353e;
    font-size: 16px;

`;
