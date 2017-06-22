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

import Iota from "../../libs/iota";
import { InitialiseSeed, OpenBox, randSeed, hashPwd } from "../../libs/crypto";
import { NavigationActions } from "react-navigation";

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
    if (seed === "")
      return Alert.alert(
        "Seed can't be empty",
        "Please enter a seed and try again"
      );
    if (this.state.first === "") {
      return Alert.alert(
        "Password can't be empty",
        "Please enter a password and try again"
      );
    }
    if (this.state.first !== this.state.second) {
      alert("Your passwords didn't match");
      this.setState({ first: "", second: "" });
      return;
    }

    this.props.startLoading("Encrypting Seed");

    const passHash = hashPwd(password);
    // Initialise the Seed Keystore
    await InitialiseSeed(seed, passHash);
    this.props.startLoading("Getting Wallet");
    // Sanity Check the password store
    if (!await OpenBox("seed", passHash)) {
      this.props.finishLoading();
      return alert("Incorrect Password");
    }

    // Push to new page
    this.props.setPwd(passHash);
    this.props.getAccount(passHash, this.props.navigator);
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
                  "Ensure this seed is copied correctly. Any typo will result in the loss of access to your wallet. \n \n" +
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
              {/*<Button onPress={() => console.log("Get Camera")}>
              <ImageButton source={require("../../assets/scan.png")} />
            </Button>*/}
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
                  placeholder={"Confirm Password"}
                  placeholderTextColor={"white"}
                  secureTextEntry={true}
                  onSubmitEditing={() =>
                    this.setup(this.state.seed, this.state.first)}
                  onChangeText={second => this.setState({ second })}
                />
              </BottomBorder>
            </Row>
            <Button
              onPress={() =>
                Alert.alert(
                  "IMPORTANT: \n Read this carefully",
                  `By pressing 'Agree' you understand and agree to the following: \n \n This seed you have entered is ONLY stored on your phone and is never transmitted. As such, if you phone is lost or destroyed the seed can NOT be recovered. \n \n It is your responsibility to store the seed in a safe place. \n \n The developers of this application are not liable for any losses incurred through the use of this application. \n \n To understand the security measures of this application, please REVIEW the code on GitHub.`,
                  [
                    {
                      text: "Agree",
                      onPress: () =>
                        this.setup(this.state.seed, this.state.first)
                    },

                    {
                      text: "Cancel",
                      onPress: () => console.log("User Canceled"),
                      style: "destructive"
                    }
                  ],
                  { cancelable: false }
                )}
            >
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
function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupForm);
