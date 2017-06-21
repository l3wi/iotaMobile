import React, { Component } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import LoginForm from "../components/login";
import SeedSetup from "../components/seedSetup";
import Modal from "../components/initalModal";

import { RetrieveBox, DeleteBox } from "../libs/crypto";

class AuthScreen extends Component {
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

  componentWillMount() {
    this.props.checkBox();
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
    const { box, login, modal } = this.props;
    console.log(this.props);
    return (
      <Main style={{ position: "relative" }}>
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

              {box
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
      </Main>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    box: state.crypto.box,
    loading: state.iota.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

var { height, width } = Dimensions.get("window");

const Main = styled.View`

`;
const Wrapper = styled.View`
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: ${props => (props.loading ? "space-around" : "center")};
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
