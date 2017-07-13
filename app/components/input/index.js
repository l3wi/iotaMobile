import React from "react";
import styled from "styled-components/native";
export default props =>
  <BottomBorder {...props}>
    <Input underlineColorAndroid="transparent" {...props} />
  </BottomBorder>;

const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    border-bottom-color: ${props => (props.dark ? "#2d353e" : "white")};
`;

const Input = styled.TextInput`
    height: 40px;
    color: ${props => (props.dark ? "#2d353e" : "white")};
    text-align: center;
`;
