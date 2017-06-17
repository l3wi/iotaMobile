import React, { Component } from "react";
import {
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Image
} from "react-native";
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

  loading = message => {
    if (!message) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: message || "Loading" });
    }
  };

  render() {
    const { box } = this.state;
    return (
      <ScrollView>
        {!this.state.loading
          ? <Wrapper>
              {box
                ? <LoginForm
                    {...this.props}
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
