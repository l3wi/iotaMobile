import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from "react-native";

import { InitialiseSeed, OpenBox, randSeed, hashPwd } from "../../libs/crypto";
import { iota } from "../../libs/iota";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions";

class SetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: "", first: "", second: "" };
  }

  setup = async (seed, password) => {
    // Check for Seed
    if (!iota.valid.isTrytes(seed, 81))
      return Alert.alert(
        "Seed Invalid",
        "Please enter a seed that is 81 characters long & consists of the following characters: \n ABCDEFGHIJKLMNOPQRSTUVWXYZ9"
      );

    // if (this.state.first < 8) {
    //   return Alert.alert(
    //     "Invalid Pasword",
    //     "Please enter a password over 8 characters long."
    //   );
    // }
    if (this.state.first !== this.state.second) {
      alert("Your passwords didn't match");
      this.setState({ first: "", second: "" });
      return;
    }

    const passHash = hashPwd(password);
    this.props.startLoading("Encrypting Seed");
    await InitialiseSeed(seed, passHash);
    // Store password
    this.props.setPwd(passHash);
    // Get account
    this.props.getAccount(passHash, this.props.navigator);
  };

  confirm = () => {
    Alert.alert(
      "IMPORTANT: \n Read this carefully",
      `By pressing 'Agree' you understand and agree to the following: \n \n This seed you have entered is ONLY stored on your phone and is never transmitted. As such, if you phone is lost or destroyed the seed can NOT be recovered. \n \n It is your responsibility to store the seed in a safe place. \n \n The developers of this application are not liable for any losses incurred through the use of this application. \n \n To understand the security measures of this application, please REVIEW the code on GitHub.`,
      [
        {
          text: "Agree",
          onPress: () => this.setup(this.state.seed, this.state.first)
        },

        {
          text: "Cancel",
          onPress: () => console.log("User Canceled"),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  scan = () => {
    this.props.navigator.showModal({
      screen: "qr", // unique ID registered with Navigation.registerScreen
      passProps: { function: this.fillAddress, dismiss: this.dismissModal }, // simple serializable object that will pass as props to the modal (optional)
      animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  fillAddress = data => {
    this.setState({ seed: data });
    console.log(data);
  };

  render() {
    return (
      <Col>
        <KeyboardAvoidingView
          style={{ width: "100%", height: 300 }}
          behavior={"padding"}
        >
          <EmptyCol>
            <AppText>
              If you don't already have a seed click below to generate one.
            </AppText>
            <Button
              onPress={() =>
                Alert.alert(
                  "IMPORTANT: \n Store this seed securely",
                  "Double check, any typo will result in the loss of access to your wallet. \n \n" +
                    randSeed(81)
                )}
            >
              <AppText>Click to generate a seed</AppText>
            </Button>
          </EmptyCol>
          <EmptyCol>
            <Row>
              <BottomBorder full>
                <TInput
                  value={this.state.seed}
                  autoCorrect={false}
                  placeholder={"Enter Seed"}
                  placeholderTextColor={"white"}
                  selectTextOnFocus={true}
                  onChangeText={seed => this.setState({ seed })}
                />
              </BottomBorder>
              <ScanButton onPress={() => this.scan()}>
                <Image
                  source={require("../../assets/icons8-qr_code.png")}
                  style={{ width: 40, height: 40 }}
                />
              </ScanButton>
            </Row>
          </EmptyCol>
          <EmptyCol>
            <Row>
              <BottomBorder full>
                <TInput
                  value={this.state.first}
                  autoCorrect={false}
                  placeholder={"Enter a Complex Password"}
                  placeholderTextColor={"white"}
                  secureTextEntry={true}
                  onChangeText={first => this.setState({ first })}
                />
              </BottomBorder>
            </Row>

            <Row>
              <BottomBorder full>
                <TInput
                  value={this.state.second}
                  autoCorrect={false}
                  placeholder={"Repeat Password"}
                  placeholderTextColor={"white"}
                  secureTextEntry={true}
                  onSubmitEditing={() => this.confirm()}
                  onChangeText={second => this.setState({ second })}
                />
              </BottomBorder>
            </Row>
            <Button onPress={() => this.confirm()}>
              <AppText>Setup wallet</AppText>
            </Button>
          </EmptyCol>
        </KeyboardAvoidingView>
      </Col>
    );
  }
}

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`;
const Col = styled.View`
    display: flex;
    paddingTop: 40px;
    paddingBottom: 40px;
    height: 90%;
    width:80%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
const EmptyCol = styled.View`
    flex:1;
    flex-direction: column;
    width: 100%;
`;

const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    border-bottom-color: white;
`;
const TInput = styled.TextInput`
    height: 40px;
    color: white;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;
`;

const AppText = styled.Text`
    color: white;
    text-align: center;
`;

const ImageButton = styled.Image`
    width:25px;
    height: 25px;
`;

const Button = styled.TouchableOpacity`
    justify-content: center;
    padding: 10px;
    margin:20px 0px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

const ScanButton = styled.TouchableOpacity`
    padding: 5px;
    width: 50px;
    height: 50px;
`;

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupForm);
