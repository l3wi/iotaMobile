import React from "react";
import styled from "styled-components/native";
import { Alert, KeyboardAvoidingView } from "react-native";

import { InitialiseSeed, OpenBox, randSeed, hashPwd } from "../../libs/crypto";
import { iota } from "../../libs/iota";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../../actions";

import Input from "../input";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

class SetupForm extends React.Component {
  state = { seed: "", first: "", second: "", step: 1 };

  setup = async () => {
    // Check for Seed
    if (!iota.valid.isTrytes(this.state.seed, 81)) {
      this.setState({ step: 1 });
      return Alert.alert(
        "Seed Invalid",
        "Please enter a seed that is 81 characters long & consists of the following characters: \n ABCDEFGHIJKLMNOPQRSTUVWXYZ9"
      );
    }

    if (this.state.first < 8) {
      this.setState({ step: 2 });
      return Alert.alert(
        "Invalid Pasword",
        "Please enter a password over 8 characters long."
      );
    }
    if (this.state.first !== this.state.second) {
      this.setState({ step: 2 });
      alert("Your passwords didn't match");
      this.setState({ first: "", second: "" });
      return;
    }

    const passHash = hashPwd(this.state.first);
    this.props.startLoading("Encrypting Seed");
    await InitialiseSeed(this.state.seed, passHash);
    // Store password
    this.props.setPwd(passHash);
    // Get account
    this.props.getAccount(passHash, this.props.navigator);
  };

  // confirm = () => {
  //   Alert.alert(
  //     "IMPORTANT: \n Read this carefully",
  //     `By pressing 'Agree' you understand and agree to the following: \n \n This seed you have entered is ONLY stored on your phone. If you phone is lost or destroyed the seed can NOT be recovered. \n \n It is your responsibility to store the seed in a safe place. \n \n The developers of this application are not liable for any losses incurred through the use of this application. \n \n To understand the security measures of this application, please REVIEW the code on GitHub.`,
  //     [
  //       {
  //         text: "Agree",
  //         onPress: () => this.setup(this.state.seed, this.state.first)
  //       },

  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("User Canceled"),
  //         style: "destructive"
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  setStep = data => {
    this.setState({ ...data });
  };

  render() {
    var { step, seed, first, second } = this.state;
    if (step === 1) {
      return (
        <Col>
          <StepOne step={this.setStep} seed={seed} />
        </Col>
      );
    } else if (step === 2) {
      return (
        <Col>
          <StepTwo step={this.setStep} first={first} second={second} />
        </Col>
      );
    } else if (step === 3) {
      return (
        <Col>
          <StepThree step={this.setStep} setup={this.setup} />
        </Col>
      );
    } else {
      return null;
    }
  }
}

const Col = styled.View`
    display: flex;
    paddingTop: 40px;
    paddingBottom: 40px;
    height: 95%;
    width:80%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const AppText = styled.Text`
    color: white;
    text-align: center;
`;

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupForm);
