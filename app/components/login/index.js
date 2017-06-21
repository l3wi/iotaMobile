import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from "react-native";
import { Navigation } from "react-native-navigation";

import Iota, { Valid } from "../../libs/iota";
import { OpenBox, SaveBox, DeleteBox, hashPwd } from "../../libs/crypto";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pass: "" };
  }

  getAccount = async password => {
    const passHash = hashPwd(password);
    this.props.startLoading("Getting Node");
    // Decrypt Seed
    // Navigation.showModal({ screen: "loading" });
    const clearSeed = this.setState({ pass: "" });
    if (!await OpenBox("seed", passHash)) {
      this.props.finishLoading();
      return alert("Incorrect Password");
    }
    // Store password
    this.props.setPwd(passHash);
    // Get account
    this.props.startLoading("Getting Wallet");
    this.props.getAccount(passHash, this.props.navigator);

    // // Push to new nav stateAccount
    // this.props.navigator.resetTo({
    //   screen: "transactions"
    // });
  };

  render() {
    return (
      <Col>
        <Logo source={require("../../assets/iota.png")} />
        {this.props.box
          ? <EmptyCol>

              <Row>
                <BottomBorder>
                  <TInput
                    value={this.state.pass}
                    placeholder={"Enter Password"}
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholderTextColor={"white"}
                    selectTextOnFocus={true}
                    onSubmitEditing={() => this.getAccount(this.state.pass)}
                    onChangeText={pass => this.setState({ pass })}
                  />
                </BottomBorder>
              </Row>
              <Row>
                <Button onPress={() => this.getAccount(this.state.pass)}>
                  <AppText>Login</AppText>
                </Button>
              </Row>

            </EmptyCol>
          : null}

        <Row>
          <Button onPress={this.props.clear}>
            <AppText>Load New Wallet</AppText>
          </Button>
        </Row>
      </Col>
    );
  }
}

const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
`;
const Col = styled.View`
    display: flex;
    height:100%;
    width:80%;
    flex-direction: column;   
    justify-content: space-around;
    align-items: center;
`;

const Logo = styled.Image`
  width: 160px;
  height:160px;
`;

const EmptyCol = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
  border-bottom-color: white;

`;
const TInput = styled.TextInput`
    height: 40px;
    color: white;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const AppText = styled.Text`
    color: white;
`;

const Button = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin: 20px 0;
    background-color: rgba(255,255,255,.3);
`;
function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
