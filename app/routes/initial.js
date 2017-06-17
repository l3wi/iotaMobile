import React, { Component } from "react";
import {
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import LoginForm from "../components/login";
import SeedSetup from "../components/seedSetup";
import Modal from "../components/initalModal";

import { RetrieveBox, DeleteBox } from "../libs/crypto";

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      box: false,
      modal: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    RetrieveBox("seed").then(box => {
      this.setState({ loading: false, box: box, login: true });
    });
  }

  clearBox = () => {
    DeleteBox("seed");
    this.setState({ login: false });
  };

  close = () => {
    this.setState({ modal: false });
  };

  loading = message => {
    if (!message) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: message || "Loading" });
    }
  };

  render() {
    const { box, login, modal } = this.state;
    return (
      <ScrollView style={{ position: "relative" }}>
        <Modal {...this.state} close={this.close} />
        {!this.state.loading
          ? <Wrapper>
              {!modal
                ? <OpenModal onPress={() => this.setState({ modal: true })}>
                    <Image
                      source={require("../assets/icons8-settings.png")}
                      style={{ height: 25, width: 25 }}
                    />
                  </OpenModal>
                : null}

              {login
                ? <LoginForm
                    {...this.props}
                    box={box}
                    clear={this.clearBox}
                    loading={this.loading}
                  />
                : <SeedSetup {...this.props} loading={this.loading} />}
            </Wrapper>
          : <Wrapper loading>
              <Logo source={require("../assets/iota.png")} />
              <AppText>
                {this.state.loading}
              </AppText>
            </Wrapper>}
      </ScrollView>
    );
  }
}
var { height, width } = Dimensions.get("window");

const Wrapper = styled.View`
    height: ${height + "px"};
    display:flex;
    align-items: center;
    justify-content: ${props =>
      props.loading ? "space-around" : "flex-start"};
    background: #2d353e;
    padding: 20px 20px;
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-items: center;
`;
const AppText = styled.Text`
  padding: 30px 0px;
  font-size: 20px;
    color: white;
`;

const Logo = styled.Image`
  width: 160px;
  height:160px;
`;

const OpenModal = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 20px;
  height: 35px;
  width: 35px;
`;
