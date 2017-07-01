import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Vibration
} from "react-native";
import { Navigation } from "react-native-navigation";

import Camera from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

class QRScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };

  state = {
    allowed: false
  };

  componentDidMount() {
    Camera.checkVideoAuthorizationStatus().then(data => {
      console.log(data);
      this.setState({ allowed: data });
    });
  }

  parseData = data => {
    var address;
    try {
      address = JSON.parse(data.data).address;
    } catch (e) {
      address = data.data;
    }
    this.props.function(address);
    Vibration.vibrate(100);
    this.props.navigator.dismissModal({
      animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  };

  render() {
    var { allowed } = this.state;
    return (
      <Wrapper>
        <Close
          onPress={() =>
            this.props.navigator.dismissModal({
              animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            })}
        >
          <Image
            source={require("../assets/close.png")}
            style={{ height: 30, width: 30 }}
          />
        </Close>
        {allowed
          ? <Camera
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
              ref={cam => {
                this.camera = cam;
              }}
              aspect={Camera.constants.Aspect.fill}
              onBarCodeRead={data => this.parseData(data)}
            />
          : <ZeroState>
              You seem to have disabled the camera! Go to settings and toggle
              the camera permissions.
            </ZeroState>}

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

export default connect(mapStateToProps, mapDispatchToProps)(QRScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    background: #2d353e;
    align-items: center;
    justify-content: center;
`;

const Close = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 10;
`;

const ZeroState = styled.Text`
    color: white;
    width: 80%;
    text-align: center;
    font-size: 20px;
`;
