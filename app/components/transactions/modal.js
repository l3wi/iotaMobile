import React from "react";
import styled from "styled-components/native";
import {
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  Clipboard
} from "react-native";

export default class TransactionModal extends React.Component {
  copy = address => {
    Clipboard.setString(address);
    alert("Copied to clip board");
  };
  render() {
    var { item, modalVisible } = this.props;
    return (
      <Modal animationType={"fade"} transparent={true} visible={modalVisible}>
        {item
          ? <ModalBack>
              <Close onPress={() => this.props.setModalVisible([])}>
                <Image
                  source={require("../../assets/close.png")}
                  style={{ height: 30, width: 30 }}
                />
              </Close>
              <ModalBody>

                <Text>Bundle:</Text>
                {item[0]
                  ? <TouchableOpacity onPress={() => this.copy(item[0].bundle)}>
                      <Text>
                        {item[0].bundle.substring(0, 20)}...
                      </Text>
                    </TouchableOpacity>
                  : null}

                <Text>Hash:</Text>
                {item.map((item, index) =>
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.copy(item.hash)}
                  >
                    <Text>{item.hash.substring(0, 20)}...</Text>
                  </TouchableOpacity>
                )}

                {!item.persistence
                  ? <Button
                      onPress={() => {
                        this.props.screenProps.replay(
                          item[item.length - 1].hash
                        );
                      }}
                    >
                      <Word>Replay Transaction</Word>
                    </Button>
                  : null}

              </ModalBody>
            </ModalBack>
          : null}

      </Modal>
    );
  }
}

const ModalBody = styled.View`
  padding: 20px;
  width: 70%;
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
  color: white;
`;

const ModalBack = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.70);
`;
