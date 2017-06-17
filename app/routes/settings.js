import React, { Component } from "react";
import { Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import styled from "styled-components/native";
import { OpenBox, DeleteBox } from "../libs/crypto";
import Balance from "../components/balance";
import { NavigationActions } from "react-navigation";

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      box: false,
      rememberMe: 10
    };
  }
  static navigationOptions = {
    header: null
  };

  clear = () => {
    DeleteBox("seed");
    Alert.alert("Seed was cleared", "Please close the app.");
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Initial"
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  showSeed = async () => {
    console.log(this.props.screenProps.state);
    const seed = await OpenBox("seed", this.props.screenProps.state.pwd);
    Alert.alert("Wallet Seed", seed);
  };
  render() {
    console.log(this.props.screenProps.state);
    var { account, loading, rememberMe, pwd } = this.props.screenProps.state;
    return (
      <Wrapper>
        <Balance account={account} loading={loading} {...this.props} />
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ justifyContent: "space-around" }}
        >
          <Row>
            <Button onPress={() => this.showSeed()}>
              <WhiteText>Show Seed</WhiteText>
            </Button>
          </Row>
          <Spacer />
          <Row>
            <Button onPress={() => this.clear()}>
              <WhiteText>Delete Seed</WhiteText>
            </Button>
          </Row>
        </ScrollView>
      </Wrapper>
    );
  }
}
const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-items: center;
        margin: 20px 20px ;

`;

const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    border-bottom-color: #2d353e;
    margin-right: 30px;
`;
const TInput = styled.TextInput`
    height: 40px;
    color: #2d353e;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: #2d353e;    
`;
const AppText = styled.Text`
  padding: 30px 0px;
  font-size: 20px;
    color: white;
`;
const Button = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    background-color: #2d353e;
    flex: ${props => (props.wide ? 1.8 : 1)};

`;
const WhiteText = styled.Text`
  color: white;
`;

const Spacer = styled.View`
  height: 50px;
`;
