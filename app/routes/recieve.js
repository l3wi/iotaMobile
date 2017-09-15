import React, { Component } from "react"
import styled from "styled-components/native"
import {
  Text,
  View,
  Image,
  Clipboard,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { ActionCreators } from "../actions"

import qr from "yaqrcode"
import { iota } from "../libs/iota"
import Balance from "../components/balance"

copy = address => {
  Clipboard.setString(address)
  Alert.alert("Success", "Address has been copied to clip board")
}

class RecieveScreen extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event) {
    if (event.type == "DeepLink") {
      this.props.navigator.resetTo({
        screen: event.link,
        animationType: "fade",
        animated: true
      })
      this.props.navigator.toggleDrawer({
        side: "left",
        to: "close"
      })
    }
  }
  static navigatorStyle = {
    screenBackgroundColor: "#2d353e",
    navBarHidden: true // make the nav bar hidden
  }

  newAddress = (pwd, index) => {
    // this.setState({ called: true });
    // this.props.addressState(true);
    var transaction = [
      {
        address: this.props.account.addresses[
          this.props.account.addresses.length - 1
        ],
        value: 0,
        tag: "IOS9WALLET"
      }
    ]
    this.props.newAddress(pwd, index, transaction)
  }

  static navigationOptions = {}
  render() {
    var { account, loading, called } = this.props
    return (
      <Wrapper>
        <Balance
          title={"Receive Page"}
          account={account}
          loading={loading}
          {...this.props}
        />
        <ScrollView style={{ width: "100%", backgroundColor: "white" }}>
          {/*Wait for account to load*/}
          <Col>
            {/*If you dont have any addresses show attach button*/}
            {account.addresses[0]
              ? <Col>
                  <CopyAddress
                    onPress={() =>
                      copy(
                        iota.utils.addChecksum(
                          account.addresses[account.addresses.length - 1]
                        )
                      )}
                  >
                    <Address>
                      {iota.utils.addChecksum(
                        account.addresses[account.addresses.length - 1]
                      )}
                    </Address>
                  </CopyAddress>
                  {account.addresses[account.addresses.length - 1]
                    ? <QR
                        source={{
                          uri: qr(
                            iota.utils.addChecksum(
                              account.addresses[account.addresses.length - 1]
                            )
                          ),
                          scale: 4
                        }}
                      />
                    : null}
                </Col>
              : <Text style={{ marginTop: 20 }}>
                  Click below to generate your first Address
                </Text>}

            <Button
              loading={loading}
              onPress={() =>
                !loading
                  ? this.newAddress(
                      this.props.pwd,
                      this.props.account.addresses.length
                    )
                  : null}
            >
              <WhiteText>New Address</WhiteText>
            </Button>
          </Col>
        </ScrollView>
      </Wrapper>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    account: state.iota.account,
    called: state.iota.addressStatus,
    pwd: state.crypto.pwd,
    loading: state.iota.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecieveScreen)

var { height, width } = Dimensions.get("window")

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const Col = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Button = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
  margin: 20px 0px 20px 0;
  background-color: ${props => (props.loading ? "#9ea2a2" : "#2d353e")};
  width: 80%;
`

const CopyAddress = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
  margin: 20px 0px;
  background-color: #eee;
  width: ${width - 60 + "px"};
`
const WhiteText = styled.Text`color: white;`
const Address = styled.Text`text-align: center;`

const QR = styled.Image`
  height: ${width - 60 + "px"};
  width: ${width - 60 + "px"};
`
