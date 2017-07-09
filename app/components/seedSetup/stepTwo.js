import React from "react";
import styled from "styled-components/native";
import { Text, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import Input from "../input";

export default class extends React.Component {
  state = { first: "", second: "" };

  componentDidMount() {
    console.log(this.props);
    this.setState({ ...this.props });
  }

  render() {
    var { first, second } = this.state;
    return (
      <EmptyCol>
        <Header>
          Enter a Password
        </Header>
        <AppText body>
          In addition to storing the seed in the device's protected Keychain,
          the seed is encrypted by a password of your choosing. This saves you
          from entering your seed each time you enter the app. This password
          only applies when using this wallet.
        </AppText>
        <AppText body>
          There is no way to recover the seed if you forget your password. So
          make sure you backup your seed.{" "}
        </AppText>
        <Row>
          <Input
            value={first}
            autoCorrect={false}
            placeholder={"Enter a Complex Password"}
            placeholderTextColor={"white"}
            secureTextEntry={true}
            onChangeText={first => this.setState({ first })}
          />
        </Row>

        <Row>
          <Input
            value={second}
            autoCorrect={false}
            placeholder={"Repeat Password"}
            placeholderTextColor={"white"}
            secureTextEntry={true}
            onSubmitEditing={() => this.confirm()}
            onChangeText={second => this.setState({ second })}
          />
        </Row>
        {/*<Button onPress={() => this.confirm()}>
          <AppText>Setup wallet</AppText>
        </Button>*/}
        <Row style={{ justifyContent: "space-between" }}>
          <Button onPress={() => this.props.step({ step: 1, first, second })}>
            <AppText>Back</AppText>
          </Button>
          <Button onPress={() => this.props.step({ step: 3, first, second })}>
            <AppText>Next</AppText>
          </Button>
        </Row>
      </EmptyCol>
    );
  }
}

const EmptyCol = styled.View`
    width: 100%;
`;

const Button = styled.TouchableOpacity`
    justify-content: center;
    padding: 10px;
    margin:20px 0px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "40%")};
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`;

const Header = styled.Text`
    font-size: 20px;
    padding-bottom: 20px;
    color: white;
    text-align: center;
`;

const AppText = styled.Text`
    padding: ${props => (props.body ? "10px 0" : "0px")}
    color: white;
    text-align: center;
`;
