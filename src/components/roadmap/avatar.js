import React, { useContext } from "react";
import styled, { css } from "styled-components";

const AvatarContaienr = styled.div`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  height: 100%;
  margin-right: 8px;
`;

const AvatarImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: aqua;
`;

const Avatar = () => {
  return (
    <AvatarContaienr>
      <AvatarImage />
    </AvatarContaienr>
  );
};

export default Avatar;
