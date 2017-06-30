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
  Alert
} from "react-native";
import { Select, Option } from "react-native-chooser";
import { converter } from "../../libs/utils";
import { iota } from "../../libs/iota";

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

  create = (address, amount, unit, message) => {
    // Thanks dom :)
    if (!address) {
      Alert.alert("Error", "Address is required");
      return;
    } else if (address.length == 81) {
      Alert.alert("Error", "Missing address checksum");
      return;
    } else if (address.length != 90) {
      Alert.alert("Error", "Incorrect address length");
      return;
    } else if (isNaN(amount)) {
      Alert.alert("Error", "Please enter a valid number");
      return;
    }

    const value = converter(amount, unit);
    if (value % 1 != 0) {
      Alert.alert("Error", "You can't send fractions of an IOTA");
      return;
    }

    console.log(parseInt(value, 10));
    const transfer = [
      {
        address: address,
        value: parseInt(value, 10),
        message: iota.utils.toTrytes(this.state.message),
        tag: iota.utils.toTrytes("iOSWALLET")
      }
    ];
    this.props.sendTransaction(this.props.pwd, 9, 15, transfer);
    this.setState({ address: "", amount: "0", unit: "i", message: "" });
  };

  render() {
    var { loading } = this.props;
    return (
      <Wrapper>
        <Padding />
        <Row>
          <Long>
            <TInput
              value={this.state.address}
              placeholder={"Paste Address"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
              onChangeText={address => this.setState({ address })}
            />
          </Long>
          <ScanButton onPress={() => this.scan()}>
            <Image
              source={require("../../assets/icons8-qr_code_filled.png")}
              style={{ width: 40, height: 40 }}
            />
          </ScanButton>
        </Row>
        <Row>
          <Short>
            <TInput
              value={this.state.amount}
              placeholder={"Enter Amount"}
              autoCorrect={false}
              keyboardType={"numeric"}
              placeholderTextColor={"#2d353e"}
              onChangeText={amount => this.setState({ amount })}
            />
          </Short>
          <Select
            onSelect={data => this.setState({ unit: data })}
            defaultText="i"
            style={{
              borderWidth: 0,
              width: 50,
              backgroundColor: "#2d353e",
              alignItems: "center",
              marginLeft: 10
            }}
            transparent={true}
            textStyle={{ fontSize: 18, color: "white" }}
            optionListStyle={{
              borderWidth: 0,
              backgroundColor: "rgba(255,255,255,1)",
              width: 50,
              height: 200
            }}
          >
            <Option value="i">i</Option>
            <Option value="Ki">Ki</Option>
            <Option value="Mi">Mi</Option>
            <Option value="Gi">Gi</Option>
            <Option value="Ti">Ti</Option>

          </Select>
        </Row>
        <Row>
          <Long>
            <TInput
              value={this.state.message}
              placeholder={"Enter Message"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
              onChangeText={message => this.setState({ message })}
            />
          </Long>
        </Row>
        <Row>
          <FullButton
            loading={loading}
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
            <ButtonText>
              Send Transaction
            </ButtonText>
          </FullButton>
        </Row>
      </Wrapper>
    );
  }
}

const ScanButton = styled.TouchableOpacity`
    padding: 5px;
    width: 50px;
    height: 50px;
`;

const Wrapper = styled.View`
    display: flex;
    flex-direction: column;   
    justify-content: space-between;
    width:100%;
    align-items: center;
    padding: 10px 40px;
`;

const Padding = styled.View`
    padding-top: 30px;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
`;

const Long = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    margin-bottom: 10px;
    border-bottom-color: #2d353e;
`;
const Short = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    margin-bottom: 10px;
    border-bottom-color: #2d353e;
`;
const TInput = styled.TextInput`
    height: 40px;
    width: 100%;
    color: #2d353e;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const SubHeading = styled.Text`
    color: white;
    font-size: 24px;
`;

const FullButton = styled.TouchableOpacity`
    flex: 1;
    padding: 10px;
    margin: 10px 0;
    background-color: ${props => (props.loading ? "#9ea2a2" : "#2d353e")};
    flex-direction: row;   
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
    flex: .2;
    padding: 10px;
    margin: 10px;
    background-color: #2d353e;
    flex-direction: row;   
    justify-content: center;
`;

const ButtonText = styled.Text`
    color: white;
`;
