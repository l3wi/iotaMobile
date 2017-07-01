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
import { formatAmount, getDate } from "../../libs/utils";

import Transaction from "./modal";

export default class TransactionComponent extends React.Component {
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
    this.props.getTransfers(this.props.account.addresses);
    console.log("Pull to Refresh Actioned");
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
        {account.transfers[0]
          ? <FlatList
              data={account.transfers.sort(
                (a, b) => b[0].timestamp - a[0].timestamp
              )}
              refreshing={false}
              onRefresh={() => this._onRefresh()}
              initialNumToRender={5}
              removeClippedSubviews={true}
              keyExtractor={(item, index) => index}
              renderItem={this._renderItem}
            />
          : <PaddedBox>
              <EmptyHeader>Looks like this is your first time!</EmptyHeader>
              <Words>
                You'll need to go to Receive and generate an address then
                attach it to the tangle.
              </Words>

              <Words>
                Please note: once you have transactions you pull to refresh the
                transactions.
              </Words>

              <Button
                onPress={() =>
                  this.props.getTransfers(this.props.account.addresses)}
              >
                <WhiteText>Refresh Account</WhiteText>
              </Button>

            </PaddedBox>}

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

const Button = styled.TouchableOpacity`
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #2d353e;
`;
const WhiteText = styled.Text`
  color: white;
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
                <Text>Received</Text>

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
  width: 100%;
  flex: 1;
  background: white;
`;
const Item = styled.TouchableOpacity`
    width: ${width + "px"};
    padding: 5% 10%;
    border-bottom-width: 5px;
    border-bottom-color: #eee;
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
