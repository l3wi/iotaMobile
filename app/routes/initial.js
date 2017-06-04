import React, { Component } from "react";
import styled from "styled-components/native";
import LoginForm from "../components/login";

export default class InitialScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Wrapper>
        <LoginForm {...this.props} />
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
    justify-content: space-between;
    background: #004f71;
    padding: 30% 10px 20%;
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
