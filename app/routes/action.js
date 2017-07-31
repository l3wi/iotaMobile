import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Vibration
} from "react-native";
import { Navigation } from "react-native-navigation";

import Camera from "react-native-camera";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Send from "../components/send";

class ActionScreen extends Component {
  state = {
    allowed: false,
    screen: 1
  };
  static navigatorStyle = {
    screenBackgroundColor: "transparent",
    modalPresentationStyle: "overCurrentContext",
    navBarHidden: true // make the nav bar hidden
  };

  componentDidMount() {}

  render() {
    var { allowed } = this.state;
    return (
      <View>
        <Close
          onPress={() =>
            this.props.navigator.dismissModal({
              animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            })}
        >
          <CloText>Cancel</CloText>
          <View />
        </Close>
        <Wrapper>
          <Menu>
            <MenuButton>
              <MenuText>Receive</MenuText>
            </MenuButton>
            <MenuButton>
              <MenuText active>Send</MenuText>
            </MenuButton>
          </Menu>
          {/* <Recieve {...this.props} /> */}
          <Send {...this.props} />
        </Wrapper>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    account: state.iota.account,
    pwd: state.crypto.pwd,
    loading: state.iota.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionScreen);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Wrapper = styled.View`
  height: 90%;
  width: 100%;
  display: flex;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const Row = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Menu = styled.View`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-color: #f5f7fa;
  border-bottom-width: 1px;
`;

const MenuButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: ${props => (props.active ? "#295fcc" : "#CBD2E3")};
`;

const Close = styled.TouchableOpacity`
  height: ${height * 0.1 + "px"};
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloText = styled.Text`
  padding: 30px 30px 0;
  font-size: 16;
  color: #d3d8e8;
`;
