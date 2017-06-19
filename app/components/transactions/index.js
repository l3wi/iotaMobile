import React from "react";
import styled from "styled-components/native";
import {
  FlatList,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Clipboard,
  Image,
  RefreshControl
} from "react-native";
import Iota, { Valid } from "../../libs/iota";
import { formatAmount, getDate } from "../../libs/utils";

import Transaction from "./modal";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false,
      loading: true,
      item: [],
      modalVisible: false
    };
  }
  componentWillReceiveProps(props) {
    const loading = props.loading ? true : false;
    this.setState({ loading: loading, account: props.account });
  }

  componentWillMount() {
    this.setState({
      account: this.props.account,
      loading: false
    });
  }

  setModalVisible = item => {
    if (item[0]) {
      this.setState({ item: item, modalVisible: true });
    } else {
      this.setState({ item: [], modalVisible: false });
    }
  };

  _onRefresh = () => {
    // this.setState({ loading: true });
    this.props.screenProps.getWallet();
    console.log("Pull to Refresh Actioned");
  };

  renderZero = () => {
    return (
      <PaddedBox>
        <EmptyHeader>Looks like this is your first time!</EmptyHeader>
        <Words>
          You'll need to go to Recieve and generate an address then
          attach it to the tangle.
        </Words>
      </PaddedBox>
    );
  };

  _renderItem = ({ item, index }) => {
    var newItem = item;
    newItem[0].sent = this.state.account.addresses.some(
      addy => addy === item[0].address
    );
    return (
      <ListItem
        key={index}
        item={newItem}
        setModalVisible={this.setModalVisible}
      />
    );
  };

  render() {
    var { item, account, loading, refreshing } = this.state;

    return (
      <Wrapper>
        <FlatList
          data={account.transfers.sort(
            (a, b) => b[0].timestamp - a[0].timestamp
          )}
          refreshing={false}
          onRefresh={() => this._onRefresh()}
          initialNumToRender={5}
          ListEmptyComponent={this.renderZero}
          removeClippedSubviews={true}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
        />
        <Transaction
          item={item}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          {...this.props}
        />
      </Wrapper>
    );
  }
}

class ListItem extends React.PureComponent {
  render() {
    return (
      <Item onPress={() => this.props.setModalVisible(this.props.item)}>
        <Row>
          <Header {...this.props.item[0]}>
            {formatAmount(this.props.item[0].value, "bal")}
            {" "}
            <Unit>{formatAmount(this.props.item[0].value, "unit")}</Unit>
          </Header>
          {this.props.item[0].sent
            ? <Row center>
                <Text>Recieved</Text>

                <Image
                  source={require("../../assets/recieved.png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              </Row>
            : <Row center>
                <Text>Sent</Text>

                <Image
                  source={require("../../assets/icons8-logout_rounded_filled.png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              </Row>}

        </Row>
        <Row>
          <Text>
            {this.props.item[0].persistence ? "Confirmed" : "Pending"}
          </Text>
          <Text>
            {getDate(this.props.item[0].timestamp)}
          </Text>
        </Row>
      </Item>
    );
  }
}

const { height, width } = Dimensions.get("window");

const Wrapper = styled.View`
  flex: 1;
`;
const Item = styled.TouchableOpacity`
    width: ${width + "px"};
    padding: 5% 10%;
    margin-bottom: 5px;
    background: white;
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;
    align-items: ${props => (props.center ? "center" : "flex-start")};
    justify-content: space-between;
    background: white;
`;

const Header = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Unit = styled.Text`
    font-size: 26px;
`;

const PaddedBox = styled.View`
 height: 300px;
    width:100%;
    padding: 50px;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;

const EmptyHeader = styled.Text`
  font-size: 18px;
    text-align: center;

  margin-bottom: 20px;
`;

const Words = styled.Text`
  text-align: center;
  margin-bottom: 20px;
`;
