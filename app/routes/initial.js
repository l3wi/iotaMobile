import React, { Component } from "react";
import styled from "styled-components/native";
import LoginForm from "../components/login";
import SeedSetup from "../components/seedSetup";
import { RetrieveBox, DeleteBox } from "../libs/crypto";

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      box: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    RetrieveBox("seed").then(box => {
      this.setState({ loading: false, box: box });
    });
  }

  getBox = async () => {
    const box = await RetrieveBox("seed");
    return true;
  };

  render() {
    const { box } = this.state;
    if (!this.state.loading) {
      return (
        <Wrapper>
          <AppText>IOTA Mobile Wallet</AppText>
          {box ? <LoginForm {...this.props} /> : <SeedSetup {...this.props} />}

          <Row />

        </Wrapper>
      );
    }
    return (
      <AppText>
        Loading
      </AppText>
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
