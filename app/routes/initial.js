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
      login: true,
      modal: false
    };
  }
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };

  componentWillMount() {
    this.props.checkBox();
    this.props.setupNode(this.props.nodeUrl);
  }

  clearBox = () => {
    this.setState({ login: false });
    this.props.deleteBox();
  };

  close = () => {
    this.setState({ modal: false });
  };

  render() {
    const { login, modal } = this.state;
    const { box, loading, node, nodeUrl, hydrate } = this.props;
    return (
      <Main style={{ position: "relative" }}>
        <Modal
          {...this.state}
          nodeUrl={nodeUrl}
          changeNode={this.props.changeNode}
          close={this.close}
        />
        {!loading && hydrate
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
                ? <LoginForm {...this.props} box={box} clear={this.clearBox} />
                : <SeedSetup {...this.props} />}
            </Wrapper>
          : <Wrapper loading>
              <Logo source={require("../assets/iota.png")} />
              <AppText>
                {loading}
              </AppText>
            </Wrapper>}
      </Main>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    box: state.crypto.box,
    node: state.iota.node,
    hydrate: state.iota.hydrate,
    nodeUrl: state.iota.nodeUrl,
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
