import React, { Component } from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, ScrollView } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Balance from "../components/balance";
import Transactions from "../components/transactions";

class TransactionsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };

  refresh = async () => {
    this.props.getAccount(this.props.pwd);
  };
  render() {
    var { account, loading } = this.props;
    return (
      <Wrapper>
        <Balance account={account} loading={loading} {...this.props} />
        <Transactions
          account={account}
          loading={loading}
          refresh={this.refresh}
          {...this.props}
        />
      </Wrapper>
    );
  }
}
const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    account: state.iota.account,
    pwd: state.iota.pwd,
    loading: state.iota.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
