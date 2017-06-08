import React, { Component } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { OpenBox, DeleteBox } from "../libs/crypto";
import Balance from "../components/balance";
import { NavigationActions } from "react-navigation";

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

  clear = () => {
    DeleteBox("seed");
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

  render() {
    var { account } = this.props.screenProps.state;
    return (
      <Wrapper>
        <Balance account={account} {...this.props} />
        <ScrollView style={{ width: "100%" }}>

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
`;
const AppText = styled.Text`
  padding: 30px 0px;
  font-size: 20px;
    color: white;
`;
const Button = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    margin: 20px 20px ;
    background-color: #2d353e;
    flex: 1;

`;
const WhiteText = styled.Text`
  color: white;
`;
