import React, { Component } from "react";
import styled from "styled-components/native";
import LoginForm from "../components/login";
import SeedSetup from "../components/seedSetup";

export default class InitialScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Wrapper>
        <AppText>IOTA Mobile Wallet</AppText>
        {false ? <LoginForm {...this.props} /> : <SeedSetup {...this.props} />}

        <Row>
          <AppText>
            ver 0.0.1
          </AppText>
        </Row>

      </Wrapper>
    );
  }
}
const Wrapper = styled.View`
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    background: #004f71;
    padding: 20px 20px;
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-items: center;
`;
const AppText = styled.Text`
    color: white;
    font-family: courier;
`;
