import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 46px;
  background-color: rgb(41, 91, 230);
  color: rgb(41, 91, 230);
`;

const Text = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 16px;
  color: #fff;
  text-indent: 1em;
`;

const Header = () => {
  return (
    <Container>
      <Text>とあるプロジェクトのマイルストーンとタスク</Text>
    </Container>
  );
};

export default Header;
