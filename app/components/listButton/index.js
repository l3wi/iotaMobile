import React from "react";
import styled from "styled-components/native";
export default props =>
  <Item {...props} onPress={props.func}>
    {props.children}
  </Item>;

const Item = styled.TouchableOpacity`
    width: 100%;
    padding: 20px 20px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: ${props => (props.between ? "space-between" : "center")};
    align-items: center;
    background: #fff;
`;
