import React, { Component } from "react";
import { ScrollView, Dimensions, KeyboardAvoidingView } from "react-native";
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

  clearBox = () => {
    DeleteBox("seed");
    this.setState({ box: false });
  };

  render() {
    const { box } = this.state;
    if (!this.state.loading) {
      return (
        <KeyboardAvoidingView behavior={"position"}>
          <ScrollView>
            <Wrapper>
              <AppText>IOTA iOS</AppText>
              {box
                ? <LoginForm {...this.props} clear={this.clearBox} />
                : <SeedSetup {...this.props} />}

              <Row />
            </Wrapper>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
    return (
      <AppText>
        Loading
      </AppText>
    );
  }
}
var { height, width } = Dimensions.get("window");

const Wrapper = styled.View`
    height:${height + "px"};
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
  padding: 30px 0px;
  font-size: 20px;
    color: white;
`;
