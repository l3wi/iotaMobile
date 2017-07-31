import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import { Select, Option } from "react-native-chooser";
import { converter } from "../../libs/utils";
import { iota } from "../../libs/iota";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../input";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      amount: "0",
      unit: "i",
      message: ""
    };
  }

  scan = () => {
    this.props.navigator.showModal({
      screen: "qr", // unique ID registered with Navigation.registerScreen
      passProps: { function: this.fillAddress }, // simple serializable object that will pass as props to the modal (optional)
      animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  fillAddress = data => {
    this.setState({ address: data });
    console.log(data);
  };

  render() {
    console.log(this.props);
    var { loading } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={150}
        style={{ width: "100%" }}
      >
        <Wrapper>
          <Col>
            <Input
              dark
              value={this.state.address}
              placeholder={"Type in address or tag"}
              autoCorrect={false}
              placeholderTextColor={"#D3D8E8"}
              autoCapitalize="characters"
              onChangeText={address => this.setState({ address })}
            >
              <ScanButton onPress={() => this.scan()}>
                <Image
                  source={require("../../assets/light_qr_code.png")}
                  style={{ width: 40, height: 40 }}
                />
              </ScanButton>
            </Input>
            <Input
              dark
              value={this.state.message}
              multiline={true}
              placeholder={"Message (Optional)"}
              autoCorrect={false}
              placeholderTextColor={"#D3D8E8"}
              onChangeText={message => this.setState({ message })}
            />
            <Input
              dark
              value={this.state.message}
              placeholder={"Name tag (Optional - Tag to save the address)"}
              autoCorrect={false}
              placeholderTextColor={"#D3D8E8"}
              onChangeText={message => this.setState({ message })}
            />
          </Col>

          {!this.state.address
            ? <FullButton disabled>
                <ButtonText>{`No Address`}</ButtonText>
              </FullButton>
            : <FullButton
                loading={false}
                onPress={() =>
                  !loading
                    ? this.create(
                        this.state.address,
                        this.state.amount,
                        this.state.unit,
                        this.state.message
                      )
                    : null}
              >
                <ButtonText>{`Send ${this.props.amount} ${this.props
                  .unit}`}</ButtonText>
              </FullButton>}
        </Wrapper>
      </KeyboardAvoidingView>
    );
  }
}

var { height, width } = Dimensions.get("window");

const ScanButton = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 5px;
  width: 50px;
  height: 50px;
`;

const Wrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 10px 0 0;
`;

const Col = styled.View`width: 100%;`;

const SubHeading = styled.Text`
  color: white;
  font-size: 24px;
`;

const FullButton = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  min-height: 64px;
  background-color: ${props => (props.disabled ? "#B8BECC" : "#0BA8FA")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`color: white;`;
