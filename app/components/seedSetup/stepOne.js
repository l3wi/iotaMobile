import React from "react";
import styled from "styled-components/native";
import {
  Text,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import Input from "../input";

import { randSeed } from "../../libs/crypto";

export default class extends React.Component {
  state = { seed: "" };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  newSeed = () => {
    const seed = randSeed(81);
    Alert.alert(
      "Store this seed securely",
      "Double check, any typo will result in the loss of access to your wallet. \n \n" +
        seed
    );
    this.setState({ seed });
  };

  scan = () => {
    this.props.navigator.showModal({
      screen: "qr", // unique ID registered with Navigation.registerScreen
      passProps: { function: this.fillAddress, dismiss: this.dismissModal }, // simple serializable object that will pass as props to the modal (optional)
      animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  fillAddress = seed => {
    this.setState({ seed });
  };

  render() {
    var { seed } = this.state;
    return (
      <EmptyCol>
        <Header>
          Enter your Seed
        </Header>
        <AppText body>
          Your seed is your access code your wallet. It could be thought of as
          your password to your 'account' on the tangle. You must never share
          your seed with anyone.
        </AppText>
        <AppText body>
          The seed you enter will only be stored on this device. If this phone
          is lost or destroyed you will NOT be able to recover the seed. You
          MUST save it elsewhere. Writing it down on paper is a good way to keep
          it safe.
        </AppText>
        <Row>
          <Button onPress={() => this.newSeed()}>
            <AppText>Generate seed</AppText>
          </Button>
          <ScanButton onPress={() => this.scan()}>
            <Image
              source={require("../../assets/icons8-qr_code.png")}
              style={{ width: 40, height: 40 }}
            />
          </ScanButton>
        </Row>

        <Row>
          <Input
            value={seed}
            autoCorrect={false}
            placeholder={"Enter Seed"}
            placeholderTextColor={"white"}
            selectTextOnFocus={true}
            onChangeText={seed => this.setState({ seed })}
          />
        </Row>
        <Row>
          {/*<Button onPress={props.newSeed()}>
        <AppText>Back</AppText>
      </Button>*/}
          <Button full onPress={() => this.props.step({ step: 2, seed })}>
            <AppText>Next</AppText>
          </Button>
        </Row>
      </EmptyCol>
    );
  }
}

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;
const EmptyCol = styled.View`
    width: 100%;
`;

const Button = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    padding: 10px;
    margin:20px 0px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

const ScanButton = styled.TouchableOpacity`
    padding: 15px;
    width: 50px;
    height: 50px;
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
