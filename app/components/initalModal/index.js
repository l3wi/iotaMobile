import React, { Component } from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  TextInput,
  Modal,
  AsyncStorage
} from "react-native";

export default class InitialModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://node.iotawallet.info:14265/"
    };
  }

  componentDidMount() {
    this.setState({ url: this.props.nodeUrl });
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.modal}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >

        <ModalBack>
          <Close
            onPress={() => {
              this.props.close();
            }}
          >
            <Image
              source={require("../../assets/close.png")}
              style={{ height: 30, width: 30 }}
            />
          </Close>
          <ModalBody>
            <Heading>IOTA Mobile - v0.1</Heading>
            {/*<Word>For support enquires email info@tangle.works</Word>*/}
            <Word />
            <Word>Node:</Word>
            <BottomBorder>
              <TInput
                value={this.state.url}
                placeholder={this.state.url}
                autoCorrect={false}
                keyboardType={"url"}
                placeholderTextColor={"black"}
                onSubmitEditing={() =>
                  this.props.changeNode(this.state.url, true)}
                onChangeText={url => this.setState({ url })}
              />
            </BottomBorder>
            <Word />
            <Word>Developed by @lewi</Word>

          </ModalBody>

        </ModalBack>

      </Modal>
    );
  }
}

const ModalBody = styled.View`
  padding: 20px;
  width: 80%;
  background: white;
`;

const Close = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    right: 40px;
`;

const Button = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin: 10px 0;
    background-color: #2d353e;
`;
const Word = styled.Text`

    padding: 5px;
`;
const Heading = styled.Text`
    font-size: 20px;
    margin-bottom: 10px;
`;

const ModalBack = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.70);
`;

const BottomBorder = styled.View`
    width: 100%;
    border-bottom-width: 3px;
    border-bottom-color: black;
    padding: 0px 3px;
`;
const TInput = styled.TextInput`
    height: 40px;
    color: black;
    padding-bottom: 5px;

`;
